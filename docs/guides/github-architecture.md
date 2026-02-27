# GitHub Architecture

The BSP GitHub infrastructure is organized into two distinct organizations, following the same pattern adopted by open protocols like Anthropic's MCP and HL7's FHIR.

> "The protocol belongs to the world. The intelligence belongs to Ambrósio. The sovereignty belongs to the individual."

---

## Two Organizations, One Ecosystem

| | Public | Private |
|--|--------|---------|
| **Organization** | `biological-sovereignty-protocol` | `ambrosio-institute` |
| **Repositories** | 5 — all public | 4 — all private |
| **License** | CC BY 4.0 | Proprietary IP |
| **Access** | Anyone — clone, fork, contribute | Institute only |
| **Purpose** | The open standard | Operations + proprietary intelligence |

---

## Public Organization: `biological-sovereignty-protocol`

Everything here defines the open standard. Any developer, laboratory, researcher, or AI platform can use it without permission, without payment, without vendor lock-in.

### `bsp-spec` — Protocol Specification

The canonical definition of the standard. If the spec doesn't define it, it's not BSP.

```
bsp-spec/
├── spec/
│   ├── overview.md           # Three-layer architecture
│   ├── beo.md                # Biological Entity Object spec
│   ├── ieo.md                # Institutional Entity Object spec
│   ├── biorecord.md          # BioRecord format and validation
│   ├── exchange.md           # Exchange Protocol (request/response)
│   ├── bsp-domain.md         # .bsp domain system
│   ├── governance.md         # Governance model and BIPs
│   └── taxonomy/
│       ├── level-1-core.md
│       ├── level-2-standard.md
│       ├── level-3-extended.md
│       └── level-4-device.md
├── bip/                      # BSP Improvement Proposals
│   └── BIP-0000-template.md
├── examples/                 # Example BioRecords and BEOs in JSON
└── LICENSE                   # CC BY 4.0
```

### `bsp-sdk-typescript` — Official TypeScript SDK

Published on npm as `@bsp/sdk`. For web platforms, mobile apps, and backend services.

**Exports:**
- `BEOClient` — Create and manage Biological Entity Objects
- `BioRecordBuilder` — Construct valid, standardized BioRecords
- `ExchangeClient` — Submit and read data against the protocol
- `TaxonomyResolver` — Validate and resolve BSP biomarker codes
- `AccessManager` — Manage ConsentTokens on-chain

```bash
npm install @bsp/sdk
```

### `bsp-sdk-python` — Official Python SDK

Published on PyPI as `bsp-sdk`. For laboratories, bioinformaticians, and researchers.

```bash
pip install bsp-sdk
```

Same capabilities as the TypeScript SDK, optimized for scientific pipelines and Laboratory Information System (LIS) integration.

### `bsp-mcp` — Official MCP Server

Connects AI agents to the BSP protocol following the [Model Context Protocol](https://modelcontextprotocol.io). Any MCP-compatible AI platform — Claude, GPT, or any other — can use this server to read BEO data with active user consent.

**Available tools:**
- `bsp_get_biorecords` — Read BioRecords with active consent
- `bsp_get_beo_summary` — Get biological profile summary
- `bsp_resolve_biomarker` — Look up BSP biomarker codes (no consent required)
- `bsp_list_categories` — List taxonomy categories (no consent required)
- `bsp_check_consent` — Check current consent status

```bash
npm install @bsp/mcp
```

### `bsp-docs` — Public Documentation

This site. Powers `biologicalsovereigntyprotocol.com`. The human entry point for anyone wanting to understand or integrate BSP.

---

## Private Organization: `ambrosio-institute`

These repositories are private — not because the protocol requires them to be, but because they contain the Institute's operational infrastructure and proprietary intelligence that constitutes its competitive advantage.

### `bsp-registry` — Smart Contracts on Arweave

The five SmartWeave contracts that run the protocol's on-chain infrastructure:

| Contract | Purpose | Who Can Call |
|----------|---------|-------------|
| `BEORegistry` | Create and index BEOs | Anyone — open |
| `IEORegistry` | Manage certified institutions | Institute (certification); anyone (verify) |
| `DomainRegistry` | `.bsp` namespace uniqueness guarantor | Automatic (via SDK) |
| `AccessControl` | Consent management — the true gatekeeper | BEO holders (grant/revoke); IEOs (verify) |
| `Governance` | Multi-sig for critical protocol changes | 2-of-3 Institute keyholders |

Contracts are **immutable after deployment**. The specification of how they work is public in `bsp-spec`.

### `bsp-registry-api` — Certification Portal

The human workflow layer for voluntary BSP Certification. Laboratories seeking the BSP-Certified seal interact here — submitting documentation, tracking status, receiving credentials.

**What passes through this API:**
- ✓ Certification requests and documentation
- ✓ Approval status and badge issuance
- ✓ BIP submissions and review
- ✗ **Never**: biological data, BioRecords, private keys, blockchain transactions

### `ava-core` — AVA Algorithm (Proprietary)

The Ambrósio Vitality Algorithm. Proprietary machine learning models trained on BSP-standardized longitudinal biological data. Processes BioRecords when a user **actively initiates** an analysis — never has passive access to any BEO.

This is the Institute's central intellectual asset. The protocol is open. The intelligence is the moat.

### `sva-engine` — SVA Scoring Engine (Proprietary)

Converts AVA's analysis into the multi-dimensional **Ambrósio Vitality Score (SVA)**:

- Cardiovascular biological age
- Metabolic biological age
- Neurological biological age
- Immunological biological age
- Aging velocity (relative to chronological baseline)
- Biological reserve (population percentile)

The SVA is the product the user sees and experiences. Proprietary — cannot be reproduced by any other system.

---

## Build Sequence

The repositories are designed to be built in this order — each depends on the previous:

```
1. bsp-spec             Foundation — the standard everything implements
2. bsp-registry         On-chain infrastructure — immutable after deployment
3. bsp-registry-api     Certification portal — built on top of the contracts
4. bsp-sdk-typescript   First SDK — widest integration coverage
5. bsp-mcp              AI connectivity — requires the TypeScript SDK
6. bsp-sdk-python       Lab SDK — follows the same spec as TypeScript
7. ava-core             Intelligence — trained on standardized BSP data
8. sva-engine           Scoring — built on AVA analysis
9. bsp-docs             Documentation — grows with the ecosystem
```

---

## GitHub Costs

| Organization | Repositories | Cost |
|-------------|-------------|------|
| `biological-sovereignty-protocol` (5 public) | Free — public repos always free |
| `ambrosio-institute` (4 private, ≤3 collaborators) | Free — GitHub Free tier |
| `ambrosio-institute` (4 private, team expansion) | $4/user/month (GitHub Team) |
