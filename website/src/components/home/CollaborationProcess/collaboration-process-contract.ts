import type {
  CollaborationProcessContactLink,
  CollaborationProcessProps,
} from "./CollaborationProcess.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeReference = (href: string): boolean => {
  if (!isNonEmpty(href) || href.trim() === "#" || /\s/.test(href)) {
    return false;
  }

  try {
    const reference = new URL(href, "https://component.transant.test");
    return ["http:", "https:"].includes(reference.protocol);
  } catch {
    return false;
  }
};

const validateContactLink = (
  contactLink: CollaborationProcessContactLink,
): void => {
  if (!isNonEmpty(contactLink.label) || !isSafeReference(contactLink.href)) {
    throw new Error(
      "CollaborationProcess contactLink requires a non-empty label and safe non-placeholder HTTP(S) reference.",
    );
  }
};

/** Fails before render when the engagement sequence is incomplete or unsafe. */
export const validateCollaborationProcessProps = (
  props: CollaborationProcessProps,
): void => {
  if (!isNonEmpty(props.intro.title)) {
    throw new Error("CollaborationProcess requires a non-empty intro title.");
  }

  if (props.steps.length < 4 || props.steps.length > 6) {
    throw new Error(
      "CollaborationProcess requires between four and six steps.",
    );
  }

  if (
    props.steps.some(
      ({ description, number, title }) =>
        !isNonEmpty(number) || !isNonEmpty(title) || !isNonEmpty(description),
    )
  ) {
    throw new Error(
      "CollaborationProcess steps require non-empty number, title, and description values.",
    );
  }

  if (
    new Set(props.steps.map(({ number }) => number)).size !== props.steps.length
  ) {
    throw new Error("CollaborationProcess step numbers must be unique.");
  }

  if (props.contactLink) validateContactLink(props.contactLink);
};
