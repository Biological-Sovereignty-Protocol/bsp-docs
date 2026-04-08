# Quick Start — Biological Sovereignty Protocol

> Get started with BSP in under 10 minutes.

---

## Choose your path

| I am... | Start here |
|---|---|
| A **developer** building a health app | [Developer Quick Start](#developer-quick-start) |
| A **laboratory** wanting to submit exam data | [Laboratory Quick Start](#laboratory-quick-start) |
| A **user** wanting to understand your BEO | [User Guide](../guides/user-onboarding.md) |
| Building an **AI integration** | [MCP Quick Start](#mcp-quick-start) |

---

## Developer Quick Start

### 1. Install the SDK

```bash
# TypeScript / JavaScript
npm install bsp-sdk

# Python
pip install bsp-sdk
```

### 2. Resolve a BEO

```typescript
import { BEOClient } from 'bsp-sdk'

const client = new BEOClient()
const beo = await client.resolve('andre.bsp')
console.log(beo.beo_id)
```

### 3. Read BioRecords (with consent)

```typescript
import { ExchangeClient, AccessManager } from 'bsp-sdk'

// Get or request consent token
const access = new AccessManager({ ieoId: 'my-app.bsp' })
const token = await access.getToken(beo.beo_id)

// Read records
const exchange = new ExchangeClient()
const { records } = await exchange.readRecords(beo.beo_id, token, {
  categories: ['BSP-GL', 'BSP-LA'],
  limit: 50
})
```

---

## Laboratory Quick Start

### 1. Install the Python SDK

```bash
pip install bsp-sdk
```

### 2. Build a BioRecord from your exam result

```python
from bsp_sdk import BioRecordBuilder, TaxonomyResolver

# Validate the biomarker code
resolver = TaxonomyResolver()
print(resolver.is_valid("BSP-GL-001"))   # True
print(resolver.get_level("BSP-GL-001"))  # "STANDARD"

# Build the BioRecord
record = (BioRecordBuilder()
    .beo_id("patient-beo-id")
    .biomarker("BSP-GL-001")    # Fasting glucose
    .value(94)
    .unit("mg/dL")
    .timestamp("2026-02-24T08:30:00Z")
    .confidence(0.99)
    .build())
```

### 3. Request consent from the patient

```python
from bsp_sdk import AccessManager

manager = AccessManager(ieo_id="my-lab.bsp")

# Send consent request to patient
request = manager.request_consent(
    beo_id="patient-beo-id",
    intents=["SUBMIT_BIORECORD"],
    categories=["BSP-GL", "BSP-HM"],
    reason="Submit blood test results — Feb 24, 2026"
)

# Wait for patient approval (they receive a notification)
token = manager.wait_for_approval(request["request_id"])
```

### 4. Submit the BioRecord

```python
from bsp_sdk import ExchangeClient

exchange = ExchangeClient(ieo_id="my-lab.bsp")
result = exchange.submit(record, token=token)
print(result["arweave_tx"])  # Permanent record on Arweave
```

---

## MCP Quick Start

Add BSP to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "bsp": {
      "command": "npx",
      "args": ["@bsp/mcp"],
      "env": {
        "BSP_BEO_DOMAIN": "your-name.bsp"
      }
    }
  }
}
```

Then in Claude: *"What do my last blood test results say about my longevity markers?"*

---

## Next Steps

- [Full BEO specification](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/spec/beo.md)
- [Full biomarker taxonomy](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/tree/main/spec/taxonomy)
- [Exchange Protocol reference](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/spec/exchange.md)
- [Certification process](guides/certification.md)
