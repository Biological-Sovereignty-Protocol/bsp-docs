# Protocol Architecture

BSP is an open standard that defines how biological data is structured, stored, exchanged, and governed. It operates in three layers.

## The Three Layers

| Layer | What It Defines |
| --- | --- |
| **Layer 1 — Identity** | Who holds the data. Every individual and every institution in the BSP ecosystem has a permanent, decentralized identity: the Biological Entity Object (BEO) or Institutional Entity Object (IEO). |
| **Layer 2 — Data** | What the data contains. Every biological measurement is structured as a BioRecord — a standardized, immutable unit of biological information anchored to a specific BEO and classified under the BSP taxonomy. |
| **Layer 3 — Exchange** | How data moves. The BSP Exchange Protocol defines the format of requests and responses between systems — how any system sends data to a BEO, how a platform requests access, how an AI engine queries a complete biological history. |

<Architecture3Layer />

## The Biological Entity Object (BEO)

The BEO is the sovereign biological identity of every individual in the BSP ecosystem. It is the center of gravity of the entire protocol.

A BEO is not an account on a platform. It is a permanent identity, stored on the Arweave blockchain, controlled exclusively by the individual through a private key. Every BEO is identified by a human-readable `.bsp` domain — a permanent biological address (e.g., `andre.bsp`).

## The BioRecord

Every biological measurement — a blood test result, a genomic marker, a wearable reading, an imaging report — is represented as a BioRecord. 

Any system can attempt to submit a BioRecord to a BEO. What governs access is the consent of the BEO holder, encoded in the `AccessControl` smart contract on Arweave. BioRecords are immutable once written.

## Decentralized Infrastructure

BSP records are stored on Arweave — a permanent, decentralized storage protocol designed to preserve data for 200+ years. 

Smart contracts managing BEO identities, `.bsp` domain registrations, and access permissions are deployed via SmartWeave on Arweave — ensuring that the rules of the protocol cannot be changed by any single actor.

## The Sovereignty Model

The technical architecture of BSP is designed to make individual sovereignty the default:
*   **Permanent ownership**: The individual owns their BEO and all BioRecords within it for life.
*   **Granular consent**: Every third-party access request requires explicit BEO-holder consent.
*   **Open submission**: Any system can submit BioRecords to a BEO — subject to the holder's consent.
*   **Portability**: Any data in a BEO can be exported in BSP-standard format at any time.
*   **Immutability**: BioRecords cannot be altered or deleted once written.
*   **Cryptographic control**: Access is controlled by private keys held by the individual.
