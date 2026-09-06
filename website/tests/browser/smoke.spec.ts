import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component lab index and smoke fixture render without browser errors", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Isolated, deterministic fixtures",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Open foundation smoke fixture" })
    .click();
  await expect(page).toHaveURL(/\/fixtures\/smoke\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A stable track for every component.",
  );
  await expect(page.locator("[data-fixture='foundation-smoke']")).toBeVisible();

  const labLink = page.getByRole("link", { name: "Component lab" });
  const primaryAction = page.getByRole("link", {
    name: "Review foundation checks",
  });
  await page.keyboard.press("Tab");
  await expect(labLink).toBeFocused();
  expect(
    await labLink.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(primaryAction).toBeFocused();
  expect((await primaryAction.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );

  expect(errors).toEqual([]);
});

test("@responsive smoke fixture has no page overflow and keeps its intended compositions", async ({
  page,
}, testInfo) => {
  await page.goto("/fixtures/smoke/");
  await expectNoPageOverflow(page);

  const columnCount = await page.locator(".smoke__grid").evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns.trim();
    return columns.length === 0 ? 0 : columns.split(/\s+/).length;
  });

  if (
    testInfo.project.name === "chromium-320" ||
    testInfo.project.name === "chromium-390"
  ) {
    expect(columnCount).toBe(1);
  }

  if (testInfo.project.name === "chromium-1440") {
    expect(columnCount).toBe(3);
  }
});

test("@a11y smoke fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/smoke/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const seriousOrCritical = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(seriousOrCritical).toEqual([]);
});

test("@visual smoke fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/smoke/");

  await expect(page).toHaveScreenshot("foundation-smoke.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
