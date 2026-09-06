import { describe, expect, it } from "vitest";

import {
  approvedEvidenceListItems,
  validateEvidenceListProps,
} from "../../src/components/editorial/EvidenceList/evidence-list-contract";
import type { EvidenceListProps } from "../../src/components/editorial/EvidenceList/EvidenceList.types";

const validProps = (): EvidenceListProps => ({
  title: "Source-bound evidence",
  headingLevel: 2,
  source: { reference: "Fixture collection source" },
  evidence: [
    {
      type: "certification",
      title: "Fixture certificate",
      publicationStatus: "approved",
      status: "Source record",
      date: "2026-01-15",
      issuer: "Fixture issuer",
      scope: "Fixture scope",
      source: { reference: "Fixture source" },
      action: {
        label: "Open source record",
        href: "https://example.com/record",
        type: "external",
      },
    },
    {
      type: "document",
      title: "Withheld record",
      publicationStatus: "draft",
      status: "Draft source",
      source: { reference: "Draft fixture source" },
    },
  ],
});

describe("EvidenceList contract", () => {
  it("accepts typed source-attributed evidence and publishes only approved records without mutation", () => {
    const props = validProps();
    expect(() => validateEvidenceListProps(props)).not.toThrow();
    const approved = approvedEvidenceListItems(props.evidence);
    expect(approved).toHaveLength(1);
    expect(approved[0]).toBe(props.evidence?.[0]);
    expect(props.evidence).toHaveLength(2);
  });

  it("rejects incomplete metadata and unsafe or ambiguous action semantics", () => {
    const props = validProps();
    expect(() => validateEvidenceListProps({ ...props, title: " " })).toThrow(
      "non-empty title",
    );
    expect(() =>
      validateEvidenceListProps({
        ...props,
        evidence: [{ ...props.evidence![0]!, status: " " }],
      }),
    ).toThrow("source statuses");
    expect(() =>
      validateEvidenceListProps({
        ...props,
        evidence: [
          {
            ...props.evidence![0]!,
            action: {
              label: "Unsafe",
              href: "javascript:alert(1)",
              type: "download",
            },
          },
        ],
      }),
    ).toThrow("safe internal or HTTPS");
    expect(() =>
      validateEvidenceListProps({
        ...props,
        evidence: [
          {
            ...props.evidence![0]!,
            action: {
              label: "Ambiguous external",
              href: "/evidence/record",
              type: "external",
            },
          },
        ],
      }),
    ).toThrow("external actions require an HTTPS");
  });
});
