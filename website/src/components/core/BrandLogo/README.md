# `BrandLogo`

Renders the immutable TransANT bitmap as a responsive intrinsic-size image. It has no client controller, animation, CSS filter, or image transformation.

## API

| Prop       | Type            | Required | Contract                                                           |
| ---------- | --------------- | -------- | ------------------------------------------------------------------ |
| `src`      | `string`        | Yes      | Public path to the approved bitmap.                                |
| `alt`      | `string`        | Yes      | Accessible image name; when linked, also supplies the anchor name. |
| `href`     | `string`        | No       | Renders an ordinary anchor only when supplied.                     |
| `width`    | `number`        | Yes      | The bitmap's intrinsic width.                                      |
| `height`   | `number`        | Yes      | The bitmap's intrinsic height.                                     |
| `tone`     | `light \| dark` | Yes      | Chooses surrounding whitespace only; it never recolors the bitmap. |
| `priority` | `boolean`       | No       | Requests eager, high-priority loading.                             |

## Asset and styling contract

- The release asset is `/brand/transant-logo.png`, SHA-256 `fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985`, 520 × 114 px.
- The image retains its native `width` and `height` attributes. `max-inline-size: 100%` and automatic block sizing contain it at 320 px without distortion.
- `dark` creates a paper surface around the same source image, suitable for dark footer/header contexts. It does not use CSS filters, blend modes, alternate art, or animation.
- The component uses only foundation spacing, paper, and focus tokens. It emits no events and has no JavaScript dependency.

## Accessibility and portability

The linked variation is a native `<a>` with the image alternative text as its accessible name; the unlinked variation is not focusable. The visible focus treatment is on the anchor, not on the bitmap. Future pages may supply a different approved public bitmap through `src`, but must preserve its recorded intrinsic dimensions and approval evidence.

## Evidence

Fixture: `/fixtures/brand-logo/`. It covers linked light and unlinked dark uses at 320, 390, 768, 1024, 1440, and phone-landscape widths. Focused checks verify the asset digest/dimensions, native semantics, accessible names, compact containment, no serious/critical axe violations, no CSS filter or animation, and reviewed visual baselines.
