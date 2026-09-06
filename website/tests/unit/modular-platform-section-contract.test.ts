import { describe, expect, it } from "vitest";

import { validateModularPlatformSectionProps } from "../../src/components/home/ModularPlatformSection/modular-platform-section-contract";
import type { ModularPlatformSectionProps } from "../../src/components/home/ModularPlatformSection/ModularPlatformSection.types";

const stage = (number: string) => ({
  number,
  title: `Stage ${number}`,
  description: `A useful description for stage ${number}.`,
});

const validProps = (): ModularPlatformSectionProps => ({
  intro: {
    title: "A modular platform",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "wide",
  },
  stages: [stage("01"), stage("02"), stage("03"), stage("04")],
});

describe("ModularPlatformSection contract", () => {
  it("accepts the standard four stages, alternate counts, and an optional technical link", () => {
    const props = validProps();
    expect(() => validateModularPlatformSectionProps(props)).not.toThrow();
    expect(() =>
      validateModularPlatformSectionProps({
        ...props,
        stages: [stage("A"), stage("B"), stage("C")],
        technicalLink: {
          href: "/technical-note/",
          label: "Read technical note",
        },
      }),
    ).not.toThrow();
  });

  it("rejects incomplete, duplicate, malformed, and unsafe caller input", () => {
    const props = validProps();

    expect(() =>
      validateModularPlatformSectionProps({
        ...props,
        intro: { ...props.intro, title: " " },
      }),
    ).toThrow("non-empty intro title");
    expect(() =>
      validateModularPlatformSectionProps({ ...props, stages: [stage("01")] }),
    ).toThrow("between two and six");
    expect(() =>
      validateModularPlatformSectionProps({
        ...props,
        stages: [stage("01"), stage("01")],
      }),
    ).toThrow("must be unique");
    expect(() =>
      validateModularPlatformSectionProps({
        ...props,
        stages: [{ ...stage("01"), description: " " }, stage("02")],
      }),
    ).toThrow("non-empty number, title, and description");
    expect(() =>
      validateModularPlatformSectionProps({
        ...props,
        technicalLink: { href: "#", label: "Read technical note" },
      }),
    ).toThrow("safe non-placeholder");
  });
});
