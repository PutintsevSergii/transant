import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component WagonModelList renders semantic one/many model articles, codes, local media fallback, and direct links", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/wagon-model-list/");

  const lists = page.locator("[data-wagon-model-list]");
  const single = lists.nth(0);
  const multiple = lists.nth(1);
  await expect(lists).toHaveCount(2);
  await expect(
    single.getByRole("heading", { name: "Intermodal wagon models" }),
  ).toHaveCount(0);
  await expect(single.getByRole("heading", { level: 2 })).toHaveText(
    "60 ft intermodal wagon",
  );
  const singleTitle = single.locator(".wagon-model-list__title");
  const singleSummary = single.locator("[data-wagon-model-list-copy] p").nth(1);
  expect(
    await singleTitle.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    ),
  ).toBeLessThanOrEqual(28.8);
  const [titleBox, summaryBox] = await Promise.all([
    singleTitle.boundingBox(),
    singleSummary.boundingBox(),
  ]);
  expect(summaryBox?.y).toBeGreaterThanOrEqual(
    (titleBox?.y ?? 0) + (titleBox?.height ?? 0),
  );
  await expect(single.locator("[data-wagon-model-list-item]")).toHaveCount(1);
  await expect(multiple.locator("[data-wagon-model-list-item]")).toHaveCount(3);
  await expect(multiple.locator("article")).toHaveCount(3);
  await expect(multiple.locator("[data-wagon-model-code]")).toHaveText([
    "Rens",
    "Relns",
    "Rns",
  ]);
  await expect(multiple.locator("[data-wagon-model-details]")).toHaveCount(3);
  expect(
    await multiple
      .locator("[data-wagon-model-details] ul")
      .evaluateAll((lists) =>
        lists.map((list) =>
          Array.from(list.children)
            .map((item) => item.textContent?.trim())
            .join("\n"),
        ),
      ),
  ).toEqual([
    "Steel coils and sheets\nTimber and construction materials",
    "Steel products\nConstruction materials",
    "Steel profiles\nPipes and tubes",
  ]);
  await expect(multiple.getByRole("heading", { level: 2 })).toHaveText([
    "60 ft flat wagon",
    "60 ft flat wagon with a longer fixture title",
    "60 ft flat wagon without a supplied render",
  ]);
  const localImages = multiple.locator("img");
  await expect(localImages).toHaveCount(2);
  for (let position = 0; position < 2; position += 1) {
    const image = localImages.nth(position);
    await expect(image).toHaveAttribute("src", /_astro\//);
    await expect(image).not.toHaveAttribute("src", /https?:\/\//);
  }
  await expect(
    multiple.locator("[data-wagon-model-media-fallback]"),
  ).toHaveText(
    "No reviewed wagon render has been supplied for this fixture model.",
  );
  await expect(multiple.getByRole("link").nth(0)).toHaveAttribute(
    "href",
    "/wagons/flat/uno-flat-60ft-rens/",
  );
  await expect(multiple.getByRole("link").nth(1)).toHaveAttribute(
    "href",
    "/wagons/flat/uno-flat-60ft-relns/",
  );
  await expect(multiple.getByRole("link").nth(2)).toHaveAttribute(
    "href",
    "/wagons/flat/uno-flat-60ft-rns/",
  );
  await expect(lists.locator("script, input, select, button")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard WagonModelList keeps direct product links in source order with touch-sized visible focus", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-model-list/");
  const links = page
    .locator("[data-wagon-model-list]")
    .nth(1)
    .getByRole("link");
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
    "View 60 ft Rns flat wagon",
  ]);
});

test("@responsive WagonModelList keeps single-column compact models and adds a contained wide three-column composition", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-model-list/");
  const list = page.locator("[data-wagon-model-list]").nth(1);
  const cards = list.locator("[data-wagon-model-list-item]");
  const items = list.locator("[data-wagon-model-list-items]");
  await expectNoPageOverflow(page);
  expect(
    await items.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).paddingBlockEnd),
    ),
  ).toBe(48);
  const columns = await items.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  const third = await cards.nth(2).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(third).not.toBeNull();
  if (columns === 1) {
    expect(second?.y).toBeGreaterThan(first?.y ?? 0);
    expect(third?.y).toBeGreaterThan(second?.y ?? 0);
  } else {
    expect(columns).toBe(3);
    expect(second?.x).toBeGreaterThan(first?.x ?? 0);
    expect(third?.x).toBeGreaterThan(second?.x ?? 0);
    expect(third?.y).toBeCloseTo(first?.y ?? 0, 0);
  }
  await expectNoPageOverflow(page);
});

test("@a11y WagonModelList fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-model-list/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual WagonModelList fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/wagon-model-list/");
  await expect(page).toHaveScreenshot("wagon-model-list.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
