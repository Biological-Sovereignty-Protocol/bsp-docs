# Security & Blockchain

This guide explains the cryptographic and blockchain foundations of the BSP — how keys work, why Arweave was chosen, how the smart contracts enforce consent, and how each actor connects without needing permission from any central authority.

---

## Part 1: Cryptographic Keys — The Foundation

The BSP is built on a single core principle: **no central authority controls access to your biological data. You do.** The instrument of that control is your cryptographic key pair.

### The Key Pair

| | Public Key | Private Key |
|--|------------|-------------|
| **What it is** | Your address in the BSP ecosystem | Your control key |
| **Who sees it** | Anyone — shared freely | Only you — never leaves your device |
| **Used for** | Labs and systems identify your BEO and encrypt data | Signing authorizations, decrypting your BioRecords |
| **Stored in** | BEORegistry on Arweave | Encrypted in your app, protected by biometric/password |

### Key Generation

Keys are generated entirely on the user's device:

```javascript
// 1. Generate 256 bits of secure entropy
const entropy = crypto.getRandomValues(new Uint8Array(32))

// 2. Derive 24-word BIP-39 seed phrase
const mnemonic = bip39.entropyToMnemonic(entropy)

// 3. Derive Ed25519 key pair
const seed = await bip39.mnemonicToSeed(mnemonic)
const keyPair = ed25519.fromSeed(seed.slice(0, 32))

// 4. Private key stays on device — never transmitted
const privateKey = keyPair.secretKey  // 64 bytes

// 5. Public key registered on Arweave
const publicKey = keyPair.publicKey   // 32 bytes
```

**Why Ed25519?** Compact signatures (64 bytes), high performance, and proven resistance in low-power environments.

---

## Part 2: Social Recovery — Key Recovery Without a Central Server

Losing your private key in a self-custody system normally means losing access forever. BSP solves this with **Social Recovery** — no central server needed.

### How It Works

The user designates 3 guardians (trusted friends, physicians, or platforms). Using **Shamir Secret Sharing**, the private key is mathematically split into 3 fragments:

```
Key = shamirSplit(secret=K, threshold=2, shares=3)
Fragment_A → encrypted with Guardian 1's public key
Fragment_B → encrypted with Guardian 2's public key  
Fragment_C → encrypted with Guardian 3's public key
```

- Fragments are stored on Arweave — publicly visible, but encrypted and unreadable.
- **Any 2 of the 3 fragments** reconstruct the original key.
- No guardian can act alone.
- The Ambrósio Institute is not in this flow at any stage.

### Recovery Flow

1. User opens app on new device — app detects no private key.
2. New key pair is generated on the new device.
3. A `RECOVERY_REQUEST` transaction is posted on Arweave — notifying guardians.
4. Two guardians decrypt their fragments and post `GUARDIAN_CONFIRM` transactions.
5. The BEORegistry updates the BEO with the new public key.
6. User regains full access.

---

## Part 3: Arweave — Permanent, Decentralized Storage

### Why Arweave?

| Storage Type | Risk |
|-------------|------|
| Traditional database | Controlled by a company — can be shut down, hacked, or sold |
| Standard blockchain | Decentralized, but expensive for large data |
| **Arweave** | **Decentralized + designed for permanent large-scale storage** |

Arweave's endowment model: pay once, data exists for 200+ years, guaranteed by mathematics. If the Ambrósio Institute closes tomorrow, your BEO and all your BioRecords remain accessible on the Arweave network forever.

### Transaction Types in BSP

Every lifecycle event for a BEO generates an Arweave transaction:

| Transaction Type | When It Occurs |
|-----------------|---------------|
| `BEO_CREATE` | Initial BEO creation |
| `RECOVERY_UPDATE` | Guardian configuration added or updated |
| `BIORECORD_SUBMIT` | One or more BioRecords written to BEO |
| `CONSENT_ISSUE` | New ConsentToken issued by BEO holder |
| `CONSENT_REVOKE` | ConsentToken revoked — immediate effect |
| `KEY_ROTATION` | Public key replaced after recovery |
| `RECOVERY_REQUEST` | Recovery process initiated on new device |
| `BEO_LOCK` | BEO temporarily locked (suspected compromise) |

**Important**: Arweave never edits — it accumulates. The current state of a BEO is determined by reading all its transactions and applying the BEORegistry's rules.

---

## Part 4: Smart Contracts — The Rules Nobody Can Change

BSP runs five SmartWeave contracts on Arweave. Once deployed, they are immutable:

### BEORegistry
Creates and indexes BEOs. **Open to anyone** — no permission required. Records: public key, `.bsp` domain, recovery configuration.

### IEORegistry
Manages BSP-Certified institutions. When a user's app checks if a laboratory is certified, it queries this contract. The badge cannot be faked.

### DomainRegistry
Guarantees uniqueness of `.bsp` domains. `andre.bsp` can only exist once. Manages transfers for institutional domains (acquisitions/mergers).

### AccessControl
**The most critical contract.** Every ConsentToken is managed here. Any system attempting to read or write a BEO's data must present a valid, non-revoked token registered in this contract. The blockchain enforces it — no server can bypass it.

```javascript
// How AccessControl verifies a submission
function verifySubmission(beo_id, ieo_id, consent_token_id, intent, category) {
    const token = getToken(consent_token_id)
    
    if (token.beo_id !== beo_id) throw "TOKEN_BEO_MISMATCH"
    if (token.ieo_id !== ieo_id) throw "TOKEN_IEO_MISMATCH"
    if (token.revoked)           throw "TOKEN_REVOKED"
    if (token.expires_at < now()) throw "TOKEN_EXPIRED"
    if (!token.scope.intents.includes(intent))   throw "INTENT_NOT_AUTHORIZED"
    if (!token.scope.categories.includes(category)) throw "CATEGORY_NOT_AUTHORIZED"
    
    return { authorized: true }
}
```

### Governance
Multi-signature contract for critical protocol changes. Requires 2-of-3 Institute keyholders. No single person — not even the founder — can modify the core contracts unilaterally.

---

## Part 5: How Each Actor Connects — No Prior Permission

BSP follows the same model as MCP (Model Context Protocol): anyone can participate, and user consent is the only gatekeeper.

### The User
1. App generates key pair locally on first launch.
2. App calls BEORegistry to register the BEO.
3. User receives their `.bsp` domain.
4. For every institution they want to authorize, they sign a transaction in AccessControl.

### The Laboratory (certified or not)
1. Installs `bsp-sdk-python` — `pip install bsp-sdk`.
2. User must sign an authorization before any BioRecord can be written.
3. Lab submits BioRecords — signed by the lab, encrypted with the user's public key.
4. BSP-Certified labs gain directory listing and AVA pipeline access. Uncertified labs can still operate, but the user's app shows an "unverified source" warning.

### AVA — How It Accesses Encrypted Data
This is the most important architectural question: if data is encrypted with the user's key, how does AVA analyze it?

1. **User initiates analysis actively** — AVA never has passive access.
2. **App decrypts locally** — Using the private key on the user's device, BioRecords are decrypted.
3. **User sends to AVA with explicit session consent** — The data is transmitted to Institute servers for processing, with explicit per-session consent.
4. **AVA processes and returns SVA** — Results come back. The original data is not stored by the Institute beyond processing.

---

## Part 6: The Role of `bsp-registry-api`

The blockchain solves the technical problem. The API solves the human problem: verifying that a laboratory is real, legally operating, and technically capable of producing trustworthy biological data.

| What passes through `bsp-registry-api` | What NEVER passes through |
|----------------------------------------|--------------------------|
| ✓ Certification requests | ✗ User biological data |
| ✓ Institution documentation | ✗ BioRecords of any kind |
| ✓ Approval status and badges | ✗ Private keys |
| ✓ BIP submissions and review | ✗ Blockchain transactions |

*The `bsp-registry-api` is the Institute's office — where certification happens. Arweave is the vault — where data lives forever. AccessControl is the gatekeeper — where users decide who enters.*
