# Accessibility integration contract

## Scope

I-003 owns cross-page accessibility evidence for the completed release-one page fixtures. It does not change an individual component's semantic API or create an alternate mobile tree. Component packages remain responsible for their own accessible controls; this checkpoint proves that they compose into usable pages.

`website/tests/browser/accessibility-integration.spec.ts` applies automated WCAG 2.0/2.1/2.2 A and AA axe coverage to every route declared in `website/tests/support/page-review-routes.ts`. Each route must render successfully with exactly one focusable `main#main-content` landmark and one skip link that targets it.

## Keyboard, focus, and touch evidence

The integration definition exercises the complete shell skip-link flow on representative homepage, catalogue, product, contact, legal, and recovery routes. At compact widths it verifies the enhanced header panel moves focus to its label, makes page content inert only while it is open, responds to Escape, and restores focus to its trigger. The product route proves the labelled technical-table region is keyboard focusable without losing its real table/caption; the contact route suppresses external-protocol navigation during the test and proves the prepared-email status is announced, focused, and does not clear the visitor's input.

These automated checks complement the component-level no-JavaScript, target-size, label, field, navigation, and table checks. A reviewer must additionally confirm at 320, 390, 768, 1024, 1440, and 844 × 390 CSS pixels that focus rings remain unclipped; the compact menu's visible controls are reachable; table scrolling stays inside its labelled region; zoom/reflow retains a one-column page; and the contact error/status is visible after the virtual keyboard would be present. The existing 320-pixel project is the documented equivalent 400% reflow mode; I-002 provides the representative 200% text-zoom evidence.

## Motion and limitations

The reduced-motion integration state renders homepage content with motion reduction requested, retains the orbital figure and primary heading, and checks page containment. Animated presentation is optional and cannot hide a route, control, fact, or recovery path.

The suite does not prove screen-reader output, physical assistive-device behavior, virtual-keyboard geometry, availability of an installed mail handler, successful email transmission, or authenticated/device runtime behavior. Those remain explicitly scoped external or user-controlled behavior, not successful accessibility or delivery claims.
