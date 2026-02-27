# Ecosystem Flow

This guide explains the end-to-end flow of the BSP ecosystem — how developers, institutions, and users interact with the protocol at every stage.

---

## The Developer Journey

### Step 1: Install the SDK

```bash
# TypeScript / JavaScript
npm install @bsp/sdk

# Python
pip install bsp-sdk
```

### Step 2: Create Your IEO

Your Institutional Entity Object (IEO) is your organization's permanent identity in the BSP ecosystem. Creating one requires no approval — just a small AR token fee to register on Arweave.

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain      = "yourlaboratory.bsp",
    name        = "Your Laboratory Name",
    ieo_type    = IEOType.LABORATORY,
    jurisdiction = "BR",
    legal_id    = "12.345.678/0001-99",
).build()

result = ieo.register()
print(result.ieo_id)    # Permanent ID on Arweave
print(result.domain)    # yourlaboratory.bsp
```

Your IEO starts as `UNCERTIFIED`. You can request and receive ConsentTokens from users immediately. [BSP Certification](../guides/certification.md) is voluntary but unlocks the AVA data pipeline and official directory listing.

### Step 3: Request User Consent

Before interacting with any user's BEO, you need a ConsentToken from them. Users issue tokens via any BSP-compatible app.

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "yourlaboratory.bsp",
    private_key = YOUR_PRIVATE_KEY,
)

# Verify the token before any operation
verification = client.verify_consent(
    token_id   = token_from_user,
    beo_domain = "patient.bsp",
    intent     = "SUBMIT_RECORD",
    category   = "BSP-HM",
)

if verification.valid:
    # Proceed with the operation
    pass
```

### Step 4: Submit or Read BioRecords

```python
# Laboratory track: submit results
result = client.submit_biorecord(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    biomarker     = "BSP-HM-001",  # Hemoglobin
    value         = 13.8,
    unit          = "g/dL",
    collected_at  = "2026-02-26T08:00:00Z",
    ref_range     = { "optimal": "13.5-17.5", "functional": "12.0-17.5" }
)

# Clinic/platform track: read existing records
records = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    filters = {
        "categories": ["BSP-CV", "BSP-GL"],
        "period": { "from": "2025-01-01", "to": None }
    }
)
```

---

## The User Journey

### Phase 1: Creating a BEO

The user creates their sovereign biological identity using any BSP-compatible app:

1. **Key generation** — App generates an Ed25519 key pair locally. The private key never leaves the device.
2. **BEO registration** — App calls the `BEORegistry` on Arweave to register the BEO.
3. **.bsp domain** — User chooses `yourname.bsp` — the DomainRegistry confirms uniqueness.
4. **Social Recovery (optional)** — User designates 3 guardians with a 2-of-3 threshold. Enables key recovery without any central server.

### Phase 2: Authorizing an Institution

When a laboratory or clinic asks for consent to submit or read data:

1. User receives a consent request specifying: which institution, which data categories, what actions, for how long.
2. User reviews and approves in the app.
3. App calls `AccessControl` on Arweave — ConsentToken is minted on-chain.
4. The institution can now perform the authorized actions.

**Revocation is instant**: One tap in the app calls `AccessControl.revokeConsent()`. The institution is immediately blocked.

### Phase 3: Receiving BioRecords

When a laboratory submits results:

1. Lab constructs BioRecords in BSP format (standardized codes, units, reference ranges).
2. Lab SDK encrypts each record with the user's public key.
3. Records are written to Arweave — permanent, immutable.
4. User's app receives a notification and decrypts the records locally using their private key.

### Phase 4: Getting the Vitality Score (SVA)

If the user has connected to an AVA-powered platform:

1. User initiates an analysis actively in the app ("Analyze my health").
2. App decrypts the BioRecords locally and sends them to AVA with explicit session consent.
3. AVA processes the data and returns the multi-dimensional SVA Score.
4. User sees their biological age, aging velocity, and system-by-system breakdown.

---

## Repository Roles in the Ecosystem

| Repository | Role | Who Uses It |
|------------|------|------------|
| `bsp-spec` | Defines the standard | Developers reading the spec |
| `bsp-sdk-typescript` | SDK for web/mobile integration | App developers, platforms |
| `bsp-sdk-python` | SDK for lab/research integration | Laboratories, scientists |
| `bsp-mcp` | MCP server connecting AI to BSP | AI developers (Claude, GPT, etc.) |
| `bsp-docs` | This documentation site | Everyone |
| `bsp-registry` | Smart contracts on Arweave | Protocol infrastructure (private) |
| `bsp-registry-api` | Certification portal | Institutions seeking certification (private) |
| `ava-core` | The AVA algorithm | Ambrósio Institute (private) |
| `sva-engine` | SVA scoring engine | Ambrósio Institute (private) |

---

## The Build Sequence

The repositories were designed to be built in this order — each depends on the previous:

```
1. bsp-spec          ← Foundation: the standard everyone implements
2. bsp-registry      ← Smart contracts: the protocol's on-chain infrastructure
3. bsp-registry-api  ← Certification portal: human workflow over contracts
4. bsp-sdk-typescript← First SDK: widest integration coverage
5. bsp-mcp           ← AI connectivity: built on the TypeScript SDK
6. bsp-sdk-python    ← Lab SDK: for laboratories and researchers
7. ava-core          ← Intelligence: trained on BSP-standardized data
8. sva-engine        ← Scoring: outputs the product the user experiences
9. bsp-docs          ← Grows with the ecosystem (you are here)
```
