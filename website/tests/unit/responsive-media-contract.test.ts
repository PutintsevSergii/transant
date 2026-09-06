import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import {
  assertResponsiveMediaContract,
  DEFAULT_RESPONSIVE_MEDIA_WIDTHS,
} from "../../src/components/core/ResponsiveMedia/responsive-media-contract";

const localImage = {
  src: "/_astro/freight-train.hash.jpg",
  width: 1600,
  height: 900,
  format: "jpg",
} as ImageMetadata;

const validInput = {
  image: localImage,
  alt: "Freight train in operation",
  sizes: "100vw",
} as const;

describe("C-004 ResponsiveMedia contract", () => {
  it("accepts meaningful local imagery and explicit decorative imagery", () => {
    expect(() => assertResponsiveMediaContract(validInput)).not.toThrow();
    expect(() =>
      assertResponsiveMediaContract({
        image: localImage,
        decorative: true,
        sizes: "100vw",
      }),
    ).not.toThrow();
    expect(DEFAULT_RESPONSIVE_MEDIA_WIDTHS).toEqual([320, 640, 960, 1280]);
  });

  it("rejects missing imagery, remote sources, unusable dimensions, and absent alternatives", () => {
    expect(() =>
      assertResponsiveMediaContract({ alt: "Missing", sizes: "100vw" }),
    ).toThrow("requires local image metadata");
    expect(() =>
      assertResponsiveMediaContract({
        ...validInput,
        image: { ...localImage, src: "https://example.com/train.jpg" },
      }),
    ).toThrow("build-owned local assets only");
    expect(() =>
      assertResponsiveMediaContract({
        ...validInput,
        image: { ...localImage, width: 0 },
      }),
    ).toThrow("non-zero dimensions");
    expect(() =>
      assertResponsiveMediaContract({
        image: localImage,
        alt: "  ",
        sizes: "100vw",
      }),
    ).toThrow("meaningful alt text");
  });

  it("rejects incomplete responsive layout contracts", () => {
    expect(() =>
      assertResponsiveMediaContract({ ...validInput, sizes: " " }),
    ).toThrow("non-empty sizes");
    expect(() =>
      assertResponsiveMediaContract({ ...validInput, aspectRatio: "16x9" }),
    ).toThrow("width / height");
    expect(() =>
      assertResponsiveMediaContract({ ...validInput, widths: [320, 0] }),
    ).toThrow("positive values");
  });
});
