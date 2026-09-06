import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import { validateWagonModelListProps } from "../../src/components/catalogue/WagonModelList/wagon-model-list-contract";
import type { WagonModelListProps } from "../../src/components/catalogue/WagonModelList/WagonModelList.types";

const localImage = {
  src: "/fixture-wagon.png",
  width: 1600,
  height: 900,
  format: "png",
} as ImageMetadata;

const model = (id: string, code: string) => ({
  id,
  code,
  title: `Fixture ${code} wagon`,
  summary: "A source-preserved fixture model summary.",
  detailLabel: "Source-listed cargo",
  details: ["Fixture cargo", "Additional fixture cargo"],
  media: {
    image: localImage,
    alt: "A meaningful local wagon render.",
    sizes: "100vw",
    fit: "contain" as const,
    aspectRatio: "16 / 9",
  },
  href: `/wagons/flat/${id}/`,
  linkLabel: `View ${code}`,
  source: { reference: "Fixture product source" },
});

const validProps = (): WagonModelListProps => ({
  family: {
    id: "flat",
    source: { reference: "Fixture catalogue source" },
  },
  models: [model("fixture-rens", "Rens")],
});

describe("WagonModelList contract", () => {
  it("accepts one or many source-attributed direct models with local media or an explicit fallback", () => {
    const single = validProps();
    expect(() => validateWagonModelListProps(single)).not.toThrow();
    expect(() =>
      validateWagonModelListProps({
        ...single,
        models: [
          ...single.models,
          {
            id: "fixture-rns",
            code: "Rns",
            title: "Fixture Rns wagon",
            summary: "A source-preserved fixture fallback summary.",
            detailLabel: "Source-listed cargo",
            details: ["Fixture cargo"],
            href: "/wagons/flat/fixture-rns/",
            linkLabel: "View Rns",
            source: { reference: "Fixture product source" },
            mediaFallback: { label: "No reviewed fixture render is supplied." },
          },
        ],
      }),
    ).not.toThrow();
    expect(() =>
      validateWagonModelListProps({
        ...single,
        models: [
          ...single.models,
          model("fixture-eanos-56", "Eanos"),
          model("fixture-eanos-40", "Eanos"),
        ],
      }),
    ).not.toThrow();
  });

  it("accepts locale-prefixed direct product paths without relaxing the product-route shape", () => {
    const props = validProps();
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [
          { ...props.models[0]!, href: "/uk/wagons/flat/fixture-rens/" },
        ],
      }),
    ).not.toThrow();
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [{ ...props.models[0]!, href: "/pl/wagons/flat/" }],
      }),
    ).toThrow("safe non-placeholder");
  });

  it("rejects empty, duplicate, unsafe, unsuitable, or ambiguous model records", () => {
    const props = validProps();
    expect(() => validateWagonModelListProps({ ...props, models: [] })).toThrow(
      "at least one",
    );
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [props.models[0]!, { ...model("fixture-rens", "Rns") }],
      }),
    ).toThrow("identities must be unique");
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [{ ...props.models[0]!, href: "#" }],
      }),
    ).toThrow("safe non-placeholder");
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [
          {
            ...model("fixture-rens", "Rens"),
            media: { ...model("fixture-rens", "Rens").media, fit: "cover" },
          },
        ],
      }),
    ).toThrow("meaningful alt text, contain fit");
    expect(() =>
      validateWagonModelListProps({
        ...props,
        models: [
          {
            ...props.models[0]!,
            mediaFallback: { label: "Conflicting fallback" },
          },
        ],
      }),
    ).toThrow("either reviewed local media");
  });
});
