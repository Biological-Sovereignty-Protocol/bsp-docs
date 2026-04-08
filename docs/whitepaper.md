---
title: "BSP Whitepaper — Protocol Foundations & Vision"
description: "The founding document of the Biological Sovereignty Protocol. Architecture, design principles, and the vision for permanent health data ownership."
---

<div class="page-hero-image">
  <img src="/images/whitepaper-hero.jpg" alt="BSP Whitepaper — protocol specification document" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>


<div class="whitepaper-hero">
  <div class="wp-badge">v 1.0</div>
  <h1>Biological Sovereignty Protocol<br><span class="wp-subtitle">Official Whitepaper</span></h1>
  <p class="wp-tagline">The protocol that gives every human being permanent sovereignty over their own biology.</p>
  <div class="wp-meta">
    <span>Published by the Ambrósio Institute</span>
    <span class="wp-divider">•</span>
    <a href="https://biologicalsovereigntyprotocol.com" target="_blank">biologicalsovereigntyprotocol.com</a>
  </div>
</div>

---

## Abstract

::: info Abstract
The global health system is built on a fundamental structural failure: individuals do not own their own biological data. Medical records belong to hospitals. Lab results belong to laboratories. Wearable data belongs to technology companies. When a person changes their doctor, moves to another city, or simply wants to understand their own body, they encounter walls — not bridges.

The Biological Sovereignty Protocol (**BSP**) is an open standard that changes this at the infrastructure level. **BSP** defines a universal language for exchanging health and longevity data — a common format that any laboratory, wearable device, health platform, telemedicine service, or artificial intelligence engine can implement. Once implemented, data stops living in silos and starts living where it belongs: with the individual.

**BSP** is not a product. It is a protocol — like HTTP is for the web, or SMTP is for email. Anyone can implement it. No one owns it. Anyone can create a biological identity on it. Anyone can submit data to it — subject only to the consent of the data owner. The Ambrósio Institute maintains the specification as a permanent, open standard.

The Ambrósio Vitality Algorithm (**AVA**) and the Ambrósio Vitality Score (**SVA**) are the reference intelligence implementation built on top of **BSP** — the first AI engine capable of consuming the full spectrum of human biological data in a unified, standardized format and producing personalized longevity guidance.
:::

> **The **BSP** is the language. The **AVA** is the intelligence that speaks it.**

## 1. The Problem

To understand why **BSP** exists, you must first understand what is broken — and why it has stayed broken for so long.

### 1.1 — The Fragmentation Crisis

A person receives blood test results from a laboratory. Those results are stored in a PDF, emailed to their doctor, and filed in an electronic health record that is incompatible with every other system on earth. Three months later, they visit a new clinic. The cycle starts over from zero.

This is not an edge case. It is the global standard. Every health company — every laboratory, every hospital, every platform — has built a proprietary silo. The consequence is that biological data which should compound in value across a lifetime is instead lost, fragmented, and trapped in formats that serve institutions, not individuals.

**BSP** changes the incentive structure. By making the standard open and free to implement, the value of adoption increases with every new participant. The protocol creates a network where sharing data is structurally beneficial — not a competitive risk.

### 1.2 — The Sovereignty Failure

Your lab results belong to the laboratory. Your medical images belong to the hospital. Your genomic data belongs to the company that processed it. Your wearable biometrics belong to the tech company that sold you the device. You are the subject of all this data. You are not its owner.

**BSP** solves this by making the individual the anchor of the data system. Every piece of biological data is attached to a Biological Entity Object (**BEO**) — a permanent, decentralized identity that belongs to the individual. No company can delete it, move it, or restrict access to it. The person holds the private key to their own biology.

### 1.3 — The AI Readiness Gap

Artificial intelligence has the potential to revolutionize preventive medicine — but only if it can access structured, standardized biological data at scale. Today, that data does not exist in a usable form. The most advanced longevity AI engines in the world are trained on proprietary, siloed datasets. **BSP** creates the data infrastructure that AI-driven health systems need.

### 1.4 — The Scientific Imperative

Modern geroscience has established a fundamental insight: your chronological age is a poor predictor of your health trajectory. Your biological age — the functional state of your organs, immune system, and cellular machinery — is what actually determines your disease risk, energy levels, and remaining lifespan.

A landmark study published in Nature Medicine in 2025 found that individuals whose brain and immune system were biologically young had a 56% lower mortality risk over 15 years, regardless of genetics. **BSP** is the infrastructure that makes this new medicine possible at scale.

## 2. The Protocol

**BSP** is an open standard that defines how biological data is structured, stored, exchanged, and governed. It operates in three layers.

### 2.1 — The Three Layers

| Layer | What It Defines |
| --- | --- |
| **Layer 1 — Identity** | Who holds the data. Every individual and every institution in the **BSP** ecosystem has a permanent, decentralized identity: the Biological Entity Object (**BEO**) or Institutional Entity Object (**IEO**). |
| **Layer 2 — Data** | What the data contains. Every biological measurement is structured as a **BioRecord** — a standardized, immutable unit of biological information anchored to a specific **BEO** and classified under the **BSP** taxonomy. |
| **Layer 3 — Exchange** | How data moves. The **BSP** Exchange Protocol defines the format of requests and responses between systems — how any system sends data to a **BEO**, how a platform requests access, how an AI engine queries a complete biological history. |

### 2.2 — The Biological Entity Object (**BEO**)

The **BEO** is the sovereign biological identity of every individual in the **BSP** ecosystem. It is the center of gravity of the entire protocol.

A **BEO** is not an account on a platform. It is a permanent identity, stored on the Arweave blockchain, controlled exclusively by the individual through a private key. Every **BEO** is identified by a human-readable .bsp domain — a permanent biological address. For example, andre.bsp is a sovereign identity that belongs to that person for life and cannot be taken away by any company, government, or service provider.

Creating a **BEO** requires no permission from the Ambrósio Institute or any other authority. Any individual, any application, or any system can create a **BEO** directly — using the bsp-sdk or interacting with the BEORegistry smart contract directly. The protocol is open at its foundation.

### 2.3 — The **BioRecord**

Every biological measurement — a blood test result, a genomic marker, a wearable reading, an imaging report — is represented as a **BioRecord**. **BioRecords** are the atomic units of biological data in the **BSP** ecosystem.

Any system can attempt to submit a **BioRecord** to a **BEO**. There is no certification requirement at the protocol level. What governs access is the consent of the **BEO** holder — encoded in the AccessControl smart contract on Arweave. Without explicit authorization from the individual, no **BioRecord** submission is accepted. The individual is the gatekeeper, not an institutional authority.

**BioRecords** are immutable once written. Corrections are submitted as new **BioRecords** that supersede previous records — preserving the complete audit trail. While the data itself cannot be altered on Arweave, the individual can permanently revoke all access to their records through cryptographic erasure, rendering the data unreadable and functionally erased (see Section 4.4). Each **BioRecord** carries: the **BSP** biomarker code, the measured value and unit, the reference range, the submitting entity, a cryptographic signature, and a timestamp.

### 2.4 — Decentralized Infrastructure

**BSP** records are stored on Arweave — a permanent, decentralized storage protocol designed to preserve data for 200+ years through a mathematically sustainable endowment model. Once a **BioRecord** is written, it persists on the network regardless of what happens to any company in the ecosystem — including the Ambrósio Institute. The individual can, at any time, render their records permanently inaccessible through cryptographic erasure (Section 4.4).

AO processes managing **BEO** identities, .bsp domain registrations, and access permissions run on Arweave's hyper-parallel compute platform — ensuring that the rules of the protocol cannot be changed by any single actor. All critical parameter changes require multi-signature authorization from Institute keyholders.

## 3. The Biomarker Taxonomy

The **BSP** taxonomy is the most comprehensive open biomarker classification system ever codified. It covers the complete spectrum of measurable human biology — from routine clinical lab tests to cutting-edge longevity markers to continuous wearable signals. The taxonomy is publicly published, freely available, and governed through an open improvement process.

### 3.1 — Taxonomy Structure

| Level | Coverage |
| --- | --- |
| **Level 1 — Core** | Advanced longevity and aging biomarkers. 9 categories. The frontier of biological age science. |
| **Level 2 — Standard** | All routine laboratory tests performed worldwide. 9 categories. Any conventional lab can achieve compliance. |
| **Level 3 — Extended** | Specialized biomarkers from advanced clinical and research contexts. 6 categories. |
| **Level 4 — Device** | Continuous biometric data from wearable devices. 1 category. Real-time biological monitoring. |

### 3.2 — Level 1: Core Longevity Biomarkers

| Category | Code | What It Measures |
| --- | --- | --- |
| Longevity & Aging | `BSP-LA` | Telomere length, NAD+, GDF-11, TIMP2, senescent cell burden |
| Regeneration & Cellular | `BSP-RC` | IGF-1, mTOR activity, insulin sensitivity, inflammatory cytokines |
| Cardiovascular Health | `BSP-CV` | ApoB, LDL-P, homocysteine, nitric oxide, omega-3 index |
| Immune Function & Inflammation | `BSP-IM` | Vitamin D, glutathione, PCR-us, CD38, immune age markers |
| Metabolism & Cellular Energy | `BSP-ME` | ATP production, mitochondrial function, ketones, pH, lactate |
| Neurological Health | `BSP-NR` | BDNF, cortisol, cerebral clearance markers, neuroplasticity signals |
| Detoxification & Hepatic | `BSP-DH` | GSH, ALT/AST/GGT, heavy metal burden, hepatic phase markers |
| Lymphatic System & Clearance | `BSP-LF` | Lymphocyte populations, drainage efficiency, systemic clearance |
| Biological Clock & Senescence | `BSP-BC` | Epigenetic age (DNAm), p16INK4a, p21, SASP factors |

### 3.3 — Level 2: Standard Laboratory Biomarkers

| Category | Code | Coverage |
| --- | --- | --- |
| Hematology | `BSP-HM` | Complete blood count, CBC differential, reticulocytes |
| Vitamins | `BSP-VT` | All fat and water-soluble vitamins, 25-OH D3, B12, folate |
| Minerals & Electrolytes | `BSP-MN` | All essential minerals, trace elements, electrolytes |
| Hormones | `BSP-HR` | Full hormonal panel: thyroid, sex hormones, adrenal, pituitary |
| Renal Function | `BSP-RN` | Creatinine, BUN, GFR, cystatin C, urinalysis |
| Conventional Lipids | `BSP-LP` | Total cholesterol, HDL, LDL, triglycerides, ApoA1 |
| Glycemia & Metabolic | `BSP-GL` | Glucose, HbA1c, insulin, HOMA-IR, fructosamine |
| Hepatic Function | `BSP-LV` | ALT, AST, GGT, albumin, bilirubin, coagulation |
| Inflammatory Markers | `BSP-IF` | CRP, ESR, fibrinogen, ferritin, procalcitonin |

Level 3 covers specialized domains including fertility and reproductive health (**BSP**-FR), genomics (**BSP**-GN), microbiome (**BSP**-MB), environmental toxicology (**BSP**-TX), advanced immunology (**BSP**-IM2), and advanced cardiovascular (**BSP**-CV2). Level 4 covers continuous device data (**BSP**-DV) — heart rate variability, sleep architecture, SpO2, activity, temperature, and emerging biosensor outputs.

## 4. The Sovereignty Model

The technical architecture of **BSP** is designed to make individual sovereignty the default — not a feature, not a promise, but a structural property of the system.

### 4.1 — Rights Architecture

| Right | How It Works |
| --- | --- |
| **Permanent ownership** | The individual owns their **BEO** and all **BioRecords** within it for life. No company can revoke access, move data, or terminate the record. |
| **Granular consent** | Every third-party access request requires explicit **BEO**-holder consent via the AccessControl smart contract. Permissions are scoped, revocable, and permanently auditable on-chain. |
| **Open submission** | Any system can submit **BioRecords** to a **BEO** — subject to the holder's consent. There is no institutional gatekeeper. The individual decides who can write to their biological identity. |
| **Portability** | Any data in a **BEO** can be exported in **BSP**-standard format at any time. No lock-in, no extraction fees. |
| **Immutability with sovereign erasure** | **BioRecords** cannot be altered once written, preserving data integrity. However, the individual retains the power to make any record permanently inaccessible through cryptographic erasure (see Section 4.4). |
| **Cryptographic control** | Access is controlled by private keys held by the individual. The Ambrósio Institute cannot access a person's **BEO** without their explicit authorization. Destroying the private key renders all associated data permanently unreadable — a guarantee stronger than traditional deletion. |

### 4.2 — How Consent Works

When any system — a laboratory, a health app, an AI assistant — wants to submit data to or read data from a **BEO**, it requests authorization. The **BEO** holder receives the request in their app and signs an authorization transaction with their private key. This authorization is recorded permanently on the Arweave blockchain via the AccessControl smart contract.

Authorizations are granular: the holder can specify which types of data a system can access, for how long, and for what purpose. Any authorization can be revoked at any time. Revocation is also recorded on-chain — creating a permanent, auditable record of every access decision the individual has ever made about their biological data.

### 4.4 — Sovereign Cryptographic Erasure

BSP implements a concept called **Sovereign Cryptographic Erasure**. While biological records are stored immutably on Arweave to ensure data integrity, the individual retains absolute control through their Ed25519 private key.

**How it works:**
- All BioRecords are encrypted with the holder's public key
- Only the holder's private key can decrypt the data
- If the holder destroys their key, the data becomes **permanently inaccessible and functionally erased**
- No institution, platform, or the Ambrósio Institute can recover the data without the key

**This provides a stronger guarantee than traditional deletion:**
- Traditional systems: data is "deleted" but copies may exist in backups, logs, or third-party systems
- BSP: data exists on Arweave but is **cryptographically impossible to read** without the destroyed key

**Legal equivalence:** Under GDPR Article 17 (Right to Erasure) and LGPD Article 18 (Right to Deletion), rendering data permanently inaccessible and unusable is functionally equivalent to deletion. The data can no longer be associated with or used to identify the individual.

**Key holder rights:**
1. **Key Destruction** — permanently destroy the private key, making all data irrecoverable
2. **Key Rotation** — generate a new key pair, re-encrypt data, invalidate the old key
3. **Consent Revocation** — revoke all access tokens immediately (kill switch)
4. **Selective Erasure** — revoke specific consent tokens to specific institutions

### 4.3 — Social Recovery Model

A system of true individual sovereignty requires solving a real problem: what happens if someone loses their private key? **BSP** uses a guardian-based social recovery model. At **BEO** creation, each individual designates three trusted guardians. Key recovery requires two of three guardian confirmations — a threshold that prevents any single guardian from acting unilaterally.

Guardians can be individuals, institutions, or a combination. A physician, a family member, and a trusted platform — each holding one key, none able to act alone.

## 5. **AVA** & **SVA** — The Reference Intelligence

### 5.1 — The Intelligence Separation

The **BSP** defines the language. What intelligence speaks that language is a separate question — and one that any implementer can answer in their own way. The protocol does not favor any implementation. The data belongs to the individual. The intelligence is chosen by them.

The Ambrósio Vitality Algorithm (**AVA**) is the reference implementation — the intelligence engine built by those who designed the protocol. It is not a proof of concept. It is the most capable system for consuming **BSP**-standardized biological data and producing personalized longevity guidance. But it is one implementation among many that can exist on this protocol.

### 5.2 — How **AVA** Accesses Data

**AVA** does not have passive access to any **BEO**. When a user wants their biological data analyzed, they initiate the process actively — opening the app and requesting analysis. The app reads the **BioRecords** from the Arweave blockchain using the user's local private key, and transmits the data to **AVA** with explicit, session-scoped consent.

**AVA** processes the data, produces the analysis, and returns the **SVA** score. The data is not stored by the Institute beyond what is required for processing. The original **BioRecords** remain on Arweave — owned by the individual, not the Institute.

This model combines the analytical power of a centralized intelligence engine with the data sovereignty of a decentralized protocol. The Institute never has passive access to anyone's biological data. Every analysis is initiated by the individual, for the individual.

### 5.3 — The Ambrósio Vitality Score (**SVA**)

The **SVA** is a composite, multi-dimensional biological vitality score produced by **AVA** when processing a complete set of **BSP**-compliant **BioRecords**. It answers a question that medicine has never been able to ask systematically: how biologically old is this person, really — and at what speed are they aging?

The **SVA** is not a single number. It is a multi-dimensional portrait of biological age across the systems covered by the **BSP** taxonomy — cardiovascular age, immune age, neurological age, metabolic age, cellular regeneration status, and the velocity of biological aging itself.

****SVA** — Example Output:**

```json
{
  "Biological Age": "34.2 years",
  "Chronological Age": 41,
  "Subsystems": {
    "Cardiovascular System": "31 years",
    "Immune System": "38 years",
    "Neurological Health": "33 years",
    "Metabolic Function": "30 years"
  },
  "Aging Velocity": "−0.7 years/year (slowing)",
  "Biological Reserve": "87th percentile"
}
```

The **SVA** is proprietary. It cannot be produced by any system other than **AVA**. This is the moat — not control of the protocol, but control of the best intelligence engine that runs on it.

## 6. **BSP** Certification — A Mark of Trust, Not a Gate

The **BSP** protocol is fully open. Any individual can create a **BEO**. Any system can submit **BioRecords** — subject to the consent of the **BEO** holder. This openness is not a vulnerability. It is the foundation of scale.

**BSP** Certification exists not as a mandatory gate, but as a verifiable mark of trust. The difference is fundamental: an uncertified system can participate in the ecosystem with user consent. A **BSP**-Certified institution signals to users — and to the ecosystem — that it meets a rigorous standard of data quality, technical compliance, and institutional accountability.

> **The distinction that matters**
>
> An uncertified laboratory can submit data to a **BEO** if the user authorizes it.
> A ****BSP**-Certified** laboratory earns the user's trust before they even ask.
>
> *The protocol is open. The standard is aspirational.*

### 6.1 — What Certification Provides

| Benefit | Detail |
| --- | --- |
| **Verified directory listing** | **BSP**-Certified institutions appear in the official directory — the first place users look when authorizing data submissions. |
| **Native Ambrosio OS integration** | The app surfaces certified institutions by default. Non-certified sources trigger a trust advisory — visible to the user before they authorize. |
| ****AVA** data pipeline access** | Only **BioRecords** from **BSP**-Certified sources feed the **AVA** intelligence engine and contribute to **SVA** scores. Non-certified data is visible in the **BEO** but excluded from **AVA** analysis. |
| **On-chain verified badge** | Certification status is recorded in the IEORegistry smart contract — publicly verifiable by any system or individual at any time. |
| **Instituto liability coverage** | The Institute formally endorses the technical quality of certified institutions — creating a layer of institutional accountability. |
| **BIP participation rights** | Certified institutions gain voting rights in the **BSP** Improvement Proposal process — shaping the evolution of the protocol. |

### 6.2 — Certification Levels

| Level | Name | Requirements |
| --- | --- | --- |
| ****BSP**-1** | Compliant Basic | Standard Level 2 biomarkers, **BioRecord** format, cryptographic signing |
| ****BSP**-2** | Compliant Advanced | Level 1 + 2 biomarkers, full exchange protocol, consent management |
| ****BSP**-3** | Compliant Full | All levels including genomics and microbiome, **AVA** integration |
| ****BSP**-4** | Compliant Device | Continuous device data, `BSP-DV` category, daily consolidated records |

## 7. Governance

An open protocol is only as trustworthy as its governance. **BSP** governance is designed around a single principle: no entity — including the Ambrósio Institute — should have unilateral control over the standard.

### 7.1 — The Ambrósio Institute as Guardian

The Ambrósio Institute is the guardian of the **BSP** standard — not its owner. The Institute's role is stewardship: maintaining the specification, coordinating the improvement process, certifying implementations, and ensuring the long-term integrity of the protocol. The Institute does not control the data of **BSP** participants. It cannot modify core protocol contracts without multi-signature authorization.

### 7.2 — **BSP** Improvement Proposals (BIP)

The **BSP** taxonomy and protocol specification evolve through an open proposal process. Any researcher, physician, or developer may submit a **BSP** Improvement Proposal. A valid BIP must include: a scientific rationale for the proposed change, at least two peer-reviewed references, a proposed **BSP** classification code, and a statement of clinical measurability. The Institute's Scientific Council reviews proposals quarterly and publishes decisions with rationale.

### 7.3 — Smart Contract Governance

Core **BSP** processes — those governing **BEO** identity registration, .bsp domain allocation, and access control rules — run as AO processes on Arweave. All critical parameters require a minimum of two of three authorized Institute keyholders to sign any modification. No single person — including the Institute's founder — can unilaterally change the rules of the protocol.

## 8. The Ecosystem

### 8.1 — Network Effects

**BSP** is designed as infrastructure. Every new laboratory that implements **BSP** increases the value of every existing **BEO**. Every new platform that adopts the standard makes every **BioRecord** more useful. Every new individual who creates a **BEO** expands the longitudinal dataset available to **AVA**.

Because the protocol is fully open — no permission required to create BEOs, no mandatory certification to submit data — growth is not constrained by the Institute's operational capacity. A laboratory in Japan can integrate **BSP** on a Tuesday without contacting anyone. The network effect compounds freely.

### 8.2 — The Open Protocol / Proprietary Intelligence Model

The Ambrósio Institute is the first institution to build a full-stack implementation of the **BSP** ecosystem — from the open protocol itself to the proprietary intelligence layer that runs on top of it.

The protocol is open because open protocols win. HTTP won. SMTP won. MCP is winning. The intelligence is proprietary because intelligence built on global, standardized, longitudinal biological data is an asset that compounds with scale — and cannot be replicated without the data infrastructure the protocol creates.

> **Open infrastructure. Proprietary intelligence. Individual sovereignty.**

## 9. Why Now

### 9.1 — AI Is Ready. The Data Is Not.

Large language models and biological AI systems have reached a capability threshold where they could genuinely transform preventive medicine. The limiting factor is not intelligence. It is data. Without standardized, longitudinal, multi-dimensional biological data, even the most advanced AI cannot fulfill its potential in health. **BSP** creates the data substrate that biological AI requires.

### 9.2 — Longevity Science Has Arrived

The global longevity industry reached $25 billion in investment in 2024. Companies like Altos Labs, Calico, BioAge, and dozens of others are building the interventions. But interventions require measurement. You cannot slow aging if you cannot measure the speed of aging. **BSP** is the measurement infrastructure that the longevity industry has been missing.

### 9.3 — Individuals Are Ready

The emergence of consumer health platforms like Function Health, Neko Health, and Superpower demonstrates a clear market signal: people are willing to pay for comprehensive biological self-knowledge. What does not yet exist is a system where that knowledge persists, compounds, and remains with the individual across providers, platforms, and time. **BSP** is that system.

## Closing Statement

::: info The Premise
Biological data has never had a permanent home. It has always lived inside the systems that created it — laboratories, hospitals, platforms — and disappeared when those systems changed, closed, or decided to stop serving you. **BSP** changes this at the infrastructure level. Not through promises. Through architecture.
:::

> The infrastructure of human longevity has never been standardized.
> Every system speaks a different language.
> Every patient loses their history with every transition.
> Every AI system starves for the structured data it cannot access.

### **BSP** changes that.

Not by controlling the intelligence. Not by owning the data. Not by restricting who can participate.

**But by standardizing the language — and opening it to everyone.**

* **The language belongs to everyone.**
* **The intelligence belongs to those who build the best version of it.**
* **The data belongs to the individual.**

---

<div style="text-align: center; margin-top: 40px;">
  <h2>Biological Sovereignty Protocol</h2>
  <p><em>The protocol that gives every human being permanent sovereignty over their own biology.</em></p>
  <p><br><strong>Ambrósio Institute</strong> | Guardians of the **BSP** Standard<br>
  <a href="https://ambrosioinstitute.org">ambrosioinstitute.org</a> | <a href="https://biologicalsovereigntyprotocol.com">biologicalsovereigntyprotocol.com</a></p>
</div>

