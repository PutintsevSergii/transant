import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component ModularPlatformSection composes caller-owned introductions, stage counts, and an optional technical route", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/modular-platform-section/");

  const sections = page.locator("[data-modular-platform-section]");
  const primary = sections.first();
  const alternate = sections.nth(1);
  await expect(sections).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "A platform made for clear engineering decisions",
  );
  await expect(alternate.getByRole("heading", { level: 3 })).toHaveText(
    /alternate sequence retains the same semantic rail/i,
  );
  await expect(primary.locator("[data-rail-sequence-item]")).toHaveCount(4);
  await expect(primary.locator("[data-rail-sequence]")).toHaveAttribute(
    "data-rail-sequence-columns",
    "4",
  );
  await expect(primary.locator("[data-rail-sequence]")).not.toHaveAttribute(
    "style",
  );
  await expect(alternate.locator("[data-rail-sequence-item]")).toHaveCount(3);
  await expect(primary.getByRole("list")).toHaveAttribute(
    "aria-label",
    "Modular platform stages",
  );
  await expect(
    primary.getByRole("link", { name: /fixture technical note/i }),
  ).toHaveAttribute(
    "href",
    "/fixtures/modular-platform-section/#technical-note",
  );
  await expect(alternate.locator("[data-action]")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard ModularPlatformSection keeps its optional native technical action reachable with visible focus", async ({
  page,
}) => {
  await page.goto("/fixtures/modular-platform-section/");
  const technicalLink = page.getByRole("link", {
    name: /fixture technical note/i,
  });

  for (let tabCount = 0; tabCount < 6; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (
      await technicalLink.evaluate(
        (element) => element === document.activeElement,
      )
    ) {
      break;
    }
  }

  await expect(technicalLink).toBeFocused();
  expect((await technicalLink.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );
  expect(
    await technicalLink.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
});

test("@responsive ModularPlatformSection preserves source order, compact rail stacking, long-copy growth, and wide equation composition", async ({
  page,
}) => {
  await page.goto("/fixtures/modular-platform-section/");
  const primary = page.locator("[data-modular-platform-section]").first();
  const heading = primary.locator("[data-modular-platform-heading]");
  const sequence = primary.locator("[data-modular-platform-sequence]");
  const list = primary.locator("[data-rail-sequence-list]");
  const items = primary.locator("[data-rail-sequence-item]");
  const firstItem = items.first();
  const secondItem = items.nth(1);
  const headingBox = await heading.boundingBox();
  const sequenceBox = await sequence.boundingBox();
  const firstItemBox = await firstItem.boundingBox();
  const secondItemBox = await secondItem.boundingBox();

  expect(headingBox).not.toBeNull();
  expect(sequenceBox).not.toBeNull();
  expect(firstItemBox).not.toBeNull();
  expect(secondItemBox).not.toBeNull();
  expect(sequenceBox?.y).toBeGreaterThan(headingBox?.y ?? 0);
  expect(
    await primary
      .locator(
        ".modular-platform-section__heading, .modular-platform-section__sequence",
      )
      .evaluateAll((elements) => elements.map((element) => element.className)),
  ).toEqual([
    "modular-platform-section__heading",
    "modular-platform-section__sequence",
  ]);
  expect(
    await page
      .locator("[data-modular-platform-section]")
      .nth(1)
      .locator(".rail-sequence__description")
      .first()
      .evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);

  const columnCount = await list.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );
  expect([1, 4]).toContain(columnCount);
  if (columnCount === 1) {
    expect(columnCount).toBe(1);
    expect(secondItemBox?.y).toBeGreaterThan(firstItemBox?.y ?? 0);
  } else {
    expect(secondItemBox?.x).toBeGreaterThan(firstItemBox?.x ?? 0);
    const titleBoxes = await Promise.all(
      Array.from({ length: 4 }, (_, index) =>
        items.nth(index).locator(".rail-sequence__title").boundingBox(),
      ),
    );
    const titleTopEdges = titleBoxes.map((box) => {
      expect(box).not.toBeNull();
      return box?.y ?? 0;
    });
    expect(
      Math.max(...titleTopEdges) - Math.min(...titleTopEdges),
    ).toBeLessThanOrEqual(1);
    const [columnGap, firstTitleBox, secondTitleBox] = await Promise.all([
      list.evaluate((element) => getComputedStyle(element).columnGap),
      items.first().locator(".rail-sequence__title").boundingBox(),
      items.nth(1).locator(".rail-sequence__title").boundingBox(),
    ]);
    expect(Number.parseFloat(columnGap)).toBeGreaterThanOrEqual(48);
    expect(firstTitleBox).not.toBeNull();
    expect(secondTitleBox).not.toBeNull();
    expect(
      (secondTitleBox?.x ?? 0) -
        ((firstTitleBox?.x ?? 0) + (firstTitleBox?.width ?? 0)),
    ).toBeGreaterThanOrEqual(48);
    await expect(
      primary.locator(".modular-platform-section__sequence"),
    ).toHaveCSS("border-top-width", "0px");
    await expect(firstItem.locator(".rail-sequence__number")).toHaveCSS(
      "border-top-width",
      "0px",
    );
    const [railHeight, railOffset, secondOperator, finalOperator] =
      await Promise.all([
        list.evaluate(
          (element) => getComputedStyle(element, "::before").height,
        ),
        list.evaluate(
          (element) => getComputedStyle(element, "::before").insetBlockStart,
        ),
        secondItem
          .locator(".rail-sequence__number")
          .evaluate((element) => getComputedStyle(element, "::before").content),
        items
          .nth(3)
          .locator(".rail-sequence__number")
          .evaluate((element) => getComputedStyle(element, "::before").content),
      ]);
    expect(railHeight).toBe("2px");
    expect(railOffset).toBe("18.4px");
    expect(secondOperator).toContain("+");
    expect(finalOperator).toContain("=");
    await secondItem.hover();
    const hoveredDot = await secondItem.evaluate((element) => {
      const styles = getComputedStyle(element, "::before");
      return {
        animationName: styles.animationName,
        backgroundColor: styles.backgroundColor,
      };
    });
    expect(hoveredDot.animationName).toContain("modular-platform-dot-radar");
    expect(hoveredDot.backgroundColor).toBe("rgb(179, 22, 47)");
  }
  await expectNoPageOverflow(page);
});

test("@a11y ModularPlatformSection fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/modular-platform-section/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual ModularPlatformSection fixture visual baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/modular-platform-section/");
  await expect(page).toHaveScreenshot("modular-platform-section.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
