import type { RailSequenceItem } from "../../core/RailSequence/RailSequence.types";
import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** Optional native route to caller-owned approved technical material. */
export interface ModularPlatformTechnicalLink {
  /** A real safe HTTP(S), root-relative, fragment, or relative destination. */
  readonly href: string;
  /** Concise caller-owned action label. */
  readonly label: string;
  /** Opens approved external material in a safely isolated new tab. */
  readonly external?: boolean;
}

export interface ModularPlatformSectionProps {
  /** Caller-owned introduction; the embedding page selects its document rank. */
  readonly intro: SectionIntroProps;
  /** Ordered two-to-six-stage platform explanation; the common composition has four stages. */
  readonly stages: readonly RailSequenceItem[];
  /** Accessible caller-owned label for the ordered platform sequence. */
  readonly sequenceLabel?: string;
  /** Optional deeper technical route; absent intentionally leaves no empty action. */
  readonly technicalLink?: ModularPlatformTechnicalLink;
}
