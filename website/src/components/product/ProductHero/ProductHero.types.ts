import type { SourceAttribution } from "../../../domain/content/types";
import type { ResponsiveMediaProps } from "../../core/ResponsiveMedia/ResponsiveMedia.types";

export interface ProductHeroFact {
  /** Source-preserved, concise specification label. */
  readonly label: string;
  /** Source-preserved display value; this component never normalizes it. */
  readonly value: string;
  /** Visible provenance for this decisive fact. */
  readonly source: SourceAttribution;
}

export interface ProductHeroInquiryAction {
  /** A real caller-owned inquiry destination. */
  readonly href: string;
  /** Visible native-action label. */
  readonly label: string;
  /** Enables C-002's safe external-link treatment when needed. */
  readonly external?: boolean;
}

export type ProductHeroMedia = Omit<
  ResponsiveMediaProps,
  "loading" | "priority"
>;

export interface ProductHeroProps {
  /** Caller-owned product-family identity; this component does not read routes. */
  readonly family: string;
  /** Source-preserved model or wagon-type code. */
  readonly code: string;
  /** The product-page document heading. */
  readonly title: string;
  /** One approved caller-owned cargo-fit or product-benefit statement. */
  readonly benefit: string;
  /** A reviewed local transparent wagon render with explicit containment geometry. */
  readonly media: ProductHeroMedia;
  /** One to four source-attributed decisive facts in caller-selected order. */
  readonly facts: readonly ProductHeroFact[];
  /** The product's primary server-rendered inquiry route. */
  readonly inquiryAction: ProductHeroInquiryAction;
  /** Optional caller-owned context, encoded only into the inquiry URL. */
  readonly inquiryContext?: string;
}
