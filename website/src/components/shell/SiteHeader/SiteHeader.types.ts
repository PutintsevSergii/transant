export interface SiteHeaderNavigationItem {
  /** Visible top-level navigation label. */
  readonly label: string;
  /** Server-rendered internal or approved external destination. */
  readonly href: string;
}

export interface SiteHeaderLocaleOption {
  /** Short locale label, for example `EN`. */
  readonly label: string;
  /** Human-readable locale name shown in the expandable selector. */
  readonly name?: string;
  /** Server-rendered locale destination. */
  readonly href: string;
  /** Identifies the active locale without inspecting the browser location. */
  readonly current?: boolean;
}

export interface SiteHeaderContactAction {
  /** Concise inquiry label. */
  readonly label: string;
  /** Server-rendered inquiry destination. */
  readonly href: string;
}

export interface SiteHeaderLabels {
  readonly menu?: string;
  readonly closeMenu?: string;
  readonly siteNavigation?: string;
  readonly primaryNavigation?: string;
  readonly localeSelection?: string;
  readonly language?: string;
}

export interface SiteHeaderProps {
  /** Stable unique instance name when more than one header shares a document. */
  readonly id?: string;
  /** Destination supplied to the immutable linked logo. */
  readonly homeHref: string;
  /** Top-level, always-rendered primary navigation. */
  readonly navigation: readonly SiteHeaderNavigationItem[];
  /** Route data supplied by the caller for the active primary destination. */
  readonly currentPath: string;
  /** Explicit approved locale destinations; no browser locale inspection occurs. */
  readonly localeOptions?: readonly SiteHeaderLocaleOption[];
  /** Optional translated labels for the shell's non-route UI. */
  readonly labels?: SiteHeaderLabels;
  /** Compact inquiry action reused in the wide bar and compact panel. */
  readonly contactAction: SiteHeaderContactAction;
  /** Keeps the calm shell visible while a caller scrolls a complete page. */
  readonly sticky?: boolean;
}
