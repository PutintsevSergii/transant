import type {
  PayloadValueSectionProps,
  PayloadValueSourceLink,
} from "./PayloadValueSection.types";

const isNonEmpty = (value: string) => value.trim().length > 0;

const isSafeReference = (href: string) => {
  try {
    const reference = new URL(href, "https://component.transant.test");
    return ["http:", "https:"].includes(reference.protocol);
  } catch {
    return false;
  }
};

/** Fails fast for invalid caller data rather than rendering empty editorial content. */
export const validatePayloadValueSectionProps = (
  props: PayloadValueSectionProps,
): void => {
  if (!isNonEmpty(props.intro.title) || !isNonEmpty(props.body)) {
    throw new Error(
      "PayloadValueSection requires non-empty intro title and body.",
    );
  }

  if (props.principles.length < 3 || props.principles.length > 4) {
    throw new Error(
      "PayloadValueSection requires exactly three or four principles.",
    );
  }

  if (
    props.principles.some(
      (principle) =>
        !isNonEmpty(principle.title) || !isNonEmpty(principle.description),
    )
  ) {
    throw new Error(
      "PayloadValueSection principles require titles and descriptions.",
    );
  }

  if (props.sourceLink) {
    validateSourceLink(props.sourceLink);
  }
};

const validateSourceLink = (sourceLink: PayloadValueSourceLink): void => {
  if (!isNonEmpty(sourceLink.label) || !isSafeReference(sourceLink.href)) {
    throw new Error(
      "PayloadValueSection sourceLink requires a non-empty label and safe HTTP(S) reference.",
    );
  }
};
