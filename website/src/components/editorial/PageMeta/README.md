# `PageMeta`

`PageMeta` is the compact ruled descriptor strip shared by the Engineering & Services, Home, Company, and Wagons catalogue page introductions. Callers provide one short page label and an ordered list of page-relevant concepts; the component joins the concepts with the established slash rhythm and owns no route, content-store, or browser dependency.

The strip is redundant with the page's visible headings and sections, so it is intentionally hidden from assistive technology. It remains server-rendered without JavaScript. At every width the label stays on one line and the trailing sequence uses a single contained line with ellipsis when the viewport cannot hold the full wording. The component emits no events, has no interactive or motion behavior, and depends only on shared page-frame and typography tokens.

The isolated fixture is `/fixtures/page-meta/`. Page-level Home, Company, Engineering & Services, German localization, responsive containment, axe, and visual checks provide the integration evidence at 320, 390, 768, 1024, 1440, and 844×390 CSS pixels.
