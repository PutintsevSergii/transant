import type {
  PublicationStatus,
  SourceAttribution,
} from "../../../domain/content/types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export interface RelatedWagonEntry {
  /** Stable product identity used to reject a relation back to the current product. */
  readonly id: string;
  /** Caller-owned family context for a related product. */
  readonly familyName: string;
  /** Source-preserved product code. */
  readonly code: string;
  /** Caller-owned related product name. */
  readonly title: string;
  /** Source-attributed explanation of this explicit relationship. */
  readonly summary: string;
  /** Direct same-site destination for the related product. */
  readonly href: string;
  /** Visible native-action label. */
  readonly linkLabel: string;
  /** Only explicitly approved relationships are rendered. */
  readonly publicationStatus: PublicationStatus;
  /** Provenance for the relationship record, not an inferred similarity. */
  readonly source: SourceAttribution;
  /** Optional reviewed local C-004 render for the related product. */
  readonly media?: ResponsiveMediaProps;
}

export interface RelatedWagonsProps {
  /** The current caller-owned product identity; it prevents self-reference. */
  readonly currentProductId: string;
  /** Caller-owned section title. */
  readonly title: string;
  /** Caller selects the document-outline rank. */
  readonly headingLevel: 2 | 3;
  /** Explicit caller-owned relationship records in source order. */
  readonly related?: readonly RelatedWagonEntry[];
}
