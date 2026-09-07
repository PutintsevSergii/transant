import { expect, test, type Page } from "@playwright/test";

async function openCompactMenu(page: Page) {
  const trigger = page.locator("[data-header-trigger]");
  if (await trigger.isVisible()) await trigger.click();
}

test("@locale German homepage keeps switchyard copy in German", async ({
  page,
}) => {
  await page.goto("/de/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page).toHaveTitle(
    "Güterwagen für individuelle Transportaufgaben | TransANT",
  );
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Güterwagen-Engineering",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Engineering mit Mehrwert / Wagenfamilien / Modellspezifikationen / Qualität und Zertifizierung / Transportanforderungen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).toContainText(
    "Nach Transportaufgabe auswählen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).toContainText(
    "Intermodalwagen für den flexiblen Transport",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    "Leichte Intermodalwagen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    "Choose by transport task",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    "Matching wagon families to cargo and loading needs.",
  );
  await expect(page.locator("main")).toContainText(
    "TransAnt entwickelt, vermarktet und betreut Güterwagenlösungen und koordiniert deren industrielle Umsetzung mit qualifizierten Fertigungspartnern.",
  );
  const event = page.locator("[data-innotrans-event]");
  await expect(event.getByRole("heading", { level: 2 })).toHaveText(
    "Treffen Sie TransANT in Berlin",
  );
  await expect(
    event.getByRole("link", { name: /Besuchen Sie uns auf der InnoTrans/u }),
  ).toHaveAttribute("href", "/de/innotrans-2026/");
  await expect(event.locator("a")).toHaveCount(1);
  await expect(
    page.locator(
      "[data-site-header] nav[aria-label='Hauptnavigation'] > ul > li > a[href='/de/']",
    ),
  ).toHaveCount(0);
});

test("@locale locale selector expands and switches back on the same route", async ({
  page,
}) => {
  await page.goto("/de/");
  await openCompactMenu(page);

  const selector = page.locator(
    "[data-site-header] .site-header__locale-selector",
  );
  await expect(selector.locator("summary")).toContainText("DE");
  await selector.locator("summary").click();
  await expect(selector.locator("a")).toHaveCount(5);
  await expect(selector.locator("a").nth(0)).toHaveAttribute("href", "/");
  await expect(selector.locator("a").nth(1)).toHaveAttribute("href", "/de/");
  await expect(selector.locator("a").nth(2)).toHaveAttribute("href", "/uk/");
  await expect(selector.locator("a").nth(3)).toHaveAttribute("href", "/pl/");
  await expect(selector.locator("a").nth(4)).toHaveAttribute("href", "/cs/");

  await selector.locator("a").nth(0).click();
  await expect(page).toHaveURL(/\/$/u);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Wagons built for more useful payload.",
  );
});

test("@locale German primary navigation renders the destination page", async ({
  page,
}) => {
  await page.goto("/de/");
  await openCompactMenu(page);
  const wagonGroup = page.locator("[data-header-navigation-group]");
  await wagonGroup.locator("summary").click();
  await wagonGroup.getByRole("link", { name: "Alle Wagen" }).click();

  await expect(page).toHaveURL(/\/de\/wagons\/$/u);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Güterwagen für jede Transportaufgabe",
  );
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Güterwagenkatalog",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Intermodal / Flachwagen / Holz / Multi / Offener Kasten / Kesselwagen",
  );
  await expect(page.locator("[data-home-hero]")).toHaveCount(0);
});

test("@locale German Engineering & Services route uses translated page content", async ({
  page,
}) => {
  await page.goto("/de/engineering-services/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Beginnen Sie mit dem Wagenmodell und seinen technischen Daten",
  );
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(
    "Zehn Konfigurationen in fünf Wagenfamilien",
  );
  await expect(
    page.getByRole("link", { name: "Wagenanforderungen besprechen" }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/greentec|alform/iu);
  await expect(
    page.locator("[data-site-header] .site-header__primary-nav a[href='/de/']"),
  ).toHaveAttribute("href", "/de/");
  await expect(
    page.locator(
      "[data-site-header] .site-header__primary-nav a[href='/de/engineering-services/']",
    ),
  ).toHaveAttribute("aria-current", "page");
});

test("@locale German Company route uses the shared localized descriptor strip", async ({
  page,
}) => {
  await page.goto("/de/company/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "TransAnt GmbH",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "Fünf Wagenfamilien / Zehn Katalogmodelle / Modellspezifische technische Daten / Linz, Österreich",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Über TransAnt GmbH",
  );
  await expect(page.locator("main")).toContainText(
    "TransAnt entwickelt, vermarktet und betreut Güterwagenlösungen und koordiniert deren industrielle Umsetzung mit qualifizierten Fertigungspartnern.",
  );
  await expect(page.locator("a[href*='/sustainability/']")).toHaveCount(0);
});
