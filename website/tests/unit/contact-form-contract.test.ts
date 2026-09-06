import { describe, expect, it } from "vitest";

import { validateContactFormProps } from "../../src/components/form/ContactForm/contact-form-contract";
import type { ContactFormProps } from "../../src/components/form/ContactForm/ContactForm.types";

const validProps = (): ContactFormProps => ({
  endpoint: "/contact/submit",
  fields: {
    name: { label: "Name" },
    email: { label: "Business email" },
    company: { label: "Company" },
    message: { label: "Inquiry" },
    consent: { label: "I agree to the privacy notice." },
  },
  privacyNotice: { label: "Privacy notice", href: "/privacy/" },
  submitLabel: "Send inquiry",
});

describe("ContactForm contract", () => {
  it("accepts caller-owned same-site form data and optional visible context", () => {
    expect(() => validateContactFormProps(validProps())).not.toThrow();
    expect(() =>
      validateContactFormProps({
        ...validProps(),
        context: { label: "Product context", value: "Hopper wagon" },
      }),
    ).not.toThrow();
  });

  it("rejects unsafe server boundaries, missing legal data, and optional core fields", () => {
    const props = validProps();
    expect(() =>
      validateContactFormProps({ ...props, endpoint: "https://example.com" }),
    ).toThrow("safe same-site routes");
    expect(() =>
      validateContactFormProps({
        ...props,
        endpoint: "/contact/submit?source=lab",
      }),
    ).toThrow("safe same-site routes");
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
});
