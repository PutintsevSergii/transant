import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component RelatedWagons renders explicit approved many/zero relations, local media, sources, and direct routes", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/related-wagons/");

  const sections = page.locator("[data-related-wagons]");
  const many = sections.nth(0);
  const empty = sections.nth(1);
  await expect(sections).toHaveCount(2);
  await expect(many.getByRole("heading", { level: 2 })).toHaveText(
    "Related wagons",
  );
  await expect(many.locator("[data-related-wagons-item]")).toHaveCount(2);
  await expect(many.locator("article")).toHaveCount(2);
  await expect(many.locator("[data-related-wagons-media] img")).toHaveCount(2);
  for (let position = 0; position < 2; position += 1) {
    const image = many.locator("[data-related-wagons-media] img").nth(position);
    await expect(image).toHaveAttribute("src", /_astro\//);
    await expect(image).not.toHaveAttribute("src", /https?:\/\//);
  }
  await expect(many.locator("[data-related-wagon-id]").first()).toHaveAttribute(
    "data-related-wagon-id",
    "uno-flat-60ft-rens",
  );
  await expect(many.getByRole("link").nth(0)).toHaveAttribute(
    "href",
    "/wagons/flat/uno-flat-60ft-rens/",
  );
  await expect(many.getByRole("link").nth(1)).toHaveAttribute(
    "href",
    "/wagons/flat/uno-flat-60ft-relns/",
  );
  await expect(many).not.toContainText("Withheld fixture relationship");
  await expect(empty.locator("[data-related-wagons-empty]")).toHaveText(
    "Explore the wagon catalogue for more models.",
  );
  await expect(sections.locator("script, input, select, button")).toHaveCount(
    0,
  );
  expect(errors).toEqual([]);
});

test("@keyboard RelatedWagons keeps direct product links in visible source order with touch-sized focus", async ({
  page,
}) => {
  await page.goto("/fixtures/related-wagons/");
  const links = page.locator("[data-related-wagons]").nth(0).getByRole("link");
  await links.first().focus();
  await expect(links.first()).toBeFocused();
  expect((await links.first().boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );
  expect(
    await links
      .first()
      .evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(links.nth(1)).toBeFocused();
  await expect(links).toHaveText([
    "View 60 ft Rens flat wagon",
    "View 60 ft Relns flat wagon",
  ]);
});

test("@responsive RelatedWagons keeps a compact single-column list and adds a contained wide grid", async ({
  page,
}) => {
  await page.goto("/fixtures/related-wagons/");
  const section = page.locator("[data-related-wagons]").nth(0);
  const list = section.locator("[data-related-wagons-list]");
  const items = section.locator("[data-related-wagons-item]");
  await expectNoPageOverflow(page);
  const columns = await list.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );
  const first = await items.nth(0).boundingBox();
  const second = await items.nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  if (columns === 1) {
    expect(second?.y).toBeGreaterThan(first?.y ?? 0);
  } else {
    expect(columns).toBe(2);
    expect(second?.x).toBeGreaterThan(first?.x ?? 0);
  }
  await expectNoPageOverflow(page);
});

test("@a11y RelatedWagons fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/related-wagons/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual RelatedWagons fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/related-wagons/");
  await expect(page).toHaveScreenshot("related-wagons.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
