export type SectionIntroHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SectionIntroAlign = "left" | "center";

export type SectionIntroTheme = "light" | "dark";

export type SectionIntroMeasure = "narrow" | "standard" | "wide";

export interface SectionIntroProps {
  /** Optional contextual label, rendered before the heading. */
  readonly eyebrow?: string;
  /** Required heading text; callers select its semantic rank explicitly. */
  readonly title: string;
  /** Optional supporting editorial copy, rendered after the heading. */
  readonly description?: string;
  /** Semantic heading rank for the embedding document outline. */
  readonly headingLevel: SectionIntroHeadingLevel;
  /** Visual text alignment; it never changes source order. */
  readonly align: SectionIntroAlign;
  /** Foreground theme only; the embedding section owns its background. */
  readonly theme: SectionIntroTheme;
  /** Maximum readable text measure. */
  readonly measure: SectionIntroMeasure;
}
