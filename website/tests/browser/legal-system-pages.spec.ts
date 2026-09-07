import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ??
  `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT ?? "4322"}`;

test("@component Contact and legal routes keep their source and delivery boundaries visible", async ({
  page,
}) => {
  for (const route of [
    "/fixtures/contact/",
    "/fixtures/legal/privacy/",
    "/fixtures/legal/imprint/",
    "/fixtures/system-404/",
  ]) {
    const errors = collectBrowserErrors(page);
    await page.goto(route);
    await expect(page.locator("[data-site-header]")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("[data-site-footer]")).toHaveCount(1);
    expect(errors).toEqual([]);
  }

  await page.goto("/fixtures/contact/");
  await expect(page.locator("[data-contact-form]")).toHaveCount(1);
  await expect(page.locator("form")).toHaveAttribute(
    "action",
    "mailto:office@transant.com",
  );
  await expect(
    page.getByText(/opens your email application with the enquiry prepared/i),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Privacy information" }),
  ).toHaveAttribute("href", "/privacy/");

  await page.goto("/fixtures/legal/imprint/");
  await expect(page.locator("[data-legal-document-section]")).toHaveCount(5);
  await expect(page.getByText("ATU76434529")).toBeVisible();
  await expect(page.getByText(/Commercial Court of Linz/)).toBeVisible();

  await page.goto("/fixtures/legal/privacy/");
  await expect(
    page.getByText(/external hosting and technical service providers/),
  ).toBeVisible();
  await expect(page.getByText(/applicable data-protection law/)).toBeVisible();
  await expect(page.getByText(/Vercel/i)).toHaveCount(0);
  await expect(page.getByText(/does not use Google Analytics/)).toBeVisible();

  await page.goto("/fixtures/system-404/");
  await expect(
    page.getByRole("navigation", { name: "Recovery routes" }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Go to the homepage" }),
  ).toHaveAttribute("href", "/");
});

test("@keyboard Contact and recovery routes work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto(`${browserBaseUrl}/fixtures/contact/`);
  await expect(page.locator("[data-contact-form]")).toHaveCount(1);
  const privacy = page.getByRole("link", { name: "Privacy information" });
  await privacy.focus();
  await expect(privacy).toBeFocused();
  await expect(privacy).toHaveAttribute("href", "/privacy/");

  await page.goto(`${browserBaseUrl}/fixtures/system-404/`);
  const recovery = page.getByRole("link", { name: "Browse wagon families" });
  await recovery.focus();
  await expect(recovery).toBeFocused();
  await expect(recovery).toHaveAttribute("href", "/wagons/");
  await context.close();
});

test("@responsive Contact, legal, and 404 routes remain compact and readable", async ({
  page,
}) => {
  for (const route of [
    "/fixtures/contact/",
    "/fixtures/legal/privacy/",
    "/fixtures/legal/imprint/",
    "/fixtures/system-404/",
  ]) {
    await page.goto(route);
    await expectNoPageOverflow(page);
  }

  await page.goto("/fixtures/contact/");
  await expect(page.locator(".contact-page__frame")).toHaveCSS(
    "padding-top",
    "12px",
  );

  await page.goto("/fixtures/legal/privacy/");
  await expect(page.locator(".legal-document__frame")).toHaveCSS(
    "padding-top",
    "12px",
  );
});

test("@responsive Contact keeps paired wide-field controls aligned", async ({
  page,
}) => {
  await page.goto("/fixtures/contact/");
  const form = page.locator("[data-contact-form]");
  const [nameBox, emailBox] = await Promise.all([
    form.getByLabel("Name").boundingBox(),
    form.getByLabel("Business email").boundingBox(),
  ]);

  expect(nameBox).not.toBeNull();
  expect(emailBox).not.toBeNull();

  if ((emailBox?.x ?? 0) > (nameBox?.x ?? 0)) {
    expect(emailBox?.y).toBeCloseTo(nameBox?.y ?? 0, 1);
    expect(emailBox?.height).toBeCloseTo(nameBox?.height ?? 0, 1);
  }
});

test("@a11y Contact, legal, and 404 routes have no serious or critical axe violations", async ({
  page,
}) => {
  for (const route of [
    "/fixtures/contact/",
    "/fixtures/legal/privacy/",
    "/fixtures/legal/imprint/",
    "/fixtures/system-404/",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.filter(
        ({ impact }) => impact === "serious" || impact === "critical",
      ),
    ).toEqual([]);
  }
});

for (const [name, route] of [
  ["contact", "/fixtures/contact/"],
  ["privacy", "/fixtures/legal/privacy/"],
  ["imprint", "/fixtures/legal/imprint/"],
  ["system-404", "/fixtures/system-404/"],
] as const) {
  test(`@visual ${name} page baseline`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
