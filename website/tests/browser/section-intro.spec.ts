import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component SectionIntro emits each caller-selected heading level and omits empty optional fields", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/section-intro/");

  for (const level of [1, 2, 3, 4, 5, 6]) {
    await expect(page.getByRole("heading", { level })).toHaveCount(1);
  }

  const introductions = page.locator("[data-section-intro]");
  await expect(introductions).toHaveCount(6);
  await expect(
    introductions.nth(1).locator("[data-section-intro-eyebrow]"),
  ).toHaveCount(0);
  await expect(
    introductions.nth(1).locator("[data-section-intro-description]"),
  ).toHaveCount(0);
  await expect(introductions.nth(0)).toHaveAttribute(
    "data-section-intro-align",
    "left",
  );
  await expect(introductions.nth(3)).toHaveAttribute(
    "data-section-intro-align",
    "center",
  );
  await expect(introductions.nth(0)).toHaveAttribute(
    "data-section-intro-theme",
    "light",
  );
  await expect(introductions.nth(3)).toHaveAttribute(
    "data-section-intro-theme",
    "dark",
  );
  expect(errors).toEqual([]);
});

test("@responsive SectionIntro preserves contrast, measure, source order, and long-copy visibility", async ({
  page,
}) => {
  await page.goto("/fixtures/section-intro/");
  await expectNoPageOverflow(page);

  const left = page.locator("[data-section-intro-align='left']").first();
  const centered = page.locator("[data-section-intro-align='center']").first();
  const longCopy = page.getByRole("heading", {
    level: 6,
    name: /deliberately extended heading/,
  });

  await expect(left).toHaveCSS("text-align", "start");
  await expect(centered).toHaveCSS("text-align", "center");
  await expect(centered.getByRole("heading")).toHaveCSS(
    "color",
    "rgb(255, 255, 255)",
  );

  const order = await longCopy.evaluate((element) => {
    const parent = element.parentElement;
    return Array.from(parent?.children ?? []).map((child) => child.tagName);
  });
  expect(order).toEqual(["P", "H6", "P"]);
  const longCopyBox = await longCopy.boundingBox();
  expect(longCopyBox?.height).toBeGreaterThan(0);
  expect(
    await longCopy.evaluate((element) => {
      const parent = element.parentElement;
      return parent
        ? getComputedStyle(parent).overflowY === "visible" &&
            parent.scrollHeight >= parent.clientHeight
        : false;
    }),
  ).toBe(true);
  await expectNoPageOverflow(page);
});

test("@a11y SectionIntro fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/section-intro/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual SectionIntro fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/section-intro/");
  await expect(page).toHaveScreenshot("section-intro.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
