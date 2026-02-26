# Governance & BIP Process

"A protocol that cannot evolve is dead. A protocol that anyone can change is not a protocol."

## Governance Philosophy
BSP is a public good. Its governance model resolves the fundamental tension between stability (systems built on it shouldn't break) and flexibility (incorporating scientific breakthroughs).

The solution is a strict separation of layers:
*   **Protocol Core**: Changes rarely. Requires multi-sig consensus & 90-day public comment.
*   **Biomarker Taxonomy**: Evolves quarterly based on approved BIPs. Requires Scientific Council vote + formal ratification.
*   **Implementations (AVA, SDKs)**: Evolve continuously without impacting the protocol.

## The Ambrósio Institute as Guardian
The Ambrósio Institute is the guardian of the BSP standard — not its owner.

### The Scientific Council
*   **Composition**: 7 independent global experts (longevity, cardiology, metabolism, etc.).
*   **Independence**: Mandatory. No member can have financial ties to the Institute.
*   **Quorum**: 5 of 7 needed to vote. Simple majority decides.
*   **Meetings**: Quarterly (Jan, Apr, Jul, Oct) to review pending BIPs.

### The Three Keys — Multi-Sig
Critical operations on the Arweave smart contracts require at least 2 of 3 authorized keys.
*   **Key A — Founder**: Director of the Institute.
*   **Key B — Chief Scientific Officer**: Technical protocol lead.
*   **Key C — Legal Custody**: Independent fiduciary. Acts as a safeguard against unilateral abuse.

## BSP Improvement Proposals (BIPs)
A BIP is the formal unit of evolution for the BSP protocol. Anyone globally can submit a BIP — researchers, physicians, developers — without paying fees or requiring membership.

### Types of BIPs
| Type | Name | Process |
|------|------|---------|
| **BIP-T** | Taxonomy | Addition/modification of biomarkers. Voted on quarterly. |
| **BIP-P** | Protocol | Core modifications. Requires 90-day public comment. |
| **BIP-G** | Governance | Changes to the governance model itself. Requires 120-day comment. |
| **BIP-I** | Informational | Best practices, documentation guidelines. Simplified approval. |

### The BIP Lifecycle
1.  **Submission (1 day)**: Author submits a Pull Request to `bsp-spec/bip` using the template. Status: `DRAFT`.
2.  **Technical Review (2 weeks)**: Institute verifies schema, references, and completeness. Status: `REVIEW`.
3.  **Public Comment (30-120 days)**: Open debate on GitHub. Status: `COUNCIL`.
4.  **Scientific Council Vote**: Quarterly evaluation. Evaluates evidence (requires at least 2 peer-reviewed papers).
5.  **Decision & Ratification (1-2 weeks)**: If approved, the Scientific Keyholder ratifies the change on-chain. SDK implementations are scheduled.

## Emergency Procedures & Protections
What prevents the Institute from "capturing" the protocol?
1.  **Independent Key C**: Prevents unilateral contract changes.
2.  **Public Auditability**: Every BIP, vote, and justification is permanently public and on-chain.
3.  **Fork Protection Commitment**: The Institute publicly commits to never legally contest implementations that fork away from the standard if the community disagrees with Institute decisions.
