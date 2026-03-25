# Protocol Overview

The Biological Sovereignty Protocol (BSP) is built on three distinct but interconnected layers. Understanding these layers is the foundation for understanding any integration with the protocol.

---

## The Three Layers

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3 — EXCHANGE                                         │
│  How data moves: Exchange Protocol, Intents, ConsentTokens  │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 — DATA                                             │
│  What the data is: BioRecord, Biomarker Taxonomy            │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1 — IDENTITY                                         │
│  Who the actors are: BEO, IEO, .bsp Domains                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Identity

Every participant in the BSP ecosystem has a cryptographic identity.

### BEO — Biological Entity Object
The sovereign biological identity of a living human being. A BEO is:

- **Created by the individual** — no permission required from any authority
- **Controlled by a private key** — stored locally on the user's device, never transmitted
- **Permanent** — anchored on the Arweave blockchain, cannot be deleted
- **Identified by a `.bsp` domain** — e.g., `andre.bsp`

All BioRecords for a person are attached to their BEO. All ConsentTokens authorizing access are issued from it.

### IEO — Institutional Entity Object
The identity of any organization that interacts with biological data: laboratories, hospitals, wearable manufacturers, physicians, insurers, research institutions, AI platforms.

- **Created by the institution** — open, no approval required
- **Identified by a `.bsp` domain** — e.g., `fleury.bsp`
- **Can be BSP-Certified** — voluntary quality mark that enables AVA data pipeline access

### BEO vs IEO

| Property | BEO | IEO |
|----------|-----|-----|
| Represents | A living human | An organization or system |
| Created by | The individual | Any institution |
| Transferable | Never | Yes (acquisitions) |
| Can read BEOs | Own data only | Only with ConsentToken |
| Can write BioRecords | No | Yes, with ConsentToken |
| Domain format | `firstname.bsp` | `institutionname.bsp` |

---

## Layer 2: Data

### BioRecord
The atomic unit of biological data in the BSP ecosystem. Every measurement — blood test result, wearable reading, clinical assessment, genomic marker — is represented as a standardized BioRecord.

Key properties:
- **Immutable**: Once written, a BioRecord cannot be modified. Corrections are submitted as new, superseding records.
- **Encrypted**: Stored encrypted with the BEO holder's public key. Only the holder can decrypt.
- **Attributed**: Cryptographically signed by the submitting IEO, providing full provenance.
- **Standardized**: Uses BSP biomarker codes (e.g., `BSP-LA-004` for NAD+).

### Biomarker Taxonomy
BSP defines the most comprehensive open biomarker taxonomy ever codified — 210+ biomarkers across 25 categories and 4 levels:

| Level | Coverage | Who can submit |
|-------|----------|---------------|
| L1 — Core | Advanced longevity markers | BSP-2 (Advanced) certified |
| L2 — Standard | Routine clinical labs | BSP-1 (Basic) certified |
| L3 — Extended | Genomics, microbiome, specialized | BSP-3 (Full) certified |
| L4 — Device | Continuous wearable biometrics | BSP-4 (Device) certified |

---

## Layer 3: Exchange

### Exchange Protocol
The communication layer that defines how data moves between systems. Every interaction is a `BSPRequest` → `BSPResponse` cycle.

Requests are authenticated twice:
1. **ConsentToken**: Proof that the BEO holder authorized this IEO for this action
2. **IEO Signature**: The institution's cryptographic signature on the request

### BSP Intents
The Exchange Protocol uses typed intents to define what action is being requested:

| Intent | Description |
|--------|-------------|
| `SUBMIT_RECORD` | Write a BioRecord to a BEO |
| `READ_RECORDS` | Read BioRecords from a BEO |
| `ANALYZE_VITALITY` | Request AVA analysis |
| `REQUEST_SCORE` | Request SVA score |
| `EXPORT_DATA` | Export all data (always available to BEO holder) |
| `SYNC_PROTOCOL` | Version negotiation |

### ConsentToken
A cryptographic authorization issued by the BEO holder to a specific IEO, for specific intents, specific data categories, and a defined time period. Stored as a SmartWeave contract on Arweave — mathematically immune to bypass.

Revocation is **immediate and on-chain**. No IEO can retain access after revocation.

---

## The Blockchain Layer: Arweave

All BSP data and smart contracts live on **Arweave** — a decentralized storage blockchain designed for permanent data retention (200+ years, guaranteed by a mathematical endowment model).

Key properties for BSP:
- **No central server** — data doesn't depend on any company's survival
- **Immutable history** — every transaction is permanent and auditable
- **One-time payment** — pay once to store, data exists forever
- **Open access** — anyone can read the public data (BEO registry, IEO registry)

The five BSP smart contracts on Arweave:

| Contract | Purpose |
|----------|---------|
| `BEORegistry` | Creates and indexes BEOs — open to anyone |
| `IEORegistry` | Manages certified institutions |
| `DomainRegistry` | Guarantees uniqueness of `.bsp` domains |
| `AccessControl` | The gatekeeper — manages all consent tokens |
| `Governance` | Multi-sig for critical protocol changes |

---

## Next Steps

- [BEO Specification →](./beo.md)
- [IEO Specification →](./ieo.md)
- [ConsentToken & Access Control →](./consent-token.md)
- [Exchange Protocol →](./exchange-protocol.md)
- [Developer Quickstart →](../quickstart/README.md)
