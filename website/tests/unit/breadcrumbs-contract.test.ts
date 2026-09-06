import { describe, expect, it } from "vitest";

import {
  breadcrumbsJsonLd,
  breadcrumbsJsonLdScript,
  validateBreadcrumbsProps,
} from "../../src/components/catalogue/Breadcrumbs/breadcrumbs-contract";
import type { BreadcrumbsProps } from "../../src/components/catalogue/Breadcrumbs/Breadcrumbs.types";

const validProps = (): BreadcrumbsProps => ({
  baseUrl: "https://www.transant.example",
  items: [
    { label: "Home", href: "/" },
    { label: "Wagons", href: "/wagons/" },
    {
      label: "Intermodal wagons for container transport",
      compactLabel: "Intermodal",
      href: "/wagons/intermodal/",
    },
  ],
});

describe("Breadcrumbs contract", () => {
  it("preserves complete ordered paths in valid canonical JSON-LD", () => {
    const props = validProps();

    expect(() => validateBreadcrumbsProps(props)).not.toThrow();
    expect(breadcrumbsJsonLd(props)).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.transant.example/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Wagons",
          item: "https://www.transant.example/wagons/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Intermodal wagons for container transport",
          item: "https://www.transant.example/wagons/intermodal/",
        },
      ],
    });
    expect(breadcrumbsJsonLdScript(props)).toContain("BreadcrumbList");
  });

  it("rejects empty, duplicate, unsafe, external, and malformed path input", () => {
    const props = validProps();

    expect(() =>
      validateBreadcrumbsProps({ ...props, baseUrl: "not a URL" }),
    ).toThrow("absolute HTTP(S) base URL");
    expect(() => validateBreadcrumbsProps({ ...props, items: [] })).toThrow(
      "at least one current",
    );
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        items: [{ label: " ", href: "/" }],
      }),
    ).toThrow("non-empty labels");
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        items: [
          { label: "Home", href: "/" },
          { label: "Current", href: "/" },
        ],
      }),
    ).toThrow("must not repeat");
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        items: [{ label: "Unsafe", href: "javascript:alert(1)" }],
      }),
    ).toThrow("safe same-site canonical paths");
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        items: [{ label: "External", href: "//example.test/wagons/" }],
      }),
    ).toThrow("safe same-site canonical paths");
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        items: [{ label: "Whitespace", href: "/wagon path/" }],
      }),
    ).toThrow("safe same-site canonical paths");
    expect(() =>
      validateBreadcrumbsProps({
        ...props,
        label: " ",
      }),
    ).toThrow("navigation label");
  });
});
