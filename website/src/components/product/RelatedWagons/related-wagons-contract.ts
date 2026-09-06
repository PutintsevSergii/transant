import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type {
  RelatedWagonEntry,
  RelatedWagonsProps,
} from "./RelatedWagons.types";

const isNonEmpty = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const isSafeProductPath = (value: string): boolean => {
  if (!/^\/(?:[a-z]{2}\/)?wagons\//u.test(value) || value.includes("//")) {
    return false;
  }

  try {
    const destination = new URL(value, "https://component.transant.test");
    const segmentCount = destination.pathname.split("/").filter(Boolean).length;
    const expectedSegmentCount = /^\/[a-z]{2}\/wagons\//u.test(value) ? 4 : 3;
    return (
      destination.origin === "https://component.transant.test" &&
      segmentCount === expectedSegmentCount &&
      !destination.search &&
      !destination.hash
    );
  } catch {
    return false;
  }
};

const validateMedia = (media: RelatedWagonEntry["media"]): void => {
  if (media === undefined) return;

  assertResponsiveMediaContract(media);
  if (
    media.decorative === true ||
    !isNonEmpty(media.alt) ||
    media.fit !== "contain" ||
    !isNonEmpty(media.aspectRatio)
  ) {
    throw new Error(
      "RelatedWagons media requires meaningful alt text, contain fit, and an intentional aspect ratio.",
    );
  }
};

const validateEntry = (
  entry: RelatedWagonEntry,
  currentProductId: string,
): void => {
  if (
    !isNonEmpty(entry.id) ||
    !isNonEmpty(entry.familyName) ||
    !isNonEmpty(entry.code) ||
    !isNonEmpty(entry.title) ||
    !isNonEmpty(entry.summary) ||
    !isNonEmpty(entry.linkLabel) ||
    !isNonEmpty(entry.source.reference)
  ) {
    throw new Error(
      "RelatedWagons entries require non-empty identity, product copy, action label, and relationship source reference.",
    );
  }

  if (entry.id === currentProductId) {
    throw new Error(
      "RelatedWagons entries must not reference the current product.",
    );
  }

  if (!isSafeProductPath(entry.href)) {
    throw new Error(
      "RelatedWagons entries require safe non-placeholder same-site product paths.",
    );
  }

  validateMedia(entry.media);
};

/** Fails before render for inferred, self-referential, duplicate, or unsafe relationships. */
export const validateRelatedWagonsProps = (props: RelatedWagonsProps): void => {
  if (!isNonEmpty(props.currentProductId) || !isNonEmpty(props.title)) {
    throw new Error(
      "RelatedWagons requires a non-empty current product identity and title.",
    );
  }

  props.related?.forEach((entry) =>
    validateEntry(entry, props.currentProductId),
  );

  const identities = props.related?.map((entry) => entry.id) ?? [];
  const destinations = props.related?.map((entry) => entry.href) ?? [];
  if (new Set(identities).size !== identities.length) {
    throw new Error("RelatedWagons relationship identities must be unique.");
  }
  if (new Set(destinations).size !== destinations.length) {
    throw new Error("RelatedWagons relationship destinations must be unique.");
  }
};

/** Applies F-002's publication boundary without changing caller-owned records. */
export const approvedRelatedWagonEntries = (
  related: RelatedWagonsProps["related"],
): readonly RelatedWagonEntry[] =>
  related?.filter((entry) => entry.publicationStatus === "approved") ?? [];
