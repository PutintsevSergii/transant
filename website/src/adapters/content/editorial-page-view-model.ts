import freightTrain from "../../assets/images/editorial/freight-train-in-operation.jpg";
import bogieCloseup from "../../assets/images/editorial/intermodal-wagon-bogie-closeup.jpg";
import wagonFleet from "../../assets/images/editorial/transant-wagon-fleet.png";
import flatWagon from "../../assets/images/products/flat/uno-flat-60ft-rens/wagon-render.png";
import intermodalWagon from "../../assets/images/products/intermodal/uno-intermodal-60ft-sgns/wagon-render.png";
import type { EvidenceListProps } from "../../components/editorial/EvidenceList/EvidenceList.types";
import type { MediaStoryProps } from "../../components/editorial/MediaStory/MediaStory.types";
import type { PageHeroProps } from "../../components/editorial/PageHero/PageHero.types";
import type { PageMetaProps } from "../../components/editorial/PageMeta/PageMeta.types";
import type { ContactCTAProps } from "../../components/home/ContactCTA/ContactCTA.types";
import type { OperationalCaseStudyProps } from "../../components/home/OperationalCaseStudy/OperationalCaseStudy.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { createSiteLayout } from "./site-shell-view-model";

export const editorialPageSlugs = [
  "engineering-services",
  "projects",
  "company",
  "quality",
] as const;

export type EditorialPageSlug = (typeof editorialPageSlugs)[number];

export interface EditorialPageViewModel {
  readonly layout: BaseLayoutProps;
  readonly hero: PageHeroProps;
  readonly pageMeta?: PageMetaProps;
  readonly stories: readonly MediaStoryProps[];
  readonly evidence?: EvidenceListProps;
  readonly caseStudy?: OperationalCaseStudyProps;
  readonly contactCta: ContactCTAProps;
}

const researchSource = {
  reference: "docs/public-company-research.md",
} as const;
const productPortfolioSource = {
  reference: "TransANT Product Portfolio",
} as const;
const evidenceLabels = {
  policy: "Policy",
  certification: "Certification",
  document: "Document",
  factualReference: "Factual reference",
  status: "Status",
  date: "Date",
  issuer: "Issuer",
  scope: "Scope",
  evidenceDetails: "evidence details",
  empty: "Contact TransANT for further information and documents.",
  externalNewTab: " (opens in new tab)",
} as const;

const editorialPages = {
  "engineering-services": {
    layout: createSiteLayout(
      "Engineering & Services",
      "Catalogue-grounded information about wagon configurations, loading equipment, dimensions, load limits, vehicle gauge, and operating data.",
      "/engineering-services/",
    ),
    hero: {
      eyebrow: "Product catalogue",
      title: "Start with the wagon model and its technical data",
      description:
        "Each catalogue model has its own intended cargo, loading configuration, dimensions, tare weight, load limits, vehicle gauge, and permitted speed.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: bogieCloseup,
        alt: "Close view of a freight wagon bogie and underframe",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "4 / 3",
      },
      mediaPosition: "after",
    },
    stories: [
      {
        eyebrow: "Wagon range",
        title: "Ten configurations across five wagon families",
        description:
          "The catalogue covers intermodal, flat, timber, open-box, and tank wagons. Every model entry identifies its typical commodities, key benefits, and technical specification.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: intermodalWagon,
          alt: "TransANT intermodal wagon shown in the product catalogue",
          sizes: "(min-width: 90rem) 80rem, 100vw",
          fit: "contain",
          aspectRatio: "16 / 7",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Loading configuration",
        title: "Review loading equipment for the selected model",
        description:
          "The catalogue records model-specific equipment such as container pins, side walls, stanchions, doors, loading schemes, and tank fittings. Availability must be confirmed for the selected wagon.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Mass and load limits",
        title: "Use the figures for the selected wagon configuration",
        description:
          "Tare weight, loading dimensions, loading volume, axle load, and load-limit values differ by model. The product pages reproduce the catalogue values without generalising them across the range.",
        headingLevel: 2,
        theme: "light",
        media: {
          image: flatWagon,
          alt: "TransANT flat wagon render showing its deck and structural frame",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "contain",
          aspectRatio: "16 / 9",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Operation data",
        title: "Check gauge, speed, curve radius, and equipment",
        description:
          "Vehicle gauge, permitted speed, minimum curve radius, brake equipment, and other operating details are listed per model and must be checked for the intended use.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Drawings and technical data",
        title: "Read the catalogue entry as one model-specific record",
        description:
          "Use the wagon render, technical drawings, specification tables, loading limits, and catalogue notes together. Any printed ambiguity remains visible and requires confirmation with TransANT.",
        headingLevel: 2,
        theme: "light",
        media: {
          image: freightTrain,
          alt: "Freight train travelling through a green landscape",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "16 / 10",
        },
        mediaPosition: "after",
      },
    ],
    contactCta: {
      title: "Discuss your wagon requirements",
      summary:
        "Bring the cargo, route, loading method, terminal conditions, and intended operation to the first technical conversation.",
      action: { href: "/contact/", label: "Discuss wagon requirements" },
      supportingLinks: [{ href: "/wagons/", label: "Browse wagon families" }],
    },
  },
  projects: {
    layout: createSiteLayout(
      "Freight wagon projects",
      "Explore the TransANT BulkBox application for ore transport between Erzberg and Linz.",
      "/projects/",
    ),
    hero: {
      eyebrow: "Projects and references",
      title: "BulkBox for Erzberg–Linz ore transport",
      description:
        "The TransANT Product Portfolio presents BulkBox for ore transport between Erzberg and Linz.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: freightTrain,
        alt: "Freight train travelling through a green landscape",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "16 / 10",
      },
      mediaPosition: "after",
    },
    stories: [
      {
        eyebrow: "Your transport task",
        title: "Discuss the requirements of your route",
        description:
          "Cargo, route, and loading conditions shape the wagon configuration. Contact TransANT to discuss the requirements of a comparable transport task.",
        headingLevel: 2,
        theme: "dark",
      },
    ],
    caseStudy: {
      eyebrow: "Ore transport",
      title: "Erzberg–Linz ore transport",
      summary:
        "The TransANT Product Portfolio describes the BulkBox application for ore transport between Erzberg and Linz, with potential savings of up to 100 train journeys per year for this application.",
      media: {
        image: freightTrain,
        alt: "Freight train travelling through a green landscape",
        sizes: "(min-width: 56rem) 56vw, 100vw",
        fit: "cover",
        aspectRatio: "16 / 10",
      },
      facts: [
        {
          label: "Route",
          value: "Erzberg–Linz",
          publicationStatus: "approved",
          source: productPortfolioSource,
        },
        {
          label: "Potential annual saving",
          value: "Up to 100 avoided train journeys per year",
          publicationStatus: "approved",
          source: productPortfolioSource,
        },
      ],
    },
    contactCta: {
      title: "Discuss a comparable transport task",
      summary:
        "A useful enquiry starts with the cargo, route, operating constraints, and the evidence needed for the proposed configuration.",
      action: { href: "/contact/", label: "Discuss a transport task" },
      supportingLinks: [
        {
          href: "/engineering-services/",
          label: "Explore Engineering & Services",
        },
      ],
    },
  },
  company: {
    layout: createSiteLayout(
      "About TransAnt GmbH",
      "TransAnt develops, markets and supports freight wagon solutions and coordinates their industrial implementation with qualified manufacturing partners.",
      "/company/",
    ),
    hero: {
      eyebrow: "Company",
      title: "About TransAnt GmbH",
      description:
        "TransAnt develops, markets and supports freight wagon solutions and coordinates their industrial implementation with qualified manufacturing partners.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: wagonFleet,
        alt: "Several TransANT freight wagons standing in a rail yard",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "16 / 10",
      },
      mediaPosition: "after",
    },
    pageMeta: {
      label: "TransAnt GmbH",
      items: [
        "Five wagon families",
        "Ten catalogue models",
        "Model-specific technical data",
        "Linz, Austria",
      ],
    },
    stories: [
      {
        eyebrow: "Product catalogue",
        title: "Model-specific information for transport requirements",
        description:
          "Each catalogue entry presents typical commodities, key benefits, technical specifications, load limits, and special features for one wagon model. Contact TransANT to discuss the relevant configuration for a transport task.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: bogieCloseup,
          alt: "Close view of a freight wagon bogie and underframe",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "before",
      },
    ],
    evidence: {
      labels: evidenceLabels,
      title: "Company information",
      headingLevel: 2,
      spacing: "compact",
      source: researchSource,
      evidence: [
        {
          type: "factual-reference",
          title: "TransAnt GmbH",
          summary:
            "An Austrian limited-liability company registered as FN 544665 d on 1 December 2020.",
          publicationStatus: "approved",
          source: researchSource,
        },
        {
          type: "factual-reference",
          title: "Linz, Austria",
          summary: "voestalpine-Straße 3, 4020 Linz, Austria.",
          publicationStatus: "approved",
          source: researchSource,
        },
      ],
    },
    contactCta: {
      title: "Talk with the TransANT team about a transport task",
      summary:
        "Contact TransANT with the technical and operational context that matters to the wagon decision.",
      action: { href: "/contact/", label: "Contact TransANT" },
      supportingLinks: [
        {
          href: "/engineering-services/",
          label: "Explore Engineering & Services",
        },
      ],
    },
  },
  quality: {
    layout: createSiteLayout(
      "Quality and certificates",
      "TransANT quality and welding certificates, with scope, issuer, and links to the documents.",
      "/quality/",
    ),
    hero: {
      eyebrow: "Quality",
      title: "Quality standards and certificates",
      description:
        "View the scope, issuer, and validity details of the quality management and railway vehicle welding certificates.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: bogieCloseup,
        alt: "Close view of a freight wagon bogie and underframe",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "4 / 3",
      },
      mediaPosition: "after",
    },
    stories: [
      {
        eyebrow: "Certification",
        title: "Quality management and railway vehicle welding",
        description:
          "ISO 9001:2015 covers the development, homologation, and distribution of freight and tank wagons. EN 15085-2 addresses railway vehicle and component welding. Open each certificate for its full scope and conditions.",
        headingLevel: 2,
        theme: "dark",
      },
    ],
    evidence: {
      labels: evidenceLabels,
      title: "Certificates",
      headingLevel: 2,
      source: researchSource,
      evidence: [
        {
          type: "certification",
          title: "ISO 9001:2015",
          summary:
            "Development, homologation, and distribution of freight and tank wagons.",
          publicationStatus: "approved",
          date: "Valid through 17 March 2028, subject to surveillance audits",
          issuer: "Quality Austria",
          scope: "Q7-32942/0",
          source: { reference: "ISO 9001 certificate" },
          action: {
            label: "Open ISO 9001 certificate",
            href: "https://www.transant.com/en/content/download/66638/file/EN%20ISO%209001_EN.PDF",
            type: "external",
          },
        },
        {
          type: "certification",
          title: "EN 15085-2",
          summary:
            "Railway vehicle and component welding certificate: classification level CL1 and activity types D and S.",
          publicationStatus: "approved",
          date: "Valid through 12 August 2028",
          issuer: "SCT Cert",
          scope: "250803.SCT",
          source: { reference: "EN 15085 certificate" },
          action: {
            label: "Open EN 15085 certificate",
            href: "https://www.transant.com/en/content/download/69222/file/EN15085_TransAnt%20GmbH_en.pdf",
            type: "external",
          },
        },
      ],
    },
    contactCta: {
      title: "Find the documentation for your project",
      summary:
        "Contact TransANT to discuss certificate scope or documentation for a particular wagon configuration.",
      action: { href: "/contact/", label: "Contact TransANT" },
    },
  },
} satisfies Record<EditorialPageSlug, EditorialPageViewModel>;

export function editorialPageViewModel(slug: string): EditorialPageViewModel {
  if (!isEditorialPageSlug(slug)) {
    throw new Error(`Unknown editorial page: ${slug}.`);
  }

  return editorialPages[slug];
}

export function isEditorialPageSlug(slug: string): slug is EditorialPageSlug {
  return editorialPageSlugs.includes(slug as EditorialPageSlug);
}
