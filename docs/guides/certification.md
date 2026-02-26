# BSP Certification Guide

> How laboratories, hospitals, and platforms become BSP-Certified

---

## Certification Is Voluntary

Any institution can participate in the BSP ecosystem **without certification**. The smart contracts are open — any system can create an IEO and submit BioRecords, subject only to user consent.

Certification is a **voluntary mark of trust** that unlocks benefits within the ecosystem.

---

## Why Certify?

| Without Certification | With Certification |
|---|---|
| Can submit BioRecords (with user consent) | Same — plus listed in official directory |
| Data accepted by protocol | Data feeds into AVA analysis |
| No badge | Verifiable on-chain badge |
| "Unverified source" notice in Ambrósio OS | BSP-Certified badge in Ambrósio OS |

---

## Certification Levels

| Level | Requirements | Who it's for |
|---|---|---|
| **BSP-Compliant Basic** | L2 Standard biomarkers, schema compliance >99% | Clinical labs, basic health apps |
| **BSP-Compliant Advanced** | L1 Core + L2 Standard, full audit | Longevity labs, specialized clinics |
| **BSP-Compliant Full-Spectrum** | All levels, advanced audit | Major hospital systems |
| **BSP Research Partner** | Research IEO, open publication commitment | Universities, research centers |

---

## The Certification Process

### Step 1 — Create your IEO

Any institution can create an IEO directly using the bsp-sdk — no certification required:

```python
# Python
from bsp_sdk import IEOClient

client = IEOClient()
ieo = client.create(
    domain="my-lab.bsp",
    display_name="My Laboratory",
    ieo_type="LABORATORY",
    country="BR",
    legal_id="12.345.678/0001-90"  # CNPJ
)
```

### Step 2 — Integrate and test

Submit test BioRecords to verify your integration. The BSP specification is at [bsp-spec](https://github.com/Biological-Sovereignty-Protocol/bsp-spec).

Your schema compliance rate must be >99% before applying for certification.

### Step 3 — Apply

Submit your certification application via the `bsp-registry-api`. You will need:
- IEO domain and ID
- Technical documentation
- Legal registration documents
- Compliance test results

### Step 4 — Review

The Ambrósio Institute reviews your application within 15 business days. The review covers:
- Technical integration quality
- Schema compliance rate
- Regulatory standing

### Step 5 — Certification

On approval, your IEO receives a BSP-Certified on-chain badge via the IEORegistry smart contract. Annual renewal required.

---

## Questions?

Contact the Institute: dev@ambrosio.health | [bsp.dev/certification](https://bsp.dev/certification)
