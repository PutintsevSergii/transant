import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component BrandLogo renders the approved asset with linked and unlinked semantics", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);

  await page.goto("/fixtures/brand-logo/");

  const linkedLogo = page.locator("[data-brand-logo='linked']");
  const linkedImage = linkedLogo.getByRole("img", { name: "TransANT" });
  const unlinkedLogo = page.locator("[data-brand-logo='unlinked']");
  const unlinkedImage = unlinkedLogo.getByRole("img", { name: "TransANT" });

  await expect(linkedLogo).toHaveAttribute("href", "/");
  await expect(linkedImage).toHaveAttribute("src", "/brand/transant-logo.png");
  await expect(linkedImage).toHaveAttribute("width", "520");
  await expect(linkedImage).toHaveAttribute("height", "114");
  await expect(linkedImage).toHaveAttribute("loading", "eager");
  await expect(unlinkedLogo.locator("a")).toHaveCount(0);
  await expect(unlinkedImage).toHaveAttribute("loading", "lazy");
  await expect(page.getByRole("link", { name: "TransANT" })).toHaveCount(1);
  await expect(page.getByRole("img", { name: "TransANT" })).toHaveCount(2);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Component lab" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(linkedLogo).toBeFocused();
  expect(
    await linkedLogo.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    ),
  ).toBe("none");
  expect(
    await linkedLogo.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  expect(errors).toEqual([]);
});

test("@responsive BrandLogo remains contained and unchanged in compact contexts", async ({
  page,
}) => {
  await page.goto("/fixtures/brand-logo/");
  await expectNoPageOverflow(page);

  const images = page.locator("[data-brand-logo] img");
  const count = await images.count();
  for (let index = 0; index < count; index += 1) {
    const box = await images.nth(index).boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.width).toBeLessThanOrEqual(
      (await page.locator("body").boundingBox())?.width ?? 0,
    );
  }

  const styles = await images.first().evaluate((element) => {
    const computed = getComputedStyle(element);
    return { animationName: computed.animationName, filter: computed.filter };
  });
  expect(styles).toEqual({ animationName: "none", filter: "none" });
});

test("@a11y BrandLogo fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/brand-logo/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual BrandLogo fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/brand-logo/");

  await expect(page).toHaveScreenshot("brand-logo.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
