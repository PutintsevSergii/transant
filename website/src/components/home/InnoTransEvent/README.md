# `InnoTransEvent`

`InnoTransEvent` is a temporary, server-rendered homepage announcement for a confirmed trade-fair appearance. It owns the dark editorial event panel and a factual position list, while dates, location, copy, the official exhibitor destination, the four official hall-plan destinations, and accessible new-tab notices remain caller-owned.

The component contains one `h2`, one factual event-details group, one exhibitor-profile `Action`, and exactly four position links. It requires one main position and three additional positions from the caller; it contains no map, route line, spatial schematic, or exhibit-to-position assignment. There is no client controller or motion dependency, so the complete invitation, position codes, and official links remain available without JavaScript and under reduced-motion preferences.

Compact compositions keep the announcement text, date/location, profile action, and position list in that order. The action spans the narrow container, while every location link remains fully contained. At 60rem of component width the content and position list form the approved split. Remove the component from the three homepage assemblies when the campaign ends; adjacent sections do not depend on its markup.
