# BSP Biomarker Code Reference

> Quick reference for BSP taxonomy codes.
> Full taxonomy: [bsp-spec/spec/taxonomy/](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/tree/main/spec/taxonomy)

---

## Code Format

```
BSP-[CATEGORY]-[NUMBER]
```

Examples: `BSP-GL-001` · `BSP-LA-004` · `BSP-DV-001`

---

## Category Index

### Level 1 — Core (Advanced Longevity)

| Code | Category | Key Biomarkers |
|---|---|---|
| `BSP-LA` | Longevity & Aging | GDF-11, TIMP2, Telomere Length, NAD+ |
| `BSP-RC` | Regeneration & Cellular | HOMA-IR, IGF-1, mTOR, IL-6 |
| `BSP-CV` | Cardiovascular Health | ApoB, Homocysteine, Nitric Oxide, Omega-3 |
| `BSP-IM` | Immune & Inflammation | Vitamin D, Glutathione, hs-CRP, CD38 |
| `BSP-ME` | Metabolism & Energy | ATP, Mitochondrial Function, Ketones |
| `BSP-NR` | Neurological Health | BDNF, Cortisol, NfL, GFAP |
| `BSP-DH` | Detoxification & Hepatic | GSH, ALT/AST/GGT, Heavy Metals |
| `BSP-LF` | Lymphatic & Clearance | Lymphocyte Profile, Drainage Index |
| `BSP-BC` | Biological Clock | DNAm Age, p16, p21, SASP |

### Level 2 — Standard (Routine Laboratory)

| Code | Category | Key Biomarkers |
|---|---|---|
| `BSP-HM` | Hematology | CBC, RBC, WBC, Platelets |
| `BSP-VT` | Vitamins | Vitamin D, B12, Folate, B6 |
| `BSP-MN` | Minerals & Electrolytes | Magnesium, Zinc, Iron, Ferritin |
| `BSP-HR` | Hormones | TSH, T3/T4, Testosterone, Estradiol |
| `BSP-RN` | Renal Function | Creatinine, BUN, eGFR |
| `BSP-LP` | Conventional Lipids | Total Cholesterol, HDL, LDL, TG |
| `BSP-GL` | Glycemia & Metabolic | Fasting Glucose, HbA1c, Insulin |
| `BSP-LV` | Hepatic Function | ALT, AST, GGT, Albumin |
| `BSP-IF` | Inflammatory Markers | CRP, ESR, Fibrinogen, Ferritin |

### Level 3 — Extended (Specialized)

| Code | Category | Coverage |
|---|---|---|
| `BSP-FR` | Fertility & Reproductive | AMH, Sperm analysis, DNA fragmentation |
| `BSP-GN` | Genomics | APOE, MTHFR, BRCA, CYP450, PRS |
| `BSP-MB` | Microbiome | Gut diversity, F/B ratio, SCFA |
| `BSP-TX` | Environmental Toxicology | Heavy metals, Glyphosate, PFAS |
| `BSP-IM2` | Advanced Immunology | T-cell senescence, NK cells, Th1/Th2 |
| `BSP-CV2` | Advanced Cardiovascular | LDL-P, Oxidized LDL, CAC score, PWV |

### Level 4 — Device (Continuous Wearable)

| Code | Category | Coverage |
|---|---|---|
| `BSP-DV` | Device & Continuous | HRV, SpO2, CGM, Sleep architecture, Activity |

---

## Common Codes Quick Reference

| Code | Biomarker | Unit | Level |
|---|---|---|---|
| `BSP-GL-001` | Fasting Glucose | mg/dL | STANDARD |
| `BSP-GL-002` | HbA1c | % | STANDARD |
| `BSP-LA-003` | Telomere Length | kb | CORE |
| `BSP-LA-004` | NAD+ | µmol/L | CORE |
| `BSP-CV-001` | ApoB | mg/dL | CORE |
| `BSP-HR-001` | TSH | µUI/mL | STANDARD |
| `BSP-VT-001` | Vitamin D (25-OH) | ng/mL | STANDARD |
| `BSP-DV-001` | HRV (RMSSD) | ms | DEVICE |
| `BSP-DV-006` | SpO2 | % | DEVICE |
| `BSP-BC-001` | Epigenetic Age (DNAm) | years | CORE |
