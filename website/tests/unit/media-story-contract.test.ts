import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import { validateMediaStoryProps } from "../../src/components/editorial/MediaStory/media-story-contract";
import type { MediaStoryProps } from "../../src/components/editorial/MediaStory/MediaStory.types";

const localImage = {
  src: "/fixture-editorial.jpg",
  width: 1600,
  height: 1000,
  format: "jpg",
} as ImageMetadata;

const validProps = (): MediaStoryProps => ({
  eyebrow: "Engineering & Services",
  title: "Engineering stories use caller-owned copy.",
  description: "Fixture-only editorial copy.",
  headingLevel: 2,
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

describe("MediaStory contract", () => {
  it("accepts caller-owned media/text orientations and an intentional text-only state", () => {
    expect(() => validateMediaStoryProps(validProps())).not.toThrow();
    expect(() =>
      validateMediaStoryProps({
        title: "Text-only story",
        headingLevel: 3,
        theme: "dark",
        mediaPosition: "before",
      }),
    ).not.toThrow();
  });

  it("rejects blank copy, invalid hierarchy, ambiguous media, and unsafe actions", () => {
    const props = validProps();
    expect(() => validateMediaStoryProps({ ...props, title: " " })).toThrow(
      "non-empty title",
    );
    expect(() =>
      validateMediaStoryProps({ ...props, headingLevel: 7 as 2 }),
    ).toThrow("1 through 6");
    expect(() =>
      validateMediaStoryProps({
        ...props,
        media: { ...props.media!, decorative: true },
      }),
    ).toThrow("meaningful alt text");
    expect(() =>
      validateMediaStoryProps({
        ...props,
        media: { ...props.media!, aspectRatio: "" },
      }),
    ).toThrow("intentional aspect ratio");
    expect(() =>
      validateMediaStoryProps({
        ...props,
        action: { href: "javascript:alert(1)", label: "Unsafe" },
      }),
    ).toThrow("action requires");
  });
});
