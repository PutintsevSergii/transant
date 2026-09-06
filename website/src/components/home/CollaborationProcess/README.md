# `CollaborationProcess`

Renders a caller-owned, static engagement sequence from transport task through delivery support. It composes only `SectionIntro`, `RailSequence`, and the native `Action` primitive; it has no client controller, page-route, collection, browser-state, deployment, or neighbouring-section dependency.

## API

| Prop          | Type                              | Required | Contract                                                                                                |
| ------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `intro`       | `SectionIntroProps`               | Yes      | Caller selects the heading rank, copy, alignment, theme, and measure. Its title must be non-empty.      |
| `steps`       | `readonly RailSequenceItem[]`     | Yes      | Ordered four-to-six-stage explanation. Every item has a unique, visible number, title, and description. |
| `contactLink` | `CollaborationProcessContactLink` | No       | An optional safe, non-placeholder native `Action` link. Omission emits no empty action.                 |

`contactLink` accepts `href`, `label`, and optional `external`. It preserves the existing C-002 safe new-tab behaviour for approved external material.

## Semantics and failure behaviour

- The surrounding section places its caller-owned heading before its process. `RailSequence` emits the process as an ordered list with visible stage numbers, titles, and explanations; the connecting rail is CSS decoration and stays outside the accessibility tree.
- The component fails Astro rendering for an empty introduction title, fewer than four or more than six steps, incomplete or duplicate step numbers, or a blank/unsafe/placeholder contact route.
- Optional contact routes remain ordinary anchors and every process step remains present without JavaScript. No carousel, swipe gesture, pagination, live status, delivery guarantee, or production claim is created.

## Responsive, accessibility, and motion contract

Compact containers retain a title-first composition followed by one vertical numbered sequence. Long explanations grow naturally and the decorative connector never carries meaning. At the shared 48-rem `RailSequence` container breakpoint, up to four columns form the wide process; five/six-step expanded content wraps into semantic rows without clipping. The optional action keeps its native 44 px target and visible focus ring. The component introduces no animation or motion.

## Evidence

Fixture: `/fixtures/collaboration-process/`. Focused unit and Playwright checks cover standard/expanded process validation, semantic ordered output, heading and link order, optional-action omission and keyboard focus, compact/wide composition, long-copy growth, overflow, axe, browser errors, and reviewed 320, 390, 768, 1024, 1440, and phone-landscape visual baselines.
