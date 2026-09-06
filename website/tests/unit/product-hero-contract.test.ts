import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import {
  productHeroInquiryHref,
  validateProductHeroProps,
} from "../../src/components/product/ProductHero/product-hero-contract";
import type { ProductHeroProps } from "../../src/components/product/ProductHero/ProductHero.types";

const localImage = {
  src: "/fixture-wagon.png",
  width: 1600,
  height: 900,
  format: "png",
} as ImageMetadata;

const media = {
  image: localImage,
  alt: "A useful transparent wagon render.",
  sizes: "100vw",
  fit: "contain" as const,
  aspectRatio: "16 / 9",
};

const fact = {
  label: "Length over buffers",
  value: "19.830 mm",
  source: { reference: "Fixture product source" },
};

const validProps = (): ProductHeroProps => ({
  family: "Intermodal wagon",
  code: "Sgns(s)",
  title: "UNO INTERMODAL 60ft",
  benefit: "Flexible intermodal transport with optimized payload capacity.",
  media,
  facts: [fact],
  inquiryAction: {
    href: "/contact/?source=fixture#inquiry",
    label: "Discuss this wagon",
  },
});

describe("ProductHero contract", () => {
  it("accepts source-attributed identity and decisive facts while encoding context only into the inquiry route", () => {
    const props = {
      ...validProps(),
      inquiryContext: "UNO INTERMODAL 60ft — Sgns(s)",
      facts: [fact, { ...fact, label: "Wagon tare", value: "19.3 t" }],
    };

    expect(() => validateProductHeroProps(props)).not.toThrow();
    expect(
      productHeroInquiryHref(props.inquiryAction.href, props.inquiryContext),
    ).toBe(
      "/contact/?source=fixture&context=UNO+INTERMODAL+60ft+%E2%80%94+Sgns%28s%29#inquiry",
    );
    expect(productHeroInquiryHref(props.inquiryAction.href)).toBe(
      "/contact/?source=fixture#inquiry",
    );
  });

  it("rejects incomplete content, ambiguous media, invalid facts, and unsafe inquiry data", () => {
    const props = validProps();
    expect(() => validateProductHeroProps({ ...props, code: " " })).toThrow(
      "family, code, title, and benefit",
    );
    expect(() =>
      validateProductHeroProps({
        ...props,
        media: { ...media, fit: "cover" },
      }),
    ).toThrow("contain fit");
    expect(() => validateProductHeroProps({ ...props, facts: [] })).toThrow(
      "one to four decisive facts",
    );
    expect(() =>
      validateProductHeroProps({
        ...props,
        facts: [{ ...fact, source: { reference: " " } }],
      }),
    ).toThrow("source references");
    expect(() =>
      validateProductHeroProps({
        ...props,
        inquiryAction: { href: "#", label: "Discuss this wagon" },
      }),
    ).toThrow("inquiry action requires");
    expect(() =>
      productHeroInquiryHref("javascript:alert(1)", "Fixture product"),
    ).toThrow("unsafe destination");
  });
});
