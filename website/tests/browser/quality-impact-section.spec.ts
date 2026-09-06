import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component QualityImpactSection renders one, two, and three approved source-aware topics with explicit evidence meanings", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/quality-impact-section/");

  const sections = page.locator("[data-quality-impact-section]");
  const primary = sections.first();
  const single = sections.nth(1);
  const triple = sections.nth(2);
  await expect(sections).toHaveCount(3);
  await expect(primary.locator("[data-quality-impact-topic]")).toHaveCount(2);
  await expect(primary.locator("[data-quality-impact-topics]")).toHaveAttribute(
    "data-topic-columns",
    "2",
  );
  await expect(
    primary.locator("[data-quality-impact-topics]"),
  ).not.toHaveAttribute("style");
  await expect(single.locator("[data-quality-impact-topic]")).toHaveCount(1);
  await expect(triple.locator("[data-quality-impact-topic]")).toHaveCount(3);
  await expect(
    primary.locator("[data-quality-impact-certificate]"),
  ).toHaveCount(1);
  await expect(primary.getByText("FIX-9001-2026")).toBeVisible();
  await expect(
    primary.getByRole("link", { name: "Read fixture certificate record" }),
  ).toHaveCount(1);
  await expect(
    primary.getByRole("link", { name: "Open fixture policy register" }),
  ).toHaveCount(1);
  await expect(
    primary.locator('[data-statement-type="certification"]'),
  ).toHaveCount(1);
  await expect(triple.locator('[data-statement-type="policy"]')).toHaveCount(1);
  await expect(
    triple.locator('[data-statement-type="capability"]'),
  ).toHaveCount(1);
  await expect(triple.locator('[data-statement-type="target"]')).toHaveCount(1);
  await expect(single.getByText("Unverified fixture statement")).toHaveCount(0);
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard QualityImpactSection keeps source evidence in native focus order with touch-sized actions", async ({
  page,
}) => {
  await page.goto("/fixtures/quality-impact-section/");
  const fileLink = page.getByRole("link", {
    name: "Read fixture certificate record",
  });
  const externalLink = page.getByRole("link", {
    name: "Open fixture policy register",
  });

  for (let tabCount = 0; tabCount < 6; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (
      await fileLink.evaluate((element) => element === document.activeElement)
    ) {
      break;
    }
  }

  await expect(fileLink).toBeFocused();
  expect((await fileLink.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect(
    await fileLink.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(externalLink).toBeFocused();
  await expect(externalLink).toHaveAttribute("target", "_blank");
  await expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("@responsive QualityImpactSection preserves compact reading order, source wrapping, and quiet wide editorial columns", async ({
  page,
}) => {
  await page.goto("/fixtures/quality-impact-section/");
  const primary = page.locator("[data-quality-impact-section]").first();
  const heading = primary.locator("[data-quality-impact-heading]");
  const topics = primary.locator("[data-quality-impact-topics]");
  const firstTopic = primary.locator("[data-quality-impact-topic]").first();
  const secondTopic = primary.locator("[data-quality-impact-topic]").nth(1);
  const firstEvidence = firstTopic.locator(".quality-impact-section__evidence");
  const secondEvidence = secondTopic.locator(
    ".quality-impact-section__evidence",
  );
  const firstSummary = firstTopic.locator(".quality-impact-section__summary");
  const secondSummary = secondTopic.locator(".quality-impact-section__summary");
  const headingBox = await heading.boundingBox();
  const topicsBox = await topics.boundingBox();
  const firstTopicBox = await firstTopic.boundingBox();
  const secondTopicBox = await secondTopic.boundingBox();
  const firstEvidenceBox = await firstEvidence.boundingBox();
  const secondEvidenceBox = await secondEvidence.boundingBox();
  const firstSummaryBox = await firstSummary.boundingBox();
  const secondSummaryBox = await secondSummary.boundingBox();

  expect(headingBox).not.toBeNull();
  expect(topicsBox).not.toBeNull();
  expect(firstTopicBox).not.toBeNull();
  expect(secondTopicBox).not.toBeNull();
  expect(firstEvidenceBox).not.toBeNull();
  expect(secondEvidenceBox).not.toBeNull();
  expect(firstSummaryBox).not.toBeNull();
  expect(secondSummaryBox).not.toBeNull();
  expect(
    await primary
      .locator(
        ".quality-impact-section__heading, .quality-impact-section__topics",
      )
      .evaluateAll((elements) => elements.map((element) => element.className)),
  ).toEqual([
    "quality-impact-section__heading",
    "quality-impact-section__topics",
  ]);

  const frameColumnCount = await primary
    .locator(".quality-impact-section__frame")
    .evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );
  const topicColumnCount = await topics.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );
  expect([1, 2]).toContain(frameColumnCount);
  expect([1, 2]).toContain(topicColumnCount);
  if (frameColumnCount === 1) {
    expect(topicsBox?.y).toBeGreaterThan(headingBox?.y ?? 0);
  } else {
    await page.evaluate(
      (top) => window.scrollTo({ top }),
      (headingBox?.y ?? 0) + 64,
    );
    expect((await heading.boundingBox())?.y).toBeCloseTo(96, 0);
  }
  if (topicColumnCount === 1) {
    expect(secondTopicBox?.y).toBeGreaterThan(firstTopicBox?.y ?? 0);
  } else {
    expect(secondTopicBox?.x).toBeGreaterThan(firstTopicBox?.x ?? 0);
    expect(secondTopicBox?.height).toBeCloseTo(firstTopicBox?.height ?? 0, 1);
    expect(secondEvidenceBox?.y).toBeCloseTo(firstEvidenceBox?.y ?? 0, 1);
    expect(firstSummaryBox?.height).toBeGreaterThanOrEqual(76);
    expect(secondSummaryBox?.height).toBeGreaterThanOrEqual(76);
  }
  const framePadding = await primary
    .locator(".quality-impact-section__frame")
    .evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        start: Number.parseFloat(styles.paddingBlockStart),
        end: Number.parseFloat(styles.paddingBlockEnd),
      };
    });
  expect(framePadding.start).toBeGreaterThanOrEqual(64);
  expect(framePadding.start).toBe(framePadding.end);
  expect(
    await primary
      .locator(".quality-impact-section__certificate")
      .evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);
  await expectNoPageOverflow(page);
});

test("@a11y QualityImpactSection fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/quality-impact-section/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual QualityImpactSection fixture visual baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/quality-impact-section/");
  await expect(page).toHaveScreenshot("quality-impact-section.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
