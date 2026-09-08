# `WagonFamilyIndex`

`WagonFamilyIndex` is a static, caller-owned release-one catalogue browse component. It composes only `SectionIntro`, `ResponsiveMedia`, and native `Action` links. It has no page, route, content-collection, browser, deployment, search, filter, comparison, configurator, client-controller, or neighbouring-component dependency.

Its five source-ordered articles form a continuous editorial list: the list owns the outer rules and each non-final row owns exactly one bottom divider. Compact layouts use one uniform label/copy/media/action sequence; wide layouts alternate the two columns while retaining a deliberate text-to-media gutter. Wagon renders stay locally contained in a deliberately compact 2:1 reserved stage, so wide rows scan as choices rather than oversized feature panels with unused lower space. Their direct family actions retain shared regular-secondary semantics but use a local red-outline treatment and intrinsic width, so they wrap their content rather than filling the copy column. When the caller omits the optional intro because a page hero already provides the hierarchy, the index uses a compact 1.5–3 rem outer rhythm rather than creating a second large blank field.

When it directly follows `PageHero`, the shared layout handoff replaces only this component's top padding with the global 12 px inset. The remaining rhythm stays local to the index; section roots use no vertical margins.

## API

```ts
import WagonFamilyIndex from "./WagonFamilyIndex.astro";
import type { WagonFamilyIndexProps } from "./WagonFamilyIndex.types";

const families: WagonFamilyIndexProps = {
  intro: {
    title: "Wagon families",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "standard",
  },
  families: [/* exactly five caller-owned family records */],
};
```

Each family retains a stable id and visible sequence, category label, heading, source-preserved cargo-fit summary, local C-004 media, source reference, and one direct same-site family route. An optional caller-owned `intro` is useful in isolated or embedded contexts, but page compositions can omit it when their page hero already supplies the needed hierarchy. The component deliberately does not accept model lists: detailed model rendering belongs to the later `WagonModelList` component.

## Rendering and accessibility

- Server HTML is one labelled heading area followed by a semantic ordered list of five editorial family articles.
- Each family retains meaningful local wagon alternative text, a visible source label, and one native C-002 direct link with its 44 px target and visible focus treatment.
- Compact source and visual order is uniform: label/title/summary, representative wagon, then provenance and family action. At a 56-rem component boundary, rows alternate only visually; DOM and keyboard order remain stable.
- There is no JavaScript, interaction state, motion, remote media, or placeholder route. All five family destinations remain direct ordinary links.

## Validation and portability

`validateWagonFamilyIndexProps` rejects an incomplete or duplicate five-family range, blank identity/copy/provenance, unsafe or duplicate destinations, and invalid/decorative/non-contained/unreserved media. The pure contract accepts caller-supplied values only; it never derives cargo compatibility or imports a catalogue record.

## Evidence

Fixture: `/fixtures/wagon-family-index/`. Focused unit and Playwright checks cover complete five-family output, source order, local responsive media, direct-link focus, compact uniform order, wide alternation, long-copy wrapping, no search/filter/client script, overflow, axe, browser errors, and reviewed 320, 390, 768, 1024, 1440, and phone-landscape visual baselines.
