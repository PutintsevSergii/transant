import type { BaseLayoutProps } from "./BaseLayout.types";

const isNonEmpty = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const languagePattern = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/;

const isAbsoluteHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const isLocalAssetPath = (value: string): boolean =>
  value.startsWith("/") && !value.startsWith("//") && !/\s/.test(value);

/** Fails before render when document-level route data is incomplete or unsafe. */
export const assertBaseLayoutProps = (
  props: BaseLayoutProps,
): Required<Pick<BaseLayoutProps, "faviconHref">> & BaseLayoutProps => {
  if (!languagePattern.test(props.language)) {
    throw new Error("BaseLayout requires a valid language tag.");
  }

  if (!isNonEmpty(props.title)) {
    throw new Error("BaseLayout requires a non-empty title.");
  }

  if (!isNonEmpty(props.description)) {
    throw new Error("BaseLayout requires a non-empty description.");
  }

  if (!isAbsoluteHttpUrl(props.canonicalUrl)) {
    throw new Error("BaseLayout canonicalUrl must be an absolute HTTP(S) URL.");
  }

  const faviconHref = props.faviconHref ?? "/brand/transant-logo.png";
  if (!isLocalAssetPath(faviconHref)) {
    throw new Error(
      "BaseLayout faviconHref must be a local absolute asset path.",
    );
  }

  return { ...props, faviconHref };
};
