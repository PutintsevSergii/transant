import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

const primarySelector = "[data-wagon-switchyard]";

test("@component WagonSwitchyard keeps all five direct family routes in server HTML and upgrades its own tabs", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/wagon-switchyard/");

  const primary = page.locator(primarySelector).first();
  const tabs = primary.locator("[data-wagon-switchyard-tab]");
  const panels = primary.locator("[data-wagon-switchyard-panel]");
  await expect(tabs).toHaveCount(5);
  await expect(panels).toHaveCount(5);
  await expect(primary.locator("[data-wagon-switchyard-rail]")).toHaveAttribute(
    "role",
    "tablist",
  );
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(0)).toHaveAttribute("href", "/wagons/intermodal/");
  await expect(tabs.nth(4)).toHaveAttribute("href", "/wagons/tank/");
  await expect(primary.locator("a[href='#']")).toHaveCount(0);
  await expect(primary.locator("img")).toHaveCount(5);
  await expect(primary).toContainText("Choose by transport task");
  await expect(primary).toContainText(
    "Matching wagon families to cargo and loading needs.",
  );
  await expect(primary).not.toContainText("Central switchyard route selector");
  await expect(primary).not.toContainText("Local product render");
  await expect(panels.nth(0)).toContainText("Containers & swap bodies");
  await expect(
    panels.nth(3).locator(".wagon-switchyard__technical-label"),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@no-js WagonSwitchyard leaves the default family and direct linked rail usable", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/wagon-switchyard/`);

  const primary = page.locator(primarySelector).first();
  await expect(
    primary.getByRole("link", { name: /Intermodal/ }).first(),
  ).toBeVisible();
  await expect(
    primary.getByRole("link", { name: "Explore Intermodal" }),
  ).toBeVisible();
  await expect(
    primary.locator("[data-wagon-switchyard-panel]").first(),
  ).toBeVisible();
  await expect(
    primary.locator("[data-wagon-switchyard-rail]"),
  ).not.toHaveAttribute("role", "tablist");
  await expectNoPageOverflow(page);
  await context.close();
});

test("@interaction WagonSwitchyard synchronizes click and complete keyboard selection without cross-instance state", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-switchyard/");
  const primary = page.locator(primarySelector).first();
  const secondary = page.locator(primarySelector).nth(1);
  const primaryTabs = primary.locator("[data-wagon-switchyard-tab]");
  const secondaryTabs = secondary.locator("[data-wagon-switchyard-tab]");

  await primary.evaluate((root) => {
    const received: string[] = [];
    root.addEventListener("wagon-family-change", (event) => {
      received.push((event as CustomEvent<{ id: string }>).detail.id);
    });
    root.dataset.eventIds = JSON.stringify(received);
    root.addEventListener("wagon-family-change", () => {
      root.dataset.eventIds = JSON.stringify(received);
    });
  });

  await primaryTabs.nth(1).click();
  await expect(primary).toHaveAttribute("data-active-family", "flat");
  await expect(primaryTabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(
    primary.locator("[data-wagon-family-id='flat']").last(),
  ).toBeVisible();
  await expect(
    primary.locator("[data-wagon-family-id='intermodal']").last(),
  ).toBeHidden();
  await expect(
    primary.locator("[data-wagon-family-id='flat']").last(),
  ).toContainText("Steel & long cargo");
  if ((page.viewportSize()?.width ?? 0) >= 832) {
    const [selectedBox, nextBox] = await Promise.all([
      primaryTabs.nth(1).boundingBox(),
      primaryTabs.nth(2).boundingBox(),
    ]);
    const connectorColours = await Promise.all(
      [0, 1, 2].map((index) =>
        primaryTabs
          .nth(index)
          .evaluate(
            (element) => getComputedStyle(element, "::after").backgroundColor,
          ),
      ),
    );
    expect(connectorColours[1]).not.toBe(connectorColours[0]);
    expect(connectorColours[1]).not.toBe(connectorColours[2]);
    expect(selectedBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    if (selectedBox && nextBox) {
      const connectorWidth = await primaryTabs
        .nth(1)
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element, "::after").width),
        );
      const tabGap = nextBox.x - (selectedBox.x + selectedBox.width);
      expect(connectorWidth).toBeLessThanOrEqual(tabGap + 1);
      expect(connectorWidth).toBeGreaterThanOrEqual(tabGap - 1);
    }
  }
  expect(
    await primaryTabs
      .nth(1)
      .locator(".wagon-switchyard__stop")
      .evaluate((element) => getComputedStyle(element).animationDuration),
  ).toBe("2.8s");

  await primaryTabs.nth(1).focus();
  await page.keyboard.press("ArrowRight");
  await expect(primary).toHaveAttribute("data-active-family", "timber");
  await page.keyboard.press("End");
  await expect(primary).toHaveAttribute("data-active-family", "tank");
  await page.keyboard.press("Home");
  await expect(primary).toHaveAttribute("data-active-family", "intermodal");
  await page.keyboard.press("ArrowLeft");
  await expect(primary).toHaveAttribute("data-active-family", "tank");
  await expect(primary).toHaveAttribute(
    "data-event-ids",
    /flat.*timber.*tank.*intermodal.*tank/,
  );

  await secondaryTabs.nth(2).click();
  await expect(secondary).toHaveAttribute("data-active-family", "timber");
  await expect(primary).toHaveAttribute("data-active-family", "tank");
});

test("@responsive WagonSwitchyard keeps its visible rail, contained wagon stage, and compact source order", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-switchyard/");
  const primary = page.locator(primarySelector).first();
  const rail = primary.locator("[data-wagon-switchyard-rail]");
  const results = primary.locator("[data-wagon-switchyard-results]");
  const panel = primary.locator("[data-wagon-switchyard-panel]").first();
  const identity = panel.locator(".wagon-switchyard__identity");
  const stage = panel.locator("[data-wagon-switchyard-stage]");
  const detail = panel.locator(".wagon-switchyard__detail");

  await expect(rail.locator("[data-wagon-switchyard-tab]")).toHaveCount(5);
  await expect(stage.locator("img")).toBeVisible();
  await expectNoPageOverflow(page);

  const viewportWidth = page.viewportSize()?.width ?? 0;
  const positions = await Promise.all(
    [identity, stage, detail].map((locator) => locator.boundingBox()),
  );
  const [identityBox, stageBox, detailBox] = positions;
  expect(identityBox).not.toBeNull();
  expect(stageBox).not.toBeNull();
  expect(detailBox).not.toBeNull();
  if (!identityBox || !stageBox || !detailBox) return;

  if (viewportWidth >= 832) {
    const tabs = rail.locator("[data-wagon-switchyard-tab]");
    const firstTab = tabs.nth(0);
    const secondTab = tabs.nth(1);
    const [firstTabBox, secondTabBox, stopBox, sequenceBox] = await Promise.all(
      [
        firstTab.boundingBox(),
        secondTab.boundingBox(),
        firstTab.locator(".wagon-switchyard__stop").boundingBox(),
        firstTab.locator(".wagon-switchyard__sequence").boundingBox(),
      ],
    );
    expect(firstTabBox).not.toBeNull();
    expect(secondTabBox).not.toBeNull();
    expect(stopBox).not.toBeNull();
    expect(sequenceBox).not.toBeNull();
    if (firstTabBox && secondTabBox && stopBox && sequenceBox) {
      const line = await firstTab.evaluate((element) => {
        const style = getComputedStyle(element, "::before");
        return {
          height: Number.parseFloat(style.height),
          top: Number.parseFloat(style.top),
        };
      });
      const lineCenter = firstTabBox.y + line.top + line.height / 2;
      const stopCenter = stopBox.y + stopBox.height / 2;
      const tabGap = secondTabBox.x - (firstTabBox.x + firstTabBox.width);

      expect(Math.abs(stopCenter - lineCenter)).toBeLessThanOrEqual(1);
      expect(sequenceBox.y).toBeGreaterThan(lineCenter);
      expect(tabGap).toBeGreaterThanOrEqual(11);
    }
  }

  if (viewportWidth < 1024) {
    const railBox = await rail.boundingBox();
    const resultsBox = await results.boundingBox();
    expect(railBox).not.toBeNull();
    expect(resultsBox).not.toBeNull();
    if (railBox && resultsBox) expect(railBox.y).toBeLessThan(resultsBox.y);
    expect(identityBox.y).toBeLessThan(stageBox.y);
    expect(stageBox.y).toBeLessThan(detailBox.y);
    expect(stageBox.width).toBeLessThanOrEqual(viewportWidth);
  } else {
    const railBox = await rail.boundingBox();
    const resultsBox = await results.boundingBox();
    expect(railBox).not.toBeNull();
    expect(resultsBox).not.toBeNull();
    if (railBox && resultsBox) expect(resultsBox.y).toBeLessThan(railBox.y);
    expect(stageBox.x).toBeLessThan(identityBox.x);
    if (railBox) {
      const viewportHeight = page.viewportSize()?.height ?? 0;
      const primaryBox = await primary.boundingBox();
      expect(primaryBox).not.toBeNull();
      if (primaryBox) {
        expect(primaryBox.height).toBeLessThanOrEqual(viewportHeight + 1);
      }
      expect(railBox.y + railBox.height).toBeLessThanOrEqual(
        viewportHeight + 1,
      );
    }
  }
  await expectNoPageOverflow(page);
});

test("@a11y WagonSwitchyard has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/wagon-switchyard/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual WagonSwitchyard produces a reduced-motion focused baseline for every family", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/wagon-switchyard/");
  const primary = page.locator(primarySelector).first();
  const tabs = primary.locator("[data-wagon-switchyard-tab]");
  expect(
    Number.parseFloat(
      await tabs
        .first()
        .evaluate((element) => getComputedStyle(element).transitionDuration),
    ),
  ).toBeLessThanOrEqual(0.00001);
  await expect(primary.locator(".wagon-switchyard__stop").first()).toHaveCSS(
    "animation-name",
    "none",
  );

  for (const id of ["intermodal", "flat", "timber", "open-box", "tank"]) {
    await primary.locator(`[data-wagon-family-id='${id}']`).first().click();
    await expect(primary).toHaveAttribute("data-active-family", id);
    await expect(primary).toHaveScreenshot(`wagon-switchyard-${id}.png`, {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  }
});
