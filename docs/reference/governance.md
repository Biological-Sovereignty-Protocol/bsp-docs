---
title: Governance & BIPs
---

# BSP Governance — Protocol Changes and BIPs

> Version 0.2 | Ambrósio Institute

---

## Overview

The BSP specification evolves through a public improvement process — **BSP Improvement Proposals (BIPs)**.

Any individual, company, or institution can propose changes to the protocol. The Ambrósio Institute reviews all proposals and coordinates community discussion. Critical protocol changes require multi-signature authorization.

---

## Governance Principles

1. **Openness** — Anyone can propose a BIP. No institutional affiliation required.
2. **Transparency** — All proposals, discussions, and decisions are public.
3. **Conservative change** — Protocol changes have a high bar. Stability is a feature.
4. **Backward compatibility** — Accepted changes must not break existing implementations, unless the break is clearly necessary and the migration path is defined.
5. **Institute guardianship** — The Ambrósio Institute is the guardian of the specification, not its owner. The protocol serves the ecosystem.

---

## BIP Categories

| Category | Description | Examples |
|---|---|---|
| **BSP-BIP-TAXONOMY** | Add or modify biomarker codes | New biomarker, unit correction |
| **BSP-BIP-SCHEMA** | Changes to BEO, IEO, or BioRecord schema | New field, field type change |
| **BSP-BIP-EXCHANGE** | Changes to the Exchange Protocol | New intent, error code |
| **BSP-BIP-GOVERNANCE** | Changes to the governance process itself | BIP template, review timeline |
| **BSP-BIP-INFRA** | Smart contract upgrades | New contract, parameter change |

---

## BIP Status Flow

```
DRAFT → REVIEW → ACCEPTED | REJECTED
                    │
                  FINAL (after implementation)
```

| Status | Description |
|---|---|
| `DRAFT` | Author is drafting — not yet submitted for review |
| `REVIEW` | Submitted — open for community discussion (30 days) |
| `ACCEPTED` | Approved by Institute — scheduled for implementation |
| `REJECTED` | Not accepted — with explanation |
| `FINAL` | Implemented and active in a released BSP version |

---

## Submitting a BIP

1. Fork this repository
2. Copy `bip/BIP-0000-template.md` to `bip/BIP-XXXX-your-title.md`
3. Fill in the template completely
4. Open a Pull Request

The PR opens the 30-day public review period. The Ambrósio Institute will schedule a review call for proposals that reach community consensus.

---

## On-Chain Governance — proposeAction / approveAction

Critical protocol changes are executed through the **Governance smart contract** using a 2-of-3 multisig mechanism. No single keyholder — including the Institute's founder — can execute a change alone.

### Keyholders

The Governance contract maintains a set of three authorized keyholders. Each keyholder holds an Ed25519 key pair registered on-chain. Keyholder rotation itself requires multisig approval.

### Proposal Flow

```
proposeAction(type, params, justification)
       │
       ▼
  PROPOSAL created (status: PENDING)
       │
       ▼
approveAction(proposal_id, keyholder_signature)   ← 1st approval
       │
       ▼
approveAction(proposal_id, keyholder_signature)   ← 2nd approval (different keyholder)
       │
       ▼
  PROPOSAL executed automatically (status: EXECUTED)
```

### Proposal Types

| Type | Description | Parameters |
|---|---|---|
| `suspendIEO` | Suspend an institutional entity for compliance violation | `ieo_id`, `reason`, `duration` |
| `reinstateIEO` | Reinstate a previously suspended IEO | `ieo_id` |
| `changeCertLevel` | Change an IEO's certification level | `ieo_id`, `new_level` |
| `addIEOType` | Register a new institutional entity type in the protocol | `type_code`, `type_name`, `requirements` |
| `removeIEOType` | Deprecate an institutional entity type | `type_code`, `migration_path` |
| `updateParam` | Change a protocol parameter (e.g., consent token max duration) | `param_key`, `new_value` |
| `addKeyholder` | Add a new keyholder to the Governance contract | `public_key`, `identity` |
| `removeKeyholder` | Remove a keyholder | `public_key` |
| `upgradeContract` | Deploy a new version of any BSP smart contract | `contract_id`, `new_source_tx` |

### Proposal Schema

```typescript
GovernanceProposal {
  proposal_id:   string       // Unique identifier
  type:          ProposalType // One of the types above
  params:        object       // Type-specific parameters
  justification: string       // Human-readable reason
  proposed_by:   string       // Keyholder public key
  proposed_at:   ISO8601
  approvals:     Approval[]   // List of keyholder approvals
  status:        'PENDING' | 'EXECUTED' | 'REJECTED' | 'EXPIRED'
  expires_at:    ISO8601      // Proposals expire after 7 days without quorum
  executed_at:   ISO8601 | null
  arweave_tx:    string       // On-chain record
}

Approval {
  keyholder:   string         // Public key of approving keyholder
  signature:   string         // Ed25519 signature over proposal_id + params
  approved_at: ISO8601
}
```

### Security Properties

- Proposals expire after 7 days if quorum is not reached
- A keyholder cannot approve their own proposal (proposer counts as first approval, but the second must come from a different keyholder)
- All proposals, approvals, and executions are permanently recorded on Arweave
- Rejected proposals can be re-submitted with modifications

### SDK Usage

```typescript
import { GovernanceClient } from '@bsp/sdk'

const gov = new GovernanceClient({ keyholderKey: myPrivateKey })

// Propose suspending an IEO
const proposal = await gov.proposeAction({
  type: 'suspendIEO',
  params: { ieo_id: 'bad-lab.bsp', reason: 'Data falsification', duration: '90d' },
  justification: 'Audit revealed systematic data falsification in submitted BioRecords'
})

// Another keyholder approves
const gov2 = new GovernanceClient({ keyholderKey: otherKeyholderKey })
await gov2.approveAction(proposal.proposal_id)
// → Proposal executed automatically after 2nd approval
```

---

## BIP Index

| BIP | Title | Status |
|---|---|---|
| BIP-0000 | BIP Template | FINAL |

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
