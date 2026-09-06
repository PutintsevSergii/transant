import {
  ContentValidationError,
  parseProducts,
  parseWagonFamilies,
} from "../../domain/content/schemas";
import type {
  Product,
  SourceAttribution,
  WagonFamily,
} from "../../domain/content/types";

export interface CatalogSource {
  readonly source: SourceAttribution;
  readonly families: readonly WagonFamily[];
  readonly products: readonly Product[];
}

/**
 * Adapts the historical aggregate JSON into the stable content domain. The
 * aggregate source reference is inherited by records that pre-date F-002 and
 * therefore have no record-level attribution field of their own.
 */
export function parseCatalogSource(value: unknown): CatalogSource {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ContentValidationError("catalog", "must be an object");
  }
  const catalog = value as Record<string, unknown>;
  if (
    typeof catalog.source !== "string" ||
    catalog.source.trim().length === 0
  ) {
    throw new ContentValidationError(
      "catalog.source",
      "must be a non-empty string",
    );
  }
  if (
    !catalog.products ||
    typeof catalog.products !== "object" ||
    Array.isArray(catalog.products)
  ) {
    throw new ContentValidationError(
      "catalog.products",
      "must be an object keyed by product id",
    );
  }

  const source = { reference: catalog.source } satisfies SourceAttribution;
  const families = parseWagonFamilies(catalog.categories, source);
  const productEntries = Object.entries(
    catalog.products as Record<string, unknown>,
  );
  const products = parseProducts(
    productEntries.map(([, product]) => product),
    source,
  );

  for (const [key] of productEntries) {
    const parsed = products.find((candidate) => candidate.id === key);
    if (!parsed) {
      throw new ContentValidationError(
        `catalog.products.${key}`,
        "must contain a product with the same id as its key",
      );
    }
  }
  for (const family of families) {
    for (const productId of family.productIds) {
      const product = products.find((candidate) => candidate.id === productId);
      if (!product || product.familySlug !== family.slug) {
        throw new ContentValidationError(
          `catalog.categories.${family.slug}.products`,
          `must reference a product in the ${family.slug} family`,
        );
      }
    }
  }

  return { source, families, products };
}
