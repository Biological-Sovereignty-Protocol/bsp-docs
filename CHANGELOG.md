# Changelog — BSP Documentation

All notable changes to the BSP documentation are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.2.0] — 2026-04-06

Synced all documentation from BSP website (biologicalsovereigntyprotocol.com).

### Updated

- **Whitepaper**: Sovereign Cryptographic Erasure (Section 4.4), updated vision
- **BEO spec**: Lock/Unlock operations, updated lifecycle
- **IEO spec**: Updated certification levels and registration flow
- **Exchange spec**: ADD_INTENT/REMOVE_INTENT operations
- **Governance spec**: Full multisig 2-of-3 proposal system
- **Ecosystem flow**: Updated architecture diagrams
- **Security & Blockchain**: Updated Arweave and double-auth model
- **GitHub Architecture**: Repository structure and CI/CD docs

### Added

- **BSP Domain spec** (`docs/reference/bsp-domain.md`): Domain transfer flow, `.bsp` namespace operations
- **BioRecord spec** (`docs/reference/biorecord.md`): Schema, taxonomy codes, versioning
- **Privacy Policy** (`docs/legal/privacy.md`): Right to Erasure via Cryptographic Erasure, LGPD/GDPR
- **Terms of Service** (`docs/legal/terms.md`): Data Sovereignty clarification

---

## [0.1.0] — 2026-03-24

Initial public release of BSP documentation.

### Added

**Core references**
- Whitepaper: Biological Sovereignty Protocol — vision, motivation, and design principles
- Protocol specification overview (see `bsp-spec` repo for full spec)
- BEO (Biological Entity Object) reference — structure, lifecycle, fields, registration
- IEO (Institutional Entity Object) reference — types, certification levels, registration
- ConsentToken reference — structure, scope, intents, lifecycle states
- BioRecord reference — schema, taxonomy codes, required fields, versioning model

**Architecture**
- Ecosystem flow diagram: BEO ↔ IEO ↔ Exchange ↔ AccessControl
- Double-authentication model explained (ConsentToken + IEO signature)
- Arweave permanence guarantees and transaction model
- Domain system — `.bsp` namespace, registration, resolution

**Biomarker taxonomy**
- Taxonomy overview — 4 levels: Core, Standard, Extended, Device
- Category reference: BSP-HM (hematology), BSP-LA (laboratory), BSP-CV (cardiovascular),
  BSP-GN (genomics), BSP-MB (microbiome), BSP-NT (nutrition), BSP-WT (wearable)
- Code format specification: `BSP-XX-NNN`

**Developer guides**
- Quickstart: 10-minute tutorial — install SDK, create BEO, submit first BioRecord
- Consent token flow deep-dive — issuing, verifying, revoking, audit log
- Error codes reference — full list with descriptions and retry guidance
- SDK installation guide (TypeScript and Python)

**Governance**
- BIP (BSP Improvement Proposal) process overview
- Versioning policy — spec vs. SDK vs. docs

---

[0.1.0]: https://github.com/biological-sovereignty-protocol/bsp-docs-repo/releases/tag/v0.1.0
