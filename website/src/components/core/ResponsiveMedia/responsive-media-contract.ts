import type { ImageMetadata } from "astro";

import type { ResponsiveMediaProps } from "./ResponsiveMedia.types";

export const DEFAULT_RESPONSIVE_MEDIA_WIDTHS = [320, 640, 960, 1280];

type ResponsiveMediaContractInput = Omit<
  Pick<
    ResponsiveMediaProps,
    "alt" | "aspectRatio" | "decorative" | "image" | "sizes" | "widths"
  >,
  "image"
> & {
  readonly image?: ImageMetadata;
};

export function assertResponsiveMediaContract(
  input: ResponsiveMediaContractInput,
): void {
  const { alt, aspectRatio, decorative = false, image, sizes, widths } = input;

  if (!image) {
    throw new Error("ResponsiveMedia requires local image metadata.");
  }
  if (image.width <= 0 || image.height <= 0) {
    throw new Error(
      "ResponsiveMedia image metadata must have non-zero dimensions.",
    );
  }
  if (/^https?:\/\//i.test(image.src)) {
    throw new Error("ResponsiveMedia accepts build-owned local assets only.");
  }
  if (!decorative && !alt?.trim()) {
    throw new Error(
      "ResponsiveMedia requires meaningful alt text unless decorative is true.",
    );
  }
  if (!sizes.trim()) {
    throw new Error("ResponsiveMedia requires a non-empty sizes contract.");
  }
  if (
    aspectRatio &&
    !/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(aspectRatio)
  ) {
    throw new Error(
      "ResponsiveMedia aspectRatio must use the `width / height` form.",
    );
  }
  if (widths && (widths.length === 0 || widths.some((width) => width <= 0))) {
    throw new Error("ResponsiveMedia widths must contain positive values.");
  }
}
