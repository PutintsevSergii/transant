import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";
import type {
  PublicationStatus,
  SourceAttribution,
} from "../../../domain/content/types";

/** A source-attributed fact that may be shown only after approval. */
export interface OperationalCaseStudyFact {
  /** Concise evidence category such as route, fleet, or result boundary. */
  readonly label: string;
  /** Source-preserved display value. */
  readonly value: string;
  /** Draft and unverified facts are deliberately omitted from the rendered view. */
  readonly publicationStatus: PublicationStatus;
  /** The source label remains visible with the fact. */
  readonly source: SourceAttribution;
}

/** A caller-approved real route to project context or a document. */
export interface OperationalCaseStudyLink {
  /** Real, safe destination; placeholders and script URLs are rejected. */
  readonly href: string;
  /** Concise visible action label. */
  readonly label: string;
  /** Enables the existing safe external-link behaviour when needed. */
  readonly external?: boolean;
}

export interface OperationalCaseStudyProps {
  /** Small source-owned category label above the case title. */
  readonly eyebrow: string;
  /** Caller-selected document heading. */
  readonly title: string;
  /** Evidence-led summary; never a fabricated quotation or status statement. */
  readonly summary: string;
  /** Local ResponsiveMedia contract with meaningful alternative text and an intentional crop. */
  readonly media: ResponsiveMediaProps;
  /** Ordered facts; only approved entries with source labels render. */
  readonly facts: readonly OperationalCaseStudyFact[];
  /** Optional approved route to the wider project record. */
  readonly href?: OperationalCaseStudyLink;
  /** Optional approved document destination, rendered with the shared download icon. */
  readonly download?: OperationalCaseStudyLink;
}
