import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component LoadLimitTable renders source-ordered relational headers, scopes, provenance, and notes", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/load-limit-table/");

  const tables = page.locator("[data-load-limit-table]");
  const primary = tables.first();
  await expect(tables).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Load limits",
  );
  await expect(primary.locator("caption")).toHaveText(
    "Load limit by line class",
  );
  await expect(primary.locator("thead th[scope='col']")).toHaveText([
    "Route class",
    "Load limit (S)",
  ]);
  await expect(primary.locator("tbody th[scope='row']")).toHaveText([
    "A",
    "B",
    "C",
    "D",
  ]);
  await expect(primary.locator("[data-load-limit-payload]")).toHaveText([
    "41.5 t",
    "49.5 t",
    "57.5 t",
    "65.0 t",
  ]);
  await expect(primary.locator("[data-load-limit-note]")).toHaveCount(2);
  await expect(
    primary.getByText(
      "src/content/products/flat/uno-flat-60ft-rens/product.json",
      { exact: true },
    ),
  ).toHaveCount(0);
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard LoadLimitTable keeps its labelled narrow scroller focusable and its table printable", async ({
  page,
}) => {
  await page.goto("/fixtures/load-limit-table/");
  const scroller = page.locator("[data-load-limit-scroll]").first();
  await expect(scroller).toHaveAttribute(
    "aria-label",
    "Scrollable table: Load limit by line class",
  );
  await scroller.focus();
  await expect(scroller).toBeFocused();

  if ((page.viewportSize()?.width ?? 0) < 592) {
    const scrollMetrics = await scroller.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(scrollMetrics.scrollWidth).toBeGreaterThan(
      scrollMetrics.clientWidth,
    );
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => scroller.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
  }

  await page.emulateMedia({ media: "print" });
  await expect(scroller).toHaveCSS("overflow-x", "visible");
});

test("@responsive LoadLimitTable preserves table relationships within a labelled compact scroller", async ({
  page,
}) => {
  await page.goto("/fixtures/load-limit-table/");
  const primary = page.locator("[data-load-limit-table]").first();
  const scroller = primary.locator("[data-load-limit-scroll]");
  const hint = primary.locator("[data-load-limit-scroll-hint]");
  const viewportWidth = page.viewportSize()?.width ?? 0;

  if (viewportWidth < 592) {
    await expect(hint).toBeVisible();
    const metrics = await scroller.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  } else {
    await expect(hint).toBeHidden();
    const metrics = await scroller.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  }

  await expect(
    page.getByText(
      "Source-defined load limit by route class under the documented operating configuration",
    ),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("@a11y LoadLimitTable fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/load-limit-table/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual LoadLimitTable fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/load-limit-table/");
  await expect(page).toHaveScreenshot("load-limit-table.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
