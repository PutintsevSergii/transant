import { describe, expect, it } from "vitest";

import { validateContactFormProps } from "../../src/components/form/ContactForm/contact-form-contract";
import { buildContactMailtoHref } from "../../src/components/form/ContactForm/contact-form-mailto";
import type { ContactFormProps } from "../../src/components/form/ContactForm/ContactForm.types";

const validProps = (): ContactFormProps => ({
  recipient: "office@example.com",
  subject: "Freight wagon enquiry",
  fields: {
    name: { label: "Name" },
    email: { label: "Business email" },
    company: { label: "Company" },
    message: { label: "Inquiry" },
  },
  privacyNotice: { label: "Privacy notice", href: "/privacy/" },
  submitLabel: "Continue in email",
});

describe("ContactForm contract", () => {
  it("accepts caller-owned mail-client data and optional visible context", () => {
    expect(() => validateContactFormProps(validProps())).not.toThrow();
    expect(() =>
      validateContactFormProps({
        ...validProps(),
        context: { label: "Product context", value: "Hopper wagon" },
      }),
    ).not.toThrow();
  });

  it("rejects unsafe mail data, missing legal data, and optional core fields", () => {
    const props = validProps();
    expect(() =>
      validateContactFormProps({ ...props, recipient: "not-an-email" }),
    ).toThrow("recipients");
    expect(() =>
      validateContactFormProps({
        ...props,
        subject: "Line one\nBcc: hidden@example.com",
      }),
    ).toThrow("single-line");
    expect(() =>
      validateContactFormProps({
        ...props,
        privacyNotice: { label: "Privacy notice", href: "#" },
      }),
    ).toThrow("privacy notices");
    expect(() =>
      validateContactFormProps({
        ...props,
        fields: {
          ...props.fields,
          email: { label: "Business email", required: false },
        },
      }),
    ).toThrow("remain required");
  });

  it("builds one encoded email body in source order and omits blank company data", () => {
    const href = buildContactMailtoHref({
      recipient: "office@example.com",
      subject: "Wagon enquiry & route",
      name: { label: "Name", value: "  Alex Morgan  " },
      email: { label: "Business email", value: "alex@example.com" },
      company: { label: "Company", value: "   " },
      context: { label: "Product context", value: "UNO Timber 60ft" },
      message: {
        label: "Transport requirement",
        value: "Timber & steel\nLinz–Berlin",
      },
    });
    const url = new URL(href);

    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("office@example.com");
    expect(url.searchParams.get("subject")).toBe("Wagon enquiry & route");
    expect(url.searchParams.get("body")).toBe(
      "Name: Alex Morgan\r\nBusiness email: alex@example.com\r\nProduct context: UNO Timber 60ft\r\n\r\nTransport requirement:\r\nTimber & steel\nLinz–Berlin",
    );
    expect(url.searchParams.get("body")).not.toContain("Company:");
  });
});
