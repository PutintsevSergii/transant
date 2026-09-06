# `ContactCTA`

## Purpose

Renders a calm, centred conclusion that takes a user to one caller-owned inquiry route. It can also expose related contact paths and carry caller-provided product or family context into the primary URL.

## Visual source and non-copying boundary

The component interprets V7’s centred final inquiry area using TransANT tokens and normal server HTML. It does not copy generated V7 code, provide a form, or make production contact, availability, response-time, or customer-service claims.

## Public interface

`ContactCTAProps` has required `title`, `summary`, and primary `action`; optional `supportingLinks`, `context`, and caller-owned `labels` are deliberate presentation inputs. `ContactCTAAction` has a required safe `href` and non-empty `label`, with an optional external-link flag. Every instance uses the same light-blue surface; callers vary content, not the component's visual foundation.

## Props

- `title` and `summary` render through C-003 `SectionIntro` as the section’s h2.
- `action` renders through C-002 as the single dominant primary action.
- `supportingLinks` renders zero or more C-002 outlined links inside a labelled navigation landmark; omitted or empty means no secondary output. ContactCTA gives these links a transparent red-outline treatment, and a single supporting link is centred at the primary action's width.
- `context` is rendered as an explicit inquiry-context note and is URL-encoded as the `context` query value on the primary action only.
- `labels` supplies localized context and supporting-navigation labels without making the component depend on a locale or browser state.

## Slots

None.

## Events

None. The component has no client controller.

## Tokens and CSS contract

Uses existing steel, ink, red, divider, spacing, typography, and focus tokens. The root owns a centred, container-aware layout and always uses the approved very light-blue `--color-steel` surface.

## Asset requirements

None.

## Variants and states

With no `context`, the primary destination remains unmodified. With no supporting links, no empty navigation or action is rendered. Unsafe/blank/placeholder destinations, labels, title, summary, or supplied context fail before render. All callers share the same light-blue surface.

## Responsive behaviour

At compact widths, the primary action and a single supporting action span the content width up to the same sensible maximum. Multiple supporting links remain independent full-width touch rows and can form an available-space grid at a 42-rem component width. The conclusion uses a compact-to-wide 3–8 rem vertical rhythm rather than a viewport-sized empty field, while the shared `page-frame` keeps text inside the responsive gutter. Long title, summary, context, and labels wrap instead of overflowing.

## Accessibility behaviour

The title precedes the primary native link, then optional related links in source and keyboard order. C-002 preserves 44 px action targets, visible focus, reduced-motion safety, and safe external-link disclosure. Context is visible text, not hidden URL-only state.

## Motion and reduced-motion behaviour

None beyond C-002’s cosmetic hover transition, which is disabled by the shared reduced-motion contract.

## Content and claim rules

All copy, destinations, and context are caller-owned. This component does not infer recipient details, product suitability, availability, outcomes, SLAs, tracking, or form-provider behaviour. The `context` query value is a routing handoff, not durable storage or form submission.

## Minimal standalone example

```astro
<ContactCTA
  title="Discuss a wagon requirement"
  summary="Choose a contact path appropriate to the project."
  action={{ href: "/contact/", label: "Contact TransANT" }}
  context="Intermodal wagon"
/>
```

## Test commands and covered cases

Run `pnpm vitest run tests/unit/contact-cta-contract.test.ts` and `pnpm exec playwright test tests/browser/contact-cta.spec.ts`. Coverage includes context/no-context URL composition, blank and unsafe input rejection, optional supporting links, semantic and keyboard order, compact/wide layouts, long content, axe, browser errors, overflow, and visual baselines at the canonical widths.

## Portability instructions

Copy this directory with C-002 `Action`, C-003 `SectionIntro`, and the shared token layer. Pass all copy and destinations as serializable props; do not couple it to a router, content collection, environment variable, or form provider.

## Known limitations

It does not submit a form, validate delivery, retain context outside the URL, or establish production contact endpoints. Those concerns belong to the later page/form and deployment packages.
