# RailwayOrbital

`RailwayOrbital` is a self-contained SVG stage: a small fine-dotted Earth is held by three paired railway loops, each carrying one instance of the black tank-wagon pictogram in the supplied print catalogue's page-three header. Faint construction circles, axes, and a square sit beneath the artwork like a technical drawing. Rails, wagons, and red signal dots have a paper-clearance around the globe, so they never cross its edge. The component makes no map, telemetry, route, or operational claim.

## API

- Omit `label` for decorative output. Supplying a label renders a named `figure` with an SVG image role and visible caption.
- `motion` defaults to `auto`; use `off` to guarantee a static orbital.
- `density` is `sparse`, `standard`, or `dense`; `accent` is `blue` or `red`, each using existing tokens.

## Behaviour and accessibility

All geometry and local wagon-image references are present in server HTML and need no scripting. Animation is a progressive enhancement: the small controller moves each catalogue pictogram and signal dot along its railway tangent and turns the dotted land only when an `auto` orbital is observed onscreen. It pauses work when the page is hidden or the stage is offscreen, disables it for `prefers-reduced-motion`, and leaves `motion: "off"` static. No filter, glow, or geometry may exceed the component bounds.

## Portability

The component depends only on one local, optimized transparent extraction of the catalogue pictogram. It has no route, deployment, or page-section dependency and may be inserted by a later section through a slot. Its controller initialises each named root once and has no global UI state.
