import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

test("@component EvidenceList renders approved typed evidence, labelled metadata, and C-002 action semantics", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/evidence-list/");

  const lists = page.locator("[data-evidence-list]");
  const populated = lists.nth(0);
  const empty = lists.nth(1);
  await expect(lists).toHaveCount(2);
  await expect(populated.locator("[data-evidence-list-entry]")).toHaveCount(4);
  await expect(populated).toContainText("policy");
  await expect(populated).toContainText("certification");
  await expect(populated).toContainText("document");
  await expect(populated).toContainText("Factual reference");
  await expect(populated).not.toContainText(
    "Unverified fixture reference remains unpublished",
  );
  await expect(populated.getByText("Status", { exact: true })).toHaveCount(4);
  await expect(populated.getByText("Date", { exact: true })).toHaveCount(4);
  await expect(populated.getByText("Issuer", { exact: true })).toHaveCount(2);
  await expect(populated.getByText("Scope", { exact: true })).toHaveCount(2);
  await expect(empty.locator("[data-evidence-list-empty]")).toHaveText(
    "Contact TransANT for further information and documents.",
  );

  const external = populated.getByRole("link", {
    name: /open policy reference/i,
  });
  await expect(external).toHaveAttribute("target", "_blank");
  await expect(external).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    populated.getByRole("link", { name: "Download certificate record" }),
  ).toHaveAttribute("href", "/fixtures/download-list/fixture-document.txt");
  await expect(populated.locator("script")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("@responsive EvidenceList keeps normal compact list order, labelled wrapping, native focus, and contained wide rows", async ({
  page,
}) => {
  await page.goto("/fixtures/evidence-list/");
  const populated = page.locator("[data-evidence-list]").first();
  const entries = populated.locator("[data-evidence-list-entry]");
  const first = entries.first();
  const second = entries.nth(1);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  await expect(entries).toHaveCount(4);
  expect(
    await entries.evaluateAll((items) =>
      items.map((item) => item.querySelector("h3")?.textContent?.trim()),
    ),
  ).toEqual([
    "Policy statement with a defined review boundary",
    "Certificate record with source-owned issuer and scope",
    "Document evidence retains its selected date",
    "Factual reference can remain a route-free record",
  ]);

  const [content, metadata, action] = await Promise.all([
    first.locator(".evidence-list__content").boundingBox(),
    first.locator(".evidence-list__metadata").boundingBox(),
    first.locator("[data-evidence-list-action]").boundingBox(),
  ]);
  expect(content).not.toBeNull();
  expect(metadata).not.toBeNull();
  expect(action).not.toBeNull();
  if (viewportWidth < 896) {
    expect(metadata?.y).toBeGreaterThan(content?.y ?? 0);
    expect(action?.y).toBeGreaterThan(metadata?.y ?? 0);
  } else {
    expect(metadata?.x).toBeGreaterThan(content?.x ?? 0);
    expect(action?.x).toBeGreaterThan(metadata?.x ?? 0);
  }

  const download = second.getByRole("link", {
    name: "Download certificate record",
  });
  await download.focus();
  await expect(download).toBeFocused();
  expect((await download.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await expectNoPageOverflow(page);
});

test("@a11y EvidenceList fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/evidence-list/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual EvidenceList fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/evidence-list/");
  await expect(page).toHaveScreenshot("evidence-list.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
