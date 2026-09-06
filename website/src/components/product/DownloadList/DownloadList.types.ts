import type {
  Download,
  SourceAttribution,
} from "../../../domain/content/types";

/**
 * Public metadata keeps each real file's source wording and availability
 * boundary intact instead of deriving document details from a product.
 */
export type DownloadListEntry = Download;

export interface DownloadListProps {
  /** Caller-owned section heading; product-page outline remains outside this component. */
  readonly title: string;
  /** The caller selects the document-outline rank. */
  readonly headingLevel: 2 | 3;
  /**
   * Optional caller-owned F-002 records in source order. Draft and unverified
   * records are accepted as source inputs but are not published by this view.
   */
  readonly downloads?: readonly DownloadListEntry[];
  /**
   * Optional shared provenance for the download set when the caller has an
   * approved collection-level source in addition to each file's own source.
   */
  readonly source?: SourceAttribution;
}
