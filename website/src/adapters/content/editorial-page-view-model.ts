import freightTrain from "../../assets/images/editorial/freight-train-in-operation.jpg";
import bogieCloseup from "../../assets/images/editorial/intermodal-wagon-bogie-closeup.jpg";
import companyEngineeringTeam from "../../assets/images/editorial/company-engineering-team.jpeg";
import companyProPlatform from "../../assets/images/editorial/company-pro-platform.jpg";
import companyUnoIntermodal from "../../assets/images/editorial/company-uno-intermodal.jpeg";
import companyWagonCoupling from "../../assets/images/editorial/company-wagon-coupling.jpg";
import companyWagonLogo from "../../assets/images/editorial/company-wagon-logo.jpg";
import type { EvidenceListProps } from "../../components/editorial/EvidenceList/EvidenceList.types";
import type { MediaStoryProps } from "../../components/editorial/MediaStory/MediaStory.types";
import type { PageHeroProps } from "../../components/editorial/PageHero/PageHero.types";
import type { PageMetaProps } from "../../components/editorial/PageMeta/PageMeta.types";
import type { ContactCTAProps } from "../../components/home/ContactCTA/ContactCTA.types";
import type { OperationalCaseStudyProps } from "../../components/home/OperationalCaseStudy/OperationalCaseStudy.types";
import type { LoadLimitTableProps } from "../../components/product/LoadLimitTable/LoadLimitTable.types";
import type { SpecificationGroupProps } from "../../components/product/SpecificationGroup/SpecificationGroup.types";
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
  readonly specifications?: SpecificationGroupProps;
  readonly loadLimits?: LoadLimitTableProps;
  readonly contactCta: ContactCTAProps;
}

const researchSource = {
  reference: "docs/public-company-research.md",
} as const;
const productPortfolioSource = {
  reference: "TransANT Product Portfolio",
} as const;
const proIntermodalSource = {
  reference: "PRO INTERMODAL 60 ft · 2026-09-08",
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
      "PRO INTERMODAL 60 ft",
      "A lightweight four-axle Sgns platform for 20, 30 and 40 ft ISO containers and specialised equipment.",
      "/engineering-services/",
    ),
    hero: {
      eyebrow: "PRO INTERMODAL 60 ft // Sgns",
      title: "Lightweight platform for heavy transport tasks",
      description:
        "PRO INTERMODAL 60 ft is a four-axle Sgns railway platform for 20, 30 and 40 ft ISO containers and for mounting specialised equipment.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: companyProPlatform,
        alt: "TransAnt PRO 60-foot platform wagon on track",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "3 / 2",
      },
      mediaPosition: "after",
    },
    pageMeta: {
      label: "PRO INTERMODAL 60 ft",
      items: [
        "Approx. 16 t base-platform tare",
        "Up to 4 t additional payload potential",
        "Up to 73.5 t payload on class D lines",
        "24 foldable container pins",
      ],
    },
    stories: [
      {
        eyebrow: "Lower tare — more payload",
        title: "Approximately 16 tonnes of base-platform tare",
        description:
          "High-strength alform® steel and a topologically optimised structure reduce the base platform’s tare to approximately 16 tonnes. Comparable conventional platforms weigh around 20 tonnes.",
        paragraphs: [
          "The tare difference can create capacity for up to four tonnes of additional cargo per wagon, provided that the railway line class, container or superstructure, and the other transport parameters permit it.",
          "Maximum payload reaches 73.5 tonnes on a class D line in the corresponding configuration. Actual payload depends on the route class, equipment mass, container characteristics, and selected loading scheme.",
        ],
        headingLevel: 2,
        theme: "dark",
      },
      {
        eyebrow: "High-strength lightweight structure",
        title: "Material placed where the frame carries the highest loads",
        description:
          "The load-bearing structure is made from high-strength alform® steel. Topological optimisation places material in the most highly loaded parts of the frame while reducing its tare.",
        items: [
          "Low tare mass",
          "High permissible axle load",
          "Container equipment can be installed",
          "Specialised equipment can be used",
          "Suitable for regular industrial transport",
          "Adaptable to a specific transport task",
        ],
        headingLevel: 2,
        theme: "light",
        media: {
          image: companyEngineeringTeam,
          alt: "TransAnt engineers working on wagon development",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Economic application",
        title: "When PRO creates a practical economic benefit",
        description:
          "The primary economically justified use case is regular transport of heavy cargo in both directions. When the platform is loaded outbound and inbound, its lower tare can be used throughout the transport cycle.",
        items: [
          "Suitable heavy cargo is available in both directions",
          "The route permits an axle load of up to 22.5 tonnes",
          "The container or specialised superstructure is rated for the corresponding mass",
          "Transport is regular or operates as a block-train service",
          "Additional payload can reduce the required number of wagons or journeys",
        ],
        paragraphs: [
          "PRO is not a universal solution for every transport operation. The economic result must be assessed for the specific cargo, route, and operating model.",
        ],
        headingLevel: 2,
        theme: "dark",
      },
      {
        eyebrow: "Removable ballast",
        title: "Required mass for empty running",
        description:
          "The base platform has a tare of approximately 16 tonnes, while the minimum permissible operating mass of an empty wagon should be around 16.5 tonnes, allowing for wheelset wear and subsequent wheel reprofiling. Special removable ballast provides the required mass.",
        paragraphs: [
          "The ballast can be removed when carrying heavy cargo, allowing the platform’s low tare to increase useful payload.",
          "The principal PRO benefit is achieved when the platform is loaded in both directions. Removable ballast should not be treated as a stand-alone economic benefit for services with a consistently empty return.",
        ],
        headingLevel: 2,
        theme: "light",
        media: {
          image: companyWagonCoupling,
          alt: "Freight wagon coupling and underframe",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Container transport",
        title: "Loading schemes for 20, 30 and 40 ft ISO containers",
        description:
          "PRO INTERMODAL 60 ft has 24 foldable container pins and supports different arrangements of 20, 30 and 40 ft ISO containers.",
        paragraphs: [
          "Transport planning must consider both wagon payload and the maximum permitted gross mass of each container. A standard container does not always allow the full additional four tonnes of platform payload to be used; heavy cargo may require a container or specialised transport superstructure rated for the higher mass.",
          "Container, cargo, and loading-scheme compatibility is checked for every project.",
        ],
        headingLevel: 2,
        theme: "dark",
      },
      {
        eyebrow: "Specialised equipment",
        title: "A lightweight carrier for project-specific systems",
        description:
          "The platform can serve not only intermodal transport but also as a carrier for specialised technological equipment. The low frame mass leaves more allowance for equipment, working systems, and payload within the wagon’s permitted gross mass.",
        paragraphs: [
          "The structure and attachment points for specialised equipment are developed to the requirements of the specific project.",
        ],
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Confirmed operation",
        title: "Three PRO 60 ft platforms are already in service",
        description:
          "Three PRO 60 ft platforms have been manufactured, sold, and placed in operation, including platforms carrying specialised equipment.",
        paragraphs: [
          "This is a practically implemented railway platform rather than an experimental concept. It can be used for intermodal and specialised transport solutions.",
          "Production is organised with qualified manufacturing partners. TransAnt performs the technical development, configuration coordination, and project support.",
        ],
        headingLevel: 2,
        theme: "dark",
      },
    ],
    specifications: {
      title: "Technical specifications",
      headingLevel: 2,
      source: proIntermodalSource,
      rows: [
        { label: "Wagon designation", value: "Sgns" },
        { label: "Number of axles", value: "4" },
        { label: "Bogie type", value: "Y25 with compact brake system" },
        { label: "Distance between bogie pivots", value: "14,200", unit: "mm" },
        {
          label: "Length over buffers",
          value: "19,740 mm with A-buffers / 19,830 mm with L-buffers",
        },
        { label: "Loading length", value: "18,500", unit: "mm" },
        { label: "Loading width", value: "2,380", unit: "mm" },
        { label: "Loading-surface height", value: "1,155", unit: "mm" },
        { label: "Base-platform tare", value: "approx. 16.0", unit: "t" },
        {
          label: "Intermodal configuration mass",
          value: "approx. 16.3",
          unit: "t",
        },
        {
          label: "Operating mass with removable ballast",
          value: "approx. 16.5",
          unit: "t",
        },
        { label: "Maximum axle load", value: "22.5", unit: "t" },
        { label: "Maximum payload", value: "up to 73.5", unit: "t" },
        { label: "Container equipment", value: "24 foldable container pins" },
        { label: "Supported containers", value: "20, 30 and 40 ft" },
        { label: "Vehicle gauge", value: "G1" },
        { label: "Minimum curve radius", value: "75", unit: "m" },
        { label: "Maximum operating speed", value: "120", unit: "km/h" },
        { label: "Maximum brake-related speed", value: "100", unit: "km/h" },
      ],
    },
    loadLimits: {
      title: "Permitted payload by line class",
      headingLevel: 2,
      caption: "PRO INTERMODAL 60 ft payload by railway line class",
      source: proIntermodalSource,
      columns: {
        routeClass: "Line class",
        payload: "Payload",
        payloadUnit: "t",
      },
      scrollHint: "Scroll table horizontally",
      scrollRegionLabel: "PRO INTERMODAL 60 ft payload table",
      notesLabel: "Load limit notes",
      rows: [
        { routeClass: "A", payload: "47.5" },
        { routeClass: "B", payload: "55.5" },
        { routeClass: "C", payload: "65.5" },
        { routeClass: "D", payload: "73.5" },
      ],
      notes: [
        "The values apply to the stated platform configuration. Final parameters are confirmed for the installed equipment, container arrangement, and operating conditions.",
      ],
    },
    contactCta: {
      title: "Discuss your transport operation",
      summary:
        "To assess the practical benefit of PRO 60 ft, TransAnt considers the cargo, loading in both directions, containers or equipment, permitted route loads, annual transport volume, and loading and unloading requirements.",
      action: { href: "/contact/", label: "Enquire about PRO 60 ft" },
      supportingLinks: [{ href: "/wagons/", label: "View wagons" }],
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
          label: "Explore PRO platform projects",
        },
      ],
    },
  },
  company: {
    layout: createSiteLayout(
      "Engineering solutions for European rail freight",
      "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020. We develop, market, and support freight-wagon solutions for Europe's standard-gauge network.",
      "/company/",
    ),
    hero: {
      eyebrow: "Company",
      title: "Engineering solutions for European rail freight",
      description:
        "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020. We develop, market, and support freight-wagon solutions for Europe's standard-gauge network.",
      headingLevel: 1,
      theme: "light",
      media: {
        image: companyWagonLogo,
        alt: "TransAnt lettering on a red freight wagon",
        sizes: "(min-width: 62rem) 50vw, 100vw",
        fit: "cover",
        aspectRatio: "3 / 2",
        preserveNaturalAspectRatio: true,
      },
      mediaPosition: "after",
    },
    pageMeta: {
      label: "TransAnt GmbH",
      items: [
        "Founded in Linz in 2020",
        "Austrian TAS Group company",
        "European standard-gauge network",
        "One coordinated project team",
      ],
    },
    stories: [
      {
        eyebrow: "From transport task to wagon solution",
        title: "The transport task defines the wagon configuration",
        description:
          "We begin with cargo, routes, axle loads, vehicle gauge, loading and unloading methods, terminal infrastructure, operating intensity, and the requirements of operators and wagon owners. This determines the wagon configuration.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: companyWagonCoupling,
          alt: "Freight wagon coupling and underframe",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "before",
      },
      {
        eyebrow: "What TransAnt does",
        title: "From concept to technical support",
        description:
          "TransAnt brings together transport-task analysis, concepts and configuration, design and optimisation, testing and certification, preparation for industrial implementation, sales, and technical support.",
        headingLevel: 2,
        theme: "light",
        media: {
          image: companyEngineeringTeam,
          alt: "TransAnt engineers working on wagon development",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "after",
      },
      {
        eyebrow: "Engineering approach",
        title: "Technical decisions with a practical purpose",
        description:
          "Each decision considers payload, tare mass, loading method, usable loading length and volume, cargo-specific adaptation, operating limits, and the economic efficiency of the transport process.",
        headingLevel: 2,
        theme: "dark",
      },
      {
        eyebrow: "Competences in one project",
        title: "A coordinated engineering and commercial team",
        description:
          "Design and calculations, modelling, certification and conformity, quality, welding and technical documentation, project management, procurement and suppliers, sales, and customer support work as one coordinated team from concept to delivered wagon.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Quality at every stage",
        title: "Quality begins before manufacturing",
        description:
          "Quality work starts with requirements, calculations, and documentation. Controls cover documents, components, manufacture, testing, and non-conformities; the system is confirmed by ISO 9001, EN 15085, and IQNET.",
        headingLevel: 2,
        theme: "dark",
        action: { href: "/quality/", label: "View Quality & Certificates" },
      },
      {
        eyebrow: "Part of TAS Group",
        title: "European coordination with group capabilities",
        description:
          "Within TAS Group—a group focused on wagon manufacturing, industrial solutions, and rail logistics—TransAnt is the European engineering and commercial coordinator linking clients, certification bodies, and industrial partners. The customer works with one contact and coordinated project management.",
        headingLevel: 2,
        theme: "light",
      },
      {
        eyebrow: "Product development",
        title: "Implemented PRO projects for 60-foot platforms",
        description:
          "TransAnt’s experience includes implemented lightweight 60-foot platform-wagon projects in the PRO family, using special structural solutions and high-strength steel.",
        headingLevel: 2,
        theme: "dark",
        media: {
          image: companyProPlatform,
          alt: "TransAnt PRO 60-foot platform wagon on track",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "3 / 2",
        },
        mediaPosition: "before",
        action: {
          href: "/engineering-services/",
          label: "Explore PRO platform projects",
        },
      },
      {
        eyebrow: "UNO range",
        title: "Wagons for current transport tasks",
        description:
          "The UNO range covers intermodal transport, metal, timber, bulk cargo, and liquids. Visit the wagon range for model-specific data.",
        headingLevel: 2,
        theme: "light",
        media: {
          image: companyUnoIntermodal,
          alt: "TransAnt UNO intermodal wagon being transported by road",
          sizes: "(min-width: 58rem) 50vw, 100vw",
          fit: "cover",
          aspectRatio: "4 / 3",
        },
        mediaPosition: "after",
        action: { href: "/wagons/", label: "View wagons" },
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
      title: "Discuss your transport task",
      summary:
        "The right solution begins with the cargo, route, operating process, and technical requirements.",
      action: { href: "/contact/", label: "Contact TransANT" },
      supportingLinks: [
        {
          href: "/wagons/",
          label: "View wagons",
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
