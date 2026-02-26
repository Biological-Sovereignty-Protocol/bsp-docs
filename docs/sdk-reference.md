# SDK Reference

BSP provides official SDKs to streamline integration. Both `@bsp/sdk` (TypeScript) and `bsp-sdk` (Python) share the exact same architectural principles and class names.

> [!TIP]
> The examples below use TypeScript syntax, but the Python equivalent is structurally identical, following synchronous or `async/await` patterns native to Python.

## Core Clients

### `BSPClient`
The primary entry point for the SDK. It handles connecting to Arweave, signing transactions, and managing identity.

```typescript
import { BSPClient } from '@bsp/sdk';

// Initialize a client for an Institution (IEO)
const client = new BSPClient({
  domain: "fleury.bsp",
  privateKey: process.env.BSP_PRIVATE_KEY,
  environment: "mainnet" // or "testnet"
});
```

## Creating Records

### `BioRecordBuilder`
Used to construct immutable, schema-valid data objects before submission.

```typescript
import { BioRecordBuilder } from '@bsp/sdk';

const builder = new BioRecordBuilder(client);

const record = builder
  .setBiomarker("BSP-LA-001") // hs-CRP
  .setValue(0.42)
  .setUnit("mg/L")
  .setCollectionTime("2026-02-26T08:30:00Z")
  .setSource("fleury.bsp") // automatically signed
  .build();
  
// Validation happens automatically on .build()
```

## Network Operations

### `submitRecords()`
Submits one or more BioRecords to a target BEO. Requires a valid `ConsentToken`.

```typescript
const response = await client.submitRecords({
  targetBeo: "andre.bsp",
  records: [record1, record2],
  consentToken: "token-uuid-abc123"
});

console.log(response.transactionId); // Arweave TX ID
console.log(response.status); // "SUCCESS"
```

### `readRecords()`
Fetches decrypted BioRecords from a BEO, scoped by the provided consent.

```typescript
const results = await client.readRecords({
  targetBeo: "andre.bsp",
  consentToken: "token-uuid-def456",
  filter: {
    categories: ["BSP-LA", "BSP-CV"],
    period: {
      from: "2025-01-01T00:00:00Z",
      to: "2026-01-01T00:00:00Z"
    }
  }
});

console.log(`Retrieved ${results.records.length} records.`);
```

## Access Control

### `issueConsentToken()`
*(BEO Holders Only)*. Issues a new token authorizing an IEO.

```typescript
const token = await client.access.issueConsentToken({
  ieoDomain: "dr-carlos.bsp",
  scope: {
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"],
    period: { from: null, to: null } // All history
  },
  expiresInDays: 30
});
```

### `verifyConsent()`
*(Target IEOs)*. Verifies if a token is valid for a specific action before attempting network transmission.

```typescript
const check = await client.access.verifyConsent({
  beoDomain: "andre.bsp",
  token: "token-uuid",
  intent: "SUBMIT_RECORD"
});

if (!check.valid) {
  throw new Error(`Consent invalid: ${check.reason}`); // e.g., "TOKEN_EXPIRED"
}
```
