import type {
  ModularPlatformSectionProps,
  ModularPlatformTechnicalLink,
} from "./ModularPlatformSection.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeReference = (href: string): boolean => {
  if (href.trim() === "#") return false;

  try {
    const reference = new URL(href, "https://component.transant.test");
    return ["http:", "https:"].includes(reference.protocol);
  } catch {
    return false;
  }
};

const validateTechnicalLink = (
  technicalLink: ModularPlatformTechnicalLink,
): void => {
  if (
    !isNonEmpty(technicalLink.label) ||
    !isSafeReference(technicalLink.href)
  ) {
    throw new Error(
      "ModularPlatformSection technicalLink requires a non-empty label and safe non-placeholder HTTP(S) reference.",
    );
  }
};

/** Fails before render when an equation would hide incomplete or unsafe stage data. */
export const validateModularPlatformSectionProps = (
  props: ModularPlatformSectionProps,
): void => {
  if (!isNonEmpty(props.intro.title)) {
    throw new Error("ModularPlatformSection requires a non-empty intro title.");
  }

  if (props.stages.length < 2 || props.stages.length > 6) {
    throw new Error(
      "ModularPlatformSection requires between two and six stages.",
    );
  }

  if (
    props.stages.some(
      ({ description, number, title }) =>
        !isNonEmpty(number) || !isNonEmpty(title) || !isNonEmpty(description),
    )
  ) {
    throw new Error(
      "ModularPlatformSection stages require non-empty number, title, and description values.",
    );
  }

  if (
    new Set(props.stages.map(({ number }) => number)).size !==
    props.stages.length
  ) {
    throw new Error("ModularPlatformSection stage numbers must be unique.");
  }

  if (props.technicalLink) validateTechnicalLink(props.technicalLink);
};
