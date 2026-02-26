# Institutional Entity Object (IEO)

"Every institution that touches human biology needs a language to speak it."

## Overview - What is an IEO?
The Institutional Entity Object (IEO) represents any organization, system, or professional that interacts with biological data on behalf of, or with the consent of, a BEO holder.

Every institution in the ecosystem — from a national hospital chain to a wearable device manufacturer — is an IEO. It establishes cryptographic identity, defines capabilities, and encodes certification status. Creating an IEO is open to any institution. Obtaining BSP Certification is voluntary, but unlocks meaningful benefits.

## IEO Types
Each IEO type represents a distinct category with specific capabilities, restrictions, and certification pathways.

### Laboratory (LAB)
Clinical and diagnostic laboratories. They are the primary source of BioRecords.
*   **Authorized levels**: L2 Standard (default), L1 Core/L3 Extended (advanced).
*   **Can READ BEOs**: Never — submission is strictly write-only.
*   **Domain**: `institutionname.bsp` (e.g., `fleury.bsp`).

### Hospital & Health System (HSP)
Hospitals and integrated care providers. They generate data across clinical domains.
*   **Authorized levels**: L1 Core + L2 Standard (default).
*   **Can READ BEOs**: Only with active, time-limited consent token.
*   **Physicians**: May credential physicians under the hospital IEO (`dr.silva@hcor.bsp`).

### Wearable & Device (WRB)
Hardware and software companies producing continuous monitoring systems.
*   **Authorized levels**: L4 Device (`BSP-DV`) exclusively.
*   **Submission frequency**: Daily consolidated records per user (no second-by-second spam).
*   **Can READ BEOs**: Never. Devices produce data; they do not consume it.
*   **SDK**: Must use the official BSP Device SDK for automated daily batch submission.

### Physician & Practitioner (PHY)
Licensed physicians, specialists, and health practitioners.
*   **Primary function**: `READ_RECORDS` to interpret existing data.
*   **Write capabilities**: Can only submit clinical assessment BioRecords (`BSP-CL`).
*   **Consent model**: Time-limited and scope-limited tokens only (e.g., 30 days, `BSP-LA` only).

### Health Insurer (INS)
Health insurance companies and managed care organizations. They operate under the most restrictive access model.
*   **Read access**: Aggregate anonymized data only. No individual BEOs.
*   **Individual access**: Only with explicit ongoing opt-in consent; receives **SVA score only**, no raw data.
*   **Prohibited use**: Cannot use BSP data for underwriting decisions or coverage denial.

### Research Institution (RES)
Universities, research centers, and clinical trials.
*   **Data access**: Anonymized aggregate with explicit opt-in.
*   **BIP Contribution**: Required for BSP Research Partner status.
*   **Publication**: Open access publication of BSP-derived findings.

### Platform & AI System (PLT)
Digital health platforms, telemedicine, and AI systems (like AVA).
*   **Primary function**: `ANALYZE_VITALITY` and `REQUEST_SCORE` intents.
*   **Read access**: With persistent, refreshable user consent.
*   **Write access**: Cannot write BioRecords — platforms interpret, not measure.

## Permission Matrix

| Action | LAB | HOSP | WEAR | PHY | INS | RES |
|--------|-----|------|------|-----|-----|-----|
| Submit BioRecords | ✅ | ✅ | ✅ | ✅* | — | — |
| Read own submissions | — | — | — | — | — | — |
| Read BEO (with token) | — | ✅ | — | ✅ | — | — |
| Aggregate anonymized | — | — | — | — | ✅* | ✅ |
| Analyze vitality (AVA) | — | — | — | ✅ | — | — |
| Request SVA score | — | — | — | ✅ | ✅* | — |
| Issue consent tokens | — | — | — | — | — | — |
| Revoke consent tokens| — | — | — | — | — | — |

*\* PHY may only submit clinical assessment records. INS may only access SVA score with opt-in.*

## Public IEO Registry & Certification
Every active IEO is listed in the **BSP Public Registry** — a transparent, on-chain record queryable by anyone. Users can verify an institution's claims before granting consent.

Certified institutions receive an embeddable **Certification Badge** that links directly to their live on-chain registry entry. It cannot be spoofed.

The `IEORegistry` smart contract handles IEO creations (free and open) and certification updates (managed by the Institute).
