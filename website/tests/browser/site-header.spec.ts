import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

test("@component SiteHeader renders navigation, current routes, locales, and the immutable logo", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/site-header/");

  const header = page.locator("[data-site-header]");
  const logo = header.getByRole("link", { name: "TransANT" });
  const nav = header.locator("nav[aria-label='Primary navigation']");
  const currentLink = nav.locator("a[href='/technology/']");
  const locale = header.locator("nav[aria-label='Locale selection']");

  await expect(logo).toHaveAttribute("href", "/");
  await expect(header.locator("[data-header-trigger]")).toHaveAttribute(
    "aria-controls",
    "site-header-primary-panel",
  );
  await expect(logo.locator("img")).toHaveAttribute(
    "src",
    "/brand/transant-logo.png",
  );
  await expect(nav.locator("a")).toHaveCount(4);
  await expect(nav.locator("a[href='/sustainability/']")).toHaveText(
    "Sustainability",
  );
  await expect(currentLink).toHaveAttribute("aria-current", "page");
  await expect(locale.locator("a[href='/']")).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(
    header.locator(".site-header__utilities a[href='/contact/']"),
  ).toHaveAttribute("href", "/contact/");
  expect(errors).toEqual([]);
});

test("@component SiteHeader initializes repeated named instances without duplicate panel IDs", async ({
  page,
}) => {
  await page.goto("/fixtures/site-header-repeated/");
  await expect(page.locator("[data-site-header]")).toHaveCount(2);
  await expect(page.locator("#site-header-first-panel")).toHaveCount(1);
  await expect(page.locator("#site-header-second-panel")).toHaveCount(1);

  if ((page.viewportSize()?.width ?? 0) < 1024) {
    const firstTrigger = page
      .locator("[data-site-header]")
      .first()
      .getByRole("button", { name: "Menu", exact: true });
    await firstTrigger.click();
    await expect(page.locator("[data-site-header]").nth(1)).toHaveJSProperty(
      "inert",
      true,
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-site-header]").nth(1)).toHaveJSProperty(
      "inert",
      false,
    );
  }
});

test("@no-js SiteHeader retains visible primary links without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJavaScriptPage = await context.newPage();

  await noJavaScriptPage.goto(`${browserBaseUrl}/fixtures/site-header/`);
  await expect(
    noJavaScriptPage
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Technology" }),
  ).toBeVisible();
  await expect(
    noJavaScriptPage
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Sustainability" }),
  ).toBeVisible();
  await expect(
    noJavaScriptPage.getByRole("link", { name: "Talk to an engineer" }),
  ).toBeVisible();
  await context.close();
});

test("@responsive SiteHeader preserves compact and wide containment", async ({
  page,
}) => {
  await page.goto("/fixtures/site-header/", { waitUntil: "domcontentloaded" });
  await expectNoPageOverflow(page);

  const header = page.locator("[data-site-header]");
  const trigger = header.getByRole("button", { name: "Menu", exact: true });
  if ((page.viewportSize()?.width ?? 0) < 1024) {
    await expect(trigger).toBeVisible();
  } else {
    await expect(trigger).toBeHidden();
    await expect(
      header.getByRole("link", { name: "Technology" }),
    ).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Sustainability" }),
    ).toBeVisible();
  }

  await expectNoPageOverflow(page);
});

test("@interaction SiteHeader manages compact menu keyboard, focus, close, and inert background", async ({
  page,
}) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) >= 1024,
    "wide header has no compact disclosure",
  );
  await page.goto("/fixtures/site-header/");

  const header = page.locator("[data-site-header]");
  const trigger = header.getByRole("button", { name: "Menu", exact: true });
  const panelTitle = header.getByText("Site navigation", { exact: true });
  const fixtureMain = page.locator("[data-header-fixture-main]");

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panelTitle).toBeFocused();
  await expect(fixtureMain).toHaveJSProperty("inert", true);

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await expect(fixtureMain).toHaveJSProperty("inert", false);

  await trigger.click();
  await header.getByRole("button", { name: "Close menu" }).click();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await header.getByRole("link", { name: "Wagons" }).click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#wagons$/);
});

test("@a11y SiteHeader has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/site-header/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual SiteHeader fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/site-header/");
  await expect(page).toHaveScreenshot("site-header.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});

test("@visual SiteHeader compact menu open baseline", async ({ page }) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) >= 1024,
    "wide header has no compact disclosure",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/site-header/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page).toHaveScreenshot("site-header-menu-open.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
