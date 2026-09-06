/** Framework-independent content contracts for the TransANT website. */

export type PublicationStatus = "approved" | "draft" | "unverified";

export type EvidenceLevel = "E1" | "E2" | "E3" | "E4";

export interface SourceAttribution {
  readonly reference: string;
  readonly checkedAt?: string;
  readonly owner?: string;
}

export interface SiteSettings {
  readonly name: string;
  readonly defaultLocale: string;
  readonly source: SourceAttribution;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

export interface WagonFamily {
  readonly id: string;
  readonly sourceId: string;
  readonly slug: string;
  readonly name: string;
  readonly tag: string;
  readonly description: string;
  readonly productIds: readonly string[];
  readonly source: SourceAttribution;
}

/** A source string, deliberately not a parsed numeric value. */
export interface EngineeringRow {
  readonly label: string;
  readonly value: string;
}

/** The supplied payload string is preserved verbatim, including decimals. */
export interface LoadLimitRow {
  readonly routeClass: "A" | "B" | "C" | "D";
  readonly payload: string;
}

export interface Product {
  readonly id: string;
  readonly sourceId: string;
  readonly slug: string;
  readonly familySlug: string;
  readonly familyName: string;
  readonly code: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly tagline: string;
  readonly intro: readonly string[];
  readonly commodities: readonly string[];
  readonly benefits: readonly string[];
  readonly specifications: readonly EngineeringRow[];
  readonly technicalSource?: SourceAttribution;
  readonly loadLimits?: readonly LoadLimitRow[];
  readonly specialFeatures: readonly string[];
  /** Logical path beneath `src/assets/images/`, never an imported image module. */
  readonly imagePath: string;
  readonly source: SourceAttribution;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly publicationStatus: PublicationStatus;
  readonly source: SourceAttribution;
}

export interface PageContent {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly publicationStatus: PublicationStatus;
  readonly source: SourceAttribution;
}

export interface Download {
  readonly title: string;
  readonly href: string;
  readonly fileType: string;
  readonly fileSize?: string;
  readonly language: string;
  readonly revisionDate?: string;
  readonly publicationStatus: PublicationStatus;
  readonly source: SourceAttribution;
}

export interface Evidence {
  readonly id: string;
  readonly level: EvidenceLevel;
  readonly title: string;
  readonly source: SourceAttribution;
}

export interface Claim {
  readonly id: string;
  readonly text: string;
  readonly publicationStatus: PublicationStatus;
  readonly evidenceId: string;
  readonly source: SourceAttribution;
}

export interface ContentCorpus {
  readonly site: SiteSettings;
  readonly navigation: readonly NavigationItem[];
  readonly families: readonly WagonFamily[];
  readonly products: readonly Product[];
  readonly projects: readonly Project[];
  readonly pages: readonly PageContent[];
  readonly downloads: readonly Download[];
  readonly evidence: readonly Evidence[];
  readonly claims: readonly Claim[];
}

export interface ProductionClaimViewModel {
  readonly id: string;
  readonly text: string;
  readonly evidenceId: string;
  readonly sourceReference: string;
}

export interface ProductViewModel {
  readonly id: string;
  readonly href: string;
  readonly familyHref: string;
  readonly name: string;
  readonly code: string;
  readonly eyebrow: string;
  readonly tagline: string;
  readonly intro: readonly string[];
  readonly commodities: readonly string[];
  readonly benefits: readonly string[];
  /** Ordered source display rows. Components must render their values as supplied. */
  readonly specifications: readonly EngineeringRow[];
  readonly technicalSource?: SourceAttribution;
  /** Ordered source display rows, omitted where no source table exists. */
  readonly loadLimits?: readonly LoadLimitRow[];
  readonly specialFeatures: readonly string[];
  readonly imagePath: string;
}
