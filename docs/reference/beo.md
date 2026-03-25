# BEO — Biological Entity Object

The **Biological Entity Object (BEO)** is the sovereign, permanent biological identity of a human being in the BSP ecosystem. It is the point of anchorage for all BioRecords, all ConsentTokens, and all intelligence derived from a person's biological data.

> "A BEO belongs to the individual permanently. No company, government, or authority — including the Ambrósio Institute — can access, modify, or delete it without the holder's private key."

---

## 1. What a BEO Is

A BEO is:
- **Created by the individual** — no approval required from any institution
- **Controlled by a private key** — generated locally on the device, never transmitted
- **Permanent** — stored on Arweave, immutable, survives any company's closure
- **Identified by a `.bsp` domain** — e.g., `andre.bsp`

All BioRecords for a person are attached to their BEO. Consent is issued from it. All data exchange flows through it.

---

## 2. Cryptographic Identity

### The Key Pair

| Property | Type | Description |
|----------|------|-------------|
| `private_key` | Ed25519 | Generated locally on device. Never transmitted. Used to sign authorizations and decrypt BioRecords. |
| `public_key` | Ed25519 | Registered on BEORegistry on Arweave. Used by systems to identify the BEO and encrypt data before submission. |
| `key_algorithm` | Ed25519 | Compact 64-byte signatures, proven performance in low-power environments. |
| `seed_phrase` | 24 words (BIP-39) | Mnemonic representation of the private key. Allows reconstruction on any compatible device. Must be stored offline. |

### Key Generation

```javascript
// All key generation happens 100% on the device
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // stays on device, never leaves
const publicKey  = keyPair.publicKey  // registered on Arweave
const domain     = await bsp.registerDomain("andre.bsp", publicKey)
```

---

## 3. Social Recovery

Losing the private key without a backup seed phrase means permanent loss of access. BSP solves this with **Social Recovery** — no central server involved.

### Configuration

| Field | Type | Description |
|-------|------|-------------|
| `guardians` | Guardian[3] | Up to 3 trusted people designated by the holder. No guardian can access BEO data — they only hold an encrypted key fragment. |
| `recovery_threshold` | number (2) | Minimum guardians required to approve recovery. Default: 2 of 3. |
| `guardian_fragment` | string (encrypted) | Cryptographic key fragment, encrypted with the guardian's public key. Stored on Arweave — the Institute never has the full key. |

### How It Works (Shamir Secret Sharing)

```javascript
// Key is split into 3 fragments — any 2 can reconstruct it
const fragments = shamirSplit(recovery_key, threshold=2, shares=3)

// Each fragment encrypted with the respective guardian's public key
guardian_1.fragment = encrypt(fragments[0], guardian_1_public_key)
guardian_2.fragment = encrypt(fragments[1], guardian_2_public_key)
guardian_3.fragment = encrypt(fragments[2], guardian_3_public_key)

// Fragments stored on Arweave — publicly visible, unreadable
```

**Security guarantee**: No guardian can act alone. The Ambrósio Institute is never in this flow.

---

## 4. BEO Complete Schema

```typescript
interface BEO {
  // Identity
  beo_id:       string    // Arweave transaction ID of the createBEO transaction
  domain:       string    // .bsp address — e.g., "andre.bsp"
  public_key:   string    // Ed25519 public key (hex-encoded, 32 bytes)
  created_at:   string    // ISO8601 timestamp of BEO creation
  version:      string    // BSP version at time of creation (semver)
  key_version:  number    // Incremented on every key rotation

  // Recovery
  recovery: {
    threshold:  number           // Minimum guardians required (default: 2)
    guardians: [{
      contact:       string      // .bsp domain, email, or phone
      public_key:    string | null  // Registered when guardian accepts
      role:          "primary" | "secondary" | "tertiary"
      status:        "PENDING" | "ACTIVE"
      accepted_at:   string | null
    }]
  } | null

  // Active recovery request (if any)
  active_recovery: {
    new_public_key: string       // Key to rotate to on completion
    requested_at:   string
    expires_at:     string       // 72h window
    confirmations:  string[]     // Contacts of guardians who confirmed
    status:         "PENDING" | "COMPLETED" | "EXPIRED"
  } | null

  // Status
  status:           "ACTIVE" | "LOCKED"
  locked_at:        string | null
}
```

---

## 5. BioRecord Schema

Every biological measurement attached to a BEO is a BioRecord:

```typescript
interface BioRecord {
  record_id:    string    // Arweave transaction ID — permanent
  beo_id:       string    // Owner BEO
  ieo_id:       string    // Submitting institution
  biomarker:    string    // BSP code — e.g., "BSP-LA-004" (NAD+)
  value:        number    // Measured value
  unit:         string    // Standardized unit — e.g., "umol/L"
  collected_at: string    // ISO8601 — when the sample was collected
  submitted_at: string    // ISO8601 — when it was written to Arweave
  ref_range: {
    optimal:    string    // e.g., "40-60"
    functional: string    // e.g., "30-70"
    deficiency: string    // e.g., "<30"
    toxicity:   string    // e.g., ">100" (when applicable)
  }
  status:       "CURRENT" | "SUPERSEDED"
  supersedes:   string | null    // record_id of older entry this corrects
  data_hash:    string           // SHA-256 of the raw measurement for audit
}
```

**Key property**: BioRecords are **immutable**. Corrections are submitted as new records that supersede the previous one — the error never disappears from history.

---

## 6. BEO Lifecycle States

| State | Description |
|-------|-------------|
| `ACTIVE` | Operating normally. All operations permitted with valid consent. |
| `LOCKED` | Holder has voluntarily locked all operations. Useful if compromise is suspected. No reads or writes by institutions. A recovery request (`requestRecovery`) can still be initiated from a LOCKED BEO. |

---

## 7. Smart Contract: BEORegistry

All BEO operations are managed by the `BEORegistry` SmartWeave contract on Arweave.

### Key Functions

| Function | Who Can Call | Description |
|----------|-------------|-------------|
| `createBEO()` | Anyone | Creates a new BEO. Open — no approval required. |
| `lockBEO()` | BEO holder only | Temporarily locks the BEO. |
| `unlockBEO()` | BEO holder only | Unlocks a previously locked BEO. |
| `updateRecovery()` | BEO holder only | Configures or updates guardian configuration. Signed by the holder. |
| `acceptGuardianship()` | Invited guardian | Guardian accepts role and registers their public key. |
| `requestRecovery()` | Holder on a new device | Initiates the Social Recovery process. Notifies guardians. |
| `confirmRecovery()` | Guardian (threshold 2-of-3) | Guardian confirms holder identity. Key rotated automatically when threshold is reached. |
| `rotateKey()` | BEO holder (recovery or manual) | Replaces public key after successful recovery or manual rotation. |
| `getBEO()` | Anyone | Returns public BEO data. |

### Holder Rights (Unconditional)

- Always recover your BEO using seed phrase
- Always revoke any ConsentToken, instantly
- Always export all your data (`EXPORT_DATA` intent)
- Always lock your BEO
- Always choose new guardians

---

## 8. Creating a BEO with the SDK

```python
# Python SDK
from bsp_sdk import BEOBuilder, Guardian

beo = BEOBuilder(domain="andre.bsp").build()
result = beo.register()

print(result.beo_id)     # Permanent UUID on Arweave
print(result.domain)     # andre.bsp
print(result.seed_phrase) # 24 words — store offline

# Optional: configure Social Recovery
beo.update_recovery(
    guardians=[
        Guardian(name="Maria",  contact="maria.bsp",     role="primary"),
        Guardian(name="João",   contact="+5511999...",   role="secondary"),
        Guardian(name="Carlos", contact="carlos@...",    role="tertiary"),
    ],
    threshold=2
)
```

---

## See Also

- [IEO Specification →](./ieo.md)
- [ConsentToken & Access Control →](./consent-token.md)
- [Security & Blockchain →](../guides/security-blockchain.md)
- [Developer Quickstart →](../quickstart/README.md)
