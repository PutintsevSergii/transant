import type { ImageMetadata } from "astro";
import { describe, expect, it } from "vitest";

import {
  approvedOperationalCaseStudyFacts,
  validateOperationalCaseStudyProps,
} from "../../src/components/home/OperationalCaseStudy/operational-case-study-contract";
import type { OperationalCaseStudyProps } from "../../src/components/home/OperationalCaseStudy/OperationalCaseStudy.types";

const localImage = {
  src: "/fixture.jpg",
  width: 1600,
  height: 1000,
  format: "jpg",
} as ImageMetadata;

const media = {
  image: localImage,
  alt: "A useful fixture image.",
  sizes: "100vw",
  fit: "cover" as const,
  aspectRatio: "16 / 10",
};

const fact = (publicationStatus: "approved" | "draft" | "unverified") => ({
  label: "Route",
  value: "Fixture route",
  publicationStatus,
  source: { reference: "Fixture source" },
});

const validProps = (): OperationalCaseStudyProps => ({
  eyebrow: "Operational proof",
  title: "A source-owned case title",
  summary: "An evidence-led fixture summary.",
  media,
  facts: [],
});

describe("OperationalCaseStudy contract", () => {
  it("accepts zero, one, and multiple source-attributed fact inputs while exposing only approved facts", () => {
    const zeroFacts = validProps();
    const oneFact = { ...validProps(), facts: [fact("approved")] };
    const multipleFacts = {
      ...validProps(),
      facts: [fact("approved"), fact("draft"), fact("unverified")],
      href: { href: "/projects/fixture/", label: "Read project context" },
      download: {
        href: "https://example.test/source-record.pdf",
        label: "Open source record",
        external: true,
      },
    };

    expect(() => validateOperationalCaseStudyProps(zeroFacts)).not.toThrow();
    expect(() => validateOperationalCaseStudyProps(oneFact)).not.toThrow();
    expect(() =>
      validateOperationalCaseStudyProps(multipleFacts),
    ).not.toThrow();
    expect(approvedOperationalCaseStudyFacts(zeroFacts.facts)).toEqual([]);
    expect(approvedOperationalCaseStudyFacts(oneFact.facts)).toHaveLength(1);
    expect(approvedOperationalCaseStudyFacts(multipleFacts.facts)).toEqual([
      multipleFacts.facts[0],
    ]);
  });

  it("rejects incomplete media, malformed evidence, and placeholder destinations", () => {
    const props = validProps();

    expect(() =>
      validateOperationalCaseStudyProps({
        ...props,
        title: " ",
      }),
    ).toThrow("non-empty eyebrow, title, and summary");
    expect(() =>
      validateOperationalCaseStudyProps({
        ...props,
        media: { ...media, alt: "" },
      }),
    ).toThrow("meaningful alt text");
    expect(() =>
      validateOperationalCaseStudyProps({
        ...props,
        media: { ...media, fit: "contain" },
      }),
    ).toThrow("cover fit");
    expect(() =>
      validateOperationalCaseStudyProps({
        ...props,
        facts: [{ ...fact("approved"), source: { reference: " " } }],
      }),
    ).toThrow("source references");
    expect(() =>
      validateOperationalCaseStudyProps({
        ...props,
        href: { href: "#", label: "Read project context" },
      }),
    ).toThrow("safe non-placeholder destination");
  });
});
