export type BrandLogoTone = "light" | "dark";

export interface BrandLogoProps {
  /** Public path to the immutable approved bitmap. */
  readonly src: string;
  /** Accessible name for the brand image and, when linked, the link. */
  readonly alt: string;
  /** An ordinary anchor is rendered only when this destination is supplied. */
  readonly href?: string;
  /** Intrinsic bitmap width in CSS pixels. */
  readonly width: number;
  /** Intrinsic bitmap height in CSS pixels. */
  readonly height: number;
  /** Surrounding surface treatment; it never changes the bitmap itself. */
  readonly tone: BrandLogoTone;
  /** Requests eager loading for the one logo that is important to the page. */
  readonly priority?: boolean;
}
