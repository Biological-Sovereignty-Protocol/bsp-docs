# ConsentToken & Access Control

The ConsentToken is the cryptographic instrument of data sovereignty in the BSP. No institution can read or write any data in a BEO without a valid ConsentToken, issued by the BEO holder and enforced on-chain by the AccessControl smart contract.

> "Consent is not a checkbox. It is a mathematical instruction on the blockchain — specific, scoped, and revocable at any moment."

---

## 1. How Consent Works

```
User (BEO Holder)
     │
     │ signs authorization
     ▼
AccessControl Smart Contract (Arweave)
     │
     │ mints ConsentToken
     ▼
Institution (IEO)
     │
     │ presents token with every request
     ▼
AccessControl verifies → grants or rejects
```

The AccessControl contract is the only gatekeeper. No server can bypass it. No institution can fake a token. When a token is revoked, it is immediately and permanently invalid.

---

## 2. ConsentToken Schema

```typescript
interface ConsentToken {
  token_id:    string      // Unique identifier for this consent grant
  beo_id:      string      // The BEO granting consent
  ieo_id:      string      // The IEO receiving permission
  granted_at:  string      // ISO8601 — when the user approved
  expires_at:  string | null  // null = permanent
  revoked:     boolean     // true = immediately invalid

  scope: {
    intents:    BSPIntent[]   // What actions are permitted
    categories: string[]      // Which BSP categories are accessible (e.g., ["BSP-LA", "BSP-HM"])
    levels:     BioLevel[]    // Which taxonomy levels (CORE, STANDARD, EXTENDED, DEVICE)
    period: {                 // Historical data range accessible
      from: string | null
      to:   string | null
    } | null
  }

  revocable:   boolean     // Always true — user can always revoke
  token_hash:  string      // On-chain verification hash
}
```

---

## 3. Intent Types

Every ConsentToken authorizes one or more intents:

| Intent | Description | Typical Grant Duration |
|--------|-------------|----------------------|
| `SUBMIT_RECORD` | Write a BioRecord to the BEO | Single-use or per-session |
| `READ_RECORDS` | Read BioRecords from the BEO | 30–90 days (physicians); permanent (platforms) |
| `ANALYZE_VITALITY` | Request AVA vitality analysis | Permanent (refreshable) |
| `REQUEST_SCORE` | Request SVA score | Annual (insurers with opt-in) |
| `EXPORT_DATA` | Export all data | Always available to BEO holder |
| `SYNC_PROTOCOL` | Protocol version negotiation | Per session |

---

## 4. Token Types by Relationship

| Relationship | Duration | Scope |
|-------------|----------|-------|
| User → Laboratory (submission) | Single use | `SUBMIT_RECORD` — specific categories only |
| User → Physician (review) | 30–90 days | `READ_RECORDS` — selected categories |
| User → Hospital (treatment) | Duration of treatment | `READ_RECORDS` — all relevant categories |
| User → AVA Platform | Permanent (refreshable) | `ANALYZE_VITALITY` + `REQUEST_SCORE` |
| User → Research | Duration of study | `READ_RECORDS` anonymized aggregate only |
| User → Insurer (opt-in) | Annual — must be renewed | `REQUEST_SCORE` — SVA composite only, no raw data |

---

## 5. Issuing a ConsentToken

### Via the App (User Journey)

1. User receives a consent request from an institution specifying: which institution, which categories, which intents, for how long.
2. User reviews the scope and approves in their BSP-compatible app.
3. App calls `AccessControl.createConsent()` on Arweave — the token is minted on-chain.
4. The institution receives the `token_id` and can now use it in requests.

### Via SDK (Developer/Integration)

```python
# Institutions do not create tokens — only users do.
# This is how an institution verifies a token presented by the user:

from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "yourlaboratory.bsp",
    private_key = YOUR_PRIVATE_KEY,
)

verification = client.verify_consent(
    token_id   = "token-uuid-presented-by-user",
    beo_domain = "patient.bsp",
    intent     = "SUBMIT_RECORD",
    category   = "BSP-HM",
)

if not verification.valid:
    # Handle specific errors
    print(verification.reason)
    # TOKEN_NOT_FOUND | TOKEN_REVOKED | TOKEN_EXPIRED
    # INTENT_NOT_AUTHORIZED | CATEGORY_NOT_AUTHORIZED
```

---

## 6. Revocation

Revocation is **instant and on-chain**. The moment a user revokes a token, the `AccessControl` contract marks it as revoked. All subsequent requests from the institution are immediately rejected.

```python
# From the user's perspective (via the app SDK)
client = BSPClient(
    beo_domain  = "andre.bsp",
    private_key = USER_PRIVATE_KEY,
)

result = client.revoke_consent(token_id="token-uuid-to-revoke")
print(result.status)  # REVOKED
# All future requests from this institution are rejected immediately
```

**Critical**: Institutions must always check consent status before making requests. They should never assume a previously valid token is still active.

---

## 7. AccessControl Smart Contract Functions

| Function | Authorized Caller | Description |
|----------|------------------|-------------|
| `grantConsent()` | BEO holder only | Issues a new ConsentToken. Requires Ed25519 signature. Only one active token per BEO+IEO pair. |
| `revokeToken()` | BEO holder only | Immediately revokes a specific token |
| `revokeAllFromIEO()` | BEO holder only | Revokes all active tokens granted to a specific IEO |
| `revokeByIntent()` | BEO holder only | Revokes all active tokens that include a specific intent |
| `revokeAllTokens()` | BEO holder only | Emergency: revokes all active tokens for the BEO |
| `verifyToken()` | Any IEO | Checks if a token is valid for a given intent + category. Returns `{ valid, reason }` — never throws. |
| `listTokens()` | Anyone | Returns all tokens for a BEO (with optional `activeOnly` filter) |

**Architectural guarantee**: Only the BEO holder can grant or revoke consent. No institution, no other system, and not even the Ambrósio Institute can grant access to a user's data on their behalf.

---

## 8. Error Codes

When consent verification fails, the AccessControl returns a structured error:

| Code | Description | Resolution |
|------|-------------|-----------|
| `TOKEN_NOT_FOUND` | Token ID does not exist on-chain | User must reissue |
| `TOKEN_REVOKED` | Token was revoked by the holder | User must reissue — do not retry |
| `TOKEN_EXPIRED` | Token's `expires_at` has passed | User must renew |
| `INTENT_NOT_AUTHORIZED` | Requested intent not in token scope | Request different permission |
| `CATEGORY_NOT_AUTHORIZED` | Requested BSP category not in scope | Request different permission |
| `BEO_LOCKED` | BEO is in LOCKED state | No operations permitted until unlocked by holder |

---

## See Also

- [Exchange Protocol →](./exchange-protocol.md)
- [BEO Specification →](./beo.md)
- [IEO Specification →](./ieo.md)
