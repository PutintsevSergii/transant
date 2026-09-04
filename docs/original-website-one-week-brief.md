# Original TransANT website: one-week production brief

## Objective

Create an independent, fast, and visually distinctive corporate website for TransANT within seven calendar days. The website must improve the presentation of the existing brand without altering the logo or borrowing the design or implementation of the competitor HTML prototype. Client-supplied text, tables, specifications, and wagon images are approved source content.

The company owner explicitly dislikes the current public website at `https://www.transant.com/en`. Treat it as a factual content source and legacy-site inventory only, never as a visual, structural, interaction, or art-direction reference. The redesign must feel recognizably new while preserving the immutable logo and verified company information.

## Non-negotiable rules

1. Do not copy the competitor prototype's design, markup, CSS, JavaScript, component structure, responsive decisions, or interactions. Client-supplied product content and images may be extracted and reused.
2. Do not reproduce or modernize the current public website's visual composition. Its content may be retained only after verification and restructuring.
3. Every published fact must have a source: a TransANT catalogue, official datasheet, certificate, approved company text, or verified public page.
4. Technical and environmental claims must be marked `approved`, `needs confirmation`, or `do not publish`.
5. The logo is immutable. Use only the original client-supplied artwork without redrawing or changing its wording, mark, colors, proportions, or element arrangement.
6. Design mobile-first with semantic markup, keyboard navigation, visible focus states, and at least WCAG AA contrast.
7. Forms, analytics, cookies, privacy, and downloads must be real functions rather than decorative controls.

## Safe brand development

Preserve without modification:

- every detail of the client-supplied TransANT logo;
- red as the recognizable product and action color;
- the precise, engineering-led, European character;
- the idea of lower tare weight and higher payload once the wording receives technical approval.

Improve:

- typographic hierarchy and technical-data legibility;
- an original modular grid inspired by platform length, axles, and cargo modules;
- consistent treatment of product renders and operational photography;
- the balance between emotional brand communication and evidence;
- the icon, table, comparison, and CTA systems;
- mobile quality and loading performance.

Do not:

- introduce decorative futurism unrelated to rail engineering;
- overuse gradients, arbitrary 3D effects, or copied compositions;
- redraw, simplify, recolor, crop, distort, or animate the logo;
- typeset TransANT in another font as a substitute for the logo;
- create an alternative mark, monogram, or mobile logo without a client-supplied approved asset;
- publish unsupported superlatives such as “lightest,” “greenest,” or “best”;
- give different wagons identical marketing pages without useful technical information.

## Proposed visual direction

Working direction: **Engineered to carry more**.

The visual system uses an original “rail grid”: fine guides, dimension lines, platform numbers, and generous negative space. The red wagon remains the primary color object. Dark graphite provides an industrial foundation, while cool steel tones support drawings and specifications. Red is used deliberately for the product, the primary action, and measurable benefits.

The principal narrative mechanism is not a competitor-style hero but a progressive explanation of the wagon:

```text
cargo challenge -> platform -> superstructure -> measurable result -> evidence
```

## Production scope for the first release

```text
/
/wagons
/wagons/[category]
/wagons/[category]/[model]
/technology
/solutions
/projects
/sustainability
/quality
/company
/downloads
/contact
/imprint
/privacy
```

The scope includes five categories, ten product pages, responsive navigation, direct family and product browsing, specification tables, document downloads, a working contact form, baseline SEO, Open Graph metadata, sitemap, robots, 404, and at least an English version. Search, filtering, comparison, and configuration tools are deferred beyond the first release. Add German only when approved translations are available. Do not publish machine-translated legal or technical text.

## Seven-day schedule

### Day 1 — foundation and art direction

- approve brand boundaries and an original visual direction;
- select the production stack and establish the repository structure;
- define design tokens, grid, typography, and foundation components;
- create a provenance matrix separating permitted client content from excluded competitor design and code.

### Day 2 — site shell and homepage

- header, footer, navigation, and responsive shell;
- original homepage;
- accessibility and performance baselines.

### Day 3 — catalogue

- wagon index and category pages;
- direct five-family and ten-product catalogue navigation;
- reusable product-page template.

### Day 4 — editorial pages

- Technology, Solutions, Sustainability, Quality, and Company;
- certificates and evidence system;
- Projects using only approved case studies.

### Day 5 — conversion and supporting functions

- Contact page and functioning form delivery;
- Downloads;
- metadata, sitemap, robots, and Open Graph;
- Imprint, Privacy, and consent based on the services actually connected.

### Day 6 — content and visual QA

- verify specifications and claims;
- test major responsive widths;
- test keyboard use, screen-reader semantics, and contrast;
- optimize images and Core Web Vitals.

### Day 7 — acceptance and launch

- smoke-test every route, form, and download;
- obtain final content approval;
- run the production build and deploy;
- establish error monitoring, backup, and handover.

## Critical path

Only decisions that can genuinely block release are required by the end of Day 1:

- domain and hosting platform;
- original files for every approved logo version and any existing placement rules;
- primary launch language;
- recipient for contact-form submissions;
- approved technical datasheets;
- owner of final content approval.

If material is not ready, mark the affected page `draft/hidden` instead of filling gaps with assumptions.

## Definition of done

- no dependency on the competitor prototype's design or code; approved client content has explicit traceability;
- every published claim has a source and approval status;
- all ten products have separate indexable URLs;
- the form delivers submissions and exposes success and error states;
- no empty controls or fake downloads;
- essential reading and navigation work without JavaScript;
- mobile behavior and keyboard operation pass manual checks;
- the production build contains no broken internal links or missing images.
