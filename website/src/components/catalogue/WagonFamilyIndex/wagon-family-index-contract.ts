import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type {
  WagonFamilyIndexItem,
  WagonFamilyIndexProps,
} from "./WagonFamilyIndex.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeFamilyPath = (href: string): boolean => {
  if (
    !isNonEmpty(href) ||
    /\s/.test(href) ||
    !href.startsWith("/") ||
    href.startsWith("//")
  ) {
    return false;
  }

  try {
    const destination = new URL(href, "https://component.transant.test");
    return destination.origin === "https://component.transant.test";
  } catch {
    return false;
  }
};

const validateFamily = (family: WagonFamilyIndexItem): void => {
  if (
    !isNonEmpty(family.id) ||
    !isNonEmpty(family.sequence) ||
    !isNonEmpty(family.eyebrow) ||
    !isNonEmpty(family.title) ||
    !isNonEmpty(family.summary) ||
    !isNonEmpty(family.linkLabel) ||
    !isNonEmpty(family.source.reference)
  ) {
    throw new Error(
      "WagonFamilyIndex families require non-empty identity, sequence, editorial copy, link label, and source reference.",
    );
  }

  if (!isSafeFamilyPath(family.href)) {
    throw new Error(
      "WagonFamilyIndex families require safe non-placeholder same-site paths.",
    );
  }

  assertResponsiveMediaContract(family.media);
  if (
    family.media.decorative === true ||
    !family.media.alt ||
    !isNonEmpty(family.media.alt) ||
    family.media.fit !== "contain" ||
    !family.media.aspectRatio ||
    !isNonEmpty(family.media.aspectRatio)
  ) {
    throw new Error(
      "WagonFamilyIndex family media requires meaningful alt text, contain fit, and an intentional aspect ratio.",
    );
  }
};

/** Fails before render for incomplete catalogue coverage, unsafe routes, or non-local media contracts. */
export const validateWagonFamilyIndexProps = (
  props: WagonFamilyIndexProps,
): void => {
  if (props.intro && !isNonEmpty(props.intro.title)) {
    throw new Error("WagonFamilyIndex requires a non-empty intro title.");
  }

  if (props.families.length !== 5) {
    throw new Error(
      "WagonFamilyIndex requires exactly five release-one family destinations.",
    );
  }

  props.families.forEach(validateFamily);

  const ids = props.families.map((family) => family.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("WagonFamilyIndex family identities must be unique.");
  }

  const destinations = props.families.map((family) => family.href);
  if (new Set(destinations).size !== destinations.length) {
    throw new Error("WagonFamilyIndex family destinations must be unique.");
  }
};
