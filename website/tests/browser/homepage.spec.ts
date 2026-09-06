import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ??
  `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT ?? "4322"}`;

test("@component Homepage composes one shell and every homepage section in source order", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/homepage/");

  await expect(page).toHaveTitle(
    "Freight wagons for individual transport tasks | TransANT",
  );
  await expect(page.locator("[data-site-header]")).toHaveCount(1);
  await expect(
    page.locator(
      "[data-site-header] nav[aria-label='Primary navigation'] a[href='/sustainability/']",
    ),
  ).toHaveAttribute("href", "/sustainability/");
  await expect(page.locator("main")).toHaveCount(1);
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta).toHaveCount(1);
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Freight wagon engineering",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Engineering value / Wagon families / Modular platform / Quality and certification / Transport requirements",
  );
  await expect(pageMeta).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("[data-site-footer]")).toHaveCount(1);
  const locale = page.locator(
    "[data-site-header] nav[aria-label='Locale selection']",
  );
  await expect(locale.locator("a[href='/']")).toHaveAttribute("href", "/");
  await expect(locale.locator("a[href='/']")).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(locale.locator("a[href='/de/']")).toHaveAttribute(
    "href",
    "/de/",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Wagons built for more useful payload.",
  );

  const sectionOrder = await page
    .locator("main > section")
    .evaluateAll((sections) =>
      sections.map((section) =>
        section.getAttributeNames().find((name) => name.startsWith("data-")),
      ),
    );
  expect(sectionOrder).toEqual([
    "data-home-hero",
    "data-payload-value-section",
    "data-wagon-switchyard",
    "data-modular-platform-section",
    "data-quality-impact-section",
    "data-contact-cta",
  ]);
  await expect(page.locator("[data-home-hero]")).toHaveCount(1);
  await expect(page.locator("[data-payload-value-section]")).toHaveCount(1);
  await expect(
    page.locator("[data-payload-value-section]").getByRole("heading", {
      level: 2,
    }),
  ).toHaveText("A platform engineered around cargo and operation");
  await expect(page.locator("[data-payload-value-section] li")).toHaveCount(4);
  await expect(page.locator("[data-payload-value-section]")).toContainText(
    "Interchangeable superstructures",
  );
  await expect(
    page.locator(
      "[data-payload-value-section] [data-railway-orbital] figcaption",
    ),
  ).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(
    "Railway routes around an Earth",
  );
  await expect(page.locator("[data-wagon-switchyard]")).toHaveCount(1);
  await expect(page.locator("[data-modular-platform-section]")).toHaveCount(1);
  await expect(page.locator("[data-modular-platform-section]")).toContainText(
    "Engineering & approval",
  );
  await expect(page.locator("[data-modular-platform-section]")).toContainText(
    "loading gauge",
  );
  await expect(page.locator("[data-operational-case-study]")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(
    "Erzberg–Linz ore transport",
  );
  await expect(page.locator("[data-collaboration-process]")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(
    "From transport task to a wagon concept",
  );
  await expect(page.locator("[data-quality-impact-section]")).toHaveCount(1);
  await expect(page.locator("[data-contact-cta]")).toHaveCount(1);
  const homepageContactActions = page.locator('main a[href="/contact/"]');
  await expect(homepageContactActions).toHaveCount(1);
  await expect(homepageContactActions).toHaveAccessibleName("Contact TransANT");
  const technologyActions = page.locator(
    "[data-home-hero] a[href='/technology/'], [data-payload-value-section] a[href='/technology/']",
  );
  await expect(technologyActions).toHaveCount(1);
  await expect(
    page.locator("[data-home-hero]").getByRole("link", {
      name: "Explore the technology",
    }),
  ).toHaveCount(0);
  await expect(
    page.locator("[data-payload-value-section]").getByRole("link", {
      name: "Explore the technology",
    }),
  ).toHaveClass(/action--text/);
  await expect(
    page.locator("[data-wagon-switchyard-rail] a[href^='/wagons/']"),
  ).toHaveCount(5);
  expect(errors).toEqual([]);
});

test("@keyboard Homepage remains directly navigable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/homepage/`);

  await expect(page.locator("[data-wagon-switchyard]")).not.toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(
    page.getByRole("link", { name: "Explore Intermodal" }),
  ).toHaveAttribute("href", "/wagons/intermodal/");
  await page.getByRole("link", { name: "Contact TransANT" }).first().focus();
  await expect(
    page.getByRole("link", { name: "Contact TransANT" }).first(),
  ).toBeFocused();
  await context.close();
});

test("@responsive Homepage preserves the intentional compact sequence without overflow", async ({
  page,
}) => {
  await page.goto("/fixtures/homepage/");

  const hero = page.locator("[data-home-hero]");
  const pageMeta = page.locator("[data-page-meta]");
  const heroContent = hero.locator(".home-hero__content");
  const payload = page.locator("[data-payload-value-section]");
  const payloadProposition = payload.locator(
    ".payload-value-section__proposition",
  );
  const switchyard = page.locator("[data-wagon-switchyard]");
  const viewportWidth = page.viewportSize()?.width ?? 0;
  const [
    pageMetaBox,
    heroBox,
    heroContentBox,
    payloadBox,
    payloadPropositionBox,
    switchyardBox,
  ] = await Promise.all([
    pageMeta.boundingBox(),
    hero.boundingBox(),
    heroContent.boundingBox(),
    payload.boundingBox(),
    payloadProposition.boundingBox(),
    switchyard.boundingBox(),
  ]);

  expect(heroBox).not.toBeNull();
  expect(pageMetaBox).not.toBeNull();
  expect(heroBox?.y).toBeGreaterThanOrEqual(
    (pageMetaBox?.y ?? 0) + (pageMetaBox?.height ?? 0),
  );
  expect(heroContentBox).not.toBeNull();
  expect(payloadPropositionBox).not.toBeNull();
  expect(
    Math.abs((heroContentBox?.x ?? 0) - (payloadPropositionBox?.x ?? 0)),
  ).toBeLessThanOrEqual(1);
  expect(payloadBox?.y).toBeGreaterThan(heroBox?.y ?? 0);
  expect(switchyardBox?.y).toBeGreaterThan(payloadBox?.y ?? 0);
  if (viewportWidth < 896) {
    await expect(
      switchyard.locator("[data-wagon-switchyard-rail]"),
    ).toBeVisible();
  } else {
    await expect(hero.locator(".home-hero__media img")).toHaveCSS(
      "object-position",
      "100% 50%",
    );
  }
  await expectNoPageOverflow(page);
});

test("@a11y Homepage has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/homepage/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual Homepage visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/homepage/");
  await expect(page).toHaveScreenshot("homepage.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
