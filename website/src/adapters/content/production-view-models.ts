import type {
  Claim,
  Product,
  ProductViewModel,
  ProductionClaimViewModel,
} from "../../domain/content/types";

/**
 * Maps validated source data to component-facing values without formatting or
 * normalizing any engineering display strings.
 */
export function toProductViewModel(product: Product): ProductViewModel {
  return {
    id: product.id,
    href: `/wagons/${product.familySlug}/${product.slug}`,
    familyHref: `/wagons/${product.familySlug}`,
    name: product.name,
    code: product.code,
    eyebrow: product.eyebrow,
    tagline: product.tagline,
    intro: product.intro,
    commodities: product.commodities,
    benefits: product.benefits,
    specifications: product.specifications,
    ...(product.loadLimits === undefined
      ? {}
      : { loadLimits: product.loadLimits }),
    specialFeatures: product.specialFeatures,
    imagePath: product.imagePath,
  };
}

/** Draft and unverified claims deliberately have no production representation. */
export function toProductionClaimViewModels(
  claims: readonly Claim[],
): readonly ProductionClaimViewModel[] {
  return claims
    .filter((claim) => claim.publicationStatus === "approved")
    .map((claim) => ({
      id: claim.id,
      text: claim.text,
      evidenceId: claim.evidenceId,
      sourceReference: claim.source.reference,
    }));
}
