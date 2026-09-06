import { describe, expect, it } from "vitest";

import { validateLegalDocumentProps } from "../../src/components/legal/LegalDocument/legal-document-contract";
import type { LegalDocumentProps } from "../../src/components/legal/LegalDocument/LegalDocument.types";

const validProps = (): LegalDocumentProps => ({
  introduction: "A bounded legal-document introduction.",
  sections: [
    {
      title: "Company",
      paragraphs: ["A readable, source-approved legal statement."],
    },
  ],
});

describe("LegalDocument contract", () => {
  it("accepts a caller-owned ordered legal hierarchy", () => {
    expect(() => validateLegalDocumentProps(validProps())).not.toThrow();
  });

  it("rejects blank legal copy instead of publishing an ambiguous document", () => {
    expect(() =>
      validateLegalDocumentProps({ ...validProps(), introduction: " " }),
    ).toThrow("introductions");
    expect(() =>
      validateLegalDocumentProps({
        sections: [{ title: " ", paragraphs: ["Readable text."] }],
      }),
    ).toThrow("requires a heading");
    expect(() =>
      validateLegalDocumentProps({
        sections: [{ title: "Company", paragraphs: [" "] }],
      }),
    ).toThrow("requires readable text");
  });
});
