import { expect, test, type Page } from "@playwright/test";

import {
  pageReviewRoutes,
  type PageReviewRoute,
  visualPageReviewRoutes,
  zoomPageReviewRoutes,
} from "../support/page-review-routes";
import {
  expectNoPageOverflow,
  waitForPageImages,
} from "./support/page-contract";

async function expectPageContract(
  page: Page,
  { fixtureRoute: route, technicalTable }: PageReviewRoute,
): Promise<void> {
  const response = await page.goto(route);
  expect(response?.ok(), `${route} must render successfully`).toBe(true);
  await expect(page.locator("main")).toHaveCount(1);
  await expectNoPageOverflow(page);

  const duplicateIds = await page.locator("[id]").evaluateAll((nodes) => {
    const ids = nodes.map((node) => node.id).filter(Boolean);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds, `${route} must not repeat document IDs`).toEqual([]);

  await waitForPageImages(page);
  const images = page.locator("img");

  const brokenMedia = await images.evaluateAll((images) =>
    images
      .map((node) => node as HTMLImageElement)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.getAttribute("src")),
  );
  expect(brokenMedia, `${route} must not contain broken local media`).toEqual(
    [],
  );

  if (technicalTable) {
    await expect(page.locator("[data-load-limit-scroll]")).toHaveCount(1);
  }
}

test("@responsive Every release route remains contained at every configured viewport", async ({
  page,
}) => {
  for (const route of pageReviewRoutes) {
    await expectPageContract(page, route);
  }
});

test("@responsive Compact exploratory widths retain page containment", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-320",
    "The exploratory widths need one deterministic browser project.",
  );

  for (const width of [360, 430]) {
    await page.setViewportSize({ width, height: 844 });
    for (const { fixtureRoute } of pageReviewRoutes) {
      const response = await page.goto(fixtureRoute);
      expect(response?.ok(), `${fixtureRoute} at ${width}px`).toBe(true);
      await expectNoPageOverflow(page);
    }
  }
});

test("@responsive Representative pages reflow at 200% text zoom", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-1440",
    "Text zoom is reviewed once at the desktop reference width.",
  );

  for (const { fixtureRoute } of zoomPageReviewRoutes) {
    await page.goto(fixtureRoute);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    await expectNoPageOverflow(page);
  }
});

for (const { id, fixtureRoute } of visualPageReviewRoutes) {
  test(`@visual I-002 ${id} full-page review`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(fixtureRoute);
    await waitForPageImages(page);
    if (id === "editorial-pro-platforms") {
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    }
    await expect(page).toHaveScreenshot(`i-002-${id}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
