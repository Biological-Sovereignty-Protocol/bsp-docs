# BSP Developer Quickstart
*From zero to first functional integration in 30 minutes*

## What you will build in this guide:
1. Create an IEO for your organization on Arweave (permanent, verifiable)
2. Verify ConsentTokens issued by users
3. Submit BioRecords to an authorized BEO (Laboratory/Wearable) or Read BioRecords from an authorized BEO (Clinic/Platform)
4. Handle errors correctly

## Prerequisites
* Python 3.9+ or Node.js 18+ installed
* Arweave account with AR tokens
* Your organization's legal ID (CNPJ, EIN, etc.)

---

## Part 1: Installation & Configuration

### Step 1: Install the bsp-sdk
The `bsp-sdk` abstracts all protocol complexity: cryptography, communication with Arweave, token verification, and BioRecord construction.

**Python**
```bash
pip install bsp-sdk
```

**TypeScript / Node.js**
```bash
npm install @bsp/sdk
```

### Step 2: Configure Environment Variables
```env
# .env (never commit this file)
BSP_IEO_PRIVATE_KEY=your_private_key_here
BSP_NETWORK=testnet
BSP_REGISTRY_URL=https://registry.biologicalsovereigntyprotocol.com
BSP_IEO_DOMAIN=yourlab.bsp
```

---

## Part 2: Create your IEO

The IEO is the permanent identity of your organization in the BSP ecosystem.

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain      = "yourlab.bsp",
    name        = "Example Laboratory Ltd",
    ieo_type    = IEOType.LABORATORY,     
    jurisdiction = "BR",                 
    legal_id    = "12.345.678/0001-99",  
    contact     = "contact@ambrosioinstitute.org",
    website     = "https://yourlab.com",
).build()

result = ieo.register()
print(result.ieo_id)      # Permanent UUID on Arweave
```

> **Note:** The IEO is permanent and public. Once created, it is registered on Arweave forever. The generated private key is the only way to sign operations.

---

## Part 3A: Laboratory Track — Submit BioRecords 🔬

### Step 4A: Receive and Verify a ConsentToken
```python
from bsp_sdk import BSPClient, BSPIntent
import os

client = BSPClient(
    ieo_domain  = os.getenv("BSP_IEO_DOMAIN"),
    private_key = os.getenv("BSP_IEO_PRIVATE_KEY"),
)

token_id = "token-uuid-abc123"
beo_domain = "patient.bsp"

verification = client.verify_consent(
    token_id   = token_id,
    beo_domain = beo_domain,
    intent     = BSPIntent.SUBMIT_RECORD,
    category   = "BSP-HM",  
)

if verification.valid:
    print("Valid token")
```

### Step 5A: Submit a BioRecord
```python
result = client.submit_biorecord(
    beo_domain   = "patient.bsp",
    consent_token = token_id,
    biomarker    = "BSP-HM-001",    
    value        = 13.8,
    unit         = "g/dL",
    collected_at = "2026-02-26T08:00:00Z",
    ref_range    = {
        "optimal":    "13.5-17.5",
        "functional": "12.0-17.5",
        "deficiency": "<12.0"
    }
)
```

---

## Part 3B: Clinic/Platform Track — Read BioRecords 🩺

### Step 4B: Read data from an authorized BEO

```python
response = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = "token-uuid-xyz",
    filters = {
        "categories": ["BSP-CV", "BSP-GL", "BSP-LP"],
        "period": {
            "from": "2025-02-26T00:00:00Z",
            "to":   None
        },
        "limit": 100
    }
)

for record in response.records:
    print(f"{record.biomarker}: {record.value} {record.unit}")
```

---

## Part 3C: Wearable/Device Track — Continuous Data ⌚

Wearables submit `BSP-DV` data in daily consolidations.

```python
daily_records = [
    BioRecord(
        biomarker    = "BSP-DV-001",
        value        = 52.3,          
        unit         = "ms",
        collected_at = f"{today}T23:59:00Z",  
        ref_range    = { "optimal": ">60", "functional": ">40", "deficiency": "<40" },
    )
]

result = client.submit_biorecords(
    beo_domain    = "user.bsp",
    consent_token = "token-wearable-permanent",
    records       = daily_records,
    collected_at  = f"{today}T23:59:00Z",
)
```

## Next Steps
- **Testnet to Mainnet**: Once your integration works in testnet, migrate to mainnet.
- **Get BSP-Certification**: Voluntary certification adds you to the official directory.
- **Integrate bsp-mcp for AI Agents**: The official MCP server to connect AI agents to users' BEOs.
- **Propose a BIP**: Suggest new biomarkers to the taxonomy.
