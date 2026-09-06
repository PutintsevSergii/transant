# `ResponsiveMedia`

Renders a local Astro asset as responsive AVIF and WebP sources plus Astro's reviewed original-format fallback. It owns the semantic `figure` and optional caption only; surrounding section layout, editorial claims, crop decisions, and actions remain caller responsibilities.

## API

| Prop          | Type               | Required    | Contract                                                                                  |
| ------------- | ------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| `image`       | `ImageMetadata`    | Yes         | Imported build-owned asset from `src/assets/`; remote URLs and zero-size metadata reject. |
| `alt`         | `string`           | Conditional | Meaningful alternative text unless `decorative` is true.                                  |
| `decorative`  | `boolean`          | No          | Emits `alt=""` only for intentionally decorative imagery.                                 |
| `sizes`       | `string`           | Yes         | Accurate source-size declaration supplied by the embedding layout.                        |
| `loading`     | `eager \| lazy`    | No          | Defaults to lazy for below-the-fold media.                                                |
| `priority`    | `boolean`          | No          | Overrides loading to eager and requests high fetch priority.                              |
| `fit`         | `cover \| contain` | Yes         | Applies only inside an optional reserved aspect-ratio frame.                              |
| `aspectRatio` | `string`           | No          | CSS `width / height` ratio that reserves frame space before the image decodes.            |
| `caption`     | `string`           | No          | Plain-text `figcaption` fallback. A named `caption` slot can replace it.                  |
| `widths`      | `number[]`         | No          | Reviewed generated widths; defaults to 320, 640, 960, and 1280 px.                        |

## Semantics and safety

The component validates non-zero local `ImageMetadata`, a non-empty `sizes` contract, valid width values, and either meaningful alternative text or explicit decorative status. Invalid or missing image input fails rendering rather than shipping a broken placeholder. Captions are emitted as a semantic `figcaption` inside the figure. No remote media, client controller, layout animation, or hover/focus behavior is used.

## Responsive and portability contract

The emitted `<picture>` includes local AVIF and WebP candidates plus a fallback image. `sizes` is passed unchanged to the browser; callers must use it to describe their actual component container, not a device name. Native image dimensions reserve space by default. When crops require a stable editorial frame, `aspectRatio` adds a container-local reserved ratio and `fit` chooses `cover` or `contain`.

At 320 and 390 px, the figure is a single block with no deliberate overflow. The same markup remains at 768, 1024, 1440, and phone landscape; generated resource selection—not a duplicate mobile tree—adapts delivery. There are no controls or motion. The fixture covers priority and lazy loading, meaningful and decorative alternatives, captions, cover/contain, reserved layout stability, and source output at `/fixtures/responsive-media/`.
