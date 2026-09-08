import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type { PageHeroProps } from "./PageHero.types";

const baseUrl = "https://component.transant.test";

const isNonEmpty = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const isSafeDestination = (href: string): boolean => {
  if (!isNonEmpty(href) || href.trim() === "#" || /\s/.test(href)) {
    return false;
  }

  try {
    const url = new URL(href, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

/** Fails before render for incomplete copy, unsafe actions, or ambiguous optional media. */
export const validatePageHeroProps = (props: PageHeroProps): void => {
  if (!isNonEmpty(props.title)) {
    throw new Error("PageHero requires a non-empty title.");
  }

  if (props.eyebrow !== undefined && !isNonEmpty(props.eyebrow)) {
    throw new Error("PageHero eyebrow must be non-empty when supplied.");
  }

  if (props.description !== undefined && !isNonEmpty(props.description)) {
    throw new Error("PageHero description must be non-empty when supplied.");
  }

  if (
    !Number.isInteger(props.headingLevel) ||
    props.headingLevel < 1 ||
    props.headingLevel > 6
  ) {
    throw new Error(
      "PageHero headingLevel must be an integer from 1 through 6.",
    );
  }

  if (
    props.technicalBackground !== undefined &&
    typeof props.technicalBackground !== "boolean"
  ) {
    throw new Error(
      "PageHero technicalBackground must be a boolean when supplied.",
    );
  }

  if (props.media) {
    if (
      props.media.preserveNaturalAspectRatio !== undefined &&
      typeof props.media.preserveNaturalAspectRatio !== "boolean"
    ) {
      throw new Error(
        "PageHero media preserveNaturalAspectRatio must be a boolean when supplied.",
      );
    }
    assertResponsiveMediaContract(props.media);
    if (
      props.media.decorative === true ||
      !isNonEmpty(props.media.alt) ||
      !isNonEmpty(props.media.aspectRatio)
    ) {
      throw new Error(
        "PageHero media requires meaningful alt text and an intentional aspect ratio.",
      );
    }
  }

  if (
    props.action &&
    (!isNonEmpty(props.action.label) || !isSafeDestination(props.action.href))
  ) {
    throw new Error(
      "PageHero action requires a non-empty label and safe non-placeholder HTTP(S) or relative destination.",
    );
  }
};
