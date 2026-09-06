/** Caller-owned link data for the inquiry route and optional related contact paths. */
export interface ContactCTAAction {
  /** A real safe HTTP(S) or relative destination; placeholders and script URLs are rejected. */
  readonly href: string;
  /** Concise visible action label. */
  readonly label: string;
  /** Opens an approved external destination in a safely isolated new tab. */
  readonly external?: boolean;
}

export interface ContactCTAProps {
  /** Section heading; this standalone homepage section renders it as an h2. */
  readonly title: string;
  /** Caller-owned explanation of the next contact step. */
  readonly summary: string;
  /** The single dominant inquiry action. An optional context augments only this URL. */
  readonly action: ContactCTAAction;
  /** Optional related contact routes. Absent or empty intentionally renders no secondary links. */
  readonly supportingLinks?: readonly ContactCTAAction[];
  /** Caller-owned product or family context, preserved visibly and safely URL-encoded as `context`. */
  readonly context?: string;
  /** Optional caller-owned labels for contextual and supporting navigation semantics. */
  readonly labels?: ContactCTALabels;
}

export interface ContactCTALabels {
  readonly context: string;
  readonly supportingNavigation: string;
}
