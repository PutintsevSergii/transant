# SpecificationGroup

`SpecificationGroup` presents one caller-owned set of dense technical values as a semantic definition list. It is deliberately separate from relational engineering data: use P-007 `LoadLimitTable` for tables with row and column relationships.

## API

```ts
interface SpecificationGroupProps {
  title: string;
  headingLevel: 2 | 3;
  source: SourceAttribution;
  rows: readonly {
    label: string;
    value: string;
    unit?: string;
  }[];
}
```

The caller provides all title, provenance, and technical strings. `value` is never parsed, reformatted, calculated, or inferred. A source-supplied `unit` is optional; when it is absent, the component displays no empty unit placeholder.

## Semantics and accessibility

- Each source-ordered row is a `dt`/`dd` pair inside one `dl`, keeping labels and values associated without pretending that the data is a relational table.
- The selected `h2` or `h3` preserves caller-owned document outline.
- Source provenance is visible once for the complete group.
- Compact rows stack label then value; at a 46-rem component boundary the paired values become a two-column definition layout. Long labels, values, units, and source references wrap without a page-level horizontal strip.
- The component has no client controller, animation, loading state, action, route, content-collection, browser, environment, or deployment dependency.

## Failure behaviour and limitations

Rendering rejects an empty title, source reference, row set, label, value, or explicitly blank unit. Missing units are valid only when the optional property is omitted. It does not group product data, determine units, normalize number formats, create product-page sections, infer technical suitability, or render the relational load-limit data assigned to P-007.
