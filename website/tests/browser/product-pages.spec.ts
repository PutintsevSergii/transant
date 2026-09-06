import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const products = [
  {
    family: "intermodal",
    slug: "uno-intermodal-60ft-sgns",
    title: "UNO INTERMODAL 60ft",
    code: "Sgns(s)",
    loadLimits: true,
  },
  {
    family: "flat",
    slug: "uno-flat-60ft-rens",
    title: "UNO FLAT 60ft",
    code: "Rens",
    loadLimits: true,
  },
  {
    family: "flat",
    slug: "uno-flat-60ft-relns",
    title: "UNO FLAT 60ft",
    code: "Relns",
    loadLimits: true,
  },
  {
    family: "flat",
    slug: "uno-flat-60ft-rns",
    title: "UNO FLAT 60ft",
    code: "Rns",
    loadLimits: true,
  },
  {
    family: "timber",
    slug: "uno-timber-60ft-rnoos",
    title: "UNO TIMBER 60ft",
    code: "Rnoos",
    loadLimits: true,
  },
  {
    family: "timber",
    slug: "uno-timber-60ft-snps",
    title: "UNO TIMBER 60ft",
    code: "Snps",
    loadLimits: true,
  },
  {
    family: "open-box",
    slug: "uno-multibox-33ft-eamnos",
    title: "UNO MULTIBox 33ft",
    code: "Eamnos",
    loadLimits: true,
  },
  {
    family: "open-box",
    slug: "uno-multi-40ft-eanos",
    title: "UNO MULTI 40ft",
    code: "Eanos",
    loadLimits: true,
  },
  {
    family: "open-box",
    slug: "uno-multi-56ft-eanos",
    title: "UNO MULTI 56ft",
    code: "Eanos",
    loadLimits: true,
  },
  {
    family: "tank",
    slug: "uno-tank-88m3-zacns",
    title: "UNO TANK 88m³",
    code: "Zacns",
    loadLimits: true,
  },
] as const;

const fixtureRoute = (product: (typeof products)[number]): string =>
  `/fixtures/products/${product.family}/${product.slug}/`;
const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

test("@component Product pages compose all ten source-defined routes from one document template", async ({
  page,
}) => {
  for (const product of products) {
    const errors = collectBrowserErrors(page);
    await page.goto(fixtureRoute(product));

    await expect(page).toHaveTitle(
      `${product.title} ${product.code} | TransANT`,
    );
    await expect(page.locator("[data-site-header]")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("[data-site-footer]")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      product.title,
    );
    await expect(page.locator("[data-product-hero-code]")).toHaveText(
      product.code,
    );
    await expect(page.locator("[data-breadcrumbs]")).toHaveCount(1);
    await expect(page.locator("[data-product-hero]")).toHaveCount(1);
    await expect(page.locator("[data-product-hero-media]")).toHaveCSS(
      "border-top-width",
      "0px",
    );
    await expect(page.locator("[data-product-hero-media] img")).toHaveCSS(
      "object-position",
      "100% 50%",
    );
    await expect(page.locator("[data-cargo-fit]")).toHaveCount(1);
    await expect(page.locator("[data-technical-sheet]")).toHaveCount(1);
    await expect(page.locator("[data-specification-group]")).toHaveCount(
      product.family === "intermodal" || product.family === "tank" ? 1 : 2,
    );
    await expect(page.locator("[data-technical-drawings] figure")).toHaveCount(
      product.family === "intermodal" || product.family === "timber" ? 3 : 2,
    );
    await expect(page.locator("[data-drawing-link]").first()).toHaveAttribute(
      "href",
      /_astro\/.*\.webp/,
    );
    await expect(page.locator("[data-contact-cta]")).toHaveCount(1);
    await expect(page.locator("[data-load-limit-table]")).toHaveCount(
      product.loadLimits ? 1 : 0,
    );
    for (const image of await page.locator("main img").all()) {
      await expect(image).toHaveAttribute("src", /_astro\//);
      await expect(image).not.toHaveAttribute("src", /https?:\/\//);
    }
    expect(errors).toEqual([]);
  }
});

test("@keyboard Product pages keep their product context and technical table reachable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    `${browserBaseUrl}/fixtures/products/flat/uno-flat-60ft-rens/`,
  );

  const contact = page.getByRole("link", { name: "Discuss this wagon" });
  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(contact).toHaveAttribute("href", /context=UNO\+FLAT\+60ft/);
  expect((await contact.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  const tableScroller = page.locator("[data-load-limit-scroll]");
  await tableScroller.focus();
  await expect(tableScroller).toBeFocused();

  const drawingLink = page.locator("[data-drawing-link]").first();
  await drawingLink.focus();
  await expect(drawingLink).toBeFocused();
  expect((await drawingLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await context.close();
});

test("@responsive Product pages preserve compact source order and keep technical overflow contained", async ({
  page,
}) => {
  await page.goto("/fixtures/products/flat/uno-flat-60ft-rens/");

  const breadcrumbFirstItem = page.locator("[data-breadcrumbs-item]").first();
  const heroContent = page.locator("[data-product-hero-content]");
  const [breadcrumbFirstItemBox, heroContentBox] = await Promise.all([
    breadcrumbFirstItem.boundingBox(),
    heroContent.boundingBox(),
  ]);
  expect(breadcrumbFirstItemBox).not.toBeNull();
  expect(heroContentBox).not.toBeNull();
  expect(
    Math.abs((breadcrumbFirstItemBox?.x ?? 0) - (heroContentBox?.x ?? 0)),
  ).toBeLessThanOrEqual(1);

  const hero = page.locator("[data-product-hero]");
  const cargoFit = page.locator("[data-cargo-fit]");
  const technicalSheet = page.locator("[data-technical-sheet]");
  const [heroBox, cargoFitBox, technicalSheetBox] = await Promise.all([
    hero.boundingBox(),
    cargoFit.boundingBox(),
    technicalSheet.boundingBox(),
  ]);
  expect(cargoFitBox?.y).toBeGreaterThan(heroBox?.y ?? 0);
  expect(technicalSheetBox?.y).toBeGreaterThan(cargoFitBox?.y ?? 0);
  if ((page.viewportSize()?.width ?? 0) < 592) {
    await expect(page.locator("[data-load-limit-scroll-hint]")).toBeVisible();
  }
  await expectNoPageOverflow(page);
});

test("@a11y Product pages have no serious or critical axe violations", async ({
  page,
}) => {
  for (const product of products) {
    await page.goto(fixtureRoute(product));
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

for (const product of products) {
  test(`@visual ${product.family}-${product.slug} product page baseline`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(fixtureRoute(product));
    await expect(page).toHaveScreenshot(
      `${product.family}-${product.slug}.png`,
      {
        animations: "disabled",
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      },
    );
  });
}
