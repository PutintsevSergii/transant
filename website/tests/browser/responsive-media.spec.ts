import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component ResponsiveMedia emits local modern sources, fallback dimensions, loading, and captions", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/responsive-media/");

  const media = page.locator("[data-responsive-media]");
  const priority = media.nth(0);
  const decorative = media.nth(1);
  const captionSlot = media.nth(2);

  await expect(media).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    const figure = media.nth(index);
    await expect(figure.locator("source[type='image/avif']")).toHaveCount(1);
    await expect(figure.locator("source[type='image/webp']")).toHaveCount(1);
    const image = figure.locator("img");
    await expect(image).toHaveAttribute("width", /\d+/);
    await expect(image).toHaveAttribute("height", /\d+/);
    await expect(image).toHaveAttribute("sizes", /\S/);
    expect(await image.getAttribute("src")).not.toMatch(/^https?:\/\//);
    expect(
      await figure
        .locator("source")
        .evaluateAll((sources) =>
          sources.every(
            (source) =>
              !/^https?:\/\//.test(source.getAttribute("srcset") ?? ""),
          ),
        ),
    ).toBe(true);
  }

  await expect(priority.locator("img")).toHaveAttribute("loading", "eager");
  await expect(priority.locator("img")).toHaveAttribute(
    "fetchpriority",
    "high",
  );
  await expect(priority.locator("figcaption")).toContainText(
    "Operational photography",
  );
  await expect(decorative.locator("img")).toHaveAttribute("alt", "");
  await expect(decorative.locator("img")).toHaveAttribute("loading", "lazy");
  await expect(captionSlot.locator("figcaption")).toContainText(
    "structured caption content",
  );
  expect(errors).toEqual([]);
});

test("@responsive ResponsiveMedia reserves layout space and remains contained", async ({
  page,
}) => {
  await page.goto("/fixtures/responsive-media/");
  await expectNoPageOverflow(page);

  const reserved = page.locator("[data-responsive-media]").nth(0);
  await expect(reserved).toHaveCSS("aspect-ratio", "16 / 9");
  await expect(reserved.locator("img")).toHaveCSS("object-fit", "cover");
  await expect(
    page.locator("[data-responsive-media]").nth(1).locator("img"),
  ).toHaveCSS("object-fit", "contain");

  const imageBox = await reserved.locator("img").boundingBox();
  const figureBox = await reserved.boundingBox();
  expect(imageBox?.width).toBeGreaterThan(0);
  expect(imageBox?.height).toBeGreaterThan(0);
  expect(figureBox?.width).toBeGreaterThan(0);
  await expectNoPageOverflow(page);
});

test("@a11y ResponsiveMedia fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/responsive-media/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual ResponsiveMedia fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/responsive-media/");

  const images = page.locator("[data-responsive-media] img");
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(page).toHaveScreenshot("responsive-media.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
