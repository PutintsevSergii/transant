import { describe, expect, it } from "vitest";

import {
  contactPageViewModel,
  legalPageViewModel,
} from "../../src/adapters/content/legal-page-view-model";
import { localizeViewModel } from "../../src/adapters/content/localized-view-model";
import type { SiteLocale } from "../../src/adapters/content/site-shell-view-model";
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
    expect(() =>
      validateLegalDocumentProps({
        sections: [
          {
            title: "Trade law",
            paragraphs: [
              {
                text: "Applicable legislation:",
                link: { label: "RIS", href: "https://www.ris.bka.gv.at/" },
              },
            ],
          },
        ],
      }),
    ).not.toThrow();
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
    expect(() =>
      validateLegalDocumentProps({
        sections: [
          {
            title: "Trade law",
            paragraphs: [
              {
                text: "Applicable legislation:",
                link: { label: "RIS", href: "http://example.com/" },
              },
            ],
          },
        ],
      }),
    ).toThrow("labelled HTTPS reference");
  });

  it("keeps the approved legal correction complete in every public locale", () => {
    const locales: readonly Exclude<SiteLocale, "en">[] = [
      "de",
      "uk",
      "pl",
      "cs",
    ];
    const englishSectionTitles = new Set([
      "Controller and contact",
      "Personal data",
      "Contacting us",
      "Cookies and analytics",
      "Retention",
      "Your rights",
      "Data security",
      "Company and register information",
      "Trade and professional information",
      "Contact information",
      "Copyright and permitted use",
      "Liability and external links",
      "Language",
    ]);
    const visibleLegalStrings = (
      page: ReturnType<typeof legalPageViewModel>,
    ): string[] =>
      [
        page.layout.title,
        page.layout.description,
        page.hero.eyebrow,
        page.hero.title,
        page.hero.description,
        page.document.introduction,
        ...page.document.sections.flatMap((section) => [
          section.title,
          ...section.paragraphs.map((paragraph) =>
            typeof paragraph === "string" ? paragraph : paragraph.text,
          ),
        ]),
      ].filter((value): value is string => typeof value === "string");
    const englishLegalStrings = [
      ...visibleLegalStrings(legalPageViewModel("privacy")),
      ...visibleLegalStrings(legalPageViewModel("imprint")),
    ];

    for (const locale of locales) {
      const privacy = localizeViewModel(legalPageViewModel("privacy"), locale);
      const imprint = localizeViewModel(legalPageViewModel("imprint"), locale);
      const contact = localizeViewModel(contactPageViewModel, locale);
      const hosting = privacy.document.sections[3];
      const trade = imprint.document.sections[1];

      expect(hosting?.paragraphs).toHaveLength(4);
      expect(JSON.stringify(hosting)).toContain("Hutchison Drei Austria GmbH");
      expect(JSON.stringify(hosting)).not.toContain("outside the European");
      expect(JSON.stringify(imprint.document)).toContain("Landesgericht Linz");
      expect(JSON.stringify(imprint.document)).toContain(
        "Magistrat der Stadt Linz",
      );
      expect(JSON.stringify(imprint.document)).toContain(
        "Wirtschaftskammer Oberösterreich",
      );
      expect(trade?.paragraphs[2]).toMatchObject({
        link: {
          href: "https://www.ris.bka.gv.at/",
          label: "ris.bka.gv.at",
        },
      });
      for (const section of [
        ...privacy.document.sections,
        ...imprint.document.sections,
      ]) {
        expect(englishSectionTitles.has(section.title)).toBe(false);
      }
      expect(contact.form.privacyNotice.href).toBe(`/${locale}/privacy/`);
      expect(contact.form.fields).not.toHaveProperty("consent");
      const localizedLegalStrings = [
        ...visibleLegalStrings(privacy),
        ...visibleLegalStrings(imprint),
      ];
      expect(localizedLegalStrings).toHaveLength(englishLegalStrings.length);
      for (const [index, source] of englishLegalStrings.entries()) {
        const isLocalizedInvariant =
          source === "Hosting" ||
          (locale === "pl" &&
            source ===
              "TransAnt GmbH, voestalpine-Straße 3, 4020 Linz, Austria.");
        if (!isLocalizedInvariant) {
          expect(
            localizedLegalStrings[index],
            `${locale} legal copy remained English: ${source}`,
          ).not.toBe(source);
        }
      }
      expect(contact.form.labels?.privacyPrefix).not.toBe(
        contactPageViewModel.form.labels?.privacyPrefix,
      );
      expect(contact.form.privacyNotice.label).not.toBe(
        contactPageViewModel.form.privacyNotice.label,
      );
    }
  });
});
