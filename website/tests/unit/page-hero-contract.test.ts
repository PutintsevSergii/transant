import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import { validatePageHeroProps } from "../../src/components/editorial/PageHero/page-hero-contract";
import type { PageHeroProps } from "../../src/components/editorial/PageHero/PageHero.types";

const localImage = {
  src: "/fixture-editorial.jpg",
  width: 1600,
  height: 1000,
  format: "jpg",
} as ImageMetadata;

const validProps = (): PageHeroProps => ({
  eyebrow: "Engineering & Services",
  title: "Rail technology built around useful payload.",
  description: "Fixture-only editorial copy.",
  headingLevel: 1,
  theme: "light",
  media: {
    image: localImage,
    alt: "A useful editorial railway photograph.",
    sizes: "100vw",
    fit: "cover",
    aspectRatio: "16 / 10",
  },
  action: {
    href: "/engineering-services/",
    label: "Explore Engineering & Services",
  },
});

describe("PageHero contract", () => {
  it("accepts caller-owned light/dark editorial composition with optional media, action, and source position", () => {
    expect(() => validatePageHeroProps(validProps())).not.toThrow();
    expect(() =>
      validatePageHeroProps({
        ...validProps(),
        media: {
          ...validProps().media!,
          preserveNaturalAspectRatio: true,
        },
      }),
    ).not.toThrow();
    expect(() =>
      validatePageHeroProps({
        title: "Text-only introduction",
        headingLevel: 3,
        theme: "dark",
        mediaPosition: "before",
        technicalBackground: false,
      }),
    ).not.toThrow();
  });

  it("rejects blank copy, invalid heading levels, ambiguous media, and unsafe optional actions", () => {
    const props = validProps();
    expect(() => validatePageHeroProps({ ...props, title: " " })).toThrow(
      "non-empty title",
    );
    expect(() =>
      validatePageHeroProps({ ...props, headingLevel: 7 as 1 }),
    ).toThrow("1 through 6");
    expect(() =>
      validatePageHeroProps({
        ...props,
        media: { ...props.media!, decorative: true },
      }),
    ).toThrow("meaningful alt text");
    expect(() =>
      validatePageHeroProps({
        ...props,
        media: { ...props.media!, aspectRatio: "" },
      }),
    ).toThrow("intentional aspect ratio");
    expect(() =>
      validatePageHeroProps({
        ...props,
        action: { href: "javascript:alert(1)", label: "Unsafe" },
      }),
    ).toThrow("action requires");
    expect(() =>
      validatePageHeroProps({
        ...props,
        technicalBackground: "yes" as unknown as boolean,
      }),
    ).toThrow("technicalBackground must be a boolean");
    expect(() =>
      validatePageHeroProps({
        ...props,
        media: {
          ...props.media!,
          preserveNaturalAspectRatio: "yes" as unknown as boolean,
        },
      }),
    ).toThrow("preserveNaturalAspectRatio must be a boolean");
  });
});
