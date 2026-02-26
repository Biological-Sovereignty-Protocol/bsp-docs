# The Ecosystem Flow

"From first access to Vitality Score — the complete journey of the developer and the user through the BSP repositories."

This document explains step-by-step how the BSP ecosystem operates in practice. The two protagonists are the **Developer** (who builds on the protocol) and the **User** (who lives under its protection). Both paths intersect at the **BEO** (Biological Entity Object).

<EcosystemFlowMcp />

## Part 1: The Developer's Journey
How a laboratory, app, or platform enters the BSP ecosystem:

1.  **Understand the Protocol (`bsp-spec`)**: A developer accesses the public BSP specification. They learn what a BEO is and how the Exchange Protocol works. No registration or approval is needed.
2.  **Install the SDK (`bsp-sdk`)**: Whether building in Python or TypeScript, the developer installs the SDK (e.g., `pip install bsp-sdk`). They can immediately start structuring data into valid, sovereign BioRecords.
3.  **Request Authorization**: The lab wants to submit data. They use the SDK to ask the user for authorization. The user signs a ConsentToken on-chain. Without this, the Arweave blockchain automatically rejects the transaction.
4.  **Connect AI Agents (`bsp-mcp`)**: A health platform wants their AI to read the BEO. They install `bsp-mcp` (the official Model Context Protocol server for BSP), allowing AIs like Claude to query biological data — strictly under the user's consent.

## Part 2: The User's Journey
From the perspective of a person living within the ecosystem:

1.  **Identity Creation (`bsp-registry`)**: The first time you use a BSP app, your BEO is created. Keys are generated locally. The address (e.g., `andre.bsp`) belongs to you forever.
2.  **Data Arrival (`bsp-sdk` + Arweave)**: You do a blood test. The laboratory formats the data as BioRecords and sends them. Because you authorized the lab, the data is encrypted with your key and stored permanently on Arweave.
3.  **Vitality Analysis (`ava-core`)**: You open your app and actively request an analysis. The app decrypts the BioRecords locally and sends them to the AVA intelligence engine (with session consent). AVA processes the data.
4.  **The Final Product (`sva-engine`)**: You receive your Ambrósio Vitality Score (SVA) — a multi-dimensional biological age score showing where you are winning and where you need to act.
5.  **AI Assistant (`bsp-mcp`)**: You ask your AI healthcare assistant about your results. Through the MCP connection, the AI reads your sovereign data and provides deeply contextualized medical insights.

## Where Paths Cross: The Repository Roles

| Repository | Who Uses It | Purpose |
|------------|-------------|---------|
| `bsp-spec` | Devs, Labs, Auditors | The public law of the protocol. |
| `bsp-sdk` | App & Backend Devs | The builder's tools (Python/TypeScript). |
| `bsp-mcp` | AI Platforms | Connects AI agents to the protocol with consent. |
| `bsp-registry` | Ambrósio Institute | Smart contracts on Arweave (identities live here). |
| `ava-core` | Ambrósio Institute | Proprietary intelligence (processes BioRecords). |
| `sva-engine` | Ambrósio Institute | Produces the Vitality Score for the user. |

## Why is it designed this way?

*   **Why is the protocol open?** Because a closed standard is just a product. If BSP required approval to create a BEO, the Institute would be a bottleneck.
*   **Why does consent replace certification as the gatekeeper?** Because an on-chain signature is mathematically verifiable; it doesn't require trusting an institution. Certification is a badge of trust, not the key to the door.
*   **Why is the intelligence (AVA) closed?** The competitive advantage of the Institute is not the protocol itself, but the intelligence applied to the standardized data flowing through it.
*   **Why does AVA never have passive access?** Because true sovereignty means no system analyzes your data unless you ask it to.
