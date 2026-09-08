import type { ImageMetadata } from "astro";

/** One caller-owned, locally rendered wagon family offered by the switchyard. */
export interface WagonFamilySummary {
  /** Stable instance-local selection key. */
  readonly id: string;
  /** Visible route sequence such as `01`; it is never inferred from array order. */
  readonly sequence: string;
  /** Family identity shown in the selector and active result. */
  readonly familyName: string;
  /** Source-preserved representative model code. */
  readonly modelCode: string;
  /** Short cargo-fit or family proposition. */
  readonly headline: string;
  /** Source-derived family description. */
  readonly summary: string;
  /** Build-owned wagon image imported from `src/assets/`. */
  readonly image: ImageMetadata;
  /** Optional caller-owned stage scale for an unusually tall or wide render. */
  readonly mediaScale?: "reduced";
  /** Direct family catalogue destination; it remains usable without JavaScript. */
  readonly href: string;
  /** Visible, caller-owned label for the direct family route. */
  readonly linkLabel: string;
  /** Optional compact supporting label; absence intentionally renders nothing. */
  readonly technicalLabel?: string;
}

export interface WagonSwitchyardProps {
  /** Caller-supplied stable ID isolates progressive-enhancement instances. */
  readonly id: string;
  /** Semantic section heading; the page controls its outline rank. */
  readonly heading: string;
  /** Optional short label before the heading. */
  readonly eyebrow?: string;
  /** Optional source-safe introduction below the heading. */
  readonly summary?: string;
  /** Short instruction shown above the family selector. */
  readonly selectionLabel?: string;
  /** Accessible name for the family selector. */
  readonly selectionAriaLabel?: string;
  /** Optional supporting guidance shown below the selector. */
  readonly supportingCopy?: readonly [string, string];
  /** Exactly five family summaries, ordered as the intended visible rail. */
  readonly families: readonly [
    WagonFamilySummary,
    WagonFamilySummary,
    WagonFamilySummary,
    WagonFamilySummary,
    WagonFamilySummary,
  ];
}
