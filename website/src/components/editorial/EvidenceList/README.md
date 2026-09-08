# EvidenceList

Static editorial evidence rows for caller-owned policies, certifications, documents, and factual references.

## API

`EvidenceList` accepts a caller-selected `h2` or `h3`, optional collection provenance, and optional source-ordered `EvidenceListItem` records. Every record has an explicit type, source status, and provenance. Dates, issuers, scopes, summaries, and a real evidence action are optional source values and are never derived or normalized.

Optional `labels` supplies caller-owned localized evidence categories, metadata terms, empty-state copy, evidence-detail labelling, and the external new-tab notice; English defaults preserve standalone fixture portability.

The optional `section-label` variant retains the caller-selected heading level while displaying it as a compact brand-red mono label, matching an editorial `SectionIntro` eyebrow. It uses a short label-to-row transition and compact block padding. Separately, callers can select `spacing: "compact"` to shorten the heading-to-entry transition while retaining a deliberate three-rem lower section inset. The default `standard` variant and spacing preserve the general editorial treatment.

Only F-002 records marked `approved` render. Draft and unverified inputs remain valid but are omitted without mutation. If none render, the component emits its visible empty state.

Actions are explicit `external` or `download` records. External actions require HTTPS and use C-002’s safe new-tab treatment; download actions use C-002’s download icon while retaining a caller-owned real destination.

## Composition and accessibility

The component imports only C-002 `Action` and framework-independent contract/types. It reads no route, content collection, environment, browser, or deployment state; it has no client controller and does not assemble an editorial page.

Output is a semantic list of articles. Each metadata group is a labelled definition list, source attribution is visible, and all action targets retain C-002’s native link, focus, 44 px target, and external-link semantics. Compact rows remain ordinary vertical list items; a 56-rem container boundary creates a contained three-part row without reordering DOM or reading order.

## Limitations

Callers own final evidence wording, approval, dates, issuer/scope applicability, real destinations, document accessibility, and legal review. This component neither validates a certificate’s status nor infers factual claims, currentness, document availability, or download behaviour.
