import type {
  LoadLimitRow,
  SourceAttribution,
} from "../../../domain/content/types";

/**
 * Caller-owned column labels. Values remain strings so the component never
 * creates or rewrites engineering terminology.
 */
export interface LoadLimitColumnLabels {
  readonly routeClass: string;
  readonly payload: string;
  /** Optional source-supplied suffix displayed beside each payload. */
  readonly payloadUnit?: string;
}

export interface LoadLimitTableProps {
  /** Caller-owned group heading; product-page outline ownership stays with the caller. */
  readonly title: string;
  /** The caller selects the semantic document-outline rank. */
  readonly headingLevel: 2 | 3;
  /** Visible and programmatic table description. */
  readonly caption: string;
  /** Visible provenance for the complete engineering table. */
  readonly source: SourceAttribution;
  /** Source-preserved table-column labels and optional payload suffix. */
  readonly columns: LoadLimitColumnLabels;
  /** Optional localized instruction shown when the table overflows. */
  readonly scrollHint?: string;
  /** Optional localized accessible name for the horizontal-scroll region. */
  readonly scrollRegionLabel?: string;
  /** Optional localized accessible name for the notes list. */
  readonly notesLabel?: string;
  /** Ordered A–D route-class rows supplied by the F-002 content contract. */
  readonly rows: readonly LoadLimitRow[];
  /** Optional source-supplied table notes, rendered after the table in order. */
  readonly notes?: readonly string[];
}
