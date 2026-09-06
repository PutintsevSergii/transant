/** One readable legal-document section beneath the route-owned H1. */
export interface LegalDocumentSection {
  /** Concise section heading rendered as an H2. */
  readonly title: string;
  /** Caller-owned, source-approved or explicitly bounded copy. */
  readonly paragraphs: readonly [string, ...string[]];
}

export interface LegalDocumentProps {
  /** Optional route-owned context shown before the legal section hierarchy. */
  readonly introduction?: string;
  /** A non-empty, source-ordered legal-document hierarchy. */
  readonly sections: readonly [LegalDocumentSection, ...LegalDocumentSection[]];
}
