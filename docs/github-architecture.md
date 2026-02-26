# GitHub Architecture

BSP's GitHub infrastructure is split into two distinct organizations — one public, one private. This separation reflects the core philosophy: **the protocol belongs to the world, the intelligence belongs to Ambrósio.**

## Public Organization: `biological-sovereignty-protocol`
These repositories define the open standard. Anyone can clone, contribute, and build upon them without approval. Licensed under Creative Commons CC BY 4.0.

*   `bsp-spec`: The central specification repository (BEO, IEO, Exchange, Taxonomy, BIPs). The "public law" of the protocol.
*   `bsp-sdk-typescript`: The official TypeScript SDK (`@bsp/sdk`) for web, mobile, and backend integrations.
*   `bsp-sdk-python`: The official Python SDK (`bsp-sdk`) for laboratories, bioinformaticians, and research pipelines.
*   `bsp-mcp`: The official Model Context Protocol server. Connects AI agents (Claude, GPT) to the BSP protocol with active user consent.
*   `bsp-docs`: The public documentation website engine (what you form part of right now).

## Private Organization: `ambrosio-institute`
These repositories contain the Institute's operational infrastructure and proprietary intelligence. They are private to protect the organization's core competitive advantage.

*   `bsp-registry`: The 5 smart contracts deployed on Arweave (`BEORegistry`, `IEORegistry`, `DomainRegistry`, `AccessControl`, `Governance`). Publicly queryable on-chain, but the deployment code is maintained here.
*   `bsp-registry-api`: The Institute's API for managing the human process of voluntary BSP Certification. *Biological data never passes through this API.*
*   `ava-core`: The Ambrósio Vitality Algorithm. Proprietary models that analyze biological aging, processing BioRecords only when a user actively initiates a session.
*   `sva-engine`: The scoring engine that converts AVA's analysis into the multi-dimensional Ambrósio Vitality Score (SVA) presented to the user.

## Build Sequence
Dependencies dictate the build order of the ecosystem:

1.  `bsp-spec` (Foundation)
2.  `bsp-registry` (Smart Contracts on Arweave)
3.  `bsp-registry-api` (Certification Portal)
4.  `bsp-sdk-typescript` (Core Web Integrations)
5.  `bsp-mcp` (AI Agent Connectivity)
6.  `bsp-sdk-python` (Lab & Research Pipelines)
7.  `ava-core` & `sva-engine` (Intelligence scoring built entirely on top of SDK primitives)
8.  `bsp-docs` (Evolving constantly alongside the ecosystem)
