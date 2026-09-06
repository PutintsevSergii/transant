import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import { validateWagonFamilyIndexProps } from "../../src/components/catalogue/WagonFamilyIndex/wagon-family-index-contract";
import type { WagonFamilyIndexProps } from "../../src/components/catalogue/WagonFamilyIndex/WagonFamilyIndex.types";

const localImage = {
  src: "/fixture-wagon.png",
  width: 1600,
  height: 900,
  format: "png",
} as ImageMetadata;

const family = (id: string, sequence: string) => ({
  id,
  sequence,
  eyebrow: "Fixture family",
  title: `Family ${id}`,
  summary: "A source-preserved fixture summary.",
  media: {
    image: localImage,
    alt: "A meaningful local wagon render.",
    sizes: "100vw",
    fit: "contain" as const,
    aspectRatio: "16 / 9",
  },
  href: `/wagons/${id}/`,
  linkLabel: `View ${id}`,
  source: { reference: "Fixture catalogue source" },
});

const validProps = (): WagonFamilyIndexProps => ({
  intro: {
    title: "Fixture wagon families",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "standard",
  },
  families: [
    family("intermodal", "01"),
    family("flat", "02"),
    family("timber", "03"),
    family("open-box", "04"),
    family("tank", "05"),
  ],
});

describe("WagonFamilyIndex contract", () => {
  it("accepts exactly five source-attributed local family destinations", () => {
    expect(() => validateWagonFamilyIndexProps(validProps())).not.toThrow();
    const { intro, ...propsWithoutIntro } = validProps();
    expect(intro).toBeDefined();
    expect(() =>
      validateWagonFamilyIndexProps(propsWithoutIntro),
    ).not.toThrow();
  });

  it("rejects incomplete coverage, duplicate/unsafe routes, and unsuitable media", () => {
    const props = validProps();
    expect(() =>
      validateWagonFamilyIndexProps({
        ...props,
        families: props.families.slice(0, 4),
      }),
    ).toThrow("exactly five");
    expect(() =>
      validateWagonFamilyIndexProps({
        ...props,
        families: [
          ...props.families.slice(0, 4),
          { ...props.families[4]!, id: "intermodal" },
        ],
      }),
    ).toThrow("identities must be unique");
    expect(() =>
      validateWagonFamilyIndexProps({
        ...props,
        families: [
          { ...props.families[0]!, href: "#" },
          ...props.families.slice(1),
        ],
      }),
    ).toThrow("safe non-placeholder");
    expect(() =>
      validateWagonFamilyIndexProps({
        ...props,
        families: [
          {
            ...props.families[0]!,
            media: { ...props.families[0]!.media, fit: "cover" },
          },
          ...props.families.slice(1),
        ],
      }),
    ).toThrow("meaningful alt text, contain fit");
  });
});
