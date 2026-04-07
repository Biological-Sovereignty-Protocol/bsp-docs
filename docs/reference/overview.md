---
title: Specification Overview
---

<div class="page-hero-image">
  <img src="/images/spec-overview.jpg" alt="BSP Specification Overview — protocol architecture" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>


# BSP Architecture — The Three Layers

> Version 0.2 | Ambrósio Institute

---

## Overview

The Biological Sovereignty Protocol is organized into three distinct layers. Each layer has a clearly defined responsibility and is designed to be independent — changes to one layer do not break implementations of another.

```
┌─────────────────────────────────────────────────────────┐
│                  INTELLIGENCE LAYER                      │
│         AVA · SVA · Third-party algorithms              │
│    (above the protocol — not defined by BSP)            │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              LAYER 3 — BSP-Exchange                      │
│           Communication Protocol                        │
│   How systems request and respond with biological data  │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              LAYER 2 — BSP-Data                          │
│           Biological Data Schema                        │
│   Structure of all biological measurements (BioRecord)  │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              LAYER 1 — BSP-Identity                      │
│           Biological Identity                           │
│   The sovereign identity object — BEO                   │
│   Stored on Arweave — permanent, decentralized          │
└─────────────────────────────────────────────────────────┘
```

---

## Layer 1 — BSP-Identity

**What it defines:** Who holds the data.

Every individual and every institution in the BSP ecosystem has a permanent, decentralized identity:
- **BEO** — Biological Entity Object (individual)
- **IEO** — Institutional Entity Object (laboratory, hospital, platform, etc.)

The BEO is the center of gravity of the entire protocol. Every BioRecord, every consent, every interaction is anchored to a BEO.

BEOs and IEOs are stored on the **Arweave** blockchain — persistent and decentralized. No company, government, or the Ambrósio Institute itself can alter a registered identity. The individual retains the right to render their data permanently inaccessible through cryptographic erasure.

Key identity operations include:

- **Lock/Unlock** — Temporarily freeze a BEO to prevent any data exchange (useful during key compromise investigations or travel)
- **Domain Transfer** — Transfer an institutional `.bsp` domain to a new owner entity, recorded on-chain with full audit trail

→ See [`beo.md`](beo.md) and [`ieo.md`](ieo.md) for complete specifications.

---

## Layer 2 — BSP-Data

**What it defines:** What the data contains.

Every biological measurement — a blood test result, a genomic marker, a wearable reading, a clinical assessment — is represented as a **BioRecord**.

BioRecords are the atomic units of biological data in the BSP ecosystem. They are:
- **Immutable** — once written, they cannot be altered (but can be made permanently inaccessible through cryptographic erasure)
- **Anchored** — every BioRecord belongs to a specific BEO
- **Classified** — every BioRecord carries a BSP taxonomy code
- **Signed** — every BioRecord carries a cryptographic signature from the submitting entity

→ See [`biorecord.md`](biorecord.md) for the complete BioRecord specification.
→ See [Biomarker Taxonomy](taxonomy/level-1-core) for the full biomarker taxonomy.

---

## Layer 3 — BSP-Exchange

**What it defines:** How data moves.

The BSP Exchange Protocol defines the format of requests and responses between systems:

- How any system submits data to a BEO
- How a platform requests read access
- How an AI engine queries a biological history
- How consent tokens are structured and verified
- How BEO holders manage their **intents** — adding or removing authorized operation types (`addIntent`/`removeIntent`) on active consent tokens without revoking and re-issuing them

All exchange operations are subject to the **AccessControl** smart contract — the BEO holder's consent is required for every data transaction.

→ See [`exchange.md`](exchange.md) for the complete Exchange Protocol specification.

---

## Decentralized Infrastructure

BSP records are stored on **Arweave** — a permanent, decentralized storage protocol designed to preserve data for 200+ years.

Smart contracts managing BEO identities, domain registrations, and access permissions are deployed via SmartWeave on Arweave. This ensures:
- No single point of failure
- No company (including Ambrósio Institute) can alter the rules unilaterally
- Data written to BSP infrastructure persists with integrity, while the individual retains the right to cryptographic erasure

### Sovereign Cryptographic Erasure

BSP implements **Sovereign Cryptographic Erasure** as a core principle. All BioRecords are encrypted with the holder's Ed25519 public key. Destroying the private key renders the data permanently inaccessible — a stronger guarantee than traditional deletion. This satisfies GDPR Article 17 and LGPD Article 18 requirements for the right to erasure.

The five smart contracts in the BSP infrastructure:

| Contract | Purpose |
|---|---|
| **BEORegistry** | Creates and manages biological identities — open to anyone |
| **IEORegistry** | Manages institutional identities and certification status |
| **DomainRegistry** | Controls the `.bsp` namespace — guarantees uniqueness |
| **AccessControl** | Manages consent tokens — the true gatekeeper of the protocol |
| **Governance** | Multi-signature (2-of-3) authorization for critical protocol changes via `proposeAction`/`approveAction` |

→ See [`bsp-domain.md`](bsp-domain.md) for the `.bsp` domain system.
→ See [`governance.md`](governance.md) for the governance model.

---

## The Intelligence Layer (Above BSP)

The intelligence layer is **not part of the BSP specification**.

BSP defines how data is structured and transported — not what conclusions to draw from it. Intelligence layers such as:
- Ambrósio Vitality Algorithm (AVA)
- Ambrósio Vitality Score (SVA)
- Any third-party analytics engine

...operate above the protocol, consuming standardized BSP data to produce insights. Any system in the world can implement the BSP. Only Ambrósio holds the AVA.

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
