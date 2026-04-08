---
title: "CLI Reference"
description: "Complete reference for the BSP command-line interface — manage biological identities, consent, and health data from the terminal."
---

# CLI Reference

Install globally or run via npx:

```bash
npm install -g bspctl
# or
npx bspctl --help
```

## Configuration

Config is stored at `~/.bsp/config.json`.

```bash
bsp config set network testnet
bsp config set registry https://api.biologicalsovereigntyprotocol.com
bsp config set private-key <hex>
bsp config show
```

| Key | Default | Description |
|-----|---------|-------------|
| `registry` | `https://api.biologicalsovereigntyprotocol.com` | Registry API URL |
| `network` | `testnet` | mainnet, testnet, local |
| `private-key` | — | Ed25519 private key (hex) |
| `ieo-domain` | — | IEO domain (for institutional commands) |

---

## BEO Commands

### `bsp create <domain>`
Create a new Biological Entity Object. Generates Ed25519 keypair locally.

```bash
bsp create andre.bsp
# Returns: BEO ID, private key, seed phrase
# ⚠️ Store private key and seed securely — shown once
```

### `bsp resolve <domain>`
Look up a BEO by its .bsp domain.

```bash
bsp resolve andre.bsp
```

### `bsp lock <beoId>`
Emergency lock — freezes the BEO. No operations permitted while locked.

### `bsp unlock <beoId>`
Unlock a previously locked BEO.

### `bsp rotate-key <beoId>`
Generate a new Ed25519 keypair and rotate the BEO's key on-chain.

### `bsp destroy <beoId> --confirm`
**IRREVERSIBLE** — Permanently destroy the BEO. LGPD Art. 18 / GDPR Art. 17.

Nullifies public key, revokes all ConsentTokens, releases domain, wipes recovery config.

---

## Consent Commands

### `bsp consent grant <beoId> <ieoId>`
Issue a ConsentToken to an institution.

```bash
bsp consent grant <beoId> <ieoId> \
  --intents SUBMIT_RECORD,READ_RECORDS \
  --categories BSP-LA,BSP-CV \
  --days 365
```

| Flag | Required | Description |
|------|----------|-------------|
| `--intents` | Yes | Comma-separated intents |
| `--categories` | No | Comma-separated BSP categories |
| `--days` | No | Expiration in days (default: permanent) |

### `bsp consent revoke <tokenId> <beoId>`
Revoke a single ConsentToken.

### `bsp consent revoke-all <beoId> --confirm`
Emergency — revoke ALL active tokens for a BEO.

### `bsp consent verify <tokenId>`
Check if a ConsentToken is valid.

### `bsp consent list <domain>`
List all consent tokens for a BEO domain.

---

## IEO Commands

### `bsp ieo create <domain>`
Register a new Institutional Entity Object.

```bash
bsp ieo create fleury.bsp --type LAB --name "Fleury Laboratórios"
```

| Flag | Required | Description |
|------|----------|-------------|
| `--type` | Yes | LAB, HOSPITAL, WEARABLE, PHYSICIAN, INSURER, RESEARCH, PLATFORM |
| `--name` | Yes | Display name |

### `bsp ieo get <ieoId>`
Get IEO details by ID.

### `bsp ieo list`
List IEOs with optional filters.

```bash
bsp ieo list --type LAB --status ACTIVE --cert ADVANCED
```

### `bsp ieo lock <ieoId>`
Emergency lock an IEO.

### `bsp ieo unlock <ieoId>`
Unlock a locked IEO.

### `bsp ieo destroy <ieoId> --confirm`
**IRREVERSIBLE** — Permanently destroy an IEO.

---

## Exchange Commands

### `bsp records submit <beoId>`
Submit BioRecords to a BEO.

```bash
bsp records submit <beoId> --token <tokenId> --file records.json
```

### `bsp records read <beoId>`
Read BioRecords from a BEO.

```bash
bsp records read <beoId> --token <tokenId> --categories BSP-LA,BSP-CV --json
```

### `bsp export <beoId>`
Export all biological data (sovereign portability — GDPR Art. 20).

```bash
bsp export <beoId> --token <tokenId> --format FHIR_R4 > health-data.json
```

Formats: `JSON`, `CSV`, `FHIR_R4`

---

## Security

- Private keys never leave your machine
- All signing happens locally via `bsp-sdk`
- The registry API only receives signed payloads
- Destructive operations require `--confirm`

---

→ [GitHub](https://github.com/Biological-Sovereignty-Protocol/bsp-cli) · [SDK Reference](./sdk-reference) · [MCP Server](./mcp)
