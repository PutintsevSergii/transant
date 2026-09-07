# HomeHero

`HomeHero` is the server-rendered homepage opening section. It owns the V7-inspired editorial copy/media split, but not page navigation, content collection access, route state, or media processing.

## API

- `eyebrow`, `title`, and `summary` provide the source-ordered proposition. `title` is an ordered set of text segments; set `emphasis: true` only for the deliberate red treatment.
- `primaryAction` is a required `ActionLinkProps`; `secondaryLink` is an optional, separate `ActionLinkProps`.
- `media` accepts the public `ResponsiveMedia` contract except loading/priority. The hero fixes it to eager/high priority because it is the opening local railway image.

## Behaviour and accessibility

The eyebrow, `h1`, summary, actions, and image occur in that order in server HTML. The section has no client controller or animation. Its local image retains intrinsic dimensions and responsive AVIF/WebP/fallback output through `ResponsiveMedia`; authors supply meaningful alternative text and an optional caption through that contract. Its image stage uses the same global thin bordered surface and clipping treatment as `PageHero` and `ProductHero`; it does not add a route-specific stripe or media frame. At narrow component widths, content precedes a single static image and the primary route action spans the smallest container. The balanced split activates only at a 56-rem container. At every width, `page-frame` is the sole horizontal page gutter, so the proposition begins on the same left content rail as adjacent homepage sections.

## Portability

The component imports only `Action` and `ResponsiveMedia` public files. Callers own all wording, actions, image selection/crop review, and captioning. It does not read collections, URLs, global mutable state, environment values, or browser APIs.
