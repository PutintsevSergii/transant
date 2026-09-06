import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component HomeHero preserves proposition hierarchy, priority local media, and optional action contracts", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/home-hero/");

  const heroes = page.locator("[data-home-hero]");
  const primary = heroes.nth(0);
  const alternate = heroes.nth(1);
  await expect(heroes).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 1 })).toHaveText(
    "Wagons built for more useful payload.",
  );
  await expect(primary.locator(".home-hero__emphasis")).toHaveCount(1);
  await expect(primary.locator(".home-hero__title > span")).toHaveCount(3);
  await expect(alternate.locator(".home-hero__emphasis")).toHaveCount(1);
  await expect(
    alternate.getByRole("link", { name: /talk to an expert/i }),
  ).toHaveCount(0);

  const image = primary.locator("[data-responsive-media] img");
  await expect(image).toHaveAttribute("loading", "eager");
  await expect(image).toHaveAttribute("fetchpriority", "high");
  await expect(image).toHaveAttribute("width", /\d+/);
  await expect(image).toHaveAttribute("height", /\d+/);
  expect(await image.getAttribute("src")).not.toMatch(/^https?:\/\//);
  await expect(primary.locator("script")).toHaveCount(0);

  const sourceOrder = await primary
    .locator(".home-hero__content, .home-hero__media")
    .evaluateAll((elements) => elements.map((element) => element.className));
  expect(sourceOrder).toEqual(["home-hero__content", "home-hero__media"]);
  expect(errors).toEqual([]);
});

test("@responsive HomeHero stacks media below copy, keeps actions usable, and avoids overflow", async ({
  page,
}) => {
  await page.goto("/fixtures/home-hero/");
  const hero = page.locator("[data-home-hero]").first();
  const frame = hero.locator(".home-hero__grid");
  const content = hero.locator(".home-hero__content");
  const media = hero.locator(".home-hero__media");
  const primaryAction = hero.getByRole("link", {
    name: "Explore wagon families",
  });
  const [frameBox, contentBox, mediaBox, framePadding] = await Promise.all([
    frame.boundingBox(),
    content.boundingBox(),
    media.boundingBox(),
    frame.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).paddingInlineStart),
    ),
  ]);

  expect(frameBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(
    Math.abs((contentBox?.x ?? 0) - ((frameBox?.x ?? 0) + framePadding)),
  ).toBeLessThanOrEqual(1);
  if ((page.viewportSize()?.width ?? 0) < 896) {
    expect(mediaBox?.y).toBeGreaterThan(contentBox?.y ?? 0);
  } else {
    expect(mediaBox?.x).toBeGreaterThan(contentBox?.x ?? 0);
    await expect(media.locator("img")).toHaveCSS("object-position", "100% 50%");
  }
  expect((await primaryAction.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );
  await primaryAction.focus();
  await expect(primaryAction).toBeFocused();
  expect(
    await primaryAction.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
  await expectNoPageOverflow(page);
});

test("@a11y HomeHero fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/home-hero/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual HomeHero fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/home-hero/");
  await expect(page).toHaveScreenshot("home-hero.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
