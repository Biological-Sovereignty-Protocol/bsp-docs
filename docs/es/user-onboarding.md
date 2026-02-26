# User Onboarding Flow

"The moment a person creates their BEO, they cross a threshold — from patient to sovereign."

## Design Philosophy

Most health apps onboard users into a product. BSP onboards users into a lifelong biological identity. This 12-minute process is intentionally architectural; the user should feel the weight of setting up permanent infrastructure for their health data.

| Traditional Health Apps | BSP Onboarding |
|-------------------------|----------------|
| Creates an account on their servers | Creates a sovereign identity on permanent infrastructure |
| User data belongs to the platform | User holds the private key to their own biology |
| Account can be deleted by company | BEO cannot be deleted by anyone |
| Recovers via email reset | Recovers via social guardian network |
| Data locked in one app | Data is fully portable (`SOVEREIGN_EXPORT`) |

## The Four Phases of Onboarding

### Phase 01: Identity (Creating the BEO)
*   **Action**: The user chooses their `.bsp` domain (e.g., `andre.bsp`, or a privacy-preserving identifier).
*   **Under the hood**: A cryptographic key pair is generated instantly and locally on the device's secure enclave. The public key is registered on Arweave. The identity is permanently created.

### Phase 02: Sovereignty (Protecting the BEO)
A BEO protected only by a seed phrase is vulnerable if the device is lost. This phase sets up the safety net.
*   **Guardians**: The user selects 3 trusted people. A 2-of-3 threshold is established.
*   **Seed Phrase**: The user must backup their 24-word recovery phrase offline. 
*   **UX Note**: Guardian setup is highly encouraged but *optional* during initial onboarding. A user can skip it and add guardians later, ensuring they are never blocked from entering the ecosystem.

### Phase 03: Activation (First BioRecords)
The protocol comes alive with data. The user has three paths to build their baseline:
*   **Path A: Import**. Connect a BSP-Compliant laboratory to import existing exam histories instantly.
*   **Path B: Wearable**. Connect an Oura Ring, Apple Watch, etc. to start syncing continuous biometric data.
*   **Path C: Manual Entry**. Manually type in recent blood test values to trigger the first data points.

### Phase 04: Living Protocol (Vitality Intelligence)
The user authorizes the intelligence layer (AVA). 
*   **Action**: The user grants AVA continuous, revocable reading rights to process their BioRecords.
*   **Result**: The user receives their first **Ambrósio Vitality Score (SVA)** — e.g., a score of 68.4, showing an biological age of 41.2 against a chronological age of 42. It is framed as an opportunity to improve, never a verdict.

## Post-Onboarding: The Living BEO
A BEO grows continuously. A user starting with 50 lab results and connecting a wearable will accumulate thousands of BioRecords in their first year. 

At any moment, the user can trigger a `SOVEREIGN_EXPORT`, receiving a complete, decrypted JSON file of their biological history. This export demonstrates true portability and sovereignty.

### Triggering New BioRecords
The app prompts users to add data at high-intent moments:
*   **Automatic**: Wearables sync silently daily; lab results arrive automatically.
*   **Prompted**: "You had a medical appointment today — add your results?"
*   **Action-driven**: If the SVA drops significantly, the app prompts the user to book a new blood panel to investigate.

## Special Cases

*   **Minors**: BEOs for minors are created under a custodial model held by the parent. At age 18, an automated transfer initiates, handing full sovereign control to the adult without losing any historical data.
*   **Data Correction**: If a lab makes a transcription error, they submit a correction. The new BioRecord marks the old one as `SUPERSEDED`, preserving the immutable audit trail while displaying the correct value.
