import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component SpecificationGroup keeps source-ordered technical labels, values, units, and provenance semantic", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/specification-group/");

  const groups = page.locator("[data-specification-group]");
  const primary = groups.first();
  const compact = groups.nth(1);
  const expanded = groups.nth(2);
  await expect(groups).toHaveCount(3);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Technical specifications",
  );
  await expect(primary.locator("dl")).toHaveCount(1);
  await expect(primary.locator("[data-specification-row]")).toHaveCount(6);
  await expect(primary.locator("dt")).toHaveText([
    "Wagon type",
    "Number of axles",
    "Distance between bogie pivots",
    "Bogie type",
    "Length over buffers",
    "Wagon tare",
  ]);
  await expect(primary.locator("[data-specification-value]")).toHaveText([
    "Sgns(s)",
    "4",
    "14.200",
    "Y25 with classic brake",
    "19.830",
    "19.3",
  ]);
  await expect(primary.locator("[data-specification-unit]")).toHaveText([
    "mm",
    "mm",
    "t",
  ]);
  await expect(compact.locator("[data-specification-unit]")).toHaveCount(1);
  await expect(
    compact.getByText("Vehicle gauge", { exact: true }),
  ).toBeVisible();
  await expect(expanded.getByRole("heading", { level: 3 })).toHaveText(
    "Expanded engineering context",
  );
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@responsive SpecificationGroup keeps compact label/value pairs together and expands only within its component boundary", async ({
  page,
}) => {
  await page.goto("/fixtures/specification-group/");
  const primary = page.locator("[data-specification-group]").first();
  const firstRow = primary.locator("[data-specification-row]").first();
  const [labelBox, valueBox] = await Promise.all([
    firstRow.locator("dt").boundingBox(),
    firstRow.locator("dd").boundingBox(),
  ]);

  expect(labelBox).not.toBeNull();
  expect(valueBox).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) < 768) {
    expect(valueBox?.y).toBeGreaterThan(labelBox?.y ?? 0);
  } else {
    expect(valueBox?.x).toBeGreaterThan(labelBox?.x ?? 0);
  }

  await expect(
    page.getByText(
      "14.200 (source-preserved value; calculation and normalization remain outside this component)",
    ),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("@a11y SpecificationGroup fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/specification-group/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual SpecificationGroup fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/specification-group/");
  await expect(page).toHaveScreenshot("specification-group.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
