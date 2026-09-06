# Breadcrumbs

`Breadcrumbs` is an isolated, static ordered-location component for catalogue and product routes. It renders caller-owned route data; it never reads Astro route state, content collections, browser globals, or deployment configuration.

## API

```ts
import Breadcrumbs from "./Breadcrumbs.astro";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";

const breadcrumbs: BreadcrumbsProps = {
  baseUrl: "https://www.transant.example",
  items: [
    { label: "Home", href: "/" },
    { label: "Wagons", href: "/wagons/" },
    { label: "Intermodal wagons", href: "/wagons/intermodal/" },
  ],
};
```

`items` is ordered root-to-current. Each item supplies its canonical same-site path for JSON-LD; only earlier items render as links. The final item renders a non-linked `aria-current="page"` value, so canonical metadata never creates a false current-page link. `baseUrl` is explicit so the component can emit absolute schema.org destinations without reading an environment variable. A non-empty `compactLabel` may shorten only the visible label; the full label remains the accessible name and structured-data name.

## Rendering and accessibility

- Server HTML is a labelled `nav`, semantic `ol`/`li` path, and one `application/ld+json` `BreadcrumbList` script.
- The JSON-LD preserves complete labels, source order, one-based positions, and canonical absolute paths.
- Links are native 44 px minimum touch targets with visible focus and forced-colors support. The current item is never an anchor.
- The list wraps naturally at compact widths. It has no horizontal-scroll strip, client controller, motion, asset, event, or analytics dependency.
- The navigation owns the shared `page-frame`, including the responsive page gutter and content maximum. Callers do not wrap it in another `page-frame`; this keeps direct product-layout use and PageHero-slot use aligned identically.

## Validation and portability

`validateBreadcrumbsProps` rejects empty paths or labels, duplicate destinations, blank compact/navigation labels, non-HTTP(S) base URLs, and external, protocol-relative, malformed, or whitespace-containing paths. `breadcrumbsJsonLd` and `breadcrumbsJsonLdScript` are framework-independent pure helpers for focused tests or non-Astro integrations.

The component uses only shared semantic tokens plus the global `page-frame` and `visually-hidden` utilities. Embedding pages own vertical rhythm, surrounding surface treatment, and heading hierarchy.
