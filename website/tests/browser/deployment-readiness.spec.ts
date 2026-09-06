import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";

test("@release I-006 preview smoke retains compact and desktop-ready public journeys without analytics", async ({
  page,
}) => {
  for (const route of ["/fixtures/homepage/", "/fixtures/contact/"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("[data-site-header]")).toHaveCount(1);
    await expect(page.locator("[data-site-footer]")).toHaveCount(1);
    await expectNoPageOverflow(page);
  }

  await page.goto("/fixtures/contact/");
  await expect(page.locator("form")).toHaveAttribute(
    "action",
    "mailto:office@transant.com",
  );
  await expect(page.locator("form")).toHaveAttribute("method", "get");
  await expect(page.locator("script[src*='googletagmanager']")).toHaveCount(0);
  await expect(page.locator("script[src*='google-analytics']")).toHaveCount(0);
});
