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
    "Engineering mit Mehrwert / Wagenfamilien / Modulare Plattform / Qualität und Zertifizierung / Transportanforderungen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).toContainText(
    "Nach Transportaufgabe auswählen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).toContainText(
    "Leichte Intermodalwagen",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    "Choose by transport task",
  );
  await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
    "Matching wagon families to cargo and loading needs.",
  );
});

test("@locale locale selector expands and switches back on the same route", async ({
  page,
}) => {
  await page.goto("/de/");
  await openCompactMenu(page);

  const selector = page.locator("[data-site-header] details");
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
  await page.getByRole("link", { name: "Wagen", exact: true }).click();

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

test("@locale German Technology route uses translated page content", async ({
  page,
}) => {
  await page.goto("/de/technology/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Engineering beginnt mit der Betriebsanforderung",
  );
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(
    "Ein Plattformkonzept, mehrere Konfigurationen",
  );
  await expect(
    page.getByRole("link", { name: "Wagenanforderungen besprechen" }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText(
    "Engineering begins with the operating requirement",
  );
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
    "Güterwagen-Engineering / Homologation und Vertrieb / Engineering- und Produktionspartner / Linz, Österreich",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Engineering für Güterwagen im europäischen Regelspurnetz",
  );
});

test("@locale German Sustainability route keeps sourced claims and navigation localized", async ({
  page,
}) => {
  await page.goto("/de/sustainability/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "greentec steel für leichtere Güterwagen",
  );
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "Nachhaltige Güterwagen",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "greentec steel / CO₂ in der Herstellung / Nutzlast leichter Intermodalwagen / Prototyp für Wertstoffkreisläufe / EcoVadis April 2024",
  );
  await expect(
    page.locator(
      "[data-site-header] nav[aria-label='Hauptnavigation'] a[href='/de/sustainability/']",
    ),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("main")).toContainText(
    "3 Tonnen eingespartes CO₂ in der Herstellung",
  );
  await expect(page.locator("main")).toContainText(
    "Historisches Ergebnis; keine Aussage zur aktuellen Bewertung",
  );
  await expect(page.locator("main")).not.toContainText(
    "Greentec steel for lighter freight wagons",
  );
});
