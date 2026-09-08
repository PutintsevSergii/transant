import { describe, expect, it } from "vitest";

import { validateLoadLimitTableProps } from "../../src/components/product/LoadLimitTable/load-limit-table-contract";
import type { LoadLimitTableProps } from "../../src/components/product/LoadLimitTable/LoadLimitTable.types";

const validProps = (): LoadLimitTableProps => ({
  title: "Load limits",
  headingLevel: 2,
  caption: "Load limit by line class",
  source: { reference: "Fixture product source" },
  columns: {
    routeClass: "Route class",
    payload: "Load limit (S)",
    payloadUnit: "t",
  },
  scrollHint: "Scroll the table",
  scrollRegionLabel: "Payload table",
  notesLabel: "Payload notes",
  rows: [
    { routeClass: "A", payload: "41.5" },
    { routeClass: "B", payload: "49.5" },
    { routeClass: "C", payload: "57.5" },
    { routeClass: "D", payload: "65.0" },
  ],
  notes: ["Source-preserved test note"],
});

describe("LoadLimitTable contract", () => {
  it("accepts all source-ordered route classes without changing payload strings", () => {
    const props = validProps();

    expect(() => validateLoadLimitTableProps(props)).not.toThrow();
    expect(props.rows.map(({ routeClass }) => routeClass)).toEqual([
      "A",
      "B",
      "C",
      "D",
    ]);
    expect(props.rows.map(({ payload }) => payload)).toEqual([
      "41.5",
      "49.5",
      "57.5",
      "65.0",
    ]);
  });

  it("rejects incomplete labels, tables, reordered rows, and blank notes", () => {
    const props = validProps();

    expect(() =>
      validateLoadLimitTableProps({ ...props, caption: " " }),
    ).toThrow("non-empty title and caption");
    expect(() =>
      validateLoadLimitTableProps({
        ...props,
        columns: { ...props.columns, routeClass: " " },
      }),
    ).toThrow("column labels");
    expect(() =>
      validateLoadLimitTableProps({ ...props, rows: props.rows.slice(0, 3) }),
    ).toThrow("all four source-ordered");
    expect(() =>
      validateLoadLimitTableProps({
        ...props,
        rows: [props.rows[1]!, props.rows[0]!, props.rows[2]!, props.rows[3]!],
      }),
    ).toThrow("without reordering");
    expect(() =>
      validateLoadLimitTableProps({ ...props, notes: [" "] }),
    ).toThrow("non-empty source-supplied notes");
    expect(() =>
      validateLoadLimitTableProps({ ...props, scrollHint: " " }),
    ).toThrow("localized labels");
  });
});
