import type { RailSequenceItem } from "../../core/RailSequence/RailSequence.types";
import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** Optional native route to a caller-approved discussion or inquiry context. */
export interface CollaborationProcessContactLink {
  /** A real safe HTTP(S), root-relative, fragment, or relative destination. */
  readonly href: string;
  /** Concise caller-owned action label. */
  readonly label: string;
  /** Opens approved external material in a safely isolated new tab. */
  readonly external?: boolean;
}

export interface CollaborationProcessProps {
  /** Caller-owned introduction; the embedding page chooses its document rank. */
  readonly intro: SectionIntroProps;
  /** Ordered four-to-six-stage engagement explanation. */
  readonly steps: readonly RailSequenceItem[];
  /** Optional approved next step; absent intentionally leaves no empty action. */
  readonly contactLink?: CollaborationProcessContactLink;
}
