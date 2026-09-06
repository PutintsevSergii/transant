# TransANT website

This directory is the production application boundary and the isolated component-lab boundary for the TransANT Astro website.

## Runtime contract

- Node `22.13.0`, recorded in `.nvmrc` and `.node-version`;
- pnpm `10.34.5`, pinned through `packageManager`;
- Astro `7.2.2`, pinned to the newest reviewed Astro 7 patch that can run on Node 22.13.0;
- Sharp `0.35.4` is the required build-time local image processor for Astro responsive AVIF/WebP generation;
- strictest Astro TypeScript plus `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`;
- Prettier, ESLint, Vitest, Playwright, and axe with exact direct dependency versions.

Astro's `~0.7.4` range can otherwise resolve `unifont@0.7.5`, whose `undici@8` dependency requires Node 22.19 or newer. `package.json` therefore overrides `unifont` to `0.7.4`. Remove that compatibility override only when the recorded Node baseline is deliberately upgraded and the full quality command passes.

Install with the recorded Node and package-manager versions:

```sh
nvm use
corepack enable
pnpm install --frozen-lockfile
```

## Boundaries

```text
website/
├── astro.config.mjs                 production source -> dist/
├── astro.component-lab.config.mjs   component-lab source -> dist-component-lab/
├── component-lab/
│   ├── layouts/
│   └── pages/
├── public/
│   └── brand/transant-logo.png      immutable approved logo asset
├── src/
│   ├── assets/images/               local source images processed by Astro
│   ├── content/                     existing product inputs; owned by F-002
│   ├── data/color-tokens.json       source color inventory
│   ├── layouts/                      reusable page-wide document shells
│   ├── pages/                       production-only routes
│   └── styles/                      tokens, fonts, reset, type, global, motion
└── tests/
    ├── browser/                     rendered component, responsive, axe, visual
    ├── foundation/                  built-output isolation and remote-host guards
    ├── support/                     canonical viewport contract
    ├── unit/                        pure Vitest checks
    └── visual/                      reviewed Playwright baselines
```

Production uses `src/` as its Astro input. The component lab uses `component-lab/` as a separate Astro input, so fixtures cannot become production routes accidentally. The build-contract tests enforce this boundary.

## Commands

| Command                              | Contract                                                                                                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                           | Production development server                                                                                                                                                                                                            |
| `pnpm dev:lab`                       | Isolated component-lab development server on port 4322                                                                                                                                                                                   |
| `pnpm build`                         | Static production build in `dist/`                                                                                                                                                                                                       |
| `pnpm build:lab`                     | Static lab build in `dist-component-lab/`                                                                                                                                                                                                |
| `pnpm format:check`                  | Formatting gate; pre-existing content records are excluded                                                                                                                                                                               |
| `pnpm lint`                          | ESLint for Astro, TypeScript, and configuration modules                                                                                                                                                                                  |
| `pnpm typecheck`                     | Strict Astro and TypeScript diagnostics                                                                                                                                                                                                  |
| `pnpm test:unit`                     | Pure viewport-contract tests                                                                                                                                                                                                             |
| `pnpm test:foundation`               | Both builds plus isolation and remote-runtime-host assertions                                                                                                                                                                            |
| `pnpm test:component`                | Lab navigation, server rendering, console, and smoke checks                                                                                                                                                                              |
| `pnpm test:responsive`               | Overflow and compact/wide composition checks at every project width                                                                                                                                                                      |
| `pnpm test:a11y`                     | axe WCAG scan at every project width                                                                                                                                                                                                     |
| `pnpm test:visual`                   | Compare all reviewed visual baselines                                                                                                                                                                                                    |
| `pnpm test:visual:update`            | Regenerate baselines for deliberate, reviewed visual changes                                                                                                                                                                             |
| `pnpm test:browser`                  | All component-lab Playwright tests                                                                                                                                                                                                       |
| `pnpm quality`                       | CI-ready aggregate gate                                                                                                                                                                                                                  |
| `pnpm check:route-integration`       | Static-output crawl for empty links, missing internal targets, fragments, orphaned public routes, and all ten product routes; run after `pnpm build`                                                                                     |
| `pnpm check:performance-integration` | Built-output route/image/script/motion budgets plus mobile Lighthouse lab evidence for homepage, catalogue, widest-data product, and contact; run after `pnpm build`                                                                     |
| `pnpm check:content-brand-audit`     | Static-output audit for all five source families and ten source-preserved product routes, provenance, immutable logo digest/use, placeholder destinations, and the explicit contact/privacy publication boundary; run after `pnpm build` |
| `pnpm check:deployment-readiness`    | Static deployment policy/output audit for headers, preview crawler policy, local resources, route count, same-site form boundary, and analytics absence; run after `pnpm build`                                                          |
| `pnpm prepare:release-output`        | Uses Vercel's environment to keep previews no-indexed or writes the production sitemap and robots policy from the approved production origin                                                                                             |

Astro telemetry is disabled in scripted checks so validation never needs to write user-level preferences. Playwright builds the component lab and serves its static output before browser assertions. Test output and traces stay under `output/playwright/`.

`check:route-integration` intentionally reads the completed production `dist/` tree and never opens a browser or contacts external hosts. It follows internal anchors from `/`, verifies generated local document/static-file targets and named fragments, requires every public generated page to be reachable, and treats `404.html` as the special recovery document rather than an intentionally linked public route. External, mail, and telephone destinations remain outside this static availability check.

`check:performance-integration` uses the same completed production `dist/` tree, then serves it only on ephemeral loopback ports for the local mobile Lighthouse run. Its exact route set, budgets, local/field boundary, and exception rule are documented in [the I-004 performance integration contract](../docs/specifications/performance-integration.md).

`check:content-brand-audit` reads the same completed production output and source catalogue without contacting an external host. It proves the five-family/ten-product coverage set, preserves every listed product name, code, and technical display value verbatim, verifies provenance and the immutable logo digest, rejects unsafe published destinations and unfinished copy, and records that contact delivery remains blocked until a provider is configured. It does not turn that explicit boundary into form-delivery or legal approval evidence.

`check:deployment-readiness` verifies the repository-owned static release boundary without deploying: Vercel configuration and cache/security headers, Astro's hash-based CSP, preview no-index policy, local resources, public-route count, contact-delivery boundary, and analytics absence. `prepare:release-output` preserves preview no-index behavior and derives production sitemap/robots output from Vercel's production URL, with an explicit `PUBLIC_SITE_URL` override for approved local simulations. See [the I-006 deployment-readiness contract](../docs/specifications/deployment-readiness.md) for the commercial-plan gate, Vercel handoff, form/analytics limits, hosted-preview smoke, and rollback procedure.

## Component lab and responsive evidence

- Index: `http://127.0.0.1:4322/`
- Foundation fixture: `http://127.0.0.1:4322/fixtures/smoke/`
- BrandLogo fixture: `http://127.0.0.1:4322/fixtures/brand-logo/`
- Action fixture: `http://127.0.0.1:4322/fixtures/action/`
- SectionIntro fixture: `http://127.0.0.1:4322/fixtures/section-intro/`
- ResponsiveMedia fixture: `http://127.0.0.1:4322/fixtures/responsive-media/`
- RailSequence fixture: `http://127.0.0.1:4322/fixtures/rail-sequence/`
- SiteHeader fixture: `http://127.0.0.1:4322/fixtures/site-header/`
- Repeated SiteHeader fixture: `http://127.0.0.1:4322/fixtures/site-header-repeated/`
- SiteFooter fixture: `http://127.0.0.1:4322/fixtures/site-footer/`
- HomeHero fixture: `http://127.0.0.1:4322/fixtures/home-hero/`
- RailwayOrbital fixture: `http://127.0.0.1:4322/fixtures/railway-orbital/`
- PayloadValueSection fixture: `http://127.0.0.1:4322/fixtures/payload-value-section/`
- WagonSwitchyard fixture: `http://127.0.0.1:4322/fixtures/wagon-switchyard/`
- ModularPlatformSection fixture: `http://127.0.0.1:4322/fixtures/modular-platform-section/`
- OperationalCaseStudy fixture: `http://127.0.0.1:4322/fixtures/operational-case-study/`
- CollaborationProcess fixture: `http://127.0.0.1:4322/fixtures/collaboration-process/`
- QualityImpactSection fixture: `http://127.0.0.1:4322/fixtures/quality-impact-section/`
- ContactCTA fixture: `http://127.0.0.1:4322/fixtures/contact-cta/`
- Breadcrumbs fixture: `http://127.0.0.1:4322/fixtures/breadcrumbs/`
- WagonFamilyIndex fixture: `http://127.0.0.1:4322/fixtures/wagon-family-index/`
- WagonModelList fixture: `http://127.0.0.1:4322/fixtures/wagon-model-list/`
- ProductHero fixture: `http://127.0.0.1:4322/fixtures/product-hero/`
- CargoFit fixture: `http://127.0.0.1:4322/fixtures/cargo-fit/`
- SpecificationGroup fixture: `http://127.0.0.1:4322/fixtures/specification-group/`
- LoadLimitTable fixture: `http://127.0.0.1:4322/fixtures/load-limit-table/`
- DownloadList fixture: `http://127.0.0.1:4322/fixtures/download-list/`
- RelatedWagons fixture: `http://127.0.0.1:4322/fixtures/related-wagons/`
- PageHero fixture: `http://127.0.0.1:4322/fixtures/page-hero/`
- MediaStory fixture: `http://127.0.0.1:4322/fixtures/media-story/`
- EvidenceList fixture: `http://127.0.0.1:4322/fixtures/evidence-list/`
- ContactForm fixture: `http://127.0.0.1:4322/fixtures/contact-form/`
- Contact-page assembly fixture: `http://127.0.0.1:4322/fixtures/contact/`
- Legal-page fixtures: `http://127.0.0.1:4322/fixtures/legal/{privacy,imprint}/`
- 404-page fixture: `http://127.0.0.1:4322/fixtures/system-404/`
- BaseLayout fixture: `http://127.0.0.1:4322/fixtures/base-layout/`
- Homepage assembly fixture: `http://127.0.0.1:4322/fixtures/homepage/`
- Catalogue assembly fixture: `http://127.0.0.1:4322/fixtures/catalogue/`
- Editorial assembly fixtures: `http://127.0.0.1:4322/fixtures/editorial/{technology,projects,company,quality,sustainability}/`
- Canonical projects: 320 x 720, 390 x 844, 768 x 1024, 1024 x 768, and 1440 x 900 CSS pixels.
- Exploratory project: 844 x 390 phone landscape.

The reusable `expectNoPageOverflow` helper compares root and body scroll widths with their client widths. The smoke fixture proves a single-column compact composition at 320 and 390 pixels and a three-column wide composition at 1440 pixels. All projects capture deterministic full-page visual baselines with reduced motion enabled.

I-002 defines the complete release-page review matrix in `tests/support/page-review-routes.ts`. `responsive-visual-integration.spec.ts` uses that matrix to check every page fixture at the canonical widths and phone landscape, exploratory 360/430 px modes, and representative 200% text zoom; its selected full-page screenshots use the `i-002-` prefix. The authorized batch defers executing and manually reviewing this browser/visual evidence until the I-003 checkpoint; see [`docs/specifications/responsive-visual-integration.md`](../docs/specifications/responsive-visual-integration.md).

I-003 adds `tests/browser/accessibility-integration.spec.ts`: every declared release fixture receives WCAG 2.0/2.1/2.2 A/AA axe coverage and must retain exactly one focusable main landmark plus its skip route. Its route-level keyboard checks cover skip-link focus transfer, compact header focus/inert/Escape behavior, labelled technical-table focus, and contact-form error focus/status. The explicit reduced-motion homepage case verifies that static content remains visible and contained. See [`docs/specifications/accessibility-integration.md`](../docs/specifications/accessibility-integration.md) for the automated boundary and required reviewer checklist.

For a manual keyboard review, open the Action fixture, press Tab, and confirm that its `Component lab` link, enabled links, and enabled buttons receive an unclipped visible focus ring in source order; disabled controls are skipped. No fixture content or navigation depends on JavaScript.

## Production route assembly

The production locale registry exposes English, German, Ukrainian, Polish, and
Czech. Ukrainian, Polish, and Czech use complete local static route trees under
`/uk/`, `/pl/`, and `/cs/`, retain the current page when switching languages,
and consume caller-owned shell, editorial, catalogue, product, technical-table,
contact, accessibility, and legal copy from the localization adapters. Product
codes, measurements, standards, registered details, contact facts, and source
references remain source-preserved. Translation publication still requires the
recorded owner/legal language review; the application does not treat local
rendering as that external approval.

`src/pages/index.astro` assembles the release-one homepage from `BaseLayout` and H-001 through H-009 only. Its route-owned values live in `src/adapters/content/homepage-view-model.ts`, which imports reviewed local assets and preserves the catalogue strings and public-research source boundaries. The component-lab homepage fixture repeats that composition against the same view model for deferred A-004 browser, responsive, accessibility, and visual evidence; it is not a production route.

`src/pages/wagons/index.astro` and `src/pages/wagons/[family].astro` assemble the release-one catalogue index and five static family pages. `src/adapters/content/catalogue-view-model.ts` validates the aggregate source contract, resolves every logical product image path through reviewed local asset imports, and supplies route metadata, breadcrumbs, family summaries, and direct product routes to `BaseLayout`, `PageHero`, `WagonFamilyIndex`, and `WagonModelList`. The matching catalogue fixture has one index route and five family routes; its browser, responsive, accessibility, and visual evidence definitions are deferred to the authorized A-004 checkpoint.

`src/pages/wagons/[family]/[product].astro` assembles exactly ten source-defined product routes from one nested dynamic template. `src/adapters/content/product-view-model.ts` maps validated source content and reviewed local render metadata to `BaseLayout`, `Breadcrumbs`, `ProductHero`, `CargoFit`, two source-preserving `SpecificationGroup` sections, source-present `LoadLimitTable`, honest unavailable `DownloadList`/`RelatedWagons` states, and `ContactCTA`. Shared `catalogue-data.ts` isolates source parsing/local media resolution, while `site-shell-view-model.ts` provides the route-owned document shell. The component-lab mirrors the same dynamic route under `/fixtures/products/{family}/{product}/`; it is excluded from production output.

`src/pages/[page].astro` generates the five release-one editorial routes: `/technology/`, `/projects/`, `/company/`, `/quality/`, and `/sustainability/`. `src/adapters/content/editorial-page-view-model.ts` is the route-owned source boundary: it supplies explicit shell data, source-derived copy, reviewed local media, certificate links, and intentionally bounded case-study facts to `BaseLayout`, `PageHero`, `MediaStory`, `EvidenceList`, `OperationalCaseStudy`, and `ContactCTA`. It publishes neither current operational claims, unconfirmed ownership/team data, nor generic sustainability assertions. The isolated matching routes are `/fixtures/editorial/{technology,projects,company,quality,sustainability}/`; their browser/responsive/accessibility/visual evidence definition is deferred to the authorized I-003 checkpoint.

`src/pages/{contact,privacy,imprint,404}.astro` provides the remaining release-one Contact, legal, and recovery routes. `src/adapters/content/legal-page-view-model.ts` owns their explicit metadata and source boundaries. Contact composes `PageHero` and `ContactForm` against the deliberately unconfigured same-site delivery endpoint. Privacy describes the current Vercel-hosted, analytics-free service boundary and business-enquiry handling. Imprint translates the publishable German company record, which controls over the old English site's incorrect legal-form label; `LegalDocument` keeps both legal routes as readable, source-ordered H2 sections. The owner or counsel must approve the adapted English legal copy before production. The 404 route offers direct homepage, catalogue, and contact recovery links without illustration or animation. Matching fixtures are `/fixtures/contact/`, `/fixtures/legal/{privacy,imprint}/`, and `/fixtures/system-404/`.

## Styling and assets

`src/styles/global.css` declares the cascade order and composes the token, local-font, reset, type, focus, global, and reduced-motion layers. No licensed webfont binaries have been approved yet, so `fonts.css` uses local system font sources with explicit system fallbacks and never requests a remote font host.

Image strings in product data are logical paths rooted at `src/assets/images/`. F-002 must resolve them through one typed asset adapter so presentation components receive local image metadata rather than raw paths.

The `public/` directory is reserved for files that must be copied byte-for-byte. Do not place large photographic or wagon-render masters there. The TransANT logo must remain byte-identical to the approved source:

```text
SHA-256 fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985
520 x 114 px
```
