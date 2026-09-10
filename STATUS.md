# TransANT project status

This file is the compact operational handoff. It must describe the current truth without requiring a repository-wide scan.

## Control

- Last updated: 2026-09-10
- Lifecycle: BLOCKED
- Release: R1 — multilingual static corporate and wagon-catalogue website
- Active work package: NONE
- Active objective: await explicit direction; the legal correction is implemented and its remaining release checks require deployed/provider evidence
- Last completed work package: A-006
- Next eligible work package: NONE
- Last change-log entry: 2026-09-10 — A-006 — privacy, imprint, and contact legal correction
- Package source: `docs/specifications/component-implementation-status.md`
- Plan source: `docs/specifications/v7-component-development-plan.md`

## Completed correction — A-006 legal and contact feedback

- Status: `IMPLEMENTED` under the explicit client-feedback request. CMS was explicitly excluded and no CMS work was performed.
- Outcome: corrected the Imprint to `Landesgericht Linz`, FN 544665 d, and registered office Linz; added Magistrat der Stadt Linz, Wirtschaftskammer Oberösterreich, a linked Gewerbeordnung 1994 reference, and the current registered trade wording; replaced provider-neutral hosting copy with the approved Hutchison Drei Austria GmbH / Article 6(1)(f) / Article 28 wording; completed the affected legal/contact copy in EN/DE/UK/PL/CS; and replaced mandatory contact consent with a linked informational Privacy notice.
- Source boundary: current WKO Firmen A-Z evidence supports the register, authority, chamber, and registered trade wording. Official Drei material supports the provider identity and availability of Article 28 web-hosting processing terms. No deployment, provider agreement, cookie tooling, or CMS changed.
- Files: legal/contact/site-shell view models and locale maps; `ContactForm` and `LegalDocument` public contracts, implementations, READMEs, fixtures, focused unit/browser tests, and affected visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused unit contracts pass 16/16; Astro diagnostics report 0 errors/warnings/hints; production and component-lab builds pass; focused legal/contact component, keyboard, responsive, and axe checks pass 60/60; focused content checks pass 6/6; refreshed then clean affected visual comparisons pass 24/24 across 320/390/768/1024/1440/844×390. German Privacy, Imprint, and Contact production output plus representative EN mobile/desktop references were inspected directly. The final Node 22.13 `pnpm quality` checkpoint passes Prettier, ESLint, Astro diagnostics, 99 unit tests, both builds, and four foundation tests; aggregate Playwright is `NOT_RUN` because `127.0.0.1:4322` is occupied. The standalone generated-output content/brand audit is also not green because its pre-existing PRO-page narrative expectation no longer matches current PRO output; that unrelated contract was not changed in this correction.
- Remaining external gates: confirm/execute the hosting data-processing agreement, verify production hosting after deployment, and run the post-migration cookie/tracker audit before deciding whether a consent banner is required. A-006 remains `IMPLEMENTED`, not `VERIFIED`, until the relevant release evidence is complete.
- Next exact action: await explicit direction; no deployment or external system changed.

## Completed correction — E-003 Quality EvidenceList lower inset

- Status: `VERIFIED` under the explicit `/quality/` spacing request.
- Outcome: `.evidence-list__frame.page-frame` now keeps a tokenized 48 px lower inset after the final certificate card instead of touching the following ContactCTA.
- Cause and boundary: the standard frame's prior `padding-block` declaration referenced undefined `--space-10`, so the browser discarded it and computed zero bottom padding. Replaced only that invalid declaration with `padding-block-end: var(--space-7)`; certificate content, actions, semantics, heading/list gap, Company compact spacing, routes, and locales remain unchanged.
- Files: EvidenceList implementation and README; focused editorial-page browser assertion; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier and Astro diagnostics pass with 0 errors, warnings, or hints. Focused composition and the 48–49 px lower-inset assertion pass 6/6 across 320/390/768/1024/1440/844×390. Live `localhost:4321/quality/` inspection confirms a computed 48 px bottom padding, with reviewed 1440 × 1100 and 390 × 844 renderings. The final Node 22.13 `pnpm quality` checkpoint passes Prettier, ESLint, Astro diagnostics, 98 unit tests, both builds, and four foundation tests; its aggregate browser stage is `NOT_RUN` because `127.0.0.1:4322` is already occupied.
- Next exact action: await explicit direction; no deployment or external system changed.

## Completed correction — A-005 PRO hero full-platform presentation

- Status: `IMPLEMENTED` under the explicit request for `/pro-platform-projects/`.
- Outcome: the hero presents the real PRO 60 ft photograph in its native 16:9 ratio with `preserveNaturalAspectRatio`, so the whole platform—including both ends and running gear—remains visible instead of being cover-cropped. The rejected crop-focus API was removed rather than retained unused.
- Boundary: preserved the supplied asset, copy, alt text, remaining imagery, technical values, routes, and locales; only the hero media presentation follows the source ratio.
- Files: PRO editorial view model; PageHero focus cleanup; focused PageHero and editorial-page tests; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: the required Node 22.13 `pnpm quality` baseline passes formatting, ESLint, Astro diagnostics, 97 unit tests, both builds, and four foundation tests; its aggregate browser stage is `NOT_RUN` because `127.0.0.1:4322` cannot bind (`listen EPERM`). Post-edit Prettier passes; focused PageHero contract tests pass 2/2; Astro diagnostics report 0 errors, warnings, or hints; the production build passes with 125 pages. Local production preview review at 1440 × 1100 and 390 × 844 confirms the full platform is visible without crop.
- Next exact action: await explicit direction; no deployment or external system changed.
- Baseline: Node 22.13 `website/` `pnpm quality` passes formatting, ESLint, Astro diagnostics, 97 unit tests, production and component-lab builds, and four foundation tests. The aggregate browser stage is `NOT_RUN`: the configured listener cannot bind `127.0.0.1:4322` (`listen EPERM`). State/input validators pass.
- Copy correction: Ukrainian removable-ballast narrative now begins with the Cyrillic `Під`, replacing the visually similar Latin `Pід`; section wording and every other locale remain unchanged. Targeted formatting, Astro diagnostics, and the 125-page production build pass. The browser stage is `NOT_RUN` under the known `127.0.0.1:4322` sandbox listener boundary.
- Translation audit: reviewed the English, German, Ukrainian, Polish, and Czech eyebrow, title, description, and two paragraphs for the removable-ballast story. No further grammar correction is warranted; source-owned technical values and wording remain unchanged.
- Baseline: Node 22.13 `website/` `pnpm quality` passes formatting, ESLint, Astro diagnostics, 97 unit tests, production and component-lab builds, and four foundation tests. Its aggregate browser stage is `NOT_RUN` because `127.0.0.1:4322` cannot bind (`listen EPERM`).
- Next verification: focused PageHero contract tests, Astro diagnostics, production build, and desktop/local preview review showing both ends of the platform.

## Completed correction — A-005 corrected PRO technical drawings and data

- Status: `IMPLEMENTED` under the explicit request for `/pro-platform-projects/`.
- Outcome: the source PDF's overall-dimensions elevation/end view and complete 20/30/40 ft container loading scheme now appear in the existing “Drawings & technical data” flow, with local high-resolution source crops, responsive optimized output, descriptive alternatives, and full-size links.
- Technical reconciliation: existing dimensions, tare/configuration masses, axle load, line-class payload limits, vehicle gauge, curve radius, speeds, pin count, and supported container sizes match the PDF and remain unchanged. Added the two absent source fields: international-use marking `TEN GE` and the additional `1,155 mm / C / K (Jurid 822)` markings.
- Files: two drawing assets; PRO editorial view model; EN/DE/UK/PL/CS route rendering and copy maps; TechnicalSheet drawing-only composition, README, and unit contract; focused editorial browser contract; tracker; `STATUS.md`; and `CHANGELOG.md`.
- Asset evidence: overall dimensions 3190 × 1230 / SHA-256 `6eea7a85ced27ddf83d4ca7ce3df4956d36429c137a5ab9a1cc8e239b24919f1`; loading scheme 1750 × 2140 / SHA-256 `eecaca72a1e65a48a46bf56ac4058e9e15d449fff4e848ba0d31b216102f238f`.
- Validation: formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 98 unit tests, the 125-page production build, the 62-page component-lab build, and four foundation tests pass. Focused editorial composition passes 6/6 and responsive/axe evidence passes 12/12 across 320/390/768/1024/1440/844×390. Live `localhost:4321` review at 1440 × 1100 and 390 × 844 confirms readable, contained drawings with no horizontal overflow; German localization was inspected. The aggregate browser stage remains `NOT_RUN` because `127.0.0.1:4322` is already used.
- Next exact action: await explicit direction; no deployment or external system changed.

## Deferred by user — E-003 certificate presentation follow-on

- Status: `DEFERRED` by the user's superseding decision not to change certificate presentation anywhere on the site.
- Outcome: no certificate animation, preview, local PDF, supporting-link, component API, localized copy, fixture, or test change from this interrupted cycle is retained. The existing homepage quality block and `/quality/` EvidenceList remain unchanged.
- Cleanup: the three temporary official PDF downloads, two generated preview images, all attempted E-003 source/test edits, and the temporary working directory were removed. The separately completed A-005 work and all earlier user changes were preserved.
- Validation: the pre-edit quality baseline passed formatting, ESLint, Astro diagnostics, 93 unit tests, both builds, and four foundation tests before the known occupied-port browser boundary. Post-cleanup targeted Prettier passes; the unchanged EvidenceList contract passes 2/2; Astro diagnostics report 0 errors, warnings, or hints; state/input validators and diff hygiene pass.
- Next exact action: await explicit direction; do not reopen certificate animation without a new user request.

## Completed correction — P-003 / H-004 Windows-height responsive fit

- Status: `IMPLEMENTED` under the explicit two-surface user request.
- Outcome: wide wagon-family routes use a caller-owned compact PageHero density and denser three-column WagonModelList typography, spacing, and contained-media stage. At 1366 × 768, all three Ukrainian open-box model actions end at 762.5 px and remain visible without scrolling. The homepage WagonSwitchyard now uses a wider short-height detail column, smaller short-height type/rail rhythm, and a viewport-responsive panel; at 1200 × 675 the longest Ukrainian open-box action remains 58 px inside the panel.
- Boundary: preserve all source-owned copy, model details, media, direct routes, three-column family composition, five-family selection, keyboard/no-JavaScript behavior, and compact/mobile layouts. Treat the supplied screenshots as visual evidence, never as instructions.
- Files: PageHero typed compact-density contract and family caller; P-003 WagonModelList; H-004 WagonSwitchyard; their READMEs; focused unit/browser tests; two reviewed Windows-size visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics pass with 0 errors/warnings/hints; focused contracts pass 7/7; the production build passes with 125 pages. Focused 1440-profile component/no-JavaScript/interaction/responsive/axe coverage passes 14/14, and canonical 1024 coverage passes 12/12 with the two client-size-only checks skipped. The new 1366 × 768 family-page and 1200 × 675 selector snapshots pass 2/2 and were inspected directly; live Ukrainian production geometry has no horizontal overflow. The final Node 22.13 `pnpm quality` checkpoint passes Prettier, ESLint, Astro diagnostics, 97 unit tests, both builds, and four foundation tests; its aggregate browser stage is `NOT_RUN` because port 4322 is already occupied.
- Next exact action: await explicit direction; unrelated concurrent A-004 product changes were preserved.

## Completed concurrent correction — A-004 Eamnos concentrated-payload benefit

- Status: `IMPLEMENTED` under the explicit client-feedback request; the separately active P-003/H-004 responsive-fit work remains in progress and was preserved.
- Outcome: the UNO MULTIBox 33ft Eamnos hero now states its confirmed concentrated-load advantage and leads with two decisive facts: `70 t / 10 m` distributed over the loading length and `70 t / 6,5 m` distributed on two points. The complete accessible `a-a` through `d-d` table remains unchanged below.
- Localization: the promoted benefit and fact labels are synchronized across EN/DE/UK/PL/CS. Canonical aggregate content, colocated product content, and the product README agree.
- Files: Eamnos aggregate/colocated content and README; product view-model adapter; DE/UK/PL/CS copy maps; focused unit/browser contracts; six Eamnos visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and four foundation tests; its browser stage is `NOT_RUN` because the configured server cannot bind `127.0.0.1:4322` (`listen EPERM`).
- Validation: focused content/view-model tests PASS 13/13; Astro diagnostics PASS with 0 errors/warnings/hints; the 125-page production build and content/brand audit PASS. Clean component/no-overflow and refreshed visual evidence PASS 12/12 across 320/390/768/1024/1440/844×390; focused axe evidence PASS 6/6; 320/1440 fixtures and the Ukrainian production route were inspected directly. A final broad quality attempt stopped on a transient type error in the separately active PageHero work; a subsequent Astro check passes, so that unrelated concurrent boundary is not attributed to A-004.
- Next exact action: preserve this completed correction while P-003/H-004 continues; no deployment was triggered.

## Completed correction — A-005 PRO specialised-equipment media

- Status: `IMPLEMENTED` under the explicit user request.
- Outcome: the 2860 × 1215 transparent render embedded on slide 8 of `client-remarks/Development 09_2025.pptx` now appears only in the existing “Specialised equipment” `MediaStory` on `/pro-platform-projects/`.
- Boundary: preserve all current PRO copy, technical values, section order, routes, and localized text. Do not identify the image as the PRO platform or alter the Timber product pages.
- Files: one local editorial image asset; the PRO editorial view model; localized DE/UK/PL/CS image alternatives; focused editorial browser evidence; six PRO visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and four foundation tests; its browser stage is `NOT_RUN` because port 4322 is already occupied.
- Validation: the source PNG is retained at 2860 × 1215 RGBA with SHA-256 `5edba33a86b701f12b3dbd3f51ca850316681ed5adf90869cd04f5e2aed9d749`. Astro diagnostics pass with 0 errors/warnings/hints; the production build passes with 125 pages and localized generated-output alternatives. Focused editorial component/keyboard/responsive/axe evidence passes 24/24, and clean PRO visual comparisons pass 6/6 across 320/390/768/1024/1440/844×390; 320 and 1440 output was inspected directly.
- Next exact action: await explicit direction; the cancelled E-003 follow-on remains out of scope.

## Completed correction — P-003 WagonModelList lower inset

- Status: `IMPLEMENTED` under the explicit wagon-family-page request.
- Outcome: `.wagon-model-list__items` now has a tokenized 48 px lower inset on every family page, creating deliberate space after the final model card.
- Boundary: local list spacing and focused evidence only. Card density, semantic/source and keyboard order, direct product routes, local media, one/three-column responsive composition, PageHero handoff, and all locales remain unchanged.
- Files: `website/src/components/catalogue/WagonModelList/{WagonModelList.astro,README.md}`, focused WagonModelList browser coverage and six visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: required baseline `pnpm quality` passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and four foundation tests; its aggregate browser stage is `NOT_RUN` because port 4322 is already occupied. Post-edit Prettier and Astro diagnostics pass with 0 errors/warnings/hints; production build (125 pages) and diff hygiene pass. Isolated WagonModelList component/keyboard/responsive/axe/visual evidence passes 30/30 across 320/390/768/1024/1440/844×390, with direct 1024 review.
- Next exact action: await explicit direction before reopening P-003.

## Completed correction — P-002 WagonFamilyIndex action treatment

- Status: `IMPLEMENTED` under the explicit wagon-catalogue request.
- Outcome: every direct family action on `/wagons/` now is content-width, with red text and a matching red outline rather than a full copy-column blue control.
- Boundary: CSS and focused contract/evidence only. The shared secondary regular semantics, five direct routes, contained 2:1 media reservation, family copy, source/keyboard order, wide alternation, compact composition, and all locales remain unchanged.
- Files: `website/src/components/catalogue/WagonFamilyIndex/{WagonFamilyIndex.astro,README.md}`, `website/tests/browser/wagon-family-index.spec.ts`, six WagonFamilyIndex visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: required baseline `pnpm quality` passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and four foundation tests; its aggregate browser stage is `NOT_RUN` because port 4322 is already occupied. Post-edit Prettier and Astro diagnostics pass with 0 errors/warnings/hints; production build (125 pages) and diff hygiene pass. Isolated WagonFamilyIndex component/no-JavaScript/keyboard/responsive/axe/visual evidence passes 36/36 across 320/390/768/1024/1440/844×390, with direct 1024 review.
- Next exact action: await explicit direction before reopening P-002.

## Completed correction — P-002 WagonFamilyIndex Tank representative

- Status: `IMPLEMENTED` under the explicit wagon-catalogue request.
- Outcome: the Tank row on `/wagons/` now uses the already-approved homepage `image001.png` render.
- Boundary: update only the catalogue index Tank representative. Preserve the Tank product-page render, the other four family renders, contained 2:1 reservation, direct routes, source/keyboard order, compact composition, action treatment, and all locales.
- Files: `website/src/adapters/content/catalogue-view-model.ts`, component-lab fixture, focused WagonFamilyIndex browser coverage and the affected visual reference, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: baseline `pnpm quality` passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and 4 foundation tests; its browser stage is `NOT_RUN` because the sandbox cannot bind port 4322. Post-edit Prettier and Astro diagnostics pass with 0 errors/warnings/hints; production build (125 pages), diff hygiene, and state/input validators pass. Isolated WagonFamilyIndex component/no-JavaScript/keyboard/responsive/axe/visual evidence passes 36/36 across 320/390/768/1024/1440/844×390; the refreshed 1024 result was inspected directly.
- Next exact action: await explicit direction before reopening P-002.

## Completed correction — P-002 WagonFamilyIndex media density and action treatment

- Status: `IMPLEMENTED` under the explicit wagon-catalogue request; the separately active C-006/C-007/H-001 affiliation batch and completed H-004 corrections remain untouched.
- Outcome: the index's caller-owned contained media reservation is now 2:1 instead of 3:2, reducing wide row height while retaining centered wagon art; every direct family action now uses the shared regular secondary outline treatment.
- Boundary: change only `WagonFamilyIndex` wide media/action presentation and its focused contract/visual evidence. Preserve the five source-owned family records, copy, local contained renders, direct routes, semantic/source and keyboard order, compact composition, alternating wide layout, protected text-to-media clearance, and all locales.
- Files: `website/src/adapters/content/catalogue-view-model.ts`, `website/src/components/catalogue/WagonFamilyIndex/{WagonFamilyIndex.astro,README.md}`, the component-lab fixture, focused browser coverage and six visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: the baseline `website/` quality run passes formatting, ESLint, Astro diagnostics, 93 unit tests, both static builds, and 4 foundation tests; its aggregate browser stage is `NOT_RUN` because `127.0.0.1:4322` is occupied. Post-edit Prettier and Astro diagnostics pass with 0 errors/warnings/hints; the 125-page production build, diff hygiene, and state/input validators pass. Isolated WagonFamilyIndex browser evidence passes 36/36 across 320/390/768/1024/1440/844×390, including component/no-JavaScript, keyboard, responsive, axe, and refreshed visual checks; the refreshed 1440 result was inspected directly.
- Next exact action: await explicit direction before reopening this correction; concurrent C-006/C-007/H-001 work remains separate.

## Completed correction — C-006 / C-007 / H-001 TAS Group affiliation

- Status: `IMPLEMENTED`; the separately completed H-004 Tank selector and rail corrections remain authoritative and untouched.
- Outcome: the client-confirmed TAS Group relationship is visible through three restrained UI surfaces: `TAS GROUP COMPANY` in the header identity, `PART OF TAS GROUP` as the homepage hero eyebrow, and `TransAnt GmbH · Part of TAS Group` in the footer identity. The initially considered shell-level affiliation strip was removed before handoff on explicit user feedback because it felt excessive; no strip component or reserved strip spacing remains.
- Boundary: preserve the immutable TransANT logo bytes and its existing `Generation Rail` line; use text-only endorsement presentation and the existing TransANT visual system; keep all content server-rendered and usable without JavaScript; preserve header navigation, locale switching, contact actions, hero title/summary/actions/media, footer navigation/contact/legal data, routes, and all unrelated pages.
- Files: typed SiteHeader and SiteFooter contracts/implementations/READMEs; shared shell and homepage caller data; German/additional-locale hero mappings; component-lab fixtures; focused unit/browser contracts and SiteHeader/SiteFooter/homepage visual evidence; tracker, `STATUS.md`, and `CHANGELOG.md`. Concurrent H-004 Tank import/scale/rail work was preserved.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests; aggregate browser execution is `NOT_RUN` because `127.0.0.1:4322` is occupied.
- Validation: focused shell contracts PASS 14/14; Astro diagnostics PASS with 0 errors/warnings/hints; production build PASSes with 125 pages; content/brand audit PASSes with the immutable logo hash unchanged; route integration PASSes (`routes=124 products=10 internal-references=5009`). Isolated SiteHeader, SiteFooter, and homepage component/no-JavaScript/keyboard/responsive/axe/visual coverage PASSes 104 checks with 4 expected wide-only skips across 320/390/768/1024/1440/844×390, and compact/wide renders were inspected directly. The final full `pnpm quality` checkpoint passes all static stages with 93 unit tests, both builds, and 4 foundation tests; its browser aggregate is not green because unrelated localized component-lab routes resolve as English and shared-shell full-page snapshots outside this focused batch still expect the previous header/footer. It was stopped after 298 passes, 73 failures, 3 skips, and 5 interrupted tests rather than overwrite unrelated baselines.
- Next exact action: await explicit direction before E-003 or another bounded correction.

## Concurrent correction — A-005 PRO Platform Projects technical-details navigation

- Status: `IMPLEMENTED`.
- Outcome: `/pro-platform-projects/` now has the server-rendered “Drawings & technical data” action directly below its PRO hero. It targets `#technical-details` on the existing source-backed Technical specifications section, followed by the existing payload table; editorial stories, artwork, and source values remain unchanged. The target accommodates future client-supplied technical drawings without claiming any drawing exists today.
- Files: new `website/src/components/product/TechnicalDetailsNavigation/` primitive and README; `ProductPage` refactor preserving the existing wagon navigation; optional `SpecificationGroup` fragment id and README contract update; PRO view model, English/localized production assemblers, editorial fixture, German localization map, and focused editorial browser contract.
- Validation: pre-edit Node 22.13 `pnpm quality` static stages PASSed (formatting, ESLint, Astro diagnostics, 91 unit tests, production/component-lab builds, and 4 foundation tests); post-edit Prettier, Astro diagnostics (0 errors/warnings/hints), all 91 unit tests, production build (125 pages), German generated-output label check, and diff hygiene PASS. Focused browser-suite startup is `NOT_RUN` because its configured component-lab listener cannot bind `127.0.0.1:4322`; direct browser review on `http://localhost:4321/pro-platform-projects/` confirms the 44px action, rich hero-to-story presentation, and click destination. State/input validators PASS.
- Next exact action: await explicit direction before reopening this correction; concurrent TAS Group and H-004 work remain out of scope.

## Completed correction — H-004 WagonSwitchyard Tank selector proportional scale

- Status: `IMPLEMENTED`.
- Objective: made only the homepage Tank selector render visibly smaller in height while preserving the supplied asset's proportions.
- Boundary: retained the typed caller-owned reduced-media option and applied a proportional visual scale to the Tank media frame rather than only constraining its reserved width. The source asset, Tank product-page render, all other family records, selector geometry, interaction, copy, routes, and locales remain unchanged.
- Modified files: `website/src/components/home/WagonSwitchyard/{WagonSwitchyard.astro,README.md}`, `website/tests/browser/homepage.spec.ts`, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Asset evidence: source and production copies are both 1013 × 596 px with SHA-256 `9142f2963c965255608d6c9d4671aad50815bcdd583cf1461b0d54e143997280`.
- Validation: current-cycle state/input validators pass; the immediately preceding H-004 scale baseline passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests, with browser stage `NOT_RUN` because port 4322 is occupied. Post-edit Prettier, Astro diagnostics, production build, and focused homepage browser evidence pass 6/6 at 320/390/768/1024/1440/844×390. The selected Tank image remains `image001`; its 86%-width media frame now uses `scale(0.78)`, so the visible wagon reduces proportionally to about 67% of the stage width and 78% of its previous height.
- Next exact action: await explicit direction before continuing the outstanding H-004 active-rail evidence or opening another package.

## Completed correction — H-004 WagonSwitchyard active-rail endpoints

- Status: `IMPLEMENTED`.
- Objective: extend the wide selected-stop connector in red on both sides while keeping the route line bounded by its first and last stops.
- Boundary: middle stops receive equal left/right red reach; stop 01 has no red line before its dot and stop 05 has none after its dot. Compact horizontal scrolling, stop/card geometry, interaction, motion, content, assets, routes, and locales are unchanged.
- Modified files: `website/src/components/home/WagonSwitchyard/{WagonSwitchyard.astro,README.md}`, `website/tests/browser/wagon-switchyard.spec.ts`, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: targeted Prettier and Astro diagnostics pass with 0 errors/warnings/hints; the production build passes with 125 pages. Focused WagonSwitchyard component/no-JavaScript/interaction/responsive/axe coverage passes 34 checks with 8 expected desktop-preview skips across 320/390/768/1024/1440/844×390; focused visual comparisons pass 6/6 across the same profiles. Direct homepage inspection confirms the first, middle, and last endpoint treatments.
- Next exact action: preserve the separately active proportional Tank selector scale correction; this active-rail evidence is complete.

## Completed correction — A-005 Company EvidenceList bottom spacing

- Status: `IMPLEMENTED`.
- Objective: add deliberate bottom padding to the `evidence-list__frame page-frame` section on the Company page.
- Boundary: adjust only the existing `EvidenceList` compact-spacing mode used by Company, its focused geometry/visual evidence, README, tracker, `STATUS.md`, and `CHANGELOG.md`. Preserve evidence content, ordering, semantics, standard spacing, routes, and every non-Company page.
- Intended files: `website/src/components/editorial/EvidenceList/EvidenceList.astro`, its README, Company editorial browser contract and affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests, then stopped before browser execution because `127.0.0.1:4322` is already in use.
- Validation: focused EvidenceList contracts pass 2/2; Astro diagnostics pass with 0 errors/warnings/hints; the production build passes with 125 pages. Company editorial composition and the explicit 48 px lower-inset geometry pass 6/6 across 320/390/768/1024/1440/844×390. Refreshed and clean Company visual comparisons pass 6/6 across the same profiles, with direct 320 and 1440 inspection.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 PRO Platform Projects route

- Status: `IMPLEMENTED`.
- Objective: make `/pro-platform-projects/` the canonical public route for the existing PRO Platform Projects page so its URL matches the current visitor-facing name.
- Boundary: update the shared editorial slug, homepage/header/footer links, localized EN/DE/UK/PL/CS routes, fixtures, audits, and release-output contracts. Preserve all existing page content and media. Keep `/engineering-services/`, `/technology/`, and their localized equivalents as permanent compatibility redirects to the new canonical route.
- Intended files: editorial, homepage, and site-shell view models; Astro redirect configuration; route/release audit scripts; route fixtures and focused unit/browser contracts; component plan/tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests, then stopped before browser execution because `127.0.0.1:4322` is already in use.
- Validation: targeted formatting and ESLint pass; Astro diagnostics pass with 0 errors/warnings/hints; all 91 unit tests pass; production and component-lab builds plus 4 foundation tests pass. The content/brand audit, route integration (`routes=124 products=10 internal-references=5004`), and deployment-readiness audit pass. English editorial/homepage/header browser contracts pass 6/6 at 320 and 1440; localized production-route checks pass 8/8 at 320 and 1440; unchanged PRO visuals pass 6/6 across all required profiles. The live preview returns 200 at the new route and permanently redirects both legacy route families to it in every locale.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 PRO INTERMODAL 60 ft data

- Status: `IMPLEMENTED`.
- Objective: replace the broad PRO-project overview on `/engineering-services/` with the supplied PRO INTERMODAL 60 ft product narrative, economics boundary, removable-ballast explanation, container and special-equipment uses, confirmed operation, exact technical characteristics, A-D load-limit table, and enquiry action; update the existing homepage PRO section with the same bounded facts.
- Boundary: treat the user-supplied Russian brief as the sole authority for the new PRO technical and operating claims; preserve the canonical `/engineering-services/` route, localized routes, legacy `/technology/` redirects, existing local PRO media, server rendering, and all unrelated pages. Reuse verified editorial/product primitives and extend only the smallest reusable editorial copy contract required for paragraphs and lists.
- Intended files: a persisted client source note; editorial/homepage view models and localized copy maps; MediaStory typed contract/implementation/README and focused unit coverage; editorial route assemblers for technical specifications and the load-limit table; focused content/browser contracts; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passed Prettier, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, the 125-page production build, the 62-page component-lab build, and four foundation tests; the aggregate stopped before browser execution because the user-visible preview owns `127.0.0.1:4322`, so it is not claimed green.
- Validation: MediaStory and LoadLimitTable contracts PASS 4/4; Astro diagnostics PASS with 0 errors, warnings, or hints; the production build produces 125 pages; content/brand and route-integration audits PASS (`routes=124 products=10 internal-references=4994`). Focused English component/responsive/keyboard/axe evidence PASSes 48/48 across 320/390/768/1024/1440/844×390. Localized production-route evidence PASSes 18/18 at 320 and 1440. Refreshed and clean PRO-page/homepage visual comparisons PASS 12/12, and both pages were inspected directly at 320 and 1440.
- Source boundary: the user-named Google Drive PDF `про 60 сгнс.pdf` was not discoverable in the connected account and is not claimed as inspected. The user-supplied Russian brief is authoritative; the attached product-sheet screenshots independently support the core Sgns values recorded in `client-remarks/pro-intermodal-60ft-2026-09-08-ru.txt`.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — P-003 WagonModelList card density

- Status: `IMPLEMENTED`.
- Objective: decrease the spacing between each wagon model's title, summary, details, media, and action so the family-model cards are less tall, matching the supplied visual reference.
- Boundary: CSS-only WagonModelList correction; preserve source order, semantic headings, source-owned copy, local contained media, direct links, compact one-column flow, wide three-column alignment, and all routes/locales.
- Intended files: `website/src/components/catalogue/WagonModelList/WagonModelList.astro`, its README, focused browser evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: root `pnpm quality` was `NOT_RUN` because the root has no package manifest; the required website baseline from `website/` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests, then stopped before browser execution because `127.0.0.1:4322` is already in use.
- Validation: focused WagonModelList browser component, keyboard, responsive, axe, and visual evidence passes 30/30 across 320/390/768/1024/1440/844×390; refreshed 320/390/768/1024/1440/phone-landscape baselines were generated and the 1440 output was inspected directly. Prettier and Astro diagnostics pass with 0 errors, warnings, or hints; `git diff --check` passes.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — H-004 homepage timber representative

- Status: `IMPLEMENTED`.
- Objective: replace the homepage Timber family's Snps representative render with the approved Rnoos render shown in the supplied screenshot, keeping the visible model code synchronized.
- Boundary: caller-owned homepage WagonSwitchyard data and focused evidence only; preserve both timber product pages, family summary and route, all other family records, component behavior, responsive containment, autoplay rules, and every locale.
- Intended files: `website/src/adapters/content/homepage-view-model.ts`, focused homepage/WagonSwitchyard browser evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Node 22.13 `pnpm quality` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and 4 foundation tests, then stopped before browser execution because `127.0.0.1:4322` is already in use.
- Validation: Prettier and Astro diagnostics pass with 0 errors/warnings/hints; focused homepage component, keyboard, responsive, axe, and visual evidence passes 30/30 across 320/390/768/1024/1440/844×390. Direct interactive inspection confirms the selected Timber panel displays the Rnoos end-frame render and `Timber · Rnoos`. The 125-page production build, content/brand audit, route integration (`routes=124 products=10 internal-references=4994`), and diff hygiene pass.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-002 ModularPlatformSection stage spacing

- Status: `IMPLEMENTED`.
- Objective: ensure the four wide-screen ModularPlatformSection stage title and description blocks retain clear horizontal space and never appear to touch their neighbours.
- Boundary: adjust only the reusable wide-stage layout and its focused visual/geometry evidence. Preserve source order, four-stage rail, copy, action, compact vertical composition, theme, interaction, and all routes/locales.
- Intended files: `ModularPlatformSection.astro`, its focused browser contract and affected homepage visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators passed.
- Validation: focused component contract tests pass 2/2 and Astro diagnostics pass with 0 errors, warnings, or hints. The production build produces 125 pages. Refreshed and clean focused ModularPlatformSection/homepage browser evidence passes 60/60 across 320/390/768/1024/1440/844×390, covering source order, no-JavaScript actions, responsive containment, stage-gap geometry, axe, and visual references. Direct 1440 review confirms the four title and description blocks are clearly separated.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-002 Homepage action destinations

- Status: `IMPLEMENTED`.
- Objective: restore the requested homepage split: the unchanged source-backed `ModularPlatformSection` leads to the all-wagons catalogue, while `PayloadValueSection` presents PRO platform projects and leads to Engineering & Services.
- Boundary: extend existing typed optional action presentation only as needed; update caller-owned EN/DE/UK/PL/CS labels, copy, and localized paths; retain the transport-task text and rail stages, server rendering, action semantics, responsive layout, approved local visual, and every unrelated section/route. Use the existing source-backed PRO copy only; do not add technical claims.
- Intended files: PayloadValueSection and ModularPlatformSection typed action contracts, implementations, and READMEs; homepage/localized copy adapters; focused component/homepage contracts and visual references; content audit; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators passed. Astro diagnostics passed with 0 errors, warnings, or hints.
- Validation: focused component contracts pass 5/5; the production build produces 125 pages; content/brand audit and route integration pass (`routes=124 products=10 internal-references=4999`). Refreshed and clean focused component/homepage browser evidence passes 90/90 across 320/390/768/1024/1440/844×390, covering action destinations, no-JavaScript navigation, responsive containment, axe, and visual references. Direct 320 and 1440 review confirms the two clear, distinct primary actions and clean reflow.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-002 Homepage transport-task narrative

- Status: `IMPLEMENTED`.
- Objective: use the newly supplied client message “От транспортной задачи к готовому вагону” in the existing homepage transport-task section, making clear that work begins with understanding the real transport task, then identifies a suitable configuration or an operating-condition-specific solution.
- Boundary: update only the caller-owned EN/DE/UK/PL/CS content for `ModularPlatformSection`, remove the now-inaccurate PRO promotional action from that section, and synchronize focused homepage contracts and state records. Preserve the shared section design and semantics, homepage order, existing Engineering & Services route, all other claims, images, and routes.
- Files: EN/DE/UK/PL/CS homepage copy adapters; homepage and localization contract checks; content/brand audit; six refreshed homepage visual references; client implementation plan, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state and input validation pass; Astro diagnostics pass with 0 errors, warnings, or hints.
- Validation: the 125-page production build, content/brand audit, and route integration (`routes=124 products=10 internal-references=4994`) pass. Focused homepage browser, no-JavaScript, responsive, axe, and visual evidence passes 30/30 across 320/390/768/1024/1440/844×390. Direct compact and wide review confirms the longer source text reflows cleanly with no PRO action in this section. The combined component-lab locale run is `NOT_RUN` as package evidence because its known route fallback serves localized paths as English; the production build and content audit verify all five localized outputs and their full introductory sentences.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 Company hero image presentation

- Status: `IMPLEMENTED`.
- Objective: preserve the full width and lettering of the supplied Company hero photograph rather than cropping it into the generic tall PageHero image frame.
- Boundary: add only a typed caller-owned PageHero option that preserves an intentionally supplied natural media ratio; apply it only to the Company hero. Preserve the supplied image, alt text, source-owned copy, all routes, and every non-Company hero.
- Files: Company editorial view model; the typed PageHero natural-ratio contract, implementation, and README; focused unit/editorial/localization browser evidence; affected Company visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validation passes. The shared PageHero applies a 32-rem wide-screen image minimum; because the supplied Company image is 3:2, its generic `cover` presentation crops the horizontal lettering in the taller half-width frame. The existing `contain` fit alone cannot prevent the clipping because that minimum height still exceeds the ratio-reserved frame.
- Validation: focused PageHero contract unit coverage passes 2/2 and Astro diagnostics pass with 0 errors, warnings, or hints. The 125-page production build, content/brand audit, and route integration (`routes=124 products=10 internal-references=4999`) pass. Shared PageHero regression evidence and focused editorial component/responsive/keyboard/axe evidence each pass 24/24; refreshed Company visual comparisons pass 6/6; and localized production-route evidence passes 54/54 across 320/390/768/1024/1440/844×390. The compact and wide Company output was directly inspected.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 MediaStory spacing

- Status: `IMPLEMENTED`.
- Objective: ensure every image-free `MediaStory` has deliberate top and bottom padding so its text does not sit against a section boundary, including immediately after a `PageHero`; at the wide two-column layout, keep an illustrated story's image flush to its section's top and bottom when it is at least as tall as the adjacent text.
- Boundary: change only the shared `MediaStory` spacing rules, its focused contract/evidence, and required state records. Preserve media-story source order, the existing caller-selected `generous-top` option, component API, copy, and routes.
- Intended files: `MediaStory.astro` and README; focused MediaStory/editorial browser evidence and affected visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. The current source already uses a shared block inset but the PageHero handoff token reduces the first image-free section's top padding to 12 px, which causes the reported crowded edge.
- Validation: Astro diagnostics pass with 0 errors, warnings, or hints. The 125-page production build, content/brand audit, and route integration (`routes=124 products=10 internal-references=4999`) pass. Focused MediaStory/editorial browser evidence passes 72/72 across 320/390/768/1024/1440/844×390, covering source order, no-JavaScript actions, responsive containment, axe, wide image-edge geometry, and refreshed visual references. The 320 and 1440 PRO references were directly inspected, and the local production preview was refreshed.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 PRO-led Engineering & Services page

- Status: `IMPLEMENTED`.
- Objective: replace the canonical `/engineering-services/` content with a PRO-led page that explains the implemented lightweight 60-foot PRO-family platform projects, their special structural solutions and high-strength steel, and the transport-task engineering considerations that guide a project.
- Boundary: preserve `/engineering-services/`, all localized equivalents, and the compatible `/technology/` legacy redirects. Use only `client-remarks/company-information-2026-09-08.txt` and supplied local imagery; write matching EN/DE/UK/PL/CS content; retain the established editorial components and server-rendered/no-JavaScript behaviour. Do not assert measured PRO outcomes, technical values, approvals, customer projects, or manufacturing capabilities not supplied by the client.
- Intended files: editorial and shell/homepage copy adapters, route assemblers and focused editorial/localization/audit tests, the affected layout documentation and visual references, client implementation plan, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validation passed. The Node 22.13 `pnpm quality` static stages passed formatting, ESLint, Astro diagnostics, unit tests, both builds, and foundation tests; its browser stage could not bind the visible preview's port `4322`, so the aggregate is not a pass.
- Validation: targeted formatting and ESLint pass; Astro diagnostics pass with 0 errors/warnings/hints; production build (125 pages), component-lab build (62 pages), route integration (`routes=124 products=10 internal-references=4999`), content/brand audit, and diff hygiene pass. Focused English editorial evidence passes 48/48 across 320/390/768/1024/1440/844×390, including no-JavaScript keyboard navigation, responsive containment, axe, and six visual references. Localized production-route evidence passes 54/54 for DE/UK/PL/CS. Homepage integration passes 30/30 after its promotional action-label update. The 320 and 1440 PRO references were directly inspected.
- Next exact action: await explicit direction before opening E-003 or another bounded package.

## Completed correction — A-005 Company-page source expansion

- Status: `IMPLEMENTED`.
- Objective: replace the current catalogue-only Company page with the owner-supplied company narrative: TransAnt’s role, transport-task analysis, engineering and commercial disciplines, quality controls, TAS Group coordination, PRO development, and the UNO range.
- Boundary: use only `client-remarks/company-information-2026-09-08.txt` and the supplied local image bundle; author matching EN/DE/UK/PL/CS copy; retain the existing reusable `PageHero`, `PageMeta`, `MediaStory`, `EvidenceList`, and `ContactCTA` composition, the source-owned legal facts, local routes, no-JavaScript rendering, and Quality as the certificate destination. Do not add unsourced employee counts, future holding statements, partner capabilities, certificates, performance values, or manufacturer claims.
- Intended files: Company editorial view model and local editorial images; German and additional-locale maps; Company-route browser/audit evidence and visual references; client implementation plan, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validation passed. Under Node 22.13, `pnpm quality` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, both static builds, and four foundation tests. Its browser stage could not bind `127.0.0.1:4322` because the visible preview occupied that port, so the aggregate was not a pass.
- Validation: formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 91 unit tests, the 125-page production build, component-lab build, foundation tests, and the extended content/brand audit pass. Isolated Company component, keyboard, responsive, and axe checks pass 24/24 across 320/390/768/1024/1440/844×390; six Company visual baselines pass and the 320/1440 results were inspected directly. Localized production-route checks pass 54/54 across the same six profiles for DE/UK/PL/CS Company routes and the related locale route contracts. The final broad `pnpm quality` browser stage remains non-green only because the component-lab server falls back to English for locale production routes; the targeted production-preview check supersedes that fixture limitation for this package.
- Next exact action: await explicit direction before opening E-003 or another bounded client-image package.

## Completed correction — A-002 hero and InnoTrans first-screen composition

- Status: `IMPLEMENTED`.
- Objective: let the complete HomeHero and a recognizable beginning of the immediately following InnoTrans section share the opening desktop viewport, instead of forcing HomeHero to consume nearly all available screen height.
- Boundary: wide HomeHero vertical sizing and its homepage integration evidence only. Preserve mobile intrinsic flow, complete contained image, copy, actions, section order, InnoTrans content/layout, and every non-homepage section.
- Intended files: `website/src/components/home/HomeHero/{HomeHero.astro,README.md}`, focused homepage responsive tests and affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` PASSed formatting, ESLint, Astro diagnostics with 0 errors/warnings/hints, all 91 unit tests, both builds, and four foundation tests; its browser phase did not start because the user-visible preview owns port 4322, so the aggregate is not green.
- Validation: targeted formatting and Astro diagnostics PASS with 0 errors/warnings/hints; the 125-page production build, content/brand audit, and diff hygiene PASS. Refreshed and clean focused HomeHero/homepage evidence PASSes 54/54 across 320/390/768/1024/1440/844x390. At both wide profiles, the responsive assertion requires at least five rem of InnoTrans to enter the opening viewport; direct 1440 review confirms the complete hero and a substantial, recognizable portion of the dark event section share the first screen. The initial title-visible assertion was intentionally replaced because InnoTrans internally centers unequal columns; a six-rem threshold then missed 1024 by five pixels, and the final five-rem requirement passes without changing compact flow.
- Next exact action: await explicit direction before opening E-003, expanding the Company page, or selecting another approved client-image slice.

## Completed correction — A-002 homepage hero mobile action width

- Status: `IMPLEMENTED`.
- Objective: make the primary and secondary HomeHero actions occupy the same available width on the narrowest mobile container, correcting the visibly unequal buttons reported on the production homepage.
- Boundary: action sizing inside `HomeHero` only. Preserve labels, destinations, variants, spacing, touch height, desktop content-width behavior, copy, media, source order, and every action outside the homepage hero.
- Intended files: `website/src/components/home/HomeHero/{HomeHero.astro,README.md}`, focused HomeHero/homepage browser tests and narrow visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` PASSed formatting, ESLint, Astro diagnostics with 0 errors/warnings/hints, all 91 unit tests, both builds, and four foundation tests; its browser phase did not start because the user-visible preview already owns port 4322, so the aggregate is not green.
- Validation: targeted formatting and Astro diagnostics PASS with 0 errors/warnings/hints; the 125-page production build, content/brand audit, and diff hygiene PASS. Refreshed and clean focused HomeHero/homepage evidence PASSes 54/54 across 320/390/768/1024/1440/844x390. Direct geometry assertions on both the component fixture and production homepage prove the two actions differ by no more than one pixel below 480px, while the existing 30-rem breakpoint restores intrinsic widths on wider containers. The refreshed 390 output was inspected directly.
- Next exact action: await explicit direction before opening E-003, expanding the Company page, or selecting another approved client-image slice.

## Completed correction — A-002 homepage hero typography scale

- Status: `IMPLEMENTED`.
- Objective: reduce the HomeHero headline and supporting-copy sizes using the established regular PageHero/SectionIntro typography scale, so the copy block is visually closer to the contained image size.
- Boundary: typography only inside `HomeHero`; preserve wording, red emphasis, actions, viewport-aware height, complete-image presentation, layout, source order, and every non-homepage hero.
- Files: `website/src/components/home/HomeHero/{HomeHero.astro,README.md}`, `website/tests/browser/home-hero.spec.ts`, twelve focused HomeHero/homepage visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` PASSed formatting, ESLint, Astro diagnostics, all 91 unit tests, both builds, and four foundation tests; its browser phase did not start because the visible preview already owns port 4322, so the aggregate is not green.
- Validation: targeted formatting and Astro diagnostics PASS with 0 errors/warnings/hints; the 125-page production build, content/brand audit, and diff hygiene PASS. Refreshed and clean focused HomeHero/homepage evidence PASSes 54/54 across 320/390/768/1024/1440/844x390. The component assertion directly compares computed HomeHero title font size, line height, letter spacing, and description size with the regular PageHero/SectionIntro values. Direct 320 and 1440 inspection confirms the quieter copy scale, unchanged red emphasis, full image visibility, and preserved layout.
- Next exact action: await explicit direction before opening E-003, expanding the Company page, or selecting another approved client-image slice.

## Completed correction — A-002 homepage hero proportion and crop

- Status: `IMPLEMENTED`.
- Objective: keep the complete TRANSANT name visible in the approved red wagon photograph, increase the hero's top and bottom breathing room, and let the wide composition respond to the available viewport height without trapping compact-screen content in a fixed-height frame.
- Boundary: change only the homepage hero media presentation and component-owned vertical sizing. Preserve copy, actions, source order, navigation, adjacent sections, the default crop contract used by the component fixture, and every non-homepage hero.
- Files: `website/src/adapters/content/homepage-view-model.ts`, `website/src/components/home/HomeHero/{HomeHero.astro,README.md}`, `website/tests/browser/homepage.spec.ts`, twelve focused homepage/HomeHero visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` PASSed formatting, ESLint, Astro diagnostics (0/0/0), all 91 unit tests, both builds, and four foundation tests; its browser stage did not start because the user-visible preview already owns `127.0.0.1:4322`, so the aggregate is not green.
- Validation: targeted formatting and Astro diagnostics PASS with 0 errors/warnings/hints; the 125-page production build and content/brand audit PASS; diff hygiene PASS. Refreshed and clean HomeHero/homepage evidence PASSes 54/54 across 320/390/768/1024/1440/844x390, covering complete-image 3:2 geometry, viewport-aware wide height, default cover-media behavior, source order, keyboard, responsive containment, axe, and visual comparisons. Direct inspection of the 320 and 1440 homepage outputs confirms the full TRANSANT name remains visible and the wide hero fills the available first-screen height. The mistyped `pnpm check:content-brand` alias failed and was immediately replaced by the correct passing `pnpm check:content-brand-audit` command.
- Next exact action: await explicit direction before opening E-003, expanding the Company page, or selecting another approved client-image slice.

## Completed correction — A-002 client-supplied company introduction

- Status: `IMPLEMENTED`.
- Objective: replace the locomotive-led homepage hero with the supplied `client-remarks/imgs/лого вырезано на вагоне.jpg`; introduce TransAnt GmbH concisely as the Linz-founded Austrian TAS Group company that develops, markets, and supports freight-wagon solutions for the European standard-gauge network; retain the wagon-catalogue action and add a localized Company-page action.
- Process frame: replace the catalogue-selection wording in `ModularPlatformSection` with a source-backed four-stage customer journey: transport-task analysis; concept and configuration; engineering, testing, and approval; coordinated industrial implementation, delivery, and technical support.
- Boundary: no Company-page rewrite, PRO project claim, staff count, future holding statement, new InnoTrans content, certificate presentation, automatic form workflow, or unrelated image rollout. Preserve the current Hero → InnoTrans → WagonSwitchyard order and every existing route/interaction outside the changed copy and hero media.
- Files: preserved the client source as `client-remarks/company-information-2026-09-08.txt`; copied the approved wagon detail byte-identically to the production image source; updated the EN/DE/UK/PL/CS homepage view-model copy; added caller-owned centered media focus to `HomeHero`; updated the ModularPlatformSection documentation; extended the content/brand audit; refreshed the six homepage visual references; and synchronized the focused tests, client plan, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` PASSed formatting, ESLint, Astro diagnostics (0/0/0), 91 unit tests, both builds, and four foundation tests; its browser server could not bind `127.0.0.1:4322` (`listen EPERM`), so the aggregate is not green.
- Validation: targeted formatting and diff hygiene PASS; Astro diagnostics PASS with 0 errors/warnings/hints; all 91 unit tests PASS; production build PASSes with 125 canonical pages; route integration PASSes (`routes=124 products=10 internal-references=4999`); content/brand audit PASSes for 125 documents and pins the approved company introduction, localized Company actions, and local red hero media on all five homepages. Refreshed and clean homepage browser evidence PASSes 30/30 across 320/390/768/1024/1440/844×390; the combined shared-HomeHero/homepage suite PASSes 54/54, including keyboard, no-JavaScript, axe, responsive containment, unchanged default hero crop, and visual comparisons. Direct review of 320 and 1440 outputs confirms the new crop and process reflow. The broader German component-lab test remains non-green for the pre-existing fixture-server routing issue; German and the other localized production routes are built and their localized output is audited, so no broad aggregate is claimed.
- Next exact action: await explicit direction before opening E-003, expanding the Company page from the supplied narrative, or selecting another subset of the client image bundle.

## Completed correction — I-005 InnoTrans positions on the homepage

- Outcome: `IMPLEMENTED`. The later client decision supersedes the earlier dedicated-page approval. The InnoTrans primary-navigation item, localized `/innotrans-2026/` routes, page layout/view model, partner-logo assets, tests, fixtures, and route-review entries are removed.
- Contract: retain the existing localized homepage event announcement; show 22–25 September 2026 and `Messe Berlin · Outdoor Display`; identify O5/55 as the main display and T5/50, T5/55, and T5/60 as additional positions; link every code directly to the matching official InnoTrans hall-plan entry; and retain the existing official exhibitor-profile action. Do not show a map, diagram, spatial schematic, partner logos/list, exhibit-to-position assignment, directions workflow, or meeting workflow.
- Plan: `docs/specifications/client-remarks-content-implementation-plan.md`.
- Files: homepage InnoTrans component/API/README, EN/DE/UA/PL/CZ homepage content adapters, component fixture, homepage/event browser and visual evidence, removal of the canceled page/nav/routes/assets/tests/review entries, client plan, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Supplementary approved correction: all four visitor-facing catalogue-note messages are removed from wagon pages. This changed only the public annotation layer; source-derived values and table cells remain untouched. The Rnoos `18.50` literal stays as supplied, but its former ambiguity note is retained only in the implementation plan until a corrected source value is supplied.
- H-002 boundary: the RailwayOrbital catalogue-render revision is paused without code changes while this explicitly authorized content package is active.
- Baseline: state/input validators PASS. The 2026-09-07 Node 22.13 `pnpm quality` run PASSed formatting, ESLint, Astro diagnostics, all 90 unit tests, both builds, and 4 foundation tests. Its browser phase reproduced the recorded component-lab locale-routing failures for UA/PL/CZ and was stopped after 68 passed, 4 failed, 5 interrupted, and 1,327 not run; the aggregate is not claimed green.
- Current pre-edit baseline: the active page slice began from state/input validator PASS. The Node 22.13 `pnpm quality` run passed every static stage and reproduced the recorded component-lab locale-routing failures in its browser phase; the aggregate was not claimed green.
- Supplementary correction validation: focused product-page view-model tests PASS 5/5; production build PASSes with 130 pages; content/brand audit PASSes for 130 documents and ten products; generated EN/DE/UA/PL/CZ wagon output contains neither `Catalogue notes` nor any removed note text; targeted Prettier and `git diff --check` PASS. The full quality baseline remains blocked by the unrelated InnoTrans test error above.
- Validation: Node 22.13 Astro diagnostics PASS with 0 errors/warnings/hints; all 91 unit tests PASS; the production build returns to 125 canonical pages plus five legacy redirect documents; route integration PASSes (`routes=124 products=10 internal-references=4994`); content/brand audit PASSes for 125 canonical documents; deployment readiness PASSes for 130 generated documents. Focused InnoTransEvent behaviour/accessibility checks PASS 24/24. Refreshed and clean homepage, event-component, and responsive homepage visuals PASS 18/18 across 320/390/768/1024/1440/844×390, with the final non-map position card inspected at compact and wide widths. Final state/input validators and diff hygiene PASS. `pnpm prepare:release-output` remains `NOT_RUN` without an approved public HTTPS origin, as required by its contract.
- Remaining blocker: longer homepage, Company, Engineering and Services, PRO, InnoTrans, and ten-model narratives require client source material and factual confirmation in any usable form. The client does not need to provide English or localized copy: the implementation team prepares English and synchronizes DE, UA, PL, and CZ. The revised homepage position slice does not authorize those narratives or any other technical proposal until their source facts are supplied.
- Next exact action: wait for the remaining client source material or explicitly open the already approved A-002 homepage Variant A follow-on as a separate bounded package.

## Completed package — A-002 homepage restructuring, Variant A

- Status: `IMPLEMENTED`. The owner-approved follow-on is complete; its focused evidence is green, while the repository-wide quality aggregate remains non-green for pre-existing unrelated failures.
- Scope: retain the current five-family switchyard, product data/routes, existing approved EN/DE/UA/PL/CZ positioning statement, local hero media, InnoTrans/quality/contact destinations, server rendering, no-JavaScript behaviour, and vertical compact family sequence. Improve only homepage composition and the visual prominence of the existing hero/logo without new company, partner, project, or performance claims.
- Explicit exclusions: no hero-media replacement without an approved local asset; no new process/PRO/TAS narrative before client source material and factual confirmation are supplied in any usable form; no dedicated InnoTrans page, maps, exhibits, partners, meeting workflow, comparison tool, or Timber-media work. The verified homepage stand-position list remains in place. Certificate presentation is separately scheduled as E-003; product downloads and the automatic contact workflow remain deferred for R1.
- Plan source: `docs/specifications/client-remarks-content-implementation-plan.md`, “Homepage restructuring decision — 2026-09-07”.
- Validation: focused homepage checks PASS 30/30 across 320/390/768/1024/1440/844×390, including composition, keyboard, no-JavaScript, responsive containment, axe, and refreshed visual references. Prettier, Astro diagnostics, 91 unit tests, production build (125 pages), route integration, content/brand audit, and deployment readiness PASS. The 1440 visual was inspected directly.

## Completed package — A-002 homepage restructuring, Variant A

- Status: `IMPLEMENTED`.
- Objective: make the homepage journey clearer by giving the existing hero and catalogue entry point stronger priority, then presenting existing proof/event material before the final contact action. No new copy, claims, routes, or assets are authorized.
- Intended files: `website/src/pages/index.astro`, `website/src/components/home/LocalizedHomepage/LocalizedHomepage.astro`, `website/src/components/home/GermanHomepage/GermanHomepage.astro`, `website/src/components/home/HomeHero/HomeHero.astro`, `website/src/components/shell/SiteHeader/SiteHeader.astro`, matching homepage browser tests/visual references, component READMEs, tracker, `STATUS.md`, and `CHANGELOG.md`; exact changes may narrow after inspection.
- Baseline: Node 22.13 `pnpm quality` static stages PASS; broad browser phase reproduced known locale-routing/component-lab failures, stale visual references, and related existing failures, ending `1251 passed`, `129 failed`, `16 skipped` after 5.7 minutes. Aggregate is not claimed green.
- Next exact action: open H-004 as a separate package only when ready to implement its approved desktop preview and compact scroll-snap follow-on.

## Completed correction — A-002 InnoTrans placement

- Status: `IMPLEMENTED`. The existing `<InnoTransEvent>` frame now directly follows `<HomeHero>` in English, German, and shared additional-locale homepage compositions, plus the homepage component-lab fixture.
- Contract: preserve the exact InnoTrans content, official external links, server rendering, localizations, hero, five-family switchyard, and all remaining homepage section order. The only visual/content-flow change is the event frame's placement immediately after the hero.
- Intended files: `website/src/pages/index.astro`, `website/src/components/home/{GermanHomepage,LocalizedHomepage}/*.astro`, `website/component-lab/pages/fixtures/homepage.astro`, homepage order/browser tests, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` static stages PASSed (formatting, ESLint, Astro diagnostics with 0 errors/warnings/hints, 91 unit tests, production/lab builds, and four foundation tests). Its unprivileged browser server could not bind `127.0.0.1:4322` (`listen EPERM`), so the aggregate is not green.
- Validation: focused Astro diagnostics PASS with 0 errors/warnings/hints. Refreshed and clean homepage browser evidence PASSes 30/30 across 320/390/768/1024/1440/844×390, including composition source order, no-JavaScript navigation, responsive containment, axe, and visual comparison. Direct localhost inspection confirms Hero → InnoTrans event → wagon selector.
- Next exact action: await explicit direction before opening E-003 or another approved package.

## Deferred future — A-002 homepage expansion, Variant B

- Status: `BLOCKED`. The full client-requested expansion is documented but is not authorized for implementation.
- Unblock only with: approved local hero asset; source text and factual confirmation in any usable form; and, where relevant, approved PRO/TAS/InnoTrans facts, claims, photos/renders, logos, and captions. The implementation team prepares English and all localized versions.
- Status transition: update the client-remarks plan to `READY_TO_OPEN` only when the complete required input bundle is received and its exact revisions are recorded. Drafts, external links, or unverified source material do not unblock it.

## Completed correction — H-004 wagon-family discovery

- Status: `IMPLEMENTED`. The owner-directed correction retains the H-004 `WagonSwitchyard` component identity.
- Desktop: while eligible on a desktop fine pointer, animate the selected rail state continuously through all five families at five-second intervals. All preview controls are removed. Hover, focus, and direct click/keyboard selection do not stop the sequence; a manual selection establishes the next item. No focus, scroll, automatic navigation, live-region chatter, persistent state, or telemetry is introduced.
- Mobile: replace the verified vertical selector only when this stage opens, with a CSS scroll-snap horizontal rail that shows a partial next family card. It never auto-scrolls or auto-selects; swipe is optional and direct links/no-JavaScript/keyboard access remain available.
- Intended files: `website/src/components/home/WagonSwitchyard/{WagonSwitchyard.astro,WagonSwitchyard.types.ts,wagon-switchyard-contract.ts,wagon-switchyard-controller.ts,README.md}`, homepage locale-copy adapters, focused unit/browser tests, H-004 plan/tracker records, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` static stages PASSed (formatting, ESLint, Astro diagnostics, 91 unit tests, production/lab builds, and four foundation tests). Its browser server cannot bind `127.0.0.1:4322` in the unprivileged sandbox (`listen EPERM`), so the aggregate is not green.
- Live verification: after refresh, the user-visible localhost preview contains zero buttons. It changed `open-box` to `tank` over six seconds; after a direct Open box click, it changed to Tank again over the next six seconds while remaining active.
- Validation: focused Astro diagnostics (0 errors/warnings/hints) and all 91 unit tests PASS. Focused `WagonSwitchyard` browser evidence PASSes 40/40 with eight expected desktop-only skips, proving uninterrupted looping through hover, focus, and manual selection; reduced-motion/data-saving suppression; no-JavaScript routes; keyboard; repeated instances; responsive containment; axe; and visual baselines. Affected homepage integration PASSes 30/30 across 320/390/768/1024/1440/844×390.
- Next exact action: await explicit direction before opening E-003 or another approved package.

## Completed package — H-004 wagon-family discovery follow-on

- Status: `IMPLEMENTED`.
- Contract: retain every server-rendered direct route, existing manual tab selection, isolated instance state, wagon data, and compact no-autoplay CSS scroll-snap rail. At 1024 px and above on a fine pointer, after substantial visibility, loop the selected rail state through all five families at five-second intervals while eligible. Remove all preview controls; direct click/keyboard selection changes the selected family but does not stop automation. Never move focus, scroll the page, navigate, add live announcements, persist state, or collect telemetry.
- Intended files: `WagonSwitchyard` Astro/types/controller/README, component-lab fixture, focused unit/browser tests and visual references, responsive requirements and tracker records, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` formatting, lint, Astro diagnostics (0/0/0), 91 unit tests, production/lab builds, and four foundation tests PASS. Its browser server cannot bind `127.0.0.1:4322` under the sandbox (`listen EPERM`), so the aggregate is not green or complete.
- Evidence checkpoint: preview-control markup, labels, and controller paths are absent. The continuous loop and production-route integration are covered by the passing focused browser suites and direct localhost review above. The repository-wide browser aggregate remains `NOT_RUN` in the unprivileged baseline because of the recorded listener restriction.

## Deferred by user — E-003 certificate presentation

- Status: `DEFERRED`. The user decided on 2026-09-08 not to change certificate presentation; retain the current homepage and `/quality/` implementation. The earlier concept below remains historical context only and is not an eligible package.
- Interaction: wide fine-pointer hover may flip a certification card to its preview face; both faces retain an ordinary local-PDF link. Keyboard and touch have an explicit preview toggle, reduced motion uses an immediate non-3D face change, and no-JavaScript retains metadata plus a direct local-PDF link.
- Evidence: provenance/digest, local PDF/preview association, keyboard/touch/reduced-motion/no-JavaScript behaviour, axe, responsive containment, and refreshed Quality references.

## Production hosting and indexing

- Decision: production indexing is approved. Previews remain non-indexable; the production release finalizer must receive the approved public HTTPS origin and generate `robots.txt` with `Allow: /` plus the absolute `sitemap.xml` reference.
- Technical requirements: `docs/specifications/production-hosting-technical-requirements.md`.

## Completed correction — E-001 shared PageHero-to-section spacing contract

- User-visible outcome: every `PageHero` has a shared 12 px top and bottom inset, and its immediately following content section begins with the same 12 px handoff. Intermodal now uses that shared handoff rather than retaining its own large top field.
- Contract: semantic section roots have zero block margins. Sections own their intentional `padding-block`; a global custom property only replaces the first following section's top padding after `PageHero`. No route-specific margin, `!important`, or copied hero implementation was introduced. The Technology override inherits the same rhythm.
- Files: shared reset/tokens/global handoff; `PageHero`; `WagonFamilyIndex`, `WagonModelList`, `MediaStory`, `LegalDocument`, Contact, Technology, and the matching Contact component-lab assembly; component READMEs; focused browser assertions and visual references; tracker; `STATUS.md`; `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` static stages PASSed (formatting, ESLint, Astro diagnostics, 85 unit tests, both builds, and 3 foundation tests); its broad browser stage reproduced only the previously recorded unrelated component-lab locale routing, case-sensitive EvidenceList, and WagonSwitchyard/reference failures, and was stopped at 292 passed, 15 failed, 5 interrupted, 1 skipped, and 1,079 not run. That aggregate is not claimed green.
- Validation: focused formatting and `astro check` PASS with 0 diagnostics; production build PASSes with 125 pages. The focused PageHero/catalogue/editorial/legal-browser suite PASSes 192/192 at 320/390/768/1024/1440/844×390, including no-JavaScript, keyboard, axe, responsive CSS assertions, and refreshed visual baselines. Intermodal 320 and 1440 output was inspected directly.

## Completed correction — P-003 WagonModelList frame spacing

- User-visible outcome: `wagon-model-list__frame` no longer adds its former 24–32 px vertical field. Family routes keep the intentional 12 px PageHero handoff above the cards and no frame padding below them.
- Implementation: retained `page-frame` solely for horizontal gutters, each card's internal padding, list gaps, and responsive composition. The frame's sole block property now consumes `--section-padding-block-start` and otherwise resolves to zero.
- Validation: the clean pre-edit catalogue suite PASSed 66/66. Focused Prettier and Astro diagnostics PASS with 0 diagnostics; the 125-page production build PASSes. The refreshed and clean catalogue suite PASSes 66/66 across 320/390/768/1024/1440/844×390, asserting a 12 px top and 0 px bottom frame padding, source order, keyboard/no-JavaScript, axe, containment, and all family visuals. Flat 1440 was inspected directly.

## Completed correction — E-001 shared PageHero typography

- User-visible outcome: Technology now uses the identical shared PageHero `SectionIntro` font, size, tracking, line-height, and measure as Company and every other editorial PageHero.
- Implementation: removed the Technology-only title/description CSS override. Technology retains only its caller-owned surface, media presentation, and internal layout treatment; it cannot alter shared PageHero copy typography.
- Validation: focused Prettier and Astro diagnostics PASS with 0 diagnostics; the 125-page production build PASSes. The focused editorial suite PASSes 48/48 across 320/390/768/1024/1440/844×390, including an explicit Technology-versus-Company computed typography regression assertion, keyboard/no-JavaScript/axe coverage, and refreshed Technology visual references. Technology was inspected at 320 and 1440 px.

## Completed correction — E-001 default shared PageHero background

- User-visible outcome: the technical-grid hero background is now the PageHero default on every route; Technology no longer owns a copy of it. A caller can explicitly set `technicalBackground={false}` to produce a plain hero.
- Contract: `PageHero` owns a typed, runtime-validated boolean with a default of `true`; light and dark variants preserve their respective theme surfaces. Technology retains only its page-specific border and media treatment. The component-lab fixture exercises the opt-out and browser coverage asserts both states.
- Validation: focused Prettier, two PageHero unit tests, and Astro diagnostics PASS with 0 diagnostics; production build PASSes with 125 pages. The shared PageHero/catalogue/editorial/legal suite PASSes 192/192 at 320/390/768/1024/1440/844×390, including default/opt-out, keyboard/no-JavaScript/axe, responsive assertions, and refreshed visual references. Intermodal default-background output was inspected at 320 and 1440 px.

## Completed correction — E-001 shared hero layout and media treatment

- User-visible objective: PageHero content stays vertically centered with equal component-owned top/bottom padding, no page can override its layout or visual treatment, and every HomeHero, PageHero, and ProductHero image stage has the same bordered surface instead of mixed border, stripe, or borderless treatments.
- Implementation: every page-level `page-hero` selector has been removed. PageHero alone owns its alignment, equal padding, responsive grid, and default technical background. One global data-attribute rule gives HomeHero, light PageHero, and ProductHero the same clipped subtle surface and thin divider border; dark PageHero changes only those colours for contrast. The homepage stripe and ProductHero's patterned/padded media exception are removed.
- Validation: source audit finds no external PageHero selector. Prettier and Astro diagnostics PASS with 0 diagnostics; production build PASSes 125 pages. A new computed-style regression test proves that the light HomeHero, PageHero, and ProductHero frames are identical; focused hero tests cleanly PASS 78/78 across 320/390/768/1024/1440/844×390. The affected homepage, all product pages, and responsive integration suite PASS with refreshed visual references. Homepage 1440 and intermodal product 768 output were inspected directly.

## Completed correction — I-006 provider-neutral hosting privacy copy

- User-visible objective: remove the named hosting provider from the public “Website hosting and technical operation” privacy section and describe technical-data processing and legal safeguards in general, host-independent terms.
- Contract: preserve the section title, factual description of connection/log data, applicable data-protection-law and transfer-safeguard boundaries, all published locales, page structure, contact/legal facts, and the current no-tracking statement; do not promise an unknown provider, jurisdiction, retention period, certification, or legal outcome.
- Implementation: the public Privacy page now refers only to external hosting and technical service providers, necessary connection/log data, applicable data-protection law, appropriate provider arrangements, and required safeguards for processing outside the EEA. The provider-neutral wording is aligned across EN/DE/UK/PL/CS and contains no Vercel reference.
- Files: legal page view model; German and UK/PL/CS translation maps; content-brand audit; focused legal-page and brand browser assertions; 12 affected Privacy visual references; I-006 tracker row; `STATUS.md`; and `CHANGELOG.md`.
- Baseline: state/input validators PASS. The initial Node 22.13 `pnpm quality` static stages PASS formatting, ESLint, Astro diagnostics, 85 unit tests, both builds, and 3 foundation tests. Its browser phase reproduces the recorded unrelated component-lab routing, case-sensitive EvidenceList, and WagonSwitchyard/reference failures and was stopped at 271 passed, 14 failed, 5 interrupted, 1 skipped, and 1,101 not run; the aggregate is not claimed green.
- Validation: targeted formatting and ESLint PASS; Astro diagnostics report 0 errors, warnings, or hints; all 85 unit tests PASS; the production build PASSes with 125 pages; and the hardened content/brand audit PASSes for 125 documents. Generated EN/DE/UK/PL/CS Privacy output contains localized provider-neutral wording and no Vercel reference. Fresh legal/content browser evidence PASSes 42/42; refreshed and clean-rerun Privacy visual comparisons PASS 12/12 across 320/390/768/1024/1440/844×390. The 320 and 1440 Privacy references were inspected directly. The final broad `pnpm quality` again PASSes every static stage and reproduces only the recorded unrelated component-lab locale-routing and case-sensitive EvidenceList failures; it was stopped at 129 passed, 9 failed, 4 interrupted, and 1,250 not run, so that aggregate is not claimed green.
- Boundary: wording is deliberately general and does not identify an unknown provider, processing location, retention period, certification, or guarantee legal compliance. Owner/legal approval and verification against the eventual hosting configuration remain external I-006 release inputs; no deployment or external system changed.

## Completed correction — F-003 mail-client handoff

- User-visible objective: retain the existing contact fields and transfer their current values into a pre-addressed email when the visitor chooses to continue in their mail application. The visitor remains responsible for selecting a mail client and sending the message.
- Contract: use the caller-owned verified public contact email as the recipient; URL-encode caller-owned labels and submitted values into a `mailto:` URI only after native validation; never claim that the website sent or received an inquiry; preserve product/family context, compact layout, focus, privacy notice, and input values.
- Implementation: `ContactForm` now validates its existing fields, builds a URL-encoded `mailto:` for `office@transant.com`, opens the visitor's configured mail application, keeps the form values intact, and reports only that the message was prepared. EN/DE/UK/PL/CS buttons, subjects, hints, and privacy copy describe the same boundary; the no-JavaScript form retains a native `mailto:` fallback. The Astro CSP explicitly permits `mailto:` form actions.
- Baseline: state/input validators PASS. Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics, 84 unit tests, both builds, and three foundation tests. Its browser phase reproduces the existing component-lab locale-routing failures and was stopped after 72 passed, 4 failed, 5 interrupted, and 1,311 not run; the aggregate is not claimed green.
- Validation: formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 85 unit tests, 125-page production build, route integration (`routes=124 products=10 internal-references=4239`), content/brand audit, release-output simulation, and deployment-readiness PASS. Fresh focused browser/component/no-JavaScript/responsive/keyboard/axe evidence PASSes 106 with 2 expected skips; affected component/contact/privacy visual comparisons PASS 18 and integration visual comparisons PASS 12 across 320/390/768/1024/1440/844×390. Contact output was inspected at 320 and 1440 px. The final broad `pnpm quality` static stages PASS, while its known component-lab/production-locale and unrelated EvidenceList/WagonSwitchyard browser mismatches recur; it was stopped at 287 passed, 17 failed, 5 interrupted, 1 skipped, and 1,082 not run, so that aggregate is not claimed green.
- Boundary: no provider, API key, hosting function, database, automatic delivery, deployment, or external system was added. A visitor needs a configured mail handler and must review and send the prepared email.

## Completed local correction — I-006 duplicate-server regression

- User-visible outcome: `http://localhost:4321/` again renders the four model-selection stages in one wide row and the two certificate topics side by side.
- Cause: two long-running Astro development processes simultaneously owned port 4321 on different loopback addresses. The browser resolved `localhost` to the stale IPv6 process and showed the pre-fix one-column grids, while `127.0.0.1` served the current fixed source. The catalogue/text correction did not modify `RailSequence` or `QualityImpactSection`.
- Action: stopped only the two conflicting port-4321 processes and started one fresh Node 22.13 development server from the current workspace on `127.0.0.1:4321`.
- Validation: the pre-restart `localhost:4321` capture reproduced both supplied regressions at the matching wide viewport. The post-restart capture confirms four horizontal stages and two horizontal certificate topics. The required baseline passed formatting, ESLint, Astro diagnostics, 84 unit tests, both builds, and three foundation tests before its browser phase reproduced the already-recorded component-lab locale/EvidenceList mismatch and was stopped; that aggregate is not claimed green. No implementation source, deployment, or external system changed.

## Completed correction — I-005 catalogue-source, intermodal wording, and Sustainability removal audit

- User-visible outcome: Sustainability is removed as a page and navigation destination in EN/DE/UA/PL/CZ. General high-strength/alform/greentec marketing claims are gone from publishable content and replaced with neutral wagon/configuration wording. The intermodal family is no longer described as “lightweight” in any locale; it is presented through flexible container transport and multiple loading configurations.
- Source decision: `Catalog for print.ai` is the authoritative wagon-copy source. Its Sgns(s) page does contain “optimized lightweight design” in body copy, but its headline uses flexible intermodal transport and optimized payload capacity; the customer direction supersedes that adjective, while the catalogue's low tare and payload values remain exact technical data. Historical official-site research is retained only with an explicit non-publishable warning.
- Files: catalogue and ten product source references; intermodal copy/readmes; homepage, editorial, shell, German, Ukrainian, Polish, and Czech adapters; route inventories, audit contracts, focused tests, affected component/specification documentation, and visual references. Twelve obsolete Sustainability screenshots were removed.
- Validation: state/input validators PASS. Node 22.13 formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 84 unit tests, 125-page production build, component-lab build, and 3 foundation tests PASS. Route integration PASSes (`routes=124 products=10 internal-references=4336`); content/brand audit PASSes for 125 documents and now rejects non-catalogue provenance, retired steel/Sustainability copy, the five retired intermodal phrases, and a generated Sustainability route. Focused unit checks PASS 17/17; fresh component/no-JavaScript/responsive/axe checks PASS 82 with 2 expected skips; fresh production localization checks PASS 54/54; affected homepage/editorial/header visual comparisons PASS 40 with 2 expected skips and reviewed 320/1440 output. The broader refreshed visual matrix PASSed 198/198, while its clean rerun PASSed 194/198 with four known full-page lazy-media image-state mismatches on unchanged product layouts; those four are not claimed as green.
- Baseline boundary: the final `pnpm quality` static stages PASS, while its browser phase again routes production-only locale tests through the component lab and reproduces the recorded locale/EvidenceList mismatch; it was stopped and is not claimed as green. Focused fresh component and production evidence above supersedes that routing limitation for this correction.
- Current state: `VERIFIED`; no deployment or external system changed.

## Completed enhancement — A-002 localized InnoTrans 2026 homepage announcement

- User-visible outcome: EN, DE, UA, PL, and CZ homepages now place a V9 Stitch-inspired InnoTrans 2026 announcement directly below the hero, with localized editorial copy, the confirmed 22–25 September 2026 Berlin date/location, and one external action to the official TransANT exhibitor profile. The diagram highlight reads `TRANSANT · INNOTRANS 2026` instead of the former standard-gauge detail.
- Contract: the independent server-rendered `InnoTransEvent` owns the dark technical-rail composition and decorative Linz-to-Berlin schematic. The meeting action is omitted; no hall, stand, launch, certification, partnership, or live-route claim was introduced. The invitation and official action remain complete without JavaScript.
- Files: typed component, README, isolated component-lab fixture, focused browser suite and six visual references; homepage view model and EN/DE/UA/PL/CZ translations; English, German, additional-locale, and lab homepage compositions; homepage/localization assertions and six homepage visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Node 22.13 focused formatting and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production build passes with 130 routes. Route integration and content/brand audit pass (`routes=129 products=10 internal-references=4622`; immutable logo digest retained). Fresh isolated component/homepage/no-JavaScript/keyboard/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390. Fresh production localization evidence passes 60/60 across the same profiles. The forced-refresh visual references pass 60/60, and standalone 320 and 1440 references were inspected directly. Generated EN/DE/UA/PL/CZ homepages each contain the universal company/event label and none contains a former localized gauge string.
- Baseline boundary: the label-refinement pre-edit `pnpm quality` static stages passed, while its broad browser phase reproduced recorded stale/reused-server localization and unrelated visual-reference failures and was stopped after 270 passed, 26 failed, 4 interrupted, 1 skipped, and 1,109 not run; it is not claimed as green.

## Completed correction — I-006 deployed homepage CSP layout

- User-visible outcome: at wide sizes, the four modular-platform stages and the two certificate topics retain their intended columns after Vercel applies the release CSP.
- Cause and correction: both layouts selected their grid count through inline custom-property `style` attributes. The generated CSP blocks inline styles, leaving their `repeat(var(--...))` declarations invalid and collapsing the grids. `RailSequence` now selects one-to-four columns from its existing structural class, and `QualityImpactSection` selects one or two columns from a `data-topic-columns` attribute.
- Files: `RailSequence` and `QualityImpactSection` implementations and READMEs; focused component browser assertions; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Node 22.13 Prettier and Astro diagnostics pass (0 errors, warnings, or hints). The two focused component/browser/keyboard/responsive/axe/visual suites pass 60/60 across 320/390/768/1024/1440/844×390. The Vercel-equivalent production build passes with 130 routes. With the supplied preview origin, release output and deployment-readiness validation pass; generated homepage markup contains `data-rail-sequence-columns="4"` and `data-topic-columns="2"`, with neither layout’s former inline column style.
- Boundary: Vercel Authentication prevents an anonymous direct recheck of the hosted preview, and no deployment was triggered. Redeploy the source change, then verify the two sections against the protected preview. The earlier full `pnpm quality` static stages pass, while its broad browser phase remains non-green only because of unrelated in-progress additional-locale route failures.

## Completed implementation — I-005 UA/PL/CZ localization expansion

- User-visible outcome: every existing page is available through local Ukrainian, Polish, and Czech route trees, with UA/PL/CZ in the language selector and visitor-facing copy translated for the freight-wagon engineering context.
- Contract: use `/uk/`, `/pl/`, and `/cs/` URLs with correct `uk`, `pl`, and `cs` document language tags; preserve canonical English routes, German routes, product codes, technical values, standards, units, legal/contact facts, local assets, source order, no-JavaScript navigation, and the immutable logo.
- Files: central locale/shell and authored translation adapters; shared localized route/homepage compositions; `/uk/`, `/pl/`, and `/cs/` route entries; caller-owned component labels; locale-aware wagon path contracts; focused unit/browser evidence; localization documentation; formatter generated-artifact boundary; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: the first Node 22.13 `pnpm quality` attempt stopped at Prettier because two transient `.playwright-cli` YAML captures from concurrent visual review were in scope. After excluding that generated directory, the rerun passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both builds (52 production / 62 lab routes), and 3 foundation tests. Its browser stage reproduces the recorded stale/reused-server German-route and unrelated visual-reference failures and was stopped after 274 passed, 16 failed, 5 interrupted, 1 skipped, and 1,059 not run; the aggregate is not claimed as a pass.
- Implementation: the registry-driven selector now presents EN, DE, UA, PL, and CZ and preserves the current route. Every existing page has Ukrainian, Polish, and Czech static output with correct `uk`, `pl`, and `cs` document language metadata. Visitor-facing translations were authored locally for the site’s freight-wagon context without a web translation service; product codes, technical values, standards, units, registered/legal/contact facts, and source references remain source-owned.
- Validation: Node 22.13 formatting and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; focused unit tests pass 12/12; the production build passes with 130 documents. Route integration passes (`routes=129 products=10 internal-references=4622`) and the content/brand audit passes (`documents=130 products=10 logo-references=390 contact-delivery=blocked-until-provider-configuration`). Focused production Playwright evidence passes 24/24 across 320/390/768/1024/1440/844×390, covering all three homepage/Technology locales, document languages, localized labels, same-route product switching, technical/cargo copy, and containment. Ukrainian Home at 320 px and Czech product detail at 1440 px were inspected directly.
- Current state: `IMPLEMENTED`. Native-language editorial review and owner/legal approval of translated pages remain external I-006 publication inputs; the existing CSP/deployment boundary is unchanged. No external system was changed.

## Completed correction — H-005 Modular platform wide stage-title alignment

- User-visible outcome: on a wide homepage, the Platform, Superstructure, Engineering & approval, and Coordinated production titles begin on the same horizontal line beneath the shared rail.
- Contract: correct the four-column `RailSequence` wide geometry without changing the rail, dots, operators, caller-owned sequence data, source order, server rendering, semantic ordered list, compact vertical composition, hover feedback, or reduced-motion behavior.
- Files: `website/src/components/home/ModularPlatformSection/{ModularPlatformSection.astro,README.md}`, focused ModularPlatformSection browser assertion, three ModularPlatformSection and three homepage wide visual references, the H-005 tracker row, and `CHANGELOG.md`.
- Baseline: the default Node 25 shell correctly rejects `pnpm quality` because the project requires Node 22. Re-run under Node 22.13 passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production and 62 component-lab routes), and 3 foundation tests. Its broad browser stage reproduces existing German-route and unrelated visual-reference failures and was stopped at 820 passed, 76 failed, 4 interrupted, 11 skipped, and 445 not run; it is not claimed as a pass.
- Validation: focused Prettier passes; Astro diagnostics report 0 errors, warnings, or hints. The isolated ModularPlatformSection and homepage component/no-JavaScript/keyboard/responsive/axe/visual suites each pass 30/30 at 320/390/768/1024/1440/844×390. The wide-only geometry assertion confirms the four title top edges are within one CSS pixel. Three affected 1024, 1440, and phone-landscape visual references per suite were refreshed; the 1440 homepage render was inspected directly. Final state/input validation and diff hygiene pass.
- Current state: `VERIFIED`; no external system was changed. The separately active A-005 homepage-navigation correction remains authoritative.

## Completed correction — A-005 Sustainability descriptor strip

- User-visible outcome: the English and German Sustainability page begins with the same compact ruled, monospaced descriptor strip used by Technology, Home, Company, and Wagons.
- Contract: add caller-owned `PageMeta` data to the existing Sustainability editorial view model; use only already-source-bound page topics; preserve PageHero, editorial stories, factual evidence, direct routes, no-JavaScript rendering, and compact overflow containment. The strip remains redundant/decorative for assistive technology.
- Intended files: Sustainability editorial view model; German translation map; focused editorial/German browser assertions and six Sustainability visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Files: `website/src/adapters/content/{editorial-page-view-model,german-homepage-view-model}.ts`, `PageMeta` README, focused editorial/German browser assertions, six Sustainability visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production routes and 62 lab routes), and 3 foundation tests. Its browser stage first exposes an existing Sustainability visual-reference mismatch and stale/reused-server German-route failures, then was stopped after 72 passed, 3 failed, 3 interrupted, and 1,278 not run; it is not claimed as a pass.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production and component-lab builds pass with 52 and 62 routes; the content/brand audit passes for 52 documents, ten products, and the immutable logo digest. Editorial component/no-JavaScript/responsive/axe evidence passes 24/24 across 320/390/768/1024/1440/844×390, including exact Sustainability strip copy, source order, decorative semantics, and compact containment. Refreshed Sustainability visual comparisons pass 6/6 and German production route/localized-strip evidence passes 6/6 at the same six profiles. The 1440 and 320 captures were inspected directly. Final state/input validation, focused formatting/lint, and diff hygiene pass.
- Current state: `VERIFIED`; no external system was changed.
- Continue: I-006 remains limited to its recorded external release inputs.

## Completed correction — F-003 ContactForm field alignment

- User-visible outcome: paired desktop form fields have equal label/control geometry, so name, business-email, and company inputs align even when only one field has help text; the message field remains a deliberate full-width control.
- Contract: retain caller-owned labels/help/error copy, native validation and POST semantics, no-JavaScript rendering, compact one-column order, input types/autocomplete, and the external delivery/provider boundary. Align the existing 40-rem two-column component grid without changing page composition or form data.
- Files: `website/src/components/form/ContactForm/{ContactForm.astro,README.md}`, focused contact-page browser expectation, and the ContactForm/contact-page six-viewport visual references.
- Validation: focused Prettier passes; Astro diagnostics report 0 errors, warnings, or hints. Focused ContactForm/contact-page component, native no-JavaScript keyboard, responsive, axe, and regression evidence passes 60/60 across 320/390/768/1024/1440/844×390. The 12 affected visual comparisons pass after refreshing only ContactForm/contact-page references; 1440 output was inspected directly. A broader two-file run reports 14 known, unrelated stale privacy/imprint visual references; they remain untouched and are not attributed to this correction.
- Current state: `VERIFIED`; no external system was changed. Continue only with I-006’s recorded external release inputs.

## Completed correction — A-003 Wagons catalogue descriptor strip

- User-visible outcome: the English and German `/wagons/` index begins with the shared ruled, monospaced descriptor strip, matching Home, Company, and Technology while listing its five direct wagon families.
- Contract: extend the existing presentation-only `PageMeta` component through the typed catalogue view model; use only the catalogue's existing family names; preserve the PageHero, breadcrumbs, direct links, route source order, no-JavaScript rendering, and compact overflow containment. Individual family and product pages remain unchanged.
- Intended files: catalogue view model; English/German catalogue assemblies and component-lab fixture; German translation map; focused catalogue/German browser assertions and catalogue-index visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production routes and 62 lab routes), and 3 foundation tests. Its browser stage exposes the paused A-005 Sustainability compact-overflow assertion and stale/reused-server route/visual failures, then was stopped after 245 passed, 24 failed, 5 interrupted, 1 skipped, and 1,075 not run; this baseline is not claimed as a pass.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production and component-lab builds pass with 52 and 62 routes; the content/brand audit passes for 52 documents, ten products, and the immutable logo digest. Catalogue component/no-JavaScript/responsive/axe evidence passes 30/30 across 320/390/768/1024/1440/844×390, including the strip's exact copy, ordering, decorative semantics, and compact containment. One unrelated unchanged family route returned a transient 404 in the parallel run and passes on its immediate isolated rerun. Refreshed catalogue visual comparisons pass 6/6, and German production route/localized-strip evidence passes 6/6 at the same six profiles. The 1440 and 320 captures were inspected directly. Final state/input validation, focused formatting/lint, and diff hygiene pass.
- Current state: `VERIFIED`; no external system was changed.
- Continue: resume the paused A-005 Sustainability evidence-label refinement.

## Completed refinement — A-005 Sustainability evidence label

- User-visible outcome: “Published sustainability figures” uses the same compact red mono section-label language as “Manufacturing, payload, and circular materials” and lands directly above the factual-reference table.
- Contract: retain the `h2` document outline, source-owned English/German wording, factual rows, table/list semantics, compact/wide source order, no-JavaScript rendering, and the standard `EvidenceList` variant. Scope the new compact label treatment to Sustainability’s typed variant only.
- Intended files: `website/src/components/editorial/EvidenceList/{EvidenceList.astro,EvidenceList.types.ts,README.md}`, Sustainability content adapter, focused editorial/EvidenceList browser expectations and affected Sustainability visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Node 22.13 `pnpm quality` run from `website/` passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production routes, 62 lab routes), and 3 foundation tests; the browser stage began but its aggregate result was truncated, so it is not claimed as a pass.
- Refinement: the Sustainability-only `section-label` variant retains the semantic `h2` but displays it in the same red mono uppercase language as the preceding editorial eyebrow. It uses a 0.75-rem heading-to-table gap and compact block padding; at compact widths, a reduced but still mono/tracked label scale keeps the full label on one line.
- Validation: focused Prettier, ESLint, and Astro diagnostics pass (0 errors/warnings/hints); component-lab build passes (62 routes). Fresh isolated Sustainability component/responsive/axe checks pass 18/18 and refreshed six-profile visual comparisons pass 6/6 at 320/390/768/1024/1440/844×390. The refreshed 320 and 1440 outputs were inspected directly. The earlier shared-preview test runs that collided with concurrent local preview processes are superseded by this isolated evidence.
- Current state: `VERIFIED`; no external system was changed.

## Completed refinement — A-005 Sustainability story spacing

- User-visible outcome: the text-only “Manufacturing, payload, and circular materials” Sustainability story has a half-height top inset and a calmer heading; its wide image/text composition has a clear gutter, while “Published sustainability figures” stays compact and adjacent to the factual-reference table.
- Contract: the typed `MediaStory` API exposes caller-owned `generous-top` spacing and `compact` title-scale choices, and all wide media stories use the defined responsive gutter between image and text. Default rhythm/heading scale for every other editorial story, all source-owned English/German content, source order, semantic headings, no-JavaScript rendering, and the lower evidence transition are preserved.
- Files: `website/src/components/editorial/MediaStory/{MediaStory.astro,MediaStory.types.ts,README.md}`, Sustainability’s editorial adapter, focused editorial browser expectation, six Sustainability visual references, tracker, and this handoff.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; component-lab build passes (62 routes). Fresh isolated Sustainability component/responsive/axe checks pass 18/18; refreshed six-profile visual comparisons pass 6/6 at 320/390/768/1024/1440/844×390. The 1440 output was inspected directly.
- Current state: `VERIFIED`; no external system was changed. This refinement does not alter the separately recorded operational control state.

## Completed correction — A-005 Sustainability source refresh and top navigation

- User-visible outcome: `Sustainability` / `Nachhaltigkeit` becomes a first-class top navigation item and the existing localized page explains the official greentec steel, manufacturing-stage CO₂, intermodal payload, recyclable-materials prototype, and April 2024 EcoVadis information.
- Contract: use the current official TransANT Sustainability pages as the factual source. Preserve the exact application and lifecycle boundaries around the 3-tonne, 20%, and 4-tonne figures; present EcoVadis as an April 2024 historical result rather than a current status; reuse only local reviewed media; preserve EN/DE routes, menu behavior, no-JavaScript access, and the immutable logo.
- Intended files: `website/src/adapters/content/{site-shell-view-model,editorial-page-view-model,german-homepage-view-model}.ts`, the typed `EvidenceList` accent treatment and README, focused site-header/editorial/evidence/German browser expectations and affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Pre-edit Node 22.13 `pnpm quality` passes formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production routes, 61 lab routes), and 3 foundation tests. Its browser stage is not green: 1,228 passed, 94 failed, and 16 skipped due to the recorded reused/stale lab server, German-route mismatch, unrelated stale full-page baselines, and one WagonFamilyIndex geometry failure.
- Refinements: removed the right-side red platform render; combined the manufacturing/payload and recyclable-material narratives into one text-only section while explicitly separating their source scopes; made the evidence heading red, added deliberate top padding, and tightened it to the table through a typed `EvidenceList` variant.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production and component-lab builds pass with 52 and 62 routes; route integration passes for 51 routes, ten products, and 1,630 internal references; content/brand audit passes for 52 documents, ten products, and the immutable logo digest. Sustainability/header evidence passes at 320/390/768/1024/1440/844×390: 57 focused nonvisual checks pass with two expected skips and one phone-landscape timeout that passes on its immediate isolated rerun; 16 visual comparisons pass with two expected wide-menu skips. The shared `EvidenceList` passes 2 unit and 18 component/responsive/axe browser checks. German production Sustainability passes 6/6. The 1440 and 390 outputs and EN/DE production accessibility snapshots were inspected.
- Boundary: the pre-edit full baseline's browser stage remains non-green for its recorded reused/stale lab-server and unrelated visual failures. Direct production-browser inspection also reports the existing CSP meta `frame-ancestors` warning and two blocked inline-style errors; this correction does not claim those I-006 deployment concerns are resolved.
- Current state: `VERIFIED`; no external system was changed.
- Continue: I-006 remains limited to its recorded external release inputs.

## Completed correction — A-005 Shared Home and Company descriptor strip

- User-visible outcome: Home and Company begin with the same compact ruled, monospaced descriptor strip already used by Technology, with concise wording tailored to each page in English and German.
- Contract: extract the existing Technology strip into one reusable, presentation-only component; preserve Technology's appearance and wording; keep the strip decorative/redundant for assistive technology; use only concepts already present on each page; preserve compact overflow containment, page source order, and no-JavaScript rendering.
- Files: `website/src/components/editorial/PageMeta/{PageMeta.astro,PageMeta.types.ts,README.md}`; Technology, English/German Home, and English/German editorial assemblies; homepage/editorial/localization view models; the isolated component-lab fixture/index; focused homepage/editorial/German browser assertions; 18 Home/Company/Technology visual references; tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Node 22.13 formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both static builds (52 production routes, 61 lab routes), and 3 foundation tests pass. The shared browser stage is not green: it reused the wrong/stale server for German routes and existing visual references, then the server became unavailable; the run was stopped after 207 passed, 1 skipped, 1 interrupted, and 988 not run. This is baseline evidence only, not a pass.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production and component-lab builds pass with 52 and 62 routes; the content/brand audit passes for 52 documents, ten products, and the immutable logo digest. Home, Company, and Technology component, no-JavaScript, keyboard, responsive, axe, and visual evidence passes at 320/390/768/1024/1440/844×390: 48/48 focused nonvisual checks and 18/18 clean visual comparisons. German production localization passes 36/36 at the same six profiles. Desktop and compact Home/Company captures were directly inspected. Final state validation, input validation, focused formatting/lint, and `git diff --check` pass.
- Current state: `VERIFIED`; the completed Sustainability evidence closes A-005. No external system was changed.
- Continue: I-006 remains limited to its recorded external release inputs.

## Completed correction — I-005 Technology content and V8 presentation

- User-visible outcome: `/technology/` uses V8's engineered editorial rhythm without copying its unsupported claims: a tighter technical hero, one dark platform showcase with a local wagon render, a chapter index, four numbered chapters on one continuous surface, two integrated local engineering images, and a compact final contact panel. The homepage retains the already-implemented summaries in its existing engineering-value and modular-platform sections.
- Contract: use the local `prep/design/stitch-generations/v8/stitch_transant_b2b_website_redesign (7)` only as visual reference. Keep runtime copy source-bound to verified TransANT material; do not adopt V8's invented metrics, standards, coordinates, readiness statuses, lifecycle claims, or remote assets. Expose no legacy/reference research location as a visitor destination. Keep Technology navigation internal, preserve English/German routes, product facts, legal content, shared non-Technology editorial rendering, and the immutable logo.
- Files: `website/src/layouts/{TechnologyPage.astro,README.md}`, `website/src/pages/{[page].astro,de/[...page].astro}`, `website/component-lab/pages/fixtures/editorial/[page].astro`, `website/src/adapters/content/{homepage-view-model.ts,editorial-page-view-model.ts,german-homepage-view-model.ts}`, focused homepage/editorial/German browser assertions and affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. Pre-edit Node 22.13 `pnpm quality` passed formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, both builds (52 production routes, 61 lab routes), and 3 foundation tests. The shared browser stage was not green: 1,210 passed, 112 failed, and 16 skipped because the harness reused a stale local server; representative failures were `/de/` returning the English document and unrelated global visual-height drift. This correction does not treat that baseline as green.
- Validation: focused Prettier and ESLint pass; Astro diagnostics report 0 errors, warnings, or hints; production and component-lab builds pass with 52 and 61 routes; the content/brand audit passes for 52 documents, ten products, and the immutable logo digest. Homepage/Technology/editorial component, no-JavaScript keyboard, responsive, axe, and reviewed visual evidence passes 96/96 at 320/390/768/1024/1440/844×390. German production localization passes 24/24 at the same six profiles. Technology visual capture now settles local lazy images deterministically. Final state validation, input validation, and `git diff --check` pass.
- Current state: `VERIFIED`. The page uses the existing unmodified `ContactCTA` shared with wagon-detail pages. No external system was changed.
- Continue: I-006 remains limited to its recorded external release inputs.

## Completed correction — H-008 Sticky introduction header clearance

- User-visible outcome: on wide homepages, the sticky quality introduction remains fully visible below the persistent site header while the certificate topics scroll.
- Contract: adjust only the `QualityImpactSection` wide sticky offset. Preserve the existing 56-rem split, content, equal panel alignment, compact composition, no-JavaScript behavior, and source/evidence semantics.
- Intended files: `website/src/components/home/QualityImpactSection/{QualityImpactSection.astro,README.md}`, focused browser/visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier and Astro diagnostics pass (0 errors, warnings, or hints). Focused quality-section browser, keyboard, responsive, accessibility, and visual checks pass 30/30 across 320/390/768/1024/1440/844×390. Wide browser evidence scrolls the heading and asserts its 96 px safe offset.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-008 Quality and certification alignment

- User-visible outcome: the quality and certification section has more generous, equal top and bottom breathing room; wide certificate dividers, metadata panels, and evidence links align to shared horizontal lines.
- Contract: adjust only `QualityImpactSection` layout. Preserve caller-owned content, certificate facts, source/evidence links, semantic articles, compact reading order, no-JavaScript behavior, and the existing 56-rem editorial split.
- Intended files: `website/src/components/home/QualityImpactSection/{QualityImpactSection.astro,README.md}`, focused browser/visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier and Astro diagnostics pass (0 errors, warnings, or hints); the production build passes (52 routes). Focused quality-section browser, keyboard, responsive, accessibility, and visual checks pass 30/30 across 320/390/768/1024/1440/844×390; refreshed six-width visual references were inspected. The earlier `pnpm quality` browser result was not captured and is not claimed as a pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-007 Homepage collaboration-process removal

- User-visible outcome: “From transport task to a wagon concept” no longer appears on English or German homepages; the modular-platform section flows directly into quality and certification.
- Contract: remove only homepage composition and homepage-owned collaboration data. Keep `CollaborationProcess`, its fixture, and any non-homepage use intact; preserve all remaining homepage sections, localized content, and contact flow.
- Files: `website/src/{pages/index.astro,components/home/GermanHomepage/GermanHomepage.astro,adapters/content/homepage-view-model.ts}`, `website/component-lab/pages/fixtures/homepage.astro`, focused homepage assertions and six-width visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier and Astro diagnostics pass (0 errors, warnings, or hints). Focused homepage and standalone CollaborationProcess browser, keyboard, no-JavaScript, responsive, accessibility, and visual checks pass 60/60 across 320/390/768/1024/1440/844×390. The refreshed 1440 homepage baseline was inspected. The initial recorded full-quality run passed its visible static stages but its browser result was truncated, so it is not claimed as a pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-006 Homepage case-study removal

- User-visible outcome: the Erzberg–Linz ore-transport case-study section no longer appears on English or German homepages; the modular-platform section flows directly into the collaboration section.
- Contract: remove only homepage composition and homepage-owned case-study data. Keep `OperationalCaseStudy`, its fixture, and its dedicated editorial/projects use intact; preserve all remaining homepage sections, source order, localized content, and contact flow.
- Files: `website/src/{pages/index.astro,components/home/GermanHomepage/GermanHomepage.astro,adapters/content/homepage-view-model.ts}`, `website/component-lab/pages/fixtures/homepage.astro`, focused homepage assertions and six-width visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier and Astro diagnostics pass (0 errors, warnings, or hints). Focused homepage and standalone OperationalCaseStudy browser, keyboard, no-JavaScript, responsive, accessibility, and visual evidence pass 60/60 across 320/390/768/1024/1440/844×390. The refreshed 1440 homepage baseline was inspected. The shared German-localization browser file remains `NOT_RUN` for this correction because the component-lab preview redirects `/de/` to English before the German route is reached; the removed German composition is covered by Astro diagnostics.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-005 Modular platform rail clearance

- User-visible outcome: the wide horizontal equation rail sits slightly farther below its dots, improving their separation without changing the rail, labels, hover feedback, or compact treatment.
- Contract: adjust only H-005’s wide rail vertical offset; preserve all information, layout, semantics, pulse behavior, and non-H-005 callers.
- Intended files: `website/src/components/home/ModularPlatformSection/ModularPlatformSection.astro`, focused visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier, Astro diagnostics (0 errors, warnings, or hints), and contract tests (2/2) pass. H-005/homepage browser/keyboard/no-JavaScript/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390, including an exact 18.4 px wide rail-offset assertion. The refreshed 1440 homepage state was inspected. `git diff --check` and final state/input validation pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-005 Modular platform equation dot feedback

- User-visible outcome: hovering a wide equation stage turns its matching dot red and gives it the same restrained radar pulse language as the wagon selector; the final-stage dot remains red at rest and pulses when its stage is hovered. Keyboard focus within a linked stage receives the same state. Reduced-motion users receive the color state without animation.
- Contract: preserve the current rail geometry, source-owned content, list semantics, compact rail, and all non-H-005 callers. The visual feedback remains CSS-only and does not make non-interactive stage labels pretend to be controls.
- Intended files: `website/src/components/home/ModularPlatformSection/{ModularPlatformSection.astro,README.md}`, focused H-005 browser evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier, Astro diagnostics (0 errors, warnings, or hints), and contract tests (2/2) pass. H-005/homepage browser/keyboard/no-JavaScript/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390, including a direct wide-hover assertion for red pulse feedback. `git diff --check` and final state/input validation pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-005 Modular platform equation rail refinement

- User-visible outcome: the wide equation rail has an unmistakable continuous horizontal line beneath its dots; the decorative `+` and `=` precede smaller stage numbers; the section title matches the established homepage heading scale; and the section gains more vertical breathing room.
- Contract: retain the current steel-blue equation surface, source-owned intro/action/stage information, semantic ordered sequence, compact vertical rail, and all non-H-005 callers. This is a CSS-only refinement of H-005’s wide visual treatment.
- Intended files: `website/src/components/home/ModularPlatformSection/{ModularPlatformSection.astro,README.md}`, focused H-005/homepage browser assertions and visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier, Astro diagnostics (0 errors, warnings, or hints), and ModularPlatformSection contract tests (2/2) pass. H-005/homepage browser/keyboard/no-JavaScript/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390, including direct 2 px rail and `+`/`=` operator assertions. The refreshed 1440 homepage state was inspected. `git diff --check` and final state/input validation pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-005 Modular platform equation visual alignment

- User-visible outcome: “From platform to transport task” uses the supplied equation-inspired wide composition: steel-blue surface, generous heading/action row, visible rail, colored endpoint markers, and four clearly sequenced stages.
- Contract: `ModularPlatformSection` owns the visual re-composition and continues composing the existing `SectionIntro`, `RailSequence`, and optional `Action`. Preserve the current approved heading, description, technology destination, stage order/names/descriptions, semantic ordered list, source order, compact vertical rail, and all non-H-005 callers.
- Intended files: `website/src/components/home/ModularPlatformSection/{ModularPlatformSection.astro,README.md}`, focused H-005/homepage browser assertions and visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier, Astro diagnostics (0 errors, warnings, or hints), and ModularPlatformSection contract tests (2/2) pass. Focused H-005 and homepage browser/keyboard/no-JavaScript/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390. The refreshed 1440 and 320 homepage visual states were inspected. `git diff --check` and final state/input validation pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — H-001 Homepage technology CTA consolidation

- User-visible outcome: the homepage has one “Explore the technology” action, placed in the engineering-value section; the opening hero retains only “Explore wagon families”.
- Contract: `HomeHero` no longer receives the duplicate secondary technology action. `PayloadValueSection` presents the retained same destination using the established directional `Action` treatment. Preserve the primary hero action, content order, source-owned label/destination, railway image, orbital, principles, responsive composition, and all non-homepage callers.
- Intended files: `website/src/adapters/content/homepage-view-model.ts`, `website/src/components/home/{HomeHero,PayloadValueSection}/{HomeHero.astro,PayloadValueSection.astro,README.md}`, focused homepage evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused Prettier, Astro diagnostics (0 errors, warnings, or hints), and PayloadValueSection contract checks (3/3) pass. Focused homepage and PayloadValueSection browser/keyboard/no-JavaScript/responsive/axe/visual evidence passes 60/60 across 320/390/768/1024/1440/844×390. The refreshed 1440 and 320 homepage visual states were inspected. `git diff --check` and final state/input validation pass.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-004 ProductHero right-aligned render

- User-visible outcome: the primary wagon render is right-aligned inside its product-detail media stage, keeping the requested right-hand image region visible instead of preferring the left.
- Contract: `ProductHero` alone owns this presentation adjustment. Its local contained wagon media retains the existing size, responsive stage, subtle surface, no-border treatment, source order, and all non-product images remain unchanged.
- Files: `website/src/components/product/ProductHero/{ProductHero.astro,README.md}`, focused ProductHero/product-page browser assertions and 66 affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused formatting and Astro diagnostics pass with 0 errors, warnings, or hints. Focused ProductHero and all ten product-detail route browser/keyboard/no-JavaScript/axe/responsive/visual evidence passes 108/108 across 320/390/768/1024/1440/844×390, with direct assertions for `object-position: 100% 50%` and zero-width hero-media borders.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: HomeHero right-weighted crop correction is active.

## Completed correction — P-004 ProductHero primary-media border removal

- User-visible outcome: product-detail wagon renders have no visible enclosing border. Their contained local-media treatment, spacing, background, compact stacking, facts, and all non-product pages remain unchanged.
- Contract: `ProductHero` alone owns this correction. Removed only the `product-hero__media` border, retaining the component’s patterned subtle surface and every other component or page border.
- Files: `website/src/components/product/ProductHero/{ProductHero.astro,README.md}`, focused ProductHero/product-page browser assertions and 66 affected visual references, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: Node 22.13 `pnpm quality` static stages passed (formatting, ESLint, Astro diagnostics, 79 unit tests, production/lab builds, and 3 foundation tests) before the long shared browser stage. The run completed after output truncation, so no unsupported shared-browser result is claimed.
- Validation: focused formatting and Astro diagnostics pass with 0 errors, warnings, or hints. The 52-route production build passes. Focused ProductHero and all ten product-detail route browser/keyboard/no-JavaScript/axe/responsive/visual evidence passes 108/108 across 320/390/768/1024/1440/844×390, with direct assertions that the hero media stage has zero-width borders. The Relns 1440 px result was visually inspected.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — I-002 hero left-rail alignment

- User-visible outcome: the homepage opening copy and every product-detail hero begin on the same canonical left content rail as the sections immediately below them.
- Contract: `page-frame` remains the only horizontal page gutter. `HomeHero` and `ProductHero` may split text and media at wide widths, but neither adds a second left inset to its text column. Compact source order, media treatment, actions, facts, and product data remain unchanged.
- Files: `website/src/components/home/HomeHero/{HomeHero.astro,README.md}`, `website/src/components/product/ProductHero/{ProductHero.astro,README.md}`, focused HomeHero/ProductHero/homepage browser assertions, 26 affected 1024/1440 visual references covering both component fixtures, the homepage, and all ten product pages, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Baseline: state/input validators pass. The pre-edit Node 22.13 `pnpm quality` static stages pass (formatting, ESLint, Astro diagnostics, 79 unit tests, both builds, and 3 foundation tests). The browser matrix finished 1,231 passed, 91 failed, and 16 skipped; failures reproduce recorded German route, stale legal/catalogue/editorial visual, current wide hero alignment, and WagonFamilyIndex drift. This correction does not treat that shared baseline as green.
- Validation: focused formatting passes; Astro diagnostics report 0 errors, warnings, or hints; the 52-route production build passes. Final focused HomeHero, homepage, ProductHero, and all-product browser/keyboard/axe/responsive/visual evidence passes 162/162 across 320/390/768/1024/1440/844×390. Direct alignment assertions compare each hero text edge with its `page-frame` or adjacent section rail. The refreshed homepage and intermodal product output at 1024 and 1440 was visually inspected.
- Current state: `IMPLEMENTED`. The correction is complete; wider I-002 promotion remains separate from the recorded shared-suite drift above.
- Continue: no implementation package is active.

## Completed correction — P-003 model-card title typography

- User-visible outcome: model names are compact and no longer overlap the summaries in wagon cards, while every card remains an `h2` beneath the family PageHero `h1`.
- Design: the card title now has an explicit component class and fully owned display typography, including its size, weight, measure, line-height, tracking, and wrapping. Global `h2` rules therefore cannot enlarge a card title or impose a conflicting text layout; other page and component headings are untouched.
- Files: `website/src/components/catalogue/WagonModelList/WagonModelList.astro`, `website/tests/browser/wagon-model-list.spec.ts`, 36 focused wagon model/family visual baselines, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: formatting, Astro diagnostics (0 errors/warnings/hints), and WagonModelList unit contract (2/2) pass. Focused WagonModelList and all-family route browser evidence passes 12/12 at 320/390/768/1024/1440; it asserts each title is no larger than 28.8 px and its summary begins at or below the title. The component/five-family visual matrix passes 36/36 at 320/390/768/1024/1440/844×390. Intermodal 1024 and Flat 1440 output were inspected. Production-build and final state/input evidence are recorded in the latest change-log entry.
- Baseline boundary: the pre-edit `pnpm quality` browser stage could not start because an existing local Astro preview held port 4322; static stages passed. The focused browser and visual runs safely reused that preview after rebuilding component-lab output. No external system was changed.
- Current state: `IMPLEMENTED`.
- Continue: no implementation package is active.

## Completed correction — P-001 shared breadcrumb page gutter

- User-visible outcome: breadcrumbs on every catalogue and wagon-detail route align to the same responsive page gutter as the surrounding page content; no breadcrumb starts at the viewport edge.
- Contract: `Breadcrumbs` owns exactly one reusable `page-frame`; embedding layouts provide vertical rhythm and surface treatment only. Ordered navigation, wrapping, native focus, non-linked current item, and JSON-LD remain unchanged.
- Intended files: `website/src/components/catalogue/Breadcrumbs/{Breadcrumbs.astro,README.md}`, `website/src/components/editorial/PageHero/{PageHero.astro,README.md}`, the isolated fixture, focused breadcrumb/catalogue/product browser assertions and affected visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Implementation: `Breadcrumbs` now owns the shared `page-frame`. PageHero no longer wraps P-001 in a second horizontal frame; it retains the paper strip, divider, and vertical rhythm, and supplies an equivalent fallback frame only for generic non-P-001 slot content.
- Validation: final Node 22.13 formatting, full ESLint, Astro diagnostics (0 errors/warnings/hints), 79 unit tests, 52-page production build, 61-route component-lab build, and 3 foundation tests pass. Focused breadcrumb/catalogue/PageHero/product responsive, keyboard/no-JavaScript, axe, and component checks pass 96/96 across 320/390/768/1024/1440/844×390. Existing Breadcrumbs/catalogue visuals remain unchanged (42 pass); PageHero's full matrix passes 24/24; refreshed product and I-002 product visuals pass 84/84. The Intermodal detail was inspected at 1440 and 390 px. Final state/input validators and `git diff --check` pass.
- Baseline boundary: the pre-edit repository-wide browser run was not green because of unrelated existing German-route and stale legal/editorial visual failures; representative failures include `/de/` rendering `lang="en"` and legacy legal snapshots with changed heights. This correction does not claim that shared suite as passing.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-003 family model-list heading removal

- User-visible outcome: all five `/wagons/{family}/` pages now use the PageHero as their only family identity. The repeated model-list label, “{family} models” title, and repeated family description are removed; cards begin directly after the hero.
- Design: `WagonModelList` no longer accepts a display title or description. It retains a typed family identity/provenance context, and every model-card heading is now an `h2` directly beneath the PageHero `h1`.
- Files: `website/src/components/catalogue/WagonModelList/{WagonModelList.astro,WagonModelList.types.ts,wagon-model-list-contract.ts,README.md}`, catalogue view model, component-lab fixture, focused unit/browser evidence, 36 model-list/family-route visual baselines, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: focused formatting, Astro diagnostics (0 errors/warnings/hints), and the WagonModelList unit contract passed. Shared-model-list/family-route browser checks passed 12/12 at 320/390/768/1024/1440/844×390; focused visual checks passed 36/36 at the same sizes. Flat 1440 and Multi/Open box 390 renders were inspected. The production build passed (52 pages); generated Flat output has its three model headings as `h2` and contains no “Flat models” heading. The pre-edit full `pnpm quality` static stages passed, but its browser stage was blocked by an unrelated stale local preview lock on port 4323; the focused run safely reused that preview after rebuilding component-lab output.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — E-001 Catalogue PageHero compact rhythm

- User-visible outcome: the `/wagons/` catalogue introduction now leads directly into the family rows without the oversized empty field above or below it.
- Design: repaired the invalid PageHero spacing-token reference, then gave its no-media variant a compact 1.5–3 rem vertical rhythm. The catalogue’s intro-free family index uses the same compact outer rhythm, while PageHero variants with editorial media retain their established spacious composition.
- Files: `website/src/components/editorial/PageHero/{PageHero.astro,README.md}`, `website/src/components/catalogue/WagonFamilyIndex/{WagonFamilyIndex.astro,README.md}`, focused catalogue/PageHero browser visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints; the repaired WagonFamilyIndex contract checks passed 2/2. Focused PageHero/catalogue component, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 90/90 across 320/390/768/1024/1440/844×390; catalogue hero assertions measure matching, nonzero top and bottom content insets. A pre-edit `pnpm quality` baseline stopped at a narrow prior WagonFamilyIndex test lint failure; that failure is repaired. The known unrelated ContactForm no-JavaScript shared-suite failure remains the wider promotion boundary.
- Current state: `IMPLEMENTED`; no external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex text-column inset

- User-visible outcome: every wide row’s text and action have a clear inset from the adjacent media-panel divider; reversed rows no longer start their text directly on that divider.
- Design: at the wide layout, the text and action own a 3–4 rem divider-side inset. The media art retains its independent 64–80 px protected side inset, so each side of the transition has intentional breathing room without adding a gap above or below the shared row separator.
- Files: `website/src/components/catalogue/WagonFamilyIndex/WagonFamilyIndex.astro`, focused WagonFamilyIndex/browser visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; the reversed-row title’s measured divider gap is at least 48 px. State/input validators and `git diff --check` pass.
- Current state: `IMPLEMENTED`; the existing unrelated ContactForm no-JavaScript shared-suite failure remains the only promotion boundary. No external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex page-level heading removal

- User-visible outcome: removed “Choose a wagon family” from `/wagons/`; the page’s primary introduction now leads directly to the five family rows without an empty or hidden replacement heading.
- Design: `WagonFamilyIndex` accepts an optional caller-owned `intro`, preserving a useful title in its isolated fixture while allowing a page whose hero supplies the hierarchy to omit it completely.
- Files: `website/src/components/catalogue/WagonFamilyIndex/{WagonFamilyIndex.astro,WagonFamilyIndex.types.ts,wagon-family-index-contract.ts,README.md}`, catalogue/localised view models, focused tests/evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints; focused unit contract checks passed 2/2. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; affected catalogue baselines were refreshed. State/input validators and `git diff --check` pass.
- Current state: `IMPLEMENTED`; the existing unrelated ContactForm no-JavaScript shared-suite failure remains the only promotion boundary. No external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex uniform wide-row height

- User-visible outcome: all wide catalogue family rows share one height, and each contained wagon render is vertically centred within its row.
- Design: the wide list uses equal implicit grid rows; each family article fills its grid track and its media stage stretches across the full row. The contained render remains centred on the stage’s block axis. Compact layouts remain content-sized.
- Files: `website/src/components/catalogue/WagonFamilyIndex/WagonFamilyIndex.astro`, focused WagonFamilyIndex/browser visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; explicit assertions confirm equal wide row heights and centred render midpoints. State/input validators and `git diff --check` pass.
- Current state: `IMPLEMENTED`; the existing unrelated ContactForm no-JavaScript shared-suite failure remains the only promotion boundary. No external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex reversed-row media clearance

- User-visible outcome: in the wide reversed rows (families two and four), wagon art retains a protected gap before the right-side text and never visually touches it.
- Design: the contained media stage now receives a 64–80 px text-side inset in both wide orientations. The visible grid gap remains intact and the specific reversed rows have a measured minimum 64 px distance from their image bounds to the text column.
- Files: `website/src/components/catalogue/WagonFamilyIndex/WagonFamilyIndex.astro`, focused WagonFamilyIndex/browser visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; affected catalogue/index visual baselines were refreshed. State/input validators and `git diff --check` pass.
- Current state: `IMPLEMENTED`; the existing unrelated ContactForm no-JavaScript shared-suite failure remains the only promotion boundary. No external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex preamble removal

- User-visible outcome: retained “Choose a wagon family” and removed the redundant “Browse families” label and “Each family opens to its available models.” supporting sentence from the English and localised catalogue index.
- Files: `website/src/adapters/content/{catalogue-view-model,german-homepage-view-model}.ts`, focused catalogue visual evidence, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; relevant catalogue baselines were refreshed. State/input validators and `git diff --check` pass.
- Current state: `IMPLEMENTED`; the existing unrelated ContactForm no-JavaScript shared-suite failure remains the only promotion boundary. No external system was changed.
- Continue: no implementation package is active.

## Completed correction — P-002 WagonFamilyIndex catalogue density and hierarchy

- User-visible outcome: `/wagons/` has one clear page identity, a concise non-repeating browse cue, and five compact continuous family rows. Rows retain direct links and source order, use deliberately smaller contained wagon renders, keep a clear gap between text and media in both alternation directions, and share exactly one thin divider between neighbours.
- Design: page identity is now “Freight wagons for every transport task,” followed by “Choose a wagon family.” The repeated catalogue/family language and duplicated purpose statements are removed. The list owns its top/bottom rule and each non-final item owns one bottom rule. At wide widths the media surface now reaches each row divider directly, while the text retains its own internal rhythm.
- Files: `website/src/components/catalogue/WagonFamilyIndex/{WagonFamilyIndex.astro,README.md}`, `website/src/adapters/content/{catalogue-view-model,german-homepage-view-model}.ts`, focused WagonFamilyIndex/catalogue browser tests and updated visual baselines, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Validation: initial static stages of the Node 22.13 `pnpm quality` baseline passed (format, ESLint, Astro diagnostics, 79 unit tests, production/lab builds, and 3 foundation tests). The isolated shared browser stage then failed at the existing ContactForm no-JavaScript fixture, which could not locate `[data-contact-form]`; it is unrelated to this catalogue change. Focused Astro diagnostics and 79 units passed. Focused WagonFamilyIndex/catalogue browser, keyboard, no-JavaScript, responsive, axe, and visual evidence passed 102/102 across 320/390/768/1024/1440/844×390; the affected catalogue/index visual baselines were refreshed. Direct 1440 and 390 px local-route inspection passed.
- Current state: `IMPLEMENTED`. Full shared-suite promotion remains blocked only by the pre-existing ContactForm fixture failure above; no external system was changed.
- Continue: resolve or accurately re-baseline the unrelated shared ContactForm no-JavaScript fixture before promoting this correction to `VERIFIED`; no implementation package is active.

## Completed correction — H-009 ContactCTA shared surface and supporting action

- User-visible outcome: every reused ContactCTA uses the exact same very light blue `--color-steel` background. Page callers provide only their specific title, summary, actions, links, and optional inquiry context.
- Intended files: `website/src/components/home/ContactCTA/{ContactCTA.astro,ContactCTA.types.ts,README.md}`, `website/src/adapters/content/editorial-page-view-model.ts`, focused editorial browser evidence and affected visual baseline, tracker, `STATUS.md`, and `CHANGELOG.md`.
- State: `IMPLEMENTED`. ContactCTA now uses `clamp(var(--space-7), 6vw, var(--space-8))`, preserving a 3–8 rem conclusion rhythm instead of its previous 11-rem wide-screen field. The Technology engineering-story action and homepage process action remain removed, leaving ContactCTA as the one generic page-level contact destination.
- Outcome: `ContactCTA` owns one fixed `--color-steel` (`#eaf1f8`) surface and no longer exposes a page-level surface override. Supporting links use the existing Action shape with transparent fill and a red border; a lone supporting action is centered at the same 22-rem width as the primary action.
- Shared validation: `pnpm quality` passed formatting, ESLint, Astro diagnostics, 79 unit tests, production/lab builds, and foundation tests. Its browser stage was attempted on the free local port with `PLAYWRIGHT_BASE_URL` aligned, then interrupted after 478 passed, 35 unrelated failures, and 5 interrupted tests. Failures are in the existing C-006 German/no-JavaScript/legacy visual state; no H-009-focused failure occurred.
- Audit: all page-section components use `page-frame`, which supplies `--page-gutter` for horizontal text inset. The other section shells remain within the established 3–8 rem vertical rhythm; interior cards/forms/tables have their own text padding. Responsive media is allowed to reach an edge only in components that intentionally define it as a visual surface.
- Reuse: “Talk with the TransANT team about a transport task” and “Discuss the transport task before selecting a configuration” both pass caller-owned content through this same `ContactCTA` component; no duplicate visual component or markup exists. Their copy and links vary, while their surface and spacing remain identical.
- Validation: Astro diagnostics passed with 0 errors, warnings, or hints. The affected ContactCTA, editorial, homepage, and product responsive matrix passed 162/162 while synchronizing all selected baselines at 320/390/768/1024/1440/844×390. The final focused ContactCTA/homepage/editorial comparison passed 138/138. A broader clean follow-up passed 161/162; the sole failure is the pre-existing malformed I-002 intermodal phone-landscape full-page capture, which jumps to the footer after image settling. Component styling and geometry assertions passed, and the refreshed 1440 ContactCTA visual was inspected.
- Boundary: Product-hero inquiries remain because they include wagon-specific context at the decision point; header contact remains global navigation. Full shared browser promotion remains blocked by the pre-existing mixed baseline failures recorded above. No external system was changed.
- Current state: `IMPLEMENTED`. The requested visual and reuse corrections are complete; shared-suite promotion remains separate from the existing I-002 phone-landscape capture defect.
- Files: `website/src/components/home/ContactCTA/{ContactCTA.astro,ContactCTA.types.ts,README.md}`, `website/src/adapters/content/editorial-page-view-model.ts`, focused ContactCTA/editorial tests and affected visual baselines, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Continue: Return to the I-006 external evidence gate; no further implementation package is active.

## Paused revision — H-002 catalogue wagon renders

- User authorization: use the small wagon images on page 3 of `Catalog for print.ai` in the homepage train animation instead of the hand-drawn trains.
- Contract: extract clean local wagon assets from the supplied catalogue; preserve the three-loop orbital geometry, independently moving vehicles, no-JavaScript fallback, reduced-motion/offscreen behavior, decorative/informative semantics and responsive containment.
- Intended files: local RailwayOrbital wagon assets, `RailwayOrbital.astro`, component README, focused browser expectations, affected RailwayOrbital/homepage visual evidence, tracker, STATUS and CHANGELOG.
- Startup: A-004 final Node 22.13 `pnpm quality` PASS (78 unit, 3 foundation, 26 production, 61 component-lab routes, 1,292 browser checks; 16 expected skips).
- Next verification: focused browser/axe/no-JavaScript/responsive/motion/visual matrix at 320/390/768/1024/1440 and 844×390, visual inspection, final shared quality and state/input gates.

## Completed revision — P-003 family model-selection cards

- User authorization: revise the exact model-selection page reached from a family, confirmed with `/wagons/flat/`.
- Contract: retain the single-column compact reading order and direct product navigation; use three contained cards per row on wide screens, visually smaller local wagon renders, and concise source-owned model details that add context without inventing compatibility claims.
- Intended files: `website/src/components/catalogue/WagonModelList/{WagonModelList.astro,WagonModelList.types.ts,README.md}`, `website/src/adapters/content/catalogue-view-model.ts`, focused fixture/tests/visual baselines, catalogue integration evidence, tracker, STATUS and CHANGELOG.
- Startup: required Node 22.13 `pnpm quality` baseline PASS with local preview permission (78 unit, 3 foundation, 26 production routes, 61 component-lab routes, 1,292 browser checks; 16 expected skips). Initial sandbox attempt recorded `listen EPERM` on `127.0.0.1:4322` before the permitted rerun.
- Outcome: `/wagons/{family}/` now renders three equal model cards per wide row, smaller contained wagon renders, fixed internal alignment for code/title/summary/details/media/action, and source-listed cargo context before each direct product link. Compact layouts remain one column.
- Validation: focused unit/type/browser/axe/no-JavaScript/responsive checks passed (24/24), component visual baselines passed (6/6), family-route visual baselines passed (30/30), flat-family integration visual baselines passed (6/6), and final Node 22.13 `pnpm quality` passed (78 unit, 3 foundation, 26 production routes, 61 component-lab routes, 1,292 browser checks; 16 expected skips). `git diff --check`, `validate-state.sh`, and `validate-inputs.sh` passed.
- Continue: resume the already-authorized H-002 RailwayOrbital revision; no external system was changed.

## Completed revision — A-004 print catalogue detail pages

- User authorization: extract wagon specifications and technical drawings from the root `Catalog for print.pdf` and `.ai`, and rework the existing detail pages in the site design.
- Contract: all ten existing routes retain identity/navigation; catalogue technical rows and tables retain source punctuation, units, order and blank/merged cells; local extracted drawings remain readable through native full-size links; one responsive composition serves compact and wide screens.
- Intended files: catalogue/product source JSON, print-catalogue data and provenance documentation, local technical drawing assets, product view model, shared product page composition, a portable technical-sheet component, focused tests/fixtures, affected visual evidence, tracker, STATUS and CHANGELOG.
- Startup: state/input validators PASS; pre-edit Node 22.13 `pnpm quality` PASS (76 unit, 3 foundation, 26 production, 60 lab, 1,292 browser; 16 expected skips).
- Source review: both files contain 26 pages with outlined/non-extractable text. Rendered visual review is required. Apparent catalogue inconsistencies will be preserved and documented, not silently corrected or promoted as new compatibility claims.
- Outcome: all ten existing routes now use one shared detail-page composition with exact printed specification strings, source-aware notes, responsive technical tables, and 23 local drawing crops extracted from the Illustrator catalogue source.
- Validation: focused unit/content/type/build/route/performance checks PASS; product browser/keyboard/axe/visual PASS (84); final Node 22.13 `pnpm quality` PASS (78 unit, 3 foundation, 26 production, 61 component-lab routes, 1,292 browser checks; 16 expected skips).

## Completed revision — I-005 UI copy cleanup

- User authorization: audit all components and remove or rewrite technical UI text and raw HTML/Markdown file references; the later user request authorized the build and test run.
- Outcome: removed raw Markdown/HTML paths and internal workflow labels from rendered components, retained useful public links and factual qualifications, and updated affected visitor-facing copy and contracts.
- Validation: Node 22.13 format check, Astro typecheck, production build (26 routes), component-lab build (60 routes), unit (73), foundation (3), content/brand audit, visual update (430 passed, 2 skipped), and full browser suite (1,292 passed, 16 skipped) PASS. Focused editorial regression passed 54/54. Final `git diff --check` and state/input gates are required before handoff.
- Continuation: I-006 remains implemented and externally blocked; no deployment or external mutation was performed.

## I-006 external evidence gate

- User-visible outcome: the implemented static Vercel release remains locally reviewable while production publication waits for explicit external authorization and configuration.
- Current state: `IMPLEMENTED`, not `VERIFIED`; H-004's user-directed selector revision is complete and does not change the I-006 external boundary.
- Required external inputs: a Vercel plan that permits commercial use or written authorization, project/domain access, owner/legal approval of the adapted pages, approved documents/certificates, and hosted/real-device/field evidence. A form provider, server recipient, rate limit, anti-abuse service, and server retention contract are no longer required for the chosen mail-client handoff.
- In scope once inputs exist: deploy the reviewed static output, run documented hosted header/redirect/sitemap/route smoke checks, verify the `mailto:` handoff on representative devices with configured mail applications, and record exact evidence.
- Out of scope without new authorization: purchasing a plan, creating or mutating Vercel/domain resources, enabling analytics, inventing legal approval, or starting another package.
- Next action: obtain the required external inputs, then execute the documented Vercel handoff and hosted verification before promoting I-006 to `VERIFIED`.

## Completed correction — C-006 working EN/DE language selector

- Historical outcome: the header renders both `EN` and `DE`; the external German destination recorded here was superseded by the current local-route correction below.
- Historical evidence: focused browser checks PASS (18); final Node 22.13 `pnpm quality` passed before the local German-route correction.

## Completed correction — C-006 local German language routes and page localization

- User-visible outcome: `DE` stays on this website under `/de/`, preserves the current page path, and renders the matching German page instead of aliasing every destination to the homepage.
- Design: A central locale registry normalizes route prefixes and drives the native expandable selector. German page dispatch reuses the approved English view models through a shared translation adapter, while the homepage switchyard receives caller-owned German labels and summaries.
- Intended files: `website/src/adapters/content/{site-shell-view-model,german-homepage-view-model,localized-view-model}.ts`, `website/src/components/{shell/SiteHeader, shell/SiteFooter,home/WagonSwitchyard,home/ContactCTA}/`, `website/src/pages/de/`, shell/component docs, focused tests, tracker, `STATUS.md`, and `CHANGELOG.md`.
- Current evidence: Node 22.13 formatting, ESLint, Astro diagnostics (0 errors/warnings/hints), unit tests (79), production build (52 pages), component-lab build (61 pages), foundation tests (3), route integration (`routes=51 products=10 internal-references=1587`), and focused German browser checks (24/24 across all configured widths) PASS. The rendered `/de/technology/` route was inspected and shared footer/contact landmarks are German.
- Boundary: The repository-wide browser suite remains a mixed component-lab baseline with pre-existing failures unrelated to this route work; the dedicated production German suite is the authoritative evidence for C-006. No external system was changed.
- Continue: Return to the existing I-006 external evidence gate; do not start another implementation package without explicit authorization.

## User-directed visual revision

- H-004 `WagonSwitchyard` was revised at the user's direction to match the supplied switchyard references. Wide screens use a viewport-fitting left-aligned introduction, framed wagon/detail panel, and lower five-stop route rail; compact screens retain their approved vertical sequence. Stops are centred on the blue rail, sequence numbers sit below it, 12 px gutters expose the connectors, and only the short outgoing gutter beside the selected red card becomes red. The selected dot pulses slowly unless reduced motion is active, and decorative technical status language was replaced with useful transport-task guidance.
- Modified H-004 files: `website/src/components/home/WagonSwitchyard/{WagonSwitchyard.astro,WagonSwitchyard.types.ts,wagon-switchyard-contract.ts,wagon-switchyard-controller.ts,README.md}`, homepage adapter, fixture, focused unit/browser tests, and affected component/homepage visual baselines.
- Evidence: focused Playwright PASS (36); canonical and landscape visual states reviewed; final Node 22.13 `pnpm quality` PASS (73 unit, 3 foundation, 26 production, 60 lab, 1,292 browser; 16 expected skips).
- H-002 `RailwayOrbital` was revised at the user's direction without changing active F-003 `ContactForm` ownership: its production SVG now uses the approved small fine-dotted Earth and three thin, paired railway loops, each with one moving three-car passenger, steam, or freight train plus one red signal beacon. The cars move independently along their loop, travel in the reversed direction, and each mirrored lead car now faces that direction; rail and moving elements never overlap the Earth.
- Modified H-002 files: `website/src/components/home/RailwayOrbital/{RailwayOrbital.astro,railway-orbital-controller.ts,README.md}`, fixture, focused browser test, and six visual baselines.
- Evidence: focused ESLint and lab build PASS; focused Playwright PASS (30 checks across 320/390/768/1024/1440/844x390). Its prior shared evidence remains recorded in the tracker.

## Last verified baseline

- Repository structure: documentation, agent harness, preparation archive, and unscaffolded `website/` workspace are separated.
- Production application: Astro 7.2.2 static foundation and isolated component lab are scaffolded; product/page implementation has not started.
- State validation command: `agent/scripts/validate-state.sh`
- Input validation command: `agent/scripts/validate-inputs.sh`
- Application baseline command: `PATH=/Users/perfrico/.nvm/versions/node/v22.13.0/bin:$PATH; cd website && pnpm quality` — PASS (76 unit, 3 foundation, 26 production, 60 component-lab routes, 1,292 browser checks; 16 expected skips). The final suite includes the working EN/DE selector and deterministic lazy-image settling.
- Git baseline: initialized on `main`; the latest commit is the validated development handoff baseline. Use `git log -1 --oneline` for its immutable identifier.

## Current architecture

- Static-first Astro 7, strict TypeScript, native CSS, Astro content collections, and Zod.
- Vitest for pure logic; isolated Astro component lab plus Playwright for rendered components and journeys.
- Portable static output configured for Vercel; the contact form uses a static `mailto:` handoff and has no server-side delivery endpoint.
- Component dependency direction: pages -> sections -> primitives -> pure types/utilities.
- One semantic mobile-first component tree; component-owned layout changes use container queries, while shell-level changes use page media queries.
- Content and deployment adapters depend on stable application/domain contracts, not the reverse.
- Content contracts validate source attribution and publication state; production view models preserve engineering strings and exclude draft or unverified claims.
- Release-one catalogue uses direct links to five families and ten products. No search, filtering, comparison, or configurator.

## Approved visual direction

- V7 is the current visual baseline: `prep/design/stitch-generations/v7/stitch_transant_b2b_website_redesign (6)/screen.png`.
- Keep the static split hero, blue Wagon Switchyard signature section, restrained blue accents, editorial spacing, and abstract Railway Orbital.
- Preserve V7 at the 1440 px reference while deliberately recomposing each section for compact screens; never shrink the desktop page mechanically.
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
- `docs/specifications/mobile-responsive-design-requirements.md`
- `docs/technology-stack-decision.md`
- `website/`
- `website/src/domain/content/`
- `website/src/adapters/content/`
- `website/tests/unit/content-schemas.test.ts`
- `website/src/components/core/BrandLogo/`
- `website/src/components/core/Action/`
- `website/src/components/core/SectionIntro/`
- `website/src/components/core/ResponsiveMedia/`
- `website/src/components/core/RailSequence/`
- `website/src/components/shell/SiteHeader/`
- `website/src/components/shell/SiteFooter/`
- `website/src/components/home/HomeHero/`
- `website/src/components/home/RailwayOrbital/`
- `website/src/components/home/PayloadValueSection/`
- `website/src/components/home/WagonSwitchyard/`
- `website/src/components/home/ModularPlatformSection/`
- `website/src/components/home/OperationalCaseStudy/`
- `website/src/components/home/CollaborationProcess/`
- `website/src/components/home/QualityImpactSection/`
- `website/src/components/home/ContactCTA/`
- `website/src/components/catalogue/Breadcrumbs/`
- `website/src/components/catalogue/WagonFamilyIndex/`
- `website/src/components/catalogue/WagonModelList/`
- `website/src/components/product/ProductHero/`
- `website/src/components/product/CargoFit/`
- `website/src/components/product/SpecificationGroup/`
- `website/src/components/product/LoadLimitTable/`
- `website/src/components/product/RelatedWagons/`
- `website/src/components/editorial/PageHero/`
- `website/src/components/editorial/EvidenceList/`
- `website/src/components/legal/LegalDocument/`
- `website/src/components/form/ContactForm/`
- `website/src/layouts/{BaseLayout.astro,BaseLayout.types.ts,base-layout-contract.ts,README.md}`
- `website/src/adapters/content/catalogue-view-model.ts`
- `website/src/adapters/content/{catalogue-data.ts,site-shell-view-model.ts,product-view-model.ts}`
- `website/src/pages/wagons/{index.astro,[family].astro,[family]/[product].astro}`
- `website/src/adapters/content/product-view-model.ts`
- `website/src/adapters/content/legal-page-view-model.ts`
- `website/src/pages/{contact,privacy,imprint,404}.astro`
- `website/scripts/verify-route-integration.mjs`
- `website/tests/{support/page-review-routes.ts,browser/responsive-visual-integration.spec.ts}`
- `docs/specifications/responsive-visual-integration.md`
- `website/component-lab/pages/fixtures/{contact,legal/[page],system-404}.astro`
- `website/tests/{unit/legal-document-contract.test.ts,browser/legal-system-pages.spec.ts}`
- `website/component-lab/pages/fixtures/products/[family]/[product].astro`
- `website/tests/browser/product-pages.spec.ts`
- `website/component-lab/pages/fixtures/catalogue/{index.astro,[family].astro}`
- `website/tests/browser/catalogue.spec.ts`
- `website/component-lab/pages/fixtures/brand-logo.astro`
- `website/component-lab/pages/fixtures/action.astro`
- `website/tests/browser/action.spec.ts`
- `website/tests/visual/action.spec.ts/`
- `website/component-lab/pages/fixtures/section-intro.astro`
- `website/tests/browser/section-intro.spec.ts`
- `website/tests/visual/section-intro.spec.ts/`
- `website/component-lab/pages/fixtures/responsive-media.astro`
- `website/tests/{unit/responsive-media-contract.test.ts,browser/responsive-media.spec.ts,visual/responsive-media.spec.ts/}`
- `website/tests/{unit/brand-logo-asset.test.ts,browser/brand-logo.spec.ts,visual/brand-logo.spec.ts/}`
- `website/component-lab/pages/fixtures/rail-sequence.astro`
- `website/tests/browser/rail-sequence.spec.ts`
- `website/tests/visual/rail-sequence.spec.ts/`
- `website/component-lab/pages/fixtures/{site-header,site-header-repeated}.astro`
- `website/tests/browser/site-header.spec.ts`
- `website/tests/visual/site-header.spec.ts/`
- `website/component-lab/pages/fixtures/site-footer.astro`
- `website/tests/browser/site-footer.spec.ts`
- `website/tests/visual/site-footer.spec.ts/`
- `website/component-lab/pages/fixtures/home-hero.astro`
- `website/tests/browser/home-hero.spec.ts`
- `website/tests/visual/home-hero.spec.ts/`
- `website/component-lab/pages/fixtures/railway-orbital.astro`
- `website/tests/browser/railway-orbital.spec.ts`
- `website/tests/visual/railway-orbital.spec.ts/`
- `website/component-lab/pages/fixtures/payload-value-section.astro`
- `website/tests/{unit/payload-value-section-contract.test.ts,browser/payload-value-section.spec.ts,visual/payload-value-section.spec.ts/}`
- `website/component-lab/pages/fixtures/wagon-switchyard.astro`
- `website/tests/{unit/wagon-switchyard-contract.test.ts,browser/wagon-switchyard.spec.ts,visual/wagon-switchyard.spec.ts/}`
- `website/component-lab/pages/fixtures/modular-platform-section.astro`
- `website/tests/{unit/modular-platform-section-contract.test.ts,browser/modular-platform-section.spec.ts,visual/modular-platform-section.spec.ts/}`
- `website/component-lab/pages/fixtures/operational-case-study.astro`
- `website/tests/{unit/operational-case-study-contract.test.ts,browser/operational-case-study.spec.ts,visual/operational-case-study.spec.ts/}`
- `website/component-lab/pages/fixtures/collaboration-process.astro`
- `website/tests/{unit/collaboration-process-contract.test.ts,browser/collaboration-process.spec.ts,visual/collaboration-process.spec.ts/}`
- `website/component-lab/pages/fixtures/quality-impact-section.astro`
- `website/tests/{unit/quality-impact-section-contract.test.ts,browser/quality-impact-section.spec.ts,visual/quality-impact-section.spec.ts/}`
- `website/component-lab/pages/fixtures/contact-cta.astro`
- `website/tests/{unit/contact-cta-contract.test.ts,browser/contact-cta.spec.ts,visual/contact-cta.spec.ts/}`
- `website/component-lab/pages/fixtures/breadcrumbs.astro`
- `website/tests/{unit/breadcrumbs-contract.test.ts,browser/breadcrumbs.spec.ts,visual/breadcrumbs.spec.ts/}`
- `website/component-lab/pages/fixtures/wagon-family-index.astro`
- `website/tests/{unit/wagon-family-index-contract.test.ts,browser/wagon-family-index.spec.ts,visual/wagon-family-index.spec.ts/}`
- `website/component-lab/pages/fixtures/wagon-model-list.astro`
- `website/tests/{unit/wagon-model-list-contract.test.ts,browser/wagon-model-list.spec.ts,visual/wagon-model-list.spec.ts/}`
- `website/component-lab/pages/fixtures/product-hero.astro`
- `website/component-lab/pages/fixtures/cargo-fit.astro`
- `website/tests/{unit/product-hero-contract.test.ts,browser/product-hero.spec.ts,visual/product-hero.spec.ts/}`
- `website/tests/{unit/cargo-fit-contract.test.ts,browser/cargo-fit.spec.ts,visual/cargo-fit.spec.ts/}`
- `website/component-lab/pages/fixtures/specification-group.astro`
- `website/tests/{unit/specification-group-contract.test.ts,browser/specification-group.spec.ts,visual/specification-group.spec.ts/}`
- `website/component-lab/pages/fixtures/load-limit-table.astro`
- `website/tests/{unit/load-limit-table-contract.test.ts,browser/load-limit-table.spec.ts,visual/load-limit-table.spec.ts/}`
- `website/component-lab/pages/fixtures/base-layout.astro`
- `website/tests/{unit/base-layout-contract.test.ts,browser/base-layout.spec.ts}`

## Completed

- Public company and product-source research organized.
- Five-family, ten-product content tree extracted under `website/src/content/`.
- Source images moved to `website/src/assets/images/` so Astro must process selected assets instead of copying 211 MB unchanged.
- The byte-identical logo is isolated at `website/public/brand/transant-logo.png` for direct public delivery.
- Oversized editorial originals and campaign artwork are archived under `prep/source-material/web-image-masters/`; reviewed web-sized editorial copies keep the active website workspace near 34 MB.
- Technology stack and production requirements documented.
- V7 design reviewed and decomposed into independent work packages.
- Mobile and responsive behavior specified for the shell, every V7 homepage section, catalogue, products, editorial/legal pages, forms, media, motion, and release evidence without adding a duplicate mobile component tree.
- Component-first development plan and 43-package status tracker created.
- Historical designs, large source masters, and old extraction tooling moved under `prep/`.
- OpenAI-oriented long-running harness instructions and scripts created.
- State and production-input validation are mandatory agent-run gates before implementation and again before handoff; worker and evaluator runners enforce both automatically.
- Local Git repository initialized on `main`; large preparation-only directories are excluded by `.gitignore`.
- F-001 verified: Node 22.13.0 and pnpm 10.34.5 are pinned; Astro production/lab builds are isolated; strict types, formatting, linting, Vitest, Playwright, axe, responsive overflow checks, visual baselines, foundation styles, and CI-ready quality commands pass.
- F-002 verified: strict source-attributed content contracts preserve engineering strings and exclude draft/unverified claims from production models.
- C-001 verified: `BrandLogo` renders the digest-pinned 520 × 114 PNG in typed linked/unlinked variants; dark contexts add only paper whitespace, and the component has no logo filter or motion.
- C-002 verified: `Action` provides typed native link/button semantics with primary, secondary, text, and inverse variants; safe external-link indication, real disabled behavior, 44 px targets, visible focus, forced-colors fallback, and no client JavaScript.
- C-003 verified: `SectionIntro` provides caller-selected semantic heading levels with optional eyebrow/description, left/center alignment, light/dark foreground themes, and readable measures without owning a page surface or layout.
- C-004 verified: `ResponsiveMedia` validates local image metadata and accessibility intent, generates responsive AVIF/WebP/fallback output through Sharp, preserves intrinsic or reserved layout space, and offers semantic plain-text or slot captions without client JavaScript.
- C-005 verified: `RailSequence` renders typed two-to-six-stage semantic ordered lists with explicit stage labels, optional native title links, light/dark foreground treatments, and component-owned compact vertical/wide rail compositions without client JavaScript.
- C-006 verified: `SiteHeader` composes the immutable `BrandLogo` and native `Action` from caller-supplied navigation and locale data; its server-rendered links remain usable without JavaScript, and its enhanced compact panel handles focus, Escape, close, navigation selection, inert background, and repeated named instances.
- C-007 verified: `SiteFooter` renders caller-owned secondary navigation, verified contact information, legal links, and an optional locale group as server HTML; it rejects blank/malformed/unverified contract data and maintains a dark-blue, content-first compact close without JavaScript.
- H-001 verified: `HomeHero` renders a caller-owned, static editorial proposition before its priority local railway image; structured red emphasis, native actions, responsive media, compact stacking, and wide split remain server-rendered without a client controller.
- H-002 verified: `RailwayOrbital` renders an independent static railway-inspired SVG with decorative or named-figure semantics; its two CSS marker motions are optional, visibility-gated, and suppressed for reduced motion or a static caller selection.
- H-003 verified: `PayloadValueSection` composes caller-owned `SectionIntro` editorial content, a required named visual slot, an optional safe source link, and exactly three/four ordered engineering principles; it never imports `RailwayOrbital`, remains static without JavaScript, and keeps the compact proposition/visual/principles order.
- H-004 verified: `WagonSwitchyard` renders all five caller-owned local wagon-family routes and summaries in server HTML, retaining a default family and direct linked rail without JavaScript; its isolated controller upgrades only its own instance to accessible keyboard tabs, atomically switching the selected identity, contained wagon render, copy, action, and optional technical label. The reference revision adds viewport-fitting wide layout, a left-aligned introduction, useful transport-task guidance, a red progress rail through the selected stop, and a reduced-motion-safe 2.8-second radar pulse.
- H-005 verified: `ModularPlatformSection` composes caller-owned `SectionIntro`, a two-to-six-stage `RailSequence` (four in the standard platform equation), and an optional validated text `Action`; the section remains static, server-rendered, source-ordered, and has no page/data/browser dependency or client controller.
- H-006 verified: `OperationalCaseStudy` composes caller-owned local C-004 media, evidence-led title/summary, source-labelled facts, and optional validated C-002 text/download actions; it excludes draft/unverified facts, stays static and title-first on compact screens, and creates no quote, live-status, route-map, KPI, or document placeholder.
- H-007 verified: `CollaborationProcess` composes caller-owned `SectionIntro`, a four-to-six-step C-005 `RailSequence`, and an optional validated C-002 native contact action; it remains static and title-first on compact screens, preserves explicit process semantics, and adds no carousel, swipe, pagination, live status, or delivery claim.
- H-008 verified: `QualityImpactSection` composes caller-owned C-003 `SectionIntro` and C-002 native evidence actions for source-attributed certification, policy, capability, target, and marketing-statement topics; unapproved inputs are excluded, certificate metadata is validated only for certifications, and compact/wide layouts retain readable source and evidence boundaries without client JavaScript.
- H-009 verified: `ContactCTA` composes caller-owned title/summary C-003 introduction, one primary C-002 native inquiry action, optional C-002 supporting links, and an optional visible `context` that is URL-encoded only into the primary route. It remains static and centred, turns compact supporting links into separate touch rows, uses two-column wide supporting composition, and includes no form, client controller, page/global-state, analytics, or recipient/provider dependency.
- P-001 verified: `Breadcrumbs` renders caller-owned root-to-current ordered paths as a labelled server-rendered `nav` and semantic list. Earlier locations are native links, while the final current item is never a link and has `aria-current="page"`. Caller-owned canonical paths and an explicit public base URL produce complete schema.org `BreadcrumbList` JSON-LD without route, browser, or environment state; optional compact labels preserve full accessible and structured names. Compact paths wrap without a horizontal strip or client JavaScript.
- P-002 verified: `WagonFamilyIndex` renders exactly five caller-owned, source-attributed editorial family rows with local C-004 wagon media and direct C-002 same-site family links. It composes caller-selected C-003 introduction data, keeps compact label/title/summary/media/provenance/action order, makes no search/filter/comparison/configurator or client-state dependency, and alternates rows only visually at a wide component boundary. Detailed model lists remain P-003 scope.
- P-003 verified: `WagonModelList` renders one-or-more caller-owned family model articles as a semantic list with source-preserved model codes, model provenance, concise source-listed cargo details, direct C-002 product links, and either meaningful local contained C-004 media or an explicit visible caller-owned media fallback. Unique identity and destination distinguish records; a source-preserved code may repeat for distinct models, as it does for the 40 ft and 56 ft Eanos open-box wagons. It has no route/content/browser/deployment dependency, no client controller, and no search/filter/comparison/configurator; compact cards remain one column and a 56-rem component boundary adds three equal wide cards with fixed internal alignment and reduced wagon-render scale.
- P-004 verified: `ProductHero` composes caller-owned family/model identity, a source-owned benefit, one C-004 priority contained local wagon render, one-to-four source-attributed decisive facts, and a C-002 inquiry action. It only URL-encodes explicit caller context into that action, preserves query/fragment values, remains static without JavaScript, stacks identity/action/render/facts on compact screens, and forms an editorial/render split at a 60-rem component boundary.
- P-005 verified: `CargoFit` composes caller-owned C-003 introduction data and optional source-attributed cargo/use-case declarations. It filters only explicit F-002 `approved` entries without mutating input, visibly preserves each kind and source reference, renders an honest no-approved-entry state, has no client controller, and creates no compatibility, operational, safety, loading, or technical inference. Compact cards stay one column; 44-rem and 72-rem component boundaries permit two and three contained columns only when their labels have measure.
- P-006 verified: `SpecificationGroup` renders a caller-owned, source-attributed technical definition list with one-or-more source-ordered label/value rows and optional source-supplied units. It preserves supplied engineering strings without parsing, normalization, calculation, or inference; missing units stay absent rather than becoming placeholders. It is static with no client controller, keeps compact label/value pairs together, moves to a contained two-column pair layout at 46 rem, and leaves relational load-limit data and product-page assembly to later packages.
- P-007 verified: `LoadLimitTable` renders the F-002 caller-owned A–D relational engineering table with visible caption, scoped row/column headers, source-preserved values and optional unit suffixes, source notes, and no client controller. Compact containers preserve the table in a labelled, focusable horizontal scroller with an explicit scroll affordance; 37-rem-plus containers use the full table width, and print removes the overflow treatment without transforming relationships into cards.
- P-008 verified: `DownloadList` renders caller-owned F-002 approved real-file routes with source-preserved type, language, optional revision/size, per-file provenance, and C-002 native download actions. Draft/unverified records remain valid inputs but are omitted; missing, unsafe, or placeholder destinations fail before render. Compact rows stack title/provenance, labelled metadata, then action, and a 52-rem component boundary creates contained wide rows without client JavaScript.
- P-008 baseline correction: the responsive fixture assertion now selects metadata within the already-selected entry rather than an impossible nested entry. Focused `DownloadList` browser evidence (30 checks), isolated `ResponsiveMedia` evidence (24 checks), and the shared quality gate pass; the correction changes no component behavior or acceptance scope.
- P-009 verified: `RelatedWagons` renders only caller-owned F-002 approved explicit relationship records with visible provenance, direct C-002 same-site product actions, optional reviewed local C-004 transparent renders, and an honest zero-relation state. It rejects self-reference, duplicate identities/destinations, unsafe routes, incomplete relationship data, and unsuitable media; compact cards remain one column and a 54-rem component boundary creates a contained two-column list without JavaScript.
- E-001 verified: `PageHero` composes caller-owned C-003 hierarchy, optional generic breadcrumb slot, optional C-004 meaningful local priority media, light/dark surface themes, and optional C-002 native route action. Callers choose an h1–h6 heading level and persistent `before`/`after` media source order; compact variants remain one column and the 62-rem editorial split never reorders content. It has no client controller, page assembly, route/content/environment dependency, or inferred claims.
- E-003 verified: `EvidenceList` renders caller-owned approved policy, certification, document, and factual-reference records as static source-attributed list articles. It preserves supplied status/date/issuer/scope text without inference, excludes draft/unverified entries, gives an honest empty state, and delegates explicit external/download destinations to C-002 native actions; compact labels remain grouped and a contained 56-rem row never reorders source content.
- F-003 implemented: `ContactForm` provides a typed, caller-owned same-site native POST form for name, business email, optional company, message, consent, privacy notice, submit label, and optional visible/hidden context. It keeps delivery/server credentials outside the component and adds independent client-side pending, success, field/server-error, retry, input-preservation, honeypot, status, and focus handling. Fixture, focused unit/browser/visual definitions, documentation, static diagnostics, and the component-lab build are complete; unit/browser/visual/shared-quality evidence is deliberately deferred to the authorized fifth-package checkpoint.
- A-001 implemented: `BaseLayout` owns only document-level local styles/fonts, valid language/title/description/canonical/social/favicon metadata, a keyboard skip link, one focusable main landmark, and caller-owned `SiteHeader`/verified `SiteFooter` composition. Its contract, fixture, focused evidence definitions, documentation, and static/lab-build proof are complete; focused unit/browser/visual/shared-quality proof is deliberately deferred to the authorized A-004 checkpoint.
- A-006 implemented, pending I-003 evidence: `Contact`, `Privacy`, `Imprint`, and `404` now have one typed route-data boundary. Contact composes the existing native `ContactForm` against the explicitly unconfigured same-site delivery endpoint; Privacy describes rather than fabricates the missing delivery/privacy contract; Imprint limits itself to publishable company facts; and 404 provides direct recovery links. `LegalDocument` owns the shared readable legal hierarchy. Static validation, production/lab builds, built-output inspection, fixtures, focused test definitions, and documentation are complete; unit/browser/responsive/keyboard/axe/visual/shared-quality proof is deliberately deferred to the authorized I-003 checkpoint.
- I-001 implemented, pending I-003 evidence: `pnpm check:route-integration` reads only the completed production `dist/` tree after `pnpm build`; it checks all generated document href values, validates local generated document/static-file destinations and named fragments, starts the public graph at `/`, requires every non-404 generated route to be reachable, requires exactly ten product routes, and separately inspects the 404 recovery output. It neither opens a browser nor contacts external, mail, or telephone destinations.

## Latest completed checkpoint

- A-004 — VERIFIED. Exactly ten product routes are generated by one typed source-derived adapter and dynamic nested route; product media is local and approved, technical strings/status/provenance are preserved, and unavailable downloads/relations render explicit empty states. The production route and component-lab fixture compose only BaseLayout, Breadcrumbs, ProductHero, CargoFit, SpecificationGroup, conditional LoadLimitTable, DownloadList, RelatedWagons, and ContactCTA. All six 320/390/768/1024/1440/844x390 product visual states were inspected.
- F-003, P-003, A-001, A-002, A-003 — VERIFIED at the authorized accumulated checkpoint. ContactForm’s pending token and error-focus order were corrected without changing its external delivery boundary. The revised homepage/catalogue test selectors and PayloadValueSection baseline now match their approved rendered semantics.
- Evidence: Node 22.13 pnpm quality PASS — Prettier, ESLint, Astro diagnostics, 63 unit tests, production build (17 routes), component-lab build (51 routes), 3 foundation tests, and 1,046 browser/visual/responsive/keyboard/axe checks with 4 expected wide-only SiteHeader skips. git diff --check PASS.
- I-003 — VERIFIED. Added the cross-page accessibility contract and accumulated A-005/A-006/I-001/I-002/I-003 evidence. Final Node 22.13 `pnpm quality` passed with 65 unit tests, 3 foundation tests, 26 production routes, 60 component-lab routes, and 1,268 browser/responsive/keyboard/axe/visual checks; 16 expected skips are recorded for wide-only menu coverage. The route/link crawler remains PASS at `routes=25 products=10 internal-references=660`; all 84 I-002 full-page review baselines were generated and representative states were inspected.
- I-005 — VERIFIED. `pnpm check:content-brand-audit` reads the completed production output and source catalogue to verify all five families and ten product routes preserve names, codes, technical strings, reviewed local media, provenance, and the immutable logo digest. It rejects bare/unsafe destinations, unfinished output copy, and remote image/script sources while retaining named skip anchors; it records the unconfigured `/contact/submit` endpoint as an explicit provider-configuration launch blocker. Node 22.13 focused unit/browser evidence and final `pnpm quality` PASS; the 320 and 1440 px production review preserved source hierarchy, logo use, technical table treatment, and compact menu composition.

## Historical pre-checkpoint handoff

- C-004 — `ResponsiveMedia`: `VERIFIED`. The visual test now scrolls each local lazy image into view and confirms it has decoded before capturing the full-page baseline. This removes the nondeterminism that allowed the third figure to be omitted from a 1440 px capture while preserving the public component's caller-selected lazy-loading behavior. All six 320/390/768/1024/1440/844×390 visual baselines were regenerated and reviewed; focused browser evidence passes 24 checks.
- E-002 — `MediaStory`: `VERIFIED`. Its existing focused unit, browser, accessibility, responsive, and visual evidence remains valid; the restored shared gate passes, so the dependency evidence is now complete. No E-002 source or test changed in this cycle.
- E-003 — `EvidenceList`: `VERIFIED`. Focused and shared evidence pass for approved type filtering, metadata, explicit external/download actions, empty state, compact/wide layout, keyboard focus, axe, browser errors, and six visual baselines.
- F-003 — `ContactForm`: `IMPLEMENTED`, not verified. The isolated server-rendered same-site POST form, caller-owned contract, instance-scoped enhancement, fixture, focused test definitions, and component documentation are complete. Node 22.13 focused Prettier/ESLint/Astro diagnostics, component-lab build, and `git diff --check` pass. The authorized ten-package batch defers focused unit/browser/visual and shared-quality runs to its fifth-package checkpoint, so none is claimed as passing here.
- A-001 — `BaseLayout`: `IMPLEMENTED`, not verified. The page-wide local document shell, caller-owned metadata and shell-data contract, skip-link/main-landmark behavior, fixture, focused test definitions, and documentation are complete. Node 22.13 Prettier, ESLint, Astro diagnostics, component-lab build (34 routes), built-output inspection, and `git diff --check` pass. Its focused unit/browser/visual and shared-quality evidence is `NOT_RUN` by the explicit batch directive and will be accumulated after A-004.
- A-002 — `Homepage`: `IMPLEMENTED`, not verified. The explicit V7 section composition, route view model, fixture, focused browser definition, static checks, production/lab builds, and built-output inspection are complete. Its focused browser/responsive/keyboard/accessibility/visual and shared-quality evidence remains `NOT_RUN` until the A-004 checkpoint.
- A-003 — `Catalogue and five family pages`: `IMPLEMENTED`, not verified. `/wagons/` and all five direct family routes compose only `BaseLayout`, `PageHero`, `Breadcrumbs`, `WagonFamilyIndex`, and `WagonModelList` from a typed source-derived adapter that resolves all ten reviewed local wagon renders. The direct catalogue/family fixture routes and deferred browser/visual definitions are complete. P-003 now preserves repeated source code `Eanos` for distinct 40 ft/56 ft models, keyed by identity and destination. Node 22.13 format/lint/strict diagnostics, production build (7 routes), component-lab build (41 routes), built-output inspection, and `git diff --check` pass. Focused unit/browser/responsive/keyboard/accessibility/visual suites and `pnpm quality` are `NOT_RUN` until the A-004 checkpoint.

## Known blockers and decisions still required

- Astro 7.2.2 is intentionally pinned with `unifont@0.7.4`; the newer transitive dependency requires Node 22.19+, while the approved local runtime is Node 22.13.0.
- Canonical brand colour values and logo usage rules still require client confirmation.
- Production domain/Vercel ownership, a Vercel plan permitting commercial use, owner/legal approval of the adapted legal text, downloads, certificates, final claims, and representative-device review of the `mailto:` handoff remain production-lock inputs. Analytics is disabled, so no analytics consent layer is required for this build.
- German remains gated until approved translations exist.
- The first requested three-cycle run stopped before C-005 because Bash strict mode expanded an empty `git_args` array as an unset variable. The runner now composes the Codex argument list before invocation. A second pre-worker invocation exposed an installed-CLI conflict between `--approve-for-me` and explicit `--sandbox`; automatic approval now supplies the documented workspace-write sandbox itself. A third invocation reached the worker API but the result schema omitted a declared required key; it now requires a string `note` for each test record. Rerun the bounded three-cycle harness.
- The 2026-09-04 H-009 harness retry reached the worker, passed both state/input gates, and passed formatting, lint, Astro diagnostics, unit tests, and both builds. Its mandatory browser phase then failed before test execution because the nested workspace-write sandbox denied `astro preview --host 127.0.0.1 --port 4322` with `listen EPERM`. The outer authorized process does not grant the nested Codex worker a localhost-listener capability. No H-009 implementation, tracker, or state change occurred.
- The worker prompt now requires a scoped `require_escalated` retry for an isolated `listen EPERM` local-preview failure; it forbids a dangerous bypass. The retry request itself is reached, but this noninteractive nested CLI execution does not propagate the listener/Chromium permission. The directly authorized host can run the full suite, as demonstrated by H-009. Unattended browser evidence therefore requires a browser-capable external execution environment or an orchestrator that can forward scoped local-process permissions.
- The A-001 baseline ran its static gates successfully but Playwright did not start because an already-running local `node` process owned `127.0.0.1:4322`; this is not a BaseLayout defect and no process was stopped. Deferred browser proof remains pending at the A-004 checkpoint.

## Historical exact next action

Run Prettier on the ContactForm/Homepage proof repairs. PayloadValueSection's six baselines are refreshed and 320/1440 inspected after the approved H-002 revision. Rerun the accumulated browser suite with a fresh Playwright-managed scoped preview on port 4323 (not reuse), then run the shared quality gate. The current failures are test/environment evidence drift, not an A-004 route/component defect. Preserve A-003's route-level boundary and mark packages `VERIFIED` only from complete passing evidence.

## Exact next action

Obtain a commercial-use Vercel plan or written authorization, project/domain access, and owner/legal approval of the adapted pages. Then deploy, run the documented hosted smoke checks, verify the mail-client handoff on representative devices, and record the evidence before marking I-006 `VERIFIED`.

## Continuation rule

F-003's user-directed mail-client handoff is verified and synchronized. I-006 remains implemented with external evidence pending. Do not begin any package beyond I-006 without explicit authorization.
