# ADR-001: Technology stack for the TransANT website

- Status: Accepted with external production-plan gate
- Date: 2026-09-03
- Decision owner: Project team
- Review trigger: before scaffolding the production application

## Decision summary

Build the TransANT website as a statically generated Astro application and deploy its static assets to Vercel. Use a narrowly scoped server-side endpoint only for the contact form and other genuinely server-side operations.

Use native semantic HTML, TypeScript, and a custom CSS design system as the default UI layer. Use CSS animations and the Web Animations API for simple motion, and GSAP for complex scroll choreography, SVG animation, sequencing, and state transitions. Lit is optional for isolated reusable Web Components but is not part of the critical rendering, routing, or content architecture.

```text
Astro 7.x, pinned to an exact stable patch
├── TypeScript in strict mode
├── Astro Content Collections + Zod schemas
├── Static HTML generation by default
├── Native CSS: custom properties, layers, grid, container queries
├── CSS / Web Animations API for simple motion
├── GSAP for advanced motion, loaded only where used
├── Optional direct Lit custom elements for reusable widgets
├── Playwright for browser journeys
├── Vitest for data and component logic
└── Vercel static hosting
    ├── CDN-hosted static HTML, CSS, JS, fonts, and images
    └── one narrow server-side endpoint boundary for form delivery
```

## Why this is the best fit

### Operating cost

Astro prerenders pages to static HTML by default. Static files can be served from Vercel's CDN without a continuously running application server. The existing free Hobby account can be used for technical previews, but Vercel explicitly restricts Hobby to personal, non-commercial use. Because this is a company website, production requires a Vercel plan that permits commercial use or written authorization from Vercel. Domain registration, transactional email or another form-delivery provider, and any future CMS remain separate costs.

Sources: [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro), [Vercel Hobby terms](https://vercel.com/docs/plans/hobby), [Vercel plans](https://vercel.com/docs/plans).

### Development speed

Astro provides file-based routing, dynamic static routes, layouts, content collections, TypeScript, image processing, sitemap integration, and internationalized routing. Product JSON can be loaded into a typed collection and used to generate the five category pages and ten product pages without writing separate page implementations.

Astro Content Collections support local Markdown and JSON today and remote CMS or API loaders later. Zod-backed schemas catch missing or malformed product data during the build rather than after deployment.

Sources: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Astro internationalization routing](https://docs.astro.build/en/guides/internationalization/).

### Visual freedom

Astro emits ordinary HTML, CSS, and JavaScript and does not impose a component styling system or animation abstraction. The website can use CSS transforms, masks, clipping, SVG, canvas, WebGL, browser-native View Transitions, the Web Animations API, or a dedicated animation library.

GSAP is selected for complex motion because it supports timeline choreography, scroll interaction, SVG paths, FLIP transitions, and fine sequencing. GSAP states that the full library is free and that commercial website use is permitted by its standard license. The TransANT website is a permitted end-use website, not a competing visual animation builder.

Every animation must have a reduced-motion path. Motion may enhance hierarchy and engineering storytelling but must never be required to read content, operate navigation, or submit a form.

Sources: [Astro view transitions](https://docs.astro.build/en/guides/view-transitions/), [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), [GSAP pricing](https://gsap.com/pricing/), [GSAP standard license](https://gsap.com/community/standard-license/).

### Extensibility

The initial site remains static, but Astro allows selected pages or endpoints to opt into on-demand rendering later through official adapters. A future search index, CMS, news feed, secured download area, or customer-specific route can therefore be introduced without converting every public page to server rendering.

Astro remains open source and MIT-licensed. Following the Astro Technology Company's move to Cloudflare in 2026, the project states that it remains platform-agnostic, openly governed, and supported across multiple deployment targets.

Sources: [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/), [Astro and Cloudflare stewardship statement](https://astro.build/blog/joining-cloudflare/).

## Evaluated alternatives

Scores use a five-point scale and are specific to this content-heavy, visually ambitious, multilingual corporate catalogue with a one-week delivery target.

| Option                     | Hosting cost | Delivery speed | SEO and i18n | Visual freedom | Extension path | Result                                                            |
| -------------------------- | -----------: | -------------: | -----------: | -------------: | -------------: | ----------------------------------------------------------------- |
| Astro static-first         |            5 |              5 |            5 |              5 |              5 | Selected                                                          |
| SvelteKit + adapter-static |            5 |              4 |            4 |              5 |              5 | Strong fallback for a more application-like UI                    |
| Nuxt 4 prerendering        |            5 |              4 |            4 |              5 |              5 | Strong Vue-based alternative, more runtime surface than needed    |
| Next.js static export      |            5 |              4 |            3 |              5 |              5 | Stable ecosystem, but static mode drops useful framework features |
| Lit + Vite only            |            5 |              3 |            2 |              5 |              4 | Excellent components, incomplete site architecture                |

### Why not Next.js static export

Next.js can generate one HTML file per route and later move toward server-backed features. However, its official static-export documentation lists internationalized routing, API routes, rewrites, redirects, headers, incremental static regeneration, and default image optimization as unsupported in export mode. Those omissions create avoidable work for this multilingual image-heavy site.

Source: [Next.js static exports](https://nextjs.org/docs/pages/guides/static-exports).

### Why not Lit-only

Lit is stable, fast, standards-based, and approximately 5 KiB compressed. It is excellent for interoperable Web Components and progressive enhancement. It is not a complete content-site framework: routing, static route generation, page metadata, image processing, sitemap generation, and deployment conventions would need additional architecture.

Lit's own SSR package is part of Lit Labs and is described as experimental with active limitations. Astro's former official Lit integration was deprecated in Astro 5. Lit can still be registered through an ordinary client script, which is sufficient for optional custom elements that do not carry critical server-rendered content.

Sources: [What is Lit?](https://lit.dev/docs/), [Lit SSR status](https://lit.dev/docs/ssr/overview/), [Astro Lit integration notice](https://docs.astro.build/en/guides/integrations-guide/lit/).

### Why not SvelteKit or Nuxt as the default

Both are capable choices and support static generation. They are preferable if the project becomes a highly interactive application with substantial shared client state. The initial TransANT website is mostly content, product specifications, images, and a small number of interactive tools. Astro's default no-runtime output gives the team a simpler performance and hosting baseline.

Sources: [SvelteKit static adapter](https://svelte.dev/docs/kit/adapter-static), [Nuxt prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering), [Nuxt mostly-static sites](https://nuxt.com/docs/4.x/guide/recipes/mostly-static-sites).

## Rendering policy

1. Every public content route is prerendered at build time.
2. Core content and navigation must work as HTML without client JavaScript.
3. JavaScript is added per feature, not per page.
4. No site-wide SPA router is required for the first release.
5. Browser-native cross-document View Transitions may enhance navigation without converting the site into an SPA.
6. A future on-demand route must explicitly justify its server cost and operational complexity.

## Content architecture

```text
src/
├── assets/                 images processed by Astro
├── components/
│   ├── core/               header, footer, buttons, typography
│   ├── product/            cards, specifications, load tables
│   ├── editorial/          evidence, case studies, certificates
│   └── interactive/        optional TS, Lit, or canvas modules
├── content/
│   ├── products/
│   ├── categories/
│   ├── projects/
│   └── pages/
├── layouts/
├── pages/
│   ├── index.astro
│   ├── wagons/
│   └── [locale]/
├── styles/
│   ├── tokens.css
│   ├── reset.css
│   ├── global.css
│   └── motion.css
└── content.config.ts
```

Product schemas must preserve ordered specification rows and trace each value to its supplied source. Locale-specific copy must be separate from locale-independent engineering data.

## Styling policy

Use native CSS rather than a utility framework for the brand-defining layer:

- custom properties for color, spacing, type, motion, and elevation;
- cascade layers for reset, tokens, components, and utilities;
- CSS Grid and Subgrid for technical tables and page composition;
- container queries for reusable product modules;
- logical properties for localization resilience;
- CSS Modules or scoped Astro styles only where isolation is useful.

This avoids a framework-looking result and does not restrict art direction. A small internal utility layer may be added for repeated layout primitives, but no generic UI kit should determine the visual language.

## Motion and effects policy

Use the least complex capable tool:

| Need                                          | Tool                                         |
| --------------------------------------------- | -------------------------------------------- |
| Hover, focus, disclosure, simple reveal       | CSS transitions/animations                   |
| Programmatic element animation                | Web Animations API                           |
| Coordinated timelines and scroll storytelling | GSAP + ScrollTrigger                         |
| Layout-to-layout transitions                  | GSAP Flip or browser View Transitions        |
| SVG line/path sequences                       | GSAP where CSS is insufficient               |
| Product 3D or engineering visualization       | Lazy-loaded Three.js module only if approved |

Mandatory safeguards:

- implement `prefers-reduced-motion` globally;
- animate `transform` and `opacity` where possible;
- never hide essential content pending JavaScript;
- lazy-load heavy effects below the fold;
- define an animation budget and test on mid-range mobile hardware;
- do not animate or alter the immutable TransANT logo.

## Hosting decision

Use Vercel static hosting for the first release, subject to a production plan that permits commercial use.

Reasons:

- no permanent server process;
- Git-based deployments and preview deployments;
- custom domains and global CDN delivery;
- a small serverless boundary can be added when the form provider and delivery contract are approved;
- the site remains portable because the production output is standard static files and does not require a Vercel runtime today.

Do not use Vercel Hobby for this production site: Vercel explicitly limits Hobby to personal, non-commercial use. Vercel Pro or another commercial-use Vercel agreement is required unless Vercel gives written authorization. Netlify, object storage with a CDN, or any conventional static host remain migration options because the core site has no Vercel runtime dependency.

Sources: [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro), [Vercel Hobby terms](https://vercel.com/docs/plans/hobby), [Vercel plans](https://vercel.com/docs/plans).

## Contact form boundary

The only initial server-side feature should be form delivery:

```text
browser form
  -> approved same-site server endpoint
  -> schema validation
  -> rate limit / anti-abuse control
  -> approved email or CRM provider
  -> success or recoverable error response
```

Do not add a database unless the client explicitly requires lead storage. Do not place mail-provider credentials in client JavaScript. Publish the privacy text only after the actual providers and retention policy are known.

## Image pipeline and current constraint

The current web-facing image directory is approximately 211 MiB. The largest source image is approximately 98 MiB, far above the project's 25 MiB static-file ceiling and an acceptable web payload.

Keep original client images as masters outside the deployment output. Import selected masters from `src/assets/` so Astro can generate responsive widths and modern formats at build time. Use `<Picture />` or `<Image />`, explicit dimensions, lazy loading below the fold, and quality settings based on visual inspection. Astro recommends storing local images in `src/` when processing is required; files under `public/` are copied unchanged.

Source: [Astro image guide](https://docs.astro.build/en/guides/images/).

## Version and dependency policy

- use Node.js 22 LTS, at least 22.12.0;
- use pnpm 10 and commit the lockfile;
- pin Astro and major animation dependencies to reviewed versions;
- use no experimental Astro features in the first release;
- enable strict TypeScript, formatting, linting, tests, and dependency auditing;
- schedule controlled upgrades instead of automatically merging major versions;
- keep the previous Astro major only as a temporary security-maintained fallback.

The current shell defaults to Node 20.20.0, which is not sufficient for current Astro. Node 22.13.0 is already installed locally and should be selected and recorded in `.nvmrc` when implementation begins.

Sources: [Astro installation requirements](https://docs.astro.build/en/install-and-setup/), [Astro 7 release](https://astro.build/blog/astro-7/).

## Extension path

### Phase 1 — launch

- static product catalogue;
- English content and approved locales;
- contact form;
- downloads, certificates, SEO, and analytics;
- no database and no general-purpose CMS.

### Phase 2 — editorial operations

- connect a headless or Git-backed CMS through a content loader;
- add news, projects, and regional sales contacts;
- add client-side search and product comparison;
- retain static output.

### Phase 3 — application features

- add a wagon configurator as an isolated interactive application;
- add authenticated customer functions on separate on-demand routes or a dedicated application subdomain;
- introduce a database only for features with durable state;
- preserve the public catalogue as static HTML.

## Acceptance checks for the stack

Before the design sprint proceeds, the foundation must prove:

- static generation of every product route from validated content;
- correct EN/DE URL generation and alternate-language metadata;
- responsive image generation from one large source asset;
- one decorative-motion proof with a working reduced-motion alternative, using CSS or the Web Animations API unless GSAP is explicitly justified;
- direct server-rendered catalogue links whose essential content remains readable without JavaScript;
- successful deployment to a preview URL without a persistent server;
- a functioning form endpoint with secrets kept outside the browser bundle;
- no use of the competitor prototype's design or implementation;
- no transformation or animation of the supplied TransANT logo.
