import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component MediaStory renders caller-owned orientations, caption, local media, and text-only state", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/media-story/");

  const stories = page.locator("[data-media-story]");
  const textFirst = stories.nth(0);
  const mediaFirst = stories.nth(1);
  const textOnly = stories.nth(2);
  await expect(stories).toHaveCount(3);
  await expect(textFirst.getByRole("heading", { level: 2 })).toHaveText(
    "Engineering narratives can begin with the editorial proposition.",
  );
  await expect(mediaFirst.getByRole("heading", { level: 2 })).toHaveText(
    "Media can lead when it carries the needed narrative context.",
  );
  await expect(textOnly.getByRole("heading", { level: 3 })).toHaveText(
    "A text-only story leaves no empty media stage.",
  );
  await expect(textFirst.locator("figcaption")).toHaveText(
    "Local fixture photography is retained only as a component-lab example.",
  );
  const [caption, captionImage] = await Promise.all([
    textFirst.locator("figcaption").boundingBox(),
    textFirst.locator("[data-media-story-media] img").boundingBox(),
  ]);
  expect(caption).not.toBeNull();
  expect(captionImage).not.toBeNull();
  expect(caption?.y).toBeGreaterThanOrEqual(
    (captionImage?.y ?? 0) + (captionImage?.height ?? 0),
  );
  await expect(textOnly.locator("[data-media-story-media]")).toHaveCount(0);
  await expect(textFirst).toHaveAttribute("data-media-story-theme", "light");
  await expect(mediaFirst).toHaveAttribute("data-media-story-theme", "dark");

  const images = stories.locator("[data-media-story-media] img");
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
    expect(await image.getAttribute("src")).not.toMatch(/^https?:\/\//);
  }
  await expect(stories.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@responsive MediaStory preserves compact source order and creates a contained wide split", async ({
  page,
}) => {
  await page.goto("/fixtures/media-story/");
  const textFirst = page.locator("[data-media-story]").nth(0);
  const mediaFirst = page.locator("[data-media-story]").nth(1);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  const order = async (story: typeof textFirst) =>
    story
      .locator("[data-media-story-content], [data-media-story-media]")
      .evaluateAll((elements) =>
        elements.map((element) =>
          element.hasAttribute("data-media-story-content")
            ? "content"
            : "media",
        ),
      );
  expect(await order(textFirst)).toEqual(["content", "media"]);
  expect(await order(mediaFirst)).toEqual(["media", "content"]);

  const [textContent, textMedia, mediaContent, mediaStage] = await Promise.all([
    textFirst.locator("[data-media-story-content]").boundingBox(),
    textFirst.locator("[data-media-story-media]").boundingBox(),
    mediaFirst.locator("[data-media-story-content]").boundingBox(),
    mediaFirst.locator("[data-media-story-media]").boundingBox(),
  ]);
  expect(textContent).not.toBeNull();
  expect(textMedia).not.toBeNull();
  expect(mediaContent).not.toBeNull();
  expect(mediaStage).not.toBeNull();
  if (viewportWidth < 928) {
    expect(textMedia?.y).toBeGreaterThan(textContent?.y ?? 0);
    expect(mediaContent?.y).toBeGreaterThan(mediaStage?.y ?? 0);
  } else {
    expect(textMedia?.x).toBeGreaterThan(textContent?.x ?? 0);
    expect(mediaContent?.x).toBeGreaterThan(mediaStage?.x ?? 0);
  }

  const action = textFirst.getByRole("link", { name: "Explore technology" });
  await action.focus();
  await expect(action).toBeFocused();
  expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await expectNoPageOverflow(page);
});

test("@a11y MediaStory fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/media-story/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual MediaStory fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/media-story/");
  await expect(page).toHaveScreenshot("media-story.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
