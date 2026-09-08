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
    "Ingenieurlösungen für den europäischen Schienengüterverkehr | TransANT",
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
    "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group und wurde 2020 in Linz gegründet.",
  );
  await expect(
    page.locator("[data-home-hero] a[href='/de/company/']"),
  ).toHaveAccessibleName("Über TransAnt");
  await expect(
    page.locator("[data-modular-platform-section]").getByRole("link", {
      name: "Alle Wagen ansehen",
    }),
  ).toHaveAttribute("href", "/de/wagons/");
  await expect(
    page.locator("[data-payload-value-section]").getByRole("link", {
      name: "Anfrage zu PRO 60 ft senden",
    }),
  ).toHaveAttribute("href", "/de/pro-platform-projects/");
  await expect(page.locator("[data-modular-platform-section]")).toContainText(
    "Die Arbeit an einem Wagen beginnt nicht mit der Wahl eines Standardmodells, sondern mit dem Verständnis der tatsächlichen Transportaufgabe.",
  );
  const event = page.locator("[data-innotrans-event]");
  await expect(event.getByRole("heading", { level: 2 })).toHaveText(
    "Treffen Sie TransANT in Berlin",
  );
  await expect(
    event.getByRole("link", { name: /Besuchen Sie uns auf der InnoTrans/u }),
  ).toHaveAttribute(
    "href",
    "https://plus.innotrans.de/company/TransAnt-GmbH--1041453",
  );
  await expect(event.locator("a")).toHaveCount(5);
  await expect(event.locator("[data-innotrans-locations]")).toContainText(
    "O5/55",
  );
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
    "Engineering solutions for European rail freight.",
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

test("@locale German PRO platform route uses translated page content", async ({
  page,
}) => {
  await page.goto("/de/pro-platform-projects/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Leichte Plattform für schwere Transportaufgaben",
  );
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(
    "Etwa 16 Tonnen Eigengewicht der Basisplattform",
  );
  await expect(
    page.getByRole("link", { name: "Anfrage zu PRO 60 ft senden" }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("alform®");
  await expect(
    page.locator("[data-site-header] .site-header__primary-nav a[href='/de/']"),
  ).toHaveAttribute("href", "/de/");
  await expect(
    page.locator(
      "[data-site-header] .site-header__primary-nav a[href='/de/pro-platform-projects/']",
    ),
  ).toHaveAttribute("aria-current", "page");
});

test("@locale German Company route uses the supplied localized company narrative", async ({
  page,
}) => {
  await page.goto("/de/company/");

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  const pageMeta = page.locator("[data-page-meta]");
  await expect(pageMeta.locator("[data-page-meta-label]")).toHaveText(
    "TransAnt GmbH",
  );
  await expect(pageMeta.locator("[data-page-meta-sequence]")).toHaveText(
    "2020 in Linz gegründet / Österreichisches Unternehmen der TAS Group / Europäisches Normalspurnetz / Ein koordiniertes Projektteam",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ingenieurlösungen für den europäischen Schienengüterverkehr",
  );
  await expect(page.locator("main")).toContainText(
    "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group, das 2020 in Linz gegründet wurde.",
  );
  await expect(page.locator("main")).toContainText(
    "Die Transportaufgabe bestimmt die Wagenkonfiguration",
  );
  await expect(page.locator("[data-page-hero]")).toHaveAttribute(
    "data-page-hero-natural-media",
    "true",
  );
  await expect(
    page.getByRole("link", { name: "Qualität und Zertifikate ansehen" }),
  ).toHaveAttribute("href", "/de/quality/");
  await expect(page.locator("a[href*='/sustainability/']")).toHaveCount(0);
});
