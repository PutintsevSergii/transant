import { describe, expect, it } from "vitest";

import { assertBaseLayoutProps } from "../../src/layouts/base-layout-contract";
import type { BaseLayoutProps } from "../../src/layouts/BaseLayout.types";

const props = {
  language: "en-GB",
  title: "Engineering & Services",
  description: "A page-specific TransANT technology summary.",
  canonicalUrl: "https://www.transant.test/pro-platform-projects/",
  header: {
    homeHref: "/",
    navigation: [
      { label: "PRO platform projects", href: "/pro-platform-projects/" },
    ],
    currentPath: "/pro-platform-projects/",
    localeOptions: [{ label: "EN", href: "/", current: true }],
    contactAction: { label: "Contact", href: "/contact/" },
  },
  footer: {
    groups: [
      { heading: "Wagons", links: [{ label: "Wagons", href: "/wagons/" }] },
    ],
    contact: {
      verification: "verified",
      companyName: "TransANT test",
      addressLines: ["Test address"],
      phone: "+1 202 555 0148",
      email: "layout@example.test",
    },
    legalLinks: [{ label: "Privacy", href: "/privacy/" }],
    copyright: "© TransANT test.",
  },
} satisfies BaseLayoutProps;

describe("BaseLayout contract", () => {
  it("defaults only to the approved local brand favicon", () => {
    expect(assertBaseLayoutProps(props).faviconHref).toBe(
      "/brand/transant-logo.png",
    );
  });

  it.each([
    [{ ...props, language: "english" }],
    [{ ...props, title: " " }],
    [{ ...props, description: " " }],
    [{ ...props, canonicalUrl: "/pro-platform-projects/" }],
    [{ ...props, faviconHref: "https://example.test/icon.png" }],
  ])("rejects incomplete or non-local document data", (invalidProps) => {
    expect(() => assertBaseLayoutProps(invalidProps)).toThrow();
  });
});
