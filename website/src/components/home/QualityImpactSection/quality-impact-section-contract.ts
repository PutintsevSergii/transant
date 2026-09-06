import type {
  QualityImpactCertificate,
  QualityImpactEvidenceLink,
  QualityImpactSectionProps,
  QualityImpactTopic,
} from "./QualityImpactSection.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const hasSourceReference = (source: { readonly reference: string }): boolean =>
  isNonEmpty(source.reference);

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

const validateEvidenceLink = (link: QualityImpactEvidenceLink): void => {
  if (
    !isNonEmpty(link.label) ||
    !isSafeReference(link.href) ||
    !hasSourceReference(link.source)
  ) {
    throw new Error(
      "QualityImpactSection evidence links require non-empty labels, safe non-placeholder HTTP(S) references, and source references.",
    );
  }
};

const validateCertificate = (certificate: QualityImpactCertificate): void => {
  if (
    !isNonEmpty(certificate.identifier) ||
    !isNonEmpty(certificate.issuer) ||
    !isNonEmpty(certificate.scope) ||
    !hasSourceReference(certificate.source)
  ) {
    throw new Error(
      "QualityImpactSection certificate metadata requires identifier, issuer, scope, and source reference.",
    );
  }
};

const validateTopic = (topic: QualityImpactTopic): void => {
  if (
    !isNonEmpty(topic.title) ||
    !isNonEmpty(topic.summary) ||
    !hasSourceReference(topic.source)
  ) {
    throw new Error(
      "QualityImpactSection topics require non-empty title, summary, and source reference.",
    );
  }

  if (topic.evidenceLinks.length === 0) {
    throw new Error(
      "QualityImpactSection topics require at least one source-attributed evidence link.",
    );
  }

  topic.evidenceLinks.forEach(validateEvidenceLink);

  if (topic.certificate && topic.statementType !== "certification") {
    throw new Error(
      "QualityImpactSection certificate metadata is permitted only for certification topics.",
    );
  }

  if (topic.statementType === "certification" && !topic.certificate) {
    throw new Error(
      "QualityImpactSection certification topics require certificate metadata.",
    );
  }

  if (topic.certificate) validateCertificate(topic.certificate);
};

/** Fails before render for incomplete provenance, unsafe evidence, or flattened certificate data. */
export const validateQualityImpactSectionProps = (
  props: QualityImpactSectionProps,
): void => {
  if (!isNonEmpty(props.intro.title)) {
    throw new Error("QualityImpactSection requires a non-empty intro title.");
  }

  if (props.topics.length < 2) {
    throw new Error("QualityImpactSection requires at least two topics.");
  }

  props.topics.forEach(validateTopic);
};

/** Keeps F-002 publication policy at this presentation boundary without mutating caller data. */
export const approvedQualityImpactTopics = (
  topics: QualityImpactSectionProps["topics"],
): readonly QualityImpactTopic[] =>
  topics.filter((topic) => topic.publicationStatus === "approved");
