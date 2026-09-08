# `GermanHomepage`

`GermanHomepage` is the local German homepage composition. It reuses the
existing homepage sections and assets while consuming the German homepage view
model; all language-switch links remain on this site under `/de/`.

Its source order places the caller-owned InnoTrans announcement directly after
the hero, before the five-family wagon discovery.

Other `/de/*` routes are dispatched to their matching page composition by the
German catch-all route. Shared view models are translated through the locale
content adapter, while product identifiers, measurements, certificates,
contact data, and source URLs remain unchanged.
