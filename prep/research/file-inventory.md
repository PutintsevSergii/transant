# Pre-development file inventory and rename map

This is the inventory created before the development-root cleanup. Original catalogue and prototype paths now have the `prep/` prefix, and the exact duplicate image previously under `website/public/images/archive/` now lives under `prep/archive/duplicate-images/`.

This table covers all 29 files that were present before reorganization. It records the original name, new descriptive path, and the practical meaning of the file.

## Catalogues and prototype

| Original filename | New path | Content and intended use |
| --- | --- | --- |
| `1. Transant catalog all.pdf` | `source-material/catalogs/transant-product-portfolio-red.pdf` | 26-page complete product portfolio using the dark charcoal and solid-red geometric brand system. Contains the ten-wagon overview, product descriptions, specifications, loading schemes, benefits, contact page, and back cover. Keep as an alternate full catalogue concept. |
| `Catalog for print.ai` | `source-material/catalogs/transant-product-catalog-print-master.ai` | 26-artboard Adobe Illustrator master saved with PDF compatibility. It renders as a multi-page PDF but retains the `.ai` extension because it is the editable design source. Do not serve this approximately 450 MB file on the website. |
| `Catalog for print.pdf` | `source-material/catalogs/transant-product-catalog-print-export.pdf` | 26-page print export of the Illustrator master, with the white/red line-based layout and all ten wagon models. Intended for production-quality print or high-resolution review. |
| `Gradient wagon catalog.pdf` | `source-material/catalogs/transant-product-catalog-gradient-concept.pdf` | 8-page partial concept: cover, tank artwork, product overview, UNO INTERMODAL 60ft details, contact page, blue wagon artwork, and gradient back cover. Useful as a visual direction study, not a complete catalogue. |
| `TransANT catalog_NEW light.pdf` | `source-material/catalogs/transant-product-catalog-lightweight.pdf` | 26-page compressed delivery copy of the white/red print catalogue. Same page sequence and product range, much smaller for email/download use. |
| `transant-landing (1).html` | `source-material/prototypes/transant-product-website-prototype.html` | Self-contained responsive single-page website prototype with embedded logo/photos/renders, homepage sections, five category views, ten product views, specifications, commodities, benefits, and contact UI. Product data is embedded in JavaScript and extracted into `website/content/`. |

## Brand and campaign images

| Original filename | New path | Content and intended use |
| --- | --- | --- |
| `24-1.jpg` | `website/public/images/brand/transant-generation-rail-lockup-cover.jpg` | Dark portrait cover with large red TransANT chevron and the wording “TRANSANT Generation Rail.” Use as a brand lockup/reference composition. |
| `24.jpg` | `website/public/images/brand/transant-next-generation-rail-lockup-cover.jpg` | Alternate dark portrait cover with the same red chevron and the wording “Next Generation Rail.” |
| `Img/art p2.png` | `website/public/images/brand/tank-wagon-red-reflection-art.png` | Dramatic red-and-black tank-wagon silhouette with reflection. Hero/editorial brand art. |
| `Img/p25 img.png` | `website/public/images/brand/open-box-wagon-blue-reflection-art.png` | Dark blue studio artwork of an open-box wagon with reflection. Hero/editorial brand art and cool-color counterpoint to the red tank image. |
| `22-1.jpg` | `website/public/images/campaigns/inquiry-scrap-wagon-flyer.jpg` | Portrait inquiry flyer using the “Interested in TransANT freight wagons?” headline over a red scrap wagon, with cyan contact panel. |
| `22-2.jpg` | `website/public/images/campaigns/inquiry-intermodal-wagon-flyer.jpg` | Portrait inquiry flyer using the same headline over an intermodal wagon/bogie photograph, with cyan contact panel. |
| `22.jpg` | `website/public/images/campaigns/inquiry-wagon-blueprint-flyer.jpg` | Portrait inquiry flyer with wagon technical line drawing on a dark background and cyan contact panel. |
| `image001.jpg` | `website/public/images/archive/exact-duplicate-inquiry-intermodal-wagon-flyer.jpg` | Byte-for-byte duplicate of the original `22-2.jpg`, retained in the archive so no source was deleted. Do not publish both. |

## Editorial and overview images

| Original filename | New path | Content and intended use |
| --- | --- | --- |
| `Img/p24 img.jpg` | `website/public/images/editorial/intermodal-wagon-bogie-closeup.jpg` | Portrait close-up photograph of an intermodal wagon deck, bogie area, and yellow operational hardware. Suitable for engineering detail or contact sections. |
| `Img/p26 img.png` | `website/public/images/editorial/freight-train-in-operation.png` | Wide operational photograph of a blue locomotive hauling flat wagons through an industrial rail setting. |
| `Img/train 8k.png` | `website/public/images/editorial/transant-wagon-fleet.png` | High-resolution fleet photograph of blue and red TransANT open-box wagons, including the “Scrap on track” livery. |
| `Img/p3 img.png` | `website/public/images/editorial/product-overview-grid-transparent.png` | Ten-product wagon overview grid with transparency preserved. Use when the page background must show through. |
| `Img/p3 img_1.png` | `website/public/images/editorial/product-overview-grid-flattened.png` | Pixel-identical overview when composited on white, but saved with an opaque background. Use for print or environments that do not handle alpha reliably. |

## Product renders

| Original filename | New path | Product represented |
| --- | --- | --- |
| `Img/vag 1.png` | `website/public/images/products/intermodal/uno-intermodal-60ft-sgns/wagon-render.png` | UNO INTERMODAL 60ft - Sgns(s), intermodal/container wagon. |
| `Img/vag 2.png` | `website/public/images/products/flat/uno-flat-60ft-rens/wagon-render.png` | UNO FLAT 60ft - Rens, flat wagon with foldable side walls and stanchions. |
| `Img/vag 3.png` | `website/public/images/products/flat/uno-flat-60ft-relns/wagon-render.png` | UNO FLAT 60ft - Relns, high-capacity general flat wagon. |
| `Img/vag 4.png` | `website/public/images/products/flat/uno-flat-60ft-rns/wagon-render.png` | UNO FLAT 60ft - Rns, heavy-duty flat wagon with bolsters and stanchions. |
| `Img/vag 5.png` | `website/public/images/products/timber/uno-timber-60ft-rnoos/wagon-render.png` | UNO TIMBER 60ft - Rnoos, timber wagon with dense stanchion arrangement and end structure. |
| `Img/vag 6.png` | `website/public/images/products/timber/uno-timber-60ft-snps/wagon-render.png` | UNO TIMBER 60ft - Snps, optimized timber wagon with stanchions and integrated securing equipment. |
| `Img/vag 7.png` | `website/public/images/products/open-box/uno-multibox-33ft-eamnos/wagon-render.png` | UNO MULTIBox 33ft - Eamnos, compact open-box/high-wall wagon. |
| `Img/vag 8.png` | `website/public/images/products/open-box/uno-multi-40ft-eanos/wagon-render.png` | UNO MULTI 40ft - Eanos, medium-length open-box/high-wall wagon. |
| `Img/vag 9.png` | `website/public/images/products/open-box/uno-multi-56ft-eanos/wagon-render.png` | UNO MULTI 56ft - Eanos, long high-volume open-box/high-wall wagon. |
| `Img/vag 10.png` | `website/public/images/products/tank/uno-tank-88m3-zacns/wagon-render.png` | UNO TANK 88 m³ - Zacns, liquid chemical/petroleum tank wagon. |

## Duplicate and source integrity notes

- `image001.jpg` and the original `22-2.jpg` had the same SHA-256 hash.
- The two original `p3` overview images are visually identical on white. One contains alpha transparency and the other is fully opaque, so both are useful variants rather than accidental byte duplicates.
- The Illustrator master and print PDF render to the same 26-page design, but they are not byte-identical because the `.ai` file contains authoring data.
