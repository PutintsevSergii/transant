# `MediaStory`

`MediaStory` is a static, caller-owned editorial text/media block. It composes only C-003 `SectionIntro`, optional C-004 `ResponsiveMedia`, and optional C-002 `Action`; it does not assemble an editorial page or read routes, content collections, browser state, environment values, or deployment state.

## Public API and behaviour

- Required: `title`, `headingLevel`, and `theme` (`light` or `dark`).
- Optional `spacing`: `standard` preserves the default section rhythm; `generous-top` adds caller-selected top breathing room without changing source order or the bottom transition.
- Optional `headingSize`: `standard` preserves the default `SectionIntro` scale; `compact` gives a dense title a calmer visual weight without changing its semantic heading rank.
- Optional copy: non-blank `eyebrow`, `description`, source-ordered additional `paragraphs`, and factual `items`. Paragraphs and list items stay server-rendered and are never merged or inferred by the component.
- Optional `media`: meaningful local C-004 media with an intentional aspect ratio. Media keeps C-004's lazy default because it is not a page-introduction asset; its plain-text or slot caption remains associated with its image in normal reading flow below the crop.
- Optional `mediaPosition`: `before` or `after`. It controls server HTML order and never changes at a responsive breakpoint.
- Optional `action`: a non-placeholder relative or HTTP(S) link with visible label; C-002 supplies native focus, 44 px target, and safe external-link semantics.

At 320 and 390 px, the section is one column in the exact caller-selected media/content order. At a 58-rem component boundary, media variants form a two-column editorial composition without reordering, with a deliberate responsive gutter between image and text. Text-only variants leave no empty media stage and retain the component's full top and bottom vertical inset. The action is full-width below 30 rem and intrinsic above it. The component has no client controller, motion, events, source inference, page assembly, or deliberate overflow region.

When an illustrated, standard-spacing `MediaStory` enters its wide two-column composition, its image remains flush to the section's top and bottom whenever it is the taller column. The caller-selected `generous-top` option retains its spacing intent. Image-free stories deliberately retain their full component inset on both sides of the content, so their text never sits against the preceding or following section boundary. No section uses vertical margins for spacing.

## Failure, accessibility, and portability

The component fails before render for blank copy, invalid heading levels, ambiguous/decorative/alt-less media, missing aspect ratios, and blank or unsafe action destinations. Essential content, image captions, and native actions remain server-rendered without JavaScript. Long copy wraps, images reserve caller-declared space, and the dark surface delegates matching foreground contrast to C-003.

Fixture: `/fixtures/media-story/`. Focused evidence covers both orientations, optional caption/action/media states, local lazy image output, compact source order, wide split composition, native focus, overflow, axe, browser errors, and reviewed reduced-motion visual baselines at 320, 390, 768, 1024, 1440, and 844×390 CSS pixels.
