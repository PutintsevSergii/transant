# Deployment readiness and release contract

## Scope and evidence boundary

I-006 prepares the static TransANT site for Vercel and records the remaining release gates. It does not create or mutate a Vercel project, deploy a preview, change DNS, purchase a plan, configure form delivery, enable analytics, or provide legal, field-performance, real-device, or production-host evidence.

The release artifact is static Astro output. Vercel can deploy static Astro without an adapter. A future same-site contact endpoint remains a separate approved server boundary; no delivery implementation or credential is present in this package.

## Local contract

Run from `website/` with Node 22.13.0:

```sh
pnpm build
pnpm check:deployment-readiness
pnpm test:unit -- deployment-readiness
pnpm exec playwright test tests/browser/deployment-readiness.spec.ts
```

`check:deployment-readiness` reads only repository source and completed `dist/`. It verifies `vercel.json`, Astro's hash-based content security policy, preview crawler policy, local resource boundary, release route count, same-site form boundary, and analytics absence. It does not contact Vercel or a form provider.

The focused browser smoke test runs the component-lab homepage and contact journeys at all configured review widths. It confirms shell containment, compact-safe layout, the native form boundary, and analytics absence. This is local preview evidence, not hosted-preview or real-device evidence.

## Vercel configuration and static policy

`website/vercel.json` declares the Astro framework, frozen install, build plus release finalizer, `dist` output, canonical trailing slashes, general security headers, and immutable caching for hashed `/_astro/` assets and the byte-identical brand asset.

Astro's `security.csp` configuration emits a hash-based CSP into every generated HTML document. It keeps scripts and styles explicit without an `unsafe-inline` allowance, restricts form submission to the same origin, blocks framing and plugin content, and keeps images, fonts, and connections on the same origin.

`public/robots.txt` disallows indexing by default. An ordinary local or preview build therefore cannot advertise a fabricated public sitemap.

## Preview and production release output

Vercel runs:

```sh
pnpm install --frozen-lockfile
pnpm build && pnpm prepare:release-output
```

In a Vercel preview or development build, the finalizer preserves the no-index robots policy and omits a sitemap. In production, it derives the canonical HTTPS origin from `VERCEL_PROJECT_PRODUCTION_URL`, then writes `sitemap.xml` for every public route and a production `robots.txt` that allows crawling and identifies the sitemap. Vercel's `trailingSlash` setting owns canonical route redirects.

For a local production simulation, an explicitly approved origin may be supplied as `PUBLIC_SITE_URL`. The finalizer rejects HTTP, credentials, paths, queries, and fragments. Never use a guessed domain merely to satisfy the command.

The Vercel project must expose system environment variables to builds. If `VERCEL_PROJECT_PRODUCTION_URL` is unavailable in an older project, set the approved production origin as `PUBLIC_SITE_URL` in Vercel's production environment only.

## Account and commercial-use gate

Import `website/` as the project root. Repository configuration supplies the install, build, output, and trailing-slash settings. Record the actual project name, production branch, preview policy, Node 22.13.0 availability, production domain, and deployment identifier in the release receipt.

Vercel's official Hobby documentation restricts that plan to personal, non-commercial use. The existing free site may be used for technical preview work, but this company website must not be promoted to production on Hobby unless Vercel provides written authorization. Use Vercel Pro or another agreement that permits commercial use.

Before promotion, verify the deployed response headers, cache behavior, trailing-slash redirects, `robots.txt`, and `sitemap.xml`; repository configuration alone is not hosted proof.

## Legal source and translation boundary

The Imprint and Privacy pages use the company's official German Impressum and privacy page as the factual authority, with the official English pages and supplied prototype as supporting copy sources. Where the old English page conflicts with German source data, the German record controls. In particular, `GmbH` is translated as an Austrian limited liability company, not as the old site's incorrect “Limited partnership”.

The new build does not include Google Analytics, marketing trackers, old social plugins, or non-essential cookies, so obsolete service-specific wording from the current website is not copied. The translated and adapted English text is an editorial implementation, not legal advice; the company owner or counsel must approve it before production.

## Form and analytics boundary

`/contact/submit` is intentionally absent from static output. Vercel hosting alone does not deliver email. Do not enable the visible form for production until the recipient, delivery provider, protected credentials, anti-abuse/rate-limit policy, server-side validation, success/failure behavior, processor disclosure, and retention period are confirmed. No provider or secret is inferred from the public company website.

Analytics is disabled. The release artifact contains no Google Analytics, tag manager, marketing tracker, or consent-dependent cookie. A consent banner is therefore unnecessary for the current build. If analytics or another non-essential service is later proposed, approve its purpose and consent behavior, update the Privacy page and CSP, and repeat performance and deployment review before enabling it.

## Preview smoke, promotion, and rollback

For each candidate preview, run `pnpm quality` and the local I-006 checks, then inspect the hosted preview at 320 and 1440 CSS pixels: homepage navigation, catalogue/product tables, contact form failure path, legal pages, 404 recovery, response headers, redirects, and crawler files.

Promote only after the commercial-use plan, Vercel project/domain ownership, hosted checks, approved form delivery, owner/legal copy approval, external documents, and any claimed field/CDN or real-device evidence are recorded.

Rollback with Vercel's deployment rollback to the last verified production deployment. Record that deployment before promotion and smoke its homepage, catalogue, contact, legal, and 404 routes. If form delivery is enabled later, roll back the matching endpoint revision and verify that submissions cannot reach an unapproved destination. Do not roll back by deleting the production project or DNS record.
