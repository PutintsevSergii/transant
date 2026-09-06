import { describe, expect, it } from "vitest";

import {
  approvedCargoFitEntries,
  validateCargoFitProps,
} from "../../src/components/product/CargoFit/cargo-fit-contract";
import type { CargoFitProps } from "../../src/components/product/CargoFit/CargoFit.types";

const approvedEntry = {
  kind: "cargo" as const,
  label: "Container transport",
  publicationStatus: "approved" as const,
  source: { reference: "Fixture product source" },
};

const validProps = (): CargoFitProps => ({
  intro: {
    title: "Approved cargo and use cases",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "standard",
  },
  entries: [approvedEntry],
});

describe("CargoFit contract", () => {
  it("keeps caller-owned approved declarations in source order and permits absent input", () => {
    const entries = [
      approvedEntry,
      {
        ...approvedEntry,
        kind: "use-case" as const,
        label: "Terminal handling",
        publicationStatus: "draft" as const,
      },
      {
        ...approvedEntry,
        label: "Swap bodies",
        publicationStatus: "unverified" as const,
      },
    ];
    const props = { ...validProps(), entries };

    expect(() => validateCargoFitProps(props)).not.toThrow();
    expect(approvedCargoFitEntries(entries)).toEqual([approvedEntry]);
    expect(approvedCargoFitEntries(undefined)).toEqual([]);
    expect(() =>
      validateCargoFitProps({
        intro: validProps().intro,
      }),
    ).not.toThrow();
  });

  it("rejects incomplete introductions and unsupported cargo/use-case declarations", () => {
    const props = validProps();

    expect(() =>
      validateCargoFitProps({
        ...props,
        intro: { ...props.intro, title: " " },
      }),
    ).toThrow("non-empty intro title");
    expect(() =>
      validateCargoFitProps({
        ...props,
        entries: [{ ...approvedEntry, label: " " }],
      }),
    ).toThrow("source-preserved label");
    expect(() =>
      validateCargoFitProps({
        ...props,
        entries: [{ ...approvedEntry, source: { reference: " " } }],
      }),
    ).toThrow("source reference");
  });
});
