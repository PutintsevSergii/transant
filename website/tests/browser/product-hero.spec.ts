import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component ProductHero renders a source-owned product identity, contained local wagon render, facts, and contextual inquiry route", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/product-hero/");

  const heroes = page.locator("[data-product-hero]");
  const primary = heroes.first();
  const alternate = heroes.nth(1);
  await expect(heroes).toHaveCount(2);
  await expect(primary.getByRole("heading", { level: 1 })).toHaveText(
    "UNO INTERMODAL 60ft",
  );
  await expect(primary.locator("[data-product-hero-family]")).toHaveText(
    "Intermodal wagon",
  );
  await expect(primary.locator("[data-product-hero-code]")).toHaveText(
    "Sgns(s)",
  );
  await expect(primary.locator("[data-product-hero-facts] dt")).toHaveCount(3);
  await expect(primary.locator("[data-product-hero-facts] cite")).toHaveCount(
    0,
  );
  await expect(alternate.locator("[data-product-hero-facts] dt")).toHaveCount(
    1,
  );

  const inquiry = primary.getByRole("link", { name: "Discuss this wagon" });
  await expect(inquiry).toHaveAttribute(
    "href",
    "/contact/?source=product-hero&context=UNO+INTERMODAL+60ft+%E2%80%94+Sgns%28s%29#inquiry",
  );
  await expect(
    alternate.getByRole("link", { name: "Open inquiry route" }),
  ).toHaveAttribute("href", "/contact/#inquiry");

  const image = primary.locator("[data-responsive-media] img");
  await expect(image).toHaveAttribute("loading", "eager");
  await expect(image).toHaveAttribute("fetchpriority", "high");
  await expect(image).toHaveAttribute("alt", /transparent render/i);
  expect(await image.getAttribute("src")).not.toMatch(/^https?:\/\//);
  await expect(primary.locator("script")).toHaveCount(0);

  const sourceOrder = await primary
    .locator(
      ".product-hero__content, .product-hero__media, .product-hero__facts",
    )
    .evaluateAll((elements) => elements.map((element) => element.className));
  expect(sourceOrder).toEqual([
    "product-hero__content",
    "product-hero__media",
    "product-hero__facts",
  ]);
  expect(errors).toEqual([]);
});

test("@responsive ProductHero preserves mobile reading order, transparent-render containment, facts, and inquiry focus", async ({
  page,
}) => {
  await page.goto("/fixtures/product-hero/");
  const hero = page.locator("[data-product-hero]").first();
  const frame = hero.locator(".product-hero__frame");
  const content = hero.locator(".product-hero__content");
  const media = hero.locator(".product-hero__media");
  const facts = hero.locator(".product-hero__facts");
  const image = media.locator("img");
  const action = hero.getByRole("link", { name: "Discuss this wagon" });
  const [frameBox, contentBox, mediaBox, factsBox, imageBox, framePadding] =
    await Promise.all([
      frame.boundingBox(),
      content.boundingBox(),
      media.boundingBox(),
      facts.boundingBox(),
      image.boundingBox(),
      frame.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).paddingInlineStart),
      ),
    ]);

  expect(frameBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(factsBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(
    Math.abs((contentBox?.x ?? 0) - ((frameBox?.x ?? 0) + framePadding)),
  ).toBeLessThanOrEqual(1);
  if ((page.viewportSize()?.width ?? 0) < 960) {
    expect(mediaBox?.y).toBeGreaterThan(contentBox?.y ?? 0);
    expect(factsBox?.y).toBeGreaterThan(mediaBox?.y ?? 0);
  } else {
    expect(mediaBox?.x).toBeGreaterThan(contentBox?.x ?? 0);
    expect(factsBox?.y).toBeGreaterThan(mediaBox?.y ?? 0);
  }
  expect(imageBox?.x).toBeGreaterThanOrEqual(mediaBox?.x ?? 0);
  expect((imageBox?.x ?? 0) + (imageBox?.width ?? 0)).toBeLessThanOrEqual(
    (mediaBox?.x ?? 0) + (mediaBox?.width ?? 0),
  );
  await expect(media).toHaveCSS("border-top-width", "0px");
  await expect(media).toHaveCSS("border-right-width", "0px");
  await expect(media).toHaveCSS("border-bottom-width", "0px");
  await expect(media).toHaveCSS("border-left-width", "0px");
  await expect(image).toHaveCSS("object-position", "100% 50%");
  await action.focus();
  await expect(action).toBeFocused();
  expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await expectNoPageOverflow(page);
});

test("@a11y ProductHero fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/product-hero/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual ProductHero fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/product-hero/");
  await expect(page).toHaveScreenshot("product-hero.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
