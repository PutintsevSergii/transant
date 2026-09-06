import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type {
  WagonModelListItem,
  WagonModelListProps,
  WagonModelListSource,
} from "./WagonModelList.types";

const isNonEmpty = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const isSafeModelPath = (value: string): boolean => {
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

const validateSource = (
  source: WagonModelListSource,
  subject: string,
): void => {
  if (!isNonEmpty(source.reference)) {
    throw new Error(`${subject} requires a non-empty source reference.`);
  }
};

const validateModel = (model: WagonModelListItem): void => {
  if (
    !isNonEmpty(model.id) ||
    !isNonEmpty(model.code) ||
    !isNonEmpty(model.title) ||
    !isNonEmpty(model.summary) ||
    !isNonEmpty(model.detailLabel) ||
    model.details.length < 1 ||
    model.details.some((detail) => !isNonEmpty(detail)) ||
    !isNonEmpty(model.linkLabel)
  ) {
    throw new Error(
      "WagonModelList models require non-empty identity, code, editorial copy, details, and action label.",
    );
  }

  if (!isSafeModelPath(model.href)) {
    throw new Error(
      "WagonModelList models require safe non-placeholder same-site product paths.",
    );
  }

  validateSource(model.source, "WagonModelList model provenance");

  if (model.media && model.mediaFallback) {
    throw new Error(
      "WagonModelList models accept either reviewed local media or one explicit media fallback, not both.",
    );
  }

  if (model.media) {
    assertResponsiveMediaContract(model.media);
    if (
      model.media.decorative === true ||
      !isNonEmpty(model.media.alt) ||
      model.media.fit !== "contain" ||
      !isNonEmpty(model.media.aspectRatio)
    ) {
      throw new Error(
        "WagonModelList model media requires meaningful alt text, contain fit, and an intentional aspect ratio.",
      );
    }
  } else if (!isNonEmpty(model.mediaFallback?.label)) {
    throw new Error(
      "WagonModelList models without reviewed media require an explicit visible media fallback.",
    );
  }
};

/** Fails before render for incomplete models, unsafe links, or ambiguous media states. */
export const validateWagonModelListProps = (
  props: WagonModelListProps,
): void => {
  if (!isNonEmpty(props.family.id)) {
    throw new Error("WagonModelList requires a non-empty family identity.");
  }
  validateSource(props.family.source, "WagonModelList family provenance");

  if (props.models.length < 1) {
    throw new Error("WagonModelList requires at least one direct model.");
  }

  props.models.forEach(validateModel);
  const ids = props.models.map((model) => model.id);
  const destinations = props.models.map((model) => model.href);
  if (new Set(ids).size !== ids.length) {
    throw new Error("WagonModelList model identities must be unique.");
  }
  if (new Set(destinations).size !== destinations.length) {
    throw new Error("WagonModelList model destinations must be unique.");
  }
};
