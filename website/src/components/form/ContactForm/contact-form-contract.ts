import type {
  ContactFormContext,
  ContactFormPrivacyNotice,
  ContactFormProps,
  ContactFormTextField,
} from "./ContactForm.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isSafeInternalRoute = (href: string): boolean =>
  href.startsWith("/") &&
  !href.startsWith("//") &&
  !/[\s#]/.test(href) &&
  href !== "/";

const isSafeRecipient = (recipient: string): boolean =>
  /^[^\s@/?#]+@[^\s@/?#]+\.[^\s@/?#]+$/u.test(recipient);

const validateTextField = (
  field: ContactFormTextField,
  fieldName: string,
): void => {
  if (!isNonEmpty(field.label)) {
    throw new Error(
      `ContactForm ${fieldName} fields require non-empty labels.`,
    );
  }

  if (field.help !== undefined && !isNonEmpty(field.help)) {
    throw new Error(
      `ContactForm ${fieldName} help must be omitted or non-empty.`,
    );
  }

  if (field.placeholder !== undefined && !isNonEmpty(field.placeholder)) {
    throw new Error(
      `ContactForm ${fieldName} placeholders must be omitted or non-empty.`,
    );
  }
};

const validatePrivacyNotice = (notice: ContactFormPrivacyNotice): void => {
  if (!isNonEmpty(notice.label) || !isSafeInternalRoute(notice.href)) {
    throw new Error(
      "ContactForm privacy notices require non-empty labels and safe internal routes.",
    );
  }
};

const validateContext = (context: ContactFormContext | undefined): void => {
  if (
    context !== undefined &&
    (!isNonEmpty(context.label) || !isNonEmpty(context.value))
  ) {
    throw new Error("ContactForm context labels and values must be non-empty.");
  }
};

/** Fails before render if a component would create an unsafe mail-client handoff. */
export const validateContactFormProps = (props: ContactFormProps): void => {
  if (!isSafeRecipient(props.recipient)) {
    throw new Error(
      "ContactForm recipients must be non-empty email addresses without URL control characters.",
    );
  }

  if (!isNonEmpty(props.subject) || /[\r\n]/u.test(props.subject)) {
    throw new Error(
      "ContactForm subjects must be non-empty single-line caller-owned text.",
    );
  }

  if (!isNonEmpty(props.submitLabel)) {
    throw new Error("ContactForm requires a non-empty submit label.");
  }

  validateTextField(props.fields.name, "name");
  validateTextField(props.fields.email, "email");
  validateTextField(props.fields.company, "company");
  validateTextField(props.fields.message, "message");
  if (
    props.fields.name.required === false ||
    props.fields.email.required === false ||
    props.fields.message.required === false
  ) {
    throw new Error(
      "ContactForm name, email, and message remain required; only additional project fields may be optional.",
    );
  }
  if (!isNonEmpty(props.fields.consent.label)) {
    throw new Error("ContactForm consent requires a non-empty label.");
  }
  validatePrivacyNotice(props.privacyNotice);
  validateContext(props.context);
  if (
    props.labels !== undefined &&
    (!isNonEmpty(props.labels.privacyPrefix) ||
      !isNonEmpty(props.labels.mailClientHint) ||
      !isNonEmpty(props.labels.mailClientOpened))
  ) {
    throw new Error("ContactForm mail-client labels must be non-empty.");
  }
};
