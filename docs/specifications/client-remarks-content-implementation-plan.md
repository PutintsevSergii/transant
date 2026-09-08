# Client remarks content implementation plan

## Purpose

This plan converts the client document `client-remarks/TransAnt_New_Website_Content_and_Structure_RU.docx` into controlled I-005 workstreams. Source-backed text and explicit data corrections are implemented first. Technical proposals remain review-only until individually approved; the Home/Wagons navigation and Engineering & Services route proposals were approved for implementation on 2026-09-07.

The client document is a working Russian approval version. It is authoritative for the requested positioning and for values explicitly labelled as corrections, but it also marks several facts as requiring confirmation. Those conditional facts are not published as confirmed claims. On 2026-09-07 the owner first approved an InnoTrans primary-navigation destination and dedicated page, then withdrew that approval. The final instruction is to keep InnoTrans on the homepage, publish the four exact positions as a text list with official links, and use no map.

## Current implementation slice — 2026-09-07

Implemented now:

- the client-supplied English company-role sentence on the homepage and Company page, with authored DE, UA, PL, and CZ equivalents;
- Sgns(s) length over buffers corrected from `19.830` to `19.740` for A buffers;
- the already-correct Eamnos values `6.500` and `10.240` retained and protected by regression coverage;
- Eamnos 10 m and Eanos 56 ft 16 m two-point entries changed from blank to `–`;
- the Eanos 56 ft final concentrated-load section corrected from `b-b` to `d-d`;
- unconfirmed `DAC ready` / `DAC-ready` claims removed from visitor-facing model data and protected by the content audit;
- the unrelated Eamnos timber feature block remains excluded and is protected by regression coverage.
- all four visitor-facing `Catalogue notes` annotations removed from product pages by owner approval; they remain absent across EN, DE, UA, PL, and CZ without changing the underlying source values or tables.

Non-public source-audit hold: the Rnoos loading-length field remains the literal catalogue value `18.50`. Its former public ambiguity warning is removed by owner approval, but this is not a technical confirmation or a value correction; replace it only when a corrected source value is supplied.

Awaiting client source material and factual confirmation before implementation:

- the longer homepage, Company, Engineering & Services, PRO, InnoTrans, and ten-model narratives in any usable source form or language;
- confirmation that the supplied source represents publishable facts and claims. The implementation team prepares the English primary copy and synchronizes DE, UA, PL, and CZ; the client is not required to supply translations.

Approved structural slice — 2026-09-07:

- show a visible localized Home item in primary navigation on every route except that locale's homepage; the immutable logo remains an additional home link;
- render Wagons as a native, server-rendered disclosure containing the catalogue overview and the five source-owned family routes; click/touch and keyboard operate the disclosure, Escape closes it, no destination depends on hover or JavaScript, and the compact menu keeps the same disclosure in source order;
- rename the public Technology destination to Engineering & Services, with localized navigation labels;
- make `/engineering-services/` the canonical English route and use `/de/engineering-services/`, `/uk/engineering-services/`, `/pl/engineering-services/`, and `/cs/engineering-services/` for localized pages;
- permanently redirect the corresponding five legacy `/technology/` routes at the hosting boundary and emit static redirect documents for local/static-host fallback. Redirect routes are excluded from canonical route/sitemap counts.

Revised InnoTrans homepage slice — 2026-09-07:

- do not add an InnoTrans top-level navigation item or dedicated route;
- retain the existing homepage event announcement in every locale and publish 22–25 September 2026 plus `Messe Berlin · Outdoor Display`;
- identify O5/55 as the main display and T5/50, T5/55, and T5/60 as additional positions;
- present the four positions as a semantic text list. Each position links directly to the matching official InnoTrans hall-plan entry supplied by the owner;
- retain the existing external action to the official TransAnt exhibitor profile;
- do not show a map, diagram, spatial schematic, partner logos, partner list, exhibit assignments, directions workflow, or meeting workflow in this homepage slice.

## Content package I-005

### Outcome

The public site describes TransANT as the developer, marketer, coordinator, and support organization for freight-wagon solutions. Company and service copy explains the client and partner model without presenting TransANT as the independent manufacturer. Product copy is model-specific and restrained. Explicit client data corrections supersede conflicting catalogue labels, while unconfirmed DAC and terminology claims are withheld.

### Implementation stages

1. Update the English homepage proposition and supporting metadata with the approved company-role boundary.
2. Replace the catalogue-only Company narrative with source-backed information about TransANT, its work, its team disciplines, its approach, its 2020 Linz foundation, and TAS Group ownership. Do not publish the unverified staff counts or future TAS RAIL Holding reference.
3. Reframe the existing technical content as Engineering & Services on the approved canonical `/engineering-services/` route. Preserve `/technology/` only as a legacy redirect. The longer service narrative covering wagon development, customer adaptation, testing and certification, production preparation, delivery, and technical support remains blocked only until client source material and factual confirmation are supplied in any usable form; the implementation team prepares the English and localized copy.
4. Replace promotional product summaries with the client-supplied model-specific descriptions, cargo lists, and confirmed equipment details. Preserve exact model identity and engineering values.
5. Apply the explicit technical corrections: Sgns(s) length over buffers `19.740` for A-buffers; Eamnos bogie-pivot distance `6.500`; Eamnos loading length `10.240`; Eamnos 10 m two-point entry as unavailable; Eanos 56 ft final section `d-d`; Eanos 56 ft 16 m two-point entry as unavailable. Remove the unrelated timber feature block from Eamnos output if present.
6. Withhold `DAC ready` from public special-feature lists until confirmed per model. Keep the unresolved brake/speed/floor-height terminology visible only where it is explicitly marked as requiring confirmation; do not invent replacement terminology.
7. Synchronize changed visitor-facing copy across EN, DE, UA, PL, and CZ. Product codes, standards, values, addresses, identifiers, and source references remain unchanged by translation.
8. Extend the content audit so the company-role boundary, corrected values, removed Eamnos timber claims, and withheld DAC claims cannot regress.
9. Remove visitor-facing catalogue-note annotations after owner approval. Do not change the associated table cells or source-derived values; keep unresolved source ambiguity in this implementation record rather than publishing it as a customer-facing note.

### Acceptance criteria

- No public page describes TransANT as the independent manufacturer of the wagon range.
- The homepage, Company page, and Engineering & Services content convey the same developer/market/support/coordination role.
- Company copy contains no unverified employee count, engineer count, future holding claim, or invented partner capability.
- All ten product pages retain model-specific cargo, equipment, values, drawings, and source boundaries.
- The six explicit corrected data/table entries match the client document.
- No public product special-feature list contains an unconfirmed `DAC ready` claim.
- Eamnos contains no timber lengths, timber stanchion count, deflector count, or G2 claim.
- Updated content is complete in EN, DE, UA, PL, and CZ without English fallback on localized routes.
- Focused schema/content tests, Astro diagnostics, production build, route/content audit, and affected browser/accessibility checks pass. Visual references are refreshed only where changed copy alters layout.

## Technical and structural decision register

Only rows explicitly marked approved are authorized for implementation. Every other item remains review-only.

| Area                           | Client proposal                                                                                                              | Current-site validation                                                                                                                            | Decision needed                                                                                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header navigation              | Add a visible Home item and a Wagons dropdown                                                                                | Logo already links home; header is already sticky; Wagons is currently a direct catalogue link                                                     | **Approved 2026-09-07:** omit Home only on the homepage; use one native disclosure at all widths, expose overview plus five family links without JavaScript or hover, and preserve compact-menu focus behavior                                      |
| Navigation labels and routes   | Rename Technology to Engineering and services                                                                                | Copy can change on the existing `/technology/` route without breaking URLs                                                                         | **Approved 2026-09-07:** canonical `/engineering-services/` plus localized equivalents; permanent hosting redirects and static fallback redirects from all five legacy `/technology/` paths                                                         |
| Top-level pages                | Add Projects and InnoTrans 2026 to the main menu                                                                             | Projects exists; InnoTrans currently appears as a homepage announcement only                                                                       | **InnoTrans approval withdrawn 2026-09-07:** retain the homepage announcement; do not add a top-level item or `/innotrans-2026/` route. Projects remains unchanged                                                                                  |
| Catalogue menu                 | Add PRO as a sixth family/menu item                                                                                          | Release one is explicitly limited to five current catalogue families; PRO is described as a prior project                                          | Decide whether PRO belongs under Projects rather than Wagons                                                                                                                                                                                        |
| Homepage structure             | Replace the hero photo, enlarge the logo, show all families horizontally, add process/PRO/TAS sections, and reorder the page | Current homepage already shows all five families through an accessible switchyard and already includes InnoTrans, quality, and contact             | Approve a new homepage layout package and provide the chosen hero asset                                                                                                                                                                             |
| Horizontal mobile family cards | Use a horizontally scrolling family strip on phones                                                                          | Current mobile design uses a vertical, fully readable sequence and avoids hidden horizontal content                                                | Approve the interaction and accessibility tradeoff before changing it                                                                                                                                                                               |
| InnoTrans page                 | Add stands, exhibits, partners, custom site map, Google Maps route, and meeting form                                         | Dates/location and official profile link are published; client page 8 supplies four display positions and names TAS Group plus TAS Dniprovagonmash | **Canceled 2026-09-07:** no dedicated page, map, partner presentation, directions, or meeting workflow. Publish only the exact four positions as linked text in the existing homepage event block                                                   |
| Product section navigation     | Add a full sticky submenu for Overview, Cargo, Equipment, Technical data, Load limits, and Downloads                         | Product pages have a simple in-page technical-data link, but not a sticky multi-section bar                                                        | **Deferred for R1:** keep the current product-page navigation and fully visible sections                                                                                                                                                            |
| Product technical layout       | Convert technical data to expandable groups                                                                                  | Current sections are fully server-rendered and visible without interaction                                                                         | Approve disclosure behavior and no-JavaScript fallback                                                                                                                                                                                              |
| Configuration comparison       | Add Compare configurations                                                                                                   | Release one explicitly excludes comparison tools                                                                                                   | Approve a scope change, comparison data model, eligible fields, routes, and mobile behavior                                                                                                                                                         |
| Downloads                      | Add technical sheets or catalogue-page downloads                                                                             | Drawings already open full-size; no separate per-model download set is currently published                                                         | **Deferred for R1:** retain current full-size drawing access without a new download feature                                                                                                                                                         |
| Certificate presentation       | Add certificate thumbnails that open full PDFs                                                                               | Certificate numbers, issuers, scopes, and current official PDF links already exist; thumbnails/local PDFs do not                                   | **Approved 2026-09-07:** retrieve current certificate PDFs, record provenance/digest, generate first-page previews, and serve verified local PDFs; add the IQNET document as a supporting confirmation link under the matching ISO 9001 certificate |
| PRO project page               | Add the three delivered lightweight 60 ft platforms with photos and the conditional up-to-4 t benefit                        | No approved PRO route or local project photos exist                                                                                                | Confirm the claims, models, dates/customer anonymity, photos, and page placement                                                                                                                                                                    |
| Homepage/product media         | Replace locomotive-led hero, use complete Timber renders, and standardize render angle/scale                                 | Current media are local; the visual replacement work needs asset-by-asset review and overlaps the paused H-002 revision                            | Approve assets and resume a separate media package                                                                                                                                                                                                  |
| Contact workflow               | Carry model context and require privacy acknowledgement                                                                      | Model context and privacy consent already exist; delivery is a mail-client handoff                                                                 | **Deferred for R1:** retain the current mail-client handoff                                                                                                                                                                                         |
| Device/performance review      | Validate desktop, tablet, phone, forms, links, menus, downloads, and speed                                                   | Responsive/browser/accessibility matrices exist; hosted and representative-device evidence remains an external I-006 gate                          | Production indexing is approved; host using the technical requirements below, then perform hosted and representative-device verification                                                                                                            |

## Homepage restructuring decision — 2026-09-07

The owner has approved the achievable homepage restructuring as the next separate homepage follow-on after the active I-005 navigation-and-route slice. It is deliberately separated from the broader client proposal so that an approved structural improvement does not publish unconfirmed copy, assets, or claims.

### Variant A — implemented

**Status:** `IMPLEMENTED`.

**Outcome:** make the homepage's visitor journey clearer while retaining the verified catalogue entry points and every current source boundary.

- retain the existing five-family `WagonSwitchyard`, its model data, existing routes, server-rendered links, and current vertical compact composition;
- keep the approved company-role statement as the homepage proposition, with the existing published EN/DE/UA/PL/CZ versions only;
- improve the visual hierarchy of the existing hero, including the logo's prominence, without asserting new company, partner, project, or performance facts;
- retain the current approved local hero media for this variant. Replacing it requires a separately approved local hero asset and is not silently substituted with stock or third-party media;
- reorder and compose only existing approved homepage material so that hero, the existing InnoTrans announcement, wagon discovery, remaining proof material, and contact form a clear route through the page;
- preserve current InnoTrans, quality/certificate, and contact destinations as concise existing blocks; the InnoTrans block includes the separately approved exact linked position list, but no detail page, meeting workflow, map, exhibits, partners, downloads, or certificate thumbnails;
- do not add a new process, PRO, or TAS narrative until client source material and factual confirmation are supplied in any usable form; the implementation team prepares the English and localized copy;
- preserve no-JavaScript use, localized route behaviour, reduced-motion behaviour, and the required 320/390/768/1024/1440 plus phone-landscape evidence.

**Evidence:** the package reorders only existing homepage sections so the hero is immediately followed by the existing InnoTrans position list, then wagon discovery, product information, model-selection guidance, quality/certification, and contact. The existing local hero image, copy, routes, five-family data, server rendering, no-JavaScript behavior, localized routes, and reduced-motion behavior remain intact. The homepage-only header logo uses the same immutable asset with a caller-owned prominent scale. Focused browser evidence passes 30/30 across all required widths; production build, route integration, content/brand audit, deployment readiness, formatting, Astro diagnostics, and unit tests pass. The broad quality aggregate remains non-green on the sandbox listener restriction.

### Wagon-family discovery follow-on — implemented after Variant A

**Status:** `IMPLEMENTED` — the owner-directed correction removes the unwanted pause behavior while retaining the Variant A composition boundary.

**Desktop recommendation:** provide a continuous guided rail preview. On a desktop-sized, fine-pointer viewport, after the switchyard becomes substantially visible, it advances the selected state through all five families at a five-second interval while eligible. The visible five-stop rail, family names, red selected state, image, copy, and direct link make the catalogue breadth and clickability apparent without requiring a visitor to discover the control alone.

- begin automatically when eligible and continuously loop through all five families; never run on compact/mobile layouts or when `prefers-reduced-motion` or data-saving preference is active;
- keep the loop running through hover, focus, direct clicks, and keyboard selection; pause only while the browser tab is hidden, then resume when it is visible and eligible;
- preserve direct clicks and keyboard selection: the selected family becomes the current position and the loop continues with its next family;
- provide no preview controls; do not move keyboard focus, scroll the page, or announce every automatic family change through a live region;
- retain server-rendered direct links, no-JavaScript access, the existing manual click/Arrow Left/Right/Home/End behaviour, and independent per-instance state;
- treat the automatic selection as a non-essential visual preview only: no analytics, cookies, saved preference, availability, pricing, or configurator state.

**Mobile direction:** replace the current vertical five-row selector only in this follow-on with a native horizontally scrollable family rail. It uses CSS `overflow-x: auto` and scroll snapping, not an opaque JavaScript slider: a partial next card/edge is visible, each card retains its family name and selected state, swipe is optional rather than required, and direct links remain in server HTML. It does not auto-scroll, auto-select, or move focus. Keyboard users can still use the existing tab keys and arrow/Home/End selection once enhanced; no-JavaScript users retain ordinary linked access.

**Acceptance evidence:** 320/390 compact carousel visibility, touch target size, snap containment, keyboard and no-JavaScript access; 768 static non-autoplay behaviour; 1024/1440 desktop guided-preview looping through hover/focus/manual selection; reduced-motion and data-saving suppression; no focus or scroll movement; axe; two independent instances; and refreshed five-family visual references. Focused switchyard evidence passes 40/40 with eight expected desktop-only skips, confirming no preview buttons and uninterrupted fifth-to-first cycling. Affected homepage integration passes 30/30 across 320/390/768/1024/1440/phone-landscape. The directly inspected localhost preview has no buttons and advanced from `open-box` to `tank` before and after a manual selection. The unprivileged full-quality browser phase cannot bind its preview listener at `127.0.0.1:4322` (`listen EPERM`) and is not presented as a pass.

### Certificate presentation follow-on — approved, scheduled after H-004

**Status:** `READY_TO_OPEN_AFTER_H-004` under the existing `E-003 EvidenceList` identity.

**Source and asset policy:** retrieve each current certificate PDF from its existing official document link, capture the source URL, retrieval date, filename, and SHA-256 digest, and retain the local PDF as the visitor-facing document only after its metadata matches the existing certificate record. The ISO 9001:2015 certificate record must also expose the supporting IQNET attestation at `https://www.transant.com/en/content/download/66671/file/IQNET.PDF` as a confirmation/evidence link, not as a third certificate or separate certification card. The source document identifies TransANT GmbH, Quality Austria, registration `AT-32942/0`, and validity through 2028-03-17, and explicitly states that it is linked to the IQNET member's original certificate and is not standalone. Generate a local, optimized preview image from the first PDF page for the certificate record; the attestation remains a supporting document associated with ISO 9001. A future certificate refresh replaces the certificate PDF and its preview together, while the supporting-link provenance is refreshed separately when needed.

**Interaction:** each certification record becomes a bounded flip card on wide fine-pointer screens. Hovering it may reveal the preview face with a short 3D flip; the front and preview face each retain an ordinary visible action to open the full local PDF. Keyboard and touch visitors receive an explicit preview toggle plus the same PDF link, so hover is never the only way to inspect the image. With reduced motion, use an immediate non-3D face swap; without JavaScript, show the certificate metadata and a direct local-PDF link, with the preview treated as optional enhancement.

**Acceptance evidence:** source/download provenance and digest checks; local-PDF and local-preview existence; correct first-page preview association; focus, keyboard toggle, touch target size, reduced-motion fallback, no-JavaScript PDF access, 320/390/768/1024/1440/phone-landscape containment, axe, and refreshed Quality/certificate visual references. No client certificate file, thumbnail, or separate publication-rights request is pending for this stage.

### Variant B — documented, deferred pending inputs

**Status:** `BLOCKED` — not an implementation authorization.

#### Authorized bounded company slice — 2026-09-08

**Status:** `IMPLEMENTED` under A-002. The owner supplied a publishable company narrative and local image set and explicitly authorized a smaller homepage correction without opening the full Variant B expansion.

- replace only the homepage hero media with `client-remarks/imgs/лого вырезано на вагоне.jpg`, using an optimized production-local derivative and reviewed compact/desktop crops;
- present a concise source-backed company introduction in the hero, retain the wagon-catalogue action, and add a localized Company-page action;
- replace the current catalogue-selection wording in the existing `ModularPlatformSection` with a four-stage summary of the supplied transport-task, concept/configuration, engineering/approval, and coordinated production/delivery/support process;
- synchronize the authored primary English copy to DE, UK, PL, and CS without changing source-owned names, dates, standards, or organization relationships;
- do not expand the Company page, PRO/TAS/InnoTrans narratives, certificate UI, or the remaining client image set in this slice.

The remaining Variant B homepage expansion remains blocked for any separately requested TAS or InnoTrans material. The Company-page source is now sufficient for the bounded A-005 Company expansion recorded below.

#### Authorized Company-page source expansion — 2026-09-08

**Status:** `IMPLEMENTED` under A-005. The owner explicitly authorized the full Company-page update from `client-remarks/company-information-2026-09-08.txt` and the supplied local image bundle.

- replace the former catalogue-only Company narrative with source-backed coverage of TransAnt’s role, transport-task analysis, engineering and commercial disciplines, quality controls, TAS Group coordination, PRO platform development, and UNO range;
- use the supplied wagon lettering, coupling, engineering-team, PRO platform, and UNO intermodal photography only beside the supporting narrative sections;
- author the complete visitor-facing content in EN, DE, UK, PL, and CS, keeping source-owned organization names, dates, standards, and product names intact;
- preserve Quality as the certificate detail destination, retain the legal company facts, and do not publish staffing, future-holding, independent-manufacturer, or invented partner-capability claims.

**Evidence:** the expanded English Company route passes its component, keyboard, responsive, and axe checks 24/24; six refreshed Company visual references pass at 320/390/768/1024/1440/844×390 and 320/1440 were inspected. DE/UK/PL/CS production-route checks pass 54/54 across the same profiles. Formatting, lint, Astro diagnostics, 91 unit tests, production/component-lab builds, foundation tests, and the extended content/brand audit pass.

#### Authorized PRO-platform page promotion — 2026-09-08

**Status:** `IMPLEMENTED` under A-005. The owner directed the canonical `/engineering-services/` destination to become a PRO-led page while retaining the canonical route and all legacy `/technology/` redirects.

- lead with the supplied implemented lightweight 60-foot PRO-family platform projects, their special structural solutions, and high-strength steel;
- explain the transport-task inputs and engineering objectives as project-evaluation considerations, not measured or guaranteed PRO outcomes;
- use the supplied PRO, engineering-team, and wagon-coupling imagery, retain a clear Contact action and a link to the UNO wagon range;
- author matching EN/DE/UK/PL/CS copy and update the header, footer, homepage, Projects, and Company links to call the destination `PRO platform projects` in each locale;
- do not publish customer names, performance figures, technical values, approvals, or manufacturing claims that are not in the supplied company information.

**Evidence:** targeted formatting and lint, Astro diagnostics (0 errors/warnings/hints), production and component-lab builds, route integration, and the content/brand audit pass. English editorial browser coverage passes 48/48 across 320/390/768/1024/1440/844×390, covering no-JavaScript keyboard navigation, responsive containment, axe, and visual output; direct 320/1440 review passed. DE/UK/PL/CS production-route coverage passes 54/54 across the same profiles, and homepage integration passes 30/30 after the localized promotion links changed.

#### Authorized PRO INTERMODAL 60 ft technical expansion — 2026-09-08

**Status:** `IMPLEMENTED` under A-005. The owner supplied a publishable Russian brief and product-sheet screenshots for the Sgns platform and explicitly authorized the platform page and existing homepage PRO section to use those facts. The referenced Google Drive PDF `про 60 сгнс.pdf` was not discoverable in the connected account, so it is not claimed as inspected; the persisted source note records the approved text and screenshot-supported values.

- replace the broad PRO overview with the complete PRO INTERMODAL 60 ft narrative, including the conditional economic case, removable ballast, container compatibility, specialised-equipment use, and three-platform operating record;
- publish the exact Sgns technical characteristics and the A–D payload table, preserving all units, distinctions between base/intermodal/ballasted mass, the A-/L-buffer lengths, and the stated operating caveats;
- update the homepage PRO block with the approximately 16 t tare, up-to-4 t conditional payload potential, and up-to-73.5 t class-D value;
- provide matching EN/DE/UK/PL/CS content, including localized visible and accessible load-table labels, while retaining the canonical and legacy route contracts;
- keep the source qualification visible in the wording: the additional payload is conditional and PRO is not presented as a universal solution.

**Evidence:** MediaStory and LoadLimitTable contracts pass 4/4; Astro diagnostics pass with 0 errors/warnings/hints; the production build produces 125 pages; content/brand and route-integration audits pass. Focused English component, responsive, keyboard, and axe evidence passes 48/48 at all six required viewport profiles. Localized production-route checks pass 18/18 at 320 and 1440. Refreshed and clean PRO-page/homepage visual comparisons pass 12/12, and both pages were inspected directly at 320 and 1440.

#### Homepage transport-task narrative correction — 2026-09-08

**Status:** `IMPLEMENTED` under A-002. The client confirmed that the homepage transport-task section must use the supplied source text at `client-remarks/company-information-2026-09-08.txt` lines 6–9, rather than promoting PRO projects from that section.

- retain the existing `ModularPlatformSection` rail design and its four-stage process summary;
- replace the short introduction with the source-backed no-standard-model premise, the complete transport-input list, and the configuration-or-adapted-solution outcome;
- author matching DE, UK, PL, and CS copy and remove the section-local PRO call to action, while retaining PRO navigation and the `/engineering-services/` destination elsewhere.

**Evidence:** Astro diagnostics (0 errors/warnings/hints), the 125-page production build, content/brand audit, and route integration pass. Focused homepage browser/no-JavaScript/responsive/axe/visual evidence passes 30/30 at 320/390/768/1024/1440/844×390; direct compact and wide review confirms the expanded text reflows cleanly. The component-lab locale aggregate is excluded because its locale paths fall back to English; the production-output audit verifies all five localized narratives.

#### Homepage action-destination correction — 2026-09-08

**Status:** `IMPLEMENTED` under A-002. The client clarified that the actions must serve the two distinct homepage stories: the unchanged source-backed transport-task narrative leads visitors to all wagons, while the Wagon data block introduces the PRO platform projects and sends visitors to Engineering & Services.

- retain the “From transport task to delivered wagon” text and four-stage rail, with a localized primary all-wagons action;
- use the approved PRO platform-project copy, three engineering principles, and local orbital visual in `PayloadValueSection`, with a localized primary action to `/engineering-services/`;
- provide EN/DE/UK/PL/CS labels and localized paths, retain server rendering and shared accessible action behavior, and make no additional technical claims.

**Evidence:** focused component contracts pass 5/5; Astro diagnostics have 0 errors/warnings/hints; the production build produces 125 pages; content/brand audit and route integration pass. Clean homepage/component browser evidence passes 90/90 across 320/390/768/1024/1440/844×390, including no-JavaScript navigation, responsive containment, axe, and refreshed homepage visual references. Direct 320 and 1440 review passed.

**Evidence:** the English primary copy and authored DE/UK/PL/CS equivalents are present in production output; each homepage retains a locale-correct Company action and the approved local red hero media. The extended content/brand audit, route integration, production build, 91 unit tests, and 54 shared-hero/homepage browser checks pass. Six refreshed homepage references pass at the required responsive widths and the 320/1440 outputs were inspected directly. The source photograph is byte-identical to the approved client file before Astro creates optimized production variants.

**Outcome when ready:** the full client-requested homepage expansion: replacement hero media; an approved process narrative; a PRO project teaser; TAS context; richer InnoTrans promotion; and any newly approved product/project media.

**Required ready bundle before its status changes to `READY_TO_OPEN`:**

1. One approved, locally deliverable hero asset and its desktop/mobile crop direction.
2. Source text for each new homepage block (process, PRO, TAS, and any expanded InnoTrans message) in any usable language or format, plus confirmation of its publishable facts and claims. The implementation team prepares the English primary copy.
3. No client-provided DE, UA, PL, or CZ text is required. The implementation team synchronizes those locales from the prepared English primary copy while preserving source-owned codes, standards, values, addresses, identifiers, and references.
4. For PRO: confirmed models, delivery/project facts, permissible customer anonymity wording, all technical/economic claims, approved photos/renders, and captions.
5. For TAS: approved relationship description and claims; no inferred employee count, holding structure, partner capability, or future organization statement.
6. For any expanded InnoTrans teaser: confirmed dates, exhibits, stand/partner information, and supplied visuals or logos. The canceled dedicated event page, map, meeting workflow, and partner list are not implicit Variant B scope and require a new explicit approval before reconsideration.

When that bundle is present, update this decision to `READY_TO_OPEN`, identify the exact approved files and copy revisions, then open a bounded homepage follow-on package with fresh responsive, accessibility, route, and visual evidence. Do not change the status merely because a draft or unverified source material has been received.

## Deferred facts and wording

- Final InnoTrans exhibits, partner presentation, and meeting arrangements. The four published positions are confirmed; exhibit-to-position assignments remain withheld.
- Current staff count and internal engineering headcount.
- Any future TAS RAIL Holding statement.
- Per-model DAC readiness.
- The agreed replacement for `Floor height above basis`.
- The final English and localized form of the brake-related speed label.
- Whether `Classic brake for SS-bake regime` should read `brake` or another source-approved term.
- PRO availability, photographs, customer/project disclosure, and conditional payload/economic claims.

## Evidence source

- Client review source: `client-remarks/TransAnt_New_Website_Content_and_Structure_RU.docx`, 23 rendered pages, reviewed 2026-09-07.
- Existing catalogue source: `Catalog for print.ai` and its checked local transcriptions.
- Current implementation truth: `STATUS.md`, `CHANGELOG.md`, and `docs/specifications/component-implementation-status.md`.
