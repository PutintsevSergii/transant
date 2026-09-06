import type {
  TechnicalSheetProps,
  TechnicalTable,
} from "./TechnicalSheet.types";

export function validateTechnicalTable(table: TechnicalTable): void {
  if (
    !table.title.trim() ||
    table.headers.length < 2 ||
    !table.rows.length ||
    table.headers.some((label) => !label.trim())
  ) {
    throw new Error(
      "Technical tables require a title, headers and source rows.",
    );
  }
  for (const row of table.rows) {
    if (
      !row[0]?.text.trim() ||
      row.some(
        (cell) =>
          typeof cell.text !== "string" ||
          !Number.isInteger(cell.colSpan ?? 1) ||
          (cell.colSpan ?? 1) < 1,
      ) ||
      row.reduce((count, cell) => count + (cell.colSpan ?? 1), 0) !==
        table.headers.length
    ) {
      throw new Error(
        "Technical table cells must cover exactly the source columns.",
      );
    }
  }
}

export function validateTechnicalSheet(props: TechnicalSheetProps): void {
  if (
    !props.productName.trim() ||
    !props.sourceLabel.trim() ||
    !props.drawings.length ||
    !props.groups.length
  ) {
    throw new Error(
      "Technical sheets require identity, source, drawings and specifications.",
    );
  }
  for (const group of props.groups) {
    if (
      !group.title.trim() ||
      !group.rows.length ||
      group.rows.some((row) => !row.label.trim() || !row.value.trim())
    ) {
      throw new Error("Specification groups require source labels and values.");
    }
  }
  for (const drawing of props.drawings) {
    if (
      !drawing.title.trim() ||
      !drawing.image.src ||
      drawing.image.width <= 0 ||
      drawing.image.height <= 0
    ) {
      throw new Error(
        "Technical drawings require local media and explicit dimensions.",
      );
    }
  }
  props.tables.forEach(validateTechnicalTable);
}
