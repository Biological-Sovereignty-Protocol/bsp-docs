---
title: "Security & Blockchain — BSP"
description: "Cryptographic security model, key management, and Arweave blockchain integration in BSP."
---

# Keys, Blockchain & Access

> "How users, laboratories, and systems connect to the ecosystem — decentralized, without a central server, without an intermediary, without prior permission."

## Part 1: Cryptographic Keys — The Foundation

BSP is built on a single principle: **no central authority controls access to your biological data. You do.** The instrument of that control is your cryptographic key pair.

### The Key Pair

| | Public Key | Private Key |
|--|------------|-------------|
| **What it is** | Your address in the BSP ecosystem | Your control key |
| **Who sees it** | Anyone — shared freely | Only you — never leaves your device |
| **Used for** | Labs encrypt BioRecords before submission | Signing authorizations, decrypting your BioRecords |
| **Stored in** | BEORegistry on Arweave | Encrypted in your app (hardware enclave + biometric) |

### Key Generation (Ed25519)

```javascript
// 100% on-device
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // 64 bytes — stays on device always
const publicKey  = keyPair.publicKey  // 32 bytes — registered on Arweave
```

**Why Ed25519?** Compact 64-byte signatures, high performance, proven resistance in low-power environments (mobile).

---

## Part 2: Social Recovery — Without a Central Server

Losing your private key means permanent loss of access without a backup. BSP solves this with **Social Recovery** via Shamir Secret Sharing.

### How It Works

```javascript
// Key is split into 3 fragments — any 2 can reconstruct it
const fragments = shamirSplit(recovery_key, threshold=2, shares=3)

// Each fragment encrypted with the guardian's public key
guardian_1.fragment = encrypt(fragments[0], guardian_1_public_key)
guardian_2.fragment = encrypt(fragments[1], guardian_2_public_key)
guardian_3.fragment = encrypt(fragments[2], guardian_3_public_key)

// Stored on Arweave — publicly visible, unreadable without guardian's private key
```

- **No guardian can act alone** — 2-of-3 required
- **The Institute is never in this flow** at any stage
- **Fragments stored on Arweave** — permanent, encrypted, accessible only to the guardian

### Recovery Flow

```
1. User opens app on new device → generates new key pair locally
2. Posts RECOVERY_REQUEST transaction to Arweave
3. Two guardians decrypt their fragment and post GUARDIAN_CONFIRM transactions
4. BEORegistry updates the BEO with the new public key
5. Old key is permanently invalidated
```

---

## Part 3: Arweave — Permanent Decentralized Storage

| Storage Type | Risk |
|-------------|------|
| Traditional database | Controlled by a company — can be shut down, hacked, or sold |
| Standard blockchain | Decentralized, but expensive for large data |
| **Arweave** | **Decentralized + designed for permanent large-scale storage** |

Pay once — data persists for **200+ years**, guaranteed by a mathematical endowment model.

> If the Ambrósio Institute closes in 30 years, your BEO and BioRecords remain permanently accessible on the Arweave network. Sovereign data outlives its creators.

### Arweave Transaction Types in BSP

| Transaction Type | When |
|-----------------|------|
| `BEO_CREATE` | BEO creation |
| `BIORECORD_SUBMIT` | BioRecords written to BEO |
| `CONSENT_ISSUE` | New ConsentToken issued |
| `CONSENT_REVOKE` | ConsentToken revoked — immediate effect |
| `KEY_ROTATION` | Public key replaced after recovery |
| `RECOVERY_REQUEST` | Recovery process initiated |
| `BEO_LOCK` | BEO temporarily locked by holder |

**Key property**: Arweave never edits — it accumulates. The current state of a BEO is determined by reading all transactions and applying the BEORegistry's rules.

---

## Part 4: Smart Contracts — Immutable Rules

Five SmartWeave contracts enforce the protocol on Arweave. Once deployed, they are immutable.

| Contract | Purpose | Who Can Call |
|----------|---------|-------------|
| **BEORegistry** | Creates and indexes BEOs | Anyone — open |
| **IEORegistry** | Manages BSP-Certified institutions | Institute (certification); anyone (verify) |
| **DomainRegistry** | `.bsp` namespace uniqueness guarantor | SDK automatically |
| **AccessControl** | Consent management — the true gatekeeper | BEO holders (grant/revoke); IEOs (verify) |
| **Governance** | Multi-sig for critical protocol changes | 2-of-3 Institute keyholders |

### AccessControl in Code

```javascript
// How AccessControl verifies every operation
function verifyToken(beo_id, ieo_id, consent_token_id, intent, category) {
    const token = getToken(consent_token_id)

    if (token.beo_id !== beo_id)     throw "TOKEN_BEO_MISMATCH"
    if (token.ieo_id !== ieo_id)     throw "TOKEN_IEO_MISMATCH"
    if (token.revoked)               throw "TOKEN_REVOKED"
    if (token.expires_at < now())    throw "TOKEN_EXPIRED"
    if (!token.scope.intents.includes(intent))     throw "INTENT_NOT_AUTHORIZED"
    if (!token.scope.categories.includes(category)) throw "CATEGORY_NOT_AUTHORIZED"

    return { authorized: true }
}
```

---

## Part 5: The BSP Connectivity Model (Like MCP)

The Anthropic Model Context Protocol (MCP) lets anyone build an MCP server without Anthropic's approval. Safety comes from the user actively consenting to which servers the assistant can access.

**BSP follows the exact same logic.**

### How Each Actor Connects

**The User:**
```
App generates key pair locally → Creates BEO on Arweave →
Receives .bsp domain → For every institution, signs a ConsentToken
```

**The Laboratory (certified or not):**
```
pip install bsp-sdk → User must authorize → Submit BioRecords 
(encrypted with user's public key) → Written to Arweave
```

**AVA (the intelligence engine):**
```
User actively initiates analysis → App decrypts BioRecords locally →
User sends to AVA with explicit session consent → AVA returns SVA Score →
Raw data not retained by Institute after processing
```

> **The key difference**: In BSP, data doesn't move between institutions. Institutions send data *to the user*. The user decides who reads it.

---

## Part 6: `bsp-registry-api` — The Relayer & Certification Layer

While the blockchain solves the technical problem of immutable intent, it introduces friction: **Gas fees (paying in $AR to write data)**. To ensure mass adoption, patients cannot be expected to manage crypto wallets.

The `bsp-registry-api` acts as a **Relayer** covering these costs securely.

### The Gasless Relay Flow (Off-Chain Signatures)

If the Relayer API pays for transactions, how do we prevent malicious actors from flooding the API or forging BEO consents? **Off-Chain Ed25519 Signatures**.

1. **User Intent:** The user's mobile app wants to grant a consent.
2. **Local Signing:** The app creates a JSON payload describing the intent (e.g., `grantConsent` for Lab X) and signs it deterministically using the user's local **Ed25519 Private Key**.
3. **Relayer Verification:** The app sends the payload + Base64 signature to the `bsp-registry-api`.
4. **Zero-Trust Check:** The Relayer API fetches the user's public key from the Arweave `BEORegistry`. It mathematically verifies the signature against the payload.
   - ❌ **Invalid Signature:** The request is rejected immediately (`401 Unauthorized`). The API spends no gas.
   - ✅ **Valid Signature:** The API wraps the user's exact intent in an Arweave transaction, pays the gas using the Ambrósio Institute's wallet, and submits it to SmartWeave.

This guarantees **Absolute Cryptographic Sovereignty**. Even if the Relayer API itself were compromised, it cannot forge biological consents because it does not possess the user's private key.

| What passes through `bsp-registry-api` | What NEVER passes through |
|----------------------------------------|--------------------------|
| ✓ Certification requests & IEO Badges  | ✗ User biological data (BioRecords) |
| ✓ Encrypted Shamir guardian fragments  | ✗ The actual Private Key |
| ✓ Signed intent payloads (Relayer)     | ✗ Unsigned blockchain transactions |
