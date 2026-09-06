# `Action`

Renders a single server-rendered primary, secondary, text, or inverse action with native link or button semantics. It has no client controller and does not make a destination look disabled while leaving it active.

## API

| Prop       | Type                                      | Required    | Contract                                                                           |
| ---------- | ----------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `kind`     | `link \| button`                          | Yes         | Selects the native semantic element through the discriminated union.               |
| `label`    | `string`                                  | Yes         | Visible and accessible action label.                                               |
| `variant`  | `primary \| secondary \| text \| inverse` | Yes         | Chooses the documented visual treatment.                                           |
| `size`     | `compact \| regular`                      | No          | Adjusts horizontal density; both preserve a 44 px target.                          |
| `icon`     | `arrow-right \| download`                 | No          | Adds a decorative inline SVG; meaning remains in `label`.                          |
| `disabled` | `boolean`                                 | No          | Disables a button natively or renders a non-link disabled label.                   |
| `href`     | `string`                                  | Link only   | Required real destination for a link action.                                       |
| `external` | `boolean`                                 | Link only   | Opens a link in a new tab with `noopener noreferrer` and an accessible indication. |
| `type`     | `button \| submit \| reset`               | Button only | Defaults to `button`, avoiding accidental form submission.                         |

## Semantics and behaviour

- `kind: "link"` produces an `<a>` only when enabled. `disabled: true` produces a non-focusable `<span aria-disabled="true">` with no `href`.
- `kind: "button"` produces a native `<button>` and forwards its disabled state and button type.
- External links receive `target="_blank"`, `rel="noopener noreferrer"`, a visible decorative external icon, and the optional caller-owned `externalLabel` accessible suffix (English “opens in new tab” by default).
- All variants have a 44 CSS-pixel minimum block target, keyboard-visible focus, hover feedback, system-color forced-colors fallback, and a reduced-motion transition-free mode.

## Responsive and portability contract

Source order is label, optional supplied icon, then external-link indication. The component stays an inline control at every width and lets a long label wrap within its own target instead of causing page overflow. There are no component container thresholds or deliberate overflow regions. At 320, 390, 768, 1024, and 1440 px the fixture keeps controls reachable; only the fixture grid changes from a single column to an available-space grid.

Touch, mouse, keyboard, and hover use the same native control. Focus is visible and not clipped. No essential state depends on hover, JavaScript, or motion; reduced motion removes the cosmetic state transitions. Missing labels or destinations are intentionally rejected by the public TypeScript union rather than rendered as empty controls.

## Evidence

Fixture: `/fixtures/action/`. Focused browser checks cover native element selection, keyboard operation, disabled link/button behavior, safe external-link attributes and name, 44 px targets, focus/hover, forced-colors rules, dark-context inverse treatment, compact overflow, axe, browser errors, and deterministic visual baselines at 320, 390, 768, 1024, 1440, and phone landscape.
