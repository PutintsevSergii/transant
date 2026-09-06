/** Fixed contact-data names keep the prepared message explicit and portable. */
export type ContactFormFieldName =
  "name" | "email" | "company" | "message" | "consent";

export interface ContactFormTextField {
  /** Visible field label. */
  readonly label: string;
  /** Optional short field guidance rendered beside the field. */
  readonly help?: string;
  /** Optional caller-owned example text; never used as a label. */
  readonly placeholder?: string;
  /** Company remains optional unless the caller has an approved requirement. */
  readonly required?: boolean;
}

export interface ContactFormConsentField {
  /** Visible consent wording; legal text and jurisdiction stay caller-owned. */
  readonly label: string;
}

export interface ContactFormFields {
  readonly name: ContactFormTextField;
  readonly email: ContactFormTextField;
  readonly company: ContactFormTextField;
  readonly message: ContactFormTextField;
  readonly consent: ContactFormConsentField;
}

export interface ContactFormPrivacyNotice {
  /** Visible route label for the caller-owned privacy notice. */
  readonly label: string;
  /** Internal route or HTTPS reference; placeholder routes are rejected. */
  readonly href: string;
}

export interface ContactFormContext {
  /** Visible source of the explicit product or family context. */
  readonly label: string;
  /** Caller-owned context value included in the prepared email. */
  readonly value: string;
}

export interface ContactFormProps {
  /** Verified public mailbox opened in the visitor's chosen mail application. */
  readonly recipient: string;
  /** Caller-owned subject for the prepared email. */
  readonly subject: string;
  /** Caller-owned field labels, guidance, and company requirement. */
  readonly fields: ContactFormFields;
  /** Caller-owned legal destination and its visible label. */
  readonly privacyNotice: ContactFormPrivacyNotice;
  /** Visible native submit-control label. */
  readonly submitLabel: string;
  readonly labels?: {
    readonly privacyPrefix: string;
    readonly mailClientHint: string;
    readonly mailClientOpened: string;
  };
  /** Optional explicit product or wagon-family context. */
  readonly context?: ContactFormContext;
}
