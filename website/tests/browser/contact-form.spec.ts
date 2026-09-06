import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  collectBrowserErrors,
  expectNoPageOverflow,
} from "./support/page-contract";

const browserBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4322";

test("@component ContactForm renders native caller-owned POST forms with visible labels, context, and privacy data", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/fixtures/contact-form/");

  const forms = page.locator("[data-contact-form]");
  const contextual = forms.first();
  await expect(forms).toHaveCount(2);
  await expect(contextual).toHaveAttribute("data-enhanced", "true");
  await expect(contextual.locator("form")).toHaveAttribute("method", "post");
  await expect(contextual.locator("form")).toHaveAttribute(
    "action",
    "/fixtures/contact-form/submit",
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
    contextual.getByRole("link", { name: "Privacy notice" }),
  ).toHaveAttribute("href", "/privacy/");
  await expect(contextual.locator('input[name="website"]')).toHaveAttribute(
    "tabindex",
    "-1",
  );
  expect(errors).toEqual([]);
});

test("@keyboard ContactForm preserves the native no-JavaScript submit path", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${browserBaseUrl}/fixtures/contact-form/`);

  const form = page.locator("[data-contact-form]").first();
  await expect(form).not.toHaveAttribute("data-enhanced", "true");
  await expect(form.locator("form")).toHaveAttribute("method", "post");
  await form.getByLabel("Name").fill("Alex Morgan");
  await form.getByLabel("Business email").fill("alex@example.com");
  await form
    .locator('textarea[name="message"]')
    .fill("A native POST remains available.");
  await form.getByLabel(/I agree/).check();
  await form.getByRole("button", { name: "Send inquiry" }).focus();
  await expect(
    form.getByRole("button", { name: "Send inquiry" }),
  ).toBeFocused();
  await context.close();
});

test("@component ContactForm scopes pending, error, retry, success, and honeypot states to its own root", async ({
  page,
}) => {
  let mode: "pending" | "error" | "success" = "pending";
  let releasePending: (() => void) | undefined;
  await page.route("**/fixtures/contact-form/submit", async (route) => {
    if (mode === "pending") {
      await new Promise<void>((resolve) => {
        releasePending = resolve;
      });
    }
    if (mode === "error") {
      await route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({
          status: "error",
          message: "Please review the highlighted field.",
          fieldErrors: { email: "Use a business email address." },
        }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "success",
        message: "Thank you. We will reply soon.",
      }),
    });
  });
  await page.goto("/fixtures/contact-form/");

  const first = page.locator("[data-contact-form]").first();
  const second = page.locator("[data-contact-form]").nth(1);
  await first.getByLabel("Name").fill("Alex Morgan");
  await first.getByLabel("Business email").fill("alex@invalid.example");
  await first
    .locator('textarea[name="message"]')
    .fill("Please send a response.");
  await first.getByLabel(/I agree/).check();
  await first.getByRole("button", { name: "Send inquiry" }).click();

  await expect(first).toHaveAttribute("aria-busy", "true");
  await expect(first.getByLabel("Name")).toBeDisabled();
  await expect(
    first.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  mode = "error";
  releasePending?.();

  await expect(first).toHaveAttribute("data-contact-form-state", "error");
  await expect(first.getByText("Use a business email address.")).toBeVisible();
  await expect(first.getByLabel("Business email")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(first.getByLabel("Business email")).toBeFocused();
  await expect(first.getByLabel("Name")).toHaveValue("Alex Morgan");
  await expect(second).toHaveAttribute("data-contact-form-state", "idle");

  mode = "success";
  await first.getByRole("button", { name: "Send inquiry" }).click();
  await expect(first).toHaveAttribute("data-contact-form-state", "success");
  await expect(first.locator("[data-contact-form-status]")).toHaveText(
    "Thank you. We will reply soon.",
  );
  await expect(first.getByLabel("Name")).toHaveValue("");

  await second.getByLabel("Name").fill("Spam fixture");
  await second.getByLabel("Business email").fill("spam@example.com");
  await second
    .locator('textarea[name="message"]')
    .fill("This route should not be requested.");
  await second.getByLabel(/I agree/).check();
  await second.locator('input[name="website"]').fill("bot.example");
  await second.getByRole("button", { name: "Send general inquiry" }).click();
  await expect(second).toHaveAttribute(
    "data-contact-form-spam-received",
    "true",
  );
  await expect(second.locator("[data-contact-form-status]")).toContainText(
    "Thank you. Your inquiry has been received.",
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
  const submit = form.getByRole("button", { name: "Send inquiry" });
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
