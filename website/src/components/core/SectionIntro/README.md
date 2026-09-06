# `SectionIntro`

Renders only the repeated eyebrow, heading, and optional introductory-copy lockup. It owns no section background, page frame, action, media, or client behavior, so it can move between editorial, catalogue, and product sections without coupling them.

## API

| Prop           | Type                         | Required | Contract                                                              |
| -------------- | ---------------------------- | -------- | --------------------------------------------------------------------- |
| `eyebrow`      | `string`                     | No       | Contextual label rendered before the heading.                         |
| `title`        | `string`                     | Yes      | Required visible heading text.                                        |
| `description`  | `string`                     | No       | Supporting copy rendered after the heading.                           |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | Yes      | Emits the corresponding semantic heading.                             |
| `align`        | `left \| center`             | Yes      | Aligns presentation without changing source order.                    |
| `theme`        | `light \| dark`              | Yes      | Changes foreground colours only; the caller owns background contrast. |
| `measure`      | `narrow \| standard \| wide` | Yes      | Caps readable text width at 32, 46, or 64 rem.                        |

## Semantics and behaviour

The source order is optional eyebrow, required heading, then optional description. `headingLevel` is intentionally explicit: the embedding section controls the document outline rather than the component guessing a rank. Missing optional fields emit no empty elements. The component has no focusable elements, events, JavaScript, animation, fixed height, or overflow region.

## Responsive and portability contract

At the 320 px minimum width, text stays in a single semantic block and uses available inline space without clipping. `narrow`, `standard`, and `wide` only cap the text measure; they do not force a breakpoint or page layout. At 390, 768, 1024, and 1440 px the same source order persists, with `center` applying only visual alignment. Long English and expanded-copy fixtures wrap within the selected measure.

There are no touch targets, hover-only states, focusable controls, media, or motion. The fixture supplies dark and light surfaces because this component controls its foregrounds only. Use the `/fixtures/section-intro/` route and its deterministic 320/390/768/1024/1440/844x390 visual baselines for review.
