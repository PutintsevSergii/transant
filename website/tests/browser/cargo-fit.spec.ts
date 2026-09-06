import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component CargoFit renders only caller-approved cargo and application declarations", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/cargo-fit/");

  const sections = page.locator("[data-cargo-fit]");
  const primary = sections.first();
  const single = sections.nth(1);
  const empty = sections.nth(2);
  const expanded = sections.nth(3);
  await expect(sections).toHaveCount(4);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Approved cargo and use cases",
  );
  await expect(primary.locator("[data-cargo-fit-entry]")).toHaveCount(3);
  await expect(primary.locator("[data-cargo-fit-entry] cite")).toHaveCount(0);
  await expect(
    primary.getByText("Unverified compatibility must remain absent"),
  ).toHaveCount(0);
  await expect(single.locator("[data-cargo-fit-entry]")).toHaveCount(1);
  await expect(empty.locator("[data-cargo-fit-list]")).toHaveCount(0);
  await expect(empty.locator("[data-cargo-fit-empty]")).toHaveText(
    "Contact TransANT to discuss your cargo and loading requirements.",
  );
  await expect(expanded.locator("[data-cargo-fit-entry]")).toHaveCount(6);
  await expect(primary.locator("script")).toHaveCount(0);

  const sourceOrder = await primary
    .locator(":scope > .cargo-fit__frame > *")
    .evaluateAll((elements) => elements.map((element) => element.className));
  expect(sourceOrder).toEqual([
    "section-intro section-intro--left section-intro--light section-intro--standard",
    "cargo-fit__list",
  ]);
  expect(errors).toEqual([]);
});

test("@responsive CargoFit keeps compact cards in source order, adds contained wide columns, and wraps long declarations", async ({
  page,
}) => {
  await page.goto("/fixtures/cargo-fit/");
  const primary = page.locator("[data-cargo-fit]").first();
  const expanded = page.locator("[data-cargo-fit]").nth(3);
  const primaryEntries = primary.locator("[data-cargo-fit-entry]");
  const first = primaryEntries.first();
  const second = primaryEntries.nth(1);
  const [firstBox, secondBox] = await Promise.all([
    first.boundingBox(),
    second.boundingBox(),
  ]);

  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) < 768) {
    expect(secondBox?.y).toBeGreaterThan(firstBox?.y ?? 0);
  } else {
    expect(secondBox?.x).toBeGreaterThan(firstBox?.x ?? 0);
  }

  const gridColumns = await expanded
    .locator("[data-cargo-fit-list]")
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  if ((page.viewportSize()?.width ?? 0) >= 1440) {
    expect(gridColumns.split(" ")).toHaveLength(3);
  }

  await expect(
    expanded.getByText(
      "Long and bulky cargo with caller-approved securing requirements",
    ),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("@a11y CargoFit fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/cargo-fit/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual CargoFit fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/cargo-fit/");
  await expect(page).toHaveScreenshot("cargo-fit.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
