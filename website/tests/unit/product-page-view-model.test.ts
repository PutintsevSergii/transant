import { describe, expect, it } from "vitest";

import {
  productPageViewModel,
  productRouteParams,
} from "../../src/adapters/content/product-view-model";

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
