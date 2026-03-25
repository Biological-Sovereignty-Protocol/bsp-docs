# ConsentToken Lifecycle — Deep Dive

The ConsentToken is the mathematical instrument of data sovereignty in the BSP. No institution reads or writes biological data without one. This document covers everything: what it is, its structure, how to grant it, verify it, use it, and revoke it — and why the difference between expiry and revocation matters.

---

## 1. What a ConsentToken Is

A ConsentToken is a cryptographic authorization minted on the Arweave blockchain by a BEO holder. It represents a user's explicit, scoped, time-bounded permission for a specific institution to perform specific actions on their biological data.

Key properties:

- **Signed with Ed25519** — the user's private key signs the grant. No third party can issue a token on the user's behalf, including the Ambrósio Institute.
- **On Arweave** — permanent, auditable, tamper-proof. The token exists independently of any server.
- **Enforced by smart contract** — the `AccessControl` SmartWeave contract on Arweave is the only gatekeeper. No server-side bypass is possible.
- **Instantly revocable** — revocation is a single on-chain transaction. The moment it is written, the token is dead. No grace period, no retry window.
- **Fully scoped** — the token encodes exactly which institution, which data categories, which actions, and for how long. Nothing outside that scope is accessible.

> "Consent is not a checkbox. It is a mathematical instruction on the blockchain — specific, scoped, and revocable at any moment."

---

## 2. ConsentToken Structure

```typescript
interface ConsentToken {
  // Core identity
  token_id:    string        // UUID v4 — unique identifier for this grant
  beo_id:      string        // The BEO granting consent (user identity UUID)
  ieo_id:      string        // The IEO receiving permission (institution UUID)

  // Timestamps
  granted_at:  string        // ISO8601 — when the user approved
  expires_at:  string | null // ISO8601 — null means the token never expires

  // Status
  revoked:     boolean       // true = immediately invalid, regardless of expires_at
  revocable:   boolean       // Always true — unconditional holder right

  // Scope — what this token permits
  scope: {
    intents:    BSPIntent[]  // Which actions are permitted (see table below)
    categories: string[]     // Which BSP data categories (e.g., ["BSP-LA", "BSP-HM"])
    levels:     BioLevel[]   // Which taxonomy levels: CORE | STANDARD | EXTENDED | DEVICE
    period: {                // Historical date range the IEO can access
      from: string | null    // ISO8601, null = beginning of record
      to:   string | null    // ISO8601, null = no upper bound
    } | null
  }

  // Cryptographic proof
  token_hash:  string        // SHA-256 of canonical JSON — used for on-chain verification
  signature:   string        // Ed25519 signature of token_hash by the BEO holder's private key
  arweave_tx:  string        // On-chain transaction ID where this token was minted
}
```

### Intent Types

| Intent | What It Permits | Typical Duration |
|--------|----------------|-----------------|
| `SUBMIT_RECORD` | Write BioRecords to the BEO | Single-use or per session |
| `READ_RECORDS` | Read BioRecords from the BEO | 30–90 days (physicians), permanent (platforms) |
| `ANALYZE_VITALITY` | Request AVA vitality analysis | Permanent (refreshable) |
| `REQUEST_SCORE` | Request SVA composite score | Annual (insurers with user opt-in) |
| `SOVEREIGN_EXPORT` | Export all data | Always available to BEO holder only |
| `SYNC_PROTOCOL` | Protocol version negotiation | Per session |

A single token can include multiple intents. The IEO can only use what is listed in `scope.intents`.

---

## 3. How to Grant a ConsentToken

Only the BEO holder can issue a ConsentToken. The SDK call below signs the grant locally and broadcasts it to Arweave via the relayer.

```typescript
import { BEOClient } from '@bsp/sdk'

const client = new BEOClient({
  network:    'testnet',
  relayerUrl: process.env.BSP_RELAYER_URL,
  privateKey: userPrivateKey,   // Stays on device — used to sign the grant
  beoId:      userBeoId,
})

const token = await client.grantConsent({
  ieoId: genomicsLabIeoId,      // The institution receiving permission
  scope: {
    intents:    ['READ_RECORDS', 'SUBMIT_RECORD'],
    categories: ['BSP-LA', 'BSP-HM'],     // Lab analytics + Hematology
    levels:     ['CORE', 'STANDARD'],
    period: {
      from: '2025-01-01',
      to:   null,               // Access records from 2025-01-01 onward
    },
  },
  expiresInDays: 90,            // null = permanent token
})

console.log(token.tokenId)      // Save this — the IEO needs it for every request
console.log(token.expiresAt)    // ISO8601 expiry timestamp
console.log(token.arweaveTx)    // On-chain proof of grant
```

Once the transaction confirms on Arweave (typically 2–5 seconds on testnet), the IEO can start using the token.

---

## 4. How to Verify a ConsentToken (IEO Side)

Before accepting any data operation, an IEO should verify that the token it holds is still valid. The SDK performs double verification: on-chain state + cryptographic signature check.

```typescript
import { AccessManager } from '@bsp/sdk'

const access = new AccessManager({
  ieoId:      genomicsLabIeoId,
  privateKey: ieoPrivateKey,
  network:    'testnet',
  relayerUrl: process.env.BSP_RELAYER_URL,
})

const verification = await access.verifyToken({
  tokenId:  tokenIdFromUser,
  beoId:    patientBeoId,
  intent:   'SUBMIT_RECORD',
  category: 'BSP-HM',
})

if (!verification.valid) {
  // Handle each case explicitly
  switch (verification.reason) {
    case 'TOKEN_NOT_FOUND':
      // Token ID does not exist on-chain — user must reissue
      throw new Error('Token not found. Ask the user to grant a new ConsentToken.')

    case 'TOKEN_REVOKED':
      // User has explicitly revoked access — do not retry
      throw new Error('Consent revoked. Do not retry with this token.')

    case 'TOKEN_EXPIRED':
      // Natural expiry — user must renew
      throw new Error('Token expired. Ask the user to issue a new grant.')

    case 'INTENT_NOT_AUTHORIZED':
      // Token exists but does not include the requested intent
      throw new Error(`Intent "${verification.requestedIntent}" not in token scope.`)

    case 'CATEGORY_NOT_AUTHORIZED':
      // Token exists but does not cover the requested BSP category
      throw new Error(`Category "${verification.requestedCategory}" not in token scope.`)

    case 'BEO_LOCKED':
      // User has locked their BEO — no operations until they unlock
      throw new Error('BEO is locked. No operations permitted.')
  }
}

// Proceed with the operation
console.log('Token valid. Proceeding.')
console.log('Expires at:', verification.token.expiresAt)
```

> Always verify before accepting a token, even for returning users. Tokens can be revoked at any time between requests.

---

## 5. How to Use a ConsentToken in API Calls

Every `ExchangeClient` request requires the token ID. The SDK includes it in the `auth` block of the `BSPRequest` — you do not need to manage this manually.

```typescript
import { ExchangeClient } from '@bsp/sdk'

const exchange = new ExchangeClient({
  ieoId:      genomicsLabIeoId,
  privateKey: ieoPrivateKey,
  network:    'testnet',
  relayerUrl: process.env.BSP_RELAYER_URL,
})

// The consentTokenId is attached to every request automatically
const result = await exchange.submit({
  record,
  consentTokenId: tokenId,
})

const records = await exchange.query({
  beoId:          patientBeoId,
  consentTokenId: tokenId,
  intent:         'READ_RECORDS',
  filters: {
    categories: ['BSP-HM'],
    period:     { from: '2026-01-01', to: null },
    limit:      100,
  },
})
```

If you are calling the BSP relayer HTTP API directly (without the SDK), include the token in the request body:

```http
POST https://relayer.testnet.biologicalsovereigntyprotocol.com/exchange
Content-Type: application/json

{
  "request_id":  "uuid-v4-here",
  "bsp_version": "0.2.0",
  "timestamp":   "2026-03-24T10:00:00Z",
  "requester": {
    "ieo_id":     "...",
    "ieo_domain": "genomicslab.bsp",
    "signature":  "ed25519-signature-of-request-id+timestamp+beo-id"
  },
  "intent":  "SUBMIT_RECORD",
  "target": {
    "beo_id":     "...",
    "beo_domain": "alice.bsp"
  },
  "auth": {
    "consent_token_id": "token-id-here"
  },
  "payload": { ... }
}
```

---

## 6. How to Revoke a ConsentToken

### Revoke a Specific Token

```typescript
import { BEOClient } from '@bsp/sdk'

const client = new BEOClient({
  privateKey: userPrivateKey,
  beoId:      userBeoId,
  network:    'testnet',
  relayerUrl: process.env.BSP_RELAYER_URL,
})

// Revoke by token ID
const result = await client.revokeToken(tokenId)
console.log(result.status)      // REVOKED
console.log(result.revokedAt)   // ISO8601 timestamp
console.log(result.arweaveTx)   // On-chain proof of revocation
```

### Revoke All Tokens for a Specific IEO

```typescript
// Revoke all access granted to a given institution
const result = await client.revokeAllForIeo(genomicsLabIeoId)
console.log(`Revoked ${result.tokensRevoked} tokens.`)
```

### Revoke All Tokens for a Specific Intent

```typescript
// Remove READ_RECORDS permission from every institution that has it
const result = await client.revokeByIntent('READ_RECORDS')
console.log(`Revoked ${result.tokensRevoked} tokens.`)
```

In all cases, revocation is a single Arweave transaction. The `AccessControl` contract marks the token as `revoked: true`. All subsequent requests using that token receive `TOKEN_REVOKED` with no grace period.

---

## 7. Expiry vs. Revocation — Key Difference

These are two separate mechanisms with different semantics:

| | Expiry | Revocation |
|---|---|---|
| **Trigger** | `expires_at` timestamp passes | User calls `revokeToken()` |
| **Who controls it** | Set at grant time by the user | User, at any time, instantly |
| **Error code** | `TOKEN_EXPIRED` | `TOKEN_REVOKED` |
| **Can it be renewed?** | Yes — user issues a new token | No — once revoked, never reinstated |
| **Retryable?** | No | No |
| **On-chain state** | `revoked: false`, `expires_at` is past | `revoked: true` |
| **When to use** | Time-limited access (physician visit, trial) | Immediate termination of trust |

A token can be both expired and revoked — the first condition encountered wins. In practice, if a user revokes a token before it expires, the IEO sees `TOKEN_REVOKED`, not `TOKEN_EXPIRED`.

For medical access patterns:

- A 30-day physician token expiring naturally is the expected path. The physician stops having access automatically.
- If the patient loses trust in the institution mid-period, they revoke immediately. No waiting for expiry.

---

## 8. Security Considerations

**The IEO never holds the user's private key.** The ConsentToken is a delegation artifact — it proves the user authorized the IEO, but the user's key material never leaves the device.

**Always verify before every operation.** Do not cache verification results. Tokens can be revoked between two consecutive requests from the same session. The verification call is fast (on-chain read from Arweave gateway cache).

**Store token IDs, not token contents.** The full token object lives on Arweave. Your system only needs to store the `token_id` (UUID) and look up the current state when needed.

**Treat `TOKEN_REVOKED` as permanent.** Never retry a revoked token. Do not prompt the user with "something went wrong, try again." Ask them to grant a new ConsentToken explicitly.

**Scope minimization.** Request only the intents and categories you actually need. A token requesting `SUBMIT_RECORD` for `BSP-HM` only is far easier for users to understand and trust than a broad "all categories, all intents" grant.

**Audit trail.** Every token grant and revocation is permanently on Arweave. Users can view their full consent history at any time via `BEOClient.getConsentHistory()`. Build UIs that surface this — it is a trust signal.

```typescript
// Inspect the full consent history for a BEO
const history = await client.getConsentHistory()

for (const entry of history.entries) {
  console.log(`[${entry.grantedAt}] ${entry.ieoId} — ${entry.scope.intents.join(', ')}`)
  if (entry.revoked) {
    console.log(`  Revoked at: ${entry.revokedAt}`)
  } else if (entry.expiresAt) {
    console.log(`  Expires:    ${entry.expiresAt}`)
  } else {
    console.log('  Permanent (no expiry)')
  }
}
```

---

## See Also

- [Quickstart — Full Flow in 10 Minutes](./quickstart-10min.md)
- [BEO Specification](../reference/beo.md) — BEO schema, lifecycle, Social Recovery
- [IEO Specification](../reference/ieo.md) — IEO types, permission matrix, certification
- [Exchange Protocol](../reference/exchange-protocol.md) — full BSPRequest/BSPResponse schemas and intent reference
- [Security & Blockchain](./security-blockchain.md) — Arweave, Ed25519, AccessControl contract architecture
