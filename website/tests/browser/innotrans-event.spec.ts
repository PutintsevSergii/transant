import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const officialProfile =
  "https://plus.innotrans.de/company/TransAnt-GmbH--1041453";
const officialPositions = [
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__O5_55",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_50",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_55",
  "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_60",
] as const;

test("@component InnoTransEvent renders one factual invitation and official external action", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/innotrans-event/");

  const event = page.locator("[data-innotrans-event]");
  await expect(event).toHaveCount(1);
  await expect(event.getByRole("heading", { level: 2 })).toHaveText(
    "Meet TransANT in Berlin",
  );
  await expect(event.locator("time")).toHaveAttribute("datetime", "2026-09-22");
  await expect(event.locator("time")).toHaveText("22–25 September 2026");
  await expect(event).toContainText("Messe Berlin · Outdoor Display");
  await expect(event).toContainText("Find TransANT at four positions");
  await expect(event).toContainText("O5/55");
  await expect(event).toContainText("T5/50");
  await expect(event).toContainText("T5/55");
  await expect(event).toContainText("T5/60");
  await expect(event).not.toContainText("1,435 mm standard gauge");

  const action = event.getByRole("link", { name: /Visit us at InnoTrans/u });
  await expect(action).toHaveAttribute("href", officialProfile);
  await expect(action).toHaveAttribute("target", "_blank");
  await expect(action).toHaveAttribute("rel", "noopener noreferrer");
  for (const destination of officialPositions) {
    await expect(event.locator(`a[href='${destination}']`)).toHaveCount(1);
  }
  await expect(event.locator("a")).toHaveCount(5);
  await expect(event).not.toContainText("Arrange a meeting");
  await expect(event.locator(".innotrans-event__background")).toHaveCount(0);
  await expect(event.locator("svg[role='img']")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard InnoTransEvent keeps its official action reachable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/fixtures/innotrans-event/");
  const action = page.getByRole("link", { name: /Visit us at InnoTrans/u });
  await action.focus();
  await expect(action).toBeFocused();
  await context.close();
});

test("@responsive InnoTransEvent stacks compact content and contains its wide split", async ({
  page,
}) => {
  await page.goto("/fixtures/innotrans-event/");

  const event = page.locator("[data-innotrans-event]");
  const content = event.locator(".innotrans-event__content");
  const locations = event.locator(".innotrans-event__locations");
  const [contentBox, locationsBox] = await Promise.all([
    content.boundingBox(),
    locations.boundingBox(),
  ]);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  expect(contentBox).not.toBeNull();
  expect(locationsBox).not.toBeNull();
  if (viewportWidth < 960) {
    expect(locationsBox?.y).toBeGreaterThan(
      (contentBox?.y ?? 0) + (contentBox?.height ?? 0),
    );
  } else {
    expect(locationsBox?.x).toBeGreaterThan(
      (contentBox?.x ?? 0) + (contentBox?.width ?? 0),
    );
  }
  await expect(
    event.getByRole("link", { name: /Visit us at InnoTrans/u }),
  ).toHaveCSS("min-height", "52px");
  await expectNoPageOverflow(page);
});

test("@a11y InnoTransEvent has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/innotrans-event/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual InnoTransEvent visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/innotrans-event/");
  await expect(page).toHaveScreenshot("innotrans-event.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
