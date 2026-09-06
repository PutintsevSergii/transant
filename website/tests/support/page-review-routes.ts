export interface PageReviewRoute {
  readonly id: string;
  readonly fixtureRoute: string;
  readonly visual: boolean;
  readonly technicalTable?: boolean;
}

const products = [
  ["intermodal", "uno-intermodal-60ft-sgns"],
  ["flat", "uno-flat-60ft-rens"],
  ["flat", "uno-flat-60ft-relns"],
  ["flat", "uno-flat-60ft-rns"],
  ["timber", "uno-timber-60ft-rnoos"],
  ["timber", "uno-timber-60ft-snps"],
  ["open-box", "uno-multibox-33ft-eamnos"],
  ["open-box", "uno-multi-40ft-eanos"],
  ["open-box", "uno-multi-56ft-eanos"],
  ["tank", "uno-tank-88m3-zacns"],
] as const;

/**
 * The I-002 review matrix keeps every release page in the automated compact
 * containment pass and identifies the deliberately selected full-page visual
 * review set. `visual` never means a route is the only source of page proof.
 */
export const pageReviewRoutes: readonly PageReviewRoute[] = [
  { id: "homepage", fixtureRoute: "/fixtures/homepage/", visual: true },
  { id: "catalogue", fixtureRoute: "/fixtures/catalogue/", visual: true },
  ...["intermodal", "flat", "timber", "open-box", "tank"].map((family) => ({
    id: `family-${family}`,
    fixtureRoute: `/fixtures/catalogue/${family}/`,
    visual: family === "flat",
  })),
  ...products.map(([family, product]) => ({
    id: `product-${family}-${product}`,
    fixtureRoute: `/fixtures/products/${family}/${product}/`,
    visual:
      product === "uno-intermodal-60ft-sgns" ||
      product === "uno-flat-60ft-rens" ||
      product === "uno-multibox-33ft-eamnos" ||
      product === "uno-tank-88m3-zacns",
    technicalTable: true,
  })),
  ...["technology", "projects", "company", "quality"].map((page) => ({
    id: `editorial-${page}`,
    fixtureRoute: `/fixtures/editorial/${page}/`,
    visual: page === "technology" || page === "quality",
  })),
  { id: "contact", fixtureRoute: "/fixtures/contact/", visual: true },
  { id: "privacy", fixtureRoute: "/fixtures/legal/privacy/", visual: true },
  { id: "imprint", fixtureRoute: "/fixtures/legal/imprint/", visual: true },
  { id: "system-404", fixtureRoute: "/fixtures/system-404/", visual: true },
] as const;

export const visualPageReviewRoutes = pageReviewRoutes.filter(
  (route) => route.visual,
);

export const zoomPageReviewRoutes = pageReviewRoutes.filter(({ id }) =>
  [
    "homepage",
    "catalogue",
    "product-flat-uno-flat-60ft-rens",
    "contact",
    "privacy",
  ].includes(id),
);
