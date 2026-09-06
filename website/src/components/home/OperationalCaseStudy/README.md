# `OperationalCaseStudy`

Renders an evidence-led, static case-study composition. The component owns the V7-inspired editorial relationship between a title, local image, approved facts, and optional native routes. It does not read a content collection, route state, browser state, environment values, deployment adapters, or another homepage section.

## API

| Prop       | Type                                  | Required | Contract                                                                                                                                           |
| ---------- | ------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eyebrow`  | `string`                              | Yes      | Non-empty source-owned category label.                                                                                                             |
| `title`    | `string`                              | Yes      | Non-empty caller-selected heading.                                                                                                                 |
| `summary`  | `string`                              | Yes      | Non-empty evidence-led summary; never invents a quote or status.                                                                                   |
| `media`    | `ResponsiveMediaProps`                | Yes      | Local C-004 media with meaningful alternative text, `cover` fit, and an intentional aspect ratio. Caption is optional.                             |
| `facts`    | `readonly OperationalCaseStudyFact[]` | Yes      | Ordered facts with a source reference and publication status. Only `approved` facts render. An empty list intentionally leaves no evidence region. |
| `href`     | `OperationalCaseStudyLink`            | No       | Optional safe, non-placeholder project/context route rendered by the C-002 text action.                                                            |
| `download` | `OperationalCaseStudyLink`            | No       | Optional safe, non-placeholder approved document route rendered by the C-002 download action.                                                      |

## Semantics and failure behaviour

Compact server HTML orders the case title and summary, image, then evidence and actions. Each rendered fact is a definition-list item with a visible source label. The media is an ordinary C-004 figure: it never uses a remote source and its caption remains associated with the image.

The component fails before rendering for blank editorial copy; invalid C-004 media; decorative/alt-less, non-cover, or uncropped case-study media; blank fact labels, values, or source references; and empty or unsafe action destinations. Facts marked `draft` or `unverified` are accepted as source data but deliberately omitted, preserving F-002’s production-view boundary. It has no API for quotations, live operating status, route maps, KPIs without caller-supplied approved facts, or placeholder documents.

## Responsive, accessibility, and portability contract

At 320 and 390 px, the title remains before the media in source order. The caller-supplied crop reserves its intentional aspect ratio; facts and native actions follow below the summary/media sequence without floating over photography. At a 56-rem component width, the media moves into the left V7-inspired column while the story and supporting evidence remain in the right column. No fixed image height, client controller, animation, or remote asset is added. The shared `Action` maintains 44 px focusable destinations.

Fixture: `/fixtures/operational-case-study/`. Focused evidence covers zero/one/multiple fact variants, approved-source labels, exclusion of unverified entries, optional route/download omission, local alt/caption media, compact/wide source and visual composition, focus, overflow, axe, browser errors, and reviewed reduced-motion baselines at 320/390/768/1024/1440/844x390.
