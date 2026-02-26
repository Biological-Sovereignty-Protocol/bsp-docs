# Canonical Glossary

This document is the canonical reference for all technical terms, objects, types, contracts, repositories, and concepts of the Biological Sovereignty Protocol.

## Section 1: Core Protocol Objects

*   **BEO — Biological Entity Object**
    The sovereign biological identity of a human being within the BSP ecosystem. It is a permanent object stored on Arweave, identified by a `.bsp` domain (e.g., `andre.bsp`), and controlled exclusively by the owner through a private key.
*   **BEORegistry**
    Smart contract on Arweave responsible for creating and indexing BEOs. Stores the public address, public key hash, and basic metadata.
*   **BioRecord**
    The atomic unit of biological data. Each biological measurement is represented as an immutable BioRecord, containing the BSP biomarker code, the value/unit, reference range, the submitting institution signature, and a timestamp.
*   **BIP — BSP Improvement Proposal**
    Formal mechanism for protocol evolution. Anyone can submit a BIP proposing additions to the biomarker taxonomy or protocol specification.
*   **.bsp Domain**
    Permanent, human-readable biological address (e.g., `andre.bsp` or `fleury.bsp`). Registered in the DomainRegistry smart contract.
*   **IEO — Institutional Entity Object**
    The institutional identity of any organization, system, or professional interacting with biological data.
*   **IEORegistry**
    Smart contract that manages BSP-Certified IEOs.
*   **ConsentToken**
    Cryptographic authorization that allows an institution to interact with user data. Emitted by the AccessControl contract, specifying actions, categories, and expiration.

## Section 2: Smart Contracts & Blockchain

*   **AccessControl**
    The most critical protocol contract. Manages all consent access between BEOs and IEOs.
*   **Arweave**
    Permanent storage blockchain where all BSP ecosystem data is recorded.
*   **DomainRegistry**
    Smart contract controlling the `.bsp` namespace, ensuring global uniqueness.
*   **Governance**
    Smart contract controlling modifications to other BSP contracts through a multi-signature model.
*   **SmartWeave**
    Smart contract framework running on top of Arweave.

## Section 3: Proprietary Intelligence — AVA & SVA

*   **AVA — Ambrósio Vitality Algorithm**
    The proprietary biological aging algorithm developed by the Ambrósio Institute. It processes data only when the user explicitly initiates an analysis. It is an implementation built on top of the open protocol.
*   **SVA — Ambrósio Vitality Score**
    The multi-dimensional biological age score produced by AVA when processing a set of BSP BioRecords.

## Section 4: Protocol & Taxonomy Concepts

*   **BSP — Biological Sovereignty Protocol**
    The open standard defining the universal language for biological data exchange.
*   **BSP-Certification**
    Voluntary trust mark granted to institutions meeting technical and compliance requirements.
*   **BSPIntent**
    Enumerated type defining the action a system requests in the Exchange Protocol (e.g., `SUBMIT_RECORD`, `READ_RECORDS`).
*   **CertLevel**
    Enumerated type representing BSP certification levels: `UNCERTIFIED`, `BASIC`, `ADVANCED`, `FULL`, `RESEARCH`, `DEVICE`.
*   **Private Key**
    Cryptographic key granting sovereign control over a BEO or IEO.
*   **Public Key**
    The public identifier address of a BEO or IEO.
*   **Exchange Protocol**
    The layer defining how data moves between systems.
*   **Social Recovery**
    Mechanism to recover a private key without a central server by designating 3 trusted guardians. 2 out of 3 confirmations are required to recover access. 

## Section 5: Repositories & SDKs

*   **bsp-spec**: Canonical protocol specification.
*   **bsp-sdk-typescript / bsp-sdk-python**: Official SDKs.
*   **bsp-mcp**: Official MCP Server for AI Agents.
*   **ava-core / sva-engine**: Private proprietary repositories for Ambrósio Intelligence.
