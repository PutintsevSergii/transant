# `ModularPlatformSection`

Composes a caller-owned `SectionIntro`, a server-rendered `RailSequence`, and an optional native `Action` link into the modular platform explanation. It owns the steel-blue equation surface and the relationship between the introduction and sequence, but it does not read content collections, route state, browser state, environment values, or another homepage section.

## API

| Prop            | Type                           | Required | Contract                                                                                        |
| --------------- | ------------------------------ | -------- | ----------------------------------------------------------------------------------------------- |
| `intro`         | `SectionIntroProps`            | Yes      | Caller selects the heading rank, copy, alignment, and light foreground treatment.               |
| `stages`        | `readonly RailSequenceItem[]`  | Yes      | Ordered two-to-six-stage explanation. The standard platform equation uses four explicit stages. |
| `sequenceLabel` | `string`                       | No       | Caller-owned localized accessible label for the ordered stage sequence.                         |
| `technicalLink` | `ModularPlatformTechnicalLink` | No       | Optional safe native `Action` route; absent produces no empty action.                           |

`technicalLink` has a non-empty `label`, a safe non-placeholder HTTP(S) reference, and optional `external` behaviour. It is rendered as the existing text-variant `Action`, so external destinations retain the shared new-tab safety and accessible indication contract.

## Semantics and failure behaviour

The source order is introduction, optional technical route, then an ordered platform-stage list. Stage numbers, titles, and descriptions remain explicit in server HTML; the continuous rail is decorative CSS provided by `RailSequence`. The component fails before rendering for an empty introduction title, fewer than two or more than six stages, blank or duplicate stage numbers, blank stage content, or a malformed technical route.

## Responsive, accessibility, and portability contract

At 320 and 390 px, the sequence is the `RailSequence` vertical numbered rail: long descriptions grow naturally and the next marker remains below its content. Once the component and nested sequence have enough inline space, the caller-independent four-column equation uses a continuous pale rail, blue middle markers, red endpoint markers, and decorative `+`/`=` operators without changing source order or list semantics. The wide layout reserves a shared stage-label row, so every title begins on the same top line despite the different operator treatments. Hovering a wide stage, or keyboard-focusing a linked stage, turns its matching dot red and applies the restrained selector-style radar pulse; the final dot is red at rest. Reduced motion retains the red state without animation. The optional action keeps the shared 44 px target and focus treatment. This component has no client controller, fixed-height region, remote media, or page-route dependency.

Fixture: `/fixtures/modular-platform-section/`. Focused evidence covers four-stage and alternate-count render paths, optional-link presence/absence and keyboard focus, source order, long copy, compact stacking, wide equation composition, overflow, axe, browser errors, and deterministic reduced-motion visual baselines at 320/390/768/1024/1440/844x390.
