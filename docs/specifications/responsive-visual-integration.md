# Responsive and visual integration contract

## Scope

I-002 owns a single cross-page evidence definition. It does not change individual component layouts or create a second compact document tree. Page components remain responsible for their own responsive behavior; this integration contract verifies that those decisions compose without page-level overflow and retains the approved V7 hierarchy at desktop width.

## Route matrix

`website/tests/support/page-review-routes.ts` is the sole declarative route matrix. Its complete set covers all 26 release-one component-lab page fixtures for overflow, a single main landmark, successful static rendering, and unique document IDs. The visual subset has intentionally representative full-page coverage:

- homepage and catalogue;
- the Flat family page;
- four product data shapes: intermodal without load limits, Flat technical table, MULTIBox, and Tank;
- Engineering & Services, Quality, and Sustainability editorial pages;
- Contact, Privacy, Imprint, and 404.

The route-specific package tests remain the detailed proof for sections, family/product data, and components. The matrix is not a claim that unselected pages need no testing.

## Viewports and review states

The deferred `responsive-visual-integration.spec.ts` runs every matrix route at the canonical 320, 390, 768, 1024, and 1440 CSS-pixel projects, plus the configured 844 × 390 phone-landscape project. It additionally checks every route at exploratory 360 and 430 pixel phone widths and checks homepage, catalogue, widest-table product, Contact, and Privacy at 200% text zoom from the 1440-pixel reference project. The existing 320-pixel project is the documented equivalent 400% reflow condition.

Full-page screenshots use reduced motion and deterministic names beginning `i-002-`. At the review checkpoint, inspect compact source order, menu/header containment, hero/media treatment, family/model continuity, table scroller boundary, legal/form readability, V7 hierarchy at 1440, and landscape visibility. A page itself must never scroll horizontally; a labelled `LoadLimitTable` scroller is the only deliberate two-dimensional data boundary.

## Evidence cadence

The authorized batch defers all Playwright browser, responsive, visual, and axe execution through I-002. The above test definition and screenshot baselines must run and be manually reviewed at the I-003 checkpoint along with the accumulated A-005, A-006, I-001, I-002, and I-003 evidence. Until then I-002 remains `IMPLEMENTED`; generated tests, manifests, or file presence are not verification.
