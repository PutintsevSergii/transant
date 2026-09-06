import { assertResponsiveMediaContract } from "../../core/ResponsiveMedia/responsive-media-contract";
import type {
  OperationalCaseStudyLink,
  OperationalCaseStudyProps,
} from "./OperationalCaseStudy.types";

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

const validateLink = (
  link: OperationalCaseStudyLink,
  name: "href" | "download",
): void => {
  if (!isNonEmpty(link.label) || !isSafeDestination(link.href)) {
    throw new Error(
      `OperationalCaseStudy ${name} requires a non-empty label and safe non-placeholder destination.`,
    );
  }
};

/**
 * Enforces render-safe evidence boundaries. Unapproved facts are valid inputs
 * but are intentionally excluded by `approvedOperationalCaseStudyFacts`.
 */
export const validateOperationalCaseStudyProps = (
  props: OperationalCaseStudyProps,
): void => {
  if (
    !isNonEmpty(props.eyebrow) ||
    !isNonEmpty(props.title) ||
    !isNonEmpty(props.summary)
  ) {
    throw new Error(
      "OperationalCaseStudy requires non-empty eyebrow, title, and summary.",
    );
  }

  assertResponsiveMediaContract(props.media);
  if (
    props.media.decorative === true ||
    !props.media.alt ||
    !isNonEmpty(props.media.alt) ||
    props.media.fit !== "cover" ||
    !props.media.aspectRatio ||
    !isNonEmpty(props.media.aspectRatio)
  ) {
    throw new Error(
      "OperationalCaseStudy media requires meaningful alt text, cover fit, and an intentional aspect ratio.",
    );
  }

  if (
    props.facts.some(
      (fact) =>
        !isNonEmpty(fact.label) ||
        !isNonEmpty(fact.value) ||
        !isNonEmpty(fact.source.reference),
    )
  ) {
    throw new Error(
      "OperationalCaseStudy facts require non-empty labels, values, and source references.",
    );
  }

  if (props.href) validateLink(props.href, "href");
  if (props.download) validateLink(props.download, "download");
};

/** Keeps publication policy at the component boundary and preserves source order. */
export const approvedOperationalCaseStudyFacts = (
  facts: OperationalCaseStudyProps["facts"],
) => facts.filter((fact) => fact.publicationStatus === "approved");
