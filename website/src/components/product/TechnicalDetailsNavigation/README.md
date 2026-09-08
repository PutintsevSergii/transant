# TechnicalDetailsNavigation

`TechnicalDetailsNavigation` provides the compact, server-rendered in-page action used to reach a technical-details section. The caller supplies its visible label, localized navigation name, and optional target id; it owns all page context and technical content.

The component has no route, content-source, or JavaScript dependency. It preserves the established wagon-page affordance while allowing an editorial page to retain its own composition. The target section must exist in the caller’s rendered page and provide the source-backed data or drawings; this component never implies that drawings are available.
