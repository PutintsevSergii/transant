import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import { validateWagonSwitchyardProps } from "../../src/components/home/WagonSwitchyard/wagon-switchyard-contract";
import type {
  WagonFamilySummary,
  WagonSwitchyardProps,
} from "../../src/components/home/WagonSwitchyard/WagonSwitchyard.types";

const image = {
  src: "/_astro/local-wagon.png",
  width: 1200,
  height: 525,
  format: "png",
} as ImageMetadata;

const family = (id: string, sequence: string): WagonFamilySummary => ({
  id,
  sequence,
  familyName: `${id} family`,
  modelCode: "Test",
  headline: "Cargo fit",
  summary: "A source-owned summary.",
  image,
  href: `/wagons/${id}/`,
  linkLabel: `View ${id} wagons`,
});

const validProps = (): WagonSwitchyardProps => ({
  id: "wagon-switchyard-test",
  heading: "Test switchyard",
  summary: "A source-safe switchyard introduction.",
  families: [
    family("one", "01"),
    family("two", "02"),
    family("three", "03"),
    family("four", "04"),
    family("five", "05"),
  ],
});

describe("WagonSwitchyard contract", () => {
  it("accepts five unique local family records and optional supporting copy", () => {
    const props = validProps();
    const [first, second, third, fourth, fifth] = props.families;
    expect(() => validateWagonSwitchyardProps(props)).not.toThrow();
    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [
          { ...first, technicalLabel: "A meaningful technical label" },
          second,
          third,
          fourth,
          fifth,
        ],
      }),
    ).not.toThrow();
  });

  it("rejects non-five, duplicate, unsafe, invalid-media, and blank optional data", () => {
    const props = validProps();
    const [first, second, third, fourth, fifth] = props.families;

    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [
          first,
          second,
          third,
          fourth,
        ] as unknown as WagonSwitchyardProps["families"],
      }),
    ).toThrow("exactly five");
    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [first, { ...second, id: first.id }, third, fourth, fifth],
      }),
    ).toThrow("must be unique");
    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [{ ...first, href: "#" }, second, third, fourth, fifth],
      }),
    ).toThrow("safe non-placeholder");
    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [
          { ...first, image: { ...image, width: 0 } },
          second,
          third,
          fourth,
          fifth,
        ],
      }),
    ).toThrow("local image metadata");
    expect(() =>
      validateWagonSwitchyardProps({
        ...props,
        families: [
          { ...first, technicalLabel: " " },
          second,
          third,
          fourth,
          fifth,
        ],
      }),
    ).toThrow("technicalLabel");
    expect(() =>
      validateWagonSwitchyardProps({ ...props, summary: " " }),
    ).toThrow("summary");
  });
});
