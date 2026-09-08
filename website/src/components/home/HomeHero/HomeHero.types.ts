import type { ActionLinkProps } from "../../core/Action/Action.types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export interface HomeHeroTitleSegment {
  /** Visible title text; use emphasis only for intentional editorial contrast. */
  readonly text: string;
  /** Renders the segment in the brand-red emphasis treatment. */
  readonly emphasis?: boolean;
}

export type HomeHeroMedia = Omit<ResponsiveMediaProps, "loading" | "priority">;

export interface HomeHeroProps {
  /** Short source-owned context preceding the main proposition. */
  readonly eyebrow: string;
  /** Ordered title fragments, with caller-selected editorial emphasis. */
  readonly title: readonly HomeHeroTitleSegment[];
  /** Essential supporting proposition, rendered before media in source order. */
  readonly summary: string;
  /** The principal server-rendered route action. */
  readonly primaryAction: ActionLinkProps;
  /** Optional secondary route action, visually and semantically separate. */
  readonly secondaryLink?: ActionLinkProps;
  /** Local responsive media contract; the hero always prioritises its image. */
  readonly media: HomeHeroMedia;
  /** Optional caller-owned crop focus; the default preserves the established railway-image framing. */
  readonly mediaFocus?: "default" | "center";
}
