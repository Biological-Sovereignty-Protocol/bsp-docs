---
title: "MCP Server"
description: "Official BSP MCP Server — connect Claude, ChatGPT, and any MCP-compatible AI to biological data with consent enforcement."
---

# BSP MCP Server

Connect any MCP-compatible AI (Claude, GPT, etc.) to BSP biological data with active consent enforcement.

## Setup

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bsp": {
      "command": "npx",
      "args": ["-y", "@bsp/mcp"],
      "env": {
        "BSP_BEO_DOMAIN": "yourname.bsp",
        "BSP_CONSENT_TOKEN_ID": "tok_...",
        "BSP_NETWORK": "mainnet"
      }
    }
  }
}
```

Then ask Claude: *"What do my blood test results say about my cardiovascular health?"*

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BSP_BEO_DOMAIN` | Yes | Your .bsp domain |
| `BSP_CONSENT_TOKEN_ID` | For data access | ConsentToken with READ_RECORDS intent |
| `BSP_NETWORK` | No | mainnet (default), testnet, local |
| `BSP_PRIVATE_KEY` | For write ops | Ed25519 private key (hex) |
| `BSP_REGISTRY_URL` | No | Custom registry API URL |

---

## Tools — Read (no private key needed)

### `bsp_list_categories`
List all 25 BSP taxonomy categories. Public data.

### `bsp_resolve_biomarker`
Look up a BSP biomarker code (e.g., `BSP-GL-001`). Public data.

### `bsp_check_consent`
Check current consent configuration — BEO, token, network.

### `bsp_get_biorecords`
Read BioRecords from the user's BEO. Requires ConsentToken with `READ_RECORDS` intent.

| Parameter | Type | Description |
|-----------|------|-------------|
| `categories` | string[] | Filter by BSP categories |
| `biomarkers` | string[] | Filter by biomarker codes |
| `from` / `to` | ISO8601 | Date range |
| `limit` | number | Max records (default 50) |

### `bsp_get_beo_summary`
Structured overview of the user's biological profile. Requires consent.

---

## Tools — Write (requires BSP_PRIVATE_KEY)

### `bsp_lock_beo`
Emergency lock — freezes the BEO immediately.

| Parameter | Type | Required |
|-----------|------|----------|
| `beoId` | string | Yes |

### `bsp_unlock_beo`
Unlock a previously locked BEO.

### `bsp_destroy_beo`
**IRREVERSIBLE** — Permanent erasure (LGPD/GDPR). Requires `confirm: true`.

| Parameter | Type | Required |
|-----------|------|----------|
| `beoId` | string | Yes |
| `confirm` | boolean | Yes (must be true) |

### `bsp_revoke_all_tokens`
Emergency revoke ALL active ConsentTokens for a BEO.

---

## Security

- Read tools require a valid ConsentToken (configured via env)
- Write tools require the BEO holder's private key
- The MCP server signs payloads locally — keys never leave the process
- Consent is verified on-chain by the AccessControl smart contract

---

→ [CLI Reference](./cli) · [SDK Reference](./sdk-reference) · [API Reference](./api-reference)
