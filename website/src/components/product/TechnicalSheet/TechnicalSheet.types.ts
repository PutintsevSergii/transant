import type { ImageMetadata } from "astro";
import type { EngineeringRow } from "../../../domain/content/types";

export interface TechnicalCell {
  readonly text: string;
  readonly colSpan?: number;
}

export interface TechnicalTable {
  readonly title: string;
  readonly kind: string;
  readonly headers: readonly string[];
  readonly rows: readonly (readonly TechnicalCell[])[];
  readonly notes: readonly string[];
}

export interface TechnicalSheetLabels {
  readonly eyebrow: string;
  readonly title: string;
  readonly viewFullSize: string;
  readonly openDrawing: string;
  readonly withCatalogueDimensions: string;
  readonly scrollHint: string;
  readonly scrollableTable: string;
  readonly notSpecified: string;
  readonly specialFeatures: string;
  readonly catalogueNotes: string;
}

/** Source-derived technical content; values, blanks and merged cells stay literal. */
export interface TechnicalSheetProps {
  readonly productName: string;
  readonly sourceLabel: string;
  readonly groups: readonly {
    readonly title: string;
    readonly rows: readonly EngineeringRow[];
  }[];
  readonly drawings: readonly {
    readonly title: string;
    readonly image: ImageMetadata;
  }[];
  readonly tables: readonly TechnicalTable[];
  readonly features: readonly string[];
  readonly notes: readonly string[];
  readonly labels?: TechnicalSheetLabels;
}
