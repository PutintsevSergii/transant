import { describe, expect, it } from "vitest";

import { validatePayloadValueSectionProps } from "../../src/components/home/PayloadValueSection/payload-value-section-contract";
import type { PayloadValueSectionProps } from "../../src/components/home/PayloadValueSection/PayloadValueSection.types";

const validProps: PayloadValueSectionProps = {
  intro: {
    title: "Payload proposition",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "standard",
  },
  body: "Supporting editorial explanation.",
  principles: [
    { title: "One", description: "First principle." },
    { title: "Two", description: "Second principle." },
    { title: "Three", description: "Third principle." },
  ],
};

describe("validatePayloadValueSectionProps", () => {
  it("accepts three or four complete principles and an optional safe source link", () => {
    expect(() => validatePayloadValueSectionProps(validProps)).not.toThrow();
    expect(() =>
      validatePayloadValueSectionProps({
        ...validProps,
        principles: [
          { title: "One", description: "First principle." },
          { title: "Two", description: "Second principle." },
          { title: "Three", description: "Third principle." },
          { title: "Four", description: "Fourth principle." },
        ],
        sourceLink: { href: "/source", label: "Read source" },
      }),
    ).not.toThrow();
  });

  it("rejects empty editorial fields and incomplete principles", () => {
    expect(() =>
      validatePayloadValueSectionProps({ ...validProps, body: " " }),
    ).toThrow(/non-empty/i);
    expect(() =>
      validatePayloadValueSectionProps({
        ...validProps,
        principles: [
          { title: "One", description: "First principle." },
          { title: "Two", description: " " },
          { title: "Three", description: "Third principle." },
        ],
      }),
    ).toThrow(/titles and descriptions/i);
  });

  it("rejects source links with unsafe protocols or blank labels", () => {
    expect(() =>
      validatePayloadValueSectionProps({
        ...validProps,
        sourceLink: { href: "javascript:alert(1)", label: "Unsafe" },
      }),
    ).toThrow(/safe HTTP/i);
    expect(() =>
      validatePayloadValueSectionProps({
        ...validProps,
        sourceLink: { href: "/source", label: " " },
      }),
    ).toThrow(/safe HTTP/i);
  });
});
