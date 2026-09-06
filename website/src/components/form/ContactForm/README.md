# `ContactForm`

`ContactForm` is an isolated, caller-owned mail-client handoff. It keeps the enquiry fields on the static website, then opens a prepared `mailto:` URI in the visitor's chosen mail application. The website does not send, receive, store, or confirm delivery of the enquiry.

## Public API and behaviour

- Required props: a verified public `recipient`, caller-owned `subject`, visible `fields`, `privacyNotice`, and `submitLabel`.
- Optional `labels` localizes the privacy sentence, pre-submit mail-client explanation, and post-handoff status. English defaults preserve fixture portability.
- Fields are fixed to name, business email, company, message, and consent. Name, email, message, and consent remain required; company is optional unless a caller-approved requirement marks it required.
- Optional `context` stays visible and is added to the prepared email body. The component never derives it from a route or global state.
- Native browser validation runs before the controller handles a submission. The controller builds a URL-encoded body from the visible caller-owned labels and current values, updates a focusable status, clicks the component's hidden `mailto:` link, and preserves every entered value.
- The prepared message includes name, business email, optional non-empty company, optional context, and message in source order. Consent is not copied into the email body.
- Without JavaScript, the form retains a native `mailto:` action and subject field. Exact field serialization then depends on the browser and installed mail handler; the adjacent public email link remains the dependable manual fallback.

## Responsive, accessibility, and failure behaviour

At 320 and 390 px, fields are one column; visible labels and help remain adjacent to their controls. At the 40-rem component boundary, only the short text fields become a contained two-column grid; each field keeps its natural label/help height so adjacent controls share a top edge, and the message stays full width. Inputs use matching native types/autocomplete values, native required validation, conservative length limits for a mail URI, 44 px minimum controls, and visible focus. Long labels, context, privacy text, mail-client explanation, and status wrap.

The component cannot detect whether an installed mail handler opened successfully or whether the visitor sent the prepared message. Its status therefore says only that the mail application should open and asks the visitor to review and send there. It never announces delivery, clears the form, emits a network request, chooses a provider, or needs credentials.

## Security and portability

The contract rejects malformed recipients, multiline subjects, unsafe privacy destinations, empty labels/help/placeholders/context, and attempts to make name, email, or message optional. Email content is created only on the visitor's device and URL-encoded before the `mailto:` handoff. The hosting CSP must allow the `mailto:` scheme in `form-action` for the no-JavaScript fallback.

Fixture: `/fixtures/contact-form/`. Focused evidence covers recipient/subject semantics, native validation, keyboard and no-JavaScript fallback, exact encoded body, preserved input, optional company/context, instance isolation, privacy route, status focus, responsive overflow, axe, browser errors, and 320/390/768/1024/1440/844×390 visual baselines.
