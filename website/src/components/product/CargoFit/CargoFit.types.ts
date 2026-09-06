import type {
  PublicationStatus,
  SourceAttribution,
} from "../../../domain/content/types";
import type { SectionIntroProps } from "../../core/SectionIntro/SectionIntro.types";

/** Keeps cargo declarations distinct from caller-owned operating use cases. */
export type CargoFitEntryKind = "cargo" | "use-case";

export interface CargoFitEntry {
  /** Explicitly identifies whether the source statement is cargo or a use case. */
  readonly kind: CargoFitEntryKind;
  /** Source-preserved text; the component never derives compatibility from it. */
  readonly label: string;
  /** Draft and unverified inputs remain valid but are not rendered. */
  readonly publicationStatus: PublicationStatus;
  /** Visible provenance for this individual cargo/use-case declaration. */
  readonly source: SourceAttribution;
}

export interface CargoFitProps {
  /** Caller selects the document-outline rank and editorial introduction. */
  readonly intro: SectionIntroProps;
  /** Optional caller-owned declarations in source order; no entries is an honest empty state. */
  readonly entries?: readonly CargoFitEntry[];
  readonly labels?: {
    readonly cargo: string;
    readonly application: string;
    readonly empty: string;
  };
}
