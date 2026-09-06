import type { LegalDocumentProps } from "./LegalDocument.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

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
      if (!isNonEmpty(paragraph)) {
        throw new Error(
          `LegalDocument section ${sectionIndex + 1} paragraph ${paragraphIndex + 1} requires readable text.`,
        );
      }
    }
  }
}
