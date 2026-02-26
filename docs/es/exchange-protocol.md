# Exchange Protocol

"BSP defines the format of the conversation. What each system does with it is their responsibility."

## Overview
The Exchange Protocol is the layer of BSP that defines how biological data moves between systems. It specifies the exact format of requests and responses, available operation types (Intents), authentication, and error handling. Any system correctly implementing the Exchange Protocol can send and receive biological data in the BSP format — without prior approval, without intermediaries.

The Exchange Protocol defines:
*   Schema of `BSPRequest` and `BSPResponse`.
*   Types of `BSPIntent` and their parameters.
*   Authentication via `ConsentToken` + IEO signature.

The Exchange Protocol **DOES NOT** define:
*   What systems do with the received data.
*   Analysis or scoring algorithms (e.g., AVA, SVA).
*   Transport infrastructure (HTTP, WebSocket, etc).

## BSPIntent — Operation Types
Intents define the vocabulary of operations. Each Intent requires specific parameters and expected responses. The `ConsentToken` must include the requested Intent, otherwise the `AccessControl` contract rejects the request immediately.

### 1. SUBMIT_RECORD
Used by laboratories, wearables, and authorized systems to write biological measurements to a BEO.
*   **Required Parameter**: `payload` (BioRecord or array of BioRecords).
*   **Consent:** Requires token with `SUBMIT_RECORD` and the corresponding category.

### 2. READ_RECORDS
Used by physicians, platforms, and analysis systems to read biological data from a BEO.
*   **Options**: Filters by `biomarkers`, `categories`, `levels`, `period`, `limit`, and `offset`.
*   **Consent:** Requires token with `READ_RECORDS` in scope.

### 3. ANALYZE_VITALITY
Requests a complete biological aging analysis from an intelligence system.
*   **Process:** Only AVA-powered systems produce SVA scores. Other systems can implement their own logic.

### 4. REQUEST_SCORE
Simplified version of `ANALYZE_VITALITY` — returns only the composite vitality score, not detailed analysis. Mainly used by opt-in insurers.

### 5. SOVEREIGN_EXPORT
The most fundamental right of the BEO holder. Returns all BioRecords in standardized BSP format, decrypted with the holder's private key, facilitating total data portability.
> [!IMPORTANT]
> `SOVEREIGN_EXPORT` cannot be blocked, limited, or denied by any BSP-compliant system. Any system that blocks this violates the BSP specification.

### 6. SYNC_PROTOCOL
Synchronizes a user's active health protocol (interventions, supplements, goals) across BSP-compatible systems.

## Double Authentication
The `BSPRequest` demands two levels of authentication:
1.  **ConsentToken**: Proves the BEO holder authorized the IEO.
2.  **ieo_signature**: Proves the requesting IEO actually constructed the request. The IEO signs the request payload with its private key, preventing intercepted ConsentTokens from being misused.

## BSPResponse & Errors
Responses strictly follow the `BSPResponse` schema containing the `status` (`SUCCESS`, `ERROR`, `PARTIAL`, `PENDING`). 

Common errors include:
*   **Authentication/Authorization**: `TOKEN_NOT_FOUND`, `TOKEN_REVOKED`, `INTENT_NOT_AUTHORIZED`, `CATEGORY_NOT_AUTHORIZED`.
*   **Schema/Data**: `BIOMARKER_NOT_FOUND`, `INVALID_UNIT`, `SCHEMA_VALIDATION_FAILED`, `DUPLICATE_RECORD`.
*   **System**: `ARWEAVE_WRITE_FAILED`, `INTENT_NOT_SUPPORTED`.
