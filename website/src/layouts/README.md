# `BaseLayout`

`BaseLayout` composes the page-wide TransANT document shell: local global and font styles, metadata, favicon, skip link, one `main` landmark, `SiteHeader`, and `SiteFooter`. It deliberately owns no page sections, route data, content collections, browser-location lookup, delivery integration, or client controller.

## Public API

- Required: `language`, non-empty route `title` and `description`, absolute HTTP(S) `canonicalUrl`, caller-owned `header`, and verified caller-owned `footer` data.
- Optional: `faviconHref`, a local absolute asset path, and caller-owned `skipLinkLabel`. They default to the immutable public TransANT brand PNG and English skip-link copy.
- Slot: the complete page-specific semantic content. The layout supplies the only `main` landmark around it.

## Document and responsive behaviour

The layout emits one valid language tag, unique title, description, canonical URL, local favicon, and server-rendered Open Graph/Twitter title, description, and URL metadata. It imports the local global/font stylesheet once. Its header and footer preserve their own compact/wide contracts; the layout neither reorders nor styles page-section content.

The skip link is first in the body, becomes visible on keyboard focus, and targets the focusable main landmark below the sticky header. Header and footer data are passed without mutation, so their semantic server fallback and verified-contact validation remain intact without JavaScript.

## Accessibility and portability

The document has one main landmark. The layout does not add headings, navigation IDs, route/browser inspection, remote fonts, remote images, or client runtime. A route assembler must provide page-specific metadata and explicit shell data; it must not derive it from globals or environment variables.

## Evidence

The isolated shell fixture is `/fixtures/base-layout/`. Its deferred focused tests cover metadata uniqueness, valid language, local favicon, shell landmarks/navigation, skip-link focus movement, and axe/overflow/visual evidence at all required widths. Under the authorized ten-package batch, these focused unit/browser/visual and shared-quality checks are accumulated for the A-004 checkpoint; only static safety checks run in this A-001 cycle.

# `TechnologyPage`

`TechnologyPage` is the internal presentation layout retained for the localized Engineering & Services narratives. It consumes the already-adapted hero, five source-bound stories, and the same unmodified `ContactCTA` used by wagon-detail pages; it does not read routes, content collections, environment values, or external research sources. Route assemblers opt into it only for the canonical `engineering-services` page, so the other editorial pages retain their shared `PageHero` and `MediaStory` composition unchanged. The historical internal name does not define a public label or route.

The layout applies the supported structural ideas from the local Stitch V8 reference: a compact technical metadata rail, a focused hero, one dark platform showcase, an internal four-chapter index, and a continuous numbered engineering narrative. It deliberately excludes V8's unsupported metrics, standards, coordinates, status labels, remote assets, outbound destinations, and custom CTA treatment. All images remain optimized local project assets and all actions remain first-party routes or same-page chapter links.

At compact widths the chapter index and every story retain source order in one column. From tablet widths the index becomes a four-column rail; at wide widths illustrated chapters use a bounded text/media split. The layout adds no client controller, and its anchor navigation, content, and imagery remain usable without JavaScript. Reduced-motion mode removes the only image-color transition.
