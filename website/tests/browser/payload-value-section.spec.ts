import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component PayloadValueSection composes caller-owned introduction, visual slots, and principle variants", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/payload-value-section/");

  const sections = page.locator("[data-payload-value-section]");
  const primary = sections.first();
  const alternate = sections.nth(1);
  await expect(sections).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Engineered for more useful payload",
  );
  await expect(alternate.locator(".section-intro__title")).toHaveText(
    /visual slot can hold local editorial media/i,
  );
  await expect(primary.locator("[data-payload-value-visual] svg")).toHaveCount(
    1,
  );
  await expect(
    alternate.locator("[data-payload-value-visual] img"),
  ).toHaveAttribute("alt", "Close view of an intermodal wagon bogie");
  await expect(
    primary.locator("[data-payload-value-principles] > li"),
  ).toHaveCount(3);
  await expect(
    alternate.locator("[data-payload-value-principles] > li"),
  ).toHaveCount(4);
  await expect(
    primary.getByRole("link", { name: /engineering source note/i }),
  ).toHaveCount(1);
  await expect(
    alternate.getByRole("link", { name: /engineering source note/i }),
  ).toHaveCount(0);
  await expect(
    primary.getByRole("link", { name: /engineering source note/i }),
  ).toHaveClass(/action--text/);
  expect(errors).toEqual([]);
});

test("@keyboard PayloadValueSection keeps its optional source link reachable with visible focus", async ({
  page,
}) => {
  await page.goto("/fixtures/payload-value-section/");
  const sourceLink = page.getByRole("link", {
    name: /engineering source note/i,
  });

  for (let tabCount = 0; tabCount < 8; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (
      await sourceLink.evaluate((element) => element === document.activeElement)
    ) {
      break;
    }
  }
  await expect(sourceLink).toBeFocused();
  expect((await sourceLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await sourceLink.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
});

test("@responsive PayloadValueSection preserves compact proposition, visual, principle order, and wide principle grid", async ({
  page,
}) => {
  await page.goto("/fixtures/payload-value-section/");
  const section = page.locator("[data-payload-value-section]").first();
  const proposition = section.locator(".payload-value-section__proposition");
  const visual = section.locator(".payload-value-section__visual");
  const principles = section.locator("[data-payload-value-principles]");
  const propositionBox = await proposition.boundingBox();
  const visualBox = await visual.boundingBox();
  const principlesBox = await principles.boundingBox();

  expect(propositionBox).not.toBeNull();
  expect(visualBox).not.toBeNull();
  expect(principlesBox).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) < 896) {
    expect(visualBox?.y).toBeGreaterThan(propositionBox?.y ?? 0);
    expect(principlesBox?.y).toBeGreaterThan(visualBox?.y ?? 0);
  } else {
    expect(visualBox?.x).toBeGreaterThan(propositionBox?.x ?? 0);
    expect(
      await principles.evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(" ").length,
      ),
    ).toBe(3);
  }
  const sourceOrder = await section
    .locator(
      ".payload-value-section__upper, .payload-value-section__principles",
    )
    .evaluateAll((elements) => elements.map((element) => element.className));
  expect(sourceOrder).toEqual([
    "payload-value-section__upper",
    "payload-value-section__principles",
  ]);
  await expectNoPageOverflow(page);
});

test("@a11y PayloadValueSection fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/payload-value-section/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual PayloadValueSection fixture visual baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/payload-value-section/");
  await expect(page).toHaveScreenshot("payload-value-section.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
