# Catalogue comparison

## Recommended use by file

| File | Pages | Visual direction | Best use | Status |
| --- | ---: | --- | --- | --- |
| `transant-product-catalog-print-master.ai` | 26 | White technical pages, red line motif, cyan-blue specification tables | Continue design work in Adobe Illustrator | Editable master |
| `transant-product-catalog-print-export.pdf` | 26 | Same as the Illustrator master | Print production and detailed review | High-resolution export |
| `transant-product-catalog-lightweight.pdf` | 26 | Same page sequence and structure, more aggressively compressed | Website download and email attachment | Preferred delivery PDF after final content approval |
| `transant-product-portfolio-red.pdf` | 26 | Dark charcoal cover, large solid-red chevrons, stronger portfolio branding | Alternate full design direction | Complete concept |
| `transant-product-catalog-gradient-concept.pdf` | 8 | Dark cover with red-to-blue gradient; only the intermodal product is expanded | Brand-direction reference or short teaser concept | Incomplete product catalogue |

## Shared product structure

The complete catalogues use the same ten-model sequence:

1. UNO INTERMODAL 60ft - Sgns(s)
2. UNO FLAT 60ft - Rens
3. UNO FLAT 60ft - Relns
4. UNO FLAT 60ft - Rns
5. UNO TIMBER 60ft - Rnoos
6. UNO TIMBER 60ft - Snps
7. UNO MULTIBox 33ft - Eamnos
8. UNO MULTI 40ft - Eanos
9. UNO MULTI 56ft - Eanos
10. UNO TANK 88 m³ - Zacns

Each product generally receives one marketing page followed by one technical page. The marketing page explains use cases, commodities, and benefits; the technical page provides drawings, specifications, load limits, and special features.

## Content and publication issues to resolve

- Contact email is inconsistent across designs. The recent print catalogue and HTML prototype use `office@transant.com`; earlier red/gradient materials show `transant@gmail.com`. Confirm one public address before publishing.
- Brand capitalization varies between `TransANT`, `TransAnt GmbH`, and `TRANSANT`. Define a written-name standard while keeping the logo artwork unchanged.
- The embedded prototype key for Eamnos is misspelled `ealmnos`. Extracted website data corrects the public id to `eamnos` and retains `source_id` for traceability.
- Claims such as DAC readiness, standards compliance, payload, emissions reduction, and performance percentages should receive engineering/legal approval before the website treats them as current facts.
- The prototype’s request form and datasheet buttons are interface mockups; no submission endpoint or downloadable datasheet behavior is implemented.
- The approximately 450 MB Illustrator master and high-resolution PNGs are source assets, not web delivery assets. Generate responsive AVIF/WebP derivatives during implementation.
