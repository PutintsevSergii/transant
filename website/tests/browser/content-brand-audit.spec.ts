import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";
import { pageReviewRoutes } from "../support/page-review-routes";

const productRoutes = pageReviewRoutes.filter(({ id }) =>
  id.startsWith("product-"),
);

test("@content I-005 keeps all ten source-derived product records, provenance, and immutable logo visible at every review width", async ({
  page,
}) => {
  expect(productRoutes).toHaveLength(10);

  for (const product of productRoutes) {
    await page.goto(product.fixtureRoute);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-product-hero-code]")).toBeVisible();
    await expect(
      page.locator("[data-specification-value]").first(),
    ).toBeVisible();
    await expect(page.locator("[data-specification-group] cite")).toHaveCount(
      0,
    );
    await expect(page.locator("[data-brand-logo] img")).toHaveCount(2);
    await expect(page.locator("[data-brand-logo] img").first()).toHaveAttribute(
      "src",
      "/brand/transant-logo.png",
    );
    await expectNoPageOverflow(page);
  }
});

test("@content I-005 keeps the contact form and source-faithful privacy boundary explicit", async ({
  page,
}) => {
  await page.goto("/fixtures/contact/");
  await expect(page.locator("form")).toHaveAttribute(
    "action",
    "mailto:office@transant.com",
  );
  await expect(
    page.getByRole("button", { name: "Continue in email" }),
  ).toBeVisible();

  await page.goto("/fixtures/legal/privacy/");
  await expect(
    page.getByText(/TransAnt GmbH, voestalpine-Straße 3/),
  ).toBeVisible();
  await expect(page.getByText(/Hutchison Drei Austria GmbH/)).toBeVisible();
  await expect(page.getByText(/Vercel/i)).toHaveCount(0);
  await expect(page.getByText(/does not use Google Analytics/)).toBeVisible();
  await expectNoPageOverflow(page);
});
