import type { SectionIntroHeadingLevel } from "../../core/SectionIntro/SectionIntro.types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export type MediaStoryTheme = "light" | "dark";

/** Lets an editorial assembly opt into additional top breathing room. */
export type MediaStorySpacing = "standard" | "generous-top";

/** Lets an editorial assembly choose a calmer visual scale for a dense title. */
export type MediaStoryHeadingSize = "standard" | "compact";

/** Controls server HTML order and is never changed by a responsive breakpoint. */
export type MediaStoryMediaPosition = "before" | "after";

/** MediaStory is non-critical editorial media, so it keeps C-004's lazy default. */
export type MediaStoryMedia = Omit<
  ResponsiveMediaProps,
  "loading" | "priority"
>;

export interface MediaStoryAction {
  /** A real caller-owned destination for the optional native action. */
  readonly href: string;
  /** Visible, concise action label. */
  readonly label: string;
  /** Opts into C-002's safe external-link treatment. */
  readonly external?: boolean;
}

export interface MediaStoryProps {
  /** Optional contextual label rendered before the story heading. */
  readonly eyebrow?: string;
  /** Caller-owned editorial heading. */
  readonly title: string;
  /** Optional supporting editorial copy. */
  readonly description?: string;
  /** Optional additional paragraphs retained in caller-owned source order. */
  readonly paragraphs?: readonly string[];
  /** Optional factual or explanatory list retained in caller-owned source order. */
  readonly items?: readonly string[];
  /** Semantic rank chosen by the embedding document. */
  readonly headingLevel: SectionIntroHeadingLevel;
  /** Owns the section surface and matching C-003 foreground treatment. */
  readonly theme: MediaStoryTheme;
  /** Optional vertical rhythm selected by the embedding editorial page. */
  readonly spacing?: MediaStorySpacing;
  /** Optional title scale selected by the embedding editorial page. */
  readonly headingSize?: MediaStoryHeadingSize;
  /** Optional meaningful local C-004 editorial media. */
  readonly media?: MediaStoryMedia;
  /** Persistent title/media source order selected by the caller. */
  readonly mediaPosition?: MediaStoryMediaPosition;
  /** Optional C-002 native link after the editorial text. */
  readonly action?: MediaStoryAction;
}
