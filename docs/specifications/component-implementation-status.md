# Component implementation status

## Purpose

This is the canonical package tracker for [`v7-component-development-plan.md`](v7-component-development-plan.md). It records code, tests, documentation, and verification separately so an implementation model does not mistake created files for completed components.

Root [`../../STATUS.md`](../../STATUS.md) is the compact current-state handoff, and [`../../CHANGELOG.md`](../../CHANGELOG.md) is the append-only implementation history. Every development cycle must update all three consistently; `agent/scripts/validate-state.sh` checks their structural synchronization.

## Status vocabulary

| Status | Meaning |
| --- | --- |
| `NOT_STARTED` | No implementation work for this package has been accepted. |
| `IN_PROGRESS` | Work has started, but at least one deliverable or required check is incomplete. |
| `IMPLEMENTED` | The implementation exists, but the complete definition of done is not yet evidenced. |
| `VERIFIED` | Interface, implementation, isolated fixture, applicable tests, documentation, and shared checks all pass. |
| `BLOCKED` | A named external decision, credential, approved asset, or source fact prevents completion. |
| `DEFERRED` | The package is explicitly removed from release one by a recorded decision. |

Only `VERIFIED` satisfies a dependency. Never promote `NOT_RUN`, a screenshot alone, a partial test, a blocked external flow, or inferred behaviour to `VERIFIED`.

## Evidence format

When updating a row, replace `—` with compact exact evidence:

```text
2026-09-04 — files: <paths>; tests: `<command>` PASS (<count>);
lab: <fixture route>; visual: <snapshot path>; docs: <README path>;
review: <important manual result or remaining limitation>
```

If blocked, record the exact missing input, its owner, the locally completed work, and the unblocking condition. Do not change unrelated rows.

## Foundation

| ID | Work package | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| F-001 | Astro project and isolated component lab | None | `NOT_STARTED` | — |
| F-002 | Content schemas and view-model adapters | F-001 | `NOT_STARTED` | — |

## Primitive components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| C-001 | `BrandLogo` | F-001 | `NOT_STARTED` | — |
| C-002 | `Action` | F-001 | `NOT_STARTED` | — |
| C-003 | `SectionIntro` | F-001 | `NOT_STARTED` | — |
| C-004 | `ResponsiveMedia` | F-001 | `NOT_STARTED` | — |
| C-005 | `RailSequence` | F-001 | `NOT_STARTED` | — |

## Shell components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| C-006 | `SiteHeader` | C-001, C-002 | `NOT_STARTED` | — |
| C-007 | `SiteFooter` | C-001, C-002 | `NOT_STARTED` | — |

## Homepage components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| H-001 | `HomeHero` | C-002, C-004 | `NOT_STARTED` | — |
| H-002 | `RailwayOrbital` | F-001 | `NOT_STARTED` | — |
| H-003 | `PayloadValueSection` | C-003 | `NOT_STARTED` | — |
| H-004 | `WagonSwitchyard` | C-002, C-004, F-002 | `NOT_STARTED` | — |
| H-005 | `ModularPlatformSection` | C-002, C-003, C-005 | `NOT_STARTED` | — |
| H-006 | `OperationalCaseStudy` | C-002, C-004, F-002 | `NOT_STARTED` | — |
| H-007 | `CollaborationProcess` | C-002, C-003, C-005 | `NOT_STARTED` | — |
| H-008 | `QualityImpactSection` | C-002, C-003, F-002 | `NOT_STARTED` | — |
| H-009 | `ContactCTA` | C-002, C-003 | `NOT_STARTED` | — |

## Catalogue components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| P-001 | `Breadcrumbs` | F-001 | `NOT_STARTED` | — |
| P-002 | `WagonFamilyIndex` | C-002, C-003, C-004, F-002 | `NOT_STARTED` | — |
| P-003 | `WagonModelList` | C-002, C-004, F-002 | `NOT_STARTED` | — |

## Product components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| P-004 | `ProductHero` | C-002, C-003, C-004, F-002 | `NOT_STARTED` | — |
| P-005 | `CargoFit` | C-003, F-002 | `NOT_STARTED` | — |
| P-006 | `SpecificationGroup` | F-001, F-002 | `NOT_STARTED` | — |
| P-007 | `LoadLimitTable` | F-001, F-002 | `NOT_STARTED` | — |
| P-008 | `DownloadList` | C-002, F-002 | `NOT_STARTED` | — |
| P-009 | `RelatedWagons` | C-002, C-004, F-002 | `NOT_STARTED` | — |

## Editorial and form components

| ID | Component | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| E-001 | `PageHero` | C-002, C-003, C-004 | `NOT_STARTED` | — |
| E-002 | `MediaStory` | C-002, C-003, C-004 | `NOT_STARTED` | — |
| E-003 | `EvidenceList` | C-002, F-002 | `NOT_STARTED` | — |
| F-003 | `ContactForm` | C-002, F-001 | `NOT_STARTED` | — |

## Page assembly

| ID | Page package | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| A-001 | `BaseLayout` | C-006, C-007 | `NOT_STARTED` | — |
| A-002 | Homepage | A-001, H-001 through H-009 | `NOT_STARTED` | — |
| A-003 | Catalogue and five family pages | A-001, P-001, P-002, P-003 | `NOT_STARTED` | — |
| A-004 | Ten product pages | A-001, P-001, P-004 through P-009 | `NOT_STARTED` | — |
| A-005 | Technology, projects, company, quality/sustainability pages | A-001, E-001, E-002, E-003 | `NOT_STARTED` | — |
| A-006 | Contact, privacy, imprint, and 404 pages | A-001, E-001, F-003 | `NOT_STARTED` | — |

## Integration and release

| ID | Work package | Prerequisites | Status | Evidence / blocker |
| --- | --- | --- | --- | --- |
| I-001 | Route and link integration | A-002 through A-006 | `NOT_STARTED` | — |
| I-002 | Responsive and visual integration | I-001 | `NOT_STARTED` | — |
| I-003 | Accessibility integration | I-001 | `NOT_STARTED` | — |
| I-004 | Performance integration | I-001 | `NOT_STARTED` | — |
| I-005 | Content and brand audit | I-001 | `NOT_STARTED` | — |
| I-006 | Deployment readiness and release | I-002, I-003, I-004, I-005 | `NOT_STARTED` | — |

## Release totals

| Category | Verified | Total |
| --- | ---: | ---: |
| Foundation | 0 | 2 |
| Primitives | 0 | 5 |
| Shell | 0 | 2 |
| Homepage | 0 | 9 |
| Catalogue and product | 0 | 9 |
| Editorial and form | 0 | 4 |
| Page assembly | 0 | 6 |
| Integration and release | 0 | 6 |
| **Total** | **0** | **43** |

Update these totals only when a row reaches `VERIFIED` or a release-scope decision explicitly changes the denominator.
