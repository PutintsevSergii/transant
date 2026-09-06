import type {
  EvidenceListAction,
  EvidenceListItem,
  EvidenceListProps,
} from "./EvidenceList.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeDestination = (href: string): boolean => {
  if (!isNonEmpty(href) || href.trim() === "#" || href === "about:blank") {
    return false;
  }

  if (href.startsWith("/")) {
    return !href.startsWith("//") && !/\s/.test(href);
  }

  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
};

const validateOptionalText = (
  value: string | undefined,
  label: string,
): void => {
  if (value !== undefined && !isNonEmpty(value)) {
    throw new Error(`EvidenceList ${label} must be omitted or non-empty.`);
  }
};

const validateAction = (action: EvidenceListAction): void => {
  if (!isNonEmpty(action.label) || !isSafeDestination(action.href)) {
    throw new Error(
      "EvidenceList actions require non-empty labels and safe internal or HTTPS destinations.",
    );
  }

  if (action.type === "external" && !action.href.startsWith("https://")) {
    throw new Error(
      "EvidenceList external actions require an HTTPS destination so C-002 can apply safe new-tab semantics.",
    );
  }
};

const validateItem = (item: EvidenceListItem): void => {
  if (!isNonEmpty(item.title) || !isNonEmpty(item.source.reference)) {
    throw new Error(
      "EvidenceList entries require non-empty titles and source references.",
    );
  }

  validateOptionalText(item.status, "source statuses");
  validateOptionalText(item.summary, "summaries");
  validateOptionalText(item.date, "dates");
  validateOptionalText(item.issuer, "issuers");
  validateOptionalText(item.scope, "scopes");

  if (item.action) validateAction(item.action);
};

/** Fails before render for incomplete provenance, metadata, or unsafe evidence links. */
export const validateEvidenceListProps = (props: EvidenceListProps): void => {
  if (!isNonEmpty(props.title)) {
    throw new Error("EvidenceList requires a non-empty title.");
  }

  if (props.source !== undefined && !isNonEmpty(props.source.reference)) {
    throw new Error(
      "EvidenceList collection sources must be omitted or contain a non-empty reference.",
    );
  }

  props.evidence?.forEach(validateItem);
};

/** Applies the F-002 publication boundary without mutating caller-owned records. */
export const approvedEvidenceListItems = (
  evidence: EvidenceListProps["evidence"],
): readonly EvidenceListItem[] =>
  evidence?.filter((item) => item.publicationStatus === "approved") ?? [];

/** C-002 receives explicit external meaning rather than guessing from copy. */
export const isExternalEvidenceAction = (action: EvidenceListAction): boolean =>
  action.type === "external";
