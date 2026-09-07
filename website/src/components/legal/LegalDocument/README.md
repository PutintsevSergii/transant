# `LegalDocument`

`LegalDocument` renders caller-owned legal copy as a narrow, source-ordered
article below a route-owned H1. It does not choose a jurisdiction, infer data
processing, create a legal policy, inspect the route, or connect to a provider.

## Public API

- `sections` is a required non-empty ordered list. Each section has one H2 and
  one-or-more non-empty paragraphs.
- `introduction` is optional route-owned context. It is omitted when no
  approved or deliberately bounded context exists.

## Responsive and accessibility behaviour

The component uses one semantic article with H2 sections beneath the embedding
page H1. Its reading measure stays narrow, while headings and long text wrap at
compact widths without sticky local navigation, scripts, motion, or horizontal
overflow. The contract rejects blank headings, paragraphs, and introductions.
When it directly follows `PageHero`, its top padding uses the shared 12 px hero
handoff; the document owns all remaining padding and no vertical section margin.

Fixture: `/fixtures/legal/privacy/`. Deferred focused unit/browser evidence
covers the contract, heading hierarchy, route shell, compact containment, and
the privacy/imprint/404 route semantics at the authorized I-003 checkpoint.
