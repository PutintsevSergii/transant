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
  "technology",
  "projects",
  "company",
  "quality",
  "sustainability",
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
const sustainabilitySource = {
  reference: "TransANT Sustainability",
  checkedAt: "2026-09-06",
  owner: "TransAnt GmbH",
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
  technology: {
    layout: createSiteLayout(
      "Freight wagon technology",
      "How TransANT combines a standardised lightweight platform, interchangeable cargo-specific superstructures, and configuration-led engineering.",
      "/technology/",
    ),
    hero: {
      eyebrow: "Freight wagon engineering",
      title: "Engineering begins with the operating requirement",
      description:
        "Cargo, route, loading method, terminal conditions, and the intended operation shape the platform, superstructure, and equipment.",
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
        eyebrow: "Platform architecture",
        title: "One platform concept, multiple configurations",
        description:
          "The standardised lightweight platform architecture is available in different lengths and loading gauges, providing the basis for industry- or customer-specific superstructures.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: intermodalWagon,
          alt: "TransANT intermodal platform wagon shown without a superstructure",
          sizes: "(min-width: 90rem) 80rem, 100vw",
          fit: "contain",
          aspectRatio: "16 / 7",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Interchangeable superstructures",
        title: "Adapt the body when logistics requirements change",
        description:
          "Common platform parts are used across variants. Industry- or customer-specific superstructures are paired with the platform for the intended cargo and can be exchanged; without a body, suitable platform wagons can be used for intermodal container transport.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Lightweight engineering",
        title: "Use material where the load requires it",
        description:
          "Topology optimisation places material along the load path, while high-strength fine-grained alform steel supports a lighter platform. Tare weight and payload remain specific to each wagon configuration.",
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
        eyebrow: "Configuration and readiness",
        title: "Confirm equipment and DAC readiness for the selected wagon",
        description:
          "Platform length, loading gauge, equipment, and readiness for digital automatic coupling depend on the model and intended operation. Applicable requirements and approvals must be confirmed for the selected configuration.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Engineering and delivery",
        title: "Move from requirements to approval and production",
        description:
          "Cargo, route, loading method, terminal technology, and customer requirements inform platform and body selection. Calculation, design, documentation, applicable homologation, and coordinated partner production follow.",
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
        { href: "/technology/", label: "Explore the technology" },
      ],
    },
  },
  company: {
    layout: createSiteLayout(
      "About TransAnt GmbH",
      "TransAnt GmbH is a Linz-based engineering company for European standard-gauge freight wagons.",
      "/company/",
    ),
    hero: {
      eyebrow: "Company",
      title:
        "Engineering freight wagons for the European standard-gauge market",
      description:
        "TransAnt GmbH develops, homologates, and distributes freight and tank wagons; manufacturing and supply are organised through a partner network.",
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
        "Freight wagon engineering",
        "Homologation and distribution",
        "Engineering and production partners",
        "Linz, Austria",
      ],
    },
    stories: [
      {
        eyebrow: "Partner model",
        title: "Engineering and production partners",
        description:
          "TransANT brings together the expertise of voestalpine Stahl GmbH, TAS Group, and ÖBB Rail Cargo Group. Manufacturing and supply are organised through a partner network.",
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
        { href: "/technology/", label: "Explore the technology" },
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
      supportingLinks: [
        { href: "/sustainability/", label: "Explore sustainability" },
      ],
    },
  },
  sustainability: {
    layout: createSiteLayout(
      "Sustainable freight wagons and greentec steel",
      "TransANT's official sustainability information on greentec steel editions, manufacturing-stage CO₂ savings, lightweight intermodal payload, and its April 2024 EcoVadis result.",
      "/sustainability/",
    ),
    pageMeta: {
      label: "Sustainable freight wagons",
      items: [
        "greentec steel",
        "Manufacturing-stage CO₂",
        "Lightweight intermodal payload",
        "Recyclable-material prototype",
        "EcoVadis April 2024",
      ],
    },
    hero: {
      eyebrow: "Sustainability",
      title: "Greentec steel for lighter freight wagons",
      description:
        "On request, TransANT offers its lightweight wagons in a greentec steel edition, combining rail transport, lightweight engineering, and CO₂-reduced steel.",
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
    stories: [
      {
        eyebrow: "Sustainable steel",
        title: "Support a lower-carbon supply chain",
        description:
          "TransANT presents the greentec steel edition as a way to secure certified CO₂ reduction, strengthen ESG performance, improve access to green loans, and offer more sustainable logistics solutions. Availability depends on the requested wagon configuration.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: bogieCloseup,
          alt: "Close view of a freight wagon bogie and underframe",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "16 / 10",
        },
        mediaPosition: "before",
      },
      {
        eyebrow: "Manufacturing, payload, and circular materials",
        title: "State the environmental benefit with its boundary",
        description:
          "For the cited 60-ft lightweight intermodal carrying wagon in greentec steel, TransANT reports three tonnes of CO₂ saved in manufacturing. It also attributes a 20% lighter underframe and four tonnes of higher payload to the cited intermodal wagon, reducing the trips needed for a fixed transport volume. Separately, TransANT describes joint work spanning rail infrastructure, wagon management, digitalisation, location, concept, and equipment for recyclable materials. The resulting lightweight-wagon prototype uses greentec steel for both the structure and platform.",
        headingLevel: 2,
        theme: "light",
        spacing: "generous-top",
        headingSize: "compact",
      },
    ],
    evidence: {
      labels: evidenceLabels,
      title: "Published sustainability figures",
      headingLevel: 2,
      variant: "section-label",
      source: sustainabilitySource,
      evidence: [
        {
          type: "factual-reference",
          title: "3 tonnes of manufacturing-stage CO₂ saved",
          summary:
            "Reported per cited 60-ft carrying wagon manufactured in the greentec steel edition.",
          publicationStatus: "approved",
          status: "Published by TransANT",
          date: "Source checked 6 September 2026",
          issuer: "TransAnt GmbH",
          scope:
            "Manufacturing phase; 60-ft carrying wagon; greentec steel edition",
          source: sustainabilitySource,
        },
        {
          type: "factual-reference",
          title: "20% lighter underframe and 4 tonnes higher payload",
          summary:
            "Reported for the cited TransANT lightweight intermodal wagon; the official page connects the higher payload with fewer trips.",
          publicationStatus: "approved",
          status: "Published by TransANT",
          date: "Source checked 6 September 2026",
          issuer: "TransAnt GmbH",
          scope:
            "Intermodal wagon comparison; the source does not name the comparison vehicle",
          source: sustainabilitySource,
        },
        {
          type: "factual-reference",
          title: "EcoVadis silver result",
          summary:
            "TransANT reports that its first EcoVadis assessment received silver and placed the company in the top 15% of its industry.",
          publicationStatus: "approved",
          status: "Historical result; current rating not claimed",
          date: "April 2024",
          issuer: "EcoVadis",
          scope: "First TransANT assessment",
          source: sustainabilitySource,
        },
      ],
    },
    contactCta: {
      title: "Discuss lower-carbon wagon options",
      summary:
        "Confirm greentec steel availability, the wagon configuration, and the evidence boundaries that matter to your transport task.",
      action: {
        href: "/contact/",
        label: "Discuss sustainability requirements",
      },
      supportingLinks: [{ href: "/quality/", label: "View certificates" }],
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
