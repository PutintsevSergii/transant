import { describe, expect, it } from "vitest";

import {
  contactCTAActionHref,
  validateContactCTAProps,
} from "../../src/components/home/ContactCTA/contact-cta-contract";
import type { ContactCTAProps } from "../../src/components/home/ContactCTA/ContactCTA.types";

const validProps = (): ContactCTAProps => ({
  title: "Discuss a project requirement",
  summary: "A caller-owned next step with a real contact route.",
  action: {
    href: "/contact/?source=fixture#inquiry",
    label: "Contact TransANT",
  },
});

describe("ContactCTA contract", () => {
  it("accepts caller-owned actions and encodes context into only the primary inquiry URL", () => {
    const props: ContactCTAProps = {
      ...validProps(),
      context: "Intermodal & container / 80 ft",
      supportingLinks: [
        { href: "/wagons/", label: "Browse wagon families" },
        {
          href: "https://example.test/contact",
          label: "Open contact note",
          external: true,
        },
      ],
    };

    expect(() => validateContactCTAProps(props)).not.toThrow();
    expect(contactCTAActionHref(props.action.href, props.context)).toBe(
      "/contact/?source=fixture&context=Intermodal+%26+container+%2F+80+ft#inquiry",
    );
    expect(contactCTAActionHref(props.action.href)).toBe(
      "/contact/?source=fixture#inquiry",
    );
  });

  it("rejects empty copy or context plus blank, placeholder, and unsafe action data", () => {
    const props = validProps();
    expect(() => validateContactCTAProps({ ...props, title: " " })).toThrow(
      "title and summary",
    );
    expect(() => validateContactCTAProps({ ...props, context: " " })).toThrow(
      "context must be non-empty",
    );
    expect(() =>
      validateContactCTAProps({
        ...props,
        action: { href: "#", label: "Contact TransANT" },
      }),
    ).toThrow("primary action requires");
    expect(() =>
      validateContactCTAProps({
        ...props,
        supportingLinks: [
          { href: "javascript:alert(1)", label: "Unsafe fixture link" },
        ],
      }),
    ).toThrow("supporting link requires");
    expect(() =>
      contactCTAActionHref("javascript:alert(1)", "Fixture"),
    ).toThrow("unsafe destination");
  });
});
