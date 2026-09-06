# ProductHero

`ProductHero` is the product-detail entry component. It renders caller-owned family and model identity, one approved benefit statement, a priority local transparent wagon render, one native inquiry action, and one to four source-attributed decisive facts.

## Public API

Import `ProductHeroProps` from `ProductHero.types.ts`. The component always emits an `h1` through C-003 `SectionIntro`; callers must therefore use it only for the document's product-page heading. `media` is a local C-004 contract with meaningful alternative text, `contain` fit, and a reserved aspect ratio. Each fact preserves its source label and display string without parsing or normalizing technical values.

`inquiryContext` is optional. When present, `productHeroInquiryHref` trims and URL-encodes it only as the inquiry action's `context` query parameter, preserving existing query parameters and fragments. The component reads neither the current route nor global state.

The primary wagon-render stage has no enclosing border. Its contained local-media sizing, right-aligned image position, reserved space, subtle surface, and internal padding remain component-owned so this visual treatment cannot alter image or card borders elsewhere.

## Composition and accessibility

The component composes C-003 `SectionIntro`, C-002 `Action`, and C-004 `ResponsiveMedia`; it imports no page, catalogue, browser, deployment, or neighbouring-section module. It remains usable without JavaScript. Compact source order is identity and benefit, inquiry action, contained wagon render, then facts. At a 60-rem component boundary, the editorial content and render form a split composition while facts remain below; compact facts become two columns only when their container fits. `page-frame` remains the only horizontal page gutter, keeping the product identity on the same left content rail as the breadcrumb and following product sections. The native action preserves C-002 focus, target-size, and external-link semantics.

## Limitations

This component does not infer cargo compatibility, derive or normalize specifications, render tables, read a product record, create contact recipients, or assemble a product page. Cargo fit, specification groups, load tables, downloads, related products, breadcrumbs, and route assembly remain separate packages.
