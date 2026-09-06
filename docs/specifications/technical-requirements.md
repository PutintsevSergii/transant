# TransANT website technical requirements

## Document control

| Field                 | Value                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| Status                | Draft for project approval                                                            |
| Version               | 0.1                                                                                   |
| Date                  | 2026-09-03                                                                            |
| Target release        | Production website within seven calendar days                                         |
| Architecture decision | [ADR-001](../technology-stack-decision.md)                                            |
| Product data model    | [Website content model](../website-content-model.md)                                  |
| Brand constraints     | [Visual style guide](../visual-style-guide.md)                                        |
| Mobile contract       | [Mobile and responsive design requirements](mobile-responsive-design-requirements.md) |

## 1. Purpose

The project shall deliver an original, fast, accessible, multilingual-ready corporate and product-catalogue website for TransANT. The website shall improve the presentation of the existing brand, support the supplied wagon catalogue, minimize recurring infrastructure cost, and provide a safe path to later editorial and application features.

The words **shall** and **must** identify release requirements. **Should** identifies a preferred implementation that may change after documented review.

## 2. Binding constraints

- The client-supplied TransANT logo is immutable. The implementation shall not redraw, retype, recolor, crop, distort, rearrange, decorate, or animate the logo or its internal elements.
- The competitor prototype shall not supply the website design, markup, CSS, JavaScript, component structure, responsive behavior, or interaction patterns.
- Client-supplied wagon images, product text, specifications, and tables may be used.
- Every published technical, environmental, ownership, certification, and performance claim shall have a recorded source and approval status.
- Unsupported claims shall remain hidden or explicitly marked for internal review; placeholder assertions shall not be published.
- Essential content, primary navigation, product specifications, downloads, and contact information shall remain usable without client-side JavaScript.

## 3. Release scope

The first production release shall include these routes or equivalent canonical URLs:

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
/404
```

The release shall include five wagon categories and ten separately indexable product pages generated from the structured product data. English is required. German shall be enabled only when approved translations are available. Machine-translated legal or technical content shall not be published without human approval.

## 4. Production technology baseline

| Area                  | Requirement                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Runtime               | Node.js 22 LTS, minimum 22.12.0; repository `.nvmrc` shall select the approved version                     |
| Package manager       | pnpm 10 with a committed lockfile                                                                          |
| Site framework        | Astro 7.x pinned to an exact reviewed patch version                                                        |
| Language              | TypeScript with strict mode enabled                                                                        |
| Content               | Astro Content Collections with Zod validation                                                              |
| Rendering             | Static generation by default                                                                               |
| Styling               | Native CSS with custom properties, cascade layers, Grid, Subgrid, and container queries                    |
| Basic motion          | CSS transitions/animations and the Web Animations API                                                      |
| Advanced motion       | GSAP and ScrollTrigger, imported only on routes that need them                                             |
| Optional components   | Lit custom elements only for isolated reusable widgets; Lit shall not own routing or critical page content |
| Browser testing       | Playwright                                                                                                 |
| Unit and data testing | Vitest                                                                                                     |
| Hosting               | Vercel static hosting on a plan approved for commercial use                                                |
| Server-side boundary  | One narrow same-site server endpoint for contact-form delivery                                             |

Experimental framework features shall not be required for the first release. The public site shall not require a continuously running application server, database, or general-purpose CMS.

## 5. Application architecture

The production application should follow this responsibility structure:

```text
src/
├── assets/                 source images processed during builds
├── components/
│   ├── core/               navigation, footer, controls, typography
│   ├── product/            cards, specifications, load tables
│   ├── editorial/          evidence, projects, certificates
│   └── interactive/        optional TS, Lit, canvas, or WebGL modules
├── content/
│   ├── products/
│   ├── categories/
│   ├── projects/
│   └── pages/
├── layouts/
├── pages/
├── styles/
└── content.config.ts
```

Architecture rules:

- Public content routes shall be prerendered at build time.
- JavaScript shall be added per feature and loaded only where required.
- The first release shall not use a site-wide single-page-application router.
- Interactive islands shall have server-rendered or static HTML fallbacks for meaningful content.
- A future server-rendered route shall document why static delivery is insufficient.
- Framework-independent domain data shall remain separate from page components.
- Vercel-specific code shall be isolated to deployment configuration and server-side endpoints.

## 6. Content and product data

- Product records shall use stable identifiers and URL-safe slugs.
- Category and product routes shall be generated from validated content rather than duplicated page files.
- Product schemas shall preserve the source order of specification, load-limit, and goods rows.
- Locale-independent engineering values shall be stored separately from translated labels and marketing copy.
- Each publishable claim shall carry or resolve to a source reference and one of these states: `approved`, `needs-confirmation`, or `do-not-publish`.
- A content schema violation shall fail the production build with an actionable error.
- Missing optional content shall produce an intentional empty state; it shall not create broken controls or placeholder copy.
- Downloads shall point to real approved files and expose file type and size when known.

## 7. Functional requirements

### 7.1 Navigation and discovery

- Provide responsive primary navigation, footer navigation, language selection when multiple approved locales exist, and a visible current-page state.
- Provide a wagon catalogue grouped by category.
- Provide direct server-rendered links to all five wagon families and all ten launch products.
- Do not require catalogue search, filters, comparison, or configuration controls in the first release. The launch range is small enough to browse directly; these tools remain possible later extensions when content volume and normalized data justify them.
- Every product shall have a stable canonical URL and be reachable through normal links.
- No control may be visually presented as functional unless its action works in production.

### 7.2 Product pages

Each product page shall support:

- approved product name, category, description, and wagon imagery;
- ordered technical specifications and load-limit data where supplied;
- suitable-goods information where supplied;
- approved downloads and enquiry actions;
- source-aware handling of unavailable or unapproved fields;
- related products based on explicit category or use-case data rather than fabricated similarity.

Tables shall remain readable on small screens without truncating values or relying on hover. Wide engineering tables may use labelled horizontal scrolling with a visible affordance.

### 7.3 Contact form

The contact form shall:

- use semantic labels, clear required-field indicators, and accessible inline errors;
- validate input in both the browser and the server-side endpoint;
- provide pending, success, recoverable-error, and unavailable states;
- deliver submissions to an approved email or CRM destination;
- protect the endpoint with rate limiting and an approved anti-abuse mechanism;
- keep provider credentials and other secrets outside the browser bundle;
- avoid persistent lead storage unless the client explicitly approves the need, retention period, and access policy;
- link to the applicable privacy information before submission.

## 8. Brand and visual implementation

- The website shall use a custom design system and shall not inherit the competitor prototype's compositions or interaction patterns.
- Brand-defining styling shall use native CSS rather than a generic component kit.
- Design tokens shall define color, typography, spacing, radii, elevation, layout, and motion.
- Red shall remain the primary brand/action cue; graphite shall provide the main structural neutral; blue or teal shall identify technical information.
- The print and web color variants documented in the visual style guide shall not be silently mixed. Canonical colors require approval before production lock.
- Color shall never be the sole indicator of state, category, selection, or validation.
- Product renders shall use consistent scale, clear space, crop policy, and background treatment.
- The interface shall avoid decorative effects that weaken technical clarity or imitate the competitor prototype.

## 9. Motion and interactive effects

The implementation may use advanced scroll choreography, SVG animation, canvas, WebGL, masks, clipping, and page transitions when they support the product story and meet the quality requirements below.

- Simple interactions shall use CSS or the Web Animations API.
- Coordinated timelines, scroll-linked storytelling, SVG paths, and FLIP transitions may use GSAP.
- Three.js or another 3D runtime may be added only for an approved product visualization and shall be lazy-loaded.
- Heavy effects shall not block the first meaningful render or core navigation.
- Essential text shall not remain hidden while waiting for JavaScript or an animation trigger.
- Motion shall use `transform` and `opacity` where practical.
- A global `prefers-reduced-motion` path shall remove nonessential movement and preserve all information and controls.
- Autoplaying motion shall not create flashes or movement that violates WCAG requirements.
- The logo shall remain static and unmodified in every motion sequence.

## 10. Responsive behavior and browser support

- [`mobile-responsive-design-requirements.md`](mobile-responsive-design-requirements.md) is the binding implementation and evidence contract for compact, tablet, and desktop composition.
- Pages shall work from 320 CSS pixels wide through large desktop layouts without unintended horizontal page scrolling.
- Layout decisions shall be content-driven and use container queries where reusable modules require local responsiveness.
- Input controls shall remain usable with touch, mouse, keyboard, and zoomed text.
- Mobile layouts shall preserve one semantic component tree and deliberate source order; separate mobile pages or duplicated mobile content are prohibited.
- Every layout-bearing component shall be implemented and verified in a compact fixture before it can reach `VERIFIED`; final integration testing does not replace component-level mobile evidence.
- The release shall support the latest two stable major versions of Chrome, Edge, Firefox, and Safari available at acceptance time, plus the current Firefox ESR.
- A usable non-animated fallback shall exist where browser-native View Transitions or newer visual APIs are unavailable.

## 11. Accessibility

- Target conformance is WCAG 2.2 Level AA.
- Use semantic landmarks, heading order, lists, tables, buttons, links, and form elements.
- All interactive elements shall be reachable and operable by keyboard with a visible focus indicator.
- Normal text and interactive states shall meet AA contrast; faint and divider tokens shall not be used as normal text.
- Images shall have meaningful alternative text or an empty `alt` when decorative.
- Technical tables shall expose headers and relationships to assistive technology.
- Status and validation messages shall be announced appropriately.
- Content and controls shall remain usable at 200% browser zoom.
- Automated accessibility checks shall supplement, not replace, manual keyboard and screen-reader review.

## 12. Performance requirements

Production performance shall be measured on representative pages, including the homepage, catalogue, and a product detail page.

- Target field Core Web Vitals at the 75th percentile: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1.
- Initial route JavaScript should remain below 150 KiB compressed unless a reviewed interactive feature justifies an exception.
- GSAP, Lit, canvas, and 3D code shall not enter routes that do not use them.
- Fonts shall be self-hosted when licensing permits, subset where practical, and loaded without hiding readable fallback text.
- Below-the-fold images and noncritical embeds shall be lazy-loaded.
- Image dimensions shall be declared to prevent layout shifts.
- The production build shall not contain the current 98 MiB source PNG or any other unprocessed master asset.
- No deployed static file may exceed the hosting platform's 25 MiB file limit.
- Performance exceptions shall be documented with the affected route, measured impact, reason, and mitigation.

## 13. Image and media pipeline

- Original client assets shall be retained as source masters outside the deployed static output.
- Images requiring processing shall be imported from `src/assets/`; large masters shall not be copied unchanged from `public/`.
- Astro shall generate responsive widths and modern AVIF/WebP variants where visual QA confirms acceptable quality.
- Product images with transparency shall retain a suitable lossless or high-quality transparent derivative.
- Operational photography shall use art-directed crops where one crop cannot serve both mobile and desktop.
- Every delivered derivative shall preserve aspect ratio unless a documented art-directed crop is used.
- Optimization shall be verified visually, particularly for wagon details, technical drawings, labels, and fine edges.

## 14. SEO and localization

- Every indexable route shall provide a unique title, meta description, canonical URL, and social-sharing metadata.
- Product and category pages shall contain crawlable HTML content and normal links.
- The build shall generate a sitemap, `robots.txt`, and a useful 404 page.
- Multiple locale versions shall provide correct language metadata and `hreflang` relationships.
- Locale routing and locale selectors shall preserve the corresponding destination where one exists.
- Structured data may be added only when it accurately matches visible approved content.
- Draft, duplicate, and unapproved pages shall not be indexable.

## 15. Security, privacy, and compliance

- Use HTTPS in production.
- Set appropriate security headers, including a reviewed Content Security Policy where connected services permit it.
- Sanitize or safely render all externally supplied content.
- Validate and constrain all server-side inputs and outbound form-provider payloads.
- Store secrets only in the hosting platform's protected environment configuration.
- Do not commit credentials, personal data, production submissions, or private certificates.
- Add analytics, embedded media, CAPTCHA, or marketing scripts only after their privacy and consent requirements are defined.
- Imprint, privacy, cookie, and retention text shall reflect the services actually deployed rather than generic placeholders.
- Dependency auditing shall run before launch; unresolved critical vulnerabilities shall block release.

## 16. Build, deployment, and operations

- The repository shall contain reproducible install, development, test, build, and preview commands.
- The committed lockfile and recorded Node version shall reproduce the approved build.
- Every change proposed for production shall produce a preview deployment.
- Production deployment shall publish static output to Vercel on a plan that permits commercial company websites.
- Static assets shall remain portable to another CDN host.
- Only form delivery or a separately approved feature may depend on the Vercel runtime.
- Deployment configuration shall separate preview and production secrets and destinations.
- The project shall define cache behavior for versioned assets, HTML, downloads, and form responses.
- Launch documentation shall include domain/DNS ownership, deployment access, form destination, rollback procedure, and content handover.

## 17. Quality assurance and release gates

The production release shall not proceed until all applicable checks pass:

1. Install and production build succeed from a clean dependency state.
2. All required routes are generated and contain no broken internal links or missing media.
3. All ten product pages are generated from schema-validated data.
4. English routes are complete; any enabled German routes contain approved translations.
5. Navigation, the direct catalogue, tables, downloads, and forms work at representative mobile and desktop widths.
6. Form submissions reach the approved destination and expose success and failure states without leaking secrets.
7. Keyboard navigation, visible focus, contrast, reduced motion, alternative text, headings, and form errors pass review.
8. Performance budgets and Core Web Vitals targets are tested on representative pages.
9. Every public claim, certificate, project, and download has an approved source.
10. The build contains no competitor design or implementation and does not transform or animate the TransANT logo.
11. Legal, privacy, analytics, and consent behavior matches the services actually enabled.
12. Preview and production smoke tests pass, and rollback instructions have been verified.

## 18. Extension requirements

The architecture shall allow these later additions without rewriting the public catalogue:

- a Git-backed or headless CMS through a content loader;
- news, projects, certificates, and regional contact management;
- client-side product search and comparison;
- an isolated wagon configurator or engineering visualization;
- selected on-demand server routes;
- authenticated customer functions on separate routes or an application subdomain;
- durable storage only for features that genuinely require state.

Public product pages should remain statically generated even if application features are introduced later.

## 19. Explicitly out of scope for the first release

- redesigning or creating variants of the TransANT logo;
- copying or adapting the competitor prototype's visual system or code;
- a customer portal, authentication, or role management;
- a general-purpose database;
- a general-purpose CMS;
- unapproved machine translation;
- persistent contact-lead storage;
- catalogue search, filtering, and product comparison;
- an unapproved 3D product configurator;
- unsupported sustainability or performance claims.

## 20. Decisions required before production lock

- Confirm the canonical RGB, CMYK, and spot colors for the brand.
- Supply every approved logo asset and its placement/clear-space rules.
- Confirm the launch languages and provide approved translations.
- Confirm the contact-form recipient and delivery provider.
- Approve the technical datasheets, downloads, claims, certificates, and case studies.
- Confirm analytics, privacy, consent, retention, and legal-page requirements.
- Confirm the production domain, Vercel project owner, commercial-use plan, and deployment access.
- Assign the client-side owner responsible for final content approval.
