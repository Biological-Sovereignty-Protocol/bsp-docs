# Tutorials & Cookbooks

These practical guides bridge the gap between protocol theory and working code. Use them as starting points for your own BSP integrations.

## 1. Laboratory Integration (Submit Data)
*Scenario: A clinic wants to automatically convert daily blood test results into BSP BioRecords and send them to patients' BEOs.*

### Step 1: Connect to the Network
The lab initializes their institution identity using their private key.

```python
from bsp_sdk import BSPClient

lab = BSPClient(
    domain="clinic.bsp",
    private_key=LAB_PRIVATE_KEY
)
```

### Step 2: Validate Patient Consent
Before processing data, ensure the patient has granted you the right to submit to their BEO.

```python
patient_domain = "andre.bsp"
intent = "SUBMIT_RECORD"

check = lab.access.verify_consent(
    beo_domain=patient_domain,
    intent=intent
)

if not check.valid:
    print(f"Cannot submit. Reason: {check.reason}")
    # e.g., TOKEN_REVOKED or TOKEN_EXPIRED
    return
```

### Step 3: Map LIS Data to BSP Format
Convert the internal laboratory data into standardized BSP BioRecords.

```python
from bsp_sdk import BioRecordBuilder

records = []
for result in internal_lis_results:
    record = BioRecordBuilder(lab) \
        .set_biomarker(result.bsp_mapping_code) \
        .set_value(result.numeric_value) \
        .set_unit(result.unit) \
        .set_collected_at(result.timestamp) \
        .build()
    records.append(record)
```

### Step 4: Encrypt and Transmit
Submit the records to Arweave. The SDK automatically handles encrypting the data with the patient's public key.

```python
response = lab.submit_records(
    target_beo=patient_domain,
    records=records,
    consent_token=check.token.token_id
)

print(f"Successfully secured {len(records)} records on-chain.")
```

---

## 2. Platform Integration (Read Data)
*Scenario: A longevity platform wants to read a user's historical cardiovascular data to render a custom dashboard widget.*

### Step 1: Request Access
The platform prompts the user for access. This usually triggers a flow in the user's BSP wallet app.

```typescript
// The platform requests a token scoping ONLY cardiovascular data
const requestUrl = platform.access.createAuthRequestUrl({
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"], // Cardiovascular focus
    durationDays: 30,       // Time-limited
    purpose: "Render the CV Health Dashboard"
});

// User clicks, approves on their device, returns an active AuthToken
```

### Step 2: Fetch and Filter Data
Once authorized, query the network for the relevant records. The SDK will decrypt the response locally since it's operating on behalf of the user's explicit consent session.

```typescript
const cvRecords = await platform.readRecords({
    targetBeo: "andre.bsp",
    consentToken: activeAuthToken,
    filter: {
        categories: ["BSP-CV"],
        period: {
            from: "2024-01-01T00:00:00Z",
            to: null // Up to today
        }
    }
});
```

### Step 3: Aggregate and Render
Iterate over the standardized records without worrying about which lab produced them. 

```typescript
// All LDL-P records are standardized to nmol/L, regardless of the source.
const ldlpHistory = cvRecords
    .filter(r => r.biomarker === "BSP-CV-001")
    .map(r => ({ date: r.collected_at, value: r.value }));

renderChart(ldlpHistory);
```
