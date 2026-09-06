import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  approvedLogoDigest,
  productAuditEntries,
} from "../../scripts/verify-content-brand-audit.mjs";

const catalogPath = join(process.cwd(), "src", "content", "catalog.json");

async function catalog(): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(catalogPath, "utf8")) as Record<
    string,
    unknown
  >;
}

describe("I-005 content and brand audit contract", () => {
  it("defines all five source families and ten source-preserved product routes", async () => {
    const entries = productAuditEntries(await catalog());

    expect(entries).toHaveLength(10);
    expect(new Set(entries.map((entry) => entry.category))).toEqual(
      new Set(["intermodal", "flat", "timber", "open-box", "tank"]),
    );
    expect(entries.map((entry) => entry.route)).toContain(
      "/wagons/open-box/uno-multi-56ft-eanos/",
    );
    expect(entries.every((entry) => entry.specificationValues.length > 0)).toBe(
      true,
    );
  });

  it("rejects missing provenance, broken family membership, and incomplete display rows", async () => {
    const valid = await catalog();
    const products = valid.products as Record<string, Record<string, unknown>>;
    const firstProduct = products.sgns;
    if (!firstProduct) throw new Error("Expected source product sgns.");

    expect(() => productAuditEntries({ ...valid, source: " " })).toThrow(
      "Catalog requires a source",
    );
    expect(() =>
      productAuditEntries({ ...valid, source: "official website" }),
    ).toThrow("Catalog source must be Catalog for print.ai");
    expect(() =>
      productAuditEntries({
        ...valid,
        products: {
          ...products,
          sgns: {
            ...firstProduct,
            technical_source: { reference: "official website" },
          },
        },
      }),
    ).toThrow("Product sgns must cite Catalog for print.ai");
    expect(() =>
      productAuditEntries({
        ...valid,
        products: { ...products, sgns: { ...firstProduct, category: "tank" } },
      }),
    ).toThrow("must be listed by its source family");
    expect(() =>
      productAuditEntries({
        ...valid,
        products: {
          ...products,
          sgns: { ...firstProduct, specs: [["", "value"]] },
        },
      }),
    ).toThrow("invalid source specification row");
  });

  it("pins the approved immutable logo digest", () => {
    expect(approvedLogoDigest).toBe(
      "fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985",
    );
  });
});
