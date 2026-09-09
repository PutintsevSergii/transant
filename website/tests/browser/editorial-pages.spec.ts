import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
  waitForPageImages,
} from "./support/page-contract";

const pages = [
  {
    slug: "pro-platform-projects",
    title: "Lightweight platform for heavy transport tasks",
  },
  {
    slug: "projects",
    title: "BulkBox for Erzberg–Linz ore transport",
  },
  {
    slug: "company",
    title: "Engineering solutions for European rail freight",
  },
  {
    slug: "quality",
    title: "Quality standards and certificates",
  },
] as const;

const fixtureRoute = (page: (typeof pages)[number]): string =>
  `/fixtures/editorial/${page.slug}/`;
const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

test("@component Editorial pages compose only source-bound page sections", async ({
  page,
}) => {
  for (const editorialPage of pages) {
    const errors = collectBrowserErrors(page);
    await page.goto(fixtureRoute(editorialPage));

    await expect(page).toHaveTitle(new RegExp("TransANT$"));
    await expect(page.locator("[data-site-header]")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("[data-site-footer]")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      editorialPage.title,
    );
    await expect(page.locator("[data-page-hero]")).toHaveCount(1);
    await expect(page.locator("[data-contact-cta]")).toHaveCount(1);
    expect(errors).toEqual([]);
  }

  await page.goto("/fixtures/editorial/projects/");
  await expect(page.locator("[data-operational-case-study]")).toHaveCount(1);
  await expect(page.locator("[data-evidence-list]")).toHaveCount(0);

  await page.goto("/fixtures/editorial/pro-platform-projects/");
  const proMeta = page.locator("[data-page-meta]");
  await expect(proMeta).toHaveCount(1);
  await expect(proMeta.locator("[data-page-meta-label]")).toHaveText(
    "PRO INTERMODAL 60 ft",
  );
  await expect(proMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Approx. 16 t base-platform tare / Up to 4 t additional payload potential / Up to 73.5 t payload on class D lines / 24 foldable container pins",
  );
  await expect(page.locator("[data-media-story]")).toHaveCount(7);
  const proTechnicalNavigation = page.locator(
    "[data-technical-details-navigation]",
  );
  await expect(proTechnicalNavigation).toHaveCount(1);
  const proTechnicalAction = proTechnicalNavigation.getByRole("link", {
    name: "Drawings & technical data",
  });
  await expect(proTechnicalAction).toHaveAttribute(
    "href",
    "#technical-details",
  );
  await expect(proTechnicalAction).toHaveCSS("min-height", "44px");
  await expect(
    page.getByRole("heading", {
      name: "Approximately 16 tonnes of base-platform tare",
    }),
  ).toBeVisible();
  await expect(page.locator("[data-specification-group]")).toContainText(
    "19,740 mm with A-buffers / 19,830 mm with L-buffers",
  );
  await expect(page.locator("#technical-details")).toHaveAttribute(
    "data-specification-group",
    "",
  );
  await expect(page.locator("[data-load-limit-table]")).toContainText("73.5");
  await expect(
    page.locator("[data-media-story] a[target='_blank']"),
  ).toHaveCount(0);
  await expect(page.locator("main a[href*='transant.com']")).toHaveCount(0);
  await expect(page.locator("main a[href*='railcargo.com']")).toHaveCount(0);
  await expect(page.locator("main a[href*='voestalpine.com']")).toHaveCount(0);
  await expect(
    page.locator("[data-media-story][data-media-story-theme='dark']"),
  ).toHaveCount(4);
  await expect(
    page.locator("[data-media-story][data-media-story-theme='light']"),
  ).toHaveCount(3);
  await expect(page.locator("[data-media-story-media]")).toHaveCount(3);
  const specialisedEquipmentStory = page.locator(
    "[data-media-story]:has(img[src*='specialised-equipment'])",
  );
  await expect(specialisedEquipmentStory).toHaveCount(1);
  await expect(specialisedEquipmentStory).toContainText(
    "Specialised equipment",
  );
  await expect(
    specialisedEquipmentStory.locator("img[src*='specialised-equipment']"),
  ).toHaveCount(1);
  await expect(specialisedEquipmentStory.locator("img")).toHaveAttribute(
    "alt",
    "Three-quarter development rendering of the 70-foot TimberTop wagon for RCA",
  );
  await expect(
    specialisedEquipmentStory.locator("[data-responsive-media]"),
  ).toHaveAttribute("data-responsive-media-fit", "contain");
  await expect(
    page.locator("[data-page-hero] img[src*='pro-intermodal-60ft-real']"),
  ).toHaveCount(1);
  await expect(page.locator("[data-page-hero] img")).toHaveAttribute(
    "alt",
    "Actual TransAnt PRO 60-foot Sgns platform wagon on track",
  );
  await expect(page.locator("[data-page-hero]")).toHaveAttribute(
    "data-page-hero-natural-media",
    "true",
  );
  const structureStory = page.locator(
    "[data-media-story]:has(img[src*='pro-intermodal-60ft-underframe'])",
  );
  await expect(structureStory).toHaveCount(1);
  await expect(structureStory).toContainText(
    "High-strength lightweight structure",
  );
  await expect(structureStory.locator("img")).toHaveAttribute(
    "alt",
    "Underframe structure of TransAnt PRO 60-foot Sgns platform wagon",
  );
  await expect(page.locator("[data-contact-cta]")).toHaveCSS(
    "background-color",
    "rgb(234, 241, 248)",
  );
  const proPageContactActions = page.locator('main a[href="/contact/"]');
  await expect(proPageContactActions).toHaveCount(1);
  await expect(proPageContactActions).toHaveAccessibleName(
    "Enquire about PRO 60 ft",
  );
  const proContactCta = page.locator("[data-contact-cta]");
  const primaryContactAction = proContactCta.getByRole("link", {
    name: "Enquire about PRO 60 ft",
  });
  const wagonFamiliesAction = proContactCta.getByRole("link", {
    name: "View wagons",
  });
  await expect(wagonFamiliesAction).toHaveCSS(
    "border-top-color",
    "rgb(179, 22, 47)",
  );
  await expect(wagonFamiliesAction).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const [primaryContactBox, wagonFamiliesBox] = await Promise.all([
    primaryContactAction.boundingBox(),
    wagonFamiliesAction.boundingBox(),
  ]);
  expect(wagonFamiliesBox?.width).toBeCloseTo(primaryContactBox?.width ?? 0, 0);
  expect(
    (wagonFamiliesBox?.x ?? 0) + (wagonFamiliesBox?.width ?? 0) / 2,
  ).toBeCloseTo(
    (primaryContactBox?.x ?? 0) + (primaryContactBox?.width ?? 0) / 2,
    0,
  );

  await page.goto("/fixtures/editorial/company/");
  const companyMeta = page.locator("[data-page-meta]");
  await expect(companyMeta).toHaveCount(1);
  await expect(companyMeta.locator("[data-page-meta-label]")).toHaveText(
    "TransAnt GmbH",
  );
  await expect(companyMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Founded in Linz in 2020 / Austrian TAS Group company / European standard-gauge network / One coordinated project team",
  );
  await expect(companyMeta).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("[data-page-hero]")).toContainText(
    "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020.",
  );
  await expect(page.locator("[data-media-story]")).toHaveCount(8);
  await expect(
    page.getByRole("heading", {
      name: "The transport task defines the wagon configuration",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Quality begins before manufacturing" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Quality & Certificates" }),
  ).toHaveAttribute("href", "/quality/");
  await expect(
    page.getByRole("link", { name: "View wagons" }).first(),
  ).toHaveAttribute("href", "/wagons/");
  await expect(page.locator("[data-media-story-media] img")).toHaveCount(4);
  await expect(page.locator("img[src*='company-wagon-logo']")).toHaveCount(1);
  await expect(page.locator("[data-page-hero]")).toHaveAttribute(
    "data-page-hero-natural-media",
    "true",
  );
  await expect(
    page.locator("[data-page-hero] [data-responsive-media]"),
  ).toHaveAttribute("data-responsive-media-fit", "cover");
  const companyHeroMedia = await page
    .locator("[data-page-hero-media]")
    .boundingBox();
  expect(companyHeroMedia).not.toBeNull();
  expect(
    (companyHeroMedia?.width ?? 0) / (companyHeroMedia?.height ?? 1),
  ).toBeCloseTo(1.5, 1);
  await expect(page.locator("img[src*='company-wagon-coupling']")).toHaveCount(
    1,
  );
  await expect(
    page.locator("img[src*='company-engineering-team']"),
  ).toHaveCount(1);
  await expect(page.locator("img[src*='company-pro-platform']")).toHaveCount(1);
  await expect(page.locator("img[src*='company-uno-intermodal']")).toHaveCount(
    1,
  );
  const companyEvidence = page.locator("[data-evidence-list]");
  await expect(companyEvidence).toHaveAttribute(
    "data-evidence-list-spacing",
    "compact",
  );
  const [companyEvidenceBox, companyEvidenceHeading, companyEvidenceEntries] =
    await Promise.all([
      companyEvidence.boundingBox(),
      companyEvidence.locator(".evidence-list__heading").boundingBox(),
      companyEvidence.locator("[data-evidence-list-entries]").boundingBox(),
    ]);
  const companyEvidenceGap =
    (companyEvidenceEntries?.y ?? 0) -
    ((companyEvidenceHeading?.y ?? 0) + (companyEvidenceHeading?.height ?? 0));
  expect(companyEvidenceGap).toBeGreaterThanOrEqual(16);
  expect(companyEvidenceGap).toBeLessThanOrEqual(32);
  const companyEvidenceBottomGap =
    (companyEvidenceBox?.y ?? 0) +
    (companyEvidenceBox?.height ?? 0) -
    ((companyEvidenceEntries?.y ?? 0) + (companyEvidenceEntries?.height ?? 0));
  expect(companyEvidenceBottomGap).toBeGreaterThanOrEqual(48);
  expect(companyEvidenceBottomGap).toBeLessThanOrEqual(49);

  await page.goto("/fixtures/editorial/quality/");
  await expect(page.locator("[data-evidence-list-entry]")).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Open ISO 9001 certificate" }),
  ).toHaveAttribute("href", /^https:\/\//);
  await expect(page.locator("a[href*='/sustainability/']")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(/greentec|alform/iu);
});

test("@keyboard Editorial pages retain direct contact navigation without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    `${browserBaseUrl}/fixtures/editorial/pro-platform-projects/`,
  );

  const contact = page
    .getByRole("link", { name: "Enquire about PRO 60 ft" })
    .last();
  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(contact).toHaveAttribute("href", "/contact/");
  expect((await contact.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  const technicalAction = page.getByRole("link", {
    name: "Drawings & technical data",
  });
  await technicalAction.focus();
  await expect(technicalAction).toBeFocused();
  await expect(technicalAction).toHaveAttribute("href", "#technical-details");
  expect((await technicalAction.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );

  await context.close();
});

test("@responsive Editorial pages preserve source order and page containment", async ({
  page,
}) => {
  await page.goto("/fixtures/editorial/pro-platform-projects/");
  const hero = page.locator("[data-page-hero]");
  await expect(hero.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-top",
    "12px",
  );
  await expect(hero.locator("[data-page-hero-frame]")).toHaveCSS(
    "padding-bottom",
    "12px",
  );
  const firstStory = page.locator("[data-media-story]").first();
  const imageFreeStoryPadding = await firstStory
    .locator("[data-media-story-frame]")
    .evaluate((frame) => {
      const style = getComputedStyle(frame);
      return {
        bottom: Number.parseFloat(style.paddingBottom),
        top: Number.parseFloat(style.paddingTop),
      };
    });
  expect(imageFreeStoryPadding.top).toBeGreaterThanOrEqual(48);
  expect(imageFreeStoryPadding.bottom).toBeGreaterThanOrEqual(48);
  expect(imageFreeStoryPadding.top).toBe(imageFreeStoryPadding.bottom);
  const pageHeroTypography = async () =>
    page.locator("[data-page-hero] [data-section-intro]").evaluate((intro) => {
      const title = intro.querySelector(".section-intro__title");
      if (!(title instanceof HTMLElement)) {
        throw new Error("Expected PageHero to contain a SectionIntro title.");
      }

      const titleStyle = getComputedStyle(title);
      const introStyle = getComputedStyle(intro);
      return {
        fontFamily: titleStyle.fontFamily,
        fontSize: titleStyle.fontSize,
        letterSpacing: titleStyle.letterSpacing,
        lineHeight: titleStyle.lineHeight,
        measure: introStyle.maxInlineSize,
      };
    });
  const proHeroTypography = await pageHeroTypography();
  const pageHeroLayout = async () =>
    page.locator("[data-page-hero-frame]").evaluate((frame) => {
      const style = getComputedStyle(frame);
      return {
        alignItems: style.alignItems,
        columnGap: style.columnGap,
        gridTemplateColumns: style.gridTemplateColumns,
        paddingBottom: style.paddingBottom,
        paddingTop: style.paddingTop,
        rowGap: style.rowGap,
      };
    });
  const proHeroLayout = await pageHeroLayout();

  await page.goto("/fixtures/editorial/company/");
  expect(await pageHeroTypography()).toEqual(proHeroTypography);
  expect(await pageHeroLayout()).toEqual(proHeroLayout);

  await page.goto("/fixtures/editorial/pro-platform-projects/");
  const contact = page.locator("[data-contact-cta]");
  const [heroBox, firstStoryBox, contactBox] = await Promise.all([
    hero.boundingBox(),
    firstStory.boundingBox(),
    contact.boundingBox(),
  ]);

  expect(firstStoryBox?.y).toBeGreaterThan(heroBox?.y ?? 0);
  expect(contactBox?.y).toBeGreaterThan(firstStoryBox?.y ?? 0);
  await expectNoPageOverflow(page);
});

test("@a11y Editorial pages have no serious or critical axe violations", async ({
  page,
}) => {
  for (const editorialPage of pages) {
    await page.goto(fixtureRoute(editorialPage));
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

for (const editorialPage of pages) {
  test(`@visual ${editorialPage.slug} editorial page baseline`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(fixtureRoute(editorialPage));
    await waitForPageImages(page);
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page).toHaveScreenshot(`${editorialPage.slug}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
