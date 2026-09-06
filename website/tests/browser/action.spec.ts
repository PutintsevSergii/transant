import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component Action renders native semantics and keeps its interaction contract", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/action/");

  const primaryLink = page.locator("[data-action='link']").first();
  const externalLink = page.locator("[data-action='external-link']");
  const disabledLink = page.locator("[data-action='disabled-link']");
  const submitButton = page.getByRole("button", {
    name: "Submit enquiry context",
  });
  const disabledButton = page.getByRole("button", {
    name: "Unavailable action",
  });

  await expect(primaryLink).toHaveAttribute("href", "#primary-link-activated");
  await expect(submitButton).toHaveAttribute("type", "submit");
  await expect(externalLink).toHaveAttribute("target", "_blank");
  await expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  await expect(externalLink).toHaveAccessibleName(
    "View approved certificates (opens in new tab)",
  );
  await expect(disabledLink).toHaveAttribute("aria-disabled", "true");
  await expect(disabledLink).not.toHaveAttribute("href");
  await expect(disabledLink.locator("a")).toHaveCount(0);
  await expect(disabledButton).toBeDisabled();

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Component lab" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(primaryLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#primary-link-activated$/);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Read engineering approach" }),
  ).toBeFocused();

  await submitButton.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#button-submitted$/);
  expect(errors).toEqual([]);
});

test("@responsive Action remains touch-sized, focused, hoverable, and contained", async ({
  page,
}) => {
  await page.goto("/fixtures/action/");
  await expectNoPageOverflow(page);

  const controls = page.locator(".action");
  const count = await controls.count();
  for (let index = 0; index < count; index += 1) {
    const box = await controls.nth(index).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  const primaryLink = page.locator("[data-action='link']").first();
  await primaryLink.focus();
  await expect(primaryLink).toBeFocused();
  expect(
    await primaryLink.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");

  const beforeHover = await primaryLink.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await primaryLink.hover();
  await expect(primaryLink).toHaveCSS("background-color", "rgb(220, 28, 59)");
  const afterHover = await primaryLink.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(afterHover).not.toBe(beforeHover);

  await page.emulateMedia({ forcedColors: "active" });
  expect(
    await primaryLink.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    ),
  ).not.toBe("none");
  await expectNoPageOverflow(page);
});

test("@a11y Action fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/action/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual Action fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/action/");
  await expect(page).toHaveScreenshot("action.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
