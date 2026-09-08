# `SiteFooter`

`SiteFooter` is the server-rendered TransANT shell close. It owns the dark-blue
surface, ordered secondary navigation, company identity, direct contact links,
and legal navigation; it does not read routes, content collections, browser
state, environment variables, or global application state.

## Public API

`SiteFooterProps` is defined in `SiteFooter.types.ts`.

- `groups` is a non-empty, caller-ordered set of named navigation groups.
- `contact` requires the literal `verification: "verified"`, company name,
  postal address lines, telephone number, and email. The component rejects
  blank or malformed values rather than emitting an empty contact destination.
- `legalLinks` and `copyright` are required caller-owned legal data.
- `affiliation` is optional caller-approved relationship copy appended to the
  primary company identity; it does not alter the logo or verified contact
  record.
- `localeOptions` is optional and rendered only when at least two explicit
  local locale destinations are supplied. The current release keeps the
  selector in the header so the language switch remains easy to find.
- `labels` is optional caller-owned shell copy for locale selection, languages,
  contact, and legal information landmarks; the English defaults preserve
  standalone fixture portability.

## Semantics and responsive contract

The component emits one `<footer>` contentinfo landmark. Each supplied group,
the optional locale set, and legal links have labelled native navigation and
ordered list semantics. Contact data is emitted as an `<address>` with native
`tel:` and `mailto:` links.

Its source order is identity, navigation groups, optional locales, contact,
and legal information. A narrow container stays single-column; at 42 rem the
same source order flows into two columns, and at 68 rem it uses the available
four-column close. Required navigation is never hidden behind JavaScript. All
footer links, including naturally wrapping legal links, retain 44 px minimum
targets and the shared visible focus treatment.

## Verification and limitations

`site-footer-contract.ts` validates only render-safe structure: it cannot
independently prove that content is approved. Callers must pass data already
verified by the content/approval boundary; the component-lab values are clearly
non-production test data and must never be copied into a release route.

Fixture: `/fixtures/site-footer/`. Focused unit and browser checks cover
invalid contract rejection, landmark/group/list semantics, phone/email href
formatting, optional locale omission, long-link wrapping, compact source order,
focus visibility, overflow, axe, browser errors, and canonical visual
baselines at 320, 390, 768, 1024, 1440, and phone landscape.
