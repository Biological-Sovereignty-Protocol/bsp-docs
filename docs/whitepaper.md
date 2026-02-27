# BSP Whitepaper

**Biological Sovereignty Protocol v2.0**

*The protocol that gives every human being permanent sovereignty over their own biology.*

---

> **"Your biology is the most intimate data that exists about you. It should belong to you — permanently, cryptographically, and unconditionally."**
>
> — Ambrósio Institute

---

## The Problem: Three Failures of the Current System

### 1. Fragmentation
Your biological data lives in dozens of disconnected silos. Blood test results at your laboratory's portal. Wearable data locked inside an app. Genomic data on a platform that may be acquired, pivoted, or shut down. When your physician asks for your complete health history, the answer is always incomplete — because there is no unified, portable, individual-owned record.

### 2. Sovereignty Failure
The data that defines your biology — your metabolic rate, your cardiac health, your genomic risk factors — is owned by the institutions that collected it, not by you. You are not the customer. You are the product. You cannot export it in a meaningful format. You cannot revoke access. You cannot carry it to a new provider without a bureaucratic process that may take months.

### 3. The AI Readiness Gap
The coming decade of AI-driven medicine will be built on biological data. The models that will predict your cardiovascular event before symptoms appear, that will design your personalized longevity protocol, that will catch your cancer a decade early — all of them require longitudinal, structured, individual biological data at scale. That data does not exist in a usable form today. It is fragmented, unstandardized, and locked away from the intelligence systems that could transform it into insight.

---

## The Solution: A Protocol, Not a Platform

The Biological Sovereignty Protocol (BSP) is an open standard — like HTTP or SMTP — that defines a universal language for the exchange of human health and longevity data. 

It does not own your data. No company does. It creates the infrastructure for you to own it permanently.

Three principles drive the protocol:

1. **Open**: Anyone can implement BSP. No permission required. No licensing fee. No vendor lock-in.
2. **Sovereign**: Every individual holds a cryptographic identity that they alone control.
3. **Permanent**: Data stored on the Arweave blockchain exists for 200+ years, independent of any company's survival.

---

## Architecture: Three Layers

### Layer 1: Identity
**BEO (Biological Entity Object)** — your sovereign biological identity, anchored on Arweave. You hold the private key. You are the only gatekeeper.

**IEO (Institutional Entity Object)** — the identity of any organization that interacts with biological data: laboratories, hospitals, wearable companies, AI platforms.

Both are identified by human-readable `.bsp` domains (e.g., `andre.bsp`, `fleury.bsp`).

### Layer 2: Data
**BioRecord** — the atomic unit of biological data. Every measurement in the BSP ecosystem is a BioRecord: a standardized, encrypted, permanently stored biological observation attached to a BEO.

The **BSP Biomarker Taxonomy** defines 210+ biomarkers across 25 categories and 4 levels of clinical complexity — the most comprehensive open classification of measurable human biology ever codified.

### Layer 3: Exchange
**Exchange Protocol** — the communication layer. Defines how systems request and receive biological data, with mandatory double authentication: a ConsentToken (user's authorization) and an IEO signature (institutional accountability).

---

## The Biomarker Taxonomy

| Level | Name | Categories | Examples |
|-------|------|------------|---------|
| L1 — Core | Longevity & Aging | 9 | NAD+, GDF-11, Epigenetic Clock, Telomeres |
| L2 — Standard | Clinical Laboratory | 9 | Hematology, Lipids, Hormones, Glucose |
| L3 — Extended | Specialized & Research | 6 | Genomics, Microbiome, Advanced Toxicology |
| L4 — Device | Continuous Biometrics | 1 (BSP-DV) | HRV, SpO2, Sleep Architecture |

---

## Sovereignty Model

### The Access Control Contract
No institution can read or write to your BEO without a valid **ConsentToken** — a cryptographic authorization you issue, stored as a SmartWeave contract on Arweave. No server can fake it. No institution can bypass it.

### Immediate Revocation
Revoking a ConsentToken is instant and on-chain. The moment you revoke, the smart contract rejects all future requests from that institution. They cannot retain copies of your data beyond what they have already processed.

### Sovereign Export
Every BEO holder has the unconditional right to export all their data at any time, via the `SOVEREIGN_EXPORT` intent. No institution can block this.

---

## The Intelligence Layer: AVA & SVA

The BSP protocol defines the data standard. It does not define what to do with the data — that is the role of intelligence implementations.

The **Ambrósio Vitality Algorithm (AVA)** is the reference implementation built by the Ambrósio Institute. It reads BSP-structured data and generates:

- **SVA (Ambrósio Vitality Score)**: A multi-dimensional biological vitality profile including:
  - Biological Age (cardiovascular, metabolic, neurological, immunological)
  - Aging Velocity (how fast you are aging vs. chronological baseline)
  - Biological Reserve (percentile vs. age-matched population)

AVA is **proprietary** and runs in the private `ambrosio-institute/ava-core` repository. The protocol is open. The intelligence is the Institute's competitive moat.

---

## Governance

The BSP is governed through an open improvement process:

- **BIP (BSP Improvement Proposal)**: Anyone can propose additions to the taxonomy or changes to the protocol. BIPs require peer-reviewed scientific evidence.
- **Scientific Council**: 7 independent scientists who review taxonomy BIPs quarterly.
- **Multi-Sig**: Critical protocol changes require 2-of-3 Institute keyholders — no single person can act unilaterally.

The protocol belongs to the world. The governance is transparent and auditable.

---

## The Business Model

| Layer | Who Owns It | Access |
|-------|-------------|--------|
| The Protocol (BSP) | No one — open standard | Free, open, CC BY 4.0 |
| The Infrastructure | Ambrósio Institute (guardian) | Smart contracts on Arweave |
| The Intelligence (AVA/SVA) | Ambrósio Institute (proprietary) | Ambrosio OS only |

The protocol creates a network. The intelligence captures the value.

---

## License

This specification is published under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

Any individual, company, or institution may implement the BSP, build on it, or distribute it — without licensing fees or permission requirements.

---

*The protocol belongs to the world. The intelligence belongs to Ambrósio. The sovereignty belongs to the individual.*

**Ambrósio Institute** · [ambrosioinstitute.org](https://ambrosioinstitute.org) · [biologicalsovereigntyprotocol.com](https://biologicalsovereigntyprotocol.com)
