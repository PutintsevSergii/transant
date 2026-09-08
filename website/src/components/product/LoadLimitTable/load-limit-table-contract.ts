import type { LoadLimitRow } from "../../../domain/content/types";

import type { LoadLimitTableProps } from "./LoadLimitTable.types";

const routeClasses = ["A", "B", "C", "D"] as const;

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const validateRows = (rows: readonly LoadLimitRow[]): void => {
  if (rows.length !== routeClasses.length) {
    throw new Error(
      "LoadLimitTable requires all four source-ordered A–D route-class rows.",
    );
  }

  rows.forEach((row, index) => {
    if (row.routeClass !== routeClasses[index]) {
      throw new Error(
        "LoadLimitTable requires source-ordered A–D route-class rows without reordering.",
      );
    }

    if (!isNonEmpty(row.payload)) {
      throw new Error(
        "LoadLimitTable payloads must be non-empty source-preserved strings.",
      );
    }
  });
};

/** Fails before render when relational engineering context would be incomplete. */
export const validateLoadLimitTableProps = (
  props: LoadLimitTableProps,
): void => {
  if (!isNonEmpty(props.title) || !isNonEmpty(props.caption)) {
    throw new Error(
      "LoadLimitTable requires non-empty title and caption text.",
    );
  }

  if (!isNonEmpty(props.source.reference)) {
    throw new Error("LoadLimitTable requires a source reference.");
  }

  if (
    !isNonEmpty(props.columns.routeClass) ||
    !isNonEmpty(props.columns.payload)
  ) {
    throw new Error("LoadLimitTable requires non-empty column labels.");
  }

  if (
    props.columns.payloadUnit !== undefined &&
    !isNonEmpty(props.columns.payloadUnit)
  ) {
    throw new Error(
      "LoadLimitTable payload units must be omitted when unavailable or contain a source-supplied value.",
    );
  }

  for (const label of [
    props.scrollHint,
    props.scrollRegionLabel,
    props.notesLabel,
  ]) {
    if (label !== undefined && !isNonEmpty(label)) {
      throw new Error(
        "LoadLimitTable localized labels must be omitted or non-empty.",
      );
    }
  }

  validateRows(props.rows);

  if (
    props.notes !== undefined &&
    (props.notes.length === 0 || props.notes.some((note) => !isNonEmpty(note)))
  ) {
    throw new Error(
      "LoadLimitTable notes must be omitted or contain one or more non-empty source-supplied notes.",
    );
  }
};
