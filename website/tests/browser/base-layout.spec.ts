import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";

test("@component BaseLayout emits complete document metadata and one main landmark", async ({
  page,
}) => {
  await page.goto("/fixtures/base-layout/");

  await expect(page).toHaveTitle("Base layout fixture | TransANT");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("meta[name='description']")).toHaveCount(1);
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    "https://component.transant.test/fixtures/base-layout/",
  );
  await expect(page.locator("link[rel='icon']")).toHaveAttribute(
    "href",
    "/brand/transant-logo.png",
  );
  await expect(page.locator("meta[property='og:title']")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("[data-site-header]")).toHaveCount(1);
  await expect(page.locator("[data-site-footer]")).toHaveCount(1);
  await expect(
    page.locator("[data-site-header] nav[aria-label='Locale selection']"),
  ).toHaveCount(0);
  await expect(page.locator("nav[id]")).toHaveCount(0);
});

test("@responsive BaseLayout exposes a working skip link and contains the shell", async ({
  page,
}) => {
  await page.goto("/fixtures/base-layout/");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await skipLink.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expectNoPageOverflow(page);
});

test("@a11y BaseLayout has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/base-layout/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual BaseLayout fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/base-layout/");
  await expect(page).toHaveScreenshot("base-layout.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
