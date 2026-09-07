import { expect, test } from "@playwright/test";

import { expectNoPageOverflow } from "./support/page-contract";

const locales = [
  {
    code: "uk",
    label: "UA",
    heading: "Вагони для більшого корисного навантаження.",
    technology: "Почніть із моделі вагона та її технічних даних",
    transportRequirements: "Транспортні вимоги",
    supportingNavigation: "Пов’язані способи зв’язку",
    eventHeading: "Зустріньтеся з TransANT у Берліні",
    eventAction: "Відвідайте нас на InnoTrans",
    intermodalSummary: "Інтермодальні вагони для гнучкого перевезення",
    retiredIntermodalSummary: "Полегшені інтермодальні вагони",
    roleBoundary:
      "TransAnt розробляє, виводить на ринок і супроводжує рішення для вантажних вагонів, а також координує їх промислову реалізацію з кваліфікованими виробничими партнерами.",
  },
  {
    code: "pl",
    label: "PL",
    heading: "Wagony zapewniające większą użyteczną ładowność.",
    technology: "Zacznij od modelu wagonu i jego danych technicznych",
    transportRequirements: "Wymagania transportowe",
    supportingNavigation: "Powiązane opcje kontaktu",
    eventHeading: "Spotkaj się z TransANT w Berlinie",
    eventAction: "Odwiedź nas na InnoTrans",
    intermodalSummary: "Wagony intermodalne do elastycznego transportu",
    retiredIntermodalSummary: "Lekkie wagony intermodalne",
    roleBoundary:
      "TransAnt opracowuje, wprowadza na rynek i wspiera rozwiązania dla wagonów towarowych oraz koordynuje ich realizację przemysłową z wykwalifikowanymi partnerami produkcyjnymi.",
  },
  {
    code: "cs",
    label: "CZ",
    heading: "Vozy pro vyšší užitečné zatížení.",
    technology: "Začněte modelem vozu a jeho technickými údaji",
    transportRequirements: "Přepravní požadavky",
    supportingNavigation: "Související možnosti kontaktu",
    eventHeading: "Setkejte se s TransANT v Berlíně",
    eventAction: "Navštivte nás na InnoTrans",
    intermodalSummary: "Intermodální vozy pro flexibilní přepravu",
    retiredIntermodalSummary: "Lehké intermodální vozy",
    roleBoundary:
      "TransAnt vyvíjí, uvádí na trh a podporuje řešení nákladních vozů a koordinuje jejich průmyslovou realizaci s kvalifikovanými výrobními partnery.",
  },
] as const;

for (const locale of locales) {
  test(`@locale ${locale.label} homepage and Engineering & Services route use authored local copy`, async ({
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
    const event = page.locator("[data-innotrans-event]");
    await expect(event.getByRole("heading", { level: 2 })).toHaveText(
      locale.eventHeading,
    );
    await expect(event.getByRole("link")).toHaveAccessibleName(
      new RegExp(locale.eventAction, "u"),
    );
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
      locale.technology,
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
    await expect(page.locator("main")).not.toContainText(/greentec|alform/iu);
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
