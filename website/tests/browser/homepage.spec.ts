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
    "Engineering solutions for European rail freight | TransANT",
  );
  await expect(page.locator("[data-site-header]")).toHaveCount(1);
  await expect(page.locator("[data-site-header]")).toHaveClass(
    /site-header--logo-prominent/,
  );
  await expect(page.locator("a[href*='/sustainability/']")).toHaveCount(0);
  await expect(page.locator("main")).toHaveCount(1);
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta).toHaveCount(1);
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Freight wagon engineering",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Engineering value / Wagon families / Model specifications / Quality and certification / Transport requirements",
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
    "Engineering solutions for European rail freight.",
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
    "data-innotrans-event",
    "data-wagon-switchyard",
    "data-payload-value-section",
    "data-modular-platform-section",
    "data-quality-impact-section",
    "data-contact-cta",
  ]);
  await expect(page.locator("[data-home-hero]")).toHaveCount(1);
  await expect(page.locator("[data-home-hero]")).toContainText(
    "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020.",
  );
  await expect(
    page.locator("[data-home-hero] a[href='/company/']"),
  ).toHaveAccessibleName("About TransAnt");
  await expect(page.locator("[data-home-hero] img")).toHaveAttribute(
    "alt",
    "The TransANT name cut into the red frame of a freight wagon",
  );
  await expect(
    page.locator("[data-home-hero] [data-responsive-media]"),
  ).toHaveAttribute("data-responsive-media-fit", "contain");
  const innoTransEvent = page.locator("[data-innotrans-event]");
  await expect(innoTransEvent).toHaveCount(1);
  await expect(innoTransEvent.getByRole("heading", { level: 2 })).toHaveText(
    "Meet TransANT in Berlin",
  );
  await expect(innoTransEvent.locator("a")).toHaveCount(5);
  await expect(
    innoTransEvent.locator("[data-innotrans-locations]"),
  ).toContainText("O5/55");
  for (const code of ["T5/50", "T5/55", "T5/60"]) {
    await expect(
      innoTransEvent.locator("[data-innotrans-locations]"),
    ).toContainText(code);
  }
  await expect(
    innoTransEvent.locator(
      "a[href='https://plus.innotrans.de/company/TransAnt-GmbH--1041453']",
    ),
  ).toHaveAttribute(
    "href",
    "https://plus.innotrans.de/company/TransAnt-GmbH--1041453",
  );
  await expect(innoTransEvent).not.toContainText("Arrange a meeting");
  await expect(page.locator("[data-payload-value-section]")).toHaveCount(1);
  await expect(
    page.locator("[data-payload-value-section]").getByRole("heading", {
      level: 2,
    }),
  ).toHaveText("Lightweight platform for heavy transport tasks");
  await expect(page.locator("[data-payload-value-section] li")).toHaveCount(3);
  await expect(page.locator("[data-payload-value-section]")).toContainText(
    "approximately 16 tonnes",
  );
  await expect(page.locator("[data-payload-value-section]")).toContainText(
    "alform®",
  );
  await expect(page.locator("main")).not.toContainText(
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
  await expect(page.locator("[data-wagon-switchyard]")).toContainText(
    "Intermodal wagons for flexible transport",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    /lightweight intermodal/iu,
  );
  await expect(page.locator("[data-modular-platform-section]")).toHaveCount(1);
  await expect(page.locator("[data-modular-platform-section]")).toContainText(
    "Work on a wagon starts not with choosing a standard model, but with understanding the real transport task.",
  );
  await expect(page.locator("[data-modular-platform-section]")).toContainText(
    "TransAnt identifies a suitable wagon configuration or develops a solution adapted to the specific operating conditions.",
  );
  await expect(
    page.locator("[data-modular-platform-section]").getByRole("link", {
      name: "View all wagons",
    }),
  ).toHaveAttribute("href", "/wagons/");
  await expect(
    page.locator("[data-modular-platform-section]").getByRole("link", {
      name: "View all wagons",
    }),
  ).toHaveClass(/action--primary/);
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
  const engineeringServicesActions = page.locator(
    "[data-home-hero] a[href='/engineering-services/'], [data-payload-value-section] a[href='/engineering-services/']",
  );
  await expect(engineeringServicesActions).toHaveCount(1);
  await expect(
    page.locator("[data-home-hero]").getByRole("link", {
      name: "Enquire about PRO 60 ft",
    }),
  ).toHaveCount(0);
  await expect(
    page.locator("[data-payload-value-section]").getByRole("link", {
      name: "Enquire about PRO 60 ft",
    }),
  ).toHaveAttribute("href", "/engineering-services/");
  await expect(
    page.locator("[data-payload-value-section]").getByRole("link", {
      name: "Enquire about PRO 60 ft",
    }),
  ).toHaveClass(/action--primary/);
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
  await expect(
    page.getByRole("link", { name: "View all wagons" }),
  ).toHaveAttribute("href", "/wagons/");
  await expect(
    page.getByRole("link", { name: "Enquire about PRO 60 ft" }),
  ).toHaveAttribute("href", "/engineering-services/");
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
  const innoTransEvent = page.locator("[data-innotrans-event]");
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
    innoTransEventBox,
    payloadPropositionBox,
    switchyardBox,
  ] = await Promise.all([
    pageMeta.boundingBox(),
    hero.boundingBox(),
    heroContent.boundingBox(),
    payload.boundingBox(),
    innoTransEvent.boundingBox(),
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
  expect(innoTransEventBox?.y).toBeGreaterThan(heroBox?.y ?? 0);
  expect(switchyardBox?.y).toBeGreaterThan(innoTransEventBox?.y ?? 0);
  expect(payloadBox?.y).toBeGreaterThan(switchyardBox?.y ?? 0);
  if (viewportWidth < 896) {
    await expect(
      switchyard.locator("[data-wagon-switchyard-rail]"),
    ).toBeVisible();
  } else {
    const viewportHeight = page.viewportSize()?.height ?? 0;
    expect(innoTransEventBox).not.toBeNull();
    expect(innoTransEventBox?.y).toBeLessThan(viewportHeight - 5 * 16);
  }
  if (viewportWidth < 480) {
    const [primaryActionBox, secondaryActionBox] = await Promise.all([
      hero.getByRole("link", { name: "Explore wagons" }).boundingBox(),
      hero.getByRole("link", { name: "About TransAnt" }).boundingBox(),
    ]);
    expect(primaryActionBox).not.toBeNull();
    expect(secondaryActionBox).not.toBeNull();
    expect(
      Math.abs(
        (primaryActionBox?.width ?? 0) - (secondaryActionBox?.width ?? 0),
      ),
    ).toBeLessThanOrEqual(1);
  }
  const heroImage = hero.locator(".home-hero__media img");
  await expect(heroImage).toHaveCSS("object-fit", "contain");
  await expect(heroImage).toHaveCSS("object-position", "50% 50%");
  const heroImageBox = await heroImage.boundingBox();
  expect(heroImageBox).not.toBeNull();
  expect((heroImageBox?.width ?? 0) / (heroImageBox?.height ?? 1)).toBeCloseTo(
    3 / 2,
    1,
  );
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
