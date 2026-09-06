import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component ContactCTA renders one dominant action, optional links, and caller-composed context without scripts", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/contact-cta/");

  const sections = page.locator("[data-contact-cta]");
  const primary = sections.first();
  const direct = sections.nth(1);
  const longContent = sections.nth(2);
  await expect(sections).toHaveCount(3);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Discuss a transport requirement with the right context",
  );
  await expect(
    primary.getByRole("link", { name: "Contact TransANT" }),
  ).toHaveAttribute(
    "href",
    "/contact/?source=component-lab&context=Intermodal+%26+container+requirement+%2F+80+ft",
  );
  await expect(primary.locator("[data-contact-cta-context]")).toHaveText(
    /intermodal & container requirement \/ 80 ft/i,
  );
  await expect(primary.getByRole("navigation")).toHaveAttribute(
    "aria-label",
    "Related contact options",
  );
  await expect(primary.getByRole("link")).toHaveCount(3);
  for (const section of await sections.all()) {
    await expect(section).toHaveCSS("background-color", "rgb(234, 241, 248)");
  }
  await expect(
    primary.getByRole("link", { name: "Open fixture contact note" }),
  ).toHaveAttribute("target", "_blank");
  await expect(direct.locator("[data-contact-cta-context]")).toHaveCount(0);
  await expect(direct.getByRole("navigation")).toHaveCount(0);
  await expect(direct.getByRole("link")).toHaveCount(1);
  await expect(longContent.getByRole("link")).toHaveCount(3);
  await expect(primary.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@keyboard ContactCTA keeps primary and supporting links in visible native source order", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-cta/");
  const primaryAction = page.getByRole("link", { name: "Contact TransANT" });
  const firstSupportingLink = page.getByRole("link", {
    name: "Browse wagon families",
  });
  const secondSupportingLink = page.getByRole("link", {
    name: /open fixture contact note/i,
  });

  for (let tabCount = 0; tabCount < 6; tabCount += 1) {
    await page.keyboard.press("Tab");
    if (
      await primaryAction.evaluate(
        (element) => element === document.activeElement,
      )
    ) {
      break;
    }
  }

  await expect(primaryAction).toBeFocused();
  expect((await primaryAction.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );
  expect(
    await primaryAction.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
  await page.keyboard.press("Tab");
  await expect(firstSupportingLink).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(secondSupportingLink).toBeFocused();
  await expect(secondSupportingLink).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
});

test("@responsive ContactCTA centres its conclusion, preserves compact touch rows, and wraps long content", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-cta/");
  const primary = page.locator("[data-contact-cta]").first();
  const longContent = page.locator("[data-contact-cta]").nth(2);
  const copy = primary.locator("[data-contact-cta-copy]");
  const action = primary.getByRole("link", { name: "Contact TransANT" });
  const supporting = primary.locator(".contact-cta__supporting");
  const longContext = longContent.locator("[data-contact-cta-context]");
  const frame = primary.locator(".contact-cta__frame");
  const copyBox = await copy.boundingBox();
  const actionBox = await action.boundingBox();
  const supportingBox = await supporting.boundingBox();

  expect(copyBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  expect(supportingBox).not.toBeNull();
  expect(actionBox?.y).toBeGreaterThan(copyBox?.y ?? 0);
  expect(supportingBox?.y).toBeGreaterThan(actionBox?.y ?? 0);
  const framePadding = await frame.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      blockStart: Number.parseFloat(styles.paddingBlockStart),
      inlineStart: Number.parseFloat(styles.paddingInlineStart),
    };
  });
  expect(framePadding.blockStart).toBeGreaterThanOrEqual(48);
  expect(framePadding.blockStart).toBeLessThanOrEqual(96);
  expect(framePadding.inlineStart).toBeGreaterThanOrEqual(16);
  expect(
    await frame.evaluate((element) => getComputedStyle(element).justifyItems),
  ).toBe("center");
  expect(
    await longContext.evaluate((element) => element.scrollHeight),
  ).toBeGreaterThan(0);
  const supportingColumns = await supporting
    .locator("ul")
    .evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );
  expect([1, 2]).toContain(supportingColumns);
  await expectNoPageOverflow(page);
});

test("@a11y ContactCTA fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-cta/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual ContactCTA fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/contact-cta/");
  await expect(page).toHaveScreenshot("contact-cta.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
