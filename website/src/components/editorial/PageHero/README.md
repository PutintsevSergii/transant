# `PageHero`

`PageHero` is the static, caller-owned introduction for company, engineering and services, quality, legal-supporting, or other editorial pages. It composes only C-003 `SectionIntro`, optional C-004 `ResponsiveMedia`, and optional C-002 `Action`.

## Public API

- Required: `title`, `headingLevel`, and `theme` (`light` or `dark`).
- Optional `technicalBackground`: defaults to `true` and renders the shared technical-grid surface. Set it to `false` only for an intentional plain hero surface; callers do not recreate the grid in page CSS.
- Optional `media.preserveNaturalAspectRatio`: keeps a deliberately supplied image's own ratio instead of the shared tall hero-media minimum. Use it only when crop would remove meaningful visual content; the caller must still provide an intentional aspect ratio.
- Optional copy: non-blank `eyebrow` and `description`.
- Optional `media`: meaningful local C-004 media with an explicit aspect ratio. The component sets it to eager/high priority because it is page-introduction media.
- Optional `mediaPosition`: `before` or `after`. It controls HTML source order and therefore never changes at a responsive breakpoint.
- Optional `action`: a non-placeholder relative or HTTP(S) link with visible label; C-002 supplies native focus, 44 px target, and safe external-link semantics.
- Optional named `breadcrumbs` slot: caller-owned server HTML placed above the hero surface. It is intentionally generic and does not import or require P-001 `Breadcrumbs`; when P-001 is supplied, its own `page-frame` provides the horizontal gutter.

## Behaviour and responsive composition

Source order is optional breadcrumbs, then caller-selected media/content order. Every PageHero uses the shared technical-grid background by default, with theme-aware light/dark surfaces; only the typed `technicalBackground={false}` opt-out produces a plain surface. Every PageHero also uses the same `--space-3` (12 px) top and bottom content inset, independent of media, theme, route, locale, or viewport. Its frame vertically centres content against media and owns the responsive grid and gap. The shared global hero-media rule supplies the same thin bordered, clipped surface used by `HomeHero` and `ProductHero`; the dark variant changes only its surface colours for contrast. By default, media use the shared tall image minimum; the explicit natural-ratio option removes that minimum only when the caller needs the complete image composition. Every caller receives the same `SectionIntro` font, font size, tracking, line-height, and reading measure; pages may not restyle PageHero copy or layout. The global PageHero handoff gives its immediate following section the same 12 px top padding through the shared section-padding token; sections retain ownership of their remaining padding and never create the transition with margins. At 320 and 390 px, media and content are one column in that exact order. At a 62-rem component boundary, media variants become a two-column editorial composition without reordering. The optional action is full-width below 30 rem and intrinsic-width above it. Images reserve caller-declared space and use C-004's local responsive AVIF/WebP/fallback output.

The component has no client controller, browser/route/content-collection/environment dependency, motion, page assembly, claim inference, or global state. Missing media deliberately produces a compact text-only introduction; the slot and action are independently optional.

## Accessibility and portability

Callers choose the heading rank appropriate to the document outline. The dark surface delegates matching foreground contrast to C-003, while the breadcrumbs slot receives its own paper strip, divider, and vertical rhythm so independently styled breadcrumb components remain readable. P-001 owns its horizontal frame, preventing nested page gutters; generic slot content without P-001's `data-breadcrumbs` contract receives the same horizontal frame as a fallback. Essential copy, action, and media remain server-rendered without JavaScript. Long copy wraps; the component owns no deliberate overflow region and has no hover-only behaviour.

Dependencies: shared tokens, C-002 `Action`, C-003 `SectionIntro`, C-004 `ResponsiveMedia`, and Astro local `ImageMetadata` through the C-004 contract. It emits no events and uses no browser APIs.

## Evidence

The isolated fixture is `/fixtures/page-hero/`. Focused unit tests cover invalid copy/action/media contracts; browser tests cover image/no-image, light/dark themes, slot output, heading hierarchy, source order, native action focus, responsive composition, overflow, axe, browser errors, and visual baselines at 320, 390, 768, 1024, 1440, and 844×390 CSS pixels.
