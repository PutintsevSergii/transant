import { technicalSheetFor } from "./print-catalogue";
import type { TechnicalSheetProps } from "../../components/product/TechnicalSheet/TechnicalSheet.types";
import type { BreadcrumbsProps } from "../../components/catalogue/Breadcrumbs/Breadcrumbs.types";
import type { ContactCTAProps } from "../../components/home/ContactCTA/ContactCTA.types";
import type { CargoFitProps } from "../../components/product/CargoFit/CargoFit.types";
import type { ProductHeroProps } from "../../components/product/ProductHero/ProductHero.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { catalogue, wagonMedia } from "./catalogue-data";
import { createSiteLayout, publicBaseUrl } from "./site-shell-view-model";

export interface ProductPageViewModel {
  readonly technicalSheet: TechnicalSheetProps;
  readonly layout: BaseLayoutProps;
  readonly breadcrumbs: BreadcrumbsProps;
  readonly hero: ProductHeroProps;
  readonly cargoFit: CargoFitProps;
  readonly contactCta: ContactCTAProps;
  readonly sectionNavigationLabel: string;
  readonly technicalDataLabel: string;
}

export const productRouteParams = catalogue.products.map((product) => ({
  family: product.familySlug,
  product: product.slug,
}));

function routeFor(family: string, product: string): string {
  return `/wagons/${family}/${product}/`;
}

/** Maps one validated source product to caller-owned page-component props. */
export function productPageViewModel(
  familySlug: string,
  productSlug: string,
): ProductPageViewModel {
  const product = catalogue.products.find(
    (candidate) =>
      candidate.familySlug === familySlug && candidate.slug === productSlug,
  );
  if (!product) {
    throw new Error(`Unknown product route ${familySlug}/${productSlug}.`);
  }

  const family = catalogue.families.find(
    (candidate) => candidate.slug === product.familySlug,
  );
  if (!family) {
    throw new Error(`Missing product family ${product.familySlug}.`);
  }

  const productHref = routeFor(product.familySlug, product.slug);
  const intro = product.intro[0];
  if (!intro) {
    throw new Error(`Product ${product.id} has no source introduction.`);
  }
  const source = product.technicalSource ?? product.source;
  const standardHeroFacts = product.specifications
    .filter((row) =>
      [
        "Wagon tare (t)",
        "Length over buffers (mm)",
        "Loading volume (m³)",
        "Tank capacity (m³)",
        "Vehicle gauge",
      ].includes(row.label),
    )
    .slice(0, 4)
    .map((specification) => ({
      ...specification,
      source,
    }));
  const heroFacts =
    product.id === "eamnos"
      ? [
          {
            label: "Distributed over the loading length",
            value: "70 t / 10 m",
            source,
          },
          {
            label: "Distributed on two points",
            value: "70 t / 6,5 m",
            source,
          },
          ...standardHeroFacts.filter(({ label }) =>
            ["Wagon tare (t)", "Loading volume (m³)"].includes(label),
          ),
        ]
      : standardHeroFacts;

  return {
    technicalSheet: technicalSheetFor(
      product.id,
      `${product.name} ${product.code}`,
    ),
    layout: createSiteLayout(
      `${product.name} ${product.code}`,
      product.tagline,
      productHref,
    ),
    breadcrumbs: {
      baseUrl: publicBaseUrl,
      items: [
        { label: "Home", href: "/" },
        { label: "Wagons", href: "/wagons/" },
        { label: family.name, href: `/wagons/${family.slug}/` },
        { label: `${product.name} ${product.code}`, href: productHref },
      ],
    },
    hero: {
      family: product.familyName,
      code: product.code,
      title: product.name,
      benefit: product.tagline,
      media: wagonMedia(product),
      facts: heroFacts,
      inquiryAction: { href: "/contact/", label: "Discuss this wagon" },
      inquiryContext: `${product.name} ${product.code}`,
    },
    cargoFit: {
      intro: {
        eyebrow: product.eyebrow,
        title: "Cargo and applications",
        description: intro,
        headingLevel: 2,
        align: "left",
        theme: "light",
        measure: "standard",
      },
      entries: product.commodities.map((label) => ({
        kind: "cargo" as const,
        label,
        publicationStatus: "approved" as const,
        source: product.source,
      })),
      labels: {
        cargo: "Cargo",
        application: "Application",
        empty:
          "Contact TransANT to discuss your cargo and loading requirements.",
      },
    },
    contactCta: {
      title: "Discuss this wagon",
      summary: "Tell us about your cargo, route, and loading requirements.",
      action: { href: "/contact/", label: "Contact TransANT" },
      context: `${product.name} ${product.code}`,
    },
    sectionNavigationLabel: "Product sections",
    technicalDataLabel: "Drawings & technical data",
  };
}
