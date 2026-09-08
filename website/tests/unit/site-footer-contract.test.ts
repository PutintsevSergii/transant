import { describe, expect, it } from "vitest";

import {
  assertSiteFooterProps,
  toEmailHref,
  toTelephoneHref,
} from "../../src/components/shell/SiteFooter/site-footer-contract";
import type { SiteFooterProps } from "../../src/components/shell/SiteFooter/SiteFooter.types";

const validProps: SiteFooterProps = {
  groups: [
    { heading: "Wagons", links: [{ label: "All wagons", href: "/wagons/" }] },
  ],
  contact: {
    verification: "verified",
    companyName: "Test company",
    addressLines: ["Test address"],
    phone: "+1 (202) 555-0148",
    email: "footer-contact@example.test",
  },
  legalLinks: [{ label: "Privacy", href: "/privacy/" }],
  copyright: "© Test data",
};

describe("SiteFooter contract", () => {
  it("formats approved direct contact destinations", () => {
    expect(toTelephoneHref("+1 (202) 555-0148")).toBe("tel:+12025550148");
    expect(toEmailHref("footer-contact@example.test")).toBe(
      "mailto:footer-contact@example.test",
    );
  });

  it("rejects blank destinations and malformed direct contact values", () => {
    expect(() => toTelephoneHref("phone pending")).toThrow("tel link");
    expect(() => toEmailHref("contact pending")).toThrow("mailto link");
    expect(() =>
      assertSiteFooterProps({
        ...validProps,
        legalLinks: [{ label: "Privacy", href: " " }],
      }),
    ).toThrow("destination");
  });

  it("requires verified, complete company contact data", () => {
    expect(() =>
      assertSiteFooterProps({
        ...validProps,
        contact: {
          ...validProps.contact,
          verification: "pending" as "verified",
        },
      }),
    ).toThrow("verified contact");
    expect(() =>
      assertSiteFooterProps({
        ...validProps,
        groups: [
          { heading: " ", links: [{ label: "All wagons", href: "/wagons/" }] },
        ],
      }),
    ).toThrow("heading");
  });

  it("accepts an approved affiliation and rejects a blank one", () => {
    expect(
      assertSiteFooterProps({
        ...validProps,
        affiliation: "Part of TAS Group",
      }).affiliation,
    ).toBe("Part of TAS Group");
    expect(() =>
      assertSiteFooterProps({ ...validProps, affiliation: " " }),
    ).toThrow("affiliation");
  });
});
