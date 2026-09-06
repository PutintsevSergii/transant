import type {
  WagonFamilySummary,
  WagonSwitchyardProps,
} from "./WagonSwitchyard.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeFamilyHref = (href: string): boolean => {
  if (href.trim() === "#") return false;

  try {
    const reference = new URL(href, "https://component.transant.test");
    return ["http:", "https:"].includes(reference.protocol);
  } catch {
    return false;
  }
};

const assertFamily = (family: WagonFamilySummary): void => {
  const required = [
    family.id,
    family.sequence,
    family.familyName,
    family.modelCode,
    family.headline,
    family.summary,
    family.href,
    family.linkLabel,
  ];

  if (required.some((value) => !isNonEmpty(value))) {
    throw new Error(
      "WagonSwitchyard families require non-empty identity, copy, and link values.",
    );
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(family.id)) {
    throw new Error(
      "WagonSwitchyard family IDs must be stable lowercase tokens.",
    );
  }
  if (!isSafeFamilyHref(family.href)) {
    throw new Error(
      "WagonSwitchyard family links require safe non-placeholder HTTP(S) references.",
    );
  }
  if (!family.image || family.image.width <= 0 || family.image.height <= 0) {
    throw new Error("WagonSwitchyard families require local image metadata.");
  }
  if (/^https?:\/\//i.test(family.image.src)) {
    throw new Error(
      "WagonSwitchyard families require build-owned local images.",
    );
  }
  if (
    family.technicalLabel !== undefined &&
    !isNonEmpty(family.technicalLabel)
  ) {
    throw new Error(
      "WagonSwitchyard technicalLabel must be omitted or contain meaningful text.",
    );
  }
};

/** Fails before rendering an incomplete or unsafe browse control. */
export function validateWagonSwitchyardProps(
  props: WagonSwitchyardProps,
): void {
  if (!isNonEmpty(props.id) || !isNonEmpty(props.heading)) {
    throw new Error("WagonSwitchyard requires a non-empty id and heading.");
  }
  if (props.eyebrow !== undefined && !isNonEmpty(props.eyebrow)) {
    throw new Error(
      "WagonSwitchyard eyebrow must be omitted or contain meaningful text.",
    );
  }
  if (props.summary !== undefined && !isNonEmpty(props.summary)) {
    throw new Error(
      "WagonSwitchyard summary must be omitted or contain meaningful text.",
    );
  }
  if (props.selectionLabel !== undefined && !isNonEmpty(props.selectionLabel)) {
    throw new Error(
      "WagonSwitchyard selectionLabel must be omitted or contain meaningful text.",
    );
  }
  if (
    props.selectionAriaLabel !== undefined &&
    !isNonEmpty(props.selectionAriaLabel)
  ) {
    throw new Error(
      "WagonSwitchyard selectionAriaLabel must be omitted or contain meaningful text.",
    );
  }
  if (
    props.supportingCopy !== undefined &&
    (props.supportingCopy.length !== 2 ||
      props.supportingCopy.some((copy) => !isNonEmpty(copy)))
  ) {
    throw new Error(
      "WagonSwitchyard supportingCopy must contain two meaningful strings.",
    );
  }
  if (props.families.length !== 5) {
    throw new Error("WagonSwitchyard requires exactly five wagon families.");
  }

  props.families.forEach(assertFamily);
  const ids = new Set(props.families.map((family) => family.id));
  const sequences = new Set(props.families.map((family) => family.sequence));
  if (
    ids.size !== props.families.length ||
    sequences.size !== props.families.length
  ) {
    throw new Error(
      "WagonSwitchyard family IDs and sequences must be unique within an instance.",
    );
  }
}
