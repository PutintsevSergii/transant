import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import {
  approvedRelatedWagonEntries,
  validateRelatedWagonsProps,
} from "../../src/components/product/RelatedWagons/related-wagons-contract";
import type { RelatedWagonsProps } from "../../src/components/product/RelatedWagons/RelatedWagons.types";

const localImage = {
  src: "/fixture-wagon.png",
  width: 1600,
  height: 900,
  format: "png",
} as ImageMetadata;

const related = (id = "fixture-relns") => ({
  id,
  familyName: "Fixture flat wagons",
  code: "Relns",
  title: "Fixture related wagon",
  summary: "A caller-owned fixture relationship summary.",
  href: `/wagons/flat/${id}/`,
  linkLabel: "View fixture related wagon",
  publicationStatus: "approved" as const,
  source: { reference: "Fixture relationship source" },
  media: {
    image: localImage,
    alt: "A meaningful local related wagon render.",
    sizes: "100vw",
    fit: "contain" as const,
    aspectRatio: "16 / 9",
  },
});

const validProps = (): RelatedWagonsProps => ({
  currentProductId: "fixture-current",
  title: "Related wagons",
  headingLevel: 2,
  related: [related()],
});

describe("RelatedWagons contract", () => {
  it("accepts empty and explicit many-relation inputs while publishing only approved records", () => {
    const empty = { ...validProps(), related: [] };
    expect(() => validateRelatedWagonsProps(empty)).not.toThrow();
    expect(approvedRelatedWagonEntries(empty.related)).toEqual([]);

    const many = {
      ...validProps(),
      related: [
        related(),
        {
          ...related("fixture-rens"),
          code: "Rens",
          publicationStatus: "draft" as const,
        },
      ],
    };
    expect(() => validateRelatedWagonsProps(many)).not.toThrow();
    expect(approvedRelatedWagonEntries(many.related)).toHaveLength(1);
  });

  it("accepts locale-prefixed direct product paths without relaxing the product-route shape", () => {
    const props = validProps();
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [{ ...related(), href: "/cs/wagons/flat/fixture-relns/" }],
      }),
    ).not.toThrow();
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [{ ...related(), href: "/cs/wagons/flat/" }],
      }),
    ).toThrow("safe non-placeholder");
  });

  it("rejects self-reference, duplicate, unsafe, incomplete, or unsuitable relation records", () => {
    const props = validProps();
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [related("fixture-current")],
      }),
    ).toThrow("must not reference the current product");
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [related(), { ...related(), code: "Duplicate" }],
      }),
    ).toThrow("identities must be unique");
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [{ ...related(), href: "https://example.test/product" }],
      }),
    ).toThrow("safe non-placeholder");
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [{ ...related(), source: { reference: "" } }],
      }),
    ).toThrow("relationship source reference");
    expect(() =>
      validateRelatedWagonsProps({
        ...props,
        related: [
          {
            ...related(),
            media: { ...related().media, fit: "cover" },
          },
        ],
      }),
    ).toThrow("meaningful alt text, contain fit");
  });
});
