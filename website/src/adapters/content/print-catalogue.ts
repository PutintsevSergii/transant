import type { ImageMetadata } from "astro";
import printCatalogue from "../../content/print-catalogue.json";
import type { TechnicalSheetProps } from "../../components/product/TechnicalSheet/TechnicalSheet.types";

const images = import.meta.glob<ImageMetadata>(
  "../../assets/images/technical-drawings/*.webp",
  { eager: true, import: "default" },
);

/** Resolves visually transcribed print data and source drawing crops at the adapter boundary. */
export function technicalSheetFor(
  productId: string,
  productName: string,
): TechnicalSheetProps {
  if (!(productId in printCatalogue))
    throw new Error(`Missing print catalogue record: ${productId}`);
  const record = printCatalogue[productId as keyof typeof printCatalogue];
  const props: TechnicalSheetProps = {
    productName,
    sourceLabel: `Product catalogue · p. ${record.printedPage}`,
    groups: record.groups.map((group) => ({
      title: group.title,
      rows: group.rows.map(([label, value]) => ({
        label: label!,
        value: value!,
      })),
    })),
    drawings: record.drawings.map((drawing) => {
      const image =
        images[`../../assets/images/technical-drawings/${drawing.asset}`];
      if (!image) throw new Error(`Missing catalogue drawing ${drawing.asset}`);
      return { title: drawing.title, image };
    }),
    tables: record.tables,
    features: record.features,
    notes: record.notes,
    labels: {
      eyebrow: "Wagon in detail",
      title: "Drawings & technical data",
      viewFullSize: "View full size",
      openDrawing: "Open drawing",
      withCatalogueDimensions: "with catalogue dimensions",
      scrollHint: "Scroll the table horizontally to see all columns.",
      scrollableTable: "Scrollable table",
      notSpecified: "Not specified in catalogue",
      specialFeatures: "Special features",
      catalogueNotes: "Catalogue notes",
    },
  };
  return props;
}
