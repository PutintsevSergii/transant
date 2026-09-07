import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component PageHero renders caller-owned image/no-image, theme, breadcrumbs slot, and heading hierarchy", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/page-hero/");

  const heroes = page.locator("[data-page-hero]");
  const light = heroes.nth(0);
  const dark = heroes.nth(1);
  const textOnly = heroes.nth(2);
  await expect(heroes).toHaveCount(3);
  await expect(light.getByRole("heading", { level: 1 })).toHaveText(
    "Rail technology built around useful payload.",
  );
  await expect(dark.getByRole("heading", { level: 2 })).toHaveText(
    "Editorial media can lead when the narrative calls for it.",
  );
  await expect(textOnly.getByRole("heading", { level: 3 })).toHaveText(
    "A text-only introduction leaves no empty media stage.",
  );
  await expect(light.locator("[data-page-hero-breadcrumbs]")).toContainText(
    "Home",
  );
  await expect(light).toHaveAttribute("data-page-hero-theme", "light");
  await expect(dark).toHaveAttribute("data-page-hero-theme", "dark");
  await expect(light).toHaveAttribute(
    "data-page-hero-technical-background",
    "true",
  );
  await expect(dark).toHaveAttribute(
    "data-page-hero-technical-background",
    "true",
  );
  await expect(textOnly).toHaveAttribute(
    "data-page-hero-technical-background",
    "false",
  );
  await expect(textOnly.locator("[data-page-hero-media]")).toHaveCount(0);

  const images = heroes.locator("[data-page-hero-media] img");
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "eager");
    await expect(image).toHaveAttribute("fetchpriority", "high");
    expect(await image.getAttribute("src")).not.toMatch(/^https?:\/\//);
  }
  await expect(heroes.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@responsive PageHero preserves caller-selected compact source order and creates only a contained wide editorial split", async ({
  page,
}) => {
  await page.goto("/fixtures/page-hero/");
  const light = page.locator("[data-page-hero]").nth(0);
  const dark = page.locator("[data-page-hero]").nth(1);
  const textOnly = page.locator("[data-page-hero]").nth(2);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  await expect(light.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-top",
    "12px",
  );
  await expect(light.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-bottom",
    "12px",
  );
  await expect(light).toHaveCSS("margin-top", "0px");
  await expect(light).toHaveCSS("margin-bottom", "0px");
  await expect(dark.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-top",
    "12px",
  );
  await expect(textOnly.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-bottom",
    "12px",
  );
  expect(
    await light.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    ),
  ).not.toBe("none");
  await expect(textOnly).toHaveCSS("background-image", "none");

  const lightOrder = await light
    .locator("[data-page-hero-content], [data-page-hero-media]")
    .evaluateAll((elements) =>
      elements.map((element) =>
        element.getAttribute("data-page-hero-content") !== null
          ? "content"
          : "media",
      ),
    );
  const darkOrder = await dark
    .locator("[data-page-hero-content], [data-page-hero-media]")
    .evaluateAll((elements) =>
      elements.map((element) =>
        element.getAttribute("data-page-hero-content") !== null
          ? "content"
          : "media",
      ),
    );
  expect(lightOrder).toEqual(["content", "media"]);
  expect(darkOrder).toEqual(["media", "content"]);

  const [lightContent, lightMedia, darkContent, darkMedia] = await Promise.all([
    light.locator("[data-page-hero-content]").boundingBox(),
    light.locator("[data-page-hero-media]").boundingBox(),
    dark.locator("[data-page-hero-content]").boundingBox(),
    dark.locator("[data-page-hero-media]").boundingBox(),
  ]);
  expect(lightContent).not.toBeNull();
  expect(lightMedia).not.toBeNull();
  expect(darkContent).not.toBeNull();
  expect(darkMedia).not.toBeNull();
  if (viewportWidth < 992) {
    expect(lightMedia?.y).toBeGreaterThan(lightContent?.y ?? 0);
    expect(darkContent?.y).toBeGreaterThan(darkMedia?.y ?? 0);
  } else {
    expect(lightMedia?.x).toBeGreaterThan(lightContent?.x ?? 0);
    expect(darkContent?.x).toBeGreaterThan(darkMedia?.x ?? 0);
  }

  const action = light.getByRole("link", { name: "Explore technology" });
  await action.focus();
  await expect(action).toBeFocused();
  expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await expectNoPageOverflow(page);
});

test("@a11y PageHero fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/page-hero/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual PageHero fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/page-hero/");
  await expect(page).toHaveScreenshot("page-hero.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
