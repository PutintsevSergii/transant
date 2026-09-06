import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/wagons/",
  "/wagons/open-box/uno-multi-56ft-eanos/",
  "/contact/",
];

test("@performance I-004 keeps representative compact routes local, dimensioned, and motion-bounded", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();

    const evidence = await page.locator("img").evaluateAll((images) => ({
      images: (images as HTMLImageElement[]).map((image) => ({
        complete: image.complete,
        currentSrc: image.currentSrc,
        height: image.getAttribute("height"),
        naturalWidth: image.naturalWidth,
        width: image.getAttribute("width"),
      })),
      animations: document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length,
      scripts: [...document.scripts]
        .map((script) => script.src)
        .filter(Boolean),
    }));

    if (evidence.images.length > 0) {
      expect(evidence.images).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            complete: true,
            height: expect.any(String),
            width: expect.any(String),
          }),
        ]),
      );
      expect(
        evidence.images.every((image) =>
          image.currentSrc.startsWith(location.origin),
        ),
      ).toBe(true);
      expect(evidence.images.every((image) => image.naturalWidth > 0)).toBe(
        true,
      );
    }
    expect(
      evidence.scripts.every((script) => script.startsWith(location.origin)),
    ).toBe(true);
    expect(evidence.animations).toBe(0);
  }
});
