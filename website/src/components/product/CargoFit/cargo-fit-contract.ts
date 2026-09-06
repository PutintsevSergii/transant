import type { CargoFitEntry, CargoFitProps } from "./CargoFit.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const validateEntry = (entry: CargoFitEntry): void => {
  if (
    !isNonEmpty(entry.label) ||
    !isNonEmpty(entry.source.reference) ||
    !["cargo", "use-case"].includes(entry.kind)
  ) {
    throw new Error(
      "CargoFit entries require a cargo/use-case kind, non-empty source-preserved label, and source reference.",
    );
  }
};

/** Fails before render for incomplete editorial context or unsupported provenance. */
export const validateCargoFitProps = (props: CargoFitProps): void => {
  if (!isNonEmpty(props.intro.title)) {
    throw new Error("CargoFit requires a non-empty intro title.");
  }

  props.entries?.forEach(validateEntry);
};

/** Applies F-002's publication boundary without modifying caller-owned entries. */
export const approvedCargoFitEntries = (
  entries: CargoFitProps["entries"],
): readonly CargoFitEntry[] =>
  entries?.filter((entry) => entry.publicationStatus === "approved") ?? [];
