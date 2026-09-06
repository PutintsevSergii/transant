import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component OperationalCaseStudy renders local captioned media, approved evidence, and optional routes without placeholders", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/operational-case-study/");

  const cases = page.locator("[data-operational-case-study]");
  const primary = cases.first();
  const zeroFacts = cases.nth(1);
  const oneFact = cases.nth(2);
  await expect(cases).toHaveCount(3);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Erzberg–Linz ore transport",
  );
  await expect(primary.locator("[data-responsive-media] img")).toHaveAttribute(
    "alt",
    /freight train in operation/i,
  );
  await expect(primary.locator("[data-responsive-media] img")).toHaveAttribute(
    "src",
    /_astro\//,
  );
  await expect(primary.locator("figcaption")).toContainText(
    /local reviewed asset inventory/i,
  );
  await expect(primary.locator("[data-operational-case-facts] dt")).toHaveCount(
    2,
  );
  await expect(primary.locator("[data-operational-case-source]")).toHaveCount(
    0,
  );
  await expect(primary.locator("cite")).toHaveCount(0);
  await expect(primary).not.toContainText("Unverified fixture-only value");
  await expect(
    primary.getByRole("link", { name: /fixture project context/i }),
  ).toHaveAttribute(
    "href",
    "/fixtures/operational-case-study/#project-context",
  );
  await expect(
    primary.getByRole("link", { name: /fixture source record/i }),
  ).toHaveAttribute(
    "href",
    "/fixtures/operational-case-study/#approved-document",
  );
  await expect(zeroFacts.locator("[data-operational-case-facts]")).toHaveCount(
    0,
  );
  await expect(
    zeroFacts.locator("[data-operational-case-actions]"),
  ).toHaveCount(0);
  await expect(oneFact.locator("[data-operational-case-facts] dt")).toHaveCount(
    1,
  );
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard OperationalCaseStudy keeps optional native routes focusable", async ({
  page,
}) => {
  await page.goto("/fixtures/operational-case-study/");
  const projectLink = page.getByRole("link", {
    name: /fixture project context/i,
  });
  const sourceLink = page.getByRole("link", { name: /fixture source record/i });

  await projectLink.focus();
  await expect(projectLink).toBeFocused();
  expect((await projectLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await projectLink.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");

  await page.keyboard.press("Tab");
  await expect(sourceLink).toBeFocused();
  expect((await sourceLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
});

test("@responsive OperationalCaseStudy keeps title-first compact source order, separate evidence, and a wide editorial split", async ({
  page,
}) => {
  await page.goto("/fixtures/operational-case-study/");
  const primary = page.locator("[data-operational-case-study]").first();
  const story = primary.locator("[data-operational-case-story]");
  const media = primary.locator("[data-operational-case-media]");
  const support = primary.locator("[data-operational-case-support]");
  const storyBox = await story.boundingBox();
  const mediaBox = await media.boundingBox();
  const supportBox = await support.boundingBox();

  expect(storyBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(supportBox).not.toBeNull();
  expect(
    await primary
      .locator(
        ".operational-case-study__story, .operational-case-study__media, .operational-case-study__support",
      )
      .evaluateAll((elements) => elements.map((element) => element.className)),
  ).toEqual([
    "operational-case-study__story",
    "operational-case-study__media",
    "operational-case-study__support",
  ]);

  const gridColumnCount = await primary
    .locator(".operational-case-study__frame")
    .evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );
  expect([1, 2]).toContain(gridColumnCount);
  if (gridColumnCount === 1) {
    expect(mediaBox?.y).toBeGreaterThan(storyBox?.y ?? 0);
    expect(supportBox?.y).toBeGreaterThan(mediaBox?.y ?? 0);
  } else {
    expect(mediaBox?.x).toBeLessThan(storyBox?.x ?? 0);
    expect(supportBox?.x).toBeGreaterThan(mediaBox?.x ?? 0);
  }
  await expectNoPageOverflow(page);
});

test("@a11y OperationalCaseStudy fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/operational-case-study/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual OperationalCaseStudy fixture visual baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/operational-case-study/");
  await expect(page).toHaveScreenshot("operational-case-study.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
