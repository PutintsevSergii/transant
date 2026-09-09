import { describe, expect, it } from "vitest";

import {
  productPageViewModel,
  productRouteParams,
} from "../../src/adapters/content/product-view-model";
import { localizeViewModel } from "../../src/adapters/content/localized-view-model";

describe("productPageViewModel", () => {
  it("maps exactly ten source-defined family/product routes without rewriting repeated product codes", () => {
    expect(productRouteParams).toHaveLength(10);
    expect(productRouteParams).toContainEqual({
      family: "open-box",
      product: "uno-multi-40ft-eanos",
    });
    expect(productRouteParams).toContainEqual({
      family: "open-box",
      product: "uno-multi-56ft-eanos",
    });

    const fortyFoot = productPageViewModel("open-box", "uno-multi-40ft-eanos");
    const fiftySixFoot = productPageViewModel(
      "open-box",
      "uno-multi-56ft-eanos",
    );
    expect(fortyFoot.hero.code).toBe("Eanos");
    expect(fiftySixFoot.hero.code).toBe("Eanos");
    expect(fortyFoot.layout.canonicalUrl).toBe(
      "https://www.transant.com/wagons/open-box/uno-multi-40ft-eanos/",
    );
  });

  it("preserves print-catalogue facts, drawings, tables, and local media", () => {
    const model = productPageViewModel(
      "intermodal",
      "uno-intermodal-60ft-sgns",
    );

    expect(model.hero.facts).toEqual([
      {
        label: "Length over buffers (mm)",
        value: "19.740",
        source: {
          reference: "Catalog for print.ai, PDF page 5 (printed page 03)",
          checkedAt: "2026-09-05",
        },
      },
      {
        label: "Wagon tare (t)",
        value: "19,3",
        source: {
          reference: "Catalog for print.ai, PDF page 5 (printed page 03)",
          checkedAt: "2026-09-05",
        },
      },
      {
        label: "Vehicle gauge",
        value: "G1",
        source: {
          reference: "Catalog for print.ai, PDF page 5 (printed page 03)",
          checkedAt: "2026-09-05",
        },
      },
    ]);
    expect(model.cargoFit.entries).toHaveLength(5);
    expect(model.hero.media).toMatchObject({
      fit: "contain",
      aspectRatio: "3 / 2",
      alt: "Render of UNO INTERMODAL 60ft Sgns(s) freight wagon",
    });
    expect(model.technicalSheet.drawings).toHaveLength(3);
    expect(model.technicalSheet.tables).toHaveLength(1);
    expect(model.technicalSheet.tables[0]?.rows[1]?.at(-1)).toEqual({
      text: "60.7",
      colSpan: 2,
    });
    expect(
      model.technicalSheet.groups.flatMap((group) => group.rows),
    ).toContainEqual({
      label: "Floor height above basis (mm)",
      value: "1.155",
    });
    expect(model.technicalSheet.features).not.toContain("DAC ready");
  });

  it("applies the client-confirmed concentrated-load corrections", () => {
    const eamnos = productPageViewModel("open-box", "uno-multibox-33ft-eamnos");
    const eanos56 = productPageViewModel("open-box", "uno-multi-56ft-eanos");

    expect(eamnos.hero.benefit).toBe(
      "Up to 70 t with concentrated loads: distributed over 10 m of loading length or on two points across a 6,5 m section.",
    );
    expect(eamnos.hero.facts.slice(0, 2)).toEqual([
      expect.objectContaining({
        label: "Distributed over the loading length",
        value: "70 t / 10 m",
      }),
      expect.objectContaining({
        label: "Distributed on two points",
        value: "70 t / 6,5 m",
      }),
    ]);
    expect(eamnos.technicalSheet.groups.flatMap((group) => group.rows)).toEqual(
      expect.arrayContaining([
        { label: "Distance between bogie pivots (mm)", value: "6.500" },
        { label: "Loading length (mm)", value: "10.240" },
      ]),
    );
    expect(eamnos.technicalSheet.tables[1]?.rows[3]).toEqual([
      { text: "d-d" },
      { text: "10 m" },
      { text: "70" },
      { text: "–" },
    ]);
    expect(eamnos.technicalSheet.features).toEqual([]);

    expect(eanos56.technicalSheet.tables[1]?.rows[3]).toEqual([
      { text: "d-d" },
      { text: "16 m" },
      { text: "66" },
      { text: "–" },
    ]);
    expect(eanos56.technicalSheet.features).not.toContain("DAC ready");
  });

  it.each([
    [
      "de",
      "Bis zu 70 t bei konzentrierter Belastung: über 10 m Ladelänge verteilt oder auf zwei Punkten in einem 6,5-m-Abschnitt.",
      "Über die Ladelänge verteilt",
    ],
    [
      "uk",
      "До 70 т зосередженого навантаження: розподіленого по 10 м довжини завантаження або на двох точках у межах ділянки 6,5 м.",
      "Розподілене по довжині завантаження",
    ],
    [
      "pl",
      "Do 70 t przy obciążeniu skupionym: rozłożonym na 10 m długości ładunkowej lub na dwóch punktach w obrębie odcinka 6,5 m.",
      "Rozłożone na długości ładunkowej",
    ],
    [
      "cs",
      "Až 70 t při soustředěném zatížení: rozloženém po ložné délce 10 m nebo ve dvou bodech na úseku 6,5 m.",
      "Rozložené po ložné délce",
    ],
  ] as const)(
    "localizes the Eamnos primary concentrated-load benefit for %s",
    (locale, benefit, firstFactLabel) => {
      const localized = localizeViewModel(
        productPageViewModel("open-box", "uno-multibox-33ft-eamnos"),
        locale,
      );

      expect(localized.hero.benefit).toBe(benefit);
      expect(localized.hero.facts[0]).toMatchObject({
        label: firstFactLabel,
        value: "70 t / 10 m",
      });
    },
  );

  it("keeps source values without publishing catalogue-note annotations", () => {
    for (const { family, product } of productRouteParams) {
      const model = productPageViewModel(family, product);
      expect(model.technicalSheet.notes).toEqual([]);
      expect(
        model.technicalSheet.tables.flatMap((table) => table.notes),
      ).toEqual([]);
    }
  });

  it("rejects an unrecognised or mismatched family/product route", () => {
    expect(() =>
      productPageViewModel("flat", "uno-intermodal-60ft-sgns"),
    ).toThrow("Unknown product route flat/uno-intermodal-60ft-sgns.");
  });
});
