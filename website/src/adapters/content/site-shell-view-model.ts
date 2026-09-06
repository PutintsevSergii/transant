import type { SiteFooterLink } from "../../components/shell/SiteFooter/SiteFooter.types";
import type { SiteHeaderLocaleOption } from "../../components/shell/SiteHeader/SiteHeader.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { catalogue } from "./catalogue-data";

export const publicBaseUrl = "https://www.transant.com";
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
  readonly wagons: string;
  readonly technology: string;
  readonly sustainability: string;
  readonly company: string;
  readonly expertise: string;
  readonly projects: string;
  readonly qualityAndSustainability: string;
  readonly privacy: string;
  readonly imprint: string;
  readonly contactAction: string;
  readonly familyNames: Readonly<Record<string, string>>;
  readonly headerLabels: NonNullable<BaseLayoutProps["header"]["labels"]>;
  readonly footerLabels: NonNullable<BaseLayoutProps["footer"]["labels"]>;
}

const shellCopy: Readonly<Record<SiteLocale, ShellCopy>> = {
  en: {
    skipToContent: "Skip to content",
    wagons: "Wagons",
    technology: "Technology",
    sustainability: "Sustainability",
    company: "Company",
    expertise: "Expertise",
    projects: "Projects",
    qualityAndSustainability: "Quality and sustainability",
    privacy: "Privacy",
    imprint: "Imprint",
    contactAction: "Contact TransANT",
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
    wagons: "Wagen",
    technology: "Technologie",
    sustainability: "Nachhaltigkeit",
    company: "Unternehmen",
    expertise: "Kompetenz",
    projects: "Projekte",
    qualityAndSustainability: "Qualität und Nachhaltigkeit",
    privacy: "Datenschutz",
    imprint: "Impressum",
    contactAction: "TransANT kontaktieren",
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
    wagons: "Вагони",
    technology: "Технології",
    sustainability: "Сталий розвиток",
    company: "Компанія",
    expertise: "Компетенції",
    projects: "Проєкти",
    qualityAndSustainability: "Якість і сталий розвиток",
    privacy: "Конфіденційність",
    imprint: "Вихідні дані",
    contactAction: "Зв’язатися з TransANT",
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
    wagons: "Wagony",
    technology: "Technologia",
    sustainability: "Zrównoważony rozwój",
    company: "Firma",
    expertise: "Kompetencje",
    projects: "Projekty",
    qualityAndSustainability: "Jakość i zrównoważony rozwój",
    privacy: "Prywatność",
    imprint: "Nota prawna",
    contactAction: "Skontaktuj się z TransANT",
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
    wagons: "Vozy",
    technology: "Technologie",
    sustainability: "Udržitelnost",
    company: "Společnost",
    expertise: "Odbornost",
    projects: "Projekty",
    qualityAndSustainability: "Kvalita a udržitelnost",
    privacy: "Ochrana soukromí",
    imprint: "Tiráž",
    contactAction: "Kontaktovat TransANT",
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

/** Creates caller-owned document metadata and verified shell data for a route. */
export function createSiteLayout(
  title: string,
  description: string,
  canonicalPath: string,
  locale: SiteLocale = "en",
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
      navigation: [
        { label: copy.wagons, href: route("/wagons/") },
        { label: copy.technology, href: route("/technology/") },
        { label: copy.sustainability, href: route("/sustainability/") },
        { label: copy.company, href: route("/company/") },
      ],
      currentPath: route(canonicalPath),
      localeOptions: createLocaleOptions(canonicalPath, locale),
      labels: copy.headerLabels,
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
            { label: copy.technology, href: route("/technology/") },
            { label: copy.projects, href: route("/projects/") },
            {
              label: copy.qualityAndSustainability,
              href: route("/sustainability/"),
            },
            { label: copy.company, href: route("/company/") },
          ],
        },
      ],
      contact: {
        verification: "verified",
        companyName: "TransAnt GmbH",
        addressLines: ["voestalpine-Straße 3", "4020 Linz, Austria"],
        phone: "+43 664 88324966",
        email: "office@transant.com",
      },
      legalLinks: [
        { label: copy.privacy, href: route("/privacy/") },
        { label: copy.imprint, href: route("/imprint/") },
      ],
      copyright: "© TransAnt GmbH",
      labels: copy.footerLabels,
    },
  };
}
