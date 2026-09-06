import { describe, expect, it } from "vitest";

import { validateSpecificationGroupProps } from "../../src/components/product/SpecificationGroup/specification-group-contract";
import type { SpecificationGroupProps } from "../../src/components/product/SpecificationGroup/SpecificationGroup.types";

const validProps = (): SpecificationGroupProps => ({
  title: "Technical specifications",
  headingLevel: 2,
  source: { reference: "Fixture product source" },
  rows: [
    { label: "Wagon tare", value: "19.3", unit: "t" },
    { label: "Vehicle gauge", value: "G1" },
  ],
});

describe("SpecificationGroup contract", () => {
  it("accepts source-ordered rows with separately supplied or missing units", () => {
    const props = validProps();

    expect(() => validateSpecificationGroupProps(props)).not.toThrow();
    expect(props.rows.map(({ label }) => label)).toEqual([
      "Wagon tare",
      "Vehicle gauge",
    ]);
    expect(props.rows[1]?.unit).toBeUndefined();
  });

  it("rejects incomplete context, rows, and explicitly blank units", () => {
    const props = validProps();

    expect(() =>
      validateSpecificationGroupProps({ ...props, title: " " }),
    ).toThrow("non-empty title");
    expect(() =>
      validateSpecificationGroupProps({ ...props, source: { reference: " " } }),
    ).toThrow("source reference");
    expect(() =>
      validateSpecificationGroupProps({ ...props, rows: [] }),
    ).toThrow("one or more specification rows");
    expect(() =>
      validateSpecificationGroupProps({
        ...props,
        rows: [{ label: " ", value: "19.3" }],
      }),
    ).toThrow("source-preserved labels and values");
    expect(() =>
      validateSpecificationGroupProps({
        ...props,
        rows: [{ label: "Wagon tare", value: "19.3", unit: " " }],
      }),
    ).toThrow("units must be omitted");
  });
});
