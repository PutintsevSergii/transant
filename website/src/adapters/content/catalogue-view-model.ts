import type { BreadcrumbsProps } from "../../components/catalogue/Breadcrumbs/Breadcrumbs.types";
import type { WagonFamilyIndexProps } from "../../components/catalogue/WagonFamilyIndex/WagonFamilyIndex.types";
import type { WagonModelListProps } from "../../components/catalogue/WagonModelList/WagonModelList.types";
import type { PageHeroProps } from "../../components/editorial/PageHero/PageHero.types";
import type { PageMetaProps } from "../../components/editorial/PageMeta/PageMeta.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { catalogue, wagonMedia } from "./catalogue-data";
import { createSiteLayout, publicBaseUrl } from "./site-shell-view-model";

const catalog = catalogue;
const productsById = new Map(
  catalog.products.map((product) => [product.id, product]),
);

export interface CatalogueIndexViewModel {
  readonly layout: BaseLayoutProps;
  readonly pageMeta: PageMetaProps;
  readonly hero: PageHeroProps;
  readonly breadcrumbs: BreadcrumbsProps;
  readonly familyIndex: WagonFamilyIndexProps;
}

export interface CatalogueFamilyViewModel {
  readonly layout: BaseLayoutProps;
  readonly hero: PageHeroProps;
  readonly breadcrumbs: BreadcrumbsProps;
  readonly modelList: WagonModelListProps;
}

function catalogueBreadcrumbs(
  currentLabel: string,
  currentHref: string,
): BreadcrumbsProps {
  return {
    baseUrl: publicBaseUrl,
    items: [
      { label: "Home", href: "/" },
      { label: "Wagons", href: "/wagons/" },
      { label: currentLabel, href: currentHref },
    ],
  };
}

export const catalogueIndexViewModel: CatalogueIndexViewModel = {
  layout: createSiteLayout(
    "Freight wagon families",
    "Browse TransANT freight wagon families by the transport task they serve.",
    "/wagons/",
  ),
  pageMeta: {
    label: "Freight wagon catalogue",
    items: catalog.families.map((family) => family.name),
  },
  hero: {
    eyebrow: "Catalogue",
    title: "Freight wagons for every transport task",
    description: "Browse five wagon families and their available models.",
    headingLevel: 1,
    theme: "light",
  },
  breadcrumbs: {
    baseUrl: publicBaseUrl,
    items: [
      { label: "Home", href: "/" },
      { label: "Wagons", href: "/wagons/" },
    ],
  },
  familyIndex: {
    families: catalog.families.map((family, index) => {
      const representativeProductId = family.productIds[0];
      if (!representativeProductId) {
        throw new Error(`Catalogue family ${family.id} has no model.`);
      }

      return {
        id: family.id,
        sequence: String(index + 1).padStart(2, "0"),
        eyebrow: family.tag,
        title: family.name,
        summary: family.description,
        media: wagonMedia(productsById.get(representativeProductId)!),
        href: `/wagons/${family.slug}/`,
        linkLabel: `View ${family.name} wagons`,
        source: family.source,
      };
    }),
  },
};

export const catalogueFamilyViewModels: readonly CatalogueFamilyViewModel[] =
  catalog.families.map((family) => {
    const familyHref = `/wagons/${family.slug}/`;
    const models = family.productIds.map((productId) => {
      const product = productsById.get(productId);
      if (!product) {
        throw new Error(`Missing catalogue product ${productId}.`);
      }

      return {
        id: product.id,
        code: product.code,
        title: product.name,
        summary: product.tagline,
        detailLabel: "Source-listed cargo",
        details: product.commodities.slice(0, 3),
        href: `/wagons/${family.slug}/${product.slug}/`,
        linkLabel: `View ${product.name} ${product.code}`,
        source: product.source,
        media: wagonMedia(product),
      };
    });

    return {
      layout: createSiteLayout(
        `${family.name} wagon family`,
        family.description,
        familyHref,
      ),
      hero: {
        eyebrow: family.tag,
        title: `${family.name} wagons`,
        description: family.description,
        headingLevel: 1,
        theme: "light",
      },
      breadcrumbs: catalogueBreadcrumbs(family.name, familyHref),
      modelList: {
        family: {
          id: family.id,
          source: family.source,
        },
        models,
      },
    };
  });

export const catalogueFamilySlugs = catalog.families.map(
  (family) => family.slug,
);

export function catalogueFamilyViewModel(
  slug: string,
): CatalogueFamilyViewModel {
  const viewModel = catalogueFamilyViewModels.find(
    (candidate) =>
      candidate.breadcrumbs.items.at(-1)?.href === `/wagons/${slug}/`,
  );

  if (!viewModel) {
    throw new Error(`Unknown catalogue family ${slug}.`);
  }

  return viewModel;
}
