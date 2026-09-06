import type { SourceAttribution } from "../../../domain/content/types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";
import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** One caller-owned family destination in the release-one catalogue index. */
export interface WagonFamilyIndexItem {
  /** Stable local identity used for DOM hooks and duplicate detection. */
  readonly id: string;
  /** Visible ordered catalogue position, such as `01`. */
  readonly sequence: string;
  /** Concise source-owned category label above the family heading. */
  readonly eyebrow: string;
  /** Caller-selected family heading. */
  readonly title: string;
  /** Source-preserved cargo-fit summary; it is not parsed into a claim. */
  readonly summary: string;
  /** Local C-004 wagon media with meaningful alternative text. */
  readonly media: ResponsiveMediaProps;
  /** Direct family destination; release one permits no filtering/search substitute. */
  readonly href: string;
  /** Visible native family-action label. */
  readonly linkLabel: string;
  /** Family-level provenance from F-002 source records. */
  readonly source: SourceAttribution;
}

export interface WagonFamilyIndexProps {
  /** Optional caller-owned heading for isolated or embedded uses. */
  readonly intro?: SectionIntroProps;
  /** The complete release-one family range: exactly five direct destinations. */
  readonly families: readonly WagonFamilyIndexItem[];
}
