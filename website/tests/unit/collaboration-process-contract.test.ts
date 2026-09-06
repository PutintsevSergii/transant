import { describe, expect, it } from "vitest";

import { validateCollaborationProcessProps } from "../../src/components/home/CollaborationProcess/collaboration-process-contract";
import type { CollaborationProcessProps } from "../../src/components/home/CollaborationProcess/CollaborationProcess.types";

const step = (number: string) => ({
  number,
  title: `Stage ${number}`,
  description: `A useful description for stage ${number}.`,
});

const validProps = (): CollaborationProcessProps => ({
  intro: {
    title: "A clear collaboration process",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "wide",
  },
  steps: [step("01"), step("02"), step("03"), step("04")],
});

describe("CollaborationProcess contract", () => {
  it("accepts the standard four steps, expanded steps, and an optional safe contact route", () => {
    const props = validProps();
    expect(() => validateCollaborationProcessProps(props)).not.toThrow();
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        steps: [
          step("A"),
          step("B"),
          step("C"),
          step("D"),
          step("E"),
          step("F"),
        ],
        contactLink: {
          href: "/contact-context/",
          label: "Discuss the process",
        },
      }),
    ).not.toThrow();
  });

  it("rejects incomplete, duplicate, malformed, and unsafe caller input", () => {
    const props = validProps();

    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        intro: { ...props.intro, title: " " },
      }),
    ).toThrow("non-empty intro title");
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        steps: [step("01"), step("02"), step("03")],
      }),
    ).toThrow("between four and six");
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        steps: [
          step("01"),
          step("02"),
          step("03"),
          step("04"),
          step("05"),
          step("06"),
          step("07"),
        ],
      }),
    ).toThrow("between four and six");
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        steps: [step("01"), step("01"), step("03"), step("04")],
      }),
    ).toThrow("must be unique");
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        steps: [
          { ...step("01"), description: " " },
          step("02"),
          step("03"),
          step("04"),
        ],
      }),
    ).toThrow("non-empty number, title, and description");
    expect(() =>
      validateCollaborationProcessProps({
        ...props,
        contactLink: { href: "#", label: "Discuss the process" },
      }),
    ).toThrow("safe non-placeholder");
  });
});
