# Mobile and responsive design requirements

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for implementation |
| Version | 1.0 |
| Date | 2026-09-04 |
| Applies to | All release-one components and routes |
| Desktop visual baseline | `prep/design/stitch-generations/v7/stitch_transant_b2b_website_redesign (6)/screen.png` |
| Component plan | [`v7-component-development-plan.md`](v7-component-development-plan.md) |
| Technical requirements | [`technical-requirements.md`](technical-requirements.md) |

## 1. Outcome

Deliver one adaptive TransANT website that preserves V7's hierarchy, industrial precision, blue signature section, red action language, and generous editorial rhythm on every supported viewport.

V7 is the composition reference for large screens. It is not a complete mobile design: the supplied image is a scaled view of a desktop composition, and the generated HTML contains only approximate responsive choices. Mobile layouts shall therefore be deliberately designed from the same information hierarchy rather than created by proportionally shrinking the desktop page.

Mobile completion means a visitor can understand the company, browse every family and model, read technical data, and start an enquiry using touch, keyboard, zoom, or assistive technology without missing content or depending on animation.

## 2. Binding responsive principles

1. Use one semantic document and component tree. Do not maintain separate desktop and mobile page implementations.
2. Start component CSS from the narrowest usable layout, then add space and composition when the component container can support it.
3. Preserve content priority in source order. CSS visual reordering must not create a different keyboard or screen-reader sequence.
4. Use page media queries only for true shell-level changes. Reusable components shall prefer container queries so they remain portable outside their current page.
5. Breakpoints respond to content pressure, not named devices. The ranges in this document are validation modes, not device detection rules.
6. No essential control, destination, fact, or product is available only through hover, animation, horizontal swiping, or client JavaScript.
7. Deliberate horizontal scrolling is permitted only inside a clearly labelled technical-table region. The page itself must never scroll horizontally.
8. Mobile retains the real TransANT brand asset unchanged. Do not create a compact, icon-only, redrawn, or animated mobile logo.
9. Mobile is a first-class acceptance condition for every visual component package, not deferred cleanup in `I-002`.

## 3. Layout modes and verification matrix

### 3.1 Layout modes

| Mode | Typical available width | Intended behavior |
| --- | ---: | --- |
| Compact | 320–479 px | One primary column, 16 px minimum page gutter, stacked actions and data groups |
| Wide mobile | 480–767 px | One editorial column with selective two-column facts or controls when content fits |
| Tablet | 768–1023 px | Four- or eight-column composition; avoid prematurely reproducing dense desktop arrangements |
| Compact desktop | 1024–1279 px | Full navigation and multi-column compositions with reduced gaps |
| Reference desktop | 1280 px and above | Twelve-column V7 composition, capped at the documented content width |

Component mode changes may occur at different widths based on their own container. Do not copy a single global breakpoint into every component.

### 3.2 Required evidence widths

Every layout-dependent component shall have deterministic visual evidence at:

- 320 px: minimum supported width and highest layout-pressure case;
- 390 px: representative modern phone portrait;
- 768 px: tablet portrait or narrow embedded-container behavior;
- 1024 px: tablet landscape or compact desktop;
- 1440 px: V7 reference composition.

Page integration shall additionally exercise:

- a representative 360 px Android-sized viewport;
- a 430 px wide phone;
- at least one phone landscape viewport such as 844 by 390 px;
- 200% text/browser zoom on a desktop viewport;
- 400% reflow or the equivalent 320 CSS-pixel content width, except for allowed two-dimensional technical data.

Full-page screenshots are required at the five canonical widths. Interaction checks use a realistic viewport height and must include the sticky header, open menu, focused controls, form errors, and any technical-table scroller.

## 4. Responsive foundation

### 4.1 Page frame

- Use fluid gutters with a 16 px minimum, growing toward the V7 desktop margin without sudden large jumps.
- Keep the content maximum near the approved 1440 px V7 grid; long reading text remains approximately 60–75 characters wide.
- Use logical properties (`margin-inline`, `padding-inline`, `inset-inline`) so future localization does not require rewriting layout CSS.
- Section spacing shall be fluid. Preserve V7's calm pauses, but reduce vertical spacing on compact screens so the page does not feel artificially empty.
- Do not use fixed content heights. Use `min-height` only when a documented visual state needs stability, and verify long-copy expansion.
- Account for `env(safe-area-inset-*)` on fixed or full-height navigation surfaces without adding permanent empty bands on devices that do not need them.

### 4.2 Type

- The homepage H1 shall remain visually decisive at approximately 36 px on compact screens and scale fluidly toward the approved desktop size.
- Section headings shall begin near 28 px on compact screens and scale without producing one-word orphan lines where reasonable.
- Normal body copy remains at least 16 px. Supporting text may be smaller only when contrast, spacing, and purpose remain clear.
- Form controls use at least 16 px text to prevent unwanted mobile-browser zoom.
- Technical values may use the approved monospaced face, but narrow screens must wrap label/value groups without splitting a number from its unit unnecessarily.
- Components must remain usable with a 30% copy-expansion fixture.

### 4.3 Touch, focus, and hover

- Primary touch targets shall be at least 44 by 44 CSS pixels where practical, with at least 8 px separation between adjacent compact targets.
- Hover styling may enrich desktop interaction but never reveals the only label, action, or state.
- Every touch control also works with keyboard input and exposes a visible focus indicator that is not clipped by overflow containers.
- Use pointer and hover capability queries only for optional polish. Layout and content availability must not depend on them.
- Do not place critical actions against the bottom edge where browser chrome, the virtual keyboard, or safe-area insets can obscure them.

## 5. Global shell behavior

### 5.1 Header

Compact header order:

```text
[unchanged logo]                         [menu]
```

- Keep the compact bar visually calm and materially shorter than the desktop header while preserving logo clear space.
- The desktop navigation and locale controls collapse into one labelled menu trigger before they collide with the logo or contact action.
- The enhanced mobile menu opens as a full-height panel below or over the page with a visible title and close control.
- Top-level links appear first. Grouped wagon and proof destinations may use labelled disclosures, but essential top-level destinations remain visible without opening every group.
- `Talk to an engineer` appears as a clear action inside the panel rather than squeezing into the closed 320 px header.
- Opening the panel moves focus into it; Escape and the close control return focus to the trigger. Background content is inert while the modal panel is open.
- With JavaScript unavailable, a visible ordinary navigation path remains available. The implementation may use a semantic disclosure fallback, but must not leave links permanently hidden.
- Header fixation must not cover anchors, headings, focused elements, or browser find results. Use documented scroll padding.

### 5.2 Footer

- Preserve the dark-blue V7 close and a content-first source order: company identity, product links, expertise, contact, then legal information.
- At 320–479 px, use one column or a readable two-column link grid only when labels fit without compression.
- Do not hide required footer navigation behind JavaScript-only accordions.
- Legal links wrap naturally, remain at least 44 px high where used as separate touch rows, and never cause horizontal overflow.

## 6. Homepage mobile composition

### 6.1 `HomeHero`

Compact order:

```text
eyebrow
headline
summary
primary action
secondary action
railway image and caption
```

- Use a single column until text and media can occupy two balanced columns without compressing either.
- The primary action becomes full-width only on the narrowest container; the secondary action remains clearly separate.
- Preserve the red headline emphasis, white ground, thin structural rules, and asymmetric editorial feeling.
- Use an art-directed mobile crop where the desktop railway photograph loses its subject at narrow aspect ratios.
- The image remains static, has explicit dimensions, and must not push the primary message and action out of a practical first mobile view.

### 6.2 `PayloadValueSection` and `RailwayOrbital`

- Render the proposition before the decorative object in source and visual order.
- Place the orbital in its own centered stage between the explanatory copy and principle list on compact screens.
- Cap the orbital by the component width; no arc, marker, glow, or SVG filter may create page overflow.
- Reduce the number, distance, and duration of moving markers on coarse-pointer compact layouts. The static SVG must still look intentional.
- Stack the three engineering principles as bordered rows. Do not force three narrow cards across a phone.

### 6.3 `WagonSwitchyard`

This is the signature mobile component and shall be redesigned rather than reduced.

Compact order:

```text
section introduction
five-family rail selector
active family identity and cargo fit
large contained wagon render
active family summary
family action
technical supporting labels
```

- Present all five family choices as a visible vertical rail list. Each row contains the sequence, family name, and an unmistakable selected state. At wider component widths the list may become a two-row or horizontal rail only when every option remains visible without swiping.
- Keep the selector and active result adjacent. Do not place controls over the wagon image or hide family names inside icons.
- Use a dedicated stage with a stable aspect ratio and `object-fit: contain`; no wagon may be clipped at 320, 390, or with 30% longer labels.
- Place descriptive text below the stage on compact screens instead of overlaying a translucent desktop panel on the render.
- Render the default family and all five direct links in server HTML. Progressive enhancement may provide tab-like selection, but it cannot remove catalogue access when scripting fails.
- On selection, update family identity, image, summary, and link atomically. Do not auto-scroll, auto-advance, or unexpectedly move focus.
- Mobile motion is limited to a short crossfade or small rail-axis displacement. Reduced motion changes state without choreography.

### 6.4 `ModularPlatformSection` and `RailSequence`

- Convert the desktop horizontal equation into a vertical numbered rail sequence on compact screens.
- Retain the relationship between platform, structure, validation, and delivery through a continuous line and explicit labels; do not rely on the line alone for meaning.
- Long stage descriptions expand vertically without overlapping the next marker.

### 6.5 `OperationalCaseStudy`

- Use media first only when its caption supplies necessary context; otherwise keep the case title before the image in source order.
- Replace desktop fixed/minimum image heights with an intentional mobile aspect ratio and art-directed crop.
- Stack route, evidence, and action below the summary. Do not float facts over photography.

### 6.6 `CollaborationProcess`

- Transform the four-column desktop process into one vertical ordered sequence.
- Preserve step numbers, headings, and explanations; the decorative connecting rail stays outside the accessibility tree.
- Do not implement a swipe carousel for process steps.

### 6.7 `QualityImpactSection`

- Stack quality and responsible-impact topics in the most useful reading order.
- Certification identifiers may remain monospaced, but scope and evidence links wrap beneath them rather than compressing into an unreadable inline row.
- Each evidence link has a sufficiently large touch area and an explicit file/external-link meaning.

### 6.8 `ContactCTA`

- Keep the restrained centered conclusion; reduce heading size rather than forcing awkward line breaks.
- The primary action may span the compact content width with a sensible maximum.
- Supporting links wrap into separate touch rows. No embedded multi-field form is added to the homepage.

## 7. Catalogue and product mobile composition

### 7.1 Catalogue and family pages

- Collapse alternating desktop family rows into one consistent compact pattern so scanning direction does not change from item to item.
- Recommended order is family label and title, cargo-fit summary, representative wagon, visible model links, then family action.
- All five families and ten models remain reachable through ordinary links; do not replace them with a mobile search or filter interface.
- Model lists use one column at compact widths and add columns only when the complete model name, code, decisive facts, and action fit.

### 7.2 Breadcrumbs

- Allow wrapping rather than shrinking below a readable size or silently removing the current context.
- On very deep paths, a compact visual treatment may shorten intermediate labels while the complete accessible name and structured data remain correct.
- Breadcrumbs must not become a horizontally scrolling page-level strip.

### 7.3 Product hero

Compact order:

```text
breadcrumbs
family and model identity
cargo-fit statement
primary and available secondary action
wagon render
decisive facts
```

- The wagon stage uses the same stable, unclipped containment contract as the switchyard.
- Decisive facts form a two-column grid only when labels and units fit; otherwise they become bordered full-width rows.
- Do not add a persistent bottom CTA that obscures technical content or competes with browser chrome.

### 7.4 Specifications and load-limit tables

- General product specifications become semantic labelled groups (`dl` or equivalent) with labels and values kept together.
- Preserve source order; do not remove lower-priority values simply to shorten the phone page.
- Relational load-limit data remains a real accessible table. Place it in a labelled, keyboard-focusable horizontal scroller with a visible `Scroll table horizontally` affordance when overflow exists.
- Keep row and column header associations intact. A sticky first column is optional only if it does not obscure data at 320 px or break zoom.
- Never transform a relational engineering table into unrelated cards that destroy row/column meaning.

### 7.5 Downloads and related wagons

- Download rows stack title and metadata but keep file type, language, revision, and size associated with the correct action.
- Related wagons use a single-column compact list and add columns as the container permits.
- Transparent renders keep adequate clear space and a consistent visual scale between models.

## 8. Editorial, legal, and form pages

- `PageHero` and `MediaStory` use one column on compact screens. The caller controls whether title or media appears first based on narrative meaning; alternating desktop orientation never produces alternating mobile reading order.
- Evidence lists remain normal lists, not swipe carousels. Dates, issuer, scope, status, and downloads wrap as labelled groups.
- Legal pages use a narrow reading column, visible heading hierarchy, wrapping URLs, and non-sticky local navigation on compact screens.
- The 404 page exposes direct recovery links without relying on an illustration or animation.
- The contact form is one column on compact screens. Labels remain visible, help and errors stay next to their fields, suitable input types and autocomplete values summon appropriate keyboards, and submission status is announced.
- When the virtual keyboard opens, the focused field and error message must remain reachable. Do not lock the form to viewport height.

## 9. Responsive media and performance

- `ResponsiveMedia` shall emit width-appropriate local sources and an accurate `sizes` contract. A phone must not download a desktop-width image when a reviewed smaller derivative can serve it.
- Use separate crop sources for operational photography when one crop cannot protect the railway subject on both portrait and landscape compositions.
- Product renders remain transparent or use the approved surface; never rasterize them against an accidental background merely for mobile.
- Declare intrinsic dimensions or aspect ratio for every image to prevent layout shift.
- Keep the homepage's initial mobile JavaScript limited to navigation, switchyard selection, and optional orbital lifecycle. Content sections do not hydrate only to achieve layout.
- Avoid background video, canvas, WebGL, scroll hijacking, and always-running parallax in release one.
- Run Lighthouse mobile-mode checks on the homepage, catalogue, a representative widest-data product, and contact page. Emulator evidence is not a substitute for real-device evidence when a real-device claim is made.

## 10. Motion on mobile

- Motion communicates a state change or rail/engineering relationship; it does not delay reading.
- Prefer transforms and opacity. Do not animate layout properties that cause repeated reflow.
- Compact-screen transitions should normally complete within roughly 120–240 ms; longer explanatory sequences require a written reason and an immediate final state.
- Pause continuous decorative motion when offscreen or when the document is hidden.
- `prefers-reduced-motion: reduce` removes continuous orbital movement, large wagon travel, scroll reveals, and nonessential page transitions while preserving every final state.
- Do not disable a user's scrolling, alter scroll speed, or require a precise scroll position to expose content.

## 11. Component implementation contract

Every layout-bearing component README shall document:

1. semantic source order;
2. compact, wide-mobile, tablet, and desktop compositions;
3. component-container thresholds and why they occur;
4. minimum supported width and deliberate overflow regions;
5. touch, keyboard, focus, hover, and reduced-motion behavior;
6. long-copy, missing-content, and image-fallback behavior;
7. responsive image/crop requirements;
8. exact mobile fixture routes and screenshot commands.

Do not mark a component `VERIFIED` if its desktop snapshot passes but its compact fixture is absent, unreviewed, or broken.

## 12. Mapping to the 43 work packages

No additional mobile-only component tree or parallel workstream is required. Mobile acceptance is embedded into the existing packages:

| Packages | Required mobile responsibility |
| --- | --- |
| F-001 | Establish component-lab viewports, phone emulation, screenshot projects, overflow checks, and documented responsive commands |
| F-002 | Provide long-copy, optional-content, wide-value, and widest-table fixtures from validated data |
| C-001–C-005 | Establish logo containment, action targets, fluid headings, responsive media, and vertical process behavior |
| C-006–C-007 | Implement and test mobile navigation, focus lifecycle, safe reading order, and compact footer |
| H-001–H-009 | Implement the section-specific compact compositions in section 6 |
| P-001–P-009 | Implement catalogue, product, specification, table, download, and related-product behavior in section 7 |
| E-001–E-003 and F-003 | Implement editorial, evidence, legal-supporting, and form behavior in section 8 |
| A-001–A-006 | Verify complete-page rhythm, source order, anchor offsets, route consistency, and removal of section-to-section assumptions |
| I-001 | Crawl every generated route and verify navigation remains complete at compact width |
| I-002 | Own cross-page visual review at all canonical widths plus landscape and zoom evidence |
| I-003 | Own touch, keyboard, focus, reflow, reduced-motion, table, and form accessibility evidence |
| I-004 | Own representative mobile Lighthouse, image selection, script budget, layout stability, and motion-cost evidence |
| I-005 | Verify the immutable logo and that no mobile treatment drops, abbreviates, or invents approved content |
| I-006 | Run compact and desktop preview smoke tests and record any remaining real-device limitation honestly |

## 13. Page-level acceptance matrix

Automated route checks run against every generated page at 320 px and assert no page-level horizontal overflow, missing primary landmark, duplicate ID, broken local media, or unreachable primary action.

Focused visual and interaction review shall cover at minimum:

| Representative route | Compact checks | Wider checks |
| --- | --- | --- |
| Homepage | menu, hero order, orbital containment, five-family selector, vertical sequences, final CTA | V7 composition and section rhythm at 1024/1440 |
| Catalogue | all family/model links, uniform row order, readable actions | editorial family sequence and image scale |
| One route per wagon family | category narrative and model list | multi-column model composition where supported |
| Product with widest load table | hero, facts, specification groups, keyboard table scroll, downloads | table relationships, content width, image scale |
| One additional product per data-shape variant | missing/optional values and long units | stable shared template |
| Technology or Company | mobile story order and media crop | alternating V7-style editorial composition |
| Quality/Sustainability | evidence labels, certificate links, long claims | balanced multi-column evidence layout |
| Contact | keyboard types, errors, virtual-keyboard resilience, success/failure | form measure and supporting content |
| Privacy/Imprint | reflow, headings, long links | readable line length |
| 404 | recovery paths | composition and brand consistency |

All ten product routes still receive schema, link, asset, accessibility smoke, and 320 px overflow checks even when only representative data shapes receive full visual baselines.

## 14. Mobile release gate

Mobile and responsive implementation is complete only when:

- every required component has reviewed 320 and 390 px fixtures plus its applicable wider states;
- all generated routes pass automated 320 px page-overflow and link checks;
- the homepage, catalogue, widest-data product, representative editorial page, contact, legal, and 404 routes have recorded compact visual evidence;
- navigation, switchyard, tables, downloads, and forms work with touch and keyboard and without essential hover behavior;
- content reflows at zoom without page-level two-dimensional scrolling, except inside labelled technical-table regions;
- long English and 30% copy-expansion fixtures do not overlap, clip, or conceal controls;
- responsive image selection, layout stability, reduced motion, and representative mobile performance are evidenced;
- V7 remains recognizable at 1440 px while mobile reads as a purposeful TransANT design rather than a compressed desktop screenshot.
