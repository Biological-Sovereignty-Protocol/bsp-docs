# BSP Developer Quickstart — Full Flow in 10 Minutes

This guide walks through every step of the BSP lifecycle: creating user and institution identities, granting consent, submitting biological data, reading it back, and revoking access. All in TypeScript, all copy-paste ready.

By the end you will have run the complete BEO → IEO → ConsentToken → BioRecord → Query → Revoke cycle against the BSP testnet.

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- A code editor
- 10 minutes

No blockchain wallet, no prior crypto experience required.

---

## Install the SDK

```bash
npm install @bsp/sdk
```

---

## Set Up Environment Variables

Create a `.env` file at the root of your project:

```bash
# .env
BSP_RELAYER_URL=https://relayer.testnet.biologicalsovereigntyprotocol.com
BSP_NETWORK=testnet
```

The relayer handles Arweave transaction broadcasting. On testnet, all writes are free.

> For production, set `BSP_NETWORK=mainnet` and provision an Arweave wallet via the Institute portal.

---

## Step 1 — Create a BEO (User Identity)

A BEO is the permanent biological identity of a person. Keys are generated locally — nothing leaves the device.

```typescript
// create-beo.ts
import { BEOClient } from '@bsp/sdk'
import * as fs from 'fs'

async function createBEO() {
  const client = new BEOClient({
    network: process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
  })

  // Generate a 24-word BIP-39 seed phrase locally (never transmitted)
  const { seedPhrase, privateKey, publicKey } = await client.generateSeedPhrase()

  // Register the BEO on Arweave
  const result = await client.createBEO({
    domain: 'alice.bsp',    // Must be available — check with client.isDomainAvailable()
    publicKey,
  })

  console.log('BEO created:', result.beoId)
  console.log('Domain:',      result.domain)      // alice.bsp
  console.log('Arweave TX:',  result.arweaveTx)   // On-chain transaction ID

  // Store seed phrase offline (printed here for demo only — never log in production)
  console.log('\n⚠️  SAVE THIS SEED PHRASE OFFLINE:')
  console.log(seedPhrase)

  // Persist private key for subsequent steps
  fs.writeFileSync('.beo-key.json', JSON.stringify({
    beoId:      result.beoId,
    domain:     result.domain,
    privateKey,
  }))

  return result
}

createBEO().catch(console.error)
```

Run it:

```bash
npx ts-node create-beo.ts
```

Expected output:

```
BEO created: 7f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c
Domain:      alice.bsp
Arweave TX:  abc123xyz...

⚠️  SAVE THIS SEED PHRASE OFFLINE:
zoo clock wagon table tree river glass ...
```

---

## Step 2 — Create an IEO (Institution Identity)

An IEO is the identity of any organization that interacts with biological data. Here we create a laboratory.

```typescript
// create-ieo.ts
import { IEOClient, IEOType } from '@bsp/sdk'
import * as fs from 'fs'

async function createIEO() {
  const client = new IEOClient({
    network: process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
  })

  const result = await client.createIEO({
    domain:       'genomicslab.bsp',
    displayName:  'Genomics Lab Inc.',
    ieoType:      IEOType.LAB,
    country:      'US',
    jurisdiction: 'US',
    legalId:      'EIN-12-3456789',
    contact:      'tech@genomicslab.example.com',
  })

  console.log('IEO created:', result.ieoId)
  console.log('Domain:',      result.domain)       // genomicslab.bsp
  console.log('Status:',      result.status)       // ACTIVE (UNCERTIFIED)

  // Persist IEO credentials
  fs.writeFileSync('.ieo-key.json', JSON.stringify({
    ieoId:      result.ieoId,
    domain:     result.domain,
    privateKey: result.privateKey,   // Use this to sign all future requests
  }))

  return result
}

createIEO().catch(console.error)
```

> The IEO starts as `UNCERTIFIED`. It can still participate with user consent. Certification (BSP-1 through BSP-3) is a separate voluntary process — see the [Certification Guide](./certification.md).

---

## Step 3 — Grant a ConsentToken

The BEO holder (user) grants the IEO (lab) specific permissions via a ConsentToken. No institution can read or write data without one.

```typescript
// grant-consent.ts
import { BEOClient } from '@bsp/sdk'
import * as fs from 'fs'

async function grantConsent() {
  const beoCredentials = JSON.parse(fs.readFileSync('.beo-key.json', 'utf-8'))
  const ieoCredentials = JSON.parse(fs.readFileSync('.ieo-key.json', 'utf-8'))

  const client = new BEOClient({
    network:    process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
    privateKey: beoCredentials.privateKey,
    beoId:      beoCredentials.beoId,
  })

  const token = await client.grantConsent({
    ieoId:        ieoCredentials.ieoId,
    scope: {
      intents:    ['READ_RECORDS', 'SUBMIT_RECORD'],
      categories: ['BSP-LA', 'BSP-HM'],    // Lab analytics + Hematology
      levels:     ['CORE', 'STANDARD'],
      period: {
        from: '2025-01-01',
        to:   null,                          // null = no upper bound
      },
    },
    expiresInDays: 90,    // Token expires in 90 days; null = permanent
  })

  console.log('ConsentToken granted:', token.tokenId)
  console.log('Expires at:', token.expiresAt)

  fs.writeFileSync('.consent-token.json', JSON.stringify({ tokenId: token.tokenId }))

  return token
}

grantConsent().catch(console.error)
```

The token is minted on-chain. Once issued, the IEO can use it immediately. The user can revoke it at any moment (Step 6).

---

## Step 4 — Submit a BioRecord

The lab submits a biological measurement to Alice's BEO. It must present the ConsentToken with every request.

```typescript
// submit-record.ts
import { BioRecordBuilder, ExchangeClient } from '@bsp/sdk'
import * as fs from 'fs'

async function submitRecord() {
  const ieoCredentials  = JSON.parse(fs.readFileSync('.ieo-key.json', 'utf-8'))
  const beoCredentials  = JSON.parse(fs.readFileSync('.beo-key.json', 'utf-8'))
  const { tokenId }     = JSON.parse(fs.readFileSync('.consent-token.json', 'utf-8'))

  const exchange = new ExchangeClient({
    network:    process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
    ieoId:      ieoCredentials.ieoId,
    privateKey: ieoCredentials.privateKey,   // Signs every request
  })

  const record = new BioRecordBuilder()
    .beoId(beoCredentials.beoId)
    .biomarker('BSP-HM-001')                 // Hemoglobin — see biomarker-codes.md
    .value(13.8)
    .unit('g/dL')
    .collectedAt('2026-03-24T08:00:00Z')
    .refRange({
      optimal:    '13.5-17.5',
      functional: '12.0-17.5',
      deficiency: '<12.0',
      toxicity:   null,
    })
    .build()

  const result = await exchange.submit({
    record,
    consentTokenId: tokenId,
  })

  console.log('Record submitted.')
  console.log('Record IDs:',  result.submission.recordIds)
  console.log('Arweave TXs:', result.submission.arweaveTxs)
  console.log('Stored at:',   result.submission.storedAt)

  // You can batch-submit multiple records in a single call:
  // const result = await exchange.submit({ records: [record1, record2], consentTokenId: tokenId })
}

submitRecord().catch(console.error)
```

BioRecords are **immutable** once written to Arweave. Corrections are submitted as new records that supersede the previous one.

---

## Step 5 — Read Records

Query Alice's BEO for records. The lab presents the same ConsentToken.

```typescript
// read-records.ts
import { ExchangeClient } from '@bsp/sdk'
import * as fs from 'fs'

async function readRecords() {
  const ieoCredentials = JSON.parse(fs.readFileSync('.ieo-key.json', 'utf-8'))
  const beoCredentials = JSON.parse(fs.readFileSync('.beo-key.json', 'utf-8'))
  const { tokenId }    = JSON.parse(fs.readFileSync('.consent-token.json', 'utf-8'))

  const exchange = new ExchangeClient({
    network:    process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
    ieoId:      ieoCredentials.ieoId,
    privateKey: ieoCredentials.privateKey,
  })

  const response = await exchange.query({
    beoId:          beoCredentials.beoId,
    consentTokenId: tokenId,
    intent:         'READ_RECORDS',
    filters: {
      categories: ['BSP-HM'],
      period: {
        from: '2026-01-01',
        to:   null,
      },
      limit:  50,
      offset: 0,
    },
  })

  console.log(`Found ${response.totalCount} records (hasMore: ${response.hasMore})`)

  for (const record of response.records) {
    console.log(`[${record.biomarker}] ${record.value} ${record.unit} — collected ${record.collectedAt}`)
  }
}

readRecords().catch(console.error)
```

Results are paginated. Use `offset` to page through large sets.

---

## Step 6 — Revoke Consent

Alice revokes the lab's access. The revocation is instant and on-chain.

```typescript
// revoke-consent.ts
import { BEOClient } from '@bsp/sdk'
import * as fs from 'fs'

async function revokeConsent() {
  const beoCredentials = JSON.parse(fs.readFileSync('.beo-key.json', 'utf-8'))
  const { tokenId }    = JSON.parse(fs.readFileSync('.consent-token.json', 'utf-8'))

  const client = new BEOClient({
    network:    process.env.BSP_NETWORK as 'testnet' | 'mainnet',
    relayerUrl: process.env.BSP_RELAYER_URL,
    privateKey: beoCredentials.privateKey,
    beoId:      beoCredentials.beoId,
  })

  const result = await client.revokeToken(tokenId)

  console.log('Status:',     result.status)      // REVOKED
  console.log('Revoked at:', result.revokedAt)
  console.log('Arweave TX:', result.arweaveTx)

  // All subsequent requests from the IEO using this token are rejected immediately.
  // The IEO receives TOKEN_REVOKED on their next request.
}

revokeConsent().catch(console.error)
```

Once revoked, the token cannot be reinstated. If the user wants to grant access again, they issue a new ConsentToken from scratch.

---

## Error Handling

All SDK methods throw typed `BSPError` instances. Catch them and branch on `error.code`.

```typescript
import { ExchangeClient, BSPError } from '@bsp/sdk'

const exchange = new ExchangeClient({ /* ... */ })

try {
  const result = await exchange.submit({ record, consentTokenId: tokenId })
  console.log('Submitted:', result.submission.recordIds)

} catch (err) {
  if (err instanceof BSPError) {
    switch (err.code) {
      case 'TOKEN_REVOKED':
        // The BEO holder revoked access — do not retry, request a new token
        console.error('Consent was revoked. Ask the user to reissue.')
        break

      case 'TOKEN_EXPIRED':
        // Token's expiresAt has passed — not retryable, user must renew
        console.error('Token expired. User must grant a new ConsentToken.')
        break

      case 'TOKEN_NOT_FOUND':
        // Token ID does not exist on-chain
        console.error('Invalid token ID. Verify it was correctly saved.')
        break

      case 'IEO_SIGNATURE_INVALID':
        // Request signature verification failed — check your private key config
        console.error('Signature mismatch. Verify BSP_IEO_PRIVATE_KEY in .env.')
        break

      case 'DOMAIN_TAKEN':
        // The requested .bsp domain is already registered
        console.error('Domain already registered. Choose a different .bsp name.')
        break

      case 'BIOMARKER_CODE_INVALID':
        // The biomarker code does not exist in the BSP taxonomy
        console.error(`Unknown biomarker: ${err.field}. Check reference/biomarker-codes.md`)
        break

      case 'ARWEAVE_WRITE_FAILED':
        // Temporary infrastructure error — safe to retry
        console.error('Arweave write failed — retrying in 5s')
        await new Promise(r => setTimeout(r, 5000))
        // re-submit ...
        break

      default:
        console.error(`BSP error [${err.code}]: ${err.message}`)
    }
  } else {
    throw err   // Re-throw non-BSP errors
  }
}
```

### Common Errors Reference

| Code | When it Happens | Action |
|------|----------------|--------|
| `TOKEN_REVOKED` | User explicitly revoked the token | Do not retry. Request a new ConsentToken. |
| `TOKEN_EXPIRED` | Token's `expiresInDays` elapsed | Do not retry. User must reissue. |
| `TOKEN_NOT_FOUND` | Token ID doesn't exist on-chain | Verify the `tokenId` was saved correctly. |
| `INTENT_NOT_AUTHORIZED` | Requested intent not in token scope | Request a new token with the correct intent. |
| `CATEGORY_NOT_AUTHORIZED` | Requested BSP category not in scope | Request a new token with the correct category. |
| `IEO_SIGNATURE_INVALID` | IEO private key mismatch | Check `privateKey` in IEO credentials. |
| `DOMAIN_TAKEN` | `.bsp` domain already registered | Pick a different domain. |
| `BIOMARKER_CODE_INVALID` | BSP code doesn't exist in taxonomy | Check [Biomarker Codes](../reference/biomarker-codes.md). |
| `ARWEAVE_WRITE_FAILED` | Temporary Arweave failure | Retryable — back off and retry. |
| `BEO_LOCKED` | BEO holder locked their identity | No operations permitted until unlocked by holder. |

---

## Next Steps

You have run the full BSP cycle. From here:

- **ConsentToken deep-dive** → [consent-token-flow.md](./consent-token-flow.md) — lifecycle, verification, security model
- **BEO specification** → [reference/beo.md](../reference/beo.md) — schema, lifecycle states, Social Recovery
- **IEO types and permissions** → [reference/ieo.md](../reference/ieo.md) — LAB, HOSP, PHY, WEAR, INS, PLT
- **Exchange Protocol** → [reference/exchange-protocol.md](../reference/exchange-protocol.md) — full request/response schemas
- **Biomarker Codes** → [reference/biomarker-codes.md](../reference/biomarker-codes.md) — BSP taxonomy reference
- **Certification** → [guides/certification.md](./certification.md) — how to get BSP-1/BSP-2/BSP-3 certified
- **User onboarding** → [guides/user-onboarding.md](./user-onboarding.md) — how end users create and manage their BEO
