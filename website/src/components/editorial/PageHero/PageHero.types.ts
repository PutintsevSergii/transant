import type { SectionIntroHeadingLevel } from "../../core/SectionIntro/SectionIntro.types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export type PageHeroTheme = "light" | "dark";

export type PageHeroMediaPosition = "before" | "after";

/** PageHero owns priority loading; callers only describe meaningful local media. */
export type PageHeroMedia = Omit<ResponsiveMediaProps, "loading" | "priority">;

export interface PageHeroAction {
  /** A real caller-owned destination for the optional native action. */
  readonly href: string;
  /** Visible action label. */
  readonly label: string;
  /** Opts into C-002's safe external-link treatment. */
  readonly external?: boolean;
}

export interface PageHeroProps {
  /** Optional contextual label rendered before the document or section heading. */
  readonly eyebrow?: string;
  /** Caller-owned page or section heading. */
  readonly title: string;
  /** Optional supporting editorial summary. */
  readonly description?: string;
  /** Semantic rank selected by the embedding document. */
  readonly headingLevel: SectionIntroHeadingLevel;
  /** Owns the PageHero surface and matching C-003 foreground treatment. */
  readonly theme: PageHeroTheme;
  /** Shows the shared technical-grid surface; enabled by default. */
  readonly technicalBackground?: boolean;
  /** Optional meaningful local editorial media. */
  readonly media?: PageHeroMedia;
  /** Server-rendered title/media source order; it never changes by viewport. */
  readonly mediaPosition?: PageHeroMediaPosition;
  /** Optional native C-002 action. */
  readonly action?: PageHeroAction;
}
