# TransANT project status

This file is the compact operational handoff. It must describe the current truth without requiring a repository-wide scan.

## Control

- Last updated: 2026-09-04
- Lifecycle: READY
- Release: R1 — English static corporate and wagon-catalogue website
- Active work package: NONE
- Active objective: Harness initialized; production implementation has not started
- Last completed work package: NONE
- Next eligible work package: F-001 — Astro project and isolated component lab
- Last change-log entry: 2026-09-04 — BASELINE — Initial development repository
- Package source: `docs/specifications/component-implementation-status.md`
- Plan source: `docs/specifications/v7-component-development-plan.md`

## Last verified baseline

- Repository structure: documentation, agent harness, preparation archive, and unscaffolded `website/` workspace are separated.
- Production application: NOT_STARTED; no `package.json`, Astro source tree, or executable application tests yet.
- State validation command: `agent/scripts/validate-state.sh`
- Input validation command: `agent/scripts/validate-inputs.sh`
- Application baseline command: NOT_AVAILABLE until F-001 defines it.
- Git baseline: initialized on `main`; the latest commit is the validated development handoff baseline. Use `git log -1 --oneline` for its immutable identifier.

## Current architecture

- Static-first Astro 7, strict TypeScript, native CSS, Astro content collections, and Zod.
- Vitest for pure logic; isolated Astro component lab plus Playwright for rendered components and journeys.
- Static Cloudflare Pages output; a narrow Worker/Function boundary only for approved server-side form delivery.
- Component dependency direction: pages -> sections -> primitives -> pure types/utilities.
- Content and deployment adapters depend on stable application/domain contracts, not the reverse.
- Release-one catalogue uses direct links to five families and ten products. No search, filtering, comparison, or configurator.

## Approved visual direction

- V7 is the current visual baseline: `prep/design/stitch-generations/v7/stitch_transant_b2b_website_redesign (6)/screen.png`.
- Keep the static split hero, blue Wagon Switchyard signature section, restrained blue accents, editorial spacing, and abstract Railway Orbital.
- Generated V7 HTML is reference-only and contains non-production code, remote assets, placeholders, and unverified claims.
- The TransANT logo is immutable.
- Logo baseline: SHA-256 `fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985`, 520 x 114 px.

## Current working set

- `AGENTS.md`
- `STATUS.md`
- `CHANGELOG.md`
- `agent/`
- `docs/specifications/component-implementation-status.md`
- `docs/specifications/v7-component-development-plan.md`
- `docs/specifications/technical-requirements.md`
- `docs/technology-stack-decision.md`
- `website/`

## Completed

- Public company and product-source research organized.
- Five-family, ten-product content tree extracted under `website/src/content/`.
- Source images moved to `website/src/assets/images/` so Astro must process selected assets instead of copying 211 MB unchanged.
- The byte-identical logo is isolated at `website/public/brand/transant-logo.png` for direct public delivery.
- Oversized editorial originals and campaign artwork are archived under `prep/source-material/web-image-masters/`; reviewed web-sized editorial copies keep the active website workspace near 34 MB.
- Technology stack and production requirements documented.
- V7 design reviewed and decomposed into independent work packages.
- Component-first development plan and 43-package status tracker created.
- Historical designs, large source masters, and old extraction tooling moved under `prep/`.
- OpenAI-oriented long-running harness instructions and scripts created.
- Local Git repository initialized on `main`; large preparation-only directories are excluded by `.gitignore`.

## In progress

- None.

## Known blockers and decisions still required

- The production application and test commands do not exist until F-001.
- Canonical brand colour values and logo usage rules still require client confirmation.
- Contact-form recipient/provider, production domain/Cloudflare ownership, approved legal text, analytics/consent policy, downloads, certificates, and final claims remain production-lock inputs.
- German remains gated until approved translations exist.

## Exact next action

Implement F-001 only:

1. Read its plan section and tracker row.
2. Update this file and the tracker to `IN_PROGRESS` before code changes.
3. Scaffold the Astro application inside `website/` without deleting current content or media.
4. Add the separate component-lab configuration and smoke fixture.
5. Establish strict types, formatting, linting, Vitest, Playwright, axe, and documented quality commands.
6. Run F-001 checks and update the tracker, this file, and `CHANGELOG.md` with exact evidence.

## Continuation rule

The next model should read this file and the latest 120 lines of `CHANGELOG.md`, validate state, then open only the F-001 plan section and affected foundation files. A broad rescan is unnecessary unless validation reveals drift.
