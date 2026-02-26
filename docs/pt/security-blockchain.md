# Keys, Blockchain & Access

"How users, laboratories, and systems connect to the ecosystem decentralized — without a central server, without an intermediary, without prior permission."

## Part 1: The Foundation — Cryptographic Keys

BSP is built on a simple principle: **no central authority controls access to your biological data. You do.** Control is exercised entirely through cryptographic keys.

### The Key Pair
*   **Public Key**: Your address in the BSP ecosystem (e.g., `andre.bsp`). Shared freely with labs and systems to identify your BEO.
*   **Private Key**: Your control key. Never leaves your device. Never sent to any server. Used to sign authorizations and decrypt your data. Without it, no one accesses your BEO.

### Analogy: Crypto Wallet
Like a Bitcoin address, your public key receives data (BioRecords). Your private key authorizes transactions (ConsentTokens). Unlike banks, if you permanently lose your private key without backups, you lose access to your data forever. 

### Social Recovery
To mitigate loss risks, users can set up 3 trusted **Guardians**. 
Using Shamir Secret Sharing, fragments of the recovery key are encrypted to the guardians' public keys. If a user loses their device, any 2 of the 3 guardians can confirm their identity to authorize a Key Rotation, restoring access without any central server involvement.

## Part 2: Arweave — Permanent Storage

BSP uses **Arweave**, a permanent storage blockchain. 

*   **Traditional DBs**: Run by central servers. If the company closes, the data dies.
*   **Arweave**: Pay once, store forever. A decentralized network of nodes ensures no company, government, or even the Ambrósio Institute can delete or alter the data. 

If the Ambrósio Institute ceases to exist in 50 years, the BEOs, BioRecords, and Smart Contracts continue executing on Arweave seamlessly. Sovereign data truly outlives its creators.

## Part 3: Smart Contracts — Immutable Rules

Every major action on a BEO generates a permanent transaction on Arweave. The Arweave chain **accumulates** transactions, it never overwrites them.

Relevant contracts include:
*   **BEORegistry**: Creates and manages BEOs (open to anyone). Defines the "current" state of a BEO by resolving the most recent valid transactions.
*   **IEORegistry**: Manages BSP-Certified institutions.
*   **DomainRegistry**: Manages the `.bsp` namespace.
*   **AccessControl**: The true gatekeeper. Verifies `ConsentTokens` globally.

## Part 4: The MCP Model Applied to BSP

The Anthropic Model Context Protocol (MCP) lets anyone create an MCP Server or Client without Anthropic's approval. Safety comes from the user actively consenting to which servers the assistant can access.

BSP follows the exact same logic.
*   Anyone can create a BEO, or an IEO to submit data.
*   The sole gatekeeper is the individual's **ConsentToken** in the `AccessControl` contract.

### Flow Examples
*   **The User**: Opens app -> Generates keys locally -> Creates BEO on Arweave -> Receives `.bsp` domain -> Authorizes labs.
*   **The Lab (Certified or not)**: Installs `bsp-sdk` -> Requests authorization -> Submits encrypted BioRecords to Arweave.
*   **The AVA (Intelligence)**: User opens app -> App decrypts records locally -> User explicitly requests analysis from AVA -> AVA processes data and returns SVA Score -> Ambrósio Institute discards raw data after processing.
