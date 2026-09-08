# V7 component-first development plan

## Document control

| Field                  | Value                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Status                 | Ready for implementation                                                                |
| Version                | 1.0                                                                                     |
| Date                   | 2026-09-04                                                                              |
| Intended implementer   | GPT-5.6 Terra or an equivalent coding agent                                             |
| Delivery target        | Production-ready first release within seven working days                                |
| Visual baseline        | `prep/design/stitch-generations/v7/stitch_transant_b2b_website_redesign (6)/screen.png` |
| Architecture decision  | [`../technology-stack-decision.md`](../technology-stack-decision.md)                    |
| Product requirements   | [`technical-requirements.md`](technical-requirements.md)                                |
| Mobile requirements    | [`mobile-responsive-design-requirements.md`](mobile-responsive-design-requirements.md)  |
| Implementation tracker | [`component-implementation-status.md`](component-implementation-status.md)              |

## 1. Objective

Build the TransANT website as a library of independent, documented, tested components before assembling any production page.

Every component shall:

- live in its own directory and have one primary component file;
- expose a typed, serializable public interface;
- render and be testable without neighbouring page sections;
- receive content through props or slots instead of reading page data directly;
- preserve meaningful content and links when client JavaScript is unavailable;
- own only its styles and optional client behaviour;
- include focused automated tests and component documentation;
- be portable to another Astro project with its documented dependencies;
- be marked complete only after implementation, tests, isolated visual verification, and documentation are all present.

Production page assembly starts only after the required components have reached `VERIFIED` in the implementation tracker.

## 2. Source hierarchy and boundaries

When sources disagree, use this order:

1. This plan and its implementation tracker.
2. The mobile and responsive design requirements.
3. The current technical requirements and technology ADR.
4. Approved product content in `website/src/content/` and verified client-supplied media.
5. V7 `screen.png` for composition, hierarchy, spacing, and visual character.
6. V7 `code.html` and `DESIGN.md` only as references for identifying regions and approximate design values.
7. Older Stitch generations only as rejected-history context.

V7 is a design reference, not production source code. Do not copy its Tailwind CDN setup, inline JavaScript, remote Google image URLs, placeholder destinations, or unverified marketing claims.

The competitor prototype may be used for client-provided text, wagon tables, and client-authorized images. Its visual design and source implementation must not be copied. The TransANT logo is immutable: do not redraw, recolour, crop, distort, animate, or add effects to it.

## 3. Confirmed first-release decisions

- Astro static generation, strict TypeScript, native CSS, and progressively enhanced JavaScript.
- No React, Vue, Svelte, Tailwind runtime/CDN, or site-wide SPA runtime.
- No search, catalogue filtering, comparison tool, or configurator in release one.
- Five wagon-family destinations and ten product pages are reachable through ordinary server-rendered links.
- English is the launch locale. German routes remain gated until translated and approved.
- Use local, optimized media only in production output.
- The hero image remains static.
- The Railway Orbital is a separate, abstract railway-related accent. It may animate subtly, but never carries essential meaning.
- The Wagon Switchyard is the signature interactive section and receives the strongest dark-blue treatment.
- CSS and SVG are the default motion tools. Introduce GSAP only when a written component decision shows that CSS or the Web Animations API is insufficient.

## 4. V7 analysis and component map

V7 has a clear editorial sequence: promise, engineering rationale, product families, platform explanation, proof, process, assurance, and contact. The page should keep that rhythm. It should not be converted into a dashboard, card wall, search interface, or product configurator.

| V7 region                                | Production component     | Responsibility                                                   |
| ---------------------------------------- | ------------------------ | ---------------------------------------------------------------- |
| Fixed white top navigation               | `SiteHeader`             | Primary navigation, locale link, contact action, responsive menu |
| Logo in header/footer                    | `BrandLogo`              | Byte-safe rendering of the immutable brand asset                 |
| Red and text links                       | `Action`                 | Consistent accessible link/button variants                       |
| Hero with left copy and right rail image | `HomeHero`               | Main value proposition and primary conversion action             |
| Abstract railway orbit                   | `RailwayOrbital`         | Decorative engineering motion, isolated from content             |
| “Engineered for more useful payload”     | `PayloadValueSection`    | Engineering proposition and three supporting principles          |
| Dark-blue five-family selector           | `WagonSwitchyard`        | Browse five family summaries and follow direct catalogue links   |
| “Modular Platform Equation”              | `ModularPlatformSection` | Explain the four platform stages                                 |
| Four-step horizontal process             | `RailSequence`           | Reusable ordered process primitive                               |
| Erzberg case study                       | `OperationalCaseStudy`   | Evidence-led project story with approved image and facts         |
| “From transport task…” process           | `CollaborationProcess`   | Explain the client engagement sequence                           |
| Compliance and impact columns            | `QualityImpactSection`   | Present approved certifications and quality evidence             |
| Centred final inquiry area               | `ContactCTA`             | Route users to the contact flow with context                     |
| Dark-blue closing navigation             | `SiteFooter`             | Secondary navigation, company contact, legal links               |
| Repeated eyebrow/title/intro pattern     | `SectionIntro`           | Shared semantic section heading primitive                        |
| Repeated responsive pictures             | `ResponsiveMedia`        | Local responsive image and caption contract                      |

The homepage therefore uses 16 reusable components: five primitives, two shell components, and nine homepage-specific sections. The full site adds catalogue, product-detail, editorial, evidence, download, and form components in later stages.

## 5. Target directory structure

```text
website/
├── astro.config.mjs
├── astro.component-lab.config.mjs
├── package.json
├── tsconfig.json
├── component-lab/
│   ├── fixtures/
│   ├── layouts/ComponentLabLayout.astro
│   └── pages/
│       └── [component].astro
├── src/
│   ├── assets/
│   │   ├── editorial/
│   │   └── products/
│   ├── components/
│   │   ├── primitives/
│   │   ├── shell/
│   │   ├── home/
│   │   ├── catalogue/
│   │   ├── product/
│   │   ├── editorial/
│   │   └── forms/
│   ├── content/
│   ├── data/
│   │   ├── navigation.ts
│   │   └── site.ts
│   ├── layouts/
│   ├── lib/
│   │   ├── content/
│   │   ├── validation/
│   │   └── motion/
│   ├── pages/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   ├── typography.css
│   │   └── motion.css
│   └── content.config.ts
├── public/
│   ├── brand/
│   ├── downloads/
│   └── fonts/
├── tests/
│   ├── accessibility/
│   ├── components/
│   ├── content/
│   ├── e2e/
│   └── visual/
└── docs/
    └── components/
```

### 5.1 Per-component file contract

```text
src/components/<group>/<ComponentName>/
├── <ComponentName>.astro          # one primary render file
├── <ComponentName>.css            # root-scoped component styles
├── <ComponentName>.types.ts       # public props and exported data contracts
├── <ComponentName>.client.ts      # optional progressive enhancement controller
├── <ComponentName>.logic.test.ts  # optional pure TypeScript unit tests
└── README.md                       # usage and portability documentation
```

Rendered-browser tests live in `tests/components/<ComponentName>.spec.ts`. Keeping browser tests outside the component folder prevents test-runner configuration from becoming a runtime dependency while the component itself remains a complete, identifiable module.

## 6. Component independence rules

1. A page section may import primitives, shared types, and pure utilities. It must not import another page section.
2. A component must not read content collections, files, environment variables, global navigation, or the current URL. The page or adapter provides its data.
3. Public props shall be immutable, serializable, and documented. Avoid callbacks in server-rendered interfaces; use standard links, forms, slots, or documented DOM events.
4. Component selectors shall be root-scoped. No component may style bare global elements outside its root.
5. The component must render in the isolated component lab using fixtures only.
6. Essential headings, text, specifications, links, images, and form controls must exist in server-rendered HTML.
7. Client controllers must initialize per component root, tolerate multiple instances, avoid global mutable state, and provide deterministic cleanup where listeners or observers are used.
8. Components must not hardcode locale, product count, analytics provider, form recipient, or deployment URL.
9. Optional content must have a deliberate empty-state behaviour documented in the README.
10. Every external dependency, token, slot, event, asset requirement, and browser API must be listed in the component README.
11. Motion is decorative enhancement. `prefers-reduced-motion: reduce` must remove continuous motion and preserve understandable state changes.
12. Copy and claim values remain outside presentation components so the same component can be reused with another approved dataset.

## 7. Shared design-token contract

The initial token layer shall reconcile `website/src/styles/tokens.css` and `website/src/data/color-tokens.json` with the V7 palette:

| Role           | Initial value | Use                                                       |
| -------------- | ------------- | --------------------------------------------------------- |
| Brand red      | `#DC1C3B`     | Primary action, controlled emphasis, switchyard indicator |
| Brand blue     | `#2B538B`     | Links and existing brand-compatible blue accents          |
| Technical blue | `#1C6F9C`     | Diagrams and technical secondary accents                  |
| Railway navy   | `#102E49`     | Wagon Switchyard primary background                       |
| Railway blue   | `#163B5A`     | Active surfaces and layered dark-blue panels              |
| Railway border | `#356789`     | Dark-section separators and control borders               |
| Railway muted  | `#6F98B5`     | Secondary technical labels on navy                        |
| Railway pale   | `#B8D0E0`     | Supporting copy on navy                                   |
| Footer navy    | `#0B2235`     | Footer background                                         |

Also define tokens for typography, spacing, content widths, grid gutters, radii, borders, focus rings, motion duration/easing, and z-index roles. Components consume semantic tokens; they do not duplicate raw values except for documented asset-specific SVG colours.

The approved logo shall be placed at `public/brand/transant-logo.png`. Record its SHA-256 digest in brand documentation and assert that digest in an automated brand-integrity test.

## 8. Universal definition of done

A component reaches `VERIFIED` only when every applicable item is true.

### Implementation

- The public interface and behaviour match this plan.
- The primary component is in its own file and folder.
- No dependency on neighbouring sections exists.
- No remote runtime asset, placeholder link, or unverified claim was introduced.
- No essential function depends on JavaScript.
- TypeScript passes in strict mode.

### Responsive behaviour

- Verified at 320, 390, 768, 1024, and 1440 CSS pixels.
- No accidental horizontal overflow or clipped focus indicator.
- Long English content and a 30% copy-expansion fixture remain usable.
- Container behaviour works outside the homepage’s exact column width.
- Compact composition, source order, touch behavior, permitted overflow, and image crop follow [`mobile-responsive-design-requirements.md`](mobile-responsive-design-requirements.md).
- The 320 and 390 px states are designed and reviewed during the component package; they are not deferred until page integration.

### Accessibility

- Semantic structure and heading level are controllable by the caller.
- Keyboard navigation, focus visibility, and focus order are verified.
- Interactive targets are at least 44 by 44 CSS pixels where practical.
- Names, roles, states, alternative text, errors, and status messages are correct.
- Automated axe scan has no serious or critical issue.
- Reduced-motion behaviour is tested for every animated component.

### Tests

- Pure data transformation and controller logic are covered by Vitest where applicable.
- Rendered behaviour is covered in the component lab with Playwright.
- At least one failure or boundary case is tested, not only the happy path.
- A focused visual baseline exists for components whose identity depends on layout or motion state.
- Tests do not depend on external network resources.

### Documentation

- `README.md` follows the template in section 14.
- It contains a minimal standalone example.
- Props, slots, events, tokens, assets, states, accessibility, motion, and limitations are documented.
- Portability steps and dependencies are explicit.

### Evidence

- Focused test command and result are recorded in the tracker.
- Shared typecheck and component-lab build pass.
- Review date and evidence paths are recorded.

`IMPLEMENTED` means code exists. It does not mean complete. `VERIFIED` is the only completion status.

## 9. Stage 1 — foundation and isolated component lab

### F-001 — Astro project and testing foundation

Create the production Astro application without deleting current content or media.

Deliverables:

- exact stable Astro 7 patch, Node 22, pnpm 10, strict TypeScript, formatting, linting, and build scripts;
- production `astro.config.mjs` and a separate `astro.component-lab.config.mjs` with an isolated input and output directory;
- Vitest, Playwright, and axe integration;
- Playwright projects for the canonical 320, 390, 768, 1024, and 1440 px widths, plus reusable page-overflow and phone-landscape checks;
- base token, reset, type, global, and reduced-motion style sheets;
- local font loading with system fallbacks;
- CI-ready commands for typecheck, unit, component, accessibility, visual, build, and aggregate quality checks.

Required tests:

- production build excludes component-lab routes and fixtures;
- component-lab build renders its index and one smoke fixture;
- the smoke fixture renders without page-level overflow at 320 and 390 px and preserves its intended wide state at 1440 px;
- no built page depends on Google image/font hosts;
- browser console contains no uncaught error on the smoke fixture.

### F-002 — content schemas and view-model adapters

Define schemas for site settings, navigation, wagon families, products, projects, pages, downloads, evidence, and claims. Preserve ordered engineering rows and source attribution.

Required tests:

- all five families and ten current products parse successfully;
- invalid required fields, duplicate slugs, unsafe external URLs, and malformed load rows fail the build;
- display adapters never silently change units, decimals, or engineering values;
- claims marked draft or unverified cannot enter production view models.

## 10. Stage 2 — primitive components

### C-001 — `BrandLogo`

Interface: `src`, `alt`, `href?`, `width`, `height`, `tone`, `priority?`.

Plan:

- render the exact approved bitmap without transformation;
- use an ordinary link only when `href` is provided;
- support light and dark container contexts through surrounding whitespace, not image modification.

Tests: asset digest, intrinsic dimensions, accessible name, linked/unlinked rendering, white and footer visual fixtures, no logo animation or CSS filter.

### C-002 — `Action`

Interface: a discriminated union for link or button semantics, `variant`, `size`, `icon?`, `external?`, `disabled?`.

Plan:

- variants: primary red, secondary outline, text link, inverse;
- never render a clickable `div` or a disabled-looking active link;
- external links receive safe attributes and an accessible indication.

Tests: correct native element, keyboard operation, disabled behaviour, external-link contract, 44-pixel target, focus, hover, high-contrast and dark-context fixtures.

### C-003 — `SectionIntro`

Interface: `eyebrow?`, `title`, `description?`, `headingLevel`, `align`, `theme`, `measure`.

Plan:

- own only the repeated heading lockup, never section background or page layout;
- allow callers to choose a semantically correct heading level;
- support left and centred alignment, light and dark themes.

Tests: every heading level, missing optional fields, long-copy fixture, dark/light contrast, no fixed-height clipping.

### C-004 — `ResponsiveMedia`

Interface: local image metadata, `alt`, `decorative?`, `sizes`, `loading`, `priority`, `fit`, `aspectRatio?`, `caption?`.

Plan:

- generate responsive AVIF/WebP plus a reviewed fallback;
- require either meaningful `alt` or explicit decorative status;
- reserve layout space and expose a caption slot without coupling it to a case-study component.

Tests: generated widths, correct priority/lazy loading, non-zero dimensions, alt validation, missing-image failure, caption association, layout-shift fixture, no remote image source.

### C-005 — `RailSequence`

Interface: `items` containing `number`, `title`, `description`, `href?`; `theme`; `columns`; `label?`.

Plan:

- render an ordered list of two to six stages;
- use the rail/marker line only as decorative styling;
- stack into a readable vertical sequence on narrow containers.

Tests: two/four/six items, list semantics, optional links, long text, light/dark themes, 320-pixel layout, decorative line absent from the accessibility tree.

## 11. Stage 3 — site shell

### C-006 — `SiteHeader`

Interface: `homeHref`, `navigation`, `currentPath`, `localeOptions`, `contactAction`, `sticky?`.

Plan:

- reproduce V7’s calm white header and compact red inquiry action;
- use a progressively enhanced mobile disclosure; primary links remain in the HTML;
- set `aria-current` from provided route data, not browser globals;
- on close, return focus to the trigger; support Escape and outside navigation.

Tests: desktop and mobile fixtures, no-JS link access, current-route semantics, menu keyboard flow, Escape/focus return, repeated instances, 320-to-1440 visual widths, immutable logo assertion.

### C-007 — `SiteFooter`

Interface: `groups`, `contact`, `legalLinks`, `copyright`, `localeOptions?`.

Plan:

- preserve V7’s dark-blue close without copying placeholder data;
- accept verified contact and company information only;
- produce a coherent mobile reading order independent of the visual columns.

Tests: group/list/landmark semantics, phone/email link formatting, missing optional group, long labels, mobile order, focus contrast, no empty destination.

## 12. Stage 4 — homepage components

### H-001 — `HomeHero`

Interface: `eyebrow`, structured `title`, `summary`, `primaryAction`, `secondaryLink?`, `media`.

Plan:

- keep the V7 split editorial layout and typographic red emphasis;
- use one static client-approved railway image; do not animate the hero image;
- ensure the value proposition and action precede the image in source order.

Tests: LCP image priority and dimensions, no client script, title hierarchy, single/multiple emphasis spans, missing optional link, mobile stacking, long-copy fixture, no overlap with sticky header.

### H-002 — `RailwayOrbital`

Interface: `label?`, `motion` (`auto`, `off`), `density`, `accent`.

Plan:

- build a self-contained server-rendered SVG: a small fine-dotted Earth held by three paired railway loops with sleepers and route markers;
- preserve a clear paper gap between the Earth and every rail or marker; do not introduce crypto-network, dashboard, fake-map, or fake-live-data semantics;
- keep it decorative by default; a supplied label changes it to an accessible figure;
- use restrained CSS transform/offset-path motion only after the static state is approved;
- pause continuous work when offscreen and disable it for reduced motion.

Tests: informative/decorative semantics, useful static SVG with JavaScript disabled, reduced-motion state, no infinite motion under reduce, offscreen pause where supported, 320-pixel overflow, deterministic light-background visual baseline.

### H-003 — `PayloadValueSection`

Interface: `intro`, `body`, `principles`, optional `sourceLink`; named `visual` slot.

Plan:

- reproduce the V7 editorial copy/visual split and three lower principles;
- accept `RailwayOrbital` through a slot; never import it directly;
- principles become a semantic list with a one-column narrow-container fallback.

Tests: slot with orbital and alternate image, three/four principles, missing source, long copy, heading hierarchy, independent component-lab rendering.

### H-004 — `WagonSwitchyard`

Public data contract:

```ts
interface WagonFamilySummary {
  id: string;
  sequence: string;
  familyName: string;
  modelCode: string;
  headline: string;
  summary: string;
  image: LocalImage;
  href: string;
  linkLabel: string;
}
```

Plan:

- preserve V7’s navy signature block, large wagon stage, editorial detail panel, red active rail, and five switch stops;
- render all five family links and summaries in HTML; without JavaScript, show the default family plus a readable linked family list;
- enhance the controls into a single-selection tab interface only when the controller loads;
- implement Arrow Left/Right, Home, End, click, visible focus, and correct `aria-selected`/panel association;
- update image, sequence, model, heading, summary, and direct family link as one state transaction;
- use consistent local wagon renders and prevent layout shift between families;
- use a small standalone TypeScript controller. Do not introduce Lit unless the implementation review proves a reusable custom-element boundary is materially better;
- optionally dispatch one documented bubbling `wagon-family-change` event with the selected `id`;
- do not add search, filters, live availability, pricing, configurator behaviour, fake telemetry, or map data.

Required tests:

- all five families and direct links exist in server HTML;
- default family is usable without JavaScript;
- mouse and complete keyboard selection work;
- selection state and visible content remain synchronized;
- rapid repeated selection cannot leave mixed image/text state;
- one and multiple instances do not share state;
- missing optional copy has a deliberate fallback;
- every family produces a focused visual snapshot;
- 320, 390, 768, 1024, and 1440 widths have no overflow or clipped wagon;
- reduced motion removes slide/fade choreography without removing state change;
- no remote image or placeholder `href` is emitted.

### H-005 — `ModularPlatformSection`

Interface: `intro`, `stages`, `technicalLink?`.

Plan: compose `SectionIntro` and `RailSequence` with four approved platform stages. It may import primitives but no homepage section.

Tests: four-stage render, alternate stage count, optional technical link, mobile stacking, source order, long-copy and dark-text contrast.

### H-006 — `OperationalCaseStudy`

Interface: `eyebrow`, `title`, `summary`, `media`, `facts`, `href?`, `download?`.

Plan:

- implement the V7 image/article composition with an evidence-led hierarchy;
- show only facts with approved sources and omit unavailable facts cleanly;
- use a client-supplied image and a real case-study/download destination when available;
- never invent a customer quote, KPI, live status, route map, or PDF.

Tests: zero/one/multiple facts, source labels, optional link/download, image alt and caption, narrow-container order, unverified-claim exclusion, no placeholder destination.

### H-007 — `CollaborationProcess`

Interface: `intro`, `steps`, `contactLink?`.

Plan: use `RailSequence` to express task definition, engineering, production, and delivery support. Copy is provided through props.

Tests: semantic ordered sequence, optional link, four-step and expanded fixtures, narrow layout, link and heading order.

### H-008 — `QualityImpactSection`

Interface: two or more `topics`, each with title, summary, evidence links, and optional certificate metadata.

Plan:

- reproduce V7’s quiet split editorial area;
- distinguish certification, policy, capability, target, and marketing statement in the data model;
- render a single-column layout naturally when only one topic is approved.

Tests: one/two/three topics, evidence-link semantics, invalid certificate metadata rejection, long-copy expansion, mobile order, no unsourced numeric claim.

### H-009 — `ContactCTA`

Interface: `title`, `summary`, `action`, `supportingLinks?`, `context?`.

Plan:

- retain V7’s calm centred conclusion and one dominant action;
- allow a page to pass a product/family context into the contact URL without reading global state;
- avoid an embedded multi-field form on the homepage.

Tests: action and supporting links, context URL encoding, no context, narrow layout, focus order, long text, no empty link.

## 13. Stage 5 — full-site reusable components

### Catalogue components

| ID    | Component          | Implementation and required tests                                                                                                                 |
| ----- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-001 | `Breadcrumbs`      | Ordered navigation with current item; test single/deep paths, structured data, long labels, and no false link on current page.                    |
| P-002 | `WagonFamilyIndex` | Five editorial family rows with direct links; test all families, source order, local images, mobile alternation, and no search/filter dependency. |
| P-003 | `WagonModelList`   | Models within one family using semantic list/article markup; test one/many models, model codes, image fallback, and direct links.                 |

### Product-detail components

| ID    | Component            | Implementation and required tests                                                                                                                                                  |
| ----- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-004 | `ProductHero`        | Family, model, benefit, wagon render, and inquiry action; test title hierarchy, transparent-image bounds, mobile stacking, and context link.                                       |
| P-005 | `CargoFit`           | Approved cargo/use-case content; test absent/short/long lists and prohibit inferred compatibility.                                                                                 |
| P-006 | `SpecificationGroup` | Ordered label/value/unit rows; test missing units, long values, copy expansion, and preserved source order.                                                                        |
| P-007 | `LoadLimitTable`     | Accessible caption, headers, scopes, notes, and horizontal narrow-screen strategy; test keyboard scroll, all current tables, header associations, print, and no normalized values. |
| P-008 | `DownloadList`       | Real files with type/size/language; test missing file failure, download metadata, language labels, and absence of placeholder entries.                                             |
| P-009 | `RelatedWagons`      | Explicit related-product records; test zero/many relations, no self-reference, valid destinations, and responsive list.                                                            |

### Editorial and evidence components

| ID    | Component      | Implementation and required tests                                                                                                        |
| ----- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| E-001 | `PageHero`     | Generic company/engineering-and-services/quality page introduction; test image/no-image, theme, breadcrumbs slot, and heading hierarchy. |
| E-002 | `MediaStory`   | Reversible text/media editorial block; test both orientations, caption, mobile source order, and image absence.                          |
| E-003 | `EvidenceList` | Policies, certifications, documents, and factual references; test evidence types, external/download semantics, dates, and empty state.   |

### Form component

### F-003 — `ContactForm`

Interface: `recipient`, `subject`, `fields`, `privacyNotice`, `submitLabel`, `context?`.

Plan:

- provide name, business email, company, message, consent, and explicit product/family context;
- support native validation and a no-JavaScript `mailto:` fallback;
- progressively enhance a URL-encoded prepared-email body, explicit mail-client handoff status, and input preservation;
- make clear that the website neither sends nor confirms delivery of the enquiry;
- make additional project fields optional unless approved by the client.

Tests: labels/autocomplete, required and invalid states, keyboard submission, no-JS mailto fallback, exact encoded subject/body, prepared-status focus, preserved input, optional company/context, privacy link, and absence of secrets or network delivery in the client bundle.

## 14. Stage 6 — page assembly from verified components

### A-001 — `BaseLayout`

Assemble document metadata, local fonts, skip link, `SiteHeader`, main landmark, and `SiteFooter`. Layout owns page-wide concerns only; it does not contain homepage markup.

Tests: unique title/description/canonical, one main landmark, skip-link operation, valid language, social metadata, favicon, no duplicated heading or navigation ID.

### A-002 — homepage

Assemble the homepage explicitly:

```astro
<BaseLayout>
  <HomeHero {...hero} />
  <PayloadValueSection {...payload}>
    <RailwayOrbital slot="visual" />
  </PayloadValueSection>
  <WagonSwitchyard families={families} />
  <ModularPlatformSection {...platform} />
  <OperationalCaseStudy {...caseStudy} />
  <CollaborationProcess {...process} />
  <QualityImpactSection topics={topics} />
  <ContactCTA {...contactCta} />
</BaseLayout>
```

Acceptance:

- desktop composition remains recognizably V7 while mobile is intentionally redesigned, not merely shrunk;
- any section can be removed without breaking adjacent sections;
- no section markup is duplicated in the page file;
- initial client JavaScript is limited to the switchyard controller and optional orbital visibility/motion enhancement;
- all page content and navigation remain readable without JavaScript.

### A-003 — catalogue and family pages

Build `/wagons/` plus five family routes with `PageHero`, `Breadcrumbs`, `WagonFamilyIndex`, and `WagonModelList`. Use direct browsing. Do not add filters in release one.

### A-004 — ten product pages

Generate all product routes from one template using `ProductHero`, `CargoFit`, `SpecificationGroup`, `LoadLimitTable`, `DownloadList`, `RelatedWagons`, and `ContactCTA`. No manually duplicated product page implementations.

### A-005 — editorial pages

Assemble PRO Platform Projects, Projects/References, Company, and Quality pages from `PageHero`, `MediaStory`, `EvidenceList`, `OperationalCaseStudy`, and `ContactCTA`. PRO Platform Projects is canonical at `/pro-platform-projects/`; `/engineering-services/` and `/technology/` are retained only as permanent legacy redirects. Never force a homepage component into a page when its information model does not fit. Sustainability is not a release-one route.

### A-006 — contact, legal, and system pages

Build Contact, Privacy, Imprint, and 404 pages. The contact page uses `ContactForm`; legal pages use approved text; 404 offers direct recovery routes.

## 15. Stage 7 — integration and release work packages

| ID    | Work package                      | Completion evidence                                                                                                              |
| ----- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| I-001 | Route and link integration        | Automated crawl has no internal 404, empty `href`, unreachable product, or orphaned page.                                        |
| I-002 | Responsive and visual integration | Representative 320/390/768/1024/1440 page screenshots reviewed; no overflow; V7 hierarchy retained.                              |
| I-003 | Accessibility integration         | Automated axe coverage plus manual keyboard, zoom, focus, landmarks, tables, and reduced-motion review.                          |
| I-004 | Performance integration           | Optimized local assets, route budgets, no unnecessary hydration, stable layout, and Lighthouse evidence on representative pages. |
| I-005 | Content and brand audit           | All claims sourced/approved, all ten product records checked, logo digest unchanged, legal/contact placeholders blocked.         |
| I-006 | Deployment readiness              | Vercel preview, form environment contract, headers, redirects, sitemap, robots, analytics consent decision, rollback notes.      |

## 16. Testing architecture

Do not base the test suite on Astro’s Container API because it is experimental and the ADR forbids experimental first-release dependencies.

Use a separate component-lab Astro build and test the rendered output in a real browser with Playwright. Use Vitest only for pure TypeScript functions, view-model adapters, validation, and isolated controller state that does not require browser rendering.

| Layer              | Tool                                   | Purpose                                                    |
| ------------------ | -------------------------------------- | ---------------------------------------------------------- |
| Static correctness | Astro check + TypeScript               | Props, content schemas, imports, strict types              |
| Pure logic         | Vitest                                 | Adapters, validators, formatting, selection reducer        |
| Isolated rendering | Component lab + Playwright             | Semantics, styles, keyboard, progressive enhancement       |
| Accessibility      | axe with Playwright + manual checklist | Automated rules plus focus, zoom, motion, table review     |
| Visual identity    | Playwright screenshots                 | Focused stable states, themes, responsive breakpoints      |
| Page journeys      | Playwright                             | Navigation, catalogue/product routes, inquiry, no-JS paths |
| Content integrity  | Build-time tests                       | Products, claims, sources, local assets, downloads, links  |
| Performance        | Build inspection + Lighthouse          | Script/image budgets and representative route metrics      |

References: [Astro testing guide](https://docs.astro.build/en/guides/testing/), [Astro Container API status](https://docs.astro.build/en/reference/container-reference/), [Playwright documentation](https://playwright.dev/docs/intro), [axe Playwright integration](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright).

## 17. Component README template

Every component README shall contain these headings:

1. Purpose.
2. Visual source and non-copying boundary.
3. Public interface.
4. Props.
5. Slots.
6. Events.
7. Tokens and CSS contract.
8. Asset requirements.
9. Variants and states.
10. Responsive behaviour.
11. Accessibility behaviour.
12. Motion and reduced-motion behaviour.
13. Content and claim rules.
14. Minimal standalone example.
15. Test commands and covered cases.
16. Portability instructions.
17. Known limitations.

Use `None` explicitly rather than omitting inapplicable sections. This makes component contracts comparable and prevents hidden dependencies.

For heading 10, record semantic source order, compact/wide-mobile/tablet/desktop composition, container thresholds, minimum width, touch behavior, deliberate overflow, responsive media, and exact fixture routes as required by the mobile specification.

## 18. Terra execution protocol

Terra shall implement exactly one numbered work package per task/turn unless the user explicitly requests a larger batch. Root `AGENTS.md`, `STATUS.md`, and `CHANGELOG.md` define the durable harness and take precedence for operational state.

For every package:

1. Read root `STATUS.md`, the latest 120 lines of `CHANGELOG.md`, this plan, and the selected tracker row.
2. Run `agent/scripts/validate-state.sh` and `agent/scripts/validate-inputs.sh`, then select the active package or the recorded next eligible package whose prerequisites are `VERIFIED`.
3. Inspect existing files and preserve unrelated user work.
4. Write or update the public interface before visual implementation.
5. Create the isolated component-lab fixture.
6. Implement the server-rendered state first.
7. Add optional progressive enhancement.
8. Add focused unit, browser, accessibility, and visual tests as applicable.
9. Write the component README from the required template.
10. Run focused tests, shared typecheck, and component-lab build.
11. Update only that tracker row with honest status and evidence; synchronize `STATUS.md` and append the complete handoff to `CHANGELOG.md`.
12. Run both validators and stop. Do not begin the next package automatically.

Recommended task prompt:

```text
Implement work package <ID> from docs/specifications/v7-component-development-plan.md.
Follow docs/specifications/component-implementation-status.md and complete only this
package. Preserve existing files, satisfy the full component definition of done, run
the required checks, and update that package's tracker row with exact evidence. Do not
assemble production pages or start a neighbouring component unless the selected package
explicitly requires it.
```

## 19. Dependency order

```text
F-001 project and component lab
├── F-002 content schemas and adapters
├── C-001 BrandLogo
├── C-002 Action
├── C-003 SectionIntro
├── C-004 ResponsiveMedia
└── C-005 RailSequence
    ├── C-006 SiteHeader      (C-001, C-002)
    ├── C-007 SiteFooter      (C-001, C-002)
    ├── H-001 HomeHero        (C-002, C-004)
    ├── H-002 RailwayOrbital
    ├── H-003 PayloadValue    (C-003)
    ├── H-004 WagonSwitchyard (C-002, C-004, F-002)
    ├── H-005 ModularPlatform (C-002, C-003, C-005)
    ├── H-006 CaseStudy       (C-002, C-004, F-002)
    ├── H-007 Collaboration   (C-002, C-003, C-005)
    ├── H-008 QualityImpact   (C-002, C-003, F-002)
    └── H-009 ContactCTA      (C-002, C-003)
        └── A-001 BaseLayout  (C-006, C-007)
            └── A-002 Homepage (all H components)

F-002 + primitives
├── P-001 ... P-009
├── E-001 ... E-003
└── F-003 ContactForm
    ├── A-003 Catalogue/families
    ├── A-004 Product pages
    ├── A-005 Editorial pages
    └── A-006 Contact/legal/system
        └── I-001 ... I-006 release integration
```

## 20. Seven-day delivery sequence

| Day | Target                                                                                         |
| --- | ---------------------------------------------------------------------------------------------- |
| 1   | F-001, F-002, tokens, and C-001 through C-005                                                  |
| 2   | C-006, C-007, H-001, H-002, H-003, and H-004                                                   |
| 3   | H-005 through H-009, A-001, and A-002 homepage assembly                                        |
| 4   | P-001 through P-009, A-003, and A-004 catalogue/product routes                                 |
| 5   | E-001 through E-003, F-003, A-005, and A-006                                                   |
| 6   | I-001 through I-005: link, responsive, accessibility, performance, content, and brand QA       |
| 7   | I-006 preview deployment, form integration, client review fixes, final regression, and handoff |

This is an aggressive schedule. Component portability and tests are not optional schedule buffers. If content approval or an approved external dependency is blocked, record the blocker and finish all source-derived work without inventing production evidence.

## 21. Final release gate

The release is complete only when:

- every required tracker row is `VERIFIED` or is explicitly deferred outside release one;
- production pages are assembled solely from documented components and layouts;
- all five wagon families and ten product pages are reachable and source-correct;
- no prototype runtime code, remote Stitch asset, placeholder destination, or unverified claim remains;
- the immutable logo matches its recorded digest;
- core navigation, content, tables, downloads, and contact submission have working no-JavaScript paths;
- responsive, accessibility, performance, content, and brand evidence is recorded;
- Vercel preview and production configuration are documented with a rollback procedure and a commercial-use plan gate.
