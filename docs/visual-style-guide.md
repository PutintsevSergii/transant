# Visual style guide and color rationale

## Immutable logo rule

The TransANT logo must not be redesigned or modified. Use only client-supplied master artwork. Do not retype the wordmark, redraw or simplify the mark, recolor it, crop it, distort its proportions, rearrange its elements, add effects, or animate its internal parts. Scale it proportionally and preserve clear space. A reversed, monochrome, compact, or icon-only version may be used only when the client supplies that exact approved asset.

The website design must adapt around the logo; the logo must never be adapted to fit the website design.

The material combines three closely related systems: a red/charcoal corporate identity, cyan-blue technical information panels, and a newer web gradient that bridges red to blue. The colors should communicate function, not decoration alone.

## Canonical prototype tokens

| Token | Hex | Intended meaning and need | Recommended usage |
| --- | --- | --- | --- |
| Brand red | `#DC1C3B` | Motion, engineering energy, and the red wagon/product identity. It is the strongest recognition cue. | Primary CTA, active navigation, key benefit tiles, small branded accents. Do not use for every large surface. |
| Brand red dark | `#B3162F` | Interaction depth and a safer high-contrast red. | Hover/pressed states and dense red surfaces. |
| Brand blue | `#2B538B` | Technical authority, rail engineering, and a cooler counterweight to red. | Secondary headings, category accents, informational components. |
| Brand blue dark | `#1C3C68` | Stable, serious technical tone. | Hover states, dark blue panels, text on pale blue backgrounds. |
| Gradient bridge | `#93335F` | Connects the warm red and cool blue without introducing an unrelated third brand family. | Only inside the red-to-blue hero gradient; avoid as a standalone status color. |
| Ink | `#0D1417` | Industrial structure, rail/steel association, and maximum readability. | Body text, dark sections, footer, outlines. |
| Ink secondary | `#333E44` | Softer hierarchy while preserving readability. | Secondary body copy and labels. |
| Muted text | `#6A757B` | Reduces emphasis without becoming decorative grey. | Supporting text at normal sizes; contrast on white is 4.73:1. |
| Faint text | `#9AA4A9` | Very low-emphasis metadata. | Nonessential large text only. It is 2.54:1 on white and fails normal-text contrast. |
| Divider | `#E7EAEC` | Separates dense specifications without visual noise. | Rules and borders only, never text. |
| Paper | `#FFFFFF` | Clean technical-document surface. | Main background and text on dark/red surfaces. |
| Warm paper | `#FBFBFA` | Subtle section separation. | Alternating section background. |
| Steel | `#EAF1F8` | Lightweight engineered-material cue and calm image/table ground. | Product image panels, informational cards, alternating rows. |
| Steel dark | `#D6E4F0` | Edge and hierarchy within pale-blue surfaces. | Borders and separators on steel backgrounds. |
| Teal | `#1C6F9C` | Specifications, data, sustainability, and technical information. | Specification headers, commodity markers, informational tiles. |
| Teal dark | `#155578` | Stronger text/hover companion to teal. | Text on pale technical surfaces and teal interaction states. |

The reusable values are in `website/src/styles/tokens.css` and `website/src/data/color-tokens.json`.

## Observed catalogue colors

Raster sampling shows an approximately `#EF0029` print red, `#0D181C` charcoal, and `#0178AC` cyan in several catalogue/flyer assets. These differ from the prototype’s web tokens. Before production, decide whether the print red/cyan or the prototype red/blue is canonical and document CMYK, RGB, and spot-color equivalents. Do not silently mix the two systems.

## Semantic rules

- Red means primary action and branded benefit, not error by default.
- Blue/teal means specifications, facts, and technical confidence.
- Charcoal anchors the brand and creates premium industrial contrast.
- Pale steel blue organizes complex product data without making the page feel like a spreadsheet.
- White space is essential: it lets detailed wagon drawings and red renders remain legible.
- The red-to-blue gradient is a campaign/hero device. It should not replace flat colors in tables, text, or status indicators.
- Yellow appears on operational hardware in photographs. It is a real-world safety cue, not yet a defined interface token.
- Never rely on color alone for category, status, or selection. Pair it with text, icons, shape, or position.

## Accessibility checks

- White on brand red is 4.92:1; acceptable for normal text at AA, but check font weight and rendered size.
- White on teal is 5.52:1; acceptable for normal text at AA.
- Brand blue on white is 7.74:1; suitable for text at AAA.
- Ink on white is 18.59:1; suitable for primary reading text.
- Muted text on white is 4.73:1; just above AA for normal text.
- Faint grey and divider colors fail as normal text. Reserve them for decoration or increase contrast.

## Typography and imagery

The prototype uses Poppins for display and navigation, with Calibri/Segoe UI/system fallbacks for body copy. Product renders are consistently red on white or pale-steel backgrounds; operational photography introduces blue rail equipment and yellow safety details. Keep product pages visually consistent by using one render angle, generous clear space, and the pale-steel image ground.
