import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { parseCatalogSource } from "../../src/adapters/content/catalog-source";
import {
  toProductViewModel,
  toProductionClaimViewModels,
} from "../../src/adapters/content/production-view-models";
import {
  ContentValidationError,
  parseClaims,
  parseDownloads,
  parseNavigation,
  parseProduct,
  parseSiteSettings,
} from "../../src/domain/content/schemas";

const contentRoot = join(process.cwd(), "src", "content");
const source = {
  reference: "Catalog for print.ai",
};

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, "utf8")) as unknown;
}

async function readIndividualProducts(): Promise<unknown[]> {
  const entries = await readdir(join(contentRoot, "products"), {
    recursive: true,
    withFileTypes: true,
  });
  return Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name === "product.json")
      .map((entry) => readJson(join(entry.parentPath, entry.name))),
  );
}

describe("F-002 content schemas", () => {
  it("parses the five source families and all ten aggregate and individual products", async () => {
    const aggregate = await readJson(join(contentRoot, "catalog.json"));
    const catalog = parseCatalogSource(aggregate);
    const individualProducts = await readIndividualProducts();
    const parsedIndividuals = individualProducts.map((product) =>
      parseProduct(product, source),
    );

    expect(catalog.families).toHaveLength(5);
    expect(catalog.products).toHaveLength(10);
    expect(parsedIndividuals).toHaveLength(10);
    expect(
      catalog.families.flatMap((family) => family.productIds),
    ).toHaveLength(10);
    expect(parsedIndividuals.map((product) => product.slug).sort()).toEqual(
      catalog.products.map((product) => product.slug).sort(),
    );
  });

  it("rejects invalid required fields, duplicate slugs, unsafe URLs, and malformed load rows", async () => {
    const aggregate = await readJson(join(contentRoot, "catalog.json"));
    const rawProducts = (aggregate as { products: Record<string, unknown> })
      .products;
    const firstProduct = Object.values(rawProducts)[0];
    if (!firstProduct) throw new Error("Expected a source product");

    expect(() => parseSiteSettings({ defaultLocale: "en", source })).toThrow(
      ContentValidationError,
    );
    expect(() =>
      parseNavigation([
        { label: "Unsafe", href: "javascript:alert(1)", external: true },
      ]),
    ).toThrow(ContentValidationError);
    expect(() =>
      parseDownloads([
        {
          title: "Unsafe sheet",
          href: "http://example.test/sheet.pdf",
          fileType: "PDF",
          language: "en",
          publicationStatus: "approved",
          source,
        },
      ]),
    ).toThrow(ContentValidationError);
    expect(
      parseDownloads([
        {
          title: "Approved local sheet",
          href: "/downloads/approved-sheet.pdf",
          fileType: "PDF",
          language: "en",
          publicationStatus: "approved",
          source,
        },
      ]),
    ).toMatchObject([{ href: "/downloads/approved-sheet.pdf" }]);
    expect(() =>
      parseProduct(
        {
          ...firstProduct,
          id: "",
        },
        source,
      ),
    ).toThrow(ContentValidationError);
    expect(() =>
      parseProduct(
        {
          ...firstProduct,
          loadlimit: [
            ["A", "43"],
            ["C", "61"],
            ["D", "69"],
            ["E", "70"],
          ],
        },
        source,
      ),
    ).toThrow(ContentValidationError);
    expect(() =>
      parseCatalogSource({
        ...(aggregate as Record<string, unknown>),
        products: { a: firstProduct, b: firstProduct },
      }),
    ).toThrow(ContentValidationError);
  });
});

describe("F-002 production view models", () => {
  it("retains ordered source engineering strings, decimals, and logical image paths", async () => {
    const aggregate = await readJson(join(contentRoot, "catalog.json"));
    const catalog = parseCatalogSource(aggregate);
    const product = catalog.products.find(
      (candidate) => candidate.id === "rns",
    );
    if (!product || !product.loadLimits)
      throw new Error("Expected the Rns source product");

    const viewModel = toProductViewModel(product);

    expect(viewModel.specifications).toBe(product.specifications);
    expect(viewModel.loadLimits).toBe(product.loadLimits);
    expect(viewModel.specifications).toContainEqual({
      label: "Wagon tare (t)",
      value: "21,0",
    });
    expect(viewModel.loadLimits).toEqual([
      { routeClass: "A", payload: "43" },
      { routeClass: "B", payload: "51" },
      { routeClass: "C", payload: "61" },
      { routeClass: "D", payload: "69" },
    ]);
    expect(product.technicalSource).toEqual({
      reference: "Catalog for print.ai, PDF page 11 (printed page 09)",
      checkedAt: "2026-09-05",
    });
    expect(viewModel.imagePath).toBe(
      "products/flat/uno-flat-60ft-rns/wagon-render.png",
    );
  });

  it("never admits draft or unverified claims to production", () => {
    const claims = parseClaims([
      {
        id: "approved-fact",
        text: "Approved source-backed claim.",
        publicationStatus: "approved",
        evidenceId: "approved-evidence",
        source,
      },
      {
        id: "draft-fact",
        text: "Draft claim.",
        publicationStatus: "draft",
        evidenceId: "draft-evidence",
        source,
      },
      {
        id: "unverified-fact",
        text: "Unverified claim.",
        publicationStatus: "unverified",
        evidenceId: "unverified-evidence",
        source,
      },
    ]);

    expect(toProductionClaimViewModels(claims)).toEqual([
      {
        id: "approved-fact",
        text: "Approved source-backed claim.",
        evidenceId: "approved-evidence",
        sourceReference: source.reference,
      },
    ]);
  });
});
