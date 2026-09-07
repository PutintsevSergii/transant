# Production hosting technical requirements

## Scope

This is the technical handoff for hosting the TransANT static website. Production indexing is approved.

## Build and runtime

- Deploy the static Astro site from `website/`.
- Use Node.js `>=22.12.0 <23` (the verified local runtime is 22.13) and pnpm `>=10 <11`.
- Install with `pnpm install --frozen-lockfile`.
- Build with `pnpm build && pnpm prepare:release-output`.
- Publish `website/dist/`; no Node server, database, API endpoint, queue, or form provider is required.
- The contact form opens a prepared `mailto:` message in the visitor's mail application; the host must permit `mailto:` form actions.

## Production origin and indexing

- Serve one approved HTTPS origin without a path, query, fragment, or credentials.
- In a Vercel production build, expose `VERCEL_ENV=production` and `VERCEL_PROJECT_PRODUCTION_URL`; otherwise set `PUBLIC_SITE_URL` to the approved HTTPS origin for the production build only.
- Run `pnpm prepare:release-output` with that origin. It generates production `robots.txt` with `Allow: /` and an absolute `sitemap.xml` reference; production routes are indexable.
- Keep preview/development builds non-indexable. Do not copy production `robots.txt` or sitemap output into previews.

## Routing, headers, and caching

- Preserve trailing-slash URLs and permanent redirects from `/technology/` to `/engineering-services/` in English, German, Ukrainian, Polish, and Czech.
- Serve the configured security headers: CSP, `Cross-Origin-Opener-Policy: same-origin`, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.
- Cache fingerprinted `/_astro/` and `/brand/` assets as `public, max-age=31536000, immutable`.
- Serve the generated sitemap, robots file, canonical pages, local media, local certificate PDFs, and certificate previews as static files over HTTPS.

## Release verification

- Confirm the canonical HTTPS origin, `robots.txt`, `sitemap.xml`, five legacy redirects, security/cache headers, 404 page, and all localized routes on the deployed site.
- Verify the `mailto:` flow on representative desktop and mobile devices with a configured mail application.
- Run the repository deployment-readiness, route, content, performance, accessibility, and responsive checks before handoff; record hosted and representative-device evidence separately.
