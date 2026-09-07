import tasDniprovagonmashLogo from "../../assets/images/innotrans-2026/tas-dniprovagonmash-logo.png";
import tasGroupLogo from "../../assets/images/innotrans-2026/tas-group-logo.svg";
import type { InnoTransPageProps } from "../../layouts/InnoTransPage.types";
import {
  createSiteLayout,
  localizedPath,
  type SiteLocale,
} from "./site-shell-view-model";

export const innoTransPageSlug = "innotrans-2026" as const;

const officialProfileUrl =
  "https://plus.innotrans.de/company/TransAnt-GmbH--1041453";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Messedamm%2022%2C%2014055%20Berlin%2C%20Germany";
const tasDniprovagonmashProfileUrl =
  "https://plus.innotrans.de/company/LIMITED-LIABILITY-COMPANY-TAS-DNIPROVAGONMASH--1226574";

const positions = [
  {
    code: "O5/55",
    url: "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__O5_55",
  },
  {
    code: "T5/50",
    url: "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_50",
  },
  {
    code: "T5/55",
    url: "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_55",
  },
  {
    code: "T5/60",
    url: "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_60",
  },
] as const;

interface InnoTransCopy {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly heroEyebrow: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly visitEyebrow: string;
  readonly visitTitle: string;
  readonly visitSummary: string;
  readonly dateLabel: string;
  readonly dateValue: string;
  readonly locationLabel: string;
  readonly locationValue: string;
  readonly mainDisplayLabel: string;
  readonly additionalPositionsLabel: string;
  readonly mainPositionRole: string;
  readonly additionalPositionRole: string;
  readonly profileAction: string;
  readonly directionsAction: string;
  readonly positionListLabel: string;
  readonly positionAction: (code: string) => string;
  readonly mapTitle: string;
  readonly mapCaption: string;
  readonly mapTrackLabel: string;
  readonly mapOutdoorLabel: string;
  readonly mapEntranceLabel: string;
  readonly partnersEyebrow: string;
  readonly partnersTitle: string;
  readonly partnersSummary: string;
  readonly tasGroupRole: string;
  readonly tasGroupDescription: string;
  readonly tasDniprovagonmashRole: string;
  readonly tasDniprovagonmashDescription: string;
  readonly partnerAction: string;
  readonly contactTitle: string;
  readonly contactSummary: string;
  readonly contactAction: string;
  readonly contactContext: string;
  readonly externalLabel: string;
}

const copyByLocale: Readonly<Record<SiteLocale, InnoTransCopy>> = {
  en: {
    metaTitle: "InnoTrans 2026",
    metaDescription:
      "Meet TransANT at InnoTrans 2026, 22–25 September at Messe Berlin, and find the four Outdoor Display positions.",
    heroEyebrow: "InnoTrans 2026 · Berlin",
    heroTitle: "Meet TransANT at InnoTrans 2026",
    heroDescription:
      "TransANT and TAS Group invite visitors to explore new freight-wagon developments in the Outdoor Display and discuss concrete rail-transport requirements.",
    visitEyebrow: "Plan your visit",
    visitTitle: "Four Outdoor Display positions",
    visitSummary:
      "The official InnoTrans profile lists one main display at O5/55 and three additional positions at T5/50, T5/55, and T5/60.",
    dateLabel: "Dates",
    dateValue: "22–25 September 2026",
    locationLabel: "Location",
    locationValue: "Messe Berlin · Outdoor Display",
    mainDisplayLabel: "Main display",
    additionalPositionsLabel: "Additional positions",
    mainPositionRole: "Main display",
    additionalPositionRole: "Additional position",
    profileAction: "View TransANT’s official profile",
    directionsAction: "Get directions to Messe Berlin",
    positionListLabel: "Official hall-plan links",
    positionAction: (code) => `Open ${code} in the official hall plan`,
    mapTitle: "Outdoor Display South",
    mapCaption: "Simplified orientation — not to scale",
    mapTrackLabel: "Track 5",
    mapOutdoorLabel: "Outdoor area",
    mapEntranceLabel: "South Entrance",
    partnersEyebrow: "Exhibiting partners",
    partnersTitle: "Meet the teams behind the display",
    partnersSummary:
      "Only the partner identities approved for this exhibition are shown here.",
    tasGroupRole: "Inviting partner",
    tasGroupDescription:
      "The event brief names TAS Group alongside TransANT for the InnoTrans 2026 invitation.",
    tasDniprovagonmashRole: "Exhibiting partner · Y25 bogie",
    tasDniprovagonmashDescription:
      "The event brief identifies a Y25 bogie manufactured by TAS Dniprovagonmash for the Outdoor Display.",
    partnerAction: "View official partner profile",
    contactTitle: "Arrange an InnoTrans meeting",
    contactSummary:
      "Share your cargo, route, and loading method so the TransANT commercial and engineering teams can prepare for the discussion.",
    contactAction: "Request a meeting",
    contactContext:
      "InnoTrans 2026 · 22–25 September 2026 · Messe Berlin Outdoor Display",
    externalLabel: " (opens in a new tab)",
  },
  de: {
    metaTitle: "InnoTrans 2026",
    metaDescription:
      "Treffen Sie TransANT vom 22. bis 25. September auf der InnoTrans 2026 in Berlin und finden Sie die vier Standorte im Freigelände.",
    heroEyebrow: "InnoTrans 2026 · Berlin",
    heroTitle: "Treffen Sie TransANT auf der InnoTrans 2026",
    heroDescription:
      "TransANT und die TAS Group laden Besucher ein, neue Güterwagenentwicklungen im Freigelände kennenzulernen und konkrete Schienentransportaufgaben zu besprechen.",
    visitEyebrow: "Besuch planen",
    visitTitle: "Vier Standorte im Freigelände",
    visitSummary:
      "Das offizielle InnoTrans-Profil nennt den Hauptstand O5/55 sowie die weiteren Standorte T5/50, T5/55 und T5/60.",
    dateLabel: "Termine",
    dateValue: "22.–25. September 2026",
    locationLabel: "Ort",
    locationValue: "Messe Berlin · Freigelände",
    mainDisplayLabel: "Hauptstand",
    additionalPositionsLabel: "Weitere Standorte",
    mainPositionRole: "Hauptstand",
    additionalPositionRole: "Weiterer Standort",
    profileAction: "Offizielles TransANT-Profil ansehen",
    directionsAction: "Route zur Messe Berlin",
    positionListLabel: "Links zum offiziellen Hallenplan",
    positionAction: (code) => `${code} im offiziellen Hallenplan öffnen`,
    mapTitle: "Freigelände Süd",
    mapCaption: "Vereinfachte Orientierung – nicht maßstabsgetreu",
    mapTrackLabel: "Gleis 5",
    mapOutdoorLabel: "Freigelände",
    mapEntranceLabel: "Eingang Süd",
    partnersEyebrow: "Ausstellungspartner",
    partnersTitle: "Treffen Sie die Teams hinter der Ausstellung",
    partnersSummary:
      "Hier werden ausschließlich die für diese Ausstellung freigegebenen Partner gezeigt.",
    tasGroupRole: "Einladender Partner",
    tasGroupDescription:
      "Das Veranstaltungskonzept nennt die TAS Group gemeinsam mit TransANT als Gastgeber der InnoTrans-2026-Einladung.",
    tasDniprovagonmashRole: "Ausstellungspartner · Y25-Drehgestell",
    tasDniprovagonmashDescription:
      "Das Veranstaltungskonzept nennt ein von TAS Dniprovagonmash gefertigtes Y25-Drehgestell für das Freigelände.",
    partnerAction: "Offizielles Partnerprofil ansehen",
    contactTitle: "InnoTrans-Termin vereinbaren",
    contactSummary:
      "Teilen Sie uns Ladung, Strecke und Beladeart mit, damit sich das Vertriebs- und Engineering-Team von TransANT auf das Gespräch vorbereiten kann.",
    contactAction: "Termin anfragen",
    contactContext:
      "InnoTrans 2026 · 22.–25. September 2026 · Messe Berlin, Freigelände",
    externalLabel: " (öffnet in einem neuen Tab)",
  },
  uk: {
    metaTitle: "InnoTrans 2026",
    metaDescription:
      "Зустріньтеся з TransANT на InnoTrans 2026 у Берліні 22–25 вересня та знайдіть чотири місця на відкритій експозиції.",
    heroEyebrow: "InnoTrans 2026 · Берлін",
    heroTitle: "Зустріньтеся з TransANT на InnoTrans 2026",
    heroDescription:
      "TransANT і TAS Group запрошують відвідувачів ознайомитися з новими розробками вантажних вагонів на відкритій експозиції та обговорити конкретні завдання залізничних перевезень.",
    visitEyebrow: "Сплануйте візит",
    visitTitle: "Чотири місця на відкритій експозиції",
    visitSummary:
      "Офіційний профіль InnoTrans вказує головне місце O5/55 і три додаткові місця: T5/50, T5/55 та T5/60.",
    dateLabel: "Дати",
    dateValue: "22–25 вересня 2026",
    locationLabel: "Місце",
    locationValue: "Messe Berlin · відкрита експозиція",
    mainDisplayLabel: "Головна експозиція",
    additionalPositionsLabel: "Додаткові місця",
    mainPositionRole: "Головна експозиція",
    additionalPositionRole: "Додаткове місце",
    profileAction: "Переглянути офіційний профіль TransANT",
    directionsAction: "Прокласти маршрут до Messe Berlin",
    positionListLabel: "Посилання на офіційний план",
    positionAction: (code) => `Відкрити ${code} на офіційному плані`,
    mapTitle: "Південна відкрита експозиція",
    mapCaption: "Спрощена схема — не в масштабі",
    mapTrackLabel: "Колія 5",
    mapOutdoorLabel: "Відкрита зона",
    mapEntranceLabel: "Південний вхід",
    partnersEyebrow: "Партнери експозиції",
    partnersTitle: "Познайомтеся з командами експозиції",
    partnersSummary:
      "Тут показано лише партнерів, погоджених для цієї виставки.",
    tasGroupRole: "Партнер-запрошувач",
    tasGroupDescription:
      "У концепції заходу TAS Group разом із TransANT зазначена як сторона, що запрошує на InnoTrans 2026.",
    tasDniprovagonmashRole: "Партнер експозиції · візок Y25",
    tasDniprovagonmashDescription:
      "У концепції заходу вказано візок Y25 виробництва TAS Dniprovagonmash для відкритої експозиції.",
    partnerAction: "Переглянути офіційний профіль партнера",
    contactTitle: "Запланувати зустріч на InnoTrans",
    contactSummary:
      "Повідомте про вантаж, маршрут і спосіб завантаження, щоб комерційна та інженерна команди TransANT підготувалися до розмови.",
    contactAction: "Запросити зустріч",
    contactContext:
      "InnoTrans 2026 · 22–25 вересня 2026 · Messe Berlin, відкрита експозиція",
    externalLabel: " (відкриється в новій вкладці)",
  },
  pl: {
    metaTitle: "InnoTrans 2026",
    metaDescription:
      "Spotkaj się z TransANT na InnoTrans 2026 w Berlinie w dniach 22–25 września i znajdź cztery stanowiska na ekspozycji plenerowej.",
    heroEyebrow: "InnoTrans 2026 · Berlin",
    heroTitle: "Spotkaj się z TransANT na InnoTrans 2026",
    heroDescription:
      "TransANT i TAS Group zapraszają do poznania nowych rozwiązań dla wagonów towarowych na ekspozycji plenerowej oraz omówienia konkretnych zadań transportu kolejowego.",
    visitEyebrow: "Zaplanuj wizytę",
    visitTitle: "Cztery stanowiska na ekspozycji plenerowej",
    visitSummary:
      "Oficjalny profil InnoTrans wskazuje główne stanowisko O5/55 oraz trzy dodatkowe: T5/50, T5/55 i T5/60.",
    dateLabel: "Daty",
    dateValue: "22–25 września 2026",
    locationLabel: "Miejsce",
    locationValue: "Messe Berlin · ekspozycja plenerowa",
    mainDisplayLabel: "Główne stanowisko",
    additionalPositionsLabel: "Dodatkowe stanowiska",
    mainPositionRole: "Główne stanowisko",
    additionalPositionRole: "Dodatkowe stanowisko",
    profileAction: "Zobacz oficjalny profil TransANT",
    directionsAction: "Wyznacz trasę do Messe Berlin",
    positionListLabel: "Linki do oficjalnego planu",
    positionAction: (code) => `Otwórz ${code} na oficjalnym planie`,
    mapTitle: "Południowa ekspozycja plenerowa",
    mapCaption: "Uproszczona orientacja — bez zachowania skali",
    mapTrackLabel: "Tor 5",
    mapOutdoorLabel: "Strefa plenerowa",
    mapEntranceLabel: "Wejście południowe",
    partnersEyebrow: "Partnerzy ekspozycji",
    partnersTitle: "Poznaj zespoły stojące za ekspozycją",
    partnersSummary:
      "Pokazujemy wyłącznie partnerów zatwierdzonych dla tej wystawy.",
    tasGroupRole: "Partner zapraszający",
    tasGroupDescription:
      "Koncepcja wydarzenia wskazuje TAS Group wraz z TransANT jako stronę zapraszającą na InnoTrans 2026.",
    tasDniprovagonmashRole: "Partner ekspozycji · wózek Y25",
    tasDniprovagonmashDescription:
      "Koncepcja wydarzenia wskazuje wózek Y25 wyprodukowany przez TAS Dniprovagonmash dla ekspozycji plenerowej.",
    partnerAction: "Zobacz oficjalny profil partnera",
    contactTitle: "Umów spotkanie na InnoTrans",
    contactSummary:
      "Przekaż informacje o ładunku, trasie i sposobie załadunku, aby zespół handlowy i inżynieryjny TransANT mógł przygotować się do rozmowy.",
    contactAction: "Poproś o spotkanie",
    contactContext:
      "InnoTrans 2026 · 22–25 września 2026 · Messe Berlin, ekspozycja plenerowa",
    externalLabel: " (otwiera się w nowej karcie)",
  },
  cs: {
    metaTitle: "InnoTrans 2026",
    metaDescription:
      "Setkejte se s TransANT na InnoTrans 2026 v Berlíně 22.–25. září a najděte čtyři stanoviště ve venkovní expozici.",
    heroEyebrow: "InnoTrans 2026 · Berlín",
    heroTitle: "Setkejte se s TransANT na InnoTrans 2026",
    heroDescription:
      "TransANT a TAS Group zvou návštěvníky k seznámení s novým vývojem nákladních vozů ve venkovní expozici a k projednání konkrétních úkolů železniční přepravy.",
    visitEyebrow: "Naplánujte si návštěvu",
    visitTitle: "Čtyři stanoviště ve venkovní expozici",
    visitSummary:
      "Oficiální profil InnoTrans uvádí hlavní expozici O5/55 a tři další pozice T5/50, T5/55 a T5/60.",
    dateLabel: "Termín",
    dateValue: "22.–25. září 2026",
    locationLabel: "Místo",
    locationValue: "Messe Berlin · venkovní expozice",
    mainDisplayLabel: "Hlavní expozice",
    additionalPositionsLabel: "Další pozice",
    mainPositionRole: "Hlavní expozice",
    additionalPositionRole: "Další pozice",
    profileAction: "Zobrazit oficiální profil TransANT",
    directionsAction: "Naplánovat trasu na Messe Berlin",
    positionListLabel: "Odkazy na oficiální plán",
    positionAction: (code) => `Otevřít ${code} v oficiálním plánu`,
    mapTitle: "Jižní venkovní expozice",
    mapCaption: "Zjednodušená orientace — není v měřítku",
    mapTrackLabel: "Kolej 5",
    mapOutdoorLabel: "Venkovní prostor",
    mapEntranceLabel: "Jižní vstup",
    partnersEyebrow: "Partneři expozice",
    partnersTitle: "Seznamte se s týmy expozice",
    partnersSummary: "Uvádíme pouze partnery schválené pro tuto výstavu.",
    tasGroupRole: "Zvouci partner",
    tasGroupDescription:
      "Koncept akce uvádí TAS Group spolu s TransANT jako zvoucí stranu pro InnoTrans 2026.",
    tasDniprovagonmashRole: "Partner expozice · podvozek Y25",
    tasDniprovagonmashDescription:
      "Koncept akce uvádí podvozek Y25 vyrobený společností TAS Dniprovagonmash pro venkovní expozici.",
    partnerAction: "Zobrazit oficiální profil partnera",
    contactTitle: "Domluvit schůzku na InnoTrans",
    contactSummary:
      "Sdělte nám náklad, trasu a způsob nakládky, aby se obchodní a technický tým TransANT mohl na rozhovor připravit.",
    contactAction: "Požádat o schůzku",
    contactContext:
      "InnoTrans 2026 · 22.–25. září 2026 · Messe Berlin, venkovní expozice",
    externalLabel: " (otevře se v nové kartě)",
  },
};

export function innoTransPageViewModel(
  locale: SiteLocale = "en",
): InnoTransPageProps {
  const copy = copyByLocale[locale];
  const route = (path: string) => localizedPath(locale, path);

  return {
    layout: createSiteLayout(
      copy.metaTitle,
      copy.metaDescription,
      `/${innoTransPageSlug}/`,
      locale,
    ),
    hero: {
      eyebrow: copy.heroEyebrow,
      title: copy.heroTitle,
      description: copy.heroDescription,
      headingLevel: 1,
      theme: "dark",
    },
    visit: {
      eyebrow: copy.visitEyebrow,
      title: copy.visitTitle,
      summary: copy.visitSummary,
      facts: [
        { label: copy.dateLabel, value: copy.dateValue },
        {
          label: copy.locationLabel,
          value: copy.locationValue,
        },
        { label: copy.mainDisplayLabel, value: "O5/55" },
        {
          label: copy.additionalPositionsLabel,
          value: "T5/50 · T5/55 · T5/60",
        },
      ],
      actions: [
        {
          kind: "link",
          label: copy.profileAction,
          href: officialProfileUrl,
          variant: "primary",
          size: "regular",
          icon: "arrow-right",
          external: true,
          externalLabel: copy.externalLabel,
        },
        {
          kind: "link",
          label: copy.directionsAction,
          href: directionsUrl,
          variant: "secondary",
          size: "regular",
          icon: "arrow-right",
          external: true,
          externalLabel: copy.externalLabel,
        },
      ],
      positions: positions.map((position, index) => ({
        code: position.code,
        role: index === 0 ? copy.mainPositionRole : copy.additionalPositionRole,
        action: {
          kind: "link" as const,
          label: copy.positionAction(position.code),
          href: position.url,
          variant: "text" as const,
          size: "compact" as const,
          icon: "arrow-right" as const,
          external: true,
          externalLabel: copy.externalLabel,
        },
      })),
      positionListLabel: copy.positionListLabel,
      map: {
        title: copy.mapTitle,
        caption: copy.mapCaption,
        trackLabel: copy.mapTrackLabel,
        outdoorLabel: copy.mapOutdoorLabel,
        entranceLabel: copy.mapEntranceLabel,
      },
    },
    partners: {
      eyebrow: copy.partnersEyebrow,
      title: copy.partnersTitle,
      summary: copy.partnersSummary,
      items: [
        {
          name: "TAS Group",
          role: copy.tasGroupRole,
          description: copy.tasGroupDescription,
          logo: tasGroupLogo,
          logoAlt: "TAS Group",
          action: {
            kind: "link",
            label: copy.partnerAction,
            href: "https://tas.ua/en/",
            variant: "text",
            size: "compact",
            icon: "arrow-right",
            external: true,
            externalLabel: copy.externalLabel,
          },
        },
        {
          name: "TAS Dniprovagonmash",
          role: copy.tasDniprovagonmashRole,
          description: copy.tasDniprovagonmashDescription,
          logo: tasDniprovagonmashLogo,
          logoAlt: "Dniprovagonmash · TAS Group",
          action: {
            kind: "link",
            label: copy.partnerAction,
            href: tasDniprovagonmashProfileUrl,
            variant: "text",
            size: "compact",
            icon: "arrow-right",
            external: true,
            externalLabel: copy.externalLabel,
          },
        },
      ],
    },
    contactCta: {
      title: copy.contactTitle,
      summary: copy.contactSummary,
      action: {
        label: copy.contactAction,
        href: route("/contact/"),
      },
      context: copy.contactContext,
      labels: {
        context: copy.contactContext,
        supportingNavigation: copy.contactTitle,
      },
    },
  };
}
