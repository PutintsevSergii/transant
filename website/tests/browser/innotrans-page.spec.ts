import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  expectNoPageOverflow,
  waitForPageImages,
} from "./support/page-contract";

const officialPositionUrls = [
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__O5_55",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_50",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_55",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_60",
] as const;

test("@page InnoTrans presents confirmed visit facts, official links, and approved partner marks", async ({
  page,
}) => {
  await page.goto("/fixtures/innotrans-page/");

  await expect(page.locator("[data-innotrans-page]")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Meet TransANT at InnoTrans 2026",
  );
  await expect(page.locator("[data-innotrans-visit]")).toContainText(
    "22–25 September 2026",
  );
  await expect(page.locator("[data-innotrans-visit]")).toContainText(
    "Messe Berlin · Outdoor Display",
  );

  for (const url of officialPositionUrls) {
    await expect(page.locator(`a[href='${url}']`)).toHaveCount(1);
  }

  const partnerImages = page.locator(
    "[data-innotrans-partners] .innotrans-page__partner-logo img",
  );
  await expect(partnerImages).toHaveCount(2);
  await waitForPageImages(page);
  expect(
    await partnerImages.evaluateAll((images) =>
      images.every((image) => {
        const source = image.getAttribute("src") ?? "";
        return source.startsWith("/") && !source.startsWith("//");
      }),
    ),
  ).toBe(true);
  await expect(page.locator("main")).not.toContainText(/final exhibit list/iu);
});

test("@responsive InnoTrans keeps its visit and partner content contained", async ({
  page,
}) => {
  await page.goto("/fixtures/innotrans-page/");
  await waitForPageImages(page);
  await expectNoPageOverflow(page);
  await expect(page.locator("[data-innotrans-visit]")).toBeVisible();
  await expect(page.locator("[data-innotrans-partners]")).toBeVisible();
});

test("@a11y InnoTrans has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/innotrans-page/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual InnoTrans dedicated page visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/innotrans-page/");
  await waitForPageImages(page);
  await expect(page).toHaveScreenshot("innotrans-page.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
