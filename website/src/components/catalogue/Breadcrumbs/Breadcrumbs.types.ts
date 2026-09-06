/** One caller-owned route in an ordered location path. The last item is current, not a link. */
export interface BreadcrumbsItem {
  /** Complete accessible and structured-data name for this location. */
  readonly label: string;
  /** Canonical same-site path used for earlier links and every JSON-LD item. */
  readonly href: string;
  /** Optional compact visual label; the complete label remains available to assistive technology. */
  readonly compactLabel?: string;
}

export interface BreadcrumbsProps {
  /** Ordered path from the site root through the current non-linked location. */
  readonly items: readonly BreadcrumbsItem[];
  /** Caller-owned absolute public site URL used to form valid canonical JSON-LD destinations. */
  readonly baseUrl: string;
  /** Accessible navigation landmark name. Defaults to `Breadcrumb`. */
  readonly label?: string;
}
