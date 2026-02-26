# ConsentToken & AccessControl

"Consent is not a privacy policy. It is a mathematical instruction recorded on the blockchain."

## Overview
The BSP consent system makes biological sovereignty a technical reality. It defines how a BEO holder authorizes other systems to interact with their biological data with surgical precision over what can be accessed, by whom, and for how long.

The central instrument is the **ConsentToken** — a cryptographic authorization issued by the `AccessControl` smart contract on Arweave after the holder signs it with their private key.

Without a valid ConsentToken, no data operation is possible. The gatekeeper is the individual, not the Ambrósio Institute.

## The ConsentToken Schema

```json
{
  "token_id": "uuid",
  "beo_id": "uuid",
  "ieo_id": "uuid",
  "granted_at": "ISO8601",
  "expires_at": "ISO8601 | null",
  "scope": {
    "intents": ["SUBMIT_RECORD", "READ_RECORDS"],
    "categories": ["BSP-LA", "BSP-CV"],
    "levels": ["CORE", "STANDARD"],
    "period": { "from": null, "to": null },
    "max_records": 100
  },
  "revocable": true,
  "owner_signature": "ed25519_signature"
}
```

### Scope Properties
*   **intents**: The actions the IEO is authorized to perform (e.g., `READ_RECORDS`, `ANALYZE_VITALITY`).
*   **categories**: Which BSP categories are accessible. Limiting this ensures a hematology lab cannot access neurology data (`BSP-NR`).
*   **levels**: Which taxonomy levels are accessible.
*   **period**: The historical time window of data the IEO can see.

## Standard Token Types by Relationship

| Relationship | Default Duration | Intents | Scope | Renewal |
|--------------|------------------|---------|-------|---------|
| **User → Laboratory** | Single use / Permanent | `SUBMIT_RECORD` | Lab-specific | Revocation only |
| **User → Physician** | 30–90 days | `READ_RECORDS` | Selected categories | Manual |
| **User → AVA/PLT** | Permanent | `ANALYZE_VITALITY`, `REQUEST_SCORE` | All categories | Annual refresh |
| **User → Wearable** | Permanent | `SUBMIT_RECORD` | `BSP-DV` only | Revocation only |
| **User → Insurer** | 12 months | `REQUEST_SCORE` | SVA score only | Annual opt-in |

### Principle of Least Privilege
BSP adopts the principle of least privilege: each ConsentToken must contain only the intents, categories, and periods strictly necessary for the stated purpose.

## Revocation
Revocation is the most important right of the BEO holder. **Any ConsentToken can be revoked at any time, with immediate on-chain effect.**

*   `revokeToken(token_id)`: Revokes a specific token.
*   `revokeAllFromIEO(ieo_id)`: Revokes all tokens from a specific institution.
*   `revokeAllTokens()`: Emergency switch to revoke everything.

The moment a token is revoked, the `AccessControl` contract records `revoked_at`. From that second onward, any operation attempting to use that token will fail immediately with `TOKEN_REVOKED`. The institution is not notified automatically; they discover it when access is blocked.
