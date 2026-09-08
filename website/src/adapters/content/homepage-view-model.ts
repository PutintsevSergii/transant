import transantWagonLogo from "../../assets/images/editorial/transant-wagon-logo-red.jpg";
import flatWagon from "../../assets/images/products/flat/uno-flat-60ft-rens/wagon-render.png";
import intermodalWagon from "../../assets/images/products/intermodal/uno-intermodal-60ft-sgns/wagon-render.png";
import openBoxWagon from "../../assets/images/products/open-box/uno-multi-40ft-eanos/wagon-render.png";
import tankWagon from "../../assets/images/products/tank/uno-tank-88m3-zacns/wagon-render.png";
import timberWagon from "../../assets/images/products/timber/uno-timber-60ft-snps/wagon-render.png";
import type { ContactCTAProps } from "../../components/home/ContactCTA/ContactCTA.types";
import type { HomeHeroProps } from "../../components/home/HomeHero/HomeHero.types";
import type { InnoTransEventProps } from "../../components/home/InnoTransEvent/InnoTransEvent.types";
import type { PageMetaProps } from "../../components/editorial/PageMeta/PageMeta.types";
import type { ModularPlatformSectionProps } from "../../components/home/ModularPlatformSection/ModularPlatformSection.types";
import type { PayloadValueSectionProps } from "../../components/home/PayloadValueSection/PayloadValueSection.types";
import type { QualityImpactSectionProps } from "../../components/home/QualityImpactSection/QualityImpactSection.types";
import type { WagonSwitchyardProps } from "../../components/home/WagonSwitchyard/WagonSwitchyard.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import {
  createLocaleOptions,
  createPrimaryNavigation,
} from "./site-shell-view-model";

/**
 * Route-owned presentation data for the release-one homepage. It preserves
 * catalogue strings and attaches public-research provenance at the section
 * boundary; components remain content-store and route agnostic.
 */
export interface HomepageViewModel {
  readonly layout: BaseLayoutProps;
  readonly pageMeta: PageMetaProps;
  readonly hero: HomeHeroProps;
  readonly innoTransEvent: InnoTransEventProps;
  readonly payload: PayloadValueSectionProps;
  readonly switchyard: WagonSwitchyardProps;
  readonly platform: ModularPlatformSectionProps;
  readonly qualityImpact: QualityImpactSectionProps;
  readonly contactCta: ContactCTAProps;
}

const publicResearchSource = "docs/public-company-research.md";

export const homepageViewModel = {
  layout: {
    language: "en",
    title: "Engineering solutions for European rail freight",
    description:
      "TransAnt develops, markets and supports freight wagon solutions and coordinates their industrial implementation with qualified manufacturing partners.",
    canonicalUrl: "https://www.transant.com/en/",
    header: {
      homeHref: "/",
      navigation: createPrimaryNavigation("/"),
      currentPath: "/",
      localeOptions: createLocaleOptions("/"),
      contactAction: { label: "Contact TransANT", href: "/contact/" },
      logoScale: "prominent",
      sticky: true,
    },
    footer: {
      groups: [
        {
          heading: "Wagons",
          links: [
            { label: "Intermodal", href: "/wagons/intermodal/" },
            { label: "Flat", href: "/wagons/flat/" },
            { label: "Timber", href: "/wagons/timber/" },
            { label: "Multi / Open box", href: "/wagons/open-box/" },
            { label: "Tank", href: "/wagons/tank/" },
          ],
        },
        {
          heading: "Expertise",
          links: [
            {
              label: "PRO platform projects",
              href: "/engineering-services/",
            },
            { label: "Projects", href: "/projects/" },
            { label: "Quality and certificates", href: "/quality/" },
            { label: "Company", href: "/company/" },
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
        { label: "Privacy", href: "/privacy/" },
        { label: "Imprint", href: "/imprint/" },
      ],
      copyright: "© TransAnt GmbH",
    },
  },
  pageMeta: {
    label: "Freight wagon engineering",
    items: [
      "Engineering value",
      "Wagon families",
      "Model specifications",
      "Quality and certification",
      "Transport requirements",
    ],
  },
  hero: {
    eyebrow: "TransAnt GmbH // Linz, Austria",
    title: [
      { text: "Engineering solutions for " },
      { text: "European rail freight.", emphasis: true },
    ],
    summary:
      "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020. We develop, market and support freight-wagon solutions for Europe’s standard-gauge network, coordinating requirements, engineering, certification and industrial delivery.",
    primaryAction: {
      kind: "link",
      label: "Explore wagons",
      href: "/wagons/",
      variant: "primary",
      icon: "arrow-right",
    },
    secondaryLink: {
      kind: "link",
      label: "About TransAnt",
      href: "/company/",
      variant: "secondary",
      icon: "arrow-right",
    },
    media: {
      image: transantWagonLogo,
      alt: "The TransANT name cut into the red frame of a freight wagon",
      sizes: "(min-width: 56rem) 52vw, 100vw",
      fit: "contain",
      aspectRatio: "3 / 2",
    },
    mediaFocus: "center",
  },
  innoTransEvent: {
    id: "innotrans-2026",
    eyebrow: "InnoTrans 2026 // International trade fair",
    title: "Meet TransANT in Berlin",
    summary:
      "Visit TransANT at InnoTrans 2026 and discuss the catalogue wagon range, loading configurations, and technical data for your transport task.",
    date: "22–25 September 2026",
    startDate: "2026-09-22",
    location: "Messe Berlin · Outdoor Display",
    action: {
      kind: "link",
      label: "Visit us at InnoTrans",
      href: "https://plus.innotrans.de/company/TransAnt-GmbH--1041453",
      variant: "primary",
      external: true,
      externalLabel: " (opens in new tab)",
    },
    standLocations: {
      eyebrow: "Outdoor Display positions",
      title: "Find TransANT at four positions",
      navigationLabel: "Official InnoTrans hall-plan links",
      items: [
        {
          code: "O5/55",
          role: "Main display",
          action: {
            kind: "link",
            label: "Open O5/55 in the official hall plan",
            href: "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__O5_55",
            variant: "text",
            size: "compact",
            icon: "arrow-right",
            external: true,
            externalLabel: " (opens in new tab)",
          },
        },
        ...[
          ["T5/50", "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_50"],
          ["T5/55", "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_55"],
          ["T5/60", "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_60"],
        ].map(([code, href]) => ({
          code: code!,
          role: "Additional position",
          action: {
            kind: "link" as const,
            label: `Open ${code} in the official hall plan`,
            href: href!,
            variant: "text" as const,
            size: "compact" as const,
            icon: "arrow-right" as const,
            external: true,
            externalLabel: " (opens in new tab)",
          },
        })),
      ],
    },
  },
  payload: {
    intro: {
      eyebrow: "PRO INTERMODAL 60 ft",
      title: "Lightweight platform for heavy transport tasks",
      description:
        "A four-axle Sgns platform for 20, 30 and 40 ft ISO containers and specialised equipment, built from high-strength alform® steel with a topologically optimised frame.",
      headingLevel: 2,
      align: "left",
      theme: "light",
      measure: "standard",
    },
    body: "With a base-platform tare of approximately 16 tonnes, PRO can provide capacity for up to four tonnes of additional cargo compared with a conventional platform of around 20 tonnes, when the route, container or superstructure, and loading scheme permit it.",
    sourceLink: {
      href: "/engineering-services/",
      label: "Enquire about PRO 60 ft",
      variant: "primary",
    },
    principles: [
      {
        title: "Approx. 16 tonnes",
        description: "Base-platform tare without removable ballast.",
      },
      {
        title: "Up to 4 tonnes",
        description:
          "Potential additional payload compared with conventional platforms weighing around 20 tonnes.",
      },
      {
        title: "Up to 73.5 tonnes",
        description:
          "Maximum payload on a class D line in the corresponding configuration.",
      },
    ],
  },
  switchyard: {
    id: "homepage-wagon-switchyard",
    eyebrow: "Wagon families",
    heading: "Five families. Engineered around the load.",
    summary:
      "From containers and steel to timber, bulk materials and liquids, each TransANT wagon family is developed around a specific transport task.",
    selectionLabel: "Choose by transport task",
    selectionAriaLabel: "Wagon families",
    supportingCopy: [
      "Matching wagon families to cargo and loading needs.",
      "Compare configurations on each family page.",
    ],
    families: [
      {
        id: "intermodal",
        sequence: "01",
        familyName: "Intermodal",
        modelCode: "Sgns(s)",
        headline: "Containers & swap bodies",
        summary:
          "Intermodal wagons for flexible transport of 20/30/40ft ISO containers and swap bodies, with multiple loading configurations.",
        image: intermodalWagon,
        href: "/wagons/intermodal/",
        linkLabel: "Explore Intermodal",
        technicalLabel: "20/30/40ft ISO containers and swap bodies",
      },
      {
        id: "flat",
        sequence: "02",
        familyName: "Flat",
        modelCode: "Rens",
        headline: "Steel & long cargo",
        summary:
          "Versatile flat wagons with foldable side walls, swivel stanchions and robust wooden floors for steel, construction materials and long, bulky or project cargo.",
        image: flatWagon,
        href: "/wagons/flat/",
        linkLabel: "Explore Flat",
        technicalLabel: "Foldable side walls and swivel stanchions",
      },
      {
        id: "timber",
        sequence: "03",
        familyName: "Timber",
        modelCode: "Snps",
        headline: "Roundwood & timber",
        summary:
          "High-capacity timber wagons engineered for 3, 4 and 5 m logs, with optimized stanchions that retain roundwood securely without additional tying.",
        image: timberWagon,
        href: "/wagons/timber/",
        linkLabel: "Explore Timber",
        technicalLabel: "3, 4 and 5 m logs",
      },
      {
        id: "open-box",
        sequence: "04",
        familyName: "Multi / Open box",
        modelCode: "Eanos",
        headline: "Scrap & bulk materials",
        summary:
          "High-wall open-box wagons from 33 to 56 ft, with an exceptional payload-to-tare ratio and full-length side doors for fast, flexible loading of scrap and bulk.",
        image: openBoxWagon,
        href: "/wagons/open-box/",
        linkLabel: "Explore Multi / Open box",
      },
      {
        id: "tank",
        sequence: "05",
        familyName: "Tank",
        modelCode: "Zacns",
        headline: "Liquid chemicals & fuels",
        summary:
          "High-capacity tank wagons for chemical, petrochemical and petroleum products, engineered to RID, TSI, GCU, EN and UIC requirements.",
        image: tankWagon,
        href: "/wagons/tank/",
        linkLabel: "Explore Tank",
        technicalLabel: "Chemical, petrochemical and petroleum products",
      },
    ],
  },
  platform: {
    intro: {
      eyebrow: "How TransAnt works",
      title: "From transport task to delivered wagon",
      description:
        "Work on a wagon starts not with choosing a standard model, but with understanding the real transport task. We analyse the cargo carried, routes, permissible axle loads, gauges, loading and unloading methods, terminal infrastructure, operating intensity, and the requirements of the future owner or operator. Based on this information, TransAnt identifies a suitable wagon configuration or develops a solution adapted to the specific operating conditions.",
      headingLevel: 2,
      align: "left",
      theme: "light",
      measure: "wide",
    },
    stages: [
      {
        number: "01",
        title: "Analyse the transport task",
        description:
          "We assess cargo, volumes, routes, infrastructure constraints, loading and unloading, and the customer’s operating requirements.",
      },
      {
        number: "02",
        title: "Define the concept",
        description:
          "We select the wagon type, core parameters, loading scheme, equipment and configuration for the intended use.",
      },
      {
        number: "03",
        title: "Engineer and approve",
        description:
          "Design, calculations, modelling, load verification, technical documentation, prototype testing and conformity assessment prepare the solution for the European market.",
      },
      {
        number: "04",
        title: "Coordinate delivery",
        description:
          "TransAnt aligns qualified manufacturing partners, production preparation, wagon delivery and ongoing technical support.",
      },
    ],
    technicalLink: {
      href: "/wagons/",
      label: "View all wagons",
      variant: "primary",
    },
    sequenceLabel: "TransAnt project stages",
  },
  qualityImpact: {
    labels: {
      certification: "certification",
      policy: "policy",
      capability: "capability",
      target: "target",
      marketingStatement: "marketing statement",
      certificate: "Certificate",
      issuer: "Issuer",
      scope: "Scope",
      evidence: "evidence",
      externalNewTab: " (opens in new tab)",
    },
    intro: {
      eyebrow: "Quality and certification",
      title: "Quality standards and certificates",
      description:
        "View the certificate details for quality management and railway vehicle welding.",
      headingLevel: 2,
      align: "left",
      theme: "light",
      measure: "standard",
    },
    topics: [
      {
        statementType: "certification",
        title: "ISO 9001:2015",
        summary:
          "The documented scope covers development, homologation, and distribution of freight and tank wagons.",
        publicationStatus: "approved",
        source: { reference: publicResearchSource },
        certificate: {
          identifier: "Q7-32942/0",
          issuer: "Quality Austria",
          scope:
            "Development, homologation, and distribution of freight and tank wagons.",
          source: { reference: "ISO 9001 certificate" },
        },
        evidenceLinks: [
          {
            label: "Open ISO 9001 certificate",
            href: "https://www.transant.com/en/content/download/66638/file/EN%20ISO%209001_EN.PDF",
            type: "external",
            source: { reference: "ISO 9001 certificate" },
          },
        ],
      },
      {
        statementType: "certification",
        title: "EN 15085-2",
        summary:
          "The documented certificate identifies classification level CL1 and activity types D and S.",
        publicationStatus: "approved",
        source: { reference: publicResearchSource },
        certificate: {
          identifier: "250803.SCT",
          issuer: "SCT Cert",
          scope:
            "EN 15085-2:2020+A1:2023, classification level CL1; activity types D and S.",
          source: { reference: "EN 15085 certificate" },
        },
        evidenceLinks: [
          {
            label: "Open EN 15085 certificate",
            href: "https://www.transant.com/en/content/download/69222/file/EN15085_TransAnt%20GmbH_en.pdf",
            type: "external",
            source: { reference: "EN 15085 certificate" },
          },
        ],
      },
    ],
  },
  contactCta: {
    title: "Discuss your transport requirements",
    summary:
      "Start with the cargo, route, and operating requirement so the next conversation has a useful technical context.",
    action: { href: "/contact/", label: "Contact TransANT" },
    supportingLinks: [
      { href: "/wagons/", label: "Explore wagon families" },
      { href: "/company/", label: "Learn about TransANT" },
    ],
  },
} satisfies HomepageViewModel;
