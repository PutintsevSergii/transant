import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
  waitForPageImages,
} from "./support/page-contract";

const pages = [
  {
    slug: "technology",
    title: "Start with the wagon model and its technical data",
  },
  {
    slug: "projects",
    title: "BulkBox for Erzberg–Linz ore transport",
  },
  {
    slug: "company",
    title: "TransANT freight and tank wagon product information",
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

  await page.goto("/fixtures/editorial/technology/");
  await expect(page.locator("[data-page-meta]")).toHaveCount(1);
  await expect(page.locator("[data-technology-page]")).toHaveCount(1);
  await expect(page.locator("[data-technology-feature]")).toHaveCount(1);
  await expect(page.locator("[data-technology-narrative]")).toHaveCount(1);
  await expect(page.locator("[data-technology-chapter]")).toHaveCount(4);
  await expect(page.locator("[data-media-story]")).toHaveCount(5);
  await expect(
    page.getByRole("heading", {
      name: "Check gauge, speed, curve radius, and equipment",
    }),
  ).toBeVisible();
  await expect(
    page.locator("[data-media-story] a[target='_blank']"),
  ).toHaveCount(0);
  await expect(page.locator("main a[href*='transant.com']")).toHaveCount(0);
  await expect(page.locator("main a[href*='railcargo.com']")).toHaveCount(0);
  await expect(page.locator("main a[href*='voestalpine.com']")).toHaveCount(0);
  await expect(
    page.locator("[data-media-story][data-media-story-theme='dark']"),
  ).toHaveCount(1);
  await expect(
    page.locator("[data-media-story][data-media-story-theme='light']"),
  ).toHaveCount(4);
  await expect(page.locator("[data-media-story-media]")).toHaveCount(3);
  await expect(
    page.locator("[data-technology-feature] [data-responsive-media]"),
  ).toHaveAttribute("data-responsive-media-fit", "contain");
  await expect(
    page.locator("[data-technology-index] a[href^='#technology-chapter-']"),
  ).toHaveCount(4);
  const chapterSurfaces = await page
    .locator("[data-technology-chapter] [data-media-story]")
    .evaluateAll((stories) =>
      stories.map((story) => getComputedStyle(story).backgroundColor),
    );
  expect(new Set(chapterSurfaces)).toEqual(new Set(["rgba(0, 0, 0, 0)"]));
  await expect(page.locator("[data-contact-cta]")).toHaveCSS(
    "background-color",
    "rgb(234, 241, 248)",
  );
  const technologyPageContactActions = page.locator('main a[href="/contact/"]');
  await expect(technologyPageContactActions).toHaveCount(1);
  await expect(technologyPageContactActions).toHaveAccessibleName(
    "Discuss wagon requirements",
  );
  const technologyContactCta = page.locator("[data-contact-cta]");
  const primaryContactAction = technologyContactCta.getByRole("link", {
    name: "Discuss wagon requirements",
  });
  const wagonFamiliesAction = technologyContactCta.getByRole("link", {
    name: "Browse wagon families",
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
    "Five wagon families / Ten catalogue models / Model-specific technical data / Linz, Austria",
  );
  await expect(companyMeta).toHaveAttribute("aria-hidden", "true");
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
  expect(companyEvidenceBottomGap).toBeLessThanOrEqual(1);

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
  await page.goto(`${browserBaseUrl}/fixtures/editorial/technology/`);

  const firstChapter = page.locator("[data-technology-index] a").first();
  await firstChapter.focus();
  await expect(firstChapter).toBeFocused();
  await expect(firstChapter).toHaveAttribute("href", "#technology-chapter-1");

  const contact = page
    .getByRole("link", { name: "Discuss wagon requirements" })
    .last();
  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(contact).toHaveAttribute("href", "/contact/");
  expect((await contact.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  await context.close();
});

test("@responsive Editorial pages preserve source order and page containment", async ({
  page,
}) => {
  await page.goto("/fixtures/editorial/technology/");
  const hero = page.locator("[data-page-hero]");
  const firstStory = page.locator("[data-media-story]").first();
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
    if (editorialPage.slug === "technology") {
      await waitForPageImages(page);
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    }
    await expect(page).toHaveScreenshot(`${editorialPage.slug}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
