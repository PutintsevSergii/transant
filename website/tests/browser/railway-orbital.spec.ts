import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

test("@component RailwayOrbital renders a dotted world and railway loops with decorative and informative semantics", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/railway-orbital/");

  const orbitals = page.locator("[data-railway-orbital]");
  const decorative = orbitals.nth(0);
  const informative = orbitals.nth(1);
  await expect(orbitals).toHaveCount(3);
  await expect(decorative).toHaveAttribute("aria-hidden", "true");
  await expect(decorative.locator("svg")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(decorative.locator("figcaption")).toHaveCount(0);
  await expect(informative).not.toHaveAttribute("aria-hidden", "true");
  await expect(informative.locator("svg")).toHaveAttribute("role", "img");
  await expect(informative.locator("figcaption")).toContainText("dotted globe");
  await expect(informative.locator(".railway-orbital__rail")).toHaveCount(6);
  await expect(informative.locator(".railway-orbital__track-ties")).toHaveCount(
    3,
  );
  await expect(informative.locator(".railway-orbital__sphere")).toHaveCount(1);
  await expect(
    informative.locator(".railway-orbital__construction"),
  ).toHaveCount(1);
  await expect(informative.locator(".railway-orbital__train")).toHaveCount(3);
  await expect(informative.locator(".railway-orbital__train-car")).toHaveCount(
    3,
  );
  await expect(
    informative.locator(
      ".railway-orbital__catalog-wagon[data-catalog-wagon='page-3-header-icon']",
    ),
  ).toHaveCount(3);
  await expect(
    informative.locator(".railway-orbital__catalog-wagon").first(),
  ).toHaveAttribute("href", /catalogue-wagon-icon\..*\.png$/);
  await expect(
    informative.locator(".railway-orbital__marker-beacon-dot"),
  ).toHaveCount(3);
  expect(errors).toEqual([]);
});

test("@no-js RailwayOrbital retains useful static SVG without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/railway-orbital/`);

  const orbital = page.locator("[data-railway-orbital]").first();
  await expect(orbital.locator("svg")).toBeVisible();
  await expect(orbital.locator(".railway-orbital__rail")).toHaveCount(6);
  await expect(orbital).not.toHaveAttribute("data-motion-active", "true");
  await expectNoPageOverflow(page);
  await context.close();
});

test("@responsive RailwayOrbital contains its SVG and honours static/reduced/offscreen motion boundaries", async ({
  page,
}) => {
  await page.goto("/fixtures/railway-orbital/");
  const autoOrbital = page.locator("[data-railway-orbital]").first();
  const staticOrbital = page.locator("[data-railway-orbital]").nth(1);
  const offscreenOrbital = page.locator("[data-railway-orbital]").nth(2);
  await autoOrbital.scrollIntoViewIfNeeded();
  await expect(autoOrbital).toHaveAttribute("data-motion", "auto");
  await expect(staticOrbital).toHaveAttribute("data-motion", "off");
  await expect(staticOrbital).not.toHaveAttribute("data-motion-active", "true");

  await expect
    .poll(() => autoOrbital.getAttribute("data-motion-active"))
    .toBe("");
  const autoTrain = autoOrbital.locator(".railway-orbital__train--orbit-a");
  await expect(autoTrain.locator("[data-orbit-vehicle]")).toHaveCount(1);

  await expect
    .poll(() => offscreenOrbital.getAttribute("data-motion-active"))
    .toBeNull();
  await expectNoPageOverflow(page);
});

test("@a11y RailwayOrbital fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/railway-orbital/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual RailwayOrbital fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/railway-orbital/");
  await expect(
    page.locator("[data-railway-orbital]").first(),
  ).not.toHaveAttribute("data-motion-active", "");
  await expect(page).toHaveScreenshot("railway-orbital.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
