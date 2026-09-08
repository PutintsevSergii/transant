import type { SourceAttribution } from "../../../domain/content/types";

/** A source-preserved technical value with an optional separately supplied unit. */
export interface SpecificationRow {
  /** Caller-owned engineering label, retained in the published source order. */
  readonly label: string;
  /** Source-preserved engineering value; this component never parses or normalizes it. */
  readonly value: string;
  /** Optional source-supplied unit; absent units remain visibly absent. */
  readonly unit?: string;
}

export interface SpecificationGroupProps {
  /** Optional fragment destination for a page-level technical-details action. */
  readonly id?: string;
  /** Caller-owned group heading; product-page outline ownership stays with the caller. */
  readonly title: string;
  /** The caller selects the semantic document-outline rank. */
  readonly headingLevel: 2 | 3;
  /** Visible provenance for the complete technical group. */
  readonly source: SourceAttribution;
  /** One or more caller-owned rows in their original source order. */
  readonly rows: readonly SpecificationRow[];
}
