import type { SiteFooterLink } from "../../components/shell/SiteFooter/SiteFooter.types";
import type {
  SiteHeaderLocaleOption,
  SiteHeaderNavigationItem,
} from "../../components/shell/SiteHeader/SiteHeader.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { catalogue } from "./catalogue-data";

export const publicBaseUrl = "https://www.transant.com";
export const tasGroupAffiliation = {
  header: {
    companyLabel: "TAS GROUP COMPANY",
  },
  footer: "Part of TAS Group",
} as const;
const [firstFamily, ...remainingFamilies] = catalogue.families;

if (!firstFamily) {
  throw new Error("The release-one catalogue requires at least one family.");
}

const familyFooterLinks: readonly [SiteFooterLink, ...SiteFooterLink[]] = [
  { label: firstFamily.name, href: `/wagons/${firstFamily.slug}/` },
  ...remainingFamilies.map((family) => ({
    label: family.name,
    href: `/wagons/${family.slug}/`,
  })),
];

export const siteLocales = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "uk", label: "UA", name: "Українська" },
  { code: "pl", label: "PL", name: "Polski" },
  { code: "cs", label: "CZ", name: "Čeština" },
] as const;

export type SiteLocale = (typeof siteLocales)[number]["code"];

interface ShellCopy {
  readonly skipToContent: string;
  readonly home: string;
  readonly wagons: string;
  readonly allWagons: string;
  readonly engineeringServices: string;
  readonly company: string;
  readonly expertise: string;
  readonly projects: string;
  readonly quality: string;
  readonly privacy: string;
  readonly imprint: string;
  readonly contactAction: string;
  readonly addressCityCountry: string;
  readonly familyNames: Readonly<Record<string, string>>;
  readonly headerLabels: NonNullable<BaseLayoutProps["header"]["labels"]>;
  readonly footerLabels: NonNullable<BaseLayoutProps["footer"]["labels"]>;
}

const shellCopy: Readonly<Record<SiteLocale, ShellCopy>> = {
  en: {
    skipToContent: "Skip to content",
    home: "Home",
    wagons: "Wagons",
    allWagons: "All wagons",
    engineeringServices: "PRO platform projects",
    company: "Company",
    expertise: "Expertise",
    projects: "Projects",
    quality: "Quality and certificates",
    privacy: "Privacy",
    imprint: "Imprint",
    contactAction: "Contact TransANT",
    addressCityCountry: "4020 Linz, Austria",
    familyNames: {},
    headerLabels: {
      menu: "Menu",
      closeMenu: "Close menu",
      siteNavigation: "Site navigation",
      primaryNavigation: "Primary navigation",
      localeSelection: "Locale selection",
      language: "Language",
    },
    footerLabels: {
      localeSelection: "Locale selection",
      languages: "Languages",
      contact: "Contact",
      legalInformation: "Legal information",
    },
  },
  de: {
    skipToContent: "Zum Inhalt springen",
    home: "Startseite",
    wagons: "Wagen",
    allWagons: "Alle Wagen",
    engineeringServices: "PRO-Plattformprojekte",
    company: "Unternehmen",
    expertise: "Kompetenz",
    projects: "Projekte",
    quality: "Qualität und Zertifikate",
    privacy: "Datenschutz",
    imprint: "Impressum",
    contactAction: "TransANT kontaktieren",
    addressCityCountry: "4020 Linz, Österreich",
    familyNames: {
      Intermodal: "Intermodal",
      Flat: "Flachwagen",
      Timber: "Holz",
      "Multi / Open box": "Multi / Offener Kasten",
      Tank: "Kesselwagen",
    },
    headerLabels: {
      menu: "Menü",
      closeMenu: "Menü schließen",
      siteNavigation: "Seitennavigation",
      primaryNavigation: "Hauptnavigation",
      localeSelection: "Sprachauswahl",
      language: "Sprache",
    },
    footerLabels: {
      localeSelection: "Sprachauswahl",
      languages: "Sprachen",
      contact: "Kontakt",
      legalInformation: "Rechtliche Informationen",
    },
  },
  uk: {
    skipToContent: "Перейти до вмісту",
    home: "Головна",
    wagons: "Вагони",
    allWagons: "Усі вагони",
    engineeringServices: "PRO-проєкти платформ",
    company: "Компанія",
    expertise: "Компетенції",
    projects: "Проєкти",
    quality: "Якість і сертифікати",
    privacy: "Конфіденційність",
    imprint: "Вихідні дані",
    contactAction: "Зв’язатися з TransANT",
    addressCityCountry: "4020 Лінц, Австрія",
    familyNames: {
      Intermodal: "Інтермодальні",
      Flat: "Платформні",
      Timber: "Для деревини",
      "Multi / Open box": "Універсальні / напіввагони",
      Tank: "Цистерни",
    },
    headerLabels: {
      menu: "Меню",
      closeMenu: "Закрити меню",
      siteNavigation: "Навігація сайту",
      primaryNavigation: "Головна навігація",
      localeSelection: "Вибір мови",
      language: "Мова",
    },
    footerLabels: {
      localeSelection: "Вибір мови",
      languages: "Мови",
      contact: "Контакти",
      legalInformation: "Правова інформація",
    },
  },
  pl: {
    skipToContent: "Przejdź do treści",
    home: "Strona główna",
    wagons: "Wagony",
    allWagons: "Wszystkie wagony",
    engineeringServices: "Projekty platform PRO",
    company: "Firma",
    expertise: "Kompetencje",
    projects: "Projekty",
    quality: "Jakość i certyfikaty",
    privacy: "Prywatność",
    imprint: "Nota prawna",
    contactAction: "Skontaktuj się z TransANT",
    addressCityCountry: "4020 Linz, Austria",
    familyNames: {
      Intermodal: "Intermodalne",
      Flat: "Platformowe",
      Timber: "Do drewna",
      "Multi / Open box": "Uniwersalne / węglarki",
      Tank: "Cysterny",
    },
    headerLabels: {
      menu: "Menu",
      closeMenu: "Zamknij menu",
      siteNavigation: "Nawigacja witryny",
      primaryNavigation: "Nawigacja główna",
      localeSelection: "Wybór języka",
      language: "Język",
    },
    footerLabels: {
      localeSelection: "Wybór języka",
      languages: "Języki",
      contact: "Kontakt",
      legalInformation: "Informacje prawne",
    },
  },
  cs: {
    skipToContent: "Přejít k obsahu",
    home: "Domů",
    wagons: "Vozy",
    allWagons: "Všechny vozy",
    engineeringServices: "PRO projekty plošinových vozů",
    company: "Společnost",
    expertise: "Odbornost",
    projects: "Projekty",
    quality: "Kvalita a certifikáty",
    privacy: "Ochrana soukromí",
    imprint: "Tiráž",
    contactAction: "Kontaktovat TransANT",
    addressCityCountry: "4020 Linec, Rakousko",
    familyNames: {
      Intermodal: "Intermodální",
      Flat: "Plošinové",
      Timber: "Pro dřevo",
      "Multi / Open box": "Víceúčelové / otevřené skříňové",
      Tank: "Cisternové",
    },
    headerLabels: {
      menu: "Nabídka",
      closeMenu: "Zavřít nabídku",
      siteNavigation: "Navigace webu",
      primaryNavigation: "Hlavní navigace",
      localeSelection: "Výběr jazyka",
      language: "Jazyk",
    },
    footerLabels: {
      localeSelection: "Výběr jazyka",
      languages: "Jazyky",
      contact: "Kontakt",
      legalInformation: "Právní informace",
    },
  },
};

function toEnglishPath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localePrefix = siteLocales
    .filter(({ code }) => code !== "en")
    .find(
      ({ code }) =>
        normalizedPath === `/${code}` || normalizedPath.startsWith(`/${code}/`),
    );

  if (!localePrefix) return normalizedPath;
  const englishPath = normalizedPath.slice(localePrefix.code.length + 1);
  return englishPath ? `/${englishPath.replace(/^\/+/, "")}` : "/";
}

/** Normalizes a route and applies the selected locale exactly once. */
export function localizedPath(locale: SiteLocale, path: string): string {
  const englishPath = toEnglishPath(path);
  if (locale === "en") return englishPath;
  return englishPath === "/" ? `/${locale}/` : `/${locale}${englishPath}`;
}

/** Builds the locale menu from one registry without browser or global state. */
export function createLocaleOptions(
  path: string,
  locale: SiteLocale = "en",
): readonly SiteHeaderLocaleOption[] {
  const englishPath = toEnglishPath(path || "/");

  return siteLocales.map((option) => ({
    label: option.label,
    name: option.name,
    href: localizedPath(option.code, englishPath),
    current: locale === option.code,
  }));
}

/** Builds route-aware primary navigation, including the source-owned wagon group. */
export function createPrimaryNavigation(
  path: string,
  locale: SiteLocale = "en",
): readonly SiteHeaderNavigationItem[] {
  const englishPath = toEnglishPath(path || "/");
  const route = (destination: string) => localizedPath(locale, destination);
  const copy = shellCopy[locale];
  const wagonChildren = familyFooterLinks.map((link) => ({
    label: copy.familyNames[link.label] ?? link.label,
    href: route(link.href),
  }));

  return [
    ...(englishPath === "/" ? [] : [{ label: copy.home, href: route("/") }]),
    {
      label: copy.wagons,
      href: route("/wagons/"),
      overviewLabel: copy.allWagons,
      children: wagonChildren,
    },
    {
      label: copy.engineeringServices,
      href: route("/pro-platform-projects/"),
    },
    { label: copy.company, href: route("/company/") },
  ];
}

/** Creates caller-owned document metadata and verified shell data for a route. */
export function createSiteLayout(
  title: string,
  description: string,
  canonicalPath: string,
  locale: SiteLocale = "en",
  logoScale: "default" | "prominent" = "default",
): BaseLayoutProps {
  const route = (path: string) => localizedPath(locale, path);
  const copy = shellCopy[locale];

  return {
    language: locale,
    title,
    description,
    canonicalUrl: `${publicBaseUrl}${route(canonicalPath)}`,
    skipLinkLabel: copy.skipToContent,
    header: {
      homeHref: route("/"),
      navigation: createPrimaryNavigation(canonicalPath, locale),
      currentPath: route(canonicalPath),
      localeOptions: createLocaleOptions(canonicalPath, locale),
      labels: copy.headerLabels,
      affiliation: tasGroupAffiliation.header,
      logoScale,
      contactAction: {
        label: copy.contactAction,
        href: route("/contact/"),
      },
      sticky: true,
    },
    footer: {
      groups: [
        {
          heading: copy.wagons,
          links: [
            ...familyFooterLinks.map((link) => ({
              label: copy.familyNames[link.label] ?? link.label,
              href: route(link.href),
            })),
          ] as [SiteFooterLink, ...SiteFooterLink[]],
        },
        {
          heading: copy.expertise,
          links: [
            {
              label: copy.engineeringServices,
              href: route("/pro-platform-projects/"),
            },
            { label: copy.projects, href: route("/projects/") },
            {
              label: copy.quality,
              href: route("/quality/"),
            },
            { label: copy.company, href: route("/company/") },
          ],
        },
      ],
      contact: {
        verification: "verified",
        companyName: "TransAnt GmbH",
        addressLines: ["voestalpine-Straße 3", copy.addressCityCountry],
        phone: "+43 664 88324966",
        email: "office@transant.com",
      },
      legalLinks: [
        { label: copy.privacy, href: route("/privacy/") },
        { label: copy.imprint, href: route("/imprint/") },
      ],
      copyright: "© TransAnt GmbH",
      affiliation: tasGroupAffiliation.footer,
      labels: copy.footerLabels,
    },
  };
}
