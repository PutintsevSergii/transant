# Website content model

> **Provenance note:** the current JSON was extracted from client-supplied content embedded in a competitor-designed HTML prototype. The client has authorized reuse of the wagon images, product text, specifications, and tables. Do not reproduce the prototype's design, CSS, JavaScript, layout, component structure, or interaction patterns. Technical and legal claims still require normal approval before publication.

The extracted structure separates content from public assets so it can be consumed by Next.js, Astro, Nuxt, Vite, or a headless-CMS import step without parsing the original 940 KB single-file prototype at runtime.

## Product tree

```text
website/
└── src/
    ├── content/
    │   ├── catalog.json
    │   └── products/
    │       ├── intermodal/
    │       │   └── uno-intermodal-60ft-sgns/
    │       ├── flat/
    │       │   ├── uno-flat-60ft-rens/
    │       │   ├── uno-flat-60ft-relns/
    │       │   └── uno-flat-60ft-rns/
    │       ├── timber/
    │       │   ├── uno-timber-60ft-rnoos/
    │       │   └── uno-timber-60ft-snps/
    │       ├── open-box/
    │       │   ├── uno-multibox-33ft-eamnos/
    │       │   ├── uno-multi-40ft-eanos/
    │       │   └── uno-multi-56ft-eanos/
    │       └── tank/
    │           └── uno-tank-88m3-zacns/
    └── assets/images/products/
        └── <same category>/<same product slug>/wagon-render.png
```

Every product content directory contains:

- `product.json` - machine-readable copy, specifications, image path, and traceability id.
- `README.md` - human-readable product brief with tables and lists.

Each category has a `README.md` index. `website/src/content/catalog.json` aggregates the entire range for category listings and later CMS import.

## Data conventions

- `id` is a stable programmatic identifier.
- `slug` is the preferred URL segment.
- `source_id` preserves the original HTML prototype key, including the known `ealmnos` typo.
- `category` matches the folder and proposed URL segment.
- `image` is a logical path rooted at `website/src/assets/images/`; F-002 resolves it through a typed local-asset adapter.
- `specs`, `loadlimit`, and `goods` preserve display order by using arrays of label/value pairs.

## Suggested page routes

```text
/wagons
/wagons/intermodal
/wagons/intermodal/uno-intermodal-60ft-sgns
/wagons/flat/uno-flat-60ft-rens
/wagons/timber/uno-timber-60ft-rnoos
/wagons/open-box/uno-multi-56ft-eanos
/wagons/tank/uno-tank-88m3-zacns
```

## Production preparation

1. Confirm the technical and marketing claims with product owners.
2. Confirm canonical brand spelling, contact email, and color standards.
3. Generate responsive AVIF/WebP versions and keep PNG originals as masters.
4. Replace prototype form controls with a real validated submission workflow and privacy notice.
5. Add actual datasheet files and links for each product.
6. Convert the extracted JSON into framework types or a CMS schema, preserving ordered specification fields.

Run `python3 prep/tools/extract_catalog_data.py` only when deliberately rebuilding the structured client-supplied content after source changes. The historical script may require path updates for the development layout. It extracts content and assets only; its output must be presented through an independently designed and implemented website.
