import { describe, expect, it } from "vitest";

import {
  approvedQualityImpactTopics,
  validateQualityImpactSectionProps,
} from "../../src/components/home/QualityImpactSection/quality-impact-section-contract";
import type { QualityImpactSectionProps } from "../../src/components/home/QualityImpactSection/QualityImpactSection.types";

const evidence = (type: "file" | "external" = "file") => ({
  label: "Open supporting record",
  href:
    type === "file"
      ? "/evidence/record.pdf"
      : "https://evidence.example.test/record",
  type,
  source: { reference: "Source register" },
});

const topic = (
  statementType:
    | "certification"
    | "policy"
    | "capability"
    | "target"
    | "marketing-statement",
  publicationStatus: "approved" | "draft" | "unverified" = "approved",
) => ({
  statementType,
  title: `${statementType} topic`,
  summary: "A source-owned statement that preserves its claim category.",
  publicationStatus,
  source: { reference: "Topic register" },
  evidenceLinks: [evidence()],
  ...(statementType === "certification"
    ? {
        certificate: {
          identifier: "CERT-001",
          issuer: "Assessment body",
          scope: "Fixture-only scope",
          source: { reference: "Certificate register" },
        },
      }
    : {}),
});

const validProps = (): QualityImpactSectionProps => ({
  intro: {
    title: "Quality evidence",
    headingLevel: 2,
    align: "left",
    theme: "light",
    measure: "wide",
  },
  topics: [topic("certification"), topic("policy")],
});

describe("QualityImpactSection contract", () => {
  it("accepts category-aware two-plus topic inputs and filters draft or unverified inputs without parsing claims", () => {
    const props = validProps();
    expect(() => validateQualityImpactSectionProps(props)).not.toThrow();
    expect(
      approvedQualityImpactTopics([
        topic("policy"),
        topic("target", "draft"),
        topic("marketing-statement", "unverified"),
      ]),
    ).toHaveLength(1);
  });

  it("rejects incomplete, unsafe, unproven, and malformed certificate input", () => {
    const props = validProps();
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [topic("policy")],
      }),
    ).toThrow("at least two topics");
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [
          { ...topic("policy"), source: { reference: " " } },
          topic("target"),
        ],
      }),
    ).toThrow("title, summary, and source reference");
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [
          {
            ...topic("policy"),
            evidenceLinks: [
              { ...evidence("external"), href: "javascript:alert(1)" },
            ],
          },
          topic("target"),
        ],
      }),
    ).toThrow("safe non-placeholder");
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [
          {
            statementType: "certification",
            title: "Certification without metadata",
            summary: "A certification requires its source-preserved metadata.",
            publicationStatus: "approved",
            source: { reference: "Topic register" },
            evidenceLinks: [evidence()],
          },
          topic("policy"),
        ],
      }),
    ).toThrow("require certificate metadata");
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [
          {
            ...topic("certification"),
            certificate: {
              identifier: " ",
              issuer: "Assessment body",
              scope: "Fixture-only scope",
              source: { reference: "Certificate register" },
            },
          },
          topic("policy"),
        ],
      }),
    ).toThrow("certificate metadata requires");
    expect(() =>
      validateQualityImpactSectionProps({
        ...props,
        topics: [
          {
            ...topic("policy"),
            certificate: {
              identifier: "CERT-001",
              issuer: "Assessment body",
              scope: "Fixture-only scope",
              source: { reference: "Certificate register" },
            },
          },
          topic("target"),
        ],
      }),
    ).toThrow("permitted only for certification");
  });
});
