import type {
  PublicationStatus,
  SourceAttribution,
} from "../../../domain/content/types";
import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** The source-bound category prevents presentation from flattening different claim strengths. */
export type QualityImpactStatementType =
  "certification" | "policy" | "capability" | "target" | "marketing-statement";

/** Evidence destinations are explicit about whether they are a file or external resource. */
export type QualityImpactEvidenceType = "file" | "external";

export interface QualityImpactEvidenceLink {
  /** Concise visible description of the source material. */
  readonly label: string;
  /** Safe HTTP(S) or site-relative reference; placeholders and script URLs are rejected. */
  readonly href: string;
  /** Drives the visible file/external meaning and native Action treatment. */
  readonly type: QualityImpactEvidenceType;
  /** Attribution stays with the evidence rather than becoming an unsupported claim. */
  readonly source: SourceAttribution;
}

/** Optional certification information, rendered only for certification topics. */
export interface QualityImpactCertificate {
  /** Source-preserved certification identifier; it may contain meaningful digits. */
  readonly identifier: string;
  /** Issuing body, not a marketing restatement. */
  readonly issuer: string;
  /** Human-readable boundary of the certificate's applicability. */
  readonly scope: string;
  /** The source that supports the identifier, issuer, and scope. */
  readonly source: SourceAttribution;
}

export interface QualityImpactTopic {
  /** Determines the visible statement category and associated validation rules. */
  readonly statementType: QualityImpactStatementType;
  /** Caller-owned topic heading. */
  readonly title: string;
  /** Source-backed explanatory copy. It is never parsed into a numeric claim. */
  readonly summary: string;
  /** Draft and unverified topics remain valid inputs but are excluded from the rendered view. */
  readonly publicationStatus: PublicationStatus;
  /** Topic-level provenance, required even when an evidence link also has attribution. */
  readonly source: SourceAttribution;
  /** One or more approved evidence destinations in caller-selected order. */
  readonly evidenceLinks: readonly QualityImpactEvidenceLink[];
  /** Certificate metadata is permitted only for an actual certification topic. */
  readonly certificate?: QualityImpactCertificate;
}

export interface QualityImpactSectionProps {
  /** Caller selects the semantic heading and editorial introduction. */
  readonly intro: SectionIntroProps;
  /** At least two source-owned inputs; the approved subset may intentionally contain one topic. */
  readonly topics: readonly QualityImpactTopic[];
  readonly labels?: {
    readonly certification: string;
    readonly policy: string;
    readonly capability: string;
    readonly target: string;
    readonly marketingStatement: string;
    readonly certificate: string;
    readonly issuer: string;
    readonly scope: string;
    readonly evidence: string;
    readonly externalNewTab: string;
  };
}
