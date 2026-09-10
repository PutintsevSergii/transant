import type { LegalDocumentProps } from "./LegalDocument.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;
const isSafeHttpsReference = (href: string): boolean => {
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
};

/** Rejects incomplete legal copy rather than emitting an ambiguous document. */
export function validateLegalDocumentProps(props: LegalDocumentProps): void {
  if (props.introduction !== undefined && !isNonEmpty(props.introduction)) {
    throw new Error(
      "LegalDocument introductions must be omitted or contain readable text.",
    );
  }

  for (const [sectionIndex, section] of props.sections.entries()) {
    if (!isNonEmpty(section.title)) {
      throw new Error(
        `LegalDocument section ${sectionIndex + 1} requires a heading.`,
      );
    }

    for (const [paragraphIndex, paragraph] of section.paragraphs.entries()) {
      const readable =
        typeof paragraph === "string"
          ? isNonEmpty(paragraph)
          : isNonEmpty(paragraph.text);
      if (!readable) {
        throw new Error(
          `LegalDocument section ${sectionIndex + 1} paragraph ${paragraphIndex + 1} requires readable text.`,
        );
      }
      if (
        typeof paragraph !== "string" &&
        paragraph.link !== undefined &&
        (!isNonEmpty(paragraph.link.label) ||
          !isSafeHttpsReference(paragraph.link.href))
      ) {
        throw new Error(
          `LegalDocument section ${sectionIndex + 1} paragraph ${paragraphIndex + 1} requires a labelled HTTPS reference.`,
        );
      }
    }
  }
}
