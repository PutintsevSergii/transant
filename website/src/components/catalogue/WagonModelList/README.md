# WagonModelList

`WagonModelList` is a static, caller-owned family-model browse component. It renders one or more direct product destinations as a semantic unordered list whose items each contain an article, source-preserved model code, local responsive wagon media or an explicit caller-owned fallback, a caller-labelled source-derived detail list, provenance, and a native `Action` link.

## API

- `family`: required context with a stable identity and source reference. Family name and description belong to the route’s PageHero, so this component does not repeat them.
- `models`: one or more unique model records with a unique identity and destination, source-preserved code, editorial copy, a detail label and one or more source-derived details, direct `/wagons/…` product path (optionally preceded by a two-letter locale segment), link label, and source reference. Codes may repeat when the approved source uses the same classification for distinct products.
- Every model supplies exactly one presentation state: reviewed local `ResponsiveMedia` with meaningful alt text, `contain` fit, and an intentional aspect ratio; or a visible `mediaFallback.label` supplied by the caller.

## Boundaries

- The component reads no route, content collection, environment, browser, or global state. An adapter/page owns the family PageHero and resolving its local image imports.
- It composes only C-004 `ResponsiveMedia` and C-002 `Action`; it adds no search, filtering, comparison, configurator, client controller, or product-page assembly.
- Compact source order remains heading, then model code/title/summary/details, media-or-fallback, provenance, and direct action. A component-container query adds three equal model columns from 56rem, where full model cards fit rather than forcing a compact grid. Wagon renders use a shorter visual stage so the model context remains primary.
- The fallback is intentionally textual rather than an invented wagon image or technical claim. It communicates only the caller-provided absence state.

## Accessibility and failure behaviour

- The route’s PageHero supplies the family `h1`; each model heading is an `h2` within a list/article structure. This avoids repeating the family identity before the models. Model codes and provenance remain visible text.
- Product destinations use the shared native 44px C-002 link semantics; no destination requires JavaScript or hover.
- Invalid paths, duplicate identities/destinations, missing source/copy, incompatible media metadata, and missing/ambiguous media presentation fail before rendering. A repeated source-preserved code alone is valid when the model identity and direct destination distinguish the records.

## Evidence

The component-lab fixture covers one-model and multi-model family records, source-preserved codes, source-listed detail content, local processed images, explicit fallback, direct links, keyboard order, compact one-column and wide three-column composition, long copy, no overflow, axe, browser errors, and canonical visual baselines.
