import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export interface WagonModelListSource {
  /** Source reference preserved with the family or model record. */
  readonly reference: string;
}

export interface WagonModelListMediaFallback {
  /** Caller-owned visible explanation when no reviewed local render is available. */
  readonly label: string;
}

export interface WagonModelListItem {
  /** Stable caller-owned identity for one model card. */
  readonly id: string;
  /** Source-preserved engineering/model code. */
  readonly code: string;
  /** Caller-owned product name. */
  readonly title: string;
  /** Source-attributed editorial model summary; never inferred by the component. */
  readonly summary: string;
  /** Caller-owned label for the source-derived detail list. */
  readonly detailLabel: string;
  /** Source-derived supporting details; never inferred by the component. */
  readonly details: readonly string[];
  /** Direct same-site product destination. */
  readonly href: string;
  /** Visible native-action label. */
  readonly linkLabel: string;
  /** Provenance for this product presentation. */
  readonly source: WagonModelListSource;
  /** Reviewed local C-004 wagon media, when supplied. */
  readonly media?: ResponsiveMediaProps;
  /** Explicit visible state when the caller has no reviewed render to supply. */
  readonly mediaFallback?: WagonModelListMediaFallback;
}

export interface WagonModelListFamily {
  /** Stable family identity; it scopes the rendered model list. */
  readonly id: string;
  /** Provenance for the family-level list context. */
  readonly source: WagonModelListSource;
}

export interface WagonModelListProps {
  /** Caller-owned family context; this component does not read route state. */
  readonly family: WagonModelListFamily;
  /** One or more direct product destinations for the supplied family. */
  readonly models: readonly WagonModelListItem[];
}
