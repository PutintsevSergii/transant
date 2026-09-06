import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";

const locales = [
  {
    code: "uk",
    label: "UA",
    heading: "Вагони для більшого корисного навантаження.",
    technology: "Проєктування починається з експлуатаційних вимог",
  },
  {
    code: "pl",
    label: "PL",
    heading: "Wagony zapewniające większą użyteczną ładowność.",
    technology: "Projektowanie zaczyna się od wymagań eksploatacyjnych",
  },
  {
    code: "cs",
    label: "CZ",
    heading: "Vozy pro vyšší užitečné zatížení.",
    technology: "Konstrukce začíná provozními požadavky",
  },
] as const;

for (const locale of locales) {
  test(`@locale ${locale.label} homepage and Technology route use authored local copy`, async ({
    page,
  }) => {
    await page.goto(`/${locale.code}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale.code);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      locale.heading,
    );
    const selector = page.locator("[data-site-header] details");
    await expect(selector.locator("summary")).toContainText(locale.label);
    await expect(selector.locator("a")).toHaveCount(5);
    await expect(
      selector.locator(`a[href='/${locale.code}/']`),
    ).toHaveAttribute("aria-current", "true");

    await page.goto(`/${locale.code}/technology/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      locale.technology,
    );
    await expect(
      page.locator(`[data-site-header] a[href='/${locale.code}/company/']`),
    ).toHaveCount(1);
    await expectNoPageOverflow(page);
  });
}

test("@locale additional locale selectors preserve the current product route", async ({
  page,
}) => {
  await page.goto("/uk/wagons/intermodal/uno-intermodal-60ft-sgns/");
  const selector = page.locator("[data-site-header] details");
  await expect(selector.locator("a").nth(3)).toHaveAttribute(
    "href",
    "/pl/wagons/intermodal/uno-intermodal-60ft-sgns/",
  );
  await expect(page.locator("main")).toContainText("UNO INTERMODAL 60ft");
  await expect(page.locator("[data-technical-sheet]")).toContainText(
    "Технічні характеристики",
  );
  await expect(page.locator("[data-cargo-fit]")).toContainText("Вантаж");
});
