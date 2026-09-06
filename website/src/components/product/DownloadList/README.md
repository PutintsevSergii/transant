# DownloadList

## 1. Purpose

`DownloadList` presents caller-owned F-002 file records as native download actions with visible type, language, optional revision/size, and per-file source attribution. It does not select product documents, generate files, verify production hosting, or assemble a product page.

## 2. Visual source and non-copying boundary

The component uses the approved V7 editorial spacing, paper file rows, dark-blue typography, restrained red metadata labels, and shared local tokens. It does not copy prototype markup or competitor styling.

## 3. Public interface

```ts
interface DownloadListProps {
  title: string;
  headingLevel: 2 | 3;
  downloads?: readonly Download[];
  source?: SourceAttribution;
}
```

## 4. Props

`title` and `headingLevel` are caller-owned. `downloads` accepts source-ordered F-002 `Download` records; every record supplies a non-empty title, real internal path or HTTPS file URL, type, language, publication status, and source reference. Optional `fileSize` and `revisionDate` remain absent when the source does not supply them. `source` is an optional collection-level reference and never replaces per-file provenance.

Only records explicitly marked `approved` render. Draft and unverified records remain valid source inputs but are excluded without mutation. No records render an honest no-published-downloads state; blank, `#`, `about:blank`, unsafe, or missing destinations fail before render rather than becoming placeholder rows.

## 5. Slots

None.

## 6. Events

None. Each action is C-002 server-rendered native link; an external HTTPS destination uses the existing safe new-tab semantics.

## 7. Tokens and CSS contract

Uses shared paper, subtle-surface, dark-blue, red, divider, focus, type, and spacing tokens. It owns its file-row container queries and does not assume page width.

## 8. Asset requirements

The component accepts file routes, not file bytes. Production callers must provide only approved destinations that exist in the deployed static output or approved HTTPS document host. The isolated fixture includes a static text endpoint solely to prove the rendered route is a real file response; it is not production product content.

## 9. Variants and states

The caller selects an `h2` or `h3`, optional collection source, and optional source fields per download. Present records retain their exact ordering. Withheld records are omitted; all-withheld or absent inputs use the no-published-downloads state. Incomplete metadata or placeholder destinations are rejected.

## 10. Responsive behaviour

Compact source order is heading/optional collection provenance, then each file title/provenance, metadata, and its action. Metadata uses labelled `dl` pairs inside each row, so type, language, revision, and size remain associated with the correct native action. At a 52-rem component width, rows become contained editorial three-column compositions; they never become a carousel, table scroller, or hover-only control. This supports 320/390 compact, 768/1024 tablet, 1440 desktop, and 844×390 landscape states; long strings wrap without page overflow.

## 11. Accessibility behaviour

Each list item contains a named article, labelled metadata definition list, visible provenance, and a C-002 minimum-44-pixel native action with an accessible file-type label. Focus remains visible and in source order. There is no client controller or essential hover interaction.

## 12. Motion and reduced-motion behaviour

None.

## 13. Content and claim rules

This component preserves caller-provided F-002 document fields and publication status. It never invents a file, document title, type, size, language, revision, availability, certificate, approval, or product applicability. Production document selection, hosting, legal approval, and product-page adaptation remain outside the component.

## 14. Minimal standalone example

```astro
<DownloadList
  title="Downloads"
  headingLevel={2}
  downloads={[
    {
      title: "Approved product data sheet",
      href: "/downloads/product-data-sheet.pdf",
      fileType: "PDF",
      fileSize: "1.2 MB",
      language: "English",
      revisionDate: "2026-09",
      publicationStatus: "approved",
      source: { reference: "Approved document register" },
    },
  ]}
/>
```

## 15. Test commands and covered cases

Run `pnpm test:unit -- download-list-contract`, then `pnpm test:browser -- tests/browser/download-list.spec.ts`. Tests cover source order, approved/withheld/empty states, missing and placeholder file-destination rejection, complete/partial metadata, real fixture file response, native keyboard focus, compact/wide composition, overflow, axe, browser errors, and reviewed 320/390/768/1024/1440/844×390 visual baselines.

## 16. Portability instructions

Import only `DownloadList.astro` and its public type. Provide serializable F-002 records explicitly; do not import a content collection, product route, browser state, deployment adapter, or neighbouring section into the component.

## 17. Known limitations

The component can validate a usable destination but cannot prove an external host's release-time file lifecycle. Production asset publication and document approvals are a later deployment/content responsibility.
