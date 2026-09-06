import type { ContactCTAAction, ContactCTAProps } from "./ContactCTA.types";

const baseUrl = "https://component.transant.test";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

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

const validateAction = (action: ContactCTAAction, role: string): void => {
  if (!isNonEmpty(action.label) || !toSafeUrl(action.href)) {
    throw new Error(
      `ContactCTA ${role} requires a non-empty label and a safe non-placeholder HTTP(S) or relative destination.`,
    );
  }
};

/** Fails before render for missing copy, empty actions, unsafe URLs, and empty contexts. */
export const validateContactCTAProps = (props: ContactCTAProps): void => {
  if (!isNonEmpty(props.title) || !isNonEmpty(props.summary)) {
    throw new Error("ContactCTA requires non-empty title and summary copy.");
  }

  validateAction(props.action, "primary action");
  props.supportingLinks?.forEach((link) =>
    validateAction(link, "supporting link"),
  );

  if (props.context !== undefined && !isNonEmpty(props.context)) {
    throw new Error("ContactCTA context must be non-empty when supplied.");
  }
};

/** Adds the caller-owned context to the inquiry route without reading page or global state. */
export const contactCTAActionHref = (
  href: string,
  context?: string,
): string => {
  const url = toSafeUrl(href);
  if (!url) {
    throw new Error(
      "ContactCTA cannot compose context into an unsafe destination.",
    );
  }

  if (context !== undefined) {
    if (!isNonEmpty(context)) {
      throw new Error("ContactCTA context must be non-empty when supplied.");
    }
    url.searchParams.set("context", context.trim());
  }

  return href.startsWith("http:") || href.startsWith("https:")
    ? url.toString()
    : `${url.pathname}${url.search}${url.hash}`;
};
