# Exchange Protocol

The BSP Exchange Protocol defines how data moves between systems — the format of requests and responses, the authentication model, and the full set of typed interactions (intents).

---

## 1. Request/Response Model

Every interaction in the BSP ecosystem is a `BSPRequest` → `BSPResponse` cycle, enforced by the AccessControl smart contract on Arweave.

### BSPRequest Schema

```typescript
interface BSPRequest {
  request_id:    string       // UUID v4 — unique per request (idempotency)
  bsp_version:   string       // Protocol version (semver) — e.g., "0.2.0"
  timestamp:     string       // ISO8601 — when the request was constructed

  // Who is making the request
  requester: {
    ieo_id:      string       // Institution's UUID
    ieo_domain:  string       // e.g., "fleury.bsp"
    signature:   string       // Ed25519 signature of (request_id + timestamp + beo_id)
  }

  // What is being requested
  intent:        BSPIntent    // SUBMIT_RECORD | READ_RECORDS | ANALYZE_VITALITY | ...

  // Who the request targets
  target: {
    beo_id:      string       // Target BEO UUID
    beo_domain:  string       // e.g., "andre.bsp"
  }

  // Authorization proof
  auth: {
    consent_token_id: string  // ConsentToken issued by the BEO holder
  }

  // Intent-specific payload
  payload:       object       // See intent-specific schemas below
}
```

### BSPResponse Schema

```typescript
interface BSPResponse {
  request_id:  string         // Echo of the original request_id
  status:      "SUCCESS" | "ERROR"
  timestamp:   string         // ISO8601

  // On success
  payload:     object | null  // Intent-specific response data

  // On error
  error: {
    code:      string         // Machine-readable error code
    message:   string         // Human-readable description
    field:     string | null  // Specific field that failed (validation errors)
    retryable: boolean        // Whether retrying the request makes sense
  } | null
}
```

---

## 2. Authentication Model — Double Verification

Every BSPRequest is authenticated **twice**:

1. **ConsentToken**: Proof from the blockchain that the BEO holder authorized this IEO for this intent and category.
2. **IEO Signature**: The institution's cryptographic signature on the request — proves the request was made by the actual institution, not an impostor.

```
AccessControl.verify(consent_token_id, ieo_id, beo_id, intent, category)
  → VALID: proceed
  → INVALID: reject with specific error code (TOKEN_REVOKED, etc.)

IEO Signature.verify(request_id + timestamp + beo_id, ieo_public_key)
  → VALID: proceed
  → INVALID: reject with IEO_SIGNATURE_INVALID
```

---

## 3. Intent Reference

### `SUBMIT_RECORD` — Write a BioRecord

```typescript
// Request Payload
{
  records: [{
    biomarker:    string    // BSP code — e.g., "BSP-LA-004"
    value:        number    // Measured value
    unit:         string    // Standardized unit
    collected_at: string    // ISO8601 — when sample was collected
    ref_range: {
      optimal:    string
      functional: string
      deficiency: string
      toxicity:   string | null
    }
    metadata:     object    // Optional: device model, method, batch number
  }]
}

// Response Payload (SUCCESS)
{
  submission: {
    record_ids:   string[]  // Arweave transaction IDs — permanent
    stored_at:    string    // ISO8601
    arweave_txs:  string[]  // One per record (or one batch transaction)
  }
}
```

**Batch submissions**: Multiple BioRecords can be submitted in a single request. More efficient and lower Arweave cost than individual submissions.

---

### `READ_RECORDS` — Read BioRecords

```typescript
// Request Payload
{
  filters: {
    categories:  string[]       // BSP categories to include (e.g., ["BSP-LA", "BSP-HM"])
    biomarkers:  string[]       // Specific codes (optional)
    period: {
      from:      string | null  // ISO8601
      to:        string | null  // null = up to now
    }
    limit:       number         // Max records per page (default 100, max 500)
    offset:      number         // For pagination
  }
}

// Response Payload (SUCCESS)
{
  records: [{
    record_id:    string
    biomarker:    string
    value:        number
    unit:         string
    collected_at: string
    submitted_at: string
    source: {
      ieo_id:     string
      ieo_domain: string
    }
    ref_range:    object
    status:       "CURRENT" | "SUPERSEDED"
  }]
  total_count: number
  has_more:    boolean
}
```

---

### `ANALYZE_VITALITY` — Request AVA Analysis

Available only to PLATFORM IEOs integrated with AVA. Requires active `ANALYZE_VITALITY` consent.

```typescript
// Request Payload
{
  // no additional payload required — consent token defines scope
}

// Response Payload (SUCCESS)
{
  analysis_id: string
  sva_score: {
    composite:      number    // 0–100
    bio_age:        number    // Years
    pace:           number    // 1.0 = normal; 0.8 = aging slower
    cardiovascular: number    // 0–100
    metabolic:      number    // 0–100
    neurological:   number    // 0–100
    immunological:  number    // 0–100
    reserve:        number    // Population percentile (0–100)
  }
  confidence:     number      // 0.0–1.0 — based on data completeness
  processed_at:   string
}
```

---

### `REQUEST_SCORE` — Request SVA Score

```typescript
// Returns SVA composite score without triggering full AVA analysis
// Response Payload (SUCCESS)
{
  sva_composite:  number      // 0–100
  bio_age:        number      // Years
  computed_at:    string      // When this score was last computed
}
```

---

### `EXPORT_DATA` — Export All Data

Always available to BEO holders. Cannot be restricted by any IEO.

```typescript
// Response Payload (SUCCESS)
{
  export_id:      string
  download_url:   string    // Signed URL — expires in 24h
  format:         "JSON" | "CSV" | "FHIR_R4"
  record_count:   number
  size_bytes:     number
  expires_at:     string
}
```

---

## 4. Error Codes

| Code | Category | Description | Retryable |
|------|----------|-------------|-----------|
| `TOKEN_NOT_FOUND` | Auth | ConsentToken ID does not exist | No |
| `TOKEN_REVOKED` | Auth | Token was revoked by the BEO holder | No |
| `TOKEN_EXPIRED` | Auth | Token's `expires_at` has passed | No |
| `INTENT_NOT_AUTHORIZED` | Auth | Requested intent not in token scope | No |
| `CATEGORY_NOT_AUTHORIZED` | Auth | Category not in token scope | No |
| `IEO_SIGNATURE_INVALID` | Auth | IEO signature verification failed | No |
| `IEO_NOT_FOUND` | Auth | IEO domain not found in IEORegistry | No |
| `BEO_LOCKED` | State | BEO is in LOCKED state | No |
| `SCHEMA_VALIDATION_FAILED` | Data | BioRecord failed schema validation | Fix data |
| `BIOMARKER_CODE_INVALID` | Data | BSP code does not exist in taxonomy | Fix code |
| `UNIT_INVALID` | Data | Unit not valid for this biomarker | Fix unit |
| `ARWEAVE_WRITE_FAILED` | Infra | Temporary Arweave write failure | **Yes** |
| `RATE_LIMIT_EXCEEDED` | Infra | Too many requests (per IEO per minute) | **Yes** |
| `BSP_VERSION_MISMATCH` | Protocol | Client version incompatible | Update SDK |

---

## 5. SDK Integration

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "yourlaboratory.bsp",
    private_key = YOUR_PRIVATE_KEY,
)

# Submit
result = client.submit_biorecord(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    biomarker     = "BSP-HM-001",
    value         = 13.8,
    unit          = "g/dL",
    collected_at  = "2026-02-26T08:00:00Z",
    ref_range     = { "optimal": "13.5-17.5", "functional": "12.0-17.5" }
)
print(result.submission.record_ids)  # Permanent IDs on Arweave

# Read
records = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    filters = { "categories": ["BSP-HM"], "period": { "from": "2025-01-01" } }
)
```
