export interface SiteFooterLink {
  /** Visible, non-empty destination label. */
  readonly label: string;
  /** Non-empty server-rendered internal or approved external destination. */
  readonly href: string;
}

export interface SiteFooterGroup {
  /** Accessible navigation name and visible group heading. */
  readonly heading: string;
  /** Ordered, non-empty footer destinations. */
  readonly links: readonly [SiteFooterLink, ...SiteFooterLink[]];
}

export interface SiteFooterContact {
  /** Caller confirmation that the supplied company/contact data is approved. */
  readonly verification: "verified";
  /** Approved legal company name. */
  readonly companyName: string;
  /** Approved postal address lines in their display order. */
  readonly addressLines: readonly [string, ...string[]];
  /** Approved, human-readable telephone number. */
  readonly phone: string;
  /** Approved email address. */
  readonly email: string;
}

export interface SiteFooterProps {
  /** Ordered product/expertise navigation groups. */
  readonly groups: readonly [SiteFooterGroup, ...SiteFooterGroup[]];
  /** Approved company identity and direct contact data. */
  readonly contact: SiteFooterContact;
  /** Ordered, non-empty legal destinations. */
  readonly legalLinks: readonly [SiteFooterLink, ...SiteFooterLink[]];
  /** Caller-owned copyright or legal notice. */
  readonly copyright: string;
  /** Optional explicit locale destinations; omitted when no approved locales exist. */
  readonly localeOptions?: readonly [SiteFooterLink, ...SiteFooterLink[]];
  /** Optional caller-owned labels for the shared footer shell. */
  readonly labels?: SiteFooterLabels;
}

export interface SiteFooterLabels {
  readonly localeSelection: string;
  readonly languages: string;
  readonly contact: string;
  readonly legalInformation: string;
}
