import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ??
  `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT ?? "4322"}`;

test("@component SiteHeader renders navigation, current routes, locales, and the immutable logo", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/site-header/");

  const header = page.locator("[data-site-header]");
  const logo = header.getByRole("link", { name: "TransANT" });
  const nav = header.locator("nav[aria-label='Primary navigation']");
  const currentLink = nav.locator("a[href='/pro-platform-projects/']");
  const wagonGroup = nav.locator("[data-header-navigation-group]");
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
  await expect(header.locator(".site-header__company-label")).toHaveText(
    "TAS GROUP COMPANY",
  );
  await expect(nav.locator("a")).toHaveCount(9);
  await expect(nav.locator("a[href='/']", { hasText: /^Home$/u })).toHaveCount(
    1,
  );
  await expect(wagonGroup.locator("summary")).toHaveText(/Wagons/u);
  await expect(wagonGroup.locator("a")).toHaveCount(6);
  await expect(wagonGroup.locator("a[href='#wagons']")).toHaveText(
    "All wagons",
  );
  await expect(nav.locator("a[href='/sustainability/']")).toHaveCount(0);
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
      .getByRole("link", { name: "PRO platform projects" }),
  ).toBeVisible();
  await noJavaScriptPage
    .locator("[data-header-navigation-group] summary")
    .click();
  await expect(
    noJavaScriptPage.getByRole("link", { name: "All wagons" }),
  ).toBeVisible();
  await expect(
    noJavaScriptPage.locator("a[href='/sustainability/']"),
  ).toHaveCount(0);
  await expect(
    noJavaScriptPage.locator("[data-site-header] a[href='/contact/']"),
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
  await expect(header.locator(".site-header__company-label")).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) < 1024) {
    await expect(trigger).toBeVisible();
  } else {
    await expect(trigger).toBeHidden();
    await expect(
      header.getByRole("link", { name: "PRO platform projects" }),
    ).toBeVisible();
    await expect(header.locator("a[href='/sustainability/']")).toHaveCount(0);
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
  await header.locator("[data-header-navigation-group] summary").click();
  await header.getByRole("link", { name: "All wagons" }).click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#wagons$/);
});

test("@interaction SiteHeader wagon disclosure supports keyboard and Escape without closing the compact panel", async ({
  page,
}) => {
  await page.goto("/fixtures/site-header/");
  const header = page.locator("[data-site-header]");
  const trigger = header.getByRole("button", { name: "Menu", exact: true });
  if (await trigger.isVisible()) await trigger.click();

  const group = header.locator("[data-header-navigation-group]");
  const summary = group.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(group).toHaveAttribute("open", "");
  await expect(group.getByRole("link", { name: "Intermodal" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(group).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  if (await trigger.isVisible()) {
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  }
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
