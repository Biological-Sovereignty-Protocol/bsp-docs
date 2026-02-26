# Ecosystem Directory

The Biological Sovereignty Protocol connects individuals to an open network of health institutions, hardware manufacturers, and intelligence platforms. 

This directory lists prominent **Institutional Entity Objects (IEOs)** implementing the standard. 

> [!NOTE]
> Any institution can interact with the BSP without permission. The **BSP-Certified** badge (`✓`) indicates institutions that have voluntarily registered with the Ambrósio Institute for cryptographically verifiable identity checks.

## Laboratories & Diagnostics (`BSP-LA`, `BSP-HM`)
Laboratories submit high-fidelity, standardized BioRecords directly into patient BEOs.

| Name | IEO Domain | Type | Status |
|------|------------|------|--------|
| Fleury | `fleury.bsp` | National Diagnostic | Certified ✓ |
| Dasa | `dasa.bsp` | National Diagnostic | Integration |
| DB Molecular | `db.bsp` | Specialized Lab | Certified ✓ |

## Wearables & Hardware (`BSP-DV`)
Hardware manufacturers syncing continuous physiological data securely to the protocol.

| Name | IEO Domain | Type | Status |
|------|------------|------|--------|
| Oura | `oura.bsp` | Sleep/Recovery Ring | Certified ✓ |
| WHOOP | `whoop.bsp` | Strain/Sleep Strap | Integration |
| Apple Health | `apple.bsp` | Aggregator OS | Integration |

## Intelligence & Platforms
Platforms that process, synthesize, and provide insight onto biological data.

| Name | IEO Domain | Type | Status |
|------|------------|------|--------|
| Ambrósio Institute | `ambrosio.bsp` | SVA / AVA Core | Foundation ✓ |
| InsideTracker | `insidetracker.bsp` | Biomarker Platform | Exploring |

---

### Verifying a Certification
A true BSP certification is verifiable on-chain via the `IEORegistry` smart contract.

```typescript
const registry = new IEORegistry("mainnet");
const status = await registry.verify("fleury.bsp");

console.log(status.isCertified) // true
console.log(status.certifiedSince) // 2026-03-01
```
