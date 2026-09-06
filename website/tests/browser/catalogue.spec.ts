import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
  waitForPageImages,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

const families = [
  { slug: "intermodal", name: "Intermodal", models: 1 },
  { slug: "flat", name: "Flat", models: 3 },
  { slug: "timber", name: "Timber", models: 2 },
  { slug: "open-box", name: "Multi / Open box", models: 3 },
  { slug: "tank", name: "Tank", models: 1 },
];

test("@component Catalogue route composes one document shell, a page hero, and five direct family destinations", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/catalogue/");

  await expect(page).toHaveTitle("Freight wagon families | TransANT");
  await expect(page.locator("[data-site-header]")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("[data-site-footer]")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Freight wagons for every transport task",
  );
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta).toHaveCount(1);
  await expect(pageMeta).toHaveAttribute("aria-hidden", "true");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Freight wagon catalogue",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Intermodal / Flat / Timber / Multi / Open box / Tank",
  );
  const [pageMetaBox, heroBox] = await Promise.all([
    pageMeta.boundingBox(),
    page.locator("[data-page-hero]").boundingBox(),
  ]);
  expect(pageMetaBox).not.toBeNull();
  expect(heroBox).not.toBeNull();
  expect(
    (pageMetaBox?.y ?? 0) + (pageMetaBox?.height ?? 0),
  ).toBeLessThanOrEqual(heroBox?.y ?? 0);

  const familyIndex = page.locator("[data-wagon-family-index]");
  await expect(
    familyIndex.locator("[data-wagon-family-index-item]"),
  ).toHaveCount(5);
  await expect(familyIndex.locator("input, select, button")).toHaveCount(0);

  for (const family of families) {
    await expect(
      familyIndex.getByRole("link", {
        name: `View ${family.name} wagons`,
      }),
    ).toHaveAttribute("href", `/wagons/${family.slug}/`);
  }
  expect(errors).toEqual([]);
});

test("@component Catalogue family routes preserve source-defined models and direct product destinations", async ({
  page,
}) => {
  for (const family of families) {
    const errors = collectBrowserErrors(page);
    await page.goto(`/fixtures/catalogue/${family.slug}/`);

    await expect(page).toHaveTitle(`${family.name} wagon family | TransANT`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      `${family.name} wagons`,
    );
    const modelList = page.locator("[data-wagon-model-list]");
    await expect(modelList.locator("[data-wagon-model-list-item]")).toHaveCount(
      family.models,
    );
    await expect(
      modelList.locator("[data-wagon-model-list-heading]"),
    ).toHaveCount(0);
    await expect(modelList.getByRole("heading", { level: 2 })).toHaveCount(
      family.models,
    );
    await expect(modelList.locator("img")).toHaveCount(family.models);
    await expect(modelList.locator("input, select, button")).toHaveCount(0);
    await expect(modelList.getByRole("link")).toHaveCount(family.models);
    for (const image of await modelList.locator("img").all()) {
      await expect(image).toHaveAttribute("src", /_astro\//);
      await expect(image).not.toHaveAttribute("src", /https?:\/\//);
    }
    expect(errors).toEqual([]);
  }
});

test("@keyboard Catalogue remains directly navigable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/catalogue/`);

  const firstFamilyLink = page.getByRole("link", {
    name: "View Intermodal wagons",
  });
  await firstFamilyLink.focus();
  await expect(firstFamilyLink).toBeFocused();
  expect((await firstFamilyLink.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );
  await expect(firstFamilyLink).toHaveAttribute("href", "/wagons/intermodal/");
  await context.close();
});

test("@responsive Catalogue and every family route retain direct compact browsing without overflow", async ({
  page,
}) => {
  await page.goto("/fixtures/catalogue/");
  const breadcrumbFirstItem = page.locator("[data-breadcrumbs-item]").first();
  const heroFrame = page.locator("[data-page-hero-frame]");
  const heroContent = page.locator("[data-page-hero-content]");
  const [breadcrumbFirstItemBox, heroFrameBox, heroContentBox] =
    await Promise.all([
      breadcrumbFirstItem.boundingBox(),
      heroFrame.boundingBox(),
      heroContent.boundingBox(),
    ]);
  expect(breadcrumbFirstItemBox).not.toBeNull();
  expect(heroFrameBox).not.toBeNull();
  expect(heroContentBox).not.toBeNull();
  expect(
    Math.abs((breadcrumbFirstItemBox?.x ?? 0) - (heroContentBox?.x ?? 0)),
  ).toBeLessThanOrEqual(1);
  const topInset = (heroContentBox?.y ?? 0) - (heroFrameBox?.y ?? 0);
  const bottomInset =
    (heroFrameBox?.y ?? 0) +
    (heroFrameBox?.height ?? 0) -
    ((heroContentBox?.y ?? 0) + (heroContentBox?.height ?? 0));
  expect(topInset).toBeGreaterThanOrEqual(24);
  expect(bottomInset).toBeGreaterThanOrEqual(24);
  expect(Math.abs(topInset - bottomInset)).toBeLessThanOrEqual(1);
  await expectNoPageOverflow(page);
  await expect(page.locator("[data-page-meta-sequence]")).toHaveCSS(
    "white-space",
    "nowrap",
  );

  for (const family of families) {
    await page.goto(`/fixtures/catalogue/${family.slug}/`);
    const modelItems = page.locator("[data-wagon-model-list-item]");
    const modelList = page.locator("[data-wagon-model-list-items]");
    const columns = await modelList.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );
    if ((page.viewportSize()?.width ?? 0) < 800) {
      expect(columns).toBe(1);
      for (let index = 1; index < family.models; index += 1) {
        const previous = await modelItems.nth(index - 1).boundingBox();
        const current = await modelItems.nth(index).boundingBox();
        expect(current?.y).toBeGreaterThan(previous?.y ?? 0);
      }
    }
    await expectNoPageOverflow(page);
  }
});

test("@a11y Catalogue index and family routes have no serious or critical axe violations", async ({
  page,
}) => {
  const routes = [
    "/fixtures/catalogue/",
    ...families.map((family) => `/fixtures/catalogue/${family.slug}/`),
  ];
  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations.filter(
        ({ impact }) => impact === "serious" || impact === "critical",
      ),
    ).toEqual([]);
  }
});

test("@visual Catalogue index visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/catalogue/");
  await waitForPageImages(page);
  await expect(page).toHaveScreenshot("catalogue-index.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});

for (const family of families) {
  test(`@visual ${family.name} family route visual baseline`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/fixtures/catalogue/${family.slug}/`);
    await expect(page).toHaveScreenshot(`catalogue-${family.slug}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
