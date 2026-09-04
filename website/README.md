# Production website workspace

This directory is the application boundary for the Astro website.

## Current structure

```text
website/
├── public/
│   ├── brand/transant-logo.png   immutable approved logo asset
│   └── downloads/                approved public files only
└── src/
    ├── assets/images/            local source images processed by Astro
    ├── content/                  aggregate and per-product content records
    ├── data/color-tokens.json    source color inventory
    └── styles/tokens.css         initial reusable color tokens
```

F-001 will add the Astro project, component lab, test infrastructure, and remaining source directories without removing these inputs.

Image strings in product data are logical paths rooted at `src/assets/images/`. F-002 must resolve them through one typed asset adapter so presentation components receive local image metadata rather than raw paths.

The `public/` directory is reserved for files that must be copied byte-for-byte. Do not place large photographic or wagon-render masters there. The TransANT logo must remain byte-identical to the approved source.

Approved logo integrity baseline:

```text
SHA-256 fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985
520 x 114 px
```
