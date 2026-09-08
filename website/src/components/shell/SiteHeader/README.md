# `SiteHeader`

`SiteHeader` is the server-rendered TransANT shell header. It owns only the
primary navigation, locale links, compact inquiry action, and progressively
enhanced compact-menu lifecycle; it does not read routes, content collections,
browser locations, or global application state.

## Public API

`SiteHeaderProps` is defined in `SiteHeader.types.ts`.

- `homeHref` is passed to the immutable priority `BrandLogo`.
- `id` is an optional stable instance name. Supply it when multiple headers are
  rendered in one document so their menu-control IDs remain unique.
- `navigation` is an ordered set of visible top-level destinations. An item can
  include `overviewLabel` and `children`; that item renders as a native
  disclosure whose overview and grouped links all remain in server HTML.
- `currentPath` is caller-owned route data used to add `aria-current="page"`.
- `localeOptions` is an explicit set of local locale links; `current` marks the
  selected locale without locale detection. The production shell derives its
  options from the central locale registry and supplies local English, German,
  Ukrainian, Polish, and Czech routes under `/`, `/de/`, `/uk/`, `/pl/`, and
  `/cs/`. The selector displays the requested UA/PL/CZ labels while document
  and URL language codes remain the standards-based `uk`/`pl`/`cs`. The options
  render as a native expandable menu, so another approved locale does not
  require a new header layout.
- `contactAction` is a required native primary `Action` link.
- `logoScale` defaults to `default`; the homepage may request `prominent` to
  give the existing immutable brand mark stronger opening-page hierarchy
  without changing the asset, link, or accessible name.
- `sticky` defaults to `true`; the component applies document scroll padding so
  the sticky bar does not obscure anchor destinations.

## Responsive and interaction contract

At 1024 px and above, the calm white V7-style bar presents the linked logo,
primary links, expandable locale menu, and compact red inquiry action. Below 1024 px, the
server HTML continues to expose all links. Once JavaScript is available, it
enhances that compact presentation into a labelled menu button and full-height
dialog panel with a close control.

Opening moves focus to the panel title, makes body siblings inert, traps Tab
within the panel, and supports Escape, the close control, navigation selection,
and outside-pointer close. A user-initiated close returns focus to the trigger.
Each controller initializes per header root and ignores roots already
initialized, so independent header fixtures can coexist.

The production adapter omits Home only on the active localized homepage and
prepends it everywhere else. Wagons is a native disclosure at every width. Its
overview route and five source-owned family routes work through click, touch,
Enter, and Space without depending on hover or JavaScript. Escape closes the
open wagon disclosure and returns focus to its summary before a subsequent
Escape closes the compact panel. Outside pointer input also closes the
disclosure.

All controls retain a 44 px minimum target, focus is supplied by the shared
global focus contract, and reduced-motion users receive no component animation.

## Accessibility and limitations

The component uses a semantic `<header>`, one labelled primary `<nav>`, a native
`<details>` disclosure for grouped wagon destinations, and a separate labelled
locale `<nav>` containing its own native `<details>` disclosure. Navigation
links always exist in server HTML;
there is no JavaScript-only destination. The controller uses the browser `inert`
property for the enhanced modal surface, so older browsers retain the usable
server-rendered fallback but do not get modal background suppression.

The header accepts already-approved routes and locale options only. Route
assembly, translated content, deeper product menus, analytics, and contact-form
delivery remain caller responsibilities.
