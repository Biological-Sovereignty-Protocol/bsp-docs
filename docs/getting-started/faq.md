# FAQ

Frequently asked questions about the Biological Sovereignty Protocol.

---

## Fundamentals

### What is the Biological Sovereignty Protocol (BSP)?
BSP is an open standard — like HTTP or SMTP — that defines a universal language for exchanging human health and longevity data. It ensures that biological data (blood tests, wearable readings, genomic data) permanently belongs to the individual, not to hospitals, laboratories, or technology platforms.

### Who owns the BSP?
Nobody. BSP is an open protocol. The **Ambrósio Institute** acts as Guardian of the standard — maintaining the specification and leading the open governance process (BSP Improvement Proposals — BIPs) — but does not own the protocol or any data within it.

### What is the difference between BSP and AVA?
- **BSP (the protocol)**: The open language. Defines how data is structured, exchanged, and secured.
- **AVA (the intelligence)**: The Ambrósio Vitality Algorithm. A proprietary intelligence engine built by the Ambrósio Institute that reads BSP data to generate longevity insights and the Ambrósio Vitality Score (SVA).

---

## Biological Identity & Sovereignty

### What is a BEO (Biological Entity Object)?
A BEO is your sovereign, permanent biological identity. It is a cryptographic object anchored on the Arweave decentralized blockchain. All your standardized health data (BioRecords) are attached to your BEO.

### Do I need permission to create a BEO?
No. Anyone can create a BEO using the open BSP SDK or any BSP-compatible app. It is completely free and requires no approval from the Ambrósio Institute or any government authority.

### Where is my data stored?
Your BEO and BioRecords are stored permanently on **Arweave** — a decentralized storage network designed to preserve data for hundreds of years. This ensures your biological history cannot be deleted or lost if a company goes bankrupt.

### Who can see my data?
Only you, and the institutions you explicitly authorize. All BioRecords are encrypted with your public key before being stored. They can only be decrypted using the private key that resides exclusively on your personal device. The Ambrósio Institute itself cannot access your data without your consent.

---

## Security & Consent

### How is my data secured?
Control of your BEO is determined by a **private key (Ed25519)** stored securely in your device's hardware enclave (e.g., Apple Secure Enclave). Access control rules (ConsentTokens) execute as AO processes on Arweave, making them mathematically immune to unauthorized access.

### What happens if I lose my phone or private key?
If you lose your device, you have two ways to recover your BEO:
1. **Seed Phrase**: The 24-word backup phrase you received during creation.
2. **Social Recovery**: If you enabled Social Recovery, you can ask your 3 designated Guardians (trusted friends, physicians, or platforms) to approve the recovery. Requires 2-of-3 consensus to safely restore access.

### Can I revoke an institution's access?
Yes — you have absolute control. With a single tap in a BSP-compatible app, you can instantly revoke a **ConsentToken**. The smart contract immediately rejects any further read/write attempts from that institution.

---

## Ecosystem & Certification

### Do laboratories need to pay to use BSP?
No. Reading the specification, installing the `bsp-sdk`, and submitting BioRecords (with patient consent) is completely free and open.

### What is BSP Certification?
While the protocol is open to any laboratory, **BSP Certification (BSP-1 to BSP-4)** is a voluntary quality mark issued by the Ambrósio Institute. Certified institutions undergo technical audits, receive a verifiable on-chain badge, and their data is considered trustworthy enough to feed directly into the AVA intelligence engine.

---

## Development & Contributions

### I'm a developer. Where do I start?
Go to the [Developer Quickstart](../quickstart/README.md) to install the TypeScript or Python SDK (`bsp-sdk` or `bsp-sdk`). You can start submitting standardized BioRecords to your own BEO in minutes.

### How are new biomarkers added to the protocol?
The BSP biomarker taxonomy is improved through the **BIP (BSP Improvement Proposal)** process. Any researcher or physician worldwide can propose the addition of a new biological marker by submitting a formal BIP in our public GitHub repository. Proposals are reviewed quarterly by the Ambrósio Institute Scientific Council.

### Can I build my own app on top of BSP?
Yes. The protocol is fully open (CC BY 4.0). You can build any application, platform, or tool that reads or writes BSP data, as long as you respect user consent (ConsentTokens) and the exchange protocol schema.

---

## See Also

- [Developer Quickstart →](../quickstart/README.md)
- [BEO Specification →](../reference/beo.md)
- [Certification Guide →](./certification.md)
- [Glossary →](../reference/glossary.md)
