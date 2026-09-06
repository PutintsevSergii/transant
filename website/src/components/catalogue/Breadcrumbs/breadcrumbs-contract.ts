import type { BreadcrumbsItem, BreadcrumbsProps } from "./Breadcrumbs.types";

export interface BreadcrumbsJsonLd {
  readonly "@context": "https://schema.org";
  readonly "@type": "BreadcrumbList";
  readonly itemListElement: readonly {
    readonly "@type": "ListItem";
    readonly position: number;
    readonly name: string;
    readonly item: string;
  }[];
}

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const toBaseUrl = (value: string): URL | undefined => {
  if (!isNonEmpty(value) || /\s/.test(value)) {
    return undefined;
  }

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
};

const toCanonicalUrl = (href: string, baseUrl: URL): URL | undefined => {
  if (
    !isNonEmpty(href) ||
    /\s/.test(href) ||
    !href.startsWith("/") ||
    href.startsWith("//")
  ) {
    return undefined;
  }

  try {
    const url = new URL(href, baseUrl);
    return url.origin === baseUrl.origin ? url : undefined;
  } catch {
    return undefined;
  }
};

const validateItem = (item: BreadcrumbsItem, baseUrl: URL): void => {
  if (!isNonEmpty(item.label)) {
    throw new Error("Breadcrumbs items require non-empty labels.");
  }

  if (!toCanonicalUrl(item.href, baseUrl)) {
    throw new Error(
      "Breadcrumbs items require safe same-site canonical paths that begin with a single slash.",
    );
  }

  if (item.compactLabel !== undefined && !isNonEmpty(item.compactLabel)) {
    throw new Error(
      "Breadcrumbs compact labels must be non-empty when supplied.",
    );
  }
};

/** Fails before render for missing paths, malformed canonical data, and ambiguous labels. */
export const validateBreadcrumbsProps = (props: BreadcrumbsProps): void => {
  const baseUrl = toBaseUrl(props.baseUrl);
  if (!baseUrl) {
    throw new Error(
      "Breadcrumbs requires a caller-owned absolute HTTP(S) base URL for structured data.",
    );
  }

  if (props.items.length === 0) {
    throw new Error("Breadcrumbs requires at least one current location item.");
  }

  if (props.label !== undefined && !isNonEmpty(props.label)) {
    throw new Error(
      "Breadcrumbs navigation label must be non-empty when supplied.",
    );
  }

  props.items.forEach((item) => validateItem(item, baseUrl));

  const destinations = props.items.map((item) => item.href);
  if (new Set(destinations).size !== destinations.length) {
    throw new Error("Breadcrumbs items must not repeat canonical paths.");
  }
};

/** Returns canonical schema.org data without reading route, browser, or environment state. */
export const breadcrumbsJsonLd = (
  props: BreadcrumbsProps,
): BreadcrumbsJsonLd => {
  validateBreadcrumbsProps(props);
  const baseUrl = toBaseUrl(props.baseUrl);

  if (!baseUrl) {
    throw new Error("Breadcrumbs requires a valid base URL.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: props.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label.trim(),
      item: new URL(item.href, baseUrl).toString(),
    })),
  };
};

/** Escapes JSON script-sensitive characters while preserving valid structured data. */
export const breadcrumbsJsonLdScript = (props: BreadcrumbsProps): string =>
  JSON.stringify(breadcrumbsJsonLd(props)).replace(/</g, "\\u003c");
