# `RailSequence`

Renders a server-first ordered sequence of two to six stages. It owns only the stage relationship and its rail styling; callers own the surrounding section, heading level, surface, and all stage content. There is no client controller or dependency on page routes, content collections, browser state, or neighbouring sections.

## API

| Prop      | Type                          | Required | Contract                                                                                            |
| --------- | ----------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `items`   | `readonly RailSequenceItem[]` | Yes      | Ordered two-to-six stage data; every stage supplies a visible number, title, and description.       |
| `theme`   | `light \| dark`               | Yes      | Changes foreground, marker, and rail treatment only; the embedding context supplies the background. |
| `columns` | `1 \| 2 \| 3 \| 4`            | Yes      | Chooses the maximum wide-container grid count. Narrow containers always use one vertical sequence.  |
| `label`   | `string`                      | No       | Visible label and accessible name for the ordered list. It must be non-empty when supplied.         |

Each `RailSequenceItem` has `number`, `title`, `description`, and optional `href`. When `href` is present, its real destination is attached to the stage title; otherwise the title remains plain text. No placeholder destination is generated.

## Semantics and failure behaviour

- The sequence is an `<ol>` of semantic `<li>` stages. Explicit stage numbers and text remain in normal source order, so the continuous rail line is never the only expression of sequence or relationship.
- The connector and marker treatment is CSS pseudo-element decoration; no rail SVG or decorative DOM node enters the accessibility tree.
- The component fails its Astro render for fewer than two or more than six items, empty required stage strings, a blank supplied label, or unsupported `theme`/`columns` values. Public types prevent those invalid values for TypeScript consumers.
- Links use native anchor semantics. With no client JavaScript, every supplied stage destination remains accessible.

## Responsive, accessibility, and motion contract

The default composition is a vertical numbered rail, including at 320 and 390 px. Long descriptions expand vertically and the connector grows with the stage, so the next marker does not overlap content. At a 48-rem component container, the caller-selected one-to-four-column composition is enabled; horizontal connectors only join stages in their own row. The component has no fixed-height slots, deliberate overflow regions, client-side interactions, or motion.

Light and dark themes use existing semantic tokens, include forced-colors system-colour fallbacks, and preserve a keyboard-visible focus treatment for optional links. Link titles wrap rather than force horizontal scroll. The fixture is reviewed at 320, 390, 768, 1024, and 1440 CSS-pixel widths, plus phone landscape.

## Evidence

Fixture: `/fixtures/rail-sequence/`. Focused Playwright checks cover two/four/six-stage rendering, ordered list and list-item semantics, optional-link names and keyboard activation, labels, light/dark themes, long-content growth, compact vertical/wide horizontal compositions, focus visibility, no page overflow, decorative-rail DOM exclusion, axe, browser errors, and deterministic visual baselines.
