# `PayloadValueSection`

Renders the homepage engineering proposition as caller-owned editorial content, a required named visual slot, and exactly three or four supporting principles. It composes `SectionIntro` for its heading lockup but owns neither page data, media selection, routing state, nor the visual component supplied through the slot.

## API

| Prop         | Type                                     | Required | Contract                                                                          |
| ------------ | ---------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `intro`      | `SectionIntroProps`                      | Yes      | Caller selects the heading rank, wording, alignment, theme, and measure.          |
| `body`       | `string`                                 | Yes      | Non-empty explanatory copy following the introduction.                            |
| `principles` | three/four `PayloadValuePrinciple` tuple | Yes      | Each item has a non-empty title and description.                                  |
| `sourceLink` | `PayloadValueSourceLink`                 | No       | Non-empty label and safe HTTP(S), root-relative, fragment, or relative reference. |
| `visual`     | named slot                               | Yes      | A caller-provided static visual such as `RailwayOrbital` or a local image.        |

## Semantics and behaviour

The section contains the caller-selected heading from `SectionIntro`, then its body and optional directional `Action` link. The named visual follows that proposition. Supporting principles use an ordered list: visible two-digit numbers are decorative reinforcement while list position supplies the semantic sequence. Missing source attribution produces no empty element. Missing visual-slot content or invalid editorial data fails during rendering instead of emitting an incomplete value section.

The component has no client controller, animation, content-collection, route, browser-global, or deployment dependency. It deliberately does not import `RailwayOrbital`; page assembly selects that visual through the named slot.

## Responsive and accessibility contract

At 320 and 390 px, content is ordered as proposition, centered contained visual, then a single-column list of bordered principle rows. Long copy wraps without clipping. At a 56-rem component width, proposition and visual form a balanced split and three principles become equal columns. A four-principle variant remains three columns until 72 rem, then becomes four columns. Slot media, SVG, pictures, and figures are constrained to the component width to prevent decorative overflow.

The optional source link uses the shared text `Action`, including its directional icon, 44 px minimum target, and visible focus treatment. The semantic heading level always belongs to the embedding page. There is no component motion; a slotted `RailwayOrbital` keeps its own static/reduced-motion contract.

## Component-lab evidence

`/fixtures/payload-value-section/` renders an orbital-slot three-principle variant with a source link, plus a local-image four-principle variant without it. Focused unit tests validate failure behaviour. Focused Playwright checks cover slot alternatives, missing source rendering, heading hierarchy, semantic list count, source-link keyboard focus, compact and wide compositions, long copy, containment, axe, browser errors, and deterministic 320/390/768/1024/1440/844x390 baselines.
