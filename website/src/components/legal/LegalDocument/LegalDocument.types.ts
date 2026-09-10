export interface LegalDocumentLink {
  /** Visitor-facing label for a source-owned legal reference. */
  readonly label: string;
  /** Absolute HTTPS destination supplied by the page adapter. */
  readonly href: string;
}

export interface LegalDocumentLinkedParagraph {
  /** Readable text shown before the reference link. */
  readonly text: string;
  /** Optional source-owned legal reference. */
  readonly link?: LegalDocumentLink;
}

export type LegalDocumentParagraph = string | LegalDocumentLinkedParagraph;

/** One readable legal-document section beneath the route-owned H1. */
export interface LegalDocumentSection {
  /** Concise section heading rendered as an H2. */
  readonly title: string;
  /** Caller-owned, source-approved or explicitly bounded copy. */
  readonly paragraphs: readonly [
    LegalDocumentParagraph,
    ...LegalDocumentParagraph[],
  ];
}

export interface LegalDocumentProps {
  /** Optional route-owned context shown before the legal section hierarchy. */
  readonly introduction?: string;
  /** A non-empty, source-ordered legal-document hierarchy. */
  readonly sections: readonly [LegalDocumentSection, ...LegalDocumentSection[]];
}
