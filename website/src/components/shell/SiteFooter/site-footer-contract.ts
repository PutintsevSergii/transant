import type {
  SiteFooterContact,
  SiteFooterLink,
  SiteFooterProps,
} from "./SiteFooter.types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

function requireText(value: string, name: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error(`SiteFooter requires a non-empty ${name}.`);
  return normalized;
}

function validateLinks(links: readonly SiteFooterLink[], name: string): void {
  if (links.length === 0) {
    throw new Error(`SiteFooter requires at least one ${name} link.`);
  }

  for (const [index, link] of links.entries()) {
    requireText(link.label, `${name} link ${index + 1} label`);
    requireText(link.href, `${name} link ${index + 1} destination`);
  }
}

export function toTelephoneHref(phone: string): string {
  const normalized = requireText(phone, "contact phone").replace(
    /[\s().-]/gu,
    "",
  );
  if (!/^\+?[0-9]{3,}$/u.test(normalized)) {
    throw new Error(
      "SiteFooter requires a phone number suitable for a tel link.",
    );
  }
  return `tel:${normalized}`;
}

export function toEmailHref(email: string): string {
  const normalized = requireText(email, "contact email");
  if (!emailPattern.test(normalized)) {
    throw new Error(
      "SiteFooter requires an email address suitable for a mailto link.",
    );
  }
  return `mailto:${normalized}`;
}

function validateContact(contact: SiteFooterContact): void {
  if (contact.verification !== "verified") {
    throw new Error("SiteFooter only accepts verified contact information.");
  }

  requireText(contact.companyName, "contact company name");
  if (contact.addressLines.length === 0) {
    throw new Error("SiteFooter requires at least one contact address line.");
  }
  for (const [index, addressLine] of contact.addressLines.entries()) {
    requireText(addressLine, `contact address line ${index + 1}`);
  }
  toTelephoneHref(contact.phone);
  toEmailHref(contact.email);
}

export function assertSiteFooterProps(props: SiteFooterProps): SiteFooterProps {
  if (props.groups.length === 0) {
    throw new Error("SiteFooter requires at least one navigation group.");
  }
  for (const [index, group] of props.groups.entries()) {
    requireText(group.heading, `navigation group ${index + 1} heading`);
    validateLinks(group.links, `navigation group ${index + 1}`);
  }
  validateContact(props.contact);
  validateLinks(props.legalLinks, "legal");
  if (props.localeOptions) validateLinks(props.localeOptions, "locale");
  requireText(props.copyright, "copyright");
  return props;
}
