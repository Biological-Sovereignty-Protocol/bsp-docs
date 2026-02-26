# Biological Entity Object (BEO)

"The sovereign biological identity of a human being. The anchor point for all measured life."

## Overview - What is a BEO?
The BEO is the foundation of the entire BSP ecosystem. It represents a living human being — the sovereign owner of their biological data. All of a person's BioRecords are anchored to it. All ConsentTokens that authorize access are issued from it. 

A BEO is the permanent, sovereign identity of a human in the BSP ecosystem. It is created by the individual directly on Arweave, without approval from any authority. Once created, it belongs to the holder forever.

### BEO vs IEO — Fundamental Distinction

| Feature | BEO — Biological Entity Object | IEO — Institutional Entity Object |
|---------|----------------|----------------|
| **Represents** | A living human being | An organization, system, or professional |
| **Created by** | The individual — no approval required | Any institution — directly |
| **Transferable** | Never — permanent individual identity | Yes — on company acquisition or merger |
| **Can read BEOs** | Own data only | Never without valid consent token |
| **Can write BioRecords** | Cannot — humans observe, not record | Yes — with active ConsentToken |
| **Domain format** | `firstname.bsp` | `institutionname.bsp` |
| **Cost** | Free — sovereignty is a right | Paid — annual certification fee |
| **Revocable by** | Individual only | Institute can revoke for violations |

## Cryptographic Identity — The BEO Keys
BEO control is entirely determined by the possession of the private key.

*   `private_key`: Ed25519 format. Generated locally. Never transmitted. Used to sign authorizations, decrypt records, and sign Arweave transactions.
*   `public_key`: Registered in the BEORegistry on Arweave. Used to identify the target BEO and encrypt data before submission.
*   `seed_phrase`: 24 BIP-39 words. Mnemonic representation of the private key.

### Social Recovery
The BEO functions normally without guardians, but users can configure Social Recovery at any time.

*   **Guardians**: Up to 3 trusted contacts. No guardian has access to the BEO's data. Each receives a cryptographic fragment of the recovery key.
*   **Threshold**: Minimum of 2 guardians needed to authorize recovery (Padrão BSP: 2-of-3).
*   **Mechanism**: Shamir Secret Sharing is used. Fragments are encrypted with the guardian's public key and stored on Arweave.

## Schema
The BEO is a structured object managed by the `BEORegistry` smart contract on Arweave.

```json
{
  "beo_id": "uuid",
  "domain": "andre.bsp",
  "public_key": "ed25519_key",
  "records": [],
  "record_count": 0,
  "access_control": {
    "active_consents": [],
    "revoked_consents": [],
    "default_policy": "DENY_ALL"
  },
  "recovery": {
    "guardians": [],
    "threshold": 2
  },
  "status": "ACTIVE"
}
```

## Smart Contracts — BEO Operations

The BEO is governed by two smart contracts on Arweave:

### BEORegistry
*   `createBEO()`: Creates a new BEO and registers the `.bsp` domain.
*   `getBEO()`: Reads public metadata of a BEO.
*   `updateRecovery()`: Updates guardian configuration (requires private key signature).
*   `rotateKey()`: Replaces the public key after Social Recovery.
*   `lockBEO()` / `unlockBEO()`: Temporarily locks/unlocks the BEO.

### AccessControl
*   `issueToken()`: Issues a ConsentToken for a specific IEO.
*   `revokeToken()`: Immediately revokes a ConsentToken.
*   `verifyToken()`: Verifies if a ConsentToken is valid for a specific operation.
*   `listActiveTokens()`: Lists all active ConsentTokens.
*   `getTokenHistory()`: Returns the full history of issued, expired, and revoked tokens.

> [!IMPORTANT]
> `issueToken()` and `revokeToken()` are exclusively reserved for the BEO holder. No institution — not even the Ambrósio Institute — can grant or revoke access to a person's data.
