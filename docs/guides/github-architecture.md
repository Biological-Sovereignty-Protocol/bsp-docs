---
title: "GitHub Repository Architecture"
description: "Organization of BSP repositories across public and private GitHub organizations."
---

# GitHub Architecture

> "The protocol belongs to the world. The intelligence belongs to Ambrósio. The sovereignty belongs to the individual."

BSP's GitHub infrastructure is split into two organizations. This separation reflects the core philosophy of the project.

---

## Two Organizations, One Ecosystem

| | Public | Private |
|--|--------|---------|
| **Organization** | `biological-sovereignty-protocol` | `ambrosio-institute` |
| **Repositories** | 9 — all public | 4 — all private |
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
│   ├── overview.md         # Three-layer architecture
│   ├── beo.md              # Biological Entity Object
│   ├── ieo.md              # Institutional Entity Object
│   ├── exchange.md         # Exchange Protocol
│   └── taxonomy/           # Full biomarker taxonomy
├── bip/                    # BSP Improvement Proposals
│   └── BIP-0000-template.md
├── examples/               # Example BioRecords in JSON
└── LICENSE                 # CC BY 4.0
```

### `bsp-sdk-typescript` — TypeScript SDK
Published on npm as `bsp-sdk`. For web platforms, mobile apps, and backend services.

```bash
npm install bsp-sdk
```

### `bsp-sdk-python` — Python SDK
Published on PyPI as `bsp-sdk`. For laboratories, bioinformaticians, and research pipelines.

```bash
pip install bsp-sdk
```

### `bsp-mcp` — MCP Server for AI Agents
Connects any MCP-compatible AI (Claude, GPT, etc.) to the BSP protocol with active user consent.

```bash
npm install bsp-mcp
```

**Available tools:**
- `bsp_get_biorecords` — Read BioRecords with active consent
- `bsp_get_beo_summary` — Get biological profile summary
- `bsp_resolve_biomarker` — Look up BSP biomarker codes
- `bsp_list_categories` — List taxonomy categories
- `bsp_check_consent` — Check current consent status
- `bsp_lock_beo` — Emergency lock a BEO
- `bsp_unlock_beo` — Unlock a locked BEO
- `bsp_destroy_beo` — Permanent erasure (LGPD/GDPR)
- `bsp_revoke_all_tokens` — Emergency revoke all consent

### `bsp-cli` — Command-Line Interface
Official CLI for managing BEOs, IEOs, consent, and health data from the terminal.

```bash
npx bspctl create andre.bsp
npx bspctl consent grant <beoId> <ieoId> --intents SUBMIT_RECORD --days 365
npx bspctl export <beoId> --token <tok> --format FHIR_R4
```

22 commands covering the full protocol lifecycle.

### `bsp-docs-repo` — Public Documentation
This website. Powers `biologicalsovereigntyprotocol.com`. The human entry point for anyone wanting to understand or integrate BSP.

---

## Private Organization: `ambrosio-institute`

These repositories contain the Institute's operational infrastructure and proprietary intelligence.

### `bsp-contracts` — Smart Contracts on Arweave (unified repo)

Source code, tests (49 vitest), build, and deploy scripts — all in one place. Previously `bsp-contracts` was a separate deploy repo; it has been merged here and archived.

| Contract | Purpose | Open to? |
|----------|---------|---------|
| `BEORegistry` | Create and index BEOs | Anyone |
| `IEORegistry` | Manage certified institutions | Institute (write); Anyone (verify) |
| `DomainRegistry` | `.bsp` namespace uniqueness | Automatic via SDK |
| `AccessControl` | Consent management — the true gatekeeper | BEO holders (grant/revoke); IEOs (verify) |

Contracts are **immutable after deployment**. Their specification is public in `bsp-spec`.

### `bsp-registry-api` — Gasless Relayer API
The API server that relays user-signed transactions to Arweave and pays the gas. 36 REST routes covering BEO, IEO, consent, exchange, and query operations.

| What passes through | What NEVER passes through |
|--------------------|--------------------------|
| ✓ Ed25519-signed payloads | ✗ Private keys |
| ✓ BEO/IEO creation requests | ✗ Raw wallet credentials |
| ✓ ConsentToken grant/revoke | ✗ Unverified operations |
| ✓ BioRecord submissions (encrypted) | ✗ Unsigned requests |

The relayer verifies every Ed25519 signature before relaying to Arweave. It cannot forge user actions.

### `ava-core` — AVA Algorithm (Proprietary)
The Ambrósio Vitality Algorithm. Processes BioRecords **only** when a user actively initiates an analysis — never has passive access. The Institute's central intellectual asset.

### `sva-engine` — SVA Scoring Engine (Proprietary)
Converts AVA's analysis into the multi-dimensional Ambrósio Vitality Score (SVA). The final product the user experiences in Ambrosio OS.

---

## Build Sequence

```
1. bsp-spec           ← Foundation: the standard everything implements
2. bsp-contracts      ← On-chain infrastructure (immutable after deployment)
3. bsp-registry-api   ← Gasless relayer API (36 routes)
4. bsp-sdk-typescript ← First SDK (widest integration coverage)
5. bsp-mcp            ← AI connectivity (built on the TypeScript SDK)
6. bsp-sdk-python     ← Lab SDK (follows the same spec)
7. ava-core           ← Intelligence (trained on BSP-standardized data)
8. sva-engine         ← Scoring (output: the SVA Score)
9. bsp-docs-repo      ← Documentation (evolves with the ecosystem)
```

---

## GitHub Costs

| Organization | Cost |
|-------------|------|
| `biological-sovereignty-protocol` (5 public) | Free — public repos always free |
| `ambrosio-institute` (4 private, ≤3 collaborators) | Free — GitHub Free tier |
| `ambrosio-institute` (4 private, team growth) | $4/user/month (GitHub Team) |
