import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import type { ContactCTAProps } from "../../components/home/ContactCTA/ContactCTA.types";
import {
  createSiteLayout,
  localizedPath,
  type SiteLocale,
} from "./site-shell-view-model";
import { additionalLocaleCopy } from "./additional-locale-copy";
import { germanCopy } from "./german-homepage-view-model";

const copyByLocale: Readonly<
  Record<Exclude<SiteLocale, "en">, Readonly<Record<string, string>>>
> = {
  de: germanCopy,
  ...additionalLocaleCopy,
};

const contactCtaLabels: Readonly<
  Record<Exclude<SiteLocale, "en">, ContactCTAProps["labels"]>
> = {
  de: {
    context: "Anfragekontext",
    supportingNavigation: "Ähnliche Kontaktoptionen",
  },
  uk: {
    context: "Контекст запиту",
    supportingNavigation: "Пов’язані способи зв’язку",
  },
  pl: {
    context: "Kontekst zapytania",
    supportingNavigation: "Powiązane opcje kontaktu",
  },
  cs: {
    context: "Kontext poptávky",
    supportingNavigation: "Související možnosti kontaktu",
  },
};

const structuralStringKeys = new Set([
  "align",
  "fit",
  "icon",
  "kind",
  "mediaFocus",
  "mediaPosition",
  "measure",
  "publicationStatus",
  "spacing",
  "statementType",
  "theme",
  "type",
  "variant",
]);

export function translateLocalizedContent<T>(value: T, locale: SiteLocale): T {
  if (locale === "en") return value;
  const copy = copyByLocale[locale];

  const translateTree = (candidate: unknown, key?: string): unknown => {
    if (typeof candidate === "string") {
      if (key && structuralStringKeys.has(key)) return candidate;
      if (
        (key === "href" || key === "homeHref" || key === "currentPath") &&
        candidate.startsWith("/")
      ) {
        return localizedPath(locale, candidate);
      }
      const directTranslation = copy[candidate];
      if (directTranslation) return directTranslation;
      if (candidate.startsWith("Product catalogue · p. ")) {
        const page = candidate.slice("Product catalogue · p. ".length);
        if (locale === "uk") return `Каталог продукції · с. ${page}`;
        if (locale === "pl") return `Katalog produktów · s. ${page}`;
        if (locale === "cs") return `Katalog produktů · s. ${page}`;
      }
      if (candidate.endsWith(" wagon family")) {
        const family = candidate.slice(0, -" wagon family".length);
        const localizedFamily = copy[family] ?? family;
        if (locale === "uk") return `Сімейство вагонів: ${localizedFamily}`;
        if (locale === "pl") return `Rodzina wagonów: ${localizedFamily}`;
        if (locale === "cs") return `Řada vozů: ${localizedFamily}`;
      }
      if (candidate.endsWith(" wagons")) {
        const family = candidate.slice(0, -" wagons".length);
        const localizedFamily = copy[family] ?? family;
        if (locale === "uk") return `${localizedFamily} вагони`;
        if (locale === "pl") return `Wagony ${localizedFamily.toLowerCase()}`;
        if (locale === "cs") return `${localizedFamily} vozy`;
      }
      if (candidate.startsWith("Explore ")) {
        const subject = candidate.slice("Explore ".length);
        const localizedSubject = copy[subject] ?? subject;
        if (locale === "uk") return `Переглянути: ${localizedSubject}`;
        if (locale === "pl") return `Poznaj: ${localizedSubject}`;
        if (locale === "cs") return `Prohlédnout: ${localizedSubject}`;
      }
      if (candidate.startsWith("View ")) {
        const subject = candidate.slice(5);
        if (locale === "uk") return `Переглянути: ${subject}`;
        if (locale === "pl") return `Zobacz: ${subject}`;
        if (locale === "cs") return `Zobrazit: ${subject}`;
      }
      return candidate;
    }
    if (Array.isArray(candidate)) {
      return candidate.map((item) => translateTree(item));
    }
    if (candidate && typeof candidate === "object") {
      return Object.fromEntries(
        Object.entries(candidate).map(([entryKey, entryValue]) => [
          entryKey,
          translateTree(entryValue, entryKey),
        ]),
      );
    }
    return candidate;
  };

  return translateTree(value) as T;
}

export function localizeViewModel<T extends { layout: BaseLayoutProps }>(
  viewModel: T,
  locale: SiteLocale,
): T {
  if (locale === "en") return viewModel;

  const translated = translateLocalizedContent(viewModel, locale);
  const englishPath = localizedPath("en", viewModel.layout.header.currentPath);

  const localizedViewModel = {
    ...translated,
    layout: createSiteLayout(
      translated.layout.title,
      translated.layout.description,
      englishPath,
      locale,
      "prominent",
    ),
  } as T;

  if ("contactCta" in localizedViewModel && localizedViewModel.contactCta) {
    const contactCta = localizedViewModel.contactCta as ContactCTAProps;
    return {
      ...localizedViewModel,
      contactCta: {
        ...contactCta,
        labels: contactCtaLabels[locale],
      },
    } as T;
  }

  return {
    ...localizedViewModel,
  } as T;
}
