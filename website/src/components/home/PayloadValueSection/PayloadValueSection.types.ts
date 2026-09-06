import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** A single engineering principle shown beneath the editorial proposition. */
export interface PayloadValuePrinciple {
  /** Short, caller-owned principle heading. */
  readonly title: string;
  /** Supporting explanation; it wraps instead of being truncated. */
  readonly description: string;
}

/** Optional source attribution rendered as an ordinary, same-context link. */
export interface PayloadValueSourceLink {
  /** A non-empty absolute, root-relative, fragment, or relative reference. */
  readonly href: string;
  /** Visible attribution label. */
  readonly label: string;
}

export interface PayloadValueSectionProps {
  /** Caller-owned introductory lockup; the embedding page owns its heading rank. */
  readonly intro: SectionIntroProps;
  /** Explanatory editorial copy rendered after the introduction. */
  readonly body: string;
  /** Exactly three or four supporting engineering principles. */
  readonly principles:
    | readonly [
        PayloadValuePrinciple,
        PayloadValuePrinciple,
        PayloadValuePrinciple,
      ]
    | readonly [
        PayloadValuePrinciple,
        PayloadValuePrinciple,
        PayloadValuePrinciple,
        PayloadValuePrinciple,
      ];
  /** Optional attribution or deeper source route; absent means no empty link. */
  readonly sourceLink?: PayloadValueSourceLink;
}
