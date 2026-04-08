# Glossary

All terms, objects, types, contracts, and repositories in the BSP ecosystem defined precisely in a single reference document.

---

## Core Protocol Objects

### BEO — Biological Entity Object
The sovereign biological identity of a living human in the BSP ecosystem. A permanent object stored on Arweave, identified by a `.bsp` domain (e.g., `andre.bsp`), and controlled exclusively by the holder through a private key. All BioRecords are anchored to the BEO. All ConsentTokens are issued from it. No company, government, or the Ambrósio Institute can access, modify, or delete a BEO without the holder's private key.
*See: [BEO Specification](./beo.md)*

### BioRecord
The atomic unit of biological data. Every measurement — lab result, wearable reading, clinical assessment, genomic marker — is a BioRecord. BioRecords are immutable after writing: corrections are new records that supersede the previous, preserving the complete history. Each BioRecord contains: the BSP biomarker code, value with unit, reference ranges, submitting institution (cryptographically signed), raw data hash, and timestamp.
*See: [BEO Specification](./beo.md) · [Exchange Protocol](./exchange-protocol.md)*

### BIP — BSP Improvement Proposal
The formal mechanism for BSP protocol evolution. Anyone — researcher, physician, lab, developer, or individual — can submit a BIP. A valid BIP must include: scientific justification, at least two peer-reviewed references, proposed BSP code, and a clinical measurability statement. The Scientific Council reviews proposals quarterly.
*See: [Governance](./governance.md)*

### .bsp Domain
Human-readable, permanent biological address in the BSP ecosystem. Functions as the public identifier for a BEO (e.g., `andre.bsp`) or IEO (e.g., `fleury.bsp`). Registered in the DomainRegistry smart contract — guaranteeing global uniqueness. Once registered, belongs to the holder permanently. Institutional domains are transferable on acquisition or merger.

### ConsentToken
Cryptographic authorization allowing an IEO to interact with a BEO holder's data. Issued by the AccessControl smart contract after the BEO holder signs the authorization. Each token defines: who can access (`ieo_id`), who is accessed (`beo_id`), permitted actions (intents), accessible data categories, and duration. Always revocable by the holder — instantly, on-chain.
*See: [ConsentToken & Access Control](./consent-token.md)*

### IEO — Institutional Entity Object
The institutional identity of any organization, system, or professional that interacts with biological data. Any institution can create an IEO without prior approval. The IEO establishes cryptographic identity, records operational history, and may carry voluntary BSP Certification status.
**Types**: `LABORATORY`, `HOSPITAL`, `WEARABLE`, `PHYSICIAN`, `INSURER`, `RESEARCH`, `PLATFORM`
*See: [IEO Specification](./ieo.md)*

---

## Smart Contracts & Blockchain

### AccessControl
The most critical BSP contract. Manages all consent grants between BEOs and IEOs. Any system attempting to write a BioRecord or read BEO data must present a valid authorization registered in this contract. Without the holder's signature, the transaction is rejected by the blockchain — no server can bypass it. AccessControl is the true gatekeeper of the protocol.
*See: [Security & Blockchain](../guides/security-blockchain.md)*

### Arweave
Decentralized storage blockchain where all BSP data and AO processes live. Pay once — data persists for 200+ years, guaranteed by a mathematical endowment model. Chosen because: eliminates central server dependency, even if the Institute closes, BEOs and BioRecords remain accessible. BSP processes run as AO processes on Arweave.

### AO
Arweave's hyper-parallel compute platform. BSP processes run as AO processes on Arweave, using Lua for on-chain logic. Each process is permanent and communicates via messages. SDK: `@permaweb/aoconnect`.

### BEORegistry
AO process on Arweave responsible for creating and indexing BEOs. **Open to anyone** — no approval from the Ambrósio Institute required. Records: public address, public key hash, and basic BEO metadata.

### DomainRegistry
AO process controlling the `.bsp` namespace. Guarantees uniqueness: `andre.bsp` can only exist once. Manages registrations, transfers, and revocations following protocol rules. Automatically consulted by the bsp-sdk when creating BEOs and IEOs.

### Governance (process)
AO process controlling modifications to other critical BSP processes. Implements the multi-signature model: critical operations (suspending an IEO, modifying protocol parameters) require signatures from at least 2 of 3 Institute authorized keyholders. No individual — including the founder — can unilaterally alter protocol rules.

### IEORegistry
AO process on Arweave managing BSP-Certified IEOs. Records which institutions obtained the certification seal, at which level, and with which authorized categories. Consulted by Ambrosio OS and other apps to verify institution credentials.

---

## Intelligence Layer

### AVA — Ambrósio Vitality Algorithm
The Ambrósio Institute's proprietary biological aging algorithm. Not part of the BSP specification — it's a reference implementation built on top of the open protocol. AVA never has passive access to any BEO: it processes data only when the user actively initiates an analysis, sending their BioRecords with explicit session consent. Runs on Institute infrastructure (private `ava-core` repository). The Institute's competitive advantage: not the protocol, but the intelligence that processes the standardized data the protocol enables.

### SVA — Ambrósio Vitality Score
Output produced by AVA processing a user's BSP BioRecords. Not a single number — a multi-dimensional biological age score: cardiovascular, immunological, metabolic, neurological, aging velocity, and biological reserve percentile. Proprietary: can only be produced by the Institute's `sva-engine`. Represents the final product the user sees and experiences in Ambrosio OS.

---

## Protocol Concepts & Types

### BSP — Biological Sovereignty Protocol
Open standard defining a universal language for biological data exchange. Defines how data is structured (BioRecord), identified (BEO, IEO, .bsp), exchanged (Exchange Protocol / BSPIntent), and governed (BIP, Governance). Does not define what to do with data — intelligence like AVA operates above the protocol, not within it.

### BSP-Certification
Voluntary quality seal granted by the Ambrósio Institute to institutions meeting technical and compliance requirements. Not required to participate in the ecosystem. Benefits: official directory listing, Ambrosio OS suggestion, verifiable on-chain badge, and AVA data pipeline access.
**Levels**: BSP-1 (Basic), BSP-2 (Advanced), BSP-3 (Full Spectrum), BSP-4 (Device)

### BSPIntent
Typed enum defining what action a system requests in the Exchange Protocol. Each ConsentToken authorizes specific intents.

| Intent | Description |
|--------|-------------|
| `SUBMIT_RECORD` | Write a BioRecord to the BEO |
| `READ_RECORDS` | Read existing BioRecords |
| `ANALYZE_VITALITY` | Request AVA analysis |
| `REQUEST_SCORE` | Request SVA score |
| `EXPORT_DATA` | Export all data (always available to BEO holder) |
| `SYNC_PROTOCOL` | Protocol version negotiation |

### CertLevel
Enum representing BSP certification levels for an institution.
`UNCERTIFIED` → `BASIC` (BSP-1: L2 Standard) → `ADVANCED` (BSP-2: L1+L2) → `FULL` (BSP-3: all levels) → `DEVICE` (BSP-4: continuous device data) → `RESEARCH` (aggregate anonymized)

### Exchange Protocol
The BSP layer defining how data moves between systems. Specifies the format of requests and responses, intent types, and how authenticated systems interact with BEOs. Any system implementing the Exchange Protocol can send and receive BSP-format biological data.
*See: [Exchange Protocol](./exchange-protocol.md)*

### IEOStatus
Enum representing the operational state of an IEO.
`ACTIVE` → normal operation | `SUSPENDED` → renewal pending or compliance failure | `REVOKED` → permanent, cannot be reversed | `PENDING` → being created or certified

### Social Recovery
Mechanism for recovering a BEO private key without a central server. The holder designates up to 3 trusted guardians. To recover access, at least 2 of 3 guardians must confirm — no guardian can act alone. Guardians have no access to the BEO data, only the ability to confirm identity in a recovery.
*See: [Security & Blockchain](../guides/security-blockchain.md)*

---

## Repositories

| Repository | Access | Purpose |
|------------|--------|---------|
| `bsp-spec` | Public | Complete protocol specification |
| `bsp-sdk-typescript` | Public | Official TypeScript SDK (`bsp-sdk`) |
| `bsp-sdk-python` | Public | Official Python SDK (`bsp-sdk`) |
| `bsp-cli` | Public | Official CLI (`npx bspctl`) — 22 commands |
| `bsp-mcp` | Public | Official MCP server for AI connectivity (9 tools) |
| `bsp-id-web` | Public | BSP identity web application |
| `bsp-docs-repo` | Public | This documentation site |
| `bsp-contracts` | Private | Smart contracts — source, tests, build, deploy (unified) |
| `bsp-registry-api` | Private | Gasless relayer API — 36 REST routes, pays Arweave gas |
