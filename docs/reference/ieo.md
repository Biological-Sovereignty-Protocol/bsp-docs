# IEO — Institutional Entity Object

The **Institutional Entity Object (IEO)** is the identity of any organization, system, or professional that interacts with biological data in the BSP ecosystem — from a clinical laboratory to an AI platform.

> "Every institution that touches human biology needs a language to speak it. The IEO is that identity."

---

## 1. Overview

Any institution can create an IEO — directly, without approval, and at minimal cost. The IEO establishes:
- Cryptographic identity for the institution
- Which actions the institution can perform
- The institution's operational record
- Optional BSP Certification status (voluntary quality seal)

---

## 2. IEO Types

| Code | Type | Primary Role |
|------|------|-------------|
| `LAB` | Laboratory | Submit BioRecords — the primary data source |
| `HOSP` | Hospital & Health System | Submit + Read records across clinical domains |
| `WEAR` | Wearable & Device | Submit continuous Level 4 (Device) data daily |
| `PHY` | Physician & Practitioner | Read records to interpret patient history |
| `INS` | Health Insurer | Read SVA aggregate score only — never raw data |
| `RES` | Research Institution | Anonymized aggregate access for open science |
| `PLT` | Platform & AI System | Analyze vitality, request SVA scores |

---

## 3. Permission Matrix

| Action | LAB | HOSP | WEAR | PHY | INS | RES |
|--------|:---:|:----:|:----:|:---:|:---:|:---:|
| Submit BioRecords | ✓ | ✓ | ✓ | ✓* | — | — |
| Read BEO (with token) | — | ✓ | — | ✓ | — | — |
| Aggregate anonymized data | — | — | — | — | ✓* | ✓ |
| Analyze vitality (AVA) | — | — | — | ✓ | — | — |
| Request SVA score | — | — | — | ✓ | ✓* | — |

*PHY: clinical assessments only (BSP-CL) | INS: SVA composite only with user opt-in | RES: anonymized aggregate only

**Important**: Only BEO holders can issue or revoke consent tokens. No IEO can grant access to another user's data.

---

## 4. IEO Complete Schema

```typescript
interface IEO {
  // Identity
  ieo_id:        string    // Universally unique institutional identifier
  domain:        string    // .bsp address — e.g., "fleury.bsp"
  display_name:  string    // Full legal name
  ieo_type:      IEOType   // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN | INSURER | RESEARCH | PLATFORM
  country:       string    // ISO3166 country code
  jurisdiction:  string    // Regulatory jurisdiction
  legal_id:      string    // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:    string    // Institutional public key for signed submissions
  created_at:    string    // ISO8601 registration timestamp
  version:       string    // BSP version at time of creation

  // Certification
  certification: {
    level:        "UNCERTIFIED" | "BASIC" | "ADVANCED" | "FULL" | "DEVICE" | "RESEARCH"
    granted_at:   string         // Date certification was granted
    expires_at:   string         // Annual renewal date
    categories:   string[]       // Authorized BSP categories (e.g., ["BSP-LA", "BSP-HM"])
    intents:      BSPIntent[]    // Authorized exchange intents
    restrictions: string[]       // Explicit prohibitions, if any
    certified_by: string         // Institute auditor reference
    audit_ref:    string         // Audit transaction ID on Arweave
  }

  // Operational Record
  operations: {
    biorecords_submitted: number  // Total BioRecords submitted to date
    last_submission:      string  // Timestamp of most recent submission
    compliance_rate:      number  // Schema compliance rate (0.0–1.0)
    active_consents:      number  // Current open consent tokens
    complaints:           number  // Complaints received
  }

  // Contacts
  contacts: {
    technical_lead:  ContactRef  // Technical integration point of contact
    compliance_lead: ContactRef  // Regulatory and compliance contact
    api_endpoint:    string      // Primary BSP API endpoint URL
    webhook_url:     string      // Notification webhook (optional)
  }

  // Status
  status:            "ACTIVE" | "SUSPENDED" | "REVOKED" | "PENDING"
  suspension_reason: string | null
  revocation_reason: string | null
}
```

---

## 5. Certification Levels

Certification is **voluntary** — uncertified IEOs can still participate with user consent. Certification adds the quality seal, directory listing, and AVA pipeline access.

| Level | Code | Data Access | Target Institution |
|-------|------|-------------|------------------|
| Uncertified | — | Any, with user consent | Any institution starting out |
| Basic | BSP-1 | L2 Standard biomarkers | Clinical labs, routine diagnostics |
| Advanced | BSP-2 | L1 Core + L2 Standard | Advanced longevity clinics |
| Full Spectrum | BSP-3 | L1 + L2 + L3 Extended | Comprehensive research centers |
| Device | BSP-4 | L4 Device (continuous) | Wearable manufacturers |

---

## 6. Special Restrictions

### Wearable IEOs
Wearable IEOs can **never** be granted `READ_RECORDS` access under any circumstances — not even with explicit user consent. Devices produce data; they do not consume it. This restriction is permanent and encoded in the `IEORegistry` contract.

### Insurer IEOs
Insurer IEOs are permanently prohibited from:
- Using BSP data for insurance underwriting
- Accessing raw BioRecords (only SVA composite score, with explicit user opt-in)
- Storing raw BSP data — only anonymized insights

This restriction is enforced at the smart contract level. Violation results in immediate permanent revocation.

---

## 7. Creating an IEO

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain      = "yourlaboratory.bsp",   # Check availability first
    name        = "Your Laboratory Name",
    ieo_type    = IEOType.LABORATORY,
    jurisdiction = "BR",
    legal_id    = "12.345.678/0001-99",   # CNPJ, EIN, VAT, etc.
    contact     = "tech@yourlaboratory.com",
    website     = "https://yourlaboratory.com",
).build()

result = ieo.register()

print(result.ieo_id)       # Permanent UUID on Arweave
print(result.domain)       # yourlaboratory.bsp
print(result.arweave_tx)   # On-chain transaction ID
print(result.status)       # ACTIVE (UNCERTIFIED by default)

# Save the private key — it's the only way to sign operations as this IEO
# result.private_key → store in .env as BSP_IEO_PRIVATE_KEY
# result.seed_phrase → store offline
```

---

## 8. Onboarding for Certification

### Standard Laboratory Path (BSP-1)

1. **Application** — Submit via the Institute portal at `biologicalsovereigntyprotocol.com/certify`. Requires: legal entity ID, contacts, list of analytical categories, requested certification level.
2. **Document Review** — Institute reviews within 5 business days: legal legitimacy, regulatory standing, capability match.
3. **Technical Audit** — Access to the BSP Compliance Test Suite. Must submit 100 syntactically valid BioRecords across all requested categories using the SDK in sandbox mode.
4. **IEO Update** — On approval, Institute updates the institution's IEO on Arweave to `BSP-CERTIFIED` status with authorized categories and audit reference.
5. **Production Integration** — SDK production credentials issued. Badge becomes active and verifiable on-chain.
6. **Annual Renewal** — Fails → status changes to `SUSPENDED`.

### Suspension vs. Revocation

| Suspension (Temporary) | Revocation (Permanent) |
|----------------------|----------------------|
| Failed annual renewal | Repeated schema violations |
| Outstanding fees | Unauthorized use of BEO data |
| Compliance audit failure | Using BSP data for underwriting (insurers) |
| Contacts not current | Selling BSP data to third parties |

---

## 9. Public Registry & Certification Badge

Every active IEO appears in the BSP Public Registry, queryable by anyone:

```html
<!-- Embeddable BSP Certification Badge -->
<a href="https://biologicalsovereigntyprotocol.com/registry/fleury.bsp">
  <img src="https://biologicalsovereigntyprotocol.com/badges/BSP-Compliant-Advanced.svg"
       alt="BSP-Compliant Advanced — Certified by Ambrósio Institute"
       width="200" />
</a>
```

Badge status updates automatically from the on-chain registry. Expired or suspended IEOs display a different badge state.

---

## See Also

- [BEO Specification →](./beo.md)
- [ConsentToken & Access Control →](./consent-token.md)
- [Certification Guide →](../guides/certification.md)
