import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component Breadcrumbs renders semantic ordered paths, a non-linked current item, and complete JSON-LD", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/breadcrumbs/");

  const breadcrumbs = page.locator("[data-breadcrumbs]");
  const standard = breadcrumbs.first();
  const single = breadcrumbs.nth(1);
  const deep = breadcrumbs.nth(2);
  await expect(breadcrumbs).toHaveCount(3);
  await expect(standard).toHaveAttribute("aria-label", "Breadcrumb");
  await expect(standard.locator("ol")).toHaveCount(1);
  await expect(standard.locator("li")).toHaveCount(3);
  await expect(standard.locator("a")).toHaveCount(2);
  await expect(standard.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(standard.locator("[data-breadcrumbs-current]")).toHaveText(
    "Intermodal wagons",
  );
  await expect(standard.locator("[data-breadcrumbs-current]")).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(standard.locator("[data-breadcrumbs-current] a")).toHaveCount(0);
  await expect(single.locator("a")).toHaveCount(0);
  await expect(single.locator("[data-breadcrumbs-current]")).toHaveText("Home");
  await expect(deep).toHaveAttribute("aria-label", "Current product location");
  await expect(
    deep.getByRole("link", { name: "Wagons and freight transport equipment" }),
  ).toHaveCount(1);
  await expect(
    deep.locator("[data-breadcrumbs-current] .visually-hidden"),
  ).toHaveText("Sgmmns 40 ft container wagon with long fixture identity");

  const jsonLd = await deep
    .locator("xpath=following-sibling::script[@data-breadcrumbs-jsonld]")
    .evaluate((element) => JSON.parse(element.textContent ?? "{}"));
  expect(jsonLd).toMatchObject({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { position: 1, name: "Home", item: "https://component.transant.test/" },
      {
        position: 2,
        name: "Wagons and freight transport equipment",
        item: "https://component.transant.test/wagons/",
      },
      {
        position: 3,
        name: "Intermodal wagons for container transport",
        item: "https://component.transant.test/wagons/intermodal/",
      },
      {
        position: 4,
        name: "Sgmmns 40 ft container wagon with long fixture identity",
        item: "https://component.transant.test/wagons/intermodal/sgmmns-40/",
      },
    ],
  });
  expect(errors).toEqual([]);
});

test("@keyboard Breadcrumbs keeps earlier locations in native source order with visible touch-sized focus", async ({
  page,
}) => {
  await page.goto("/fixtures/breadcrumbs/");
  const standard = page.locator("[data-breadcrumbs]").first();
  const home = standard.getByRole("link", { name: "Home" });
  const wagons = standard.getByRole("link", { name: "Wagons" });

  for (let tabCount = 0; tabCount < 4; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (await home.evaluate((element) => element === document.activeElement)) {
      break;
    }
  }

  await expect(home).toBeFocused();
  expect((await home.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await home.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(wagons).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    standard.locator("[data-breadcrumbs-current]"),
  ).not.toBeFocused();
});

test("@responsive Breadcrumbs wraps deep paths without creating a horizontal page-level strip", async ({
  page,
}) => {
  await page.goto("/fixtures/breadcrumbs/");
  const deep = page.locator("[data-breadcrumbs]").nth(2);
  const list = deep.locator("[data-breadcrumbs-list]");
  const items = deep.locator("[data-breadcrumbs-item]");

  await expectNoPageOverflow(page);
  expect(
    await list.evaluate((element) => getComputedStyle(element).flexWrap),
  ).toBe("wrap");
  expect(
    await deep.evaluate((element) => getComputedStyle(element).overflowX),
  ).toBe("visible");
  const firstItemBox = await items.first().boundingBox();
  const currentItemBox = await items.last().boundingBox();
  expect(firstItemBox).not.toBeNull();
  expect(currentItemBox).not.toBeNull();
  const pageGutter = await deep.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingInlineStart),
  );
  expect(pageGutter).toBeGreaterThanOrEqual(16);
  expect(Math.abs((firstItemBox?.x ?? 0) - pageGutter)).toBeLessThanOrEqual(1);
  expect(
    (currentItemBox?.x ?? 0) + (currentItemBox?.width ?? 0),
  ).toBeLessThanOrEqual((page.viewportSize()?.width ?? 0) - pageGutter + 1);
  expect(currentItemBox?.height).toBeGreaterThan(0);
  expect(
    await deep
      .locator("[data-breadcrumbs-current]")
      .evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);
  await expectNoPageOverflow(page);
});

test("@a11y Breadcrumbs fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/breadcrumbs/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual Breadcrumbs fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/breadcrumbs/");
  await expect(page).toHaveScreenshot("breadcrumbs.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
