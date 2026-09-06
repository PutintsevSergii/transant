import type {
  PublicationStatus,
  SourceAttribution,
} from "../../../domain/content/types";

/** Keeps policy, certificate, document, and factual-reference meanings explicit. */
export type EvidenceListItemType =
  "policy" | "certification" | "document" | "factual-reference";

/** The caller chooses whether a real evidence destination is external or a file. */
export type EvidenceListActionType = "external" | "download";

export interface EvidenceListAction {
  /** A concise description of the evidence destination. */
  readonly label: string;
  /** A safe internal route or HTTPS reference; placeholders are rejected. */
  readonly href: string;
  /** Preserves the external or download meaning in the rendered C-002 action. */
  readonly type: EvidenceListActionType;
}

export interface EvidenceListItem {
  /** A caller-selected evidence category; it is rendered rather than inferred. */
  readonly type: EvidenceListItemType;
  /** Caller-owned evidence title. */
  readonly title: string;
  /** Optional factual context; absent context does not become a claim. */
  readonly summary?: string;
  /** Draft and unverified records remain valid inputs but are not published. */
  readonly publicationStatus: PublicationStatus;
  /** Optional public status text; omit internal editorial/publication labels. */
  readonly status?: string;
  /** Optional source-supplied date string; this component does not parse it. */
  readonly date?: string;
  /** Optional named issuing body or responsible organization. */
  readonly issuer?: string;
  /** Optional source-supplied applicability boundary. */
  readonly scope?: string;
  /** Required provenance for the record and its displayed metadata. */
  readonly source: SourceAttribution;
  /** Optional real destination for the underlying evidence. */
  readonly action?: EvidenceListAction;
}

export interface EvidenceListProps {
  /** Caller-owned section heading; editorial page assembly remains outside this component. */
  readonly title: string;
  /** The embedding document selects the heading outline rank. */
  readonly headingLevel: 2 | 3;
  /** Optional compact section-label treatment keeps the heading close to its evidence rows. */
  readonly variant?: "standard" | "section-label";
  /** Optional compact heading-to-entry transition without changing the heading treatment. */
  readonly spacing?: "standard" | "compact";
  /** Caller-owned source records in source order. */
  readonly evidence?: readonly EvidenceListItem[];
  /** Optional shared provenance when the evidence collection itself has a source. */
  readonly source?: SourceAttribution;
  readonly labels?: {
    readonly policy: string;
    readonly certification: string;
    readonly document: string;
    readonly factualReference: string;
    readonly status: string;
    readonly date: string;
    readonly issuer: string;
    readonly scope: string;
    readonly evidenceDetails: string;
    readonly empty: string;
    readonly externalNewTab: string;
  };
}
