# CargoFit

`CargoFit` is a static product-detail section for explicit, caller-owned cargo and use-case declarations. It composes C-003 `SectionIntro` with a semantic list; it does not read a product record, route, browser state, content collection, or deployment configuration.

## Public API

Import `CargoFitProps` from `CargoFit.types.ts`. Each optional `entries` value must identify `kind` as `cargo` or `use-case`, preserve its source text in `label`, include per-entry `SourceAttribution`, and explicitly carry F-002 `publicationStatus`. `approvedCargoFitEntries` displays only `approved` values without mutating input. `draft` and `unverified` values remain valid inputs but never reach the rendered list.

Optional `labels` supplies caller-owned localized cargo/application and empty-state copy; English defaults keep isolated fixtures portable.

The introduction owns its semantic heading rank through C-003. With no approved entries, the component retains that introduction and renders the explicit empty state; it does not manufacture a compatibility statement from product, family, specification, or benefit data.

## Composition and accessibility

Source order is introduction, then either a semantic unordered list or an honest empty-state note. Each visible entry retains its cargo/use-case category and source reference. The component has no client controller, action, hidden hover-only state, loading state, motion, image, or deliberate overflow region, so it remains fully usable without JavaScript.

At 320 and 390 px it is one column with a 16 px minimum page gutter and unbroken source/label grouping. At a 44-rem component width, short entries form two columns; at 72 rem, three columns are allowed. These container thresholds add density only after the entry cards have enough measure, and long source text or a 30% copy expansion wraps rather than clipping. Keyboard focus is unaffected because the component introduces no interactive controls.

## Fixture and verification

Use `/fixtures/cargo-fit/`. It covers approved, excluded unverified, one-entry, absent, and six-entry long-list states. Run:

```sh
pnpm exec playwright test tests/browser/cargo-fit.spec.ts
```

The focused suite checks source attribution, publication exclusion, semantic list/empty-state output, compact/wide composition, long-copy wrapping, 320/390/768/1024/1440 plus 844×390 overflow, axe, browser errors, and reduced-motion visual baselines.

## Limitations

`CargoFit` does not infer cargo fit, operating compatibility, commodity suitability, loading capability, route approval, safety approval, or technical values. Product assembly, specifications, load-limit tables, downloads, and related wagons remain separate packages.
