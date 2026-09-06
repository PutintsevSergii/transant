import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component CollaborationProcess composes caller-owned introductions, standard or expanded steps, and an optional contact route", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/collaboration-process/");

  const sections = page.locator("[data-collaboration-process]");
  const primary = sections.first();
  const expanded = sections.nth(1);
  await expect(sections).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "From transport task to a commissioned fleet",
  );
  await expect(expanded.getByRole("heading", { level: 3 })).toHaveText(
    /expanded process preserves the same semantic rail/i,
  );
  await expect(primary.locator("[data-rail-sequence-item]")).toHaveCount(4);
  await expect(expanded.locator("[data-rail-sequence-item]")).toHaveCount(6);
  await expect(primary.getByRole("list")).toHaveAttribute(
    "aria-label",
    "Collaboration process",
  );
  await expect(
    primary.getByRole("link", { name: /discuss the fixture process/i }),
  ).toHaveAttribute("href", "/fixtures/collaboration-process/#fixture-contact");
  await expect(expanded.locator("[data-action]")).toHaveCount(0);
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard CollaborationProcess keeps its optional native contact action reachable with visible focus", async ({
  page,
}) => {
  await page.goto("/fixtures/collaboration-process/");
  const contactLink = page.getByRole("link", {
    name: /discuss the fixture process/i,
  });

  for (let tabCount = 0; tabCount < 6; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (
      await contactLink.evaluate(
        (element) => element === document.activeElement,
      )
    ) {
      break;
    }
  }

  await expect(contactLink).toBeFocused();
  expect((await contactLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await contactLink.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
});

test("@responsive CollaborationProcess preserves heading/link order, compact vertical steps, long-copy growth, and wide process rows", async ({
  page,
}) => {
  await page.goto("/fixtures/collaboration-process/");
  const primary = page.locator("[data-collaboration-process]").first();
  const heading = primary.locator("[data-collaboration-process-heading]");
  const sequence = primary.locator("[data-collaboration-process-sequence]");
  const list = primary.locator("[data-rail-sequence-list]");
  const items = primary.locator("[data-rail-sequence-item]");
  const firstItem = items.first();
  const secondItem = items.nth(1);
  const headingBox = await heading.boundingBox();
  const sequenceBox = await sequence.boundingBox();
  const firstItemBox = await firstItem.boundingBox();
  const secondItemBox = await secondItem.boundingBox();

  expect(headingBox).not.toBeNull();
  expect(sequenceBox).not.toBeNull();
  expect(firstItemBox).not.toBeNull();
  expect(secondItemBox).not.toBeNull();
  expect(sequenceBox?.y).toBeGreaterThan(headingBox?.y ?? 0);
  expect(
    await primary
      .locator(
        ".collaboration-process__heading, .collaboration-process__sequence",
      )
      .evaluateAll((elements) => elements.map((element) => element.className)),
  ).toEqual([
    "collaboration-process__heading",
    "collaboration-process__sequence",
  ]);
  expect(
    await page
      .locator("[data-collaboration-process]")
      .nth(1)
      .locator(".rail-sequence__description")
      .first()
      .evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);

  const columnCount = await list.evaluate(
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
  await expectNoPageOverflow(page);
});

test("@a11y CollaborationProcess fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/collaboration-process/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual CollaborationProcess fixture visual baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/collaboration-process/");
  await expect(page).toHaveScreenshot("collaboration-process.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
