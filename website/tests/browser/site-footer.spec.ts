import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component SiteFooter renders semantic groups, approved contact links, and legal navigation", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/site-footer/");

  const footer = page.locator("[data-site-footer]");
  await expect(footer).toHaveCount(1);
  await expect(footer.locator("[data-brand-logo='unlinked']")).toHaveCount(1);
  await expect(footer.locator(".site-footer__company")).toHaveText(
    "Component-lab verified contact (test data) · Part of TAS Group",
  );
  await expect(footer.getByRole("navigation", { name: "Wagons" })).toHaveCount(
    1,
  );
  await expect(
    footer.getByRole("navigation", { name: "Expertise" }),
  ).toHaveCount(1);
  await expect(
    footer.getByRole("navigation", { name: "Legal information" }),
  ).toHaveCount(1);
  await expect(
    footer.getByRole("navigation", { name: "Locale selection" }),
  ).toHaveCount(0);
  await expect(footer.locator("nav ul")).toHaveCount(3);
  await expect(footer.locator("a[href='']")).toHaveCount(0);
  await expect(footer.locator("a:not([href])")).toHaveCount(0);
  await expect(
    footer.getByRole("link", { name: "+1 (202) 555-0148" }),
  ).toHaveAttribute("href", "tel:+12025550148");
  await expect(
    footer.getByRole("link", { name: "footer-contact@example.test" }),
  ).toHaveAttribute("href", "mailto:footer-contact@example.test");
  expect(errors).toEqual([]);
});

test("@responsive SiteFooter preserves content-first compact order, wrapping links, focus, and containment", async ({
  page,
}) => {
  await page.goto("/fixtures/site-footer/");
  const footer = page.locator("[data-site-footer]");
  const sectionKinds = await footer
    .locator("[data-footer-section]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-footer-section")),
    );
  expect(sectionKinds).toEqual([
    "identity",
    "group",
    "group",
    "contact",
    "legal",
  ]);

  const legalLink = footer.getByRole("link", {
    name: "Privacy policy with an intentionally long legal link label",
  });
  await legalLink.focus();
  await expect(legalLink).toBeFocused();
  expect(
    await legalLink.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    ),
  ).toBe("solid");
  expect(
    await legalLink.evaluate((element) => element.clientHeight),
  ).toBeGreaterThanOrEqual(44);

  if ((page.viewportSize()?.width ?? 0) < 480) {
    const sections = footer.locator("[data-footer-section]");
    const first = await sections.nth(0).boundingBox();
    const second = await sections.nth(1).boundingBox();
    const third = await sections.nth(2).boundingBox();
    const fourth = await sections.nth(3).boundingBox();
    const fifth = await sections.nth(4).boundingBox();
    expect(first).not.toBeNull();
    expect(second?.y).toBeGreaterThan(first?.y ?? 0);
    expect(third?.y).toBeGreaterThan(second?.y ?? 0);
    expect(fourth?.y).toBeGreaterThan(third?.y ?? 0);
    expect(fifth?.y).toBeGreaterThan(fourth?.y ?? 0);
  }

  await expectNoPageOverflow(page);
});

test("@a11y SiteFooter has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/site-footer/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual SiteFooter fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/site-footer/");
  await expect(page).toHaveScreenshot("site-footer.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
