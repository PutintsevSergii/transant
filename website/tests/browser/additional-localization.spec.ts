import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";

const locales = [
  {
    code: "uk",
    label: "UA",
    heading: "Інженерні рішення для європейських вантажних перевезень.",
    proTitle: "Полегшена платформа для важких транспортних завдань",
    transportRequirements: "Транспортні вимоги",
    supportingNavigation: "Пов’язані способи зв’язку",
    eventHeading: "Зустріньтеся з TransANT у Берліні",
    eventAction: "Відвідайте нас на InnoTrans",
    intermodalSummary: "Інтермодальні вагони для гнучкого перевезення",
    retiredIntermodalSummary: "Полегшені інтермодальні вагони",
    roleBoundary:
      "TransAnt GmbH — австрійська компанія у складі TAS Group, заснована в Лінці у 2020 році. Ми розробляємо, виводимо на ринок і супроводжуємо рішення для вантажних вагонів у європейській мережі стандартної колії, координуючи вимоги, інженерну розробку, сертифікацію та промислову реалізацію.",
    companyTitle: "Інженерні рішення для європейських вантажних перевезень",
    companyTask: "Транспортне завдання визначає конфігурацію вагона",
    homepageTask:
      "Робота над вагоном починається не з вибору стандартної моделі, а з розуміння реального транспортного завдання.",
    allWagonsAction: "Переглянути всі вагони",
    proAction: "Надіслати запит щодо PRO 60 ft",
  },
  {
    code: "pl",
    label: "PL",
    heading:
      "Rozwiązania inżynieryjne dla europejskiego kolejowego transportu towarowego.",
    proTitle: "Lekka platforma do ciężkich zadań transportowych",
    transportRequirements: "Wymagania transportowe",
    supportingNavigation: "Powiązane opcje kontaktu",
    eventHeading: "Spotkaj się z TransANT w Berlinie",
    eventAction: "Odwiedź nas na InnoTrans",
    intermodalSummary: "Wagony intermodalne do elastycznego transportu",
    retiredIntermodalSummary: "Lekkie wagony intermodalne",
    roleBoundary:
      "TransAnt GmbH to austriacka spółka należąca do TAS Group, założona w Linzu w 2020 roku. Opracowujemy, wprowadzamy na rynek i wspieramy rozwiązania dla wagonów towarowych przeznaczone do europejskiej sieci normalnotorowej, koordynując wymagania, prace inżynieryjne, certyfikację i realizację przemysłową.",
    companyTitle:
      "Rozwiązania inżynieryjne dla europejskiego kolejowego transportu towarowego",
    companyTask: "Zadanie transportowe określa konfigurację wagonu",
    homepageTask:
      "Prace nad wagonem nie zaczynają się od wyboru standardowego modelu, lecz od zrozumienia rzeczywistego zadania transportowego.",
    allWagonsAction: "Zobacz wszystkie wagony",
    proAction: "Wyślij zapytanie o PRO 60 ft",
  },
  {
    code: "cs",
    label: "CZ",
    heading: "Inženýrská řešení pro evropskou železniční nákladní dopravu.",
    proTitle: "Lehká plošina pro těžké přepravní úkoly",
    transportRequirements: "Přepravní požadavky",
    supportingNavigation: "Související možnosti kontaktu",
    eventHeading: "Setkejte se s TransANT v Berlíně",
    eventAction: "Navštivte nás na InnoTrans",
    intermodalSummary: "Intermodální vozy pro flexibilní přepravu",
    retiredIntermodalSummary: "Lehké intermodální vozy",
    roleBoundary:
      "TransAnt GmbH je rakouská společnost skupiny TAS Group, založená v Linci v roce 2020. Vyvíjíme, uvádíme na trh a podporujeme řešení nákladních vozů pro evropskou síť normálního rozchodu a koordinujeme požadavky, konstrukční práce, certifikaci a průmyslovou realizaci.",
    companyTitle: "Inženýrská řešení pro evropskou železniční nákladní dopravu",
    companyTask: "Přepravní úkol určuje konfiguraci vozu",
    homepageTask:
      "Práce na voze nezačíná výběrem standardního modelu, ale pochopením skutečného přepravního úkolu.",
    allWagonsAction: "Zobrazit všechny vozy",
    proAction: "Odeslat poptávku na PRO 60 ft",
  },
] as const;

for (const locale of locales) {
  test(`@locale ${locale.label} homepage and PRO platform route use authored local copy`, async ({
    page,
  }) => {
    await page.goto(`/${locale.code}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale.code);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      locale.heading,
    );
    await expect(page.locator("main")).toContainText(
      locale.transportRequirements,
    );
    await expect(page.locator("[data-wagon-switchyard]")).toContainText(
      locale.intermodalSummary,
    );
    await expect(page.locator("[data-wagon-switchyard]")).not.toContainText(
      locale.retiredIntermodalSummary,
    );
    await expect(page.locator("main")).toContainText(locale.roleBoundary);
    await expect(page.locator("[data-modular-platform-section]")).toContainText(
      locale.homepageTask,
    );
    await expect(
      page.locator("[data-modular-platform-section]").getByRole("link", {
        name: locale.allWagonsAction,
      }),
    ).toHaveAttribute("href", `/${locale.code}/wagons/`);
    await expect(
      page.locator("[data-payload-value-section]").getByRole("link", {
        name: locale.proAction,
      }),
    ).toHaveAttribute("href", `/${locale.code}/engineering-services/`);
    const event = page.locator("[data-innotrans-event]");
    await expect(event.getByRole("heading", { level: 2 })).toHaveText(
      locale.eventHeading,
    );
    await expect(
      event.getByRole("link", { name: new RegExp(locale.eventAction, "u") }),
    ).toHaveCount(1);
    await expect(event.locator("a")).toHaveCount(5);
    await expect(event.locator("[data-innotrans-locations]")).toContainText(
      "O5/55",
    );
    await expect(
      page.getByRole("navigation", { name: locale.supportingNavigation }),
    ).toHaveCount(1);
    const selector = page.locator(
      "[data-site-header] .site-header__locale-selector",
    );
    await expect(selector.locator("summary")).toContainText(locale.label);
    await expect(selector.locator("a")).toHaveCount(5);
    await expect(
      selector.locator(`a[href='/${locale.code}/']`),
    ).toHaveAttribute("aria-current", "true");
    await expect(
      page.locator(
        `[data-site-header] nav[aria-label] > ul > li > a[href='/${locale.code}/']`,
      ),
    ).toHaveCount(0);

    await page.goto(`/${locale.code}/engineering-services/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      locale.proTitle,
    );
    await expect(
      page.locator(`[data-site-header] a[href='/${locale.code}/company/']`),
    ).toHaveCount(1);
    await expect(
      page.locator(
        `[data-site-header] .site-header__primary-nav a[href='/${locale.code}/engineering-services/']`,
      ),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.locator(`[data-site-header] a[href='/${locale.code}/']`),
    ).toHaveCount(2);
    const wagonGroup = page.locator("[data-header-navigation-group]");
    await expect(wagonGroup.locator("a")).toHaveCount(6);
    await expect(page.locator("a[href*='/sustainability/']")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("alform®");
    await expectNoPageOverflow(page);

    await page.goto(`/${locale.code}/company/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      locale.companyTitle,
    );
    await expect(page.locator("main")).toContainText(locale.companyTask);
    await expect(page.locator("[data-media-story]")).toHaveCount(8);
    await expect(page.locator("img[src*='company-wagon-logo']")).toHaveCount(1);
    await expect(page.locator("[data-page-hero]")).toHaveAttribute(
      "data-page-hero-natural-media",
      "true",
    );
    await expectNoPageOverflow(page);
  });
}

test("@locale additional locale selectors preserve the current product route", async ({
  page,
}) => {
  await page.goto("/uk/wagons/intermodal/uno-intermodal-60ft-sgns/");
  const selector = page.locator(
    "[data-site-header] .site-header__locale-selector",
  );
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
