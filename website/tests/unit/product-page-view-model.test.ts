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
        value: "19.830",
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
  });

  it("rejects an unrecognised or mismatched family/product route", () => {
    expect(() =>
      productPageViewModel("flat", "uno-intermodal-60ft-sgns"),
    ).toThrow("Unknown product route flat/uno-intermodal-60ft-sgns.");
  });
});
