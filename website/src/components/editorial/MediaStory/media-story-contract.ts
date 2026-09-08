import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";

import type { MediaStoryProps } from "./MediaStory.types";

const isNonEmpty = (value: string) => value.trim().length > 0;

const isSafeDestination = (href: string): boolean => {
  if (!isNonEmpty(href) || href === "#" || /\s/.test(href)) return false;

  try {
    const destination = new URL(href, "https://component.transant.test");
    return ["http:", "https:"].includes(destination.protocol);
  } catch {
    return false;
  }
};

/** Fails before render for incomplete copy, unsafe actions, or ambiguous editorial media. */
export const validateMediaStoryProps = (props: MediaStoryProps): void => {
  if (!isNonEmpty(props.title)) {
    throw new Error("MediaStory requires a non-empty title.");
  }

  if (props.eyebrow !== undefined && !isNonEmpty(props.eyebrow)) {
    throw new Error("MediaStory eyebrow must be non-empty when supplied.");
  }

  if (props.description !== undefined && !isNonEmpty(props.description)) {
    throw new Error("MediaStory description must be non-empty when supplied.");
  }

  if (props.paragraphs?.some((paragraph) => !isNonEmpty(paragraph))) {
    throw new Error("MediaStory paragraphs must be non-empty when supplied.");
  }

  if (props.items?.some((item) => !isNonEmpty(item))) {
    throw new Error("MediaStory items must be non-empty when supplied.");
  }

  if (
    !Number.isInteger(props.headingLevel) ||
    props.headingLevel < 1 ||
    props.headingLevel > 6
  ) {
    throw new Error(
      "MediaStory headingLevel must be an integer from 1 through 6.",
    );
  }

  if (props.media) {
    assertResponsiveMediaContract(props.media);
    if (
      props.media.decorative === true ||
      !isNonEmpty(props.media.alt ?? "") ||
      !isNonEmpty(props.media.aspectRatio ?? "")
    ) {
      throw new Error(
        "MediaStory media requires meaningful alt text and an intentional aspect ratio.",
      );
    }
  }

  if (
    props.action &&
    (!isNonEmpty(props.action.label) || !isSafeDestination(props.action.href))
  ) {
    throw new Error(
      "MediaStory action requires a non-empty label and safe non-placeholder HTTP(S) or relative destination.",
    );
  }
};
