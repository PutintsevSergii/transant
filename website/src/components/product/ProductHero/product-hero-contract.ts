import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type { ProductHeroProps } from "./ProductHero.types";

const baseUrl = "https://component.transant.test";

const isNonEmpty = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const toSafeUrl = (href: string): URL | undefined => {
  if (!isNonEmpty(href) || href.trim() === "#" || /\s/.test(href)) {
    return undefined;
  }

  try {
    const url = new URL(href, baseUrl);
    return ["http:", "https:"].includes(url.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
};

/** Fails before render for incomplete identity, ambiguous wagon media, facts, or inquiry routes. */
export const validateProductHeroProps = (props: ProductHeroProps): void => {
  if (
    !isNonEmpty(props.family) ||
    !isNonEmpty(props.code) ||
    !isNonEmpty(props.title) ||
    !isNonEmpty(props.benefit)
  ) {
    throw new Error(
      "ProductHero requires non-empty family, code, title, and benefit copy.",
    );
  }

  assertResponsiveMediaContract(props.media);
  if (
    props.media.decorative === true ||
    !isNonEmpty(props.media.alt) ||
    props.media.fit !== "contain" ||
    !isNonEmpty(props.media.aspectRatio)
  ) {
    throw new Error(
      "ProductHero media requires meaningful alt text, contain fit, and an intentional aspect ratio.",
    );
  }

  if (props.facts.length < 1 || props.facts.length > 4) {
    throw new Error("ProductHero requires one to four decisive facts.");
  }
  if (
    props.facts.some(
      (fact) =>
        !isNonEmpty(fact.label) ||
        !isNonEmpty(fact.value) ||
        !isNonEmpty(fact.source.reference),
    )
  ) {
    throw new Error(
      "ProductHero facts require non-empty labels, values, and source references.",
    );
  }

  if (
    !isNonEmpty(props.inquiryAction.label) ||
    !toSafeUrl(props.inquiryAction.href)
  ) {
    throw new Error(
      "ProductHero inquiry action requires a non-empty label and safe non-placeholder HTTP(S) or relative destination.",
    );
  }

  if (props.inquiryContext !== undefined && !isNonEmpty(props.inquiryContext)) {
    throw new Error(
      "ProductHero inquiry context must be non-empty when supplied.",
    );
  }
};

/** Adds an explicit caller-owned product context without reading route or global state. */
export const productHeroInquiryHref = (
  href: string,
  context?: string,
): string => {
  const url = toSafeUrl(href);
  if (!url) {
    throw new Error(
      "ProductHero cannot compose inquiry context into an unsafe destination.",
    );
  }
  if (context !== undefined) {
    if (!isNonEmpty(context)) {
      throw new Error(
        "ProductHero inquiry context must be non-empty when supplied.",
      );
    }
    url.searchParams.set("context", context.trim());
  }

  return href.startsWith("http:") || href.startsWith("https:")
    ? url.toString()
    : `${url.pathname}${url.search}${url.hash}`;
};
