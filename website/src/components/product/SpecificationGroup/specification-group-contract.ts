import type {
  SpecificationGroupProps,
  SpecificationRow,
} from "./SpecificationGroup.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const validateRow = (row: SpecificationRow): void => {
  if (!isNonEmpty(row.label) || !isNonEmpty(row.value)) {
    throw new Error(
      "SpecificationGroup rows require non-empty source-preserved labels and values.",
    );
  }

  if (row.unit !== undefined && !isNonEmpty(row.unit)) {
    throw new Error(
      "SpecificationGroup units must be omitted when unavailable or contain a source-supplied value.",
    );
  }
};

/** Fails before render when dense technical data would lose its semantic context. */
export const validateSpecificationGroupProps = (
  props: SpecificationGroupProps,
): void => {
  if (!isNonEmpty(props.title)) {
    throw new Error("SpecificationGroup requires a non-empty title.");
  }

  if (!isNonEmpty(props.source.reference)) {
    throw new Error("SpecificationGroup requires a source reference.");
  }

  if (props.rows.length === 0) {
    throw new Error(
      "SpecificationGroup requires one or more specification rows.",
    );
  }

  props.rows.forEach(validateRow);
};
