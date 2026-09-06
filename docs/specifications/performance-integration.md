# I-004 performance integration contract

I-004 establishes repeatable lab evidence for the fully assembled static site. It does not claim field Core Web Vitals, real-device performance, production-CDN behaviour, installed mail-handler behavior, or successful email transmission.

## Scope and route set

The local production build is checked on the mobile Lighthouse default profile for the required representative routes:

- `/` — homepage;
- `/wagons/` — catalogue;
- `/wagons/open-box/uno-multi-56ft-eanos/` — representative widest-data product;
- `/contact/` — contact form.

The four routes are source-derived production output, not component-lab fixtures. `pnpm check:performance-integration` starts only ephemeral local Astro preview and Chromium processes on loopback ports, then terminates them.

## Automated contract

`website/scripts/verify-performance-integration.mjs` verifies the completed `dist/` output before Lighthouse runs:

- no generated static file exceeds the project's 25 MiB deployment ceiling;
- every representative route stays under the 150 KiB gzip initial-JavaScript budget;
- scripts and image sources are local, each image declares intrinsic dimensions, and responsive sources include a 320 px derivative with a `sizes` contract;
- built CSS exposes reduced-motion handling; prohibited canvas, WebGL, GSAP, and Three.js output is absent.

The mobile Lighthouse lab thresholds are performance score at least 0.90, LCP no more than 2.5 seconds, CLS no more than 0.1, and TBT no more than 200 ms. These protect the release-one local static baseline. INP and the 75th-percentile Core Web Vitals targets remain production field measurements, so they cannot be passed or inferred from this local test.

The focused Playwright check repeats the local-image, intrinsic-size, and reduced-motion assertions through the component-lab browser lifecycle at every canonical viewport. It deliberately inspects structured DOM/performance state rather than adding screenshots.

## Commands and limits

Run, in order:

```sh
PATH=/Users/perfrico/.nvm/versions/node/v22.13.0/bin:$PATH
cd website
pnpm build
pnpm check:performance-integration
pnpm exec playwright test tests/browser/performance-integration.spec.ts
```

The production route budget intentionally counts only first-load JavaScript compressed with gzip. CSS and image transfer remain covered by Lighthouse and the static responsive-image checks. A performance exception must identify the affected route, measured impact, reason, mitigation, and approval; no exception is implicit.

## Remaining external evidence

Before a launch claim, obtain field Core Web Vitals, real-device network measurements, and production CDN/cache-header evidence on the approved Vercel deployment. Those are I-006/release inputs, not local evidence.
