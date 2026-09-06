import { expect, type Page } from "@playwright/test";

export async function expectNoPageOverflow(page: Page): Promise<void> {
  const measurements = await page.evaluate(() => ({
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    rootClientWidth: document.documentElement.clientWidth,
    rootScrollWidth: document.documentElement.scrollWidth,
  }));

  expect(
    measurements.rootScrollWidth,
    "document must not scroll horizontally",
  ).toBeLessThanOrEqual(measurements.rootClientWidth);
  expect(
    measurements.bodyScrollWidth,
    "body must not scroll horizontally",
  ).toBeLessThanOrEqual(measurements.bodyClientWidth);
}

/** Forces lazy local images to settle before a full-page evidence assertion. */
export async function waitForPageImages(page: Page): Promise<void> {
  const images = page.locator("img");
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.evaluate((node) => {
      (node as HTMLImageElement).loading = "eager";
    });
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(
      (node) =>
        new Promise<void>((resolve) => {
          const imageNode = node as HTMLImageElement;
          if (imageNode.complete && imageNode.naturalWidth > 0) {
            resolve();
            return;
          }
          imageNode.addEventListener("load", () => resolve(), { once: true });
          imageNode.addEventListener("error", () => resolve(), { once: true });
        }),
    );
  }
}

export function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  return errors;
}
