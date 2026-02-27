# Governance & BIP Process

The BSP is a public protocol — but public goods without governance become irrelevant or corrupted. The BSP governance model balances two imperatives: stability (systems built on BSP shouldn't break on every update) and adaptability (scientific advances must be incorporated).

> "A protocol that cannot evolve is dead. A protocol that anyone can change is not a protocol."

---

## 1. Governance Philosophy

Three layers evolve at different velocities:

| Layer | Change Frequency | Decision Authority |
|-------|-----------------|-------------------|
| **Protocol Core** (BEO, IEO, Exchange) | Annual or less | 2-of-3 multi-sig + 90-day public comment |
| **Biomarker Taxonomy** (BSP-XX codes) | Quarterly | Scientific Council + Institute ratification |
| **Implementations** (AVA, SDKs, apps) | Continuous | Each implementor independently |

---

## 2. The Ambrósio Institute as Guardian

The Institute is the **guardian** of the standard, not its owner. This distinction matters: a guardian maintains the protocol's integrity for the ecosystem's benefit, not the Institute's.

### Scientific Council

7 independent scientists who evaluate and approve taxonomy BIPs:

| Attribute | Value |
|-----------|-------|
| Composition | 7 members — longevity, cardiology, metabolism, neurology, genomics, immunology, medical laboratory |
| Independence | No financial relationship with the Institute or any BSP ecosystem company during tenure |
| Quorum | 5 of 7 members required for a vote |
| Approval | Simple majority of those present |
| Meetings | Quarterly: January, April, July, October |
| Transparency | Meeting minutes published in `bsp-spec` within 14 days; individual votes recorded |

### Three-Key Multi-Sig

Critical protocol operations require 2-of-3 Institute keyholder signatures:

| Keyholder | Role | Storage |
|-----------|------|---------|
| **A** — Founder | Day-to-day operations, BIP ratification | Hardware wallet offline |
| **B** — Scientific Director | Protocol specification and taxonomy changes | Hardware wallet offline, restricted access |
| **C** — Legal Custodian | Independent fiduciary — safeguard against unilateral abuse | Held by third party with written instructions |

### Authorization Levels

| Level | Operations | Who Executes |
|-------|-----------|-------------|
| **Critical** (2-of-3) | Modify core contracts, revoke IEO permanently, change governance structure, protocol emergency | Any 2 keyholders |
| **Significant** (1 + Council) | Approve BIP + taxonomy update, suspense IEO, publish spec version | Any keyholder after Council vote |
| **Routine** (1 keyholder) | IEO certification renewal, documentation updates, badge issuance | Any authorized keyholder or automated system |

---

## 3. BIP Types

| Type | Code | Scope | Comment Period |
|------|------|-------|---------------|
| Taxonomia | BIP-T | Add, modify, or remove biomarkers | 30 days |
| Protocol | BIP-P | Changes to BEO, IEO, BioRecord, Exchange Protocol | 90 days |
| Governance | BIP-G | Changes to the BIP process or multi-sig structure | 120 days |
| Informational | BIP-I | Best practices, implementation recommendations | Simplified |

---

## 4. BIP Complete Schema

```yaml
bip_id:        BIP-0042               # Assigned by Institute on submission
type:          T                       # T | P | G | I
title:         "Proposed change title"
status:        DRAFT                   # DRAFT | REVIEW | COUNCIL | ACCEPTED | REJECTED | WITHDRAWN

authors:
  - name:        "Full Name"
    affiliation: "Institution or Independent"
    contact:     "email@example.com"
    conflict:    "None"                # Required — any financial interest in the proposal

submitted_at:  2026-01-15
review_start:  2026-01-22
council_vote:  2026-04-15
decided_at:    2026-04-22

abstract:      |                       # Max 200 words
  ...

motivation:    |
  Why is this change needed now?

specification: |
  Technical description of the proposed change.

rationale:     |
  Why this approach vs. alternatives considered.

backwards_compatibility: |
  Impact on existing BSP implementations.

evidence:                              # Required for BIP-T and BIP-P
  - citation:    "Author et al. (2024). Title. Journal."
    doi:         "10.xxxx/xxxxxx"
    year:        2024
    n_participants: 15000
    finding:     "What this paper supports in the proposal"
    quality:     RCT | Meta-analysis | Cohort | Case-control | Expert

# For BIP-T: biomarker specification
biomarker_spec:
  proposed_code:  BSP-LA-009
  name:           "Scientific Name"
  category:       BSP-LA
  level:          CORE
  unit:           "umol/L"
  method:         "ELISA"
  ref_range:
    optimal:      "40-60"
    functional:   "30-70"
    deficiency:   "<30"
    toxicity:     ">100"
  measurability:  "Widely available globally"
  cost_tier:      LOW | MEDIUM | HIGH | RESEARCH_ONLY

council_votes:
  - member:   "Council Member Name"
    vote:     APPROVE | REJECT | ABSTAIN
    comment:  "Justification (required for REJECT)"

final_decision: ACCEPTED | REJECTED
```

---

## 5. BIP Process: From Idea to Taxonomy

```
Day 1: Submission
  → Author opens a Pull Request in bsp-spec/bip/
  → Institute assigns BIP number, sets status: DRAFT

Week 1–2: Technical Review
  → Institute team reviews schema, references, technical coherence
  → Feedback via GitHub comments
  → Multiple rounds normal → status: REVIEW

Days 15–45 (BIP-T): Public Comment Period
  → BIP open for community input on GitHub
  → Anyone can comment: labs, physicians, researchers, developers
  → Author must respond to all substantial comments
  → Institute publishes comment summary → status: COUNCIL

Council Meeting (Quarterly): Vote
  → Full BIP + comment summary + Institute technical opinion presented
  → Each member votes APPROVE / REJECT / ABSTAIN with mandatory justification
  → Quorum: 5 of 7 · Approval: simple majority of those present
  → Votes and justifications published in minutes

Week 1–2 post-vote: Ratification & Implementation
  → If ACCEPTED: Keyholder B ratifies on-chain, taxonomy updated in bsp-spec
  → SDKs updated in the next release with backwards compatibility
  → If REJECTED: Author receives detailed feedback, may resubmit — no limit on attempts
```

---

## 6. BIP Examples: Accepted and Rejected

### Example of an Accepted BIP — Adding GDF-11 (BSP-LA-005)

**Why it was accepted:**
- 2+ high-quality peer-reviewed references (Katsimpardi et al., 2014 *Science*; meta-analysis n=15,000+)
- Established analytical method (ELISA)
- Growing clinical availability
- Reference ranges based on population data

### Examples of Rejected BIPs

| Proposal | Reason for Rejection |
|----------|---------------------|
| Add "subjective energy level" as a biomarker | Not objectively measurable. BSP requires numeric values with standardized units. |
| Add 40 nutritional biomarkers in a single BIP | Bulk proposal with no individual evidence per marker. Resubmit as separate BIPs. |
| Add `provider_fee` field to Exchange Protocol | Attempt to insert monetization into the protocol core. BSP cannot be used to extract value from user-institution transactions. |

---

## 7. Emergency Procedures

| Type | Severity | Response |
|------|----------|---------|
| Critical security vulnerability in smart contracts | CRITICAL | 24–48h response. Immediate 2-of-3 multi-sig action. |
| Unexpected production behavior (bug) | HIGH | 7-day resolution. Immediate public communication. |
| Specification inconsistency (breaking ambiguity) | MEDIUM | Resolution at next Council meeting, advance notification. |

---

## 8. Protocol Capture Protection

The three structural protections against the Institute acting against the ecosystem's interests:

1. **Independent Keyholder C**: A third-party fiduciary holds the third key. Any unilateral abuse by Keyholders A and B can be blocked.
2. **Public, Auditable BIPs**: Every proposal, every vote, every decision is public and recorded on-chain. Anyone can verify the Institute is acting in the ecosystem's interest.
3. **Fork Protection Commitment**: The Institute publicly commits to never legally challenge BSP forks. If the scientific community disagrees with Institute decisions, they may fork — without legal barriers.

---

## How to Submit a BIP

1. Fork `biological-sovereignty-protocol/bsp-spec`
2. Copy `bip/TEMPLATE.md` to `bip/BIP-DRAFT-your-title.md`
3. Fill in the template — evidence citations are mandatory for BIP-T and BIP-P
4. Submit a Pull Request to the main branch
5. The Institute assigns a BIP number within 3 business days
