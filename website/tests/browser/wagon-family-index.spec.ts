import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component WagonFamilyIndex renders all five source-owned families with direct local-media routes only", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/wagon-family-index/");

  const index = page.locator("[data-wagon-family-index]");
  const families = index.locator("[data-wagon-family-index-item]");
  await expect(index.getByRole("heading", { level: 2 })).toHaveText(
    "Five wagon families for distinct freight tasks",
  );
  await expect(families).toHaveCount(5);
  await expect(families.locator("article")).toHaveCount(5);
  await expect(families.locator("img")).toHaveCount(5);
  await expect(families.locator("cite")).toHaveCount(0);
  await expect(families.locator("[data-action='link']")).toHaveCount(5);
  await expect(families.locator("script")).toHaveCount(0);
  await expect(index.locator("input, select, button")).toHaveCount(0);

  const expected = [
    ["01", "Intermodal", "/wagons/intermodal/"],
    ["02", "Flat", "/wagons/flat/"],
    ["03", "Timber", "/wagons/timber/"],
    ["04", "Open box", "/wagons/open-box/"],
    ["05", "Tank", "/wagons/tank/"],
  ];
  for (const [index, [position, title, href]] of expected.entries()) {
    const family = families.nth(index);
    await expect(family.locator(".wagon-family-index__sequence")).toHaveText(
      position!,
    );
    await expect(family.getByRole("heading", { level: 3 })).toHaveText(title!);
    await expect(family.getByRole("link")).toHaveAttribute("href", href!);
    await expect(family.locator("img")).toHaveAttribute("src", /_astro\//);
    await expect(family.locator("img")).not.toHaveAttribute(
      "src",
      /https?:\/\//,
    );
  }
  expect(errors).toEqual([]);
});

test("@keyboard WagonFamilyIndex keeps direct family routes native, touch-sized, and source ordered", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-family-index/");
  const index = page.locator("[data-wagon-family-index]");
  const links = index.getByRole("link");
  const first = links.first();
  const second = links.nth(1);

  await first.focus();
  await expect(first).toBeFocused();
  expect((await first.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await first.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(second).toBeFocused();
  await expect(links).toHaveText([
    "View Intermodal wagons",
    "View Flat wagons",
    "View Timber wagons",
    "View Open box wagons",
    "View Tank wagons",
  ]);
});

test("@responsive WagonFamilyIndex keeps compact rows uniform and wide rows deliberately alternate without overflow", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-family-index/");
  const index = page.locator("[data-wagon-family-index]");
  const families = index.locator("[data-wagon-family-index-item]");
  const wideRowHeights: number[] = [];
  await expectNoPageOverflow(page);

  for (let item = 0; item < 5; item += 1) {
    const family = families.nth(item);
    const root = family.locator("[data-family-id]");
    const copy = family.locator("[data-wagon-family-index-copy]");
    const media = family.locator("[data-wagon-family-index-media]");
    const footer = family.locator(".wagon-family-index__footer");
    const title = family.locator(".wagon-family-index__title");
    const columns = await root.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );
    const copyBox = await copy.boundingBox();
    const mediaBox = await media.boundingBox();
    const imageBox = await media.locator("img").boundingBox();
    const footerBox = await footer.boundingBox();
    const titleBox = await title.boundingBox();
    expect(copyBox).not.toBeNull();
    expect(mediaBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    if (columns === 1) {
      expect(mediaBox?.y).toBeGreaterThan(copyBox?.y ?? 0);
      expect(footerBox?.y).toBeGreaterThan(mediaBox?.y ?? 0);
    } else {
      expect(columns).toBe(2);
      wideRowHeights.push((await family.boundingBox())?.height ?? 0);
      expect(mediaBox?.y).toBeCloseTo((await root.boundingBox())?.y ?? 0, 0);
      expect(Math.abs((copyBox?.x ?? 0) - (mediaBox?.x ?? 0))).toBeGreaterThan(
        24,
      );
      expect(imageBox?.height).toBeLessThanOrEqual(240);
      expect((imageBox?.y ?? 0) + (imageBox?.height ?? 0) / 2).toBeCloseTo(
        (mediaBox?.y ?? 0) + (mediaBox?.height ?? 0) / 2,
        0,
      );
      if (item % 2 === 0) {
        expect(copyBox?.x).toBeLessThan(mediaBox?.x ?? 0);
      } else {
        expect(copyBox?.x).toBeGreaterThan(mediaBox?.x ?? 0);
        expect(
          (titleBox?.x ?? 0) - ((mediaBox?.x ?? 0) + (mediaBox?.width ?? 0)),
        ).toBeGreaterThanOrEqual(48);
        expect(
          (copyBox?.x ?? 0) - ((imageBox?.x ?? 0) + (imageBox?.width ?? 0)),
        ).toBeGreaterThanOrEqual(64);
      }
    }
  }
  if (wideRowHeights.length > 0) {
    expect(
      new Set(wideRowHeights.map((height) => Math.round(height))).size,
    ).toBe(1);
  }
  await expectNoPageOverflow(page);
});

test("@responsive WagonFamilyIndex makes a continuous list with one divider at every row boundary", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-family-index/");
  const items = page.locator("[data-wagon-family-index-item]");
  const list = page.locator("[data-wagon-family-index-list]");

  expect(
    await list.evaluate((element) => getComputedStyle(element).rowGap),
  ).toBe("normal");
  expect(
    await list.evaluate((element) => getComputedStyle(element).borderTopWidth),
  ).toBe("1px");
  expect(
    await list.evaluate(
      (element) => getComputedStyle(element).borderBottomWidth,
    ),
  ).toBe("1px");
  for (let index = 0; index < 4; index += 1) {
    expect(
      await items
        .nth(index)
        .evaluate((element) => getComputedStyle(element).borderBottomWidth),
    ).toBe("1px");
  }
  expect(
    await items
      .last()
      .evaluate((element) => getComputedStyle(element).borderBottomWidth),
  ).toBe("0px");
});

test("@a11y WagonFamilyIndex fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-family-index/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual WagonFamilyIndex fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/wagon-family-index/");
  await expect(page).toHaveScreenshot("wagon-family-index.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
