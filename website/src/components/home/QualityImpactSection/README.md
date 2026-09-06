# `QualityImpactSection`

Renders a static, caller-owned quality and responsible-impact evidence area. It composes only `SectionIntro` and native `Action` links; it has no client controller, page-route, collection, browser-state, deployment, or neighbouring-section dependency.

## API

| Prop     | Type                            | Required | Contract                                                                                                                   |
| -------- | ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `intro`  | `SectionIntroProps`             | Yes      | Caller owns semantic heading, editorial copy, alignment, theme, and measure. Its title must be non-empty.                  |
| `topics` | `readonly QualityImpactTopic[]` | Yes      | At least two source-owned inputs. Only `approved` topics render, so a single approved topic deliberately forms one column. |

Optional `labels` supplies caller-owned localized statement categories, certificate metadata terms, evidence labelling, and the external new-tab notice; English defaults keep the fixture self-contained.

Each topic has a distinct `statementType`: `certification`, `policy`, `capability`, `target`, or `marketing-statement`. The visible category stops a certification or target from being presented as an unqualified general claim. Every topic and evidence link retains a source reference. Certification topics require identifier, issuer, scope, and certificate source metadata; other categories cannot attach certificate metadata.

## Semantics and failure behaviour

- The section starts with the caller-owned `SectionIntro`, followed by each approved topic as an article with a heading and evidence list.
- Evidence actions visibly state whether they open a `file` or `external resource`; external references preserve C-002's safe new-tab semantics and screen-reader disclosure.
- Draft and unverified topics are valid source inputs but are omitted at the component boundary. No numeric value is parsed, derived, or rendered without the source reference that accompanies its topic and evidence.
- The component fails Astro rendering for fewer than two inputs, blank title/summary/provenance, no evidence links, unsafe/placeholder references, incomplete certificate metadata, a missing certificate on a certification topic, or certificate metadata on another statement type.

## Responsive, accessibility, and motion contract

Compact layouts stack the editorial introduction and approved topics in reading order. Certificate identifiers may remain monospaced while issuer, scope, source labels, and evidence actions wrap naturally beneath them. Evidence actions retain C-002's 44 px target and focus treatment. The section owns equal, generous block padding. At the 56-rem component boundary the quiet V7-inspired editorial split places the introduction beside one or two topic columns; it pins below the 4.5-rem site header with the standard 1.5-rem breathing room, and multi-topic columns stretch to a shared height, reserve the same three-line summary region, and settle evidence actions at the common bottom edge. The component creates no animation or motion.

## Evidence

Fixture: `/fixtures/quality-impact-section/`. Focused unit and Playwright checks cover one/two/three rendered topic states, publication exclusion, statement categories, certificate and unsafe-reference rejection, source-labelled evidence semantics, keyboard focus, compact/wide composition, long-copy growth, overflow, axe, browser errors, and reviewed 320, 390, 768, 1024, 1440, and phone-landscape visual baselines.
