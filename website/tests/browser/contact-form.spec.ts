import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ??
  `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT ?? "4322"}`;

test("@component ContactForm renders a caller-owned mail-client handoff with visible labels, context, and privacy data", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/contact-form/");

  const forms = page.locator("[data-contact-form]");
  const contextual = forms.first();
  await expect(forms).toHaveCount(2);
  await expect(contextual).toHaveAttribute("data-enhanced", "true");
  await expect(contextual.locator("form")).toHaveAttribute("method", "get");
  await expect(contextual.locator("form")).toHaveAttribute(
    "action",
    "mailto:enquiries@example.com",
  );
  await expect(contextual.locator('input[name="subject"]')).toHaveValue(
    "Fixture freight wagon enquiry",
  );
  await expect(
    contextual.getByText("Product context", { exact: true }),
  ).toBeVisible();
  await expect(contextual.locator('input[name="context"]')).toHaveValue(
    "Intermodal & container requirement / 80 ft",
  );
  await expect(forms.nth(1).locator("[data-contact-form-context]")).toHaveCount(
    0,
  );

  await expect(contextual.getByLabel("Name")).toHaveAttribute(
    "autocomplete",
    "name",
  );
  await expect(contextual.getByLabel("Business email")).toHaveAttribute(
    "type",
    "email",
  );
  await expect(contextual.getByLabel("Business email")).toHaveAttribute(
    "autocomplete",
    "email",
  );
  await expect(contextual.getByLabel("Company")).toHaveAttribute(
    "autocomplete",
    "organization",
  );
  await expect(contextual.locator('textarea[name="message"]')).toHaveAttribute(
    "required",
    "",
  );
  await expect(
    contextual.getByRole("link", { name: "Privacy Policy" }),
  ).toHaveAttribute("href", "/privacy/");
  await expect(contextual.locator('input[type="checkbox"]')).toHaveCount(0);
  await expect(contextual.locator('[name="website"]')).toHaveCount(0);
  await expect(
    contextual.getByText(
      /opens your email application with the inquiry prepared/i,
    ),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("@keyboard ContactForm preserves a native mailto fallback without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/contact-form/`);

  const form = page.locator("[data-contact-form]").first();
  await expect(form).not.toHaveAttribute("data-enhanced", "true");
  await expect(form.locator("form")).toHaveAttribute("method", "get");
  await expect(form.locator("form")).toHaveAttribute(
    "action",
    "mailto:enquiries@example.com",
  );
  await form.getByLabel("Name").fill("Alex Morgan");
  await form.getByLabel("Business email").fill("alex@example.com");
  await form
    .locator('textarea[name="message"]')
    .fill("Open this in the visitor's mail application.");
  await form.getByRole("button", { name: "Continue in email" }).focus();
  await expect(
    form.getByRole("button", { name: "Continue in email" }),
  ).toBeFocused();
  await context.close();
});

test("@component ContactForm prepares encoded values, preserves input, and scopes state to its own root", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-form/");
  await page.evaluate(() => {
    for (const root of document.querySelectorAll<HTMLElement>(
      "[data-contact-form]",
    )) {
      const anchor = root.querySelector<HTMLAnchorElement>(
        "[data-contact-form-mailto]",
      );
      anchor?.addEventListener("click", (event) => {
        event.preventDefault();
        root.dataset.capturedMailto = anchor.href;
      });
    }
  });

  const first = page.locator("[data-contact-form]").first();
  const second = page.locator("[data-contact-form]").nth(1);
  await first.getByLabel("Name").fill("Alex Morgan");
  await first.getByLabel("Business email").fill("alex@example.com");
  await first.getByLabel("Company").fill("Rail & Cargo GmbH");
  await first
    .locator('textarea[name="message"]')
    .fill("Timber route Linz–Berlin\nPlease reply by email.");
  await first.getByRole("button", { name: "Continue in email" }).click();

  await expect(first).toHaveAttribute("data-contact-form-state", "prepared");
  await expect(first.locator("[data-contact-form-status]")).toHaveText(
    "Your email application should open with the inquiry prepared. Review it and send it from there.",
  );
  await expect(first.locator("[data-contact-form-status]")).toBeFocused();
  await expect(first.getByLabel("Name")).toHaveValue("Alex Morgan");
  await expect(second).toHaveAttribute("data-contact-form-state", "idle");

  const captured = await first.getAttribute("data-captured-mailto");
  expect(captured).not.toBeNull();
  const prepared = new URL(captured!);
  expect(prepared.protocol).toBe("mailto:");
  expect(prepared.pathname).toBe("enquiries@example.com");
  expect(prepared.searchParams.get("subject")).toBe(
    "Fixture freight wagon enquiry",
  );
  expect(prepared.searchParams.get("body")).toBe(
    "Name: Alex Morgan\r\nBusiness email: alex@example.com\r\nCompany: Rail & Cargo GmbH\r\nProduct context: Intermodal & container requirement / 80 ft\r\n\r\nInquiry:\r\nTimber route Linz–Berlin\nPlease reply by email.",
  );
});

test("@responsive ContactForm keeps compact field order and usable controls without overflow", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-form/");
  const form = page.locator("[data-contact-form]").first();
  const name = form.getByLabel("Name");
  const email = form.getByLabel("Business email");
  const message = form.locator('textarea[name="message"]');
  const submit = form.getByRole("button", { name: "Continue in email" });
  const viewportWidth = page.viewportSize()?.width ?? 0;
  const [nameBox, emailBox, messageBox, submitBox] = await Promise.all([
    name.boundingBox(),
    email.boundingBox(),
    message.boundingBox(),
    submit.boundingBox(),
  ]);

  expect(nameBox).not.toBeNull();
  expect(emailBox).not.toBeNull();
  expect(messageBox).not.toBeNull();
  expect(submitBox?.height).toBeGreaterThanOrEqual(44);
  if (viewportWidth < 640) {
    expect(emailBox?.y).toBeGreaterThan(nameBox?.y ?? 0);
  } else {
    expect(emailBox?.x).toBeGreaterThan(nameBox?.x ?? 0);
  }
  expect(messageBox?.y).toBeGreaterThan(nameBox?.y ?? 0);
  await expectNoPageOverflow(page);
});

test("@a11y ContactForm fixture has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/fixtures/contact-form/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});

test("@visual ContactForm fixture visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fixtures/contact-form/");
  await expect(page).toHaveScreenshot("contact-form.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
