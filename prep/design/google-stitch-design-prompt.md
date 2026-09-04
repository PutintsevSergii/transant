# Google Stitch prompt pack for the TransANT website

## Purpose

This document translates the approved TransANT research, site architecture, technical requirements, and brand rules into a workflow optimized for Google Stitch.

> **Recommended working input:** use the [lean Stitch bundle](stitch/upload-lite/START-HERE.md). It reduces the initial context to one concise brief, the design system, the exact logo, and three optimized images, then adds catalogue assets only when needed. The full bundle is retained as a reference archive.

Google describes the current Stitch experience as an AI-native infinite canvas that can use natural-language, image, text, code, and design-file context; reason across a project; explore variants; create connected interactive prototypes; and import or export design systems through `DESIGN.md`. The workflow below deliberately uses those capabilities rather than asking for an entire website in one undifferentiated generation.

Official Stitch references:

- [Google: Introducing vibe design with Stitch](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/)
- [Google: Real-time design and steering in Stitch](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/)
- [Google Developers: Introducing Stitch](https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/)

## 1. Recommended Stitch workflow

### Step 1 — Create the project context

Create a new Stitch project named:

```text
TransANT — Engineered Movement Website
```

Use the prepared flat bundle in `docs/specifications/stitch/upload/`. Add these files to the canvas as context where Stitch supports file, text, or code inputs:

1. `DESIGN.md`
2. `SITE-STRUCTURE-AND-UX-STRATEGY.md`
3. `TECHNICAL-REQUIREMENTS.md`
4. `PUBLIC-COMPANY-RESEARCH.md`
5. `CATALOG.json`

`CONTENT-MODEL.md`, `VISUAL-STYLE-GUIDE.md`, and `PROTOTYPE-USAGE-RULES.md` are included in the same folder as supporting context. `STITCH-PROMPT.md` is the working copy of this prompt pack.

Do not add the competitor prototype as a visual reference. It may only be consulted outside Stitch as a source container for client-approved text, specifications, tables, and wagon images. Supplying it to a visual generator creates unnecessary imitation risk.

### Step 2 — Add image context

Upload `TRANSANT-LOGO.png`. It is the exact 520 x 114 PNG embedded as the header logo in the client-supplied source prototype and was decoded without transformation. Treat it as immutable. Replace it only if the client supplies a higher-resolution approved master; never ask Stitch to reconstruct it.

Upload a compact, purposeful image set rather than all assets at once:

```text
uno-intermodal-60ft-sgns-wagon-render.png
uno-flat-60ft-rens-wagon-render.png
uno-timber-60ft-rnoos-wagon-render.png
uno-multibox-33ft-eamnos-wagon-render.png
uno-tank-88m3-zacns-wagon-render.png
transant-wagon-fleet.png
intermodal-wagon-bogie-closeup.jpg
freight-train-in-operation.png
tank-wagon-red-reflection-art.png
```

Tell Stitch which images are transparent product renders, which are operational evidence, and which are campaign mood references. Do not let the red reflection artwork determine every page.

### Step 3 — Generate a small foundation first

Use the master prompt below to create:

- one visual-direction board;
- one design-system/component board;
- homepage desktop and mobile;
- wagon catalogue desktop and mobile;
- one product detail page desktop and mobile.

Do not generate every route in the first pass. Select and stabilize one direction, then use the focused prompts to extend it.

### Step 4 — Diverge, then converge

Ask Stitch for three clearly different visual treatments that all obey `DESIGN.md`:

1. **Precision editorial** — strongest typography and technical-document clarity.
2. **Product theatre** — strongest wagon imagery and controlled cinematic movement.
3. **Modular engineering** — strongest platform/body explanation and systematic grid.

Do not accept three cosmetic recolors. Require meaningfully different composition, hierarchy, and image behavior.

Choose one direction or explicitly combine named strengths, for example:

```text
Use the typography and information density of Precision editorial, the hero image treatment of Product theatre, and the platform/body explainer from Modular engineering. Rebuild one coherent direction; do not make a collage of three styles.
```

### Step 5 — Build and play the journeys

Use Stitch's connected prototype capability to wire:

```text
Home -> cargo selector -> filtered catalogue -> product -> contextual enquiry -> success
Home -> Technology -> Project evidence -> related product -> enquiry
Product -> specification group -> datasheet -> enquiry
```

Use Play after each flow is connected. Verify navigation, context preservation, states, and mobile behavior before exporting.

### Step 6 — Export only after the audits

Run the visual, usability, responsive, accessibility, and originality audit prompts in this document. Then export to Figma or development tooling. The generated design/code is a design starting point, not automatically production-ready Astro code.

## 2. Master prompt — paste into Stitch

```text
You are designing a high-fidelity responsive B2B website for TransANT, an Austrian engineering company that develops, homologates, and brings to market lightweight freight and tank wagons for the European 1,435 mm standard-gauge network.

PROJECT OBJECTIVE
Create an original, premium industrial website that helps professional buyers understand what TransANT does, find a suitable wagon for a cargo and operation, verify technical and commercial benefits, trust the company's engineering and quality capability, and begin a qualified conversation with an expert.

This is not a generic corporate brochure, SaaS landing page, or visual art experiment. It is a product-discovery and technical-confidence experience for industrial shippers, wagon owners and lessors, railway operators, procurement teams, engineers, and ESG stakeholders.

Use the attached DESIGN.md as the binding visual system. Use the attached site-structure and technical-requirements documents as the binding UX and content hierarchy. Use the attached research and catalogue data as factual context. When instructions conflict, preserve in this order:
1. immutable logo and originality boundaries;
2. verified content and approval status;
3. usability, accessibility, and responsive behavior;
4. DESIGN.md;
5. aesthetic exploration.

CORE EXPERIENCE
Build the experience around this sequence:
transport task -> suitable wagon -> measurable benefit -> technical evidence -> engineering confidence -> conversation with TransANT.

Every screen should help the visitor feel:
1. Relevance: TransANT understands my transport problem.
2. Confidence: the product logic, specifications, cases, and certificates are credible.
3. Momentum: I know what to inspect next or whom to contact.

POSITIONING
Use this approved working message hierarchy:
- Established headline: “Less weight. More freight.”
- Explanation: “Lightweight and adaptable freight wagons engineered for your cargo, route, and handling process.”
- Mechanism: optimized lightweight engineering plus standardized platforms and cargo-specific structures.
- Proof: specifications, model-level facts, attributed metrics, operating cases, certificates, and partner evidence.
- Primary action: “Talk to an engineer.”

Do not use unsupported superlatives. Preserve “up to” and all conditions around performance figures. Do not present a claim from one wagon or case as universally true. Do not invent customer names, testimonials, prices, awards, certifications, ownership percentages, delivery times, availability, or technical values.

NON-NEGOTIABLE LOGO RULE
Use only the exact uploaded TransANT logo asset. Never redraw, retype, recolor, crop, distort, rearrange, generate, decorate, mask, or animate the logo or its internal elements. Never treat typed “TRANSANT” as a replacement mark. If the exact asset is missing, use a neutral placeholder labelled CLIENT LOGO — EXACT ASSET REQUIRED. Design around the logo; do not adapt the logo to the design.

ORIGINALITY RULE
Do not copy the competitor prototype's composition, page structure, components, CSS, interactions, or responsive patterns. The product text, tables, specifications, and wagon images are client-approved source material, but the experience and visual language must be independently created.

VISUAL IDEA: ENGINEERED MOVEMENT
Create a distinctly European industrial/editorial visual language. Combine the clarity of an engineering document with the physical presence of railway equipment.

Use:
- horizontal rail axes;
- thin dimension lines and measurement ticks;
- axle markers and platform intervals;
- restrained technical annotations;
- modular grids inspired by 33–70 ft platform logic;
- large isolated wagon renders with consistent baselines;
- real operational photography as evidence;
- controlled asymmetry and generous but purposeful negative space.

The red wagon is the protagonist. Interface decoration must remain secondary. Technical line work must never imply false measurements.

DESIGN PRINCIPLES
Apply the enduring principles of useful, understandable, honest, unobtrusive, durable, and detail-conscious design. Apply established interaction principles: visible system status, familiar language, consistency, recognition rather than recall, error prevention, user control, and focused minimalism. Use progressive disclosure to present decisive product facts first and advanced specifications on request without hiding crawlable or accessibility-critical content.

Do not imitate a named designer's recognizable style. Translate these principles into an original TransANT system.

COLOR
Use the DESIGN.md palette exactly:
- graphite #0D1417 for structure, typography, and dark sections;
- brand red #DC1C3B, dark #B3162F, used sparingly for the product, primary action, and decisive metric;
- brand blue #2B538B and technical teal #1C6F9C for technical information;
- paper #FFFFFF, warm paper #FBFBFA, and steel #EAF1F8 for readable content and product panels;
- ink secondary #333E44 and muted #6A757B only where contrast remains sufficient.

Do not use decorative green to signify sustainability. Do not introduce purple AI gradients, neon, glassmorphism, or a rainbow category system. Do not fill every section with red.

TYPOGRAPHY
Use Manrope for interface, body, and editorial headings. Use IBM Plex Mono for product codes, measurements, units, and evidence labels. Use strong hierarchy, tabular numerals, two font families maximum, no thin weights, no body text below 16 px, and no imitation of the TransANT wordmark.

LAYOUT
Create desktop frames at 1440 px and mobile frames at 390 px.
Desktop: 1280 px maximum content shell, 12 columns, 24 px gutters, 64–80 px outer margins.
Mobile: 4 columns, 16 px gutters, 20 px margins.
Use an 8 px spacing system, fluid section spacing, and low-radius industrial geometry. Prefer borders, rules, alignment, and surface changes to card shadows. Keep body copy to approximately 60–75 characters per line.

GLOBAL NAVIGATION
Desktop header:
[exact logo]  Wagons  Solutions  Technology  Proof  Company  Resources  [Talk to an engineer]
Include a compact language selector. Make the active section visible by more than color. The header may overlay the hero only when contrast is guaranteed, then become a compact solid header on scroll. The logo must not morph or animate.

Create a Wagons mega menu with two simultaneous paths:
- By cargo: Containers and swap bodies; Steel and long cargo; Timber; Scrap and bulk; Liquid bulk.
- By family: Intermodal; Flat; Timber; Open / Multi; Tank.
Include “Find the right wagon” and “View all wagons.” Use one restrained render or line drawing, never a carousel.

Mobile navigation is a full-height panel with a visible close button, focus-safe hierarchy, accessible accordions for Wagons and Proof, and a persistent Talk to an engineer action. Do not require swiping to find destinations.

SCREENS TO CREATE IN THIS GENERATION

A. VISUAL DIRECTION BOARD
Show the palette, type hierarchy, spacing, grid logic, image treatments, line/diagram language, buttons, tags, table styling, and three representative content modules. Include a short rationale for every major choice. Demonstrate how the unchanged logo sits on both paper and graphite without modifying it.

B. COMPONENT BOARD
Create high-fidelity components and states:
- desktop and mobile header;
- primary, secondary, and text-link buttons with default, hover, focus-visible, pressed, disabled, and loading states;
- cargo selector with selected and unselected states;
- product family card;
- product card;
- metric with qualifier and See basis link;
- grouped specification table;
- line-class load table;
- certificate/evidence card;
- contextual enquiry CTA;
- form fields with help, error, success, and disabled states;
- download row;
- comparison selection state.

C. HOMEPAGE — DESKTOP 1440 AND MOBILE 390
Create one continuous homepage story in this exact order:

1. Hero.
Eyebrow: “Freight wagons for the European standard-gauge market.”
H1: “Less weight. More freight.”
Body: “Lightweight and adaptable freight wagons engineered for your cargo, route, and handling process.”
Primary CTA: “Explore wagons.”
Secondary CTA: “Discuss your transport task.”
Evidence line: “Engineering · Homologation · Managed production · Delivery.”
Use one dominant uploaded wagon render, a graphite field, a restrained engineering grid, and labelled dimension-line details. Preserve a useful static state before motion.

2. Cargo selector titled “What do you need to move?”
Choices: Containers and swap bodies; Steel, construction, and long cargo; Timber; Scrap and bulk; Liquid bulk.
Show suitable families after selection. Include “Not sure? Describe your transport task.”

3. Three-part value system.
“Lightweight by engineering.”
“Adaptable by architecture.”
“Specific to the operation.”
Use a connected platform/body/outcome diagram rather than three generic icon cards.

4. Supported performance.
Design metric components for “Up to 20% lighter underframe” and “Up to 4 t additional payload,” clearly retaining “up to,” context text, and See basis links. Do not animate away the qualifiers. Include a placeholder approval marker for the 33–70 ft range until confirmed current.

5. Wagon families.
Five scannable cards: Intermodal, Flat, Timber, Open / Multi, Tank. Each has an uploaded render, cargo fit, one distinct advantage, model count from supplied data, and View family link. Use a grid, not a carousel.

6. Platform story.
Create a labelled visual sequence: standardized platform + cargo-specific structure + engineering/homologation + managed production/quality = wagon matched to the transport task. The composition should be suitable for scroll choreography but fully understandable as a static screen.

7. Operating proof.
Use the approved BulkBox/Erzberg–Linz case as the lead evidence module. Show problem, solution, status, bounded result, source link, and Read project. Do not invent customer quotes.

8. Collaboration process.
Six steps: Transport task; Platform and configuration; Simulation and engineering; Homologation; Managed production and quality; Acceptance and handover. Mark any unconfirmed service boundary as requiring approval.

9. Quality and responsible impact.
Show readable certificate cards for ISO 9001:2015 and EN 15085-2 CL1 with scope, issuer, validity, and PDF actions. Beside them, show the operational/lifecycle/material sustainability evidence ladder. Do not make a logo wall.

10. Final CTA.
Heading: “Start with the cargo, not a catalogue number.”
Body: “Tell us what you transport, where it runs, and how it is handled. We will help identify a suitable wagon or the right engineering route.”
Actions: “Discuss your transport task” and “Download product information.”

D. WAGON CATALOGUE — DESKTOP 1440 AND MOBILE 390
Title: “Find the right wagon.”
Support three entry modes: I know the wagon type; I know the cargo; I need a custom solution.
Show a concise cargo/family filter, active filter summary, result count, clear all, consistent product grid, and custom-solution path. Use the supplied ten-product catalogue. Keep the complete unfiltered list visible by default. Avoid a complex marketplace sidebar.

Product cards must share the same structure but use family-relevant metrics. Include a no-results state with adjacent categories and Describe your transport task.

E. PRODUCT DETAIL — DESKTOP 1440 AND MOBILE 390
Use “UNO INTERMODAL 60ft — Sgns(s)” as the representative product.
Above the fold: breadcrumb, Intermodal label, product name/code, cargo-fit sentence, large supplied render, decisive facts, Discuss this wagon, and Download datasheet if a real approved file exists; otherwise show an internal placeholder marked file required.

Page sequence:
overview and decisive metrics -> cargo fit -> operational benefits -> configuration/features -> grouped technical specifications -> approvals/availability status -> downloads -> related evidence -> related wagons -> contextual enquiry.

Use actual supplied specification data. Explain abbreviations. Keep full data readable on mobile. The enquiry CTA must preserve the product name and code.

INTERACTIONS AND MOTION TO ANNOTATE
- Hero wagon enters along a horizontal rail axis while dimension lines resolve.
- Platform/body explainer assembles in labelled stages.
- Cargo selection provides immediate visible feedback.
- Product-family transitions preserve spatial orientation.
- Technical groups expand without moving the user's reading position unexpectedly.
- All motion is brief, purposeful, interruptible, and optional.
- Add reduced-motion notes using direct state changes or subtle fades.
- Never animate the logo or hide content pending animation.

ACCESSIBILITY AND STATES
Target WCAG 2.2 AA. Maintain semantic reading order, visible high-contrast focus, 44 x 44 px minimum targets, keyboard-operable menus and filters, explicit field labels, clear form errors, accessible tables, non-color state cues, and 200% zoom resilience. Avoid auto-advancing content.

CONTENT HONESTY
Show evidence conditions and source affordances. If any content is unavailable, create a clearly labelled internal placeholder; do not invent polished public copy. Sustainability must appear as measured engineering evidence, not green visual decoration.

DO NOT GENERATE
- generic SaaS hero compositions;
- excessive rounded cards or pills;
- glassmorphism, neon, purple/blue AI gradients, floating spheres, sparkles, or decorative dashboards;
- stock people or invented factory scenes;
- a cinematic intro, scroll hijacking, or auto-playing carousel;
- fake technical measurements or certificates;
- any modified, retyped, generated, cropped, or animated version of the TransANT logo.

OUTPUT EXPECTATION
Create a coherent design system and related screens on one organized infinite canvas. Label every frame by route, breakpoint, and state. Use reusable components and shared styles. Add concise rationale annotations beside the direction board, not over the production screens. Show desktop and mobile as intentionally recomposed layouts, not scaled copies.

Before finishing, critique your own result against these questions:
- Does a first-time visitor understand the company within five seconds?
- Can a technical buyer find a suitable wagon by cargo without knowing product codes?
- Are decisive facts visible without drowning the visitor in specifications?
- Is every bold claim visibly bounded by evidence?
- Is the primary CTA clear without overwhelming the catalogue?
- Does the design look like an original European engineering brand rather than a template?
- Is the exact logo unchanged and static?
- Does mobile preserve hierarchy, comparison, tables, and contact context?

Correct any failure before presenting the generation.
```

## 3. Direction exploration prompt

Use this after the master generation if the initial visual direction is too safe or too homogeneous:

```text
Using the same content, immutable-logo rule, DESIGN.md, and UX architecture, create three genuinely different art-direction boards without changing the information architecture:

Direction A — Precision editorial:
Swiss-informed hierarchy, strong typographic rhythm, restrained asymmetry, paper/graphite contrast, excellent technical tables, minimal but exact motion.

Direction B — Product theatre:
Large isolated wagon silhouettes, dramatic scale shifts, controlled dark-to-light sequences, strong red-product focus, operational photography as proof, cinematic but usable motion.

Direction C — Modular engineering:
Platform/body assembly logic, measurement grids, modular intervals, diagrams, annotated components, and the clearest explanation of adaptability.

All three must remain unmistakably TransANT, avoid generic SaaS styling, use the same approved tokens, preserve accessibility, and keep the exact logo unchanged and static. Do not produce palette variations of one layout. Explain the commercial strength and usability risk of each direction in three concise bullets.
```

## 4. Homepage refinement prompt

```text
Refine the selected homepage direction without changing its core design system.

Make the first viewport communicate three things in five seconds: TransANT makes freight wagons; the wagons are lightweight and adaptable; the visitor can explore wagons or discuss a transport task.

Increase the visual authority of the wagon without reducing headline readability. Make the cargo selector feel like the natural next action. Remove any section that looks like a generic three-card SaaS feature row. Replace decorative icons with a labelled platform/body/outcome explanation.

Keep metric qualifiers visible. Make the operating case and certificates feel like evidence, not endorsements. Ensure each homepage section has one primary message and one clear onward path. Preserve the exact logo without movement or transformation.

Show refined desktop 1440 and mobile 390 versions plus annotations for hero, cargo selector, platform explainer, and final CTA behavior.
```

## 5. Catalogue and comparison refinement prompt

```text
Refine the wagon catalogue for rapid B2B decision-making.

Visitors may know a cargo, a wagon family, or an exact model code. Support all three without creating a marketplace-style filter wall. Keep cargo and family choices visible, show selected filters and result count, and make Clear all obvious.

Standardize card anatomy while selecting three metrics that are meaningful for each family. Do not pretend tank capacity, loading length, loading volume, and pin configuration are directly equivalent. Add a comparison tray for up to three products, a differences-only state, and a contextual Discuss these options action.

Create desktop, mobile, selected-filter, no-results, and comparison states. All essential information and actions must remain accessible without hover. Use real catalogue data and do not invent missing values.
```

## 6. Product page refinement prompt

```text
Refine the UNO INTERMODAL 60ft Sgns(s) product page as a reusable template for all ten products.

The page must satisfy both a commercial visitor scanning for fit and an engineer validating specifications. Use progressive disclosure: product identity, cargo fit, image, and decisive facts first; full grouped data and load tables later, always present in accessible HTML structure.

Strengthen the relationship between each benefit and its supporting feature or value. Add visible definitions for technical abbreviations. Show approval and availability as model-specific structured information, never a universal badge. Keep Discuss this wagon visible at useful decision points without turning it into a sticky sales obstruction.

On mobile, redesign specification groups and tables for reading rather than shrinking desktop columns. Preserve the selected product in the enquiry CTA. Produce desktop 1440, mobile 390, expanded-specification, and unavailable-download states.
```

## 7. Technology-page prompt

```text
Create the Technology page in the selected TransANT design system.

Tell one causal engineering story:
remove unnecessary mass -> standardize the platform -> adapt the structure -> engineer for cargo/route/handling -> validate and homologate -> manage production and quality -> prepare for future change.

Use labelled diagrams and the supplied wagon imagery. Show topology optimization and high-strength steel conceptually without exposing proprietary drawings or creating false engineering geometry. Separate platform, superstructure, and full-wagon claims. Explain DAC-ready as readiness, not installed equipment.

Include a related-products path, an evidence/source area, and Talk to an engineer. Create desktop and mobile screens plus a static reduced-motion version of the platform/body sequence.
```

## 8. Contact-flow prompt

```text
Create the contextual contact experience for a visitor arriving from a product page.

Heading: “Discuss your transport task.”
Keep the selected product visible and editable. Required fields: name, company, business email, transport task/message, privacy acknowledgement. Optional progressive fields: cargo, operating region, expected fleet quantity or annual volume, loading/unloading method, timeline, phone.

Use a single-page form with progressive disclosure, persistent labels, examples that are not labels, clear required markers, concise help, and actionable inline errors. Design idle, focused, invalid, pending, success, recoverable-error, and service-unavailable states.

The success state confirms receipt but does not promise delivery or response time. It retains a readable summary and offers relevant product/download links. Make the form feel like the beginning of an engineering conversation, not a generic lead-capture funnel.
```

## 9. Prototype wiring prompt

```text
Connect the approved screens into a playable responsive prototype.

Flow 1:
Home -> choose Containers and swap bodies -> filtered Wagons catalogue -> UNO INTERMODAL 60ft Sgns(s) -> expand technical specifications -> Discuss this wagon -> submit -> success.

Flow 2:
Home -> Technology -> BulkBox project evidence -> related Open / Multi product -> Discuss this wagon.

Flow 3:
Product -> Download datasheet. If no approved file is available, show the designed unavailable state rather than a fake download.

Preserve cargo/product context throughout. Provide visible interaction feedback, cancel/close paths, browser-like back behavior, keyboard-focus annotations, and reduced-motion behavior. Do not introduce new screens or claims unless required to complete these flows.
```

## 10. Visual-quality audit prompt

```text
Act as a senior design director reviewing this TransANT canvas. Audit every screen against DESIGN.md and the selected direction.

Identify and correct:
- generic AI/SaaS patterns;
- excessive rounded cards, pills, gradients, shadows, or decorative icons;
- weak hierarchy or arbitrary whitespace;
- inconsistent wagon scale, baseline, crop, or background;
- tables that look unfinished;
- red used so often that it loses meaning;
- decorative technical marks that could be mistaken for real data;
- certificate or partner logo walls without explanatory evidence;
- unbounded marketing claims;
- any logo transformation or animation.

Increase craft through alignment, rhythm, typography, image direction, meaningful contrast, and component consistency. Do not add decoration merely to make the result feel more designed. Return the corrected frames and a concise change log.
```

## 11. Usability and accessibility audit prompt

```text
Audit the connected TransANT prototype using established usability principles: visibility of system status, match to professional users' language, user control, consistency, error prevention, recognition rather than recall, efficient expert use, focused minimalism, actionable recovery, and contextual help.

Also audit against WCAG 2.2 AA intent:
- semantic reading order;
- keyboard access and focus sequence;
- focus visibility on every background;
- text and non-text contrast;
- 44 x 44 px targets;
- 200% zoom/reflow;
- labels and instructions;
- errors and success messages;
- tables and abbreviations;
- reduced motion;
- no color-only or hover-only information.

For each problem, show the affected frame, severity, reason, and exact design correction. Apply all critical and major corrections. Do not solve accessibility by removing the distinctive visual system.
```

## 12. Responsive audit prompt

```text
Review the approved desktop and mobile screens as one responsive system.

The mobile layouts must be intentionally recomposed, not scaled-down desktop frames. Check 320, 390, 768, 1024, 1440, and 1920 px behavior conceptually. Correct unintended horizontal scrolling, clipped wagon imagery, broken tables, line-length problems, oversized headings, inaccessible menus, weak touch targets, misplaced sticky elements, and lost product/form context.

Show responsive rules for the header, mega menu, hero, cargo selector, product grid, product hero, specification groups, comparison, evidence cards, process timeline, form, and footer. Preserve information priority at every width.
```

## 13. Content-honesty audit prompt

```text
Audit every visible claim, number, certificate, project, partner reference, product status, download, and CTA against the supplied research and catalogue context.

Classify each as:
E1 current certificate or approved technical/company record;
E2 documented operating case with context;
E3 attributed partner/company claim requiring qualifier;
E4 unconfirmed, outdated, missing, or unsafe to publish.

Keep E1. Keep E2 with conditions and date. Keep E3 only with attribution and qualifiers. Replace E4 with a clearly labelled internal placeholder or remove it from the public design. Never make uncertain copy sound more authoritative through typography.
```

## 14. Figma/development handoff prompt

```text
Prepare the approved TransANT design for export and implementation.

Normalize shared styles and reusable components. Use clear names based on purpose, not appearance. Organize pages into:
00 Foundations
01 Components
02 Home
03 Wagons
04 Product
05 Expertise and proof
06 Contact
07 Responsive and states
08 Prototype

Ensure every reusable component exposes necessary variants and states. Add concise implementation annotations for responsive behavior, sticky behavior, motion intent, reduced motion, image treatment, table reflow, and contextual form data. Keep real text where approved; do not replace technical content with lorem ipsum.

Flag any visual effect that generated HTML/CSS cannot faithfully or accessibly represent. Do not treat generated code as final production Astro architecture. Preserve the exact logo asset as an external immutable asset.
```

## 15. Evaluation scorecard

Score each Stitch direction from 1 to 5 before selecting it:

| Criterion | Weight | Selection question |
| --- | ---: | --- |
| Immediate comprehension | 15% | Is TransANT's offer clear within five seconds? |
| Product discovery | 15% | Can users start with cargo, family, or model? |
| Technical credibility | 15% | Are specs, qualifiers, cases, and certificates easy to validate? |
| Original brand expression | 15% | Does it feel proprietary without altering the logo? |
| Conversion clarity | 10% | Is the next useful action obvious and contextual? |
| Mobile quality | 10% | Is mobile recomposed and fully usable? |
| Accessibility | 10% | Does distinctiveness survive inclusive requirements? |
| Implementation realism | 5% | Can Astro/CSS/GSAP reproduce it within the schedule? |
| Performance realism | 5% | Can imagery and motion remain fast? |

Reject a direction regardless of total score if it modifies the logo, copies the competitor prototype, fabricates evidence, or makes essential content dependent on animation.

## 16. Design-principle references

This prompt pack adapts, without copying a particular visual style:

- Dieter Rams's emphasis on useful, understandable, honest, unobtrusive, durable, and thorough design: [Vitsœ, Ten principles for good design](https://www.vitsoe.com/us/about/good-design).
- Nielsen Norman Group's usability heuristics, particularly system status, real-world language, consistency, error prevention, recognition, user control, and focused minimalism: [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).
- Progressive disclosure for presenting decisive product facts before advanced technical detail: [NN/g, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/).
- Purpose, agency, flexibility, simplicity, hierarchy, and craft as cross-platform design principles: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/design-principles).
- Purposeful, brief, optional motion that communicates rather than distracts: [Apple motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion).
- Perceivable contrast, reflow, and non-color-only communication: [W3C WCAG 2.2 distinguishable guidance](https://www.w3.org/WAI/WCAG22/Understanding/distinguishable).
