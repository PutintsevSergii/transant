# `ContactForm`

`ContactForm` is an isolated, caller-owned contact-form boundary. It renders a native same-site `POST` form before JavaScript runs and uses C-002 `Action` for the submit control. It does not choose recipients, delivery providers, credentials, analytics, a CAPTCHA service, recovery flow, or server behaviour.

## Public API and behaviour

- Required props: a safe same-site `endpoint`, visible `fields`, `privacyNotice`, and `submitLabel`.
- Optional `labels` localizes the spam-field label and privacy sentence prefix; English defaults preserve fixture portability.
- Fields are fixed to name, business email, company, message, and consent. Name, email, message, and consent remain required; company is optional unless a caller-approved requirement marks it required.
- Optional `context` stays visible and is also submitted as a hidden native `context` value. The component never derives it from a route or global state.
- The no-JavaScript path is a native validated `POST` to the caller-owned endpoint. The honeypot remains in that request for the external server boundary to interpret.
- When JavaScript is available, each root enhances independently. It locks controls while pending, sends same-origin `FormData` with an `Accept: application/json` preference, retains values after field/server errors, focuses the first invalid field (or status), resets only after success, and allows retry. A populated honeypot receives the same neutral success acknowledgement without a network request.

## Responsive, accessibility, and failure behaviour

At 320 and 390 px, fields are one column; visible labels, help, and server errors remain adjacent to their controls. At the 40-rem component boundary, only the short text fields become a contained two-column grid; each field keeps its natural label/help height so adjacent controls share a top edge, and the message stays full width. Inputs use matching native types/autocomplete values, native required validation, 44 px minimum controls, visible focus, `aria-busy` pending state, field-level alert messages, and a focusable polite submission-status message. Long labels, context, privacy text, and errors wrap. The form has no viewport-height lock, motion, or deliberate overflow region.

The contract rejects unsafe/external/query/fragment submission endpoints, empty labels/help/placeholders/context, unsafe privacy destinations, empty submit labels, and attempts to make name, email, or message optional. Network and server errors retain user input and offer a retry through the original submit control. Delivery validation and final legal wording remain caller/server responsibilities.

Fixture: `/fixtures/contact-form/`. Deferred focused evidence will cover labels/autocomplete/native invalid states, keyboard and no-JavaScript submission structure, pending lock, success and error focus, retry/preserved input, honeypot handling, privacy route, instance isolation, responsive overflow, axe, browser errors, and 320/390/768/1024/1440/844×390 visual baselines.
