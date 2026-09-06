import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component DownloadList renders approved real-file metadata and omits withheld placeholder entries", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/download-list/");

  const sections = page.locator("[data-download-list]");
  const primary = sections.first();
  const single = sections.nth(1);
  const withheld = sections.nth(2);
  await expect(sections).toHaveCount(3);
  await expect(primary.getByRole("heading", { level: 2 })).toHaveText(
    "Available source files",
  );
  await expect(primary.locator("[data-download-list-entry]")).toHaveCount(2);
  await expect(
    primary.getByText("Unverified file must remain absent"),
  ).toHaveCount(0);
  await expect(primary.locator("dt")).toHaveText([
    "File type",
    "Language",
    "Revision",
    "File size",
    "File type",
    "Language",
    "Revision",
    "File size",
  ]);
  await expect(primary.locator("dd")).toHaveText([
    "TXT",
    "English",
    "2026-09-04",
    "32 B",
    "TXT",
    "English",
    "2026-09-04",
    "37 B",
  ]);
  await expect(primary.getByRole("link", { name: "Download TXT" })).toHaveCount(
    2,
  );
  await expect(single.locator("dt")).toHaveText(["File type", "Language"]);
  await expect(single.locator("dd")).toHaveText(["TXT", "English"]);
  await expect(withheld.locator("[data-download-list-entries]")).toHaveCount(0);
  await expect(withheld.locator("[data-download-list-empty]")).toHaveText(
    "Contact TransANT for product documents.",
  );
  await expect(primary.locator("script")).toHaveCount(0);

  const response = await page.request.get(
    "/fixtures/download-list/fixture-document.txt",
  );
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  await expect(response.text()).resolves.toBe(
    "Component-lab download fixture.\n",
  );

  const recordResponse = await page.request.get(
    "/fixtures/download-list/fixture-record.txt",
  );
  expect(recordResponse.status()).toBe(200);
  await expect(recordResponse.text()).resolves.toBe(
    "Component-lab source record fixture.\n",
  );

  const sourceOrder = await primary
    .locator(":scope > .download-list__frame > *")
    .evaluateAll((elements) => elements.map((element) => element.className));
  expect(sourceOrder).toEqual([
    "download-list__heading",
    "download-list__entries",
  ]);
  expect(errors).toEqual([]);
});

test("@keyboard DownloadList keeps each native download action in visible source order", async ({
  page,
}) => {
  await page.goto("/fixtures/download-list/");
  const primary = page.locator("[data-download-list]").first();
  const actions = primary.getByRole("link", { name: "Download TXT" });
  await expect(actions).toHaveCount(2);
  await actions.first().focus();
  await expect(actions.first()).toBeFocused();
  await expect(actions.first()).toHaveCSS("min-height", "44px");
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
});

test("@responsive DownloadList stacks metadata with its action on compact screens and creates contained wide rows", async ({
  page,
}) => {
  await page.goto("/fixtures/download-list/");
  const primary = page.locator("[data-download-list]").first();
  const entry = primary.locator("[data-download-list-entry]").first();
  const heading = entry.getByRole("heading", { level: 3 });
  const metadata = entry.locator(".download-list__metadata");
  const action = entry.locator("[data-download-action]");
  const [headingBox, metadataBox, actionBox] = await Promise.all([
    heading.boundingBox(),
    metadata.boundingBox(),
    action.boundingBox(),
  ]);

  expect(headingBox).not.toBeNull();
  expect(metadataBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  if ((page.viewportSize()?.width ?? 0) < 832) {
    expect(metadataBox?.y).toBeGreaterThan(headingBox?.y ?? 0);
    expect(actionBox?.y).toBeGreaterThan(metadataBox?.y ?? 0);
  } else {
    expect(metadataBox?.x).toBeGreaterThan(headingBox?.x ?? 0);
    expect(actionBox?.x).toBeGreaterThan(metadataBox?.x ?? 0);
  }

  await expect(
    primary.getByRole("heading", { name: "Available source files" }),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("@a11y DownloadList fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/download-list/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual DownloadList fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/download-list/");
  await expect(page).toHaveScreenshot("download-list.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
