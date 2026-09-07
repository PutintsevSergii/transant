# Client remarks content implementation plan

## Purpose

This plan converts the client document `client-remarks/TransAnt_New_Website_Content_and_Structure_RU.docx` into controlled I-005 workstreams. Source-backed text and explicit data corrections are implemented first. Technical proposals remain review-only until individually approved; the Home/Wagons navigation and Engineering & Services route proposals were approved for implementation on 2026-09-07.

The client document is a working Russian approval version. It is authoritative for the requested positioning and for values explicitly labelled as corrections, but it also marks several facts as requiring confirmation. Those conditional facts are not published as confirmed claims.

## Current implementation slice — 2026-09-07

Implemented now:

- the client-supplied English company-role sentence on the homepage and Company page, with authored DE, UA, PL, and CZ equivalents;
- Sgns(s) length over buffers corrected from `19.830` to `19.740` for A buffers;
- the already-correct Eamnos values `6.500` and `10.240` retained and protected by regression coverage;
- Eamnos 10 m and Eanos 56 ft 16 m two-point entries changed from blank to `–`;
- the Eanos 56 ft final concentrated-load section corrected from `b-b` to `d-d`;
- unconfirmed `DAC ready` / `DAC-ready` claims removed from visitor-facing model data and protected by the content audit;
- the unrelated Eamnos timber feature block remains excluded and is protected by regression coverage.

Awaiting client source material and factual confirmation before implementation:

- the longer homepage, Company, Engineering & Services, PRO, InnoTrans, and ten-model narratives in any usable source form or language;
- confirmation that the supplied source represents publishable facts and claims. The implementation team prepares the English primary copy and synchronizes DE, UA, PL, and CZ; the client is not required to supply translations.

Approved structural slice — 2026-09-07:

- show a visible localized Home item in primary navigation on every route except that locale's homepage; the immutable logo remains an additional home link;
- render Wagons as a native, server-rendered disclosure containing the catalogue overview and the five source-owned family routes; click/touch and keyboard operate the disclosure, Escape closes it, no destination depends on hover or JavaScript, and the compact menu keeps the same disclosure in source order;
- rename the public Technology destination to Engineering & Services, with localized navigation labels;
- make `/engineering-services/` the canonical English route and use `/de/engineering-services/`, `/uk/engineering-services/`, `/pl/engineering-services/`, and `/cs/engineering-services/` for localized pages;
- permanently redirect the corresponding five legacy `/technology/` routes at the hosting boundary and emit static redirect documents for local/static-host fallback. Redirect routes are excluded from canonical route/sitemap counts.

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

| Area                           | Client proposal                                                                                                              | Current-site validation                                                                                                                           | Decision needed                                                                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header navigation              | Add a visible Home item and a Wagons dropdown                                                                                | Logo already links home; header is already sticky; Wagons is currently a direct catalogue link                                                    | **Approved 2026-09-07:** omit Home only on the homepage; use one native disclosure at all widths, expose overview plus five family links without JavaScript or hover, and preserve compact-menu focus behavior |
| Navigation labels and routes   | Rename Technology to Engineering and services                                                                                | Copy can change on the existing `/technology/` route without breaking URLs                                                                        | **Approved 2026-09-07:** canonical `/engineering-services/` plus localized equivalents; permanent hosting redirects and static fallback redirects from all five legacy `/technology/` paths                    |
| Top-level pages                | Add Projects and InnoTrans 2026 to the main menu                                                                             | Projects exists; InnoTrans currently appears as a homepage announcement only                                                                      | Approve menu density and a new InnoTrans route                                                                                                                                                                 |
| Catalogue menu                 | Add PRO as a sixth family/menu item                                                                                          | Release one is explicitly limited to five current catalogue families; PRO is described as a prior project                                         | Decide whether PRO belongs under Projects rather than Wagons                                                                                                                                                   |
| Homepage structure             | Replace the hero photo, enlarge the logo, show all families horizontally, add process/PRO/TAS sections, and reorder the page | Current homepage already shows all five families through an accessible switchyard and already includes InnoTrans, quality, and contact            | Approve a new homepage layout package and provide the chosen hero asset                                                                                                                                        |
| Horizontal mobile family cards | Use a horizontally scrolling family strip on phones                                                                          | Current mobile design uses a vertical, fully readable sequence and avoids hidden horizontal content                                               | Approve the interaction and accessibility tradeoff before changing it                                                                                                                                          |
| InnoTrans page                 | Add stands, exhibits, partners, custom site map, Google Maps route, and meeting form                                         | Dates/location and official profile link are published; exhibits, partners, stand coordinates, and meeting workflow are not confirmed             | Provide confirmed exhibit list, partners, stand coordinates/map source, and meeting recipient/provider                                                                                                          |
| Product section navigation     | Add a full sticky submenu for Overview, Cargo, Equipment, Technical data, Load limits, and Downloads                         | Product pages have a simple in-page technical-data link, but not a sticky multi-section bar                                                       | **Deferred for R1:** keep the current product-page navigation and fully visible sections                                                                                                                        |
| Product technical layout       | Convert technical data to expandable groups                                                                                  | Current sections are fully server-rendered and visible without interaction                                                                        | Approve disclosure behavior and no-JavaScript fallback                                                                                                                                                         |
| Configuration comparison       | Add Compare configurations                                                                                                   | Release one explicitly excludes comparison tools                                                                                                  | Approve a scope change, comparison data model, eligible fields, routes, and mobile behavior                                                                                                                    |
| Downloads                      | Add technical sheets or catalogue-page downloads                                                                             | Drawings already open full-size; no separate per-model download set is currently published                                                        | **Deferred for R1:** retain current full-size drawing access without a new download feature                                                                                                                     |
| Certificate presentation       | Add certificate thumbnails that open full PDFs                                                                               | Certificate numbers, issuers, scopes, and current official PDF links already exist; thumbnails/local PDFs do not                                  | **Approved 2026-09-07:** retrieve current PDFs from the existing official links, record provenance/digest, generate first-page previews, and serve verified local PDFs                                         |
| PRO project page               | Add the three delivered lightweight 60 ft platforms with photos and the conditional up-to-4 t benefit                        | No approved PRO route or local project photos exist                                                                                               | Confirm the claims, models, dates/customer anonymity, photos, and page placement                                                                                                                               |
| Homepage/product media         | Replace locomotive-led hero, use complete Timber renders, and standardize render angle/scale                                 | Current media are local; the visual replacement work needs asset-by-asset review and overlaps the paused H-002 revision                           | Approve assets and resume a separate media package                                                                                                                                                             |
| Contact workflow               | Carry model context and require privacy acknowledgement                                                                      | Model context and privacy consent already exist; delivery is a mail-client handoff                                                                | **Deferred for R1:** retain the current mail-client handoff                                                                                                                                                |
| Device/performance review      | Validate desktop, tablet, phone, forms, links, menus, downloads, and speed                                                   | Responsive/browser/accessibility matrices exist; hosted and representative-device evidence remains an external I-006 gate                         | Production indexing is approved; host using the technical requirements below, then perform hosted and representative-device verification                                                                       |

## Homepage restructuring decision — 2026-09-07

The owner has approved the achievable homepage restructuring as the next separate homepage follow-on after the active I-005 navigation-and-route slice. It is deliberately separated from the broader client proposal so that an approved structural improvement does not publish unconfirmed copy, assets, or claims.

### Variant A — approved and ready to open

**Status:** `READY_TO_OPEN_AFTER_I-005`.

**Outcome:** make the homepage's visitor journey clearer while retaining the verified catalogue entry points and every current source boundary.

- retain the existing five-family `WagonSwitchyard`, its model data, existing routes, server-rendered links, and current vertical compact composition;
- keep the approved company-role statement as the homepage proposition, with the existing published EN/DE/UA/PL/CZ versions only;
- improve the visual hierarchy of the existing hero, including the logo's prominence, without asserting new company, partner, project, or performance facts;
- retain the current approved local hero media for this variant. Replacing it requires a separately approved local hero asset and is not silently substituted with stock or third-party media;
- reorder and compose only existing approved homepage material so that hero, wagon discovery, existing proof/event material, and contact form a clear route through the page;
- preserve current InnoTrans, quality/certificate, and contact destinations as concise existing blocks; do not add an InnoTrans detail page, a meeting workflow, map, stand, exhibits, partners, downloads, or certificate thumbnails;
- do not add a new process, PRO, or TAS narrative until client source material and factual confirmation are supplied in any usable form; the implementation team prepares the English and localized copy;
- preserve no-JavaScript use, localized route behaviour, reduced-motion behaviour, and the required 320/390/768/1024/1440 plus phone-landscape evidence.

**Package boundary:** use the existing homepage assembly identity `A-002` as a user-approved follow-on, opened only after the currently active I-005 navigation-and-route slice is handed off. Its pre-edit baseline, exact implementation file set, tests, and visual references will be recorded when it opens. The existing verified A-002 evidence remains the baseline, not evidence of this new revision.

### Wagon-family discovery follow-on — approved, scheduled after Variant A

**Status:** `READY_TO_OPEN_AFTER_A-002_VARIANT_A`. This is a separate follow-on for `H-004 WagonSwitchyard`, not an unreviewed expansion of the Variant A composition package.

**Desktop recommendation:** provide a one-time guided preview rather than a perpetual carousel. On a desktop-sized, fine-pointer viewport, after the switchyard becomes substantially visible, it advances through the remaining four families at a five-second interval and then stops. The visible five-stop rail, family names, red selected state, image, copy, and direct link make the catalogue breadth and clickability apparent without requiring a visitor to discover the control alone.

- begin only once per page visit, never on compact/mobile layouts, and never when `prefers-reduced-motion` or data-saving preference is active;
- pause while the switchyard is hovered, focused, or the tab is not visible; resume only while it remains eligible;
- permanently stop the automatic preview for that page visit after a click, keyboard selection, direct family-link activation, or explicit pause;
- provide a visible pause control while the preview is active and an optional “Preview families” replay control after it stops; never move keyboard focus, scroll the page, or announce every automatic family change through a live region;
- retain server-rendered direct links, no-JavaScript access, the existing manual click/Arrow Left/Right/Home/End behaviour, and independent per-instance state;
- treat the automatic selection as a non-essential visual preview only: no analytics, cookies, saved preference, availability, pricing, or configurator state.

**Mobile direction:** replace the current vertical five-row selector only in this follow-on with a native horizontally scrollable family rail. It uses CSS `overflow-x: auto` and scroll snapping, not an opaque JavaScript slider: a partial next card/edge is visible, each card retains its family name and selected state, swipe is optional rather than required, and direct links remain in server HTML. It does not auto-scroll, auto-select, or move focus. Keyboard users can still use the existing tab keys and arrow/Home/End selection once enhanced; no-JavaScript users retain ordinary linked access.

**Acceptance evidence:** 320/390 compact carousel visibility, touch target size, snap containment, keyboard and no-JavaScript access; 768 static non-autoplay behaviour; 1024/1440 desktop guided-preview start/pause/resume/stop behaviour; reduced-motion and data-saving suppression; no focus or scroll movement; axe; two independent instances; and refreshed five-family visual references.

### Certificate presentation follow-on — approved, scheduled after H-004

**Status:** `READY_TO_OPEN_AFTER_H-004` under the existing `E-003 EvidenceList` identity.

**Source and asset policy:** retrieve each current certificate PDF from its existing official document link, capture the source URL, retrieval date, filename, and SHA-256 digest, and retain the local PDF as the visitor-facing document only after its metadata matches the existing certificate record. Generate a local, optimized preview image from the first PDF page; it is an unaltered visual preview, not a replacement for the certificate. A future certificate refresh replaces the PDF and preview together with a new provenance record.

**Interaction:** each certification record becomes a bounded flip card on wide fine-pointer screens. Hovering it may reveal the preview face with a short 3D flip; the front and preview face each retain an ordinary visible action to open the full local PDF. Keyboard and touch visitors receive an explicit preview toggle plus the same PDF link, so hover is never the only way to inspect the image. With reduced motion, use an immediate non-3D face swap; without JavaScript, show the certificate metadata and a direct local-PDF link, with the preview treated as optional enhancement.

**Acceptance evidence:** source/download provenance and digest checks; local-PDF and local-preview existence; correct first-page preview association; focus, keyboard toggle, touch target size, reduced-motion fallback, no-JavaScript PDF access, 320/390/768/1024/1440/phone-landscape containment, axe, and refreshed Quality/certificate visual references. No client certificate file, thumbnail, or separate publication-rights request is pending for this stage.

### Variant B — documented, deferred pending inputs

**Status:** `BLOCKED` — not an implementation authorization.

**Outcome when ready:** the full client-requested homepage expansion: replacement hero media; an approved process narrative; a PRO project teaser; TAS context; richer InnoTrans promotion; and any newly approved product/project media.

**Required ready bundle before its status changes to `READY_TO_OPEN`:**

1. One approved, locally deliverable hero asset and its desktop/mobile crop direction.
2. Source text for each new homepage block (process, PRO, TAS, and any expanded InnoTrans message) in any usable language or format, plus confirmation of its publishable facts and claims. The implementation team prepares the English primary copy.
3. No client-provided DE, UA, PL, or CZ text is required. The implementation team synchronizes those locales from the prepared English primary copy while preserving source-owned codes, standards, values, addresses, identifiers, and references.
4. For PRO: confirmed models, delivery/project facts, permissible customer anonymity wording, all technical/economic claims, approved photos/renders, and captions.
5. For TAS: approved relationship description and claims; no inferred employee count, holding structure, partner capability, or future organization statement.
6. For any expanded InnoTrans teaser: confirmed dates, exhibits, stand/partner information, and supplied visuals or logos. A dedicated event page, map, meeting workflow, and partner list remain separately approved work, not implicit Variant B scope.

When that bundle is present, update this decision to `READY_TO_OPEN`, identify the exact approved files and copy revisions, then open a bounded homepage follow-on package with fresh responsive, accessibility, route, and visual evidence. Do not change the status merely because a draft or unverified source material has been received.

## Deferred facts and wording

- Final InnoTrans exhibits, stand positions, partners, and meeting arrangements.
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
