# `WagonSwitchyard`

`WagonSwitchyard` is the homepage’s dark-blue, five-family browse section. It owns the V7 switchyard composition: a large bordered wagon stage, an adjacent editorial detail panel, a lower five-stop route selector, and a progressive keyboard tab enhancement. It does not own catalogue data, route state, search, filters, availability, pricing, configuration, maps, or telemetry.

The selector instruction, accessible name, and two supporting guidance strings
are caller-owned (`selectionLabel`, `selectionAriaLabel`, and `supportingCopy`).
They are part of the route content model rather than component-owned English,
so locale adapters can translate the whole blue section consistently.

## API

| Prop       | Type                             | Required | Contract                                                                                   |
| ---------- | -------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `id`       | `string`                         | Yes      | Stable instance-local base for tab/panel IDs.                                              |
| `heading`  | `string`                         | Yes      | Caller-owned semantic `h2` text.                                                           |
| `eyebrow`  | `string`                         | No       | Non-empty introductory label; omitted means no empty element.                              |
| `summary`  | `string`                         | No       | Non-empty source-safe introduction below the heading.                                      |
| `families` | five `WagonFamilySummary` values | Yes      | Ordered local images, source copy, unique identity/sequence, safe direct catalogue routes. |

Each family supplies `id`, `sequence`, `familyName`, `modelCode`, `headline`, `summary`, imported local `image`, `href`, `linkLabel`, and optional non-empty `technicalLabel`. The public contract rejects unsafe or placeholder links, duplicate identities, remote/zero-size image metadata, blank required copy, and counts other than five.

## Server and enhanced behaviour

All five selector links, direct catalogue routes, images, and summaries are emitted in server HTML. Without JavaScript, the default family is visible beside a readable linked rail; every family remains directly reachable through a regular anchor. The controller upgrades only its own component root to a manual, single-selection tab interface. Click, Arrow Left/Right, Home, and End select one family without auto-scroll or focus movement away from the active selector. The matching route count, identity, local wagon render, summary, direct action, and optional supporting label switch synchronously as one DOM state change.

The controller is instance-local and may dispatch a bubbling `wagon-family-change` event with `detail: { id }`; it retains no global active state. The selected stop uses a slow 2.8-second radar pulse. Selector transitions and that pulse are absent with reduced motion.

## Responsive and accessibility contract

At 320 and 390 px, the section follows the documented source order: introduction, visible vertical five-family rail, active identity/cargo fit, stable contained local wagon stage, summary, direct family action, and optional technical label. Controls never overlay the wagon render. At a 52-rem component width the rail becomes a fully visible five-column route track. At 64 rem the visual composition keeps the introduction left-aligned, places the large wagon stage on the left, the editorial detail panel on the right, and the selector below the framed result. Viewport-relative spacing and panel height keep the complete component within 1024×768 and 1440×900 while retaining the selector-first semantic and focus order. The stage remains contained with `object-fit: contain` at all widths.

The control-room chrome uses reader-facing guidance instead of internal status language: it asks visitors to choose by transport task and clarifies how cargo and loading needs map to the family pages. On the wide selector, the blue route line begins and ends at the outer stop centres, every stop is centred on its line, and sequence numbers sit below it. Twelve-pixel gutters keep the line visible between cards; only the short outgoing gutter beside the selected card turns red. It does not copy unverified homologation or operating-readiness claims from the reference.

Native anchors remain real catalogue links before enhancement. Enhanced controls receive `tablist`/`tab`/`tabpanel` relationships, roving `tabindex`, `aria-selected`, visible focus, and direct panel association. Active family labels are never hidden in icons. The controller and styles tolerate reduced motion and forced colors.

## Component-lab evidence

`/fixtures/wagon-switchyard/` supplies explicit source-derived data for all five current family categories and renders a second independent instance. Focused unit checks cover invalid count, duplicate selection keys, unsafe placeholders, invalid local-media metadata, and optional-copy behavior. Focused Playwright checks cover server and no-JS direct access, all mouse/keyboard selectors, atomic progress and panel selection state, repeated instances, compact/wide order and containment, reduced motion, axe, browser errors, and focused snapshots for every family at the canonical widths.
