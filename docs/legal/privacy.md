---
title: Privacy Policy
description: Privacy Policy for the Biological Sovereignty Protocol website and services.
---

# Privacy Policy

**Last updated:** March 2026
**Published by:** Ambrósio Institute

---

## Overview

The Biological Sovereignty Protocol (BSP) is an open standard. This Privacy Policy applies to the BSP website (`biologicalsovereigntyprotocol.com`) and its documentation.

BSP does not operate a centralized data platform. Biological data submitted through the protocol is stored directly on the Arweave network — not on servers controlled by the Ambrósio Institute.

---

## Information We Collect

**Website analytics:** We may collect anonymized usage data (page views, geographic region, browser type) to improve the documentation. No personally identifiable information is collected.

**Contact:** If you contact us via GitHub Issues or email, we retain that correspondence to respond and improve the protocol.

---

## What We Do Not Do

- We do not sell, share, or monetize any user data.
- We do not track individuals across websites.
- We do not collect health or biological data through this website.

---

## Arweave & On-Chain Data

Data stored on the Arweave network via BSP smart contracts is persistent by design to ensure long-term data integrity. All BioRecords are encrypted with the BEO holder's Ed25519 public key. Only the holder's private key can decrypt the data. The existence of transactions on-chain is publicly visible, but the content is cryptographically unreadable without the holder's key.

Before submitting any data through a BSP-compatible application, ensure you understand how the Arweave network operates and how BSP's cryptographic controls protect your data.

---

## Right to Erasure (Cryptographic Erasure)

BSP implements **Sovereign Cryptographic Erasure** to comply with GDPR Article 17 (Right to Erasure) and LGPD Article 18 (Right to Deletion).

**How it works:**
- All BioRecords are encrypted with the holder's public key before being stored on Arweave
- If the holder destroys their private key, all associated data becomes **permanently inaccessible and functionally erased**
- No institution, platform, or the Ambrósio Institute can recover the data without the key
- This provides a stronger guarantee than traditional deletion, where copies may persist in backups, logs, or third-party systems

**Your rights as a data subject:**
1. **Key Destruction** — permanently destroy your private key, making all your data irrecoverable
2. **Key Rotation** — generate a new key pair, re-encrypt your data, invalidate the old key
3. **Consent Revocation** — revoke all access tokens immediately
4. **Selective Erasure** — revoke specific consent tokens granted to specific institutions

To exercise any of these rights, use the key management features in your BSP-compatible application or contact us for guidance.

---

## Data Retention and Immutability

BioRecords on Arweave are immutable to preserve data integrity and create a trustworthy audit trail. This immutability protects you — it means no institution can silently alter your biological records.

However, immutability does not mean you lose control. Through cryptographic erasure, you can make your data permanently unreadable at any time. The encrypted data may persist on the network, but without your key it is indistinguishable from random noise and cannot be associated with or used to identify you.

---

## Key Holder Controls

As a BEO holder, you have full sovereignty over your biological data:

- **View** all institutions that have been granted access to your data
- **Revoke** any consent token at any time, immediately cutting off access
- **Export** your data in BSP-standard format
- **Erase** your data by destroying your private key (irreversible)
- **Rotate** your key pair to re-secure your data with new cryptographic credentials

---

## Third-Party Services

This website may use the following third-party services:

- **Coolify (self-hosted)** — hosting
- **GitHub** — source code and issue tracking

Each service has its own privacy policy.

---

## Contact

Questions about this policy:
[github.com/Biological-Sovereignty-Protocol](https://github.com/Biological-Sovereignty-Protocol)
