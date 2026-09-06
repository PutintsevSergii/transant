import type { ImageMetadata } from "astro";

export type ResponsiveMediaLoading = "eager" | "lazy";

export type ResponsiveMediaFit = "cover" | "contain";

export interface ResponsiveMediaProps {
  /** Build-owned local asset metadata imported from `src/assets/`. */
  readonly image: ImageMetadata;
  /** Meaningful alternative text, unless `decorative` is explicitly true. */
  readonly alt?: string;
  /** Emits an empty alternative for imagery that carries no content. */
  readonly decorative?: boolean;
  /** Accurate CSS source-size contract for the embedding layout. */
  readonly sizes: string;
  /** Defaults to lazy unless the image is explicitly prioritised. */
  readonly loading?: ResponsiveMediaLoading;
  /** Requests eager loading and high fetch priority for critical imagery. */
  readonly priority?: boolean;
  /** Controls how the image fills an optional reserved aspect-ratio frame. */
  readonly fit: ResponsiveMediaFit;
  /** Optional CSS aspect ratio such as `16 / 9`, used to reserve layout space. */
  readonly aspectRatio?: string;
  /** Plain-text figure caption fallback; a named `caption` slot may replace it. */
  readonly caption?: string;
  /** Reviewed generated widths, constrained to the local source's intrinsic width. */
  readonly widths?: readonly number[];
}
