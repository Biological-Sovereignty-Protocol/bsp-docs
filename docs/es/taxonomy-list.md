# Complete Biomarker Taxonomy

The BSP Taxonomy is the universal language for measuring biological state. It currently contains 210+ approved biomarkers divided into 25 categories and 4 access levels.

> [!NOTE]
> This is a living standard. New biomarkers are added quarterly via the [BIP Governance Process](/governance).

## 1. Core Longevity (BSP-LA)
The primary markers used by the AVA engine to determine the Ambrósio Vitality Score (SVA).

| Code | Biomarker | Unit | Expected Optimal Range | Method |
|------|-----------|------|------------------------|--------|
| `BSP-LA-001` | High-Sensitivity CRP (hs-CRP) | mg/L | < 0.5 | Immunoassay |
| `BSP-LA-002` | Fasting Insulin | µIU/mL | 2.0 - 5.0 | ECLIA |
| `BSP-LA-003` | Homocysteine | µmol/L | 5.0 - 7.0 | HPLC |
| `BSP-LA-004` | HbA1c | % | 4.6 - 5.0 | HPLC |
| `BSP-LA-005` | Free Testosterone | ng/dL | Age/Sex dependent | LC-MS/MS |
| `BSP-LA-006` | Vitamin D (25-OH) | ng/mL | 50.0 - 80.0 | LC-MS/MS |
| `BSP-LA-007` | Omega-3 Index | % | > 8.0 | GC-MS |
| `BSP-LA-008` | ApoB | mg/dL | < 60 | Immunoturbidimetry |
| `BSP-LA-009` | NAD+ / NADH Ratio | ratio | > 400 | LC-MS |

## 2. Essential Metabolism (BSP-MT)
Markers for assessing metabolic flexibility, mitochondrial function, and energy substrates.

| Code | Biomarker | Unit | Expected Optimal Range | Method |
|------|-----------|------|------------------------|--------|
| `BSP-MT-001` | Fasting Glucose | mg/dL | 75 - 85 | Hexokinase |
| `BSP-MT-002` | Uric Acid | mg/dL | 3.5 - 5.0 | Uricase |
| `BSP-MT-003` | Lactate Dehydrogenase (LDH) | U/L | 140 - 200 | UV Kinetic |
| `BSP-MT-004` | Ferritin | ng/mL | 50 - 150 | ECLIA |
| `BSP-MT-005` | Triglycerides | mg/dL | < 70 | Enzymatic |

## 3. Cardiovascular Dynamics (BSP-CV)
Advanced lipidology, endothelial function, and vascular health.

| Code | Biomarker | Unit | Expected Optimal Range | Method |
|------|-----------|------|------------------------|--------|
| `BSP-CV-001` | LDL Particle Number (LDL-P) | nmol/L | < 1000 | NMR |
| `BSP-CV-002` | Lipoprotein(a) | mg/dL | < 14 | Immunoturbidimetry |
| `BSP-CV-003` | Fibrinogen | mg/dL | 200 - 300 | Clauss |
| `BSP-CV-004` | Oxidized LDL | U/L | < 45 | ELISA |

## 4. Device & Wearables Continuously Tracked (BSP-DV)
Data collected continuously from BSP-certified consumer and clinical hardware (Oura, Apple Watch, WHOOP).

| Code | Biomarker | Unit | Frequency | Method |
|------|-----------|------|-----------|--------|
| `BSP-DV-001` | Resting Heart Rate (RHR) | bpm | Daily Avg | PPG / ECG |
| `BSP-DV-002` | Heart Rate Variability (HRV) | ms (RMSSD) | Daily Avg | PPG / ECG |
| `BSP-DV-003` | Slow Wave Sleep Duration | min | Nightly | Actigraphy + Temp |
| `BSP-DV-004` | REM Sleep Duration | min | Nightly | Actigraphy + Temp |
| `BSP-DV-005` | Nocturnal Body Temp Deviation | °C | Nightly | Thermistor |
| `BSP-DV-006` | VO2 Max Estimate | mL/kg/min | Monthly | Multisensor model |

---

*For the complete JSON list of all 210+ biomarkers to integrate into your application, see the `bsp-spec` repository.*
