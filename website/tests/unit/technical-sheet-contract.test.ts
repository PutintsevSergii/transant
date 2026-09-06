import { describe, expect, it } from "vitest";

import {
  validateTechnicalSheet,
  validateTechnicalTable,
} from "../../src/components/product/TechnicalSheet/technical-sheet-contract";

const drawing = {
  title: "Side elevation",
  image: {
    src: "/drawing.webp",
    width: 1800,
    height: 600,
    format: "webp" as const,
  },
} as const;

describe("TechnicalSheet contract", () => {
  it("accepts source-preserved decimal punctuation, blank cells and merged cells", () => {
    expect(() =>
      validateTechnicalSheet({
        productName: "UNO INTERMODAL 60ft Sgns(s)",
        sourceLabel: "Product catalogue · p. 03",
        drawings: [drawing],
        groups: [
          {
            title: "Technical specifications",
            rows: [{ label: "Wagon tare (t)", value: "19,3" }],
          },
        ],
        tables: [
          {
            title: "Loading limits",
            kind: "load",
            headers: ["Regime", "A", "B", "C", "D"],
            rows: [
              [
                { text: "SS" },
                { text: "44.7" },
                { text: "52.7" },
                { text: "60.7", colSpan: 2 },
              ],
            ],
            notes: [],
          },
        ],
        features: ["DAC ready"],
        notes: [],
      }),
    ).not.toThrow();
  });

  it("rejects table rows that do not cover their declared columns", () => {
    expect(() =>
      validateTechnicalTable({
        title: "Load limit",
        kind: "load",
        headers: ["Route class", "A", "B", "C", "D"],
        rows: [[{ text: "Load limit" }, { text: "44" }]],
        notes: [],
      }),
    ).toThrow("cover exactly the source columns");
  });
});
