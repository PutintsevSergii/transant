# Website content

This directory contains product copy extracted from the self-contained HTML prototype. `catalog.json` is the aggregate data source; each product also has a colocated `product.json` and human-readable `README.md`.

## Product categories

- [Intermodal](./products/intermodal/README.md) - 1 model(s)
- [Flat](./products/flat/README.md) - 3 model(s)
- [Timber](./products/timber/README.md) - 2 model(s)
- [Multi / Open box](./products/open-box/README.md) - 3 model(s)
- [Tank](./products/tank/README.md) - 1 model(s)

Regenerate these files only deliberately with `python3 prep/tools/extract_catalog_data.py` after updating the archived prototype. The historical script may require path updates for the current development layout; review its output before replacing approved content.
