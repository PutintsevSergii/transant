import freightTrain from "../../assets/images/editorial/freight-train-in-operation.jpg";
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
import { createLocaleOptions } from "./site-shell-view-model";

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
    title: "Freight wagons for individual transport tasks",
    description:
      "The TransANT product catalogue presents intermodal, flat, timber, open-box, and tank wagons for defined transport tasks.",
    canonicalUrl: "https://www.transant.com/en/",
    header: {
      homeHref: "/",
      navigation: [
        { label: "Wagons", href: "/wagons/" },
        { label: "Technology", href: "/technology/" },
        { label: "Company", href: "/company/" },
      ],
      currentPath: "/",
      localeOptions: createLocaleOptions("/"),
      contactAction: { label: "Contact TransANT", href: "/contact/" },
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
            { label: "Technology", href: "/technology/" },
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
    eyebrow: "Rail freight engineering",
    title: [
      { text: "Wagons built for " },
      { text: "more useful", emphasis: true },
      { text: " payload." },
    ],
    summary:
      "Explore ten intermodal, flat, timber, open-box, and tank wagon configurations from the TransANT product catalogue.",
    primaryAction: {
      kind: "link",
      label: "Explore wagon families",
      href: "/wagons/",
      variant: "primary",
      icon: "arrow-right",
    },
    media: {
      image: freightTrain,
      alt: "Freight train travelling through a green landscape",
      sizes: "(min-width: 56rem) 52vw, 100vw",
      fit: "cover",
    },
  },
  innoTransEvent: {
    id: "innotrans-2026",
    eyebrow: "InnoTrans 2026 // International trade fair",
    title: "Meet TransANT in Berlin",
    summary:
      "Visit TransANT at InnoTrans 2026 and discuss the catalogue wagon range, loading configurations, and technical data for your transport task.",
    date: "22–25 September 2026",
    startDate: "2026-09-22",
    location: "Berlin · Messe Berlin",
    action: {
      kind: "link",
      label: "Visit us at InnoTrans",
      href: "https://plus.innotrans.de/company/TransAnt-GmbH--1041453",
      variant: "primary",
      external: true,
      externalLabel: " (opens in new tab)",
    },
    diagram: {
      routeLabel: "Linz // Berlin",
      highlightLabel: "TRANSANT · INNOTRANS 2026",
      origin: "Linz",
      destination: "Berlin",
      eventLabel: "InnoTrans 2026",
      companyLabel: "TransANT GmbH",
    },
  },
  payload: {
    intro: {
      eyebrow: "Product information",
      title: "Wagon data for a defined transport task",
      description:
        "The catalogue presents ten wagon configurations across five product families.",
      headingLevel: 2,
      align: "left",
      theme: "light",
      measure: "standard",
    },
    body: "Each model is described through its intended cargo, loading configuration, technical specifications, load limits, and special features.",
    sourceLink: { href: "/technology/", label: "Explore the technology" },
    principles: [
      {
        title: "Cargo and applications",
        description:
          "The catalogue lists typical commodities for each wagon model.",
      },
      {
        title: "Loading configuration",
        description:
          "Container pins, walls, stanchions, doors, and other equipment are specified by model.",
      },
      {
        title: "Technical specifications",
        description:
          "Dimensions, tare weight, load limits, vehicle gauge, and permitted speed are listed per wagon.",
      },
      {
        title: "Special features",
        description:
          "Available equipment and special features depend on the selected wagon model.",
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
      eyebrow: "Model selection",
      title: "From transport task to wagon specification",
      description:
        "Match the cargo and loading requirements with a catalogue model, then review its technical data and listed equipment.",
      headingLevel: 2,
      align: "left",
      theme: "light",
      measure: "wide",
    },
    stages: [
      {
        number: "01",
        title: "Transport task",
        description: "Start with the cargo and loading requirements.",
      },
      {
        number: "02",
        title: "Wagon model",
        description:
          "Select the wagon family and model for the intended transport task.",
      },
      {
        number: "03",
        title: "Technical data",
        description:
          "Review dimensions, tare weight, load limits, vehicle gauge, and permitted speed.",
      },
      {
        number: "04",
        title: "Special features",
        description:
          "Confirm the equipment and special features listed for the selected wagon.",
      },
    ],
    technicalLink: { href: "/technology/", label: "Review technical data" },
    sequenceLabel: "Wagon selection stages",
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
