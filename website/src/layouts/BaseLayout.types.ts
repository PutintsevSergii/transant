import type { SiteFooterProps } from "../components/shell/SiteFooter/SiteFooter.types";
import type { SiteHeaderProps } from "../components/shell/SiteHeader/SiteHeader.types";

export interface BaseLayoutProps {
  /** Valid document language supplied by the route or page assembler. */
  readonly language: string;
  /** Unique, human-readable document title. */
  readonly title: string;
  /** Concise page-specific summary for search and social metadata. */
  readonly description: string;
  /** Absolute public URL selected by the route assembler. */
  readonly canonicalUrl: string;
  /** Caller-owned accessible label for the main-content skip link. */
  readonly skipLinkLabel?: string;
  /** Caller-owned, server-rendered global navigation data. */
  readonly header: SiteHeaderProps;
  /** Caller-owned, verified footer navigation and contact data. */
  readonly footer: SiteFooterProps;
  /** Local raster favicon path; defaults to the immutable approved brand asset. */
  readonly faviconHref?: string;
}
