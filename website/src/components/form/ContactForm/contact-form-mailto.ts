export interface ContactMailtoField {
  readonly label: string;
  readonly value: string;
}

export interface ContactMailtoValues {
  readonly recipient: string;
  readonly subject: string;
  readonly name: ContactMailtoField;
  readonly email: ContactMailtoField;
  readonly company: ContactMailtoField;
  readonly message: ContactMailtoField;
  readonly context?: ContactMailtoField;
}

const line = ({ label, value }: ContactMailtoField): string =>
  `${label.trim()}: ${value.trim()}`;

/** Builds the prepared message without sending data to the website or a provider. */
export function buildContactMailtoHref(values: ContactMailtoValues): string {
  const summary = [line(values.name), line(values.email)];
  if (values.company.value.trim().length > 0)
    summary.push(line(values.company));
  if (values.context?.value.trim()) summary.push(line(values.context));

  const body = [
    ...summary,
    "",
    `${values.message.label.trim()}:`,
    values.message.value.trim(),
  ].join("\r\n");

  return `mailto:${values.recipient}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
}
