import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { pageReviewRoutes } from "../support/page-review-routes";
import { expectNoPageOverflow } from "./support/page-contract";

const axeTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

async function expectNoSeriousAxeViolations(page: Page, route: string) {
  const results = await new AxeBuilder({ page }).withTags(axeTags).analyze();
  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
    `${route} must have no serious or critical WCAG axe violations`,
  ).toEqual([]);
}

test("@a11y I-003 every release page has a stable landmark, skip route, and WCAG axe coverage", async ({
  page,
}) => {
  for (const { fixtureRoute } of pageReviewRoutes) {
    const response = await page.goto(fixtureRoute);
    expect(response?.ok(), `${fixtureRoute} must render successfully`).toBe(
      true,
    );

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expectNoSeriousAxeViolations(page, fixtureRoute);
  }
});

test("@keyboard I-003 skip links move keyboard focus to the single main landmark", async ({
  page,
}) => {
  for (const route of [
    "/fixtures/homepage/",
    "/fixtures/catalogue/",
    "/fixtures/products/flat/uno-flat-60ft-rens/",
    "/fixtures/contact/",
    "/fixtures/legal/privacy/",
    "/fixtures/system-404/",
  ]) {
    await page.goto(route);
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    const main = page.locator("main#main-content");
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(main).toBeFocused();
  }
});

test("@keyboard I-003 compact navigation traps focus only while open and restores its trigger", async ({
  page,
}) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) >= 1024,
    "Wide layouts retain the ordinary visible navigation.",
  );

  await page.goto("/fixtures/homepage/");
  const header = page.locator("[data-site-header]");
  const trigger = header.getByRole("button", { name: "Menu", exact: true });
  const main = page.locator("main#main-content");

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(header.locator("[data-header-panel-title]")).toBeFocused();
  await expect(main).toHaveJSProperty("inert", true);

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await expect(main).toHaveJSProperty("inert", false);
});

test("@keyboard I-003 keeps the technical table and contact error recovery reachable", async ({
  page,
}) => {
  await page.goto("/fixtures/products/flat/uno-flat-60ft-rens/");
  const tableScroller = page.locator("[data-load-limit-scroll]");
  await tableScroller.focus();
  await expect(tableScroller).toBeFocused();
  await expect(tableScroller).toHaveAttribute("role", "region");
  await expect(tableScroller).toHaveAttribute("aria-label", /Scrollable table/);
  await expect(tableScroller.locator("table caption")).not.toBeEmpty();

  await page.route("**/contact/submit", async (route) => {
    await route.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({
        status: "error",
        message: "Please review the highlighted field.",
        fieldErrors: { email: "Use a business email address." },
      }),
    });
  });
  await page.goto("/fixtures/contact/");
  const form = page.locator("[data-contact-form]");
  await form.getByLabel("Name").fill("Alex Morgan");
  await form.getByLabel("Business email").fill("alex@example.com");
  await form
    .locator('textarea[name="message"]')
    .fill("Please send a source-bound response.");
  await form.getByLabel(/I have read/).check();
  await form.getByRole("button", { name: "Send enquiry" }).click();

  const email = form.getByLabel("Business email");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toBeFocused();
  await expect(form.locator("[data-contact-form-status]")).toHaveAttribute(
    "role",
    "status",
  );
  await expect(form.locator("[data-contact-form-status]")).toBeVisible();
});

test("@a11y I-003 reduced motion preserves the homepage's static content and containment", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/homepage/");
  await expect(page.locator("[data-railway-orbital]")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoPageOverflow(page);
});
