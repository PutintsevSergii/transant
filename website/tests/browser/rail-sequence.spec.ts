import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component RailSequence renders ordered stages, optional links, and caller-selected variants", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/rail-sequence/");

  const sequences = page.locator("[data-rail-sequence]");
  await expect(sequences).toHaveCount(3);
  await expect(sequences.nth(0).locator("ol")).toHaveCount(1);
  await expect(
    sequences.nth(0).locator("[data-rail-sequence-item]"),
  ).toHaveCount(4);
  await expect(
    sequences.nth(1).locator("[data-rail-sequence-item]"),
  ).toHaveCount(2);
  await expect(
    sequences.nth(2).locator("[data-rail-sequence-item]"),
  ).toHaveCount(6);
  await expect(sequences.nth(0)).toHaveAttribute(
    "data-rail-sequence-columns",
    "4",
  );
  await expect(sequences.nth(1)).toHaveAttribute(
    "data-rail-sequence-theme",
    "dark",
  );
  await expect(sequences.nth(0).locator("ol")).toHaveAttribute(
    "aria-label",
    "Modular platform equation",
  );
  await expect(
    sequences.nth(1).locator("[data-rail-sequence-label]"),
  ).toHaveCount(0);

  const linkedTitles = page.locator("a.rail-sequence__title");
  await expect(linkedTitles).toHaveCount(4);
  await expect(linkedTitles.first()).toHaveAttribute("href", "#platform-stage");
  await expect(linkedTitles.first()).toHaveAccessibleName("Platform");
  await expect(
    sequences.nth(0).locator(".rail-sequence__number").first(),
  ).toHaveText("01");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Component lab" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(linkedTitles.first()).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#platform-stage$/);
  expect(errors).toEqual([]);
});

test("@responsive RailSequence stacks long content and keeps visible stage relationships contained", async ({
  page,
}) => {
  await page.goto("/fixtures/rail-sequence/");
  await expectNoPageOverflow(page);

  const sequences = page.locator("[data-rail-sequence]");
  const fourStage = sequences.nth(0);
  const extended = sequences.nth(2);
  const fourStageList = fourStage.locator("[data-rail-sequence-list]");
  const fourStageItems = fourStage.locator("[data-rail-sequence-item]");
  const longDescription = extended
    .locator("[data-rail-sequence-item]")
    .first()
    .locator(".rail-sequence__description");

  expect(
    await fourStageItems.first().evaluate((element) => element.tagName),
  ).toBe("LI");
  expect(
    await longDescription.evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);
  expect(
    await longDescription.evaluate(
      (element) => getComputedStyle(element).overflowY,
    ),
  ).toBe("visible");

  const firstItemBox = await fourStageItems.first().boundingBox();
  const secondItemBox = await fourStageItems.nth(1).boundingBox();
  expect(firstItemBox).not.toBeNull();
  expect(secondItemBox).not.toBeNull();

  const columnCount = await fourStageList.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );
  expect([1, 4]).toContain(columnCount);

  if (columnCount === 1) {
    expect(secondItemBox?.y).toBeGreaterThan(firstItemBox?.y ?? 0);
  } else {
    expect(secondItemBox?.x).toBeGreaterThan(firstItemBox?.x ?? 0);
  }

  const viewportWidth = page.viewportSize()?.width ?? 0;
  if (viewportWidth >= 1024) {
    expect(columnCount).toBe(4);
  }

  const firstLinkedTitle = page.locator("a.rail-sequence__title").first();
  await firstLinkedTitle.focus();
  await expect(firstLinkedTitle).toBeFocused();
  expect(
    await firstLinkedTitle.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
  await expectNoPageOverflow(page);
});

test("@a11y RailSequence fixture has no serious or critical axe violations and keeps rail decoration out of the DOM", async ({
  page,
}) => {
  await page.goto("/fixtures/rail-sequence/");
  await expect(
    page.locator("[data-rail-sequence] [aria-hidden='true']"),
  ).toHaveCount(0);
  await expect(page.locator("[data-rail-sequence] svg")).toHaveCount(0);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual RailSequence fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/rail-sequence/");
  await expect(page).toHaveScreenshot("rail-sequence.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
