---
title: "API Reference"
description: "Complete REST API reference for the BSP Registry API — 36 routes for BEO, IEO, consent, exchange, and query operations."
---

# Registry API Reference

Base URL: `https://api.biologicalsovereigntyprotocol.com`

The Registry API is a gasless relayer. It verifies Ed25519 signatures and relays transactions to Arweave, paying the gas on behalf of users. It cannot forge or modify user actions.

All write operations require a signed payload with `nonce` (16+ chars) and `timestamp` (ISO8601, max 5 min old).

---

## BEO Operations

All routes under `POST /api/relayer/beo/...`

| Route | Description | Auth |
|-------|-------------|------|
| `POST /api/relayer/beo` | Create a new BEO | Ed25519 sig |
| `POST /api/relayer/beo/lock` | Emergency lock | Ed25519 sig |
| `POST /api/relayer/beo/unlock` | Unlock | Ed25519 sig |
| `POST /api/relayer/beo/destroy` | Permanent erasure (LGPD/GDPR) | Ed25519 sig |
| `POST /api/relayer/beo/rotate-key` | Rotate Ed25519 key | Ed25519 sig |
| `POST /api/relayer/beo/recovery` | Update recovery config | Ed25519 sig |
| `POST /api/relayer/beo/request-recovery` | Initiate Social Recovery | Public |
| `POST /api/relayer/consent` | Grant ConsentToken | Ed25519 sig |

### Payload format (example: createBEO)

```json
{
  "domain": "andre.bsp",
  "publicKey": "ed25519-hex-64-chars",
  "recovery": null,
  "signature": "base64-ed25519-detached-signature",
  "nonce": "random-16-chars-min",
  "timestamp": "2026-04-07T20:00:00.000Z"
}
```

The `signature` is computed over: `JSON.stringify(sortedKeys({ function: "createBEO", domain, publicKey, recovery, nonce, timestamp }))`.

---

## IEO Operations

All routes under `POST /api/ieo/...`

| Route | Description | Auth |
|-------|-------------|------|
| `POST /api/ieo` | Create a new IEO | Ed25519 sig |
| `POST /api/ieo/lock` | Emergency lock | Ed25519 sig |
| `POST /api/ieo/unlock` | Unlock | Ed25519 sig |
| `POST /api/ieo/destroy` | Permanent erasure | Ed25519 sig |
| `POST /api/ieo/rotate-key` | Rotate Ed25519 key | Ed25519 sig |
| `POST /api/ieo/contacts` | Update API endpoint / webhook | Ed25519 sig |
| `POST /api/ieo/recovery` | Update recovery config | Ed25519 sig |

---

## Query Operations (Read-only)

No authentication required — reads public Arweave state.

| Route | Description |
|-------|-------------|
| `GET /api/beos/:beoId` | Get BEO by UUID |
| `GET /api/beos/domain/:domain` | Resolve BEO by .bsp domain |
| `GET /api/ieos` | List IEOs (filters: status, ieoType, certLevel) |
| `GET /api/ieos/:ieoId` | Get IEO by UUID |
| `GET /api/ieos/domain/:domain` | Resolve IEO by .bsp domain |
| `GET /api/ieos/:ieoId/certification` | Verify IEO certification |
| `GET /api/consent/:tokenId` | Verify ConsentToken |
| `GET /api/consent/history/:beo_domain` | Full token history |

---

## Consent Revocation

| Route | Description | Auth |
|-------|-------------|------|
| `DELETE /api/consent/:tokenId` | Revoke one token | Ed25519 sig |
| `DELETE /api/consent/all` | Revoke ALL tokens (emergency) | Ed25519 sig |
| `DELETE /api/consent/ieo/:ieo_domain` | Revoke all from one IEO | Ed25519 sig |
| `DELETE /api/consent/intent/:intent` | Revoke all by intent | Ed25519 sig |

---

## Exchange Operations

| Route | Description | Auth |
|-------|-------------|------|
| `POST /api/exchange/records` | Submit BioRecords | ConsentToken + Ed25519 |
| `GET /api/exchange/records` | Read BioRecords | ConsentToken + Ed25519 |
| `POST /api/exchange/export` | Sovereign data export (JSON/CSV/FHIR_R4) | ConsentToken + Ed25519 |

---

## Rate Limits

| Route Group | Limit |
|-------------|-------|
| BEO/IEO relayer | 10 req/min |
| Query reads | 60 req/min per IP |
| Consent writes | 15 req/min per IP |
| Exchange submit | 10 req/min per IP |
| Exchange read | 30 req/min per IP |
| Sovereign export | 5 req/min per IP |
| Guardian invite | 5 req/min |

---

## Health Check

```
GET /health
→ { "status": "ok", "service": "bsp-registry-api", "version": "1.0.0" }
```

---

→ [CLI Reference](./cli) · [SDK Reference](./sdk-reference) · [MCP Server](./mcp)
