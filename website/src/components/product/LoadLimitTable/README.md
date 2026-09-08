# LoadLimitTable

## 1. Purpose

`LoadLimitTable` presents the existing F-002 A–D route-class load-limit data as a caller-owned relational engineering table. It deliberately does not render general specifications, calculate payloads, or assemble a product page.

## 2. Visual source and non-copying boundary

The visual treatment uses TransANT’s approved V7 editorial spacing, blue engineering surface, restrained red navigation cue, and local tokens. It does not copy prototype markup or competitor styling.

## 3. Public interface

```ts
interface LoadLimitTableProps {
  title: string;
  headingLevel: 2 | 3;
  caption: string;
  source: SourceAttribution;
  columns: {
    routeClass: string;
    payload: string;
    payloadUnit?: string;
  };
  scrollHint?: string;
  scrollRegionLabel?: string;
  notesLabel?: string;
  rows: readonly LoadLimitRow[];
  notes?: readonly string[];
}
```

## 4. Props

`title`, `headingLevel`, `caption`, `source`, and `columns` are caller-owned. `scrollHint`, `scrollRegionLabel`, and `notesLabel` optionally localize the component-owned visible and accessible labels; existing callers retain English defaults. `rows` must contain all four `A`, `B`, `C`, and `D` route classes in F-002 source order. `payload` and the optional unit are displayed as supplied; neither is parsed, rounded, formatted, calculated, nor inferred. `notes` is optional, but when supplied contains one or more source-owned visible notes.

## 5. Slots

None.

## 6. Events

None. The browser’s native focusable overflow region provides keyboard scrolling without a client controller.

## 7. Tokens and CSS contract

Uses shared paper, dark-blue, red, divider, focus, type, and spacing tokens. Consumers may place the component in any width-constrained parent; it owns the deliberate table overflow region.

## 8. Asset requirements

None.

## 9. Variants and states

The caller selects an `h2` or `h3`, source-preserved column labels, optional unit suffix, and optional notes. Empty, reordered, partial, or blank data is rejected before render.

## 10. Responsive behaviour

Source order is heading/provenance, visible compact-scroll instruction, table caption/headers/rows, then optional notes. At component widths below 37 rem, the real table keeps a 37-rem reading width inside a labelled, keyboard-focusable horizontal scroller and shows `Scroll table horizontally`; the document itself never becomes horizontally scrollable. At 37 rem and above, the hint is hidden and the table fills its container. This supports 320 and 390 px compact states, 768/1024 tablet states, 1440 desktop, and 844×390 landscape. Long headings, captions, headers, source references, payload strings, and notes wrap; table values are never transformed into cards. The minimum supported viewport is 320 px. There is no responsive media, touch-only interaction, hover-only content, or motion.

## 11. Accessibility behaviour

The visible `caption` names the table. Header cells use `scope="col"`; route-class cells use `scope="row"`, preserving row/column associations. The compact scroller is a labelled `role="region"` with `tabindex="0"`, visible focus, and native keyboard scrolling. Notes remain a semantic labelled list after the table. Focus is never clipped.

## 12. Motion and reduced-motion behaviour

None.

## 13. Content and claim rules

The component accepts only caller-owned, source-attributed F-002 table strings. It must not determine operating conditions, compatibility, safety, availability, payload limits, units, route classes, or source approval. Product-specific wording and product-page adaptation stay outside the component.

## 14. Minimal standalone example

```astro
<LoadLimitTable
  title="Load limits"
  headingLevel={2}
  caption="Load limit by line class"
  source={{ reference: "Approved product source" }}
  columns={{
    routeClass: "Route class",
    payload: "Load limit (S)",
    payloadUnit: "t",
  }}
  rows={[
    { routeClass: "A", payload: "41.5" },
    { routeClass: "B", payload: "49.5" },
    { routeClass: "C", payload: "57.5" },
    { routeClass: "D", payload: "65.0" },
  ]}
/>
```

## 15. Test commands and covered cases

Run `pnpm test:unit -- load-limit-table-contract`, then `pnpm test:browser -- tests/browser/load-limit-table.spec.ts`. Tests cover validation, source order, captions, header scope associations, payload/unit preservation, notes, compact keyboard scrolling, print treatment, overflow, axe, browser errors, and reviewed 320/390/768/1024/1440/844×390 visual baselines.

## 16. Portability instructions

Import only `LoadLimitTable.astro` and its public type. Provide serializable explicit props; do not import a content collection, route, browser state, deployment adapter, or another page section into the component.

## 17. Known limitations

The source contract currently supports the F-002 two-column A–D route-class table shape. A future approved engineering table shape needs its own explicit content and component contract; do not flatten relational data into cards to force reuse.
