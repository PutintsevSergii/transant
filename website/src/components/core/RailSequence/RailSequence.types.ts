export type RailSequenceTheme = "light" | "dark";

/** Maximum number of columns used by the wide, component-owned composition. */
export type RailSequenceColumns = 1 | 2 | 3 | 4;

export interface RailSequenceItem {
  /** Explicit stage identifier; callers may use values such as `01` or `A`. */
  readonly number: string;
  /** Short, visible stage name. It becomes the link label when `href` is present. */
  readonly title: string;
  /** Explanation of the stage; it may wrap and grow naturally. */
  readonly description: string;
  /** Optional real destination for the stage title. */
  readonly href?: string;
}

export interface RailSequenceProps {
  /** Ordered sequence of two to six explicit stages. */
  readonly items: readonly RailSequenceItem[];
  /** Foreground treatment only; the embedding context owns the surface. */
  readonly theme: RailSequenceTheme;
  /** Wide-composition column count. Narrow containers always stack vertically. */
  readonly columns: RailSequenceColumns;
  /** Optional visible and accessible label for the ordered list. */
  readonly label?: string;
}
