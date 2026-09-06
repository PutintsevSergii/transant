# TechnicalSheet

`TechnicalSheet` presents one wagon's print-catalogue drawing set, exact technical rows, loading tables, special features and source notes inside the existing TransANT visual system.

The caller supplies local `ImageMetadata` and already validated strings. The component does not parse dimensions, convert units, repair conflicting catalogue values, infer blank table cells or read routes/content files. It renders all engineering values as text and provides a native full-size link for each drawing.

Optional `labels` supplies caller-owned localized section, drawing, table-accessibility, empty-cell, feature, and catalogue-note copy; English defaults keep isolated fixtures portable. Technical values remain literal.

Compact layouts stack drawings and specification groups. Wide layouts give the side/plan drawing the larger stage, place end elevations alongside it, and use two columns for data tables where space permits. Every table remains a semantic table within a named keyboard-focusable horizontal scroller, and print removes the scrolling constraint.

The source adapter records the printed page, preserves decimal punctuation and merged/blank cells, and exposes explicit catalogue notes for contradictions. If a feature panel conflicts with the wagon specification, the adapter withholds the questionable feature claim and records the reason.

Validate with `pnpm test:unit -- technical-sheet-contract`, then run the focused product-page browser suite and inspect the required responsive product baselines.
