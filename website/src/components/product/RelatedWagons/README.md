# RelatedWagons

`RelatedWagons` is a static product-detail list for caller-owned, explicitly approved product relationships. It has no route, content-collection, browser, deployment, analytics, or client-controller dependency.

## Public API

- `currentProductId` is required and rejects an entry with the same identity.
- `title` and `headingLevel` let the page own its document outline.
- `related?` accepts source-ordered `RelatedWagonEntry` records. Every record carries a relationship source, direct `/wagons/{family}/{product}/` route (optionally preceded by a two-letter locale segment), visible product identity/copy/action, and explicit publication status. Only `approved` records render; draft and unverified records remain valid inputs but are withheld without mutation.
- Optional `media` is a local C-004 `ResponsiveMedia` contract. When supplied, it requires meaningful alternative text, `contain` fit, and a reserved aspect ratio. The component never invents a render when media is absent.

Validation rejects empty identity/copy/source/action fields, placeholder/external/query/fragment destinations, duplicate identities or destinations, self-reference, and unsuitable media before render.

## Semantics and responsive behaviour

- Server HTML is a section with a caller-selected heading, an unordered list of related-product articles, source-labelled relationship provenance, and native C-002 direct links. No JavaScript is required.
- Compact source order is heading, optional transparent render, family/code identity, title, relationship summary, source, and action. The compact list is one column at 320 and 390 px.
- A `54rem` component-container threshold creates a contained two-column list when complete card copy and transparent renders have readable measure; card internals remain source ordered at tablet and desktop widths.
- There is no deliberate horizontal overflow region. Long copy wraps, touch targets and visible focus come from C-002, and the static component has no motion or reduced-motion variant.
- With no approved relation, an honest visible empty state replaces the list. Optional media simply remains absent rather than being replaced by invented technical imagery.

## Fixture and verification

- Fixture: `/fixtures/related-wagons/`
- Focused unit: `pnpm vitest run tests/unit/related-wagons-contract.test.ts`
- Focused browser: `pnpm playwright test tests/browser/related-wagons.spec.ts`
- Visual refresh: `pnpm playwright test tests/browser/related-wagons.spec.ts --grep @visual --update-snapshots`

The fixture covers explicit approved/withheld relations, zero/many lists, local transparent renders, source order, direct links, keyboard focus, compact/wide layout, overflow, axe, browser errors, and reviewed 320/390/768/1024/1440 plus 844×390 visual evidence.
