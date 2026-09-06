# Website content

This directory contains product copy extracted from the self-contained HTML prototype. `catalog.json` is the aggregate data source; each product also has a colocated `product.json` and human-readable `README.md`.

## F-002 content contract

The framework-independent domain contracts live in `src/domain/content/`. The aggregate JSON is read through `src/adapters/content/catalog-source.ts`, which adds the aggregate prototype reference as an inherited attribution for legacy product and family records. Presentation code receives `ProductViewModel` values from `src/adapters/content/production-view-models.ts`; it must render specification and load-limit strings without parsing, rounding, appending units, or changing their order.

`image` values remain logical paths below `src/assets/images/`. They are not public URLs or framework image modules; a later local-asset adapter resolves them at the presentation boundary. Source records for projects, pages, downloads, evidence, and claims must use the same schemas and include source attribution. Only claims marked `approved` are eligible for production view models; `draft` and `unverified` records remain internal.

`print-catalogue.json` is the visually checked product-page source derived from the root print catalogue. The Illustrator file supplies local drawing artwork under `src/assets/images/technical-drawings/`; its outlined lettering is not treated as extractable text. The JSON therefore preserves the printed specification labels, values, decimal separators, loading-table structure, blank cells, feature order, page references, and explicit notes for visible contradictions. Product `technical_source` fields identify the exact catalogue page used for the canonical specification rows.

Run `pnpm test:unit` to validate the ten product records, five families, invalid contract fixtures, value preservation, and claim publication gate.

## Product categories

- [Intermodal](./products/intermodal/README.md) - 1 model(s)
- [Flat](./products/flat/README.md) - 3 model(s)
- [Timber](./products/timber/README.md) - 2 model(s)
- [Multi / Open box](./products/open-box/README.md) - 3 model(s)
- [Tank](./products/tank/README.md) - 1 model(s)

Regenerate these files only deliberately with `python3 prep/tools/extract_catalog_data.py` after updating the archived prototype. The historical script may require path updates for the current development layout; review its output before replacing approved content.
