import type {
  Claim,
  ContentCorpus,
  Download,
  EngineeringRow,
  Evidence,
  EvidenceLevel,
  LoadLimitRow,
  NavigationItem,
  PageContent,
  Product,
  Project,
  PublicationStatus,
  SiteSettings,
  SourceAttribution,
  WagonFamily,
} from "./types";

export class ContentValidationError extends Error {
  constructor(
    readonly path: string,
    message: string,
  ) {
    super(`${path}: ${message}`);
    this.name = "ContentValidationError";
  }
}

type ContentRecord = Record<string, unknown>;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PRODUCT_IMAGE = /^products\/[a-z0-9-]+\/[a-z0-9-]+\/wagon-render\.png$/;
const LOAD_CLASSES = ["A", "B", "C", "D"] as const;
const PUBLICATION_STATUSES = ["approved", "draft", "unverified"] as const;
const EVIDENCE_LEVELS = ["E1", "E2", "E3", "E4"] as const;

function fail(path: string, message: string): never {
  throw new ContentValidationError(path, message);
}

function record(value: unknown, path: string): ContentRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(path, "must be an object");
  }

  return value as ContentRecord;
}

function requiredString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(path, "must be a non-empty string");
  }

  return value;
}

function optionalString(value: unknown, path: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredString(value, path);
}

function stringArray(value: unknown, path: string): readonly string[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, "must be a non-empty array");
  }

  return value.map((item, index) => requiredString(item, `${path}[${index}]`));
}

function slug(value: unknown, path: string): string {
  const parsed = requiredString(value, path);
  if (!SLUG.test(parsed)) fail(path, "must be a lowercase URL slug");
  return parsed;
}

function internalPath(value: unknown, path: string): string {
  const parsed = requiredString(value, path);
  if (!parsed.startsWith("/") || parsed.startsWith("//") || /\s/.test(parsed)) {
    fail(path, "must be a safe absolute internal path");
  }
  return parsed;
}

function externalUrl(value: unknown, path: string): string {
  const parsed = requiredString(value, path);
  let url: URL;
  try {
    url = new URL(parsed);
  } catch {
    fail(path, "must be an absolute HTTPS URL");
  }
  if (url.protocol !== "https:") fail(path, "must use HTTPS");
  return parsed;
}

function sourceAttribution(
  value: unknown,
  path: string,
  fallback?: SourceAttribution,
): SourceAttribution {
  if (value === undefined && fallback !== undefined) return fallback;
  const source = record(value, path);
  const checkedAt = optionalString(source.checkedAt, `${path}.checkedAt`);
  const owner = optionalString(source.owner, `${path}.owner`);

  return {
    reference: requiredString(source.reference, `${path}.reference`),
    ...(checkedAt === undefined ? {} : { checkedAt }),
    ...(owner === undefined ? {} : { owner }),
  };
}

function publicationStatus(value: unknown, path: string): PublicationStatus {
  if (
    typeof value !== "string" ||
    !PUBLICATION_STATUSES.includes(value as PublicationStatus)
  ) {
    fail(path, "must be approved, draft, or unverified");
  }
  return value as PublicationStatus;
}

function uniqueSlugs(
  items: readonly { readonly slug: string }[],
  path: string,
): void {
  const found = new Set<string>();
  for (const item of items) {
    if (found.has(item.slug))
      fail(path, `contains duplicate slug '${item.slug}'`);
    found.add(item.slug);
  }
}

function engineeringRows(
  value: unknown,
  path: string,
): readonly EngineeringRow[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, "must be a non-empty ordered array of label/value pairs");
  }

  return value.map((row, index) => {
    if (!Array.isArray(row) || row.length !== 2) {
      fail(`${path}[${index}]`, "must contain exactly a label and a value");
    }
    return {
      label: requiredString(row[0], `${path}[${index}][0]`),
      value: requiredString(row[1], `${path}[${index}][1]`),
    };
  });
}

function loadLimitRows(
  value: unknown,
  path: string,
): readonly LoadLimitRow[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length !== LOAD_CLASSES.length) {
    fail(path, "must contain ordered A–D route-class rows");
  }

  return value.map((row, index) => {
    if (!Array.isArray(row) || row.length !== 2) {
      fail(
        `${path}[${index}]`,
        "must contain exactly a route class and payload",
      );
    }
    const routeClass = requiredString(row[0], `${path}[${index}][0]`);
    if (routeClass !== LOAD_CLASSES[index]) {
      fail(
        `${path}[${index}][0]`,
        `must be route class ${LOAD_CLASSES[index]}`,
      );
    }
    const payload = requiredString(row[1], `${path}[${index}][1]`);
    if (!/^\d+(?:[.,]\d+)?$/.test(payload)) {
      fail(
        `${path}[${index}][1]`,
        "must be a decimal source string with its original separator",
      );
    }
    return { routeClass: routeClass as LoadLimitRow["routeClass"], payload };
  });
}

export function parseSiteSettings(value: unknown): SiteSettings {
  const site = record(value, "site");
  return {
    name: requiredString(site.name, "site.name"),
    defaultLocale: requiredString(site.defaultLocale, "site.defaultLocale"),
    source: sourceAttribution(site.source, "site.source"),
  };
}

export function parseNavigation(value: unknown): readonly NavigationItem[] {
  if (!Array.isArray(value) || value.length === 0)
    fail("navigation", "must be a non-empty array");
  return value.map((item, index) => {
    const navigation = record(item, `navigation[${index}]`);
    const external = navigation.external === true;
    return {
      label: requiredString(navigation.label, `navigation[${index}].label`),
      href: external
        ? externalUrl(navigation.href, `navigation[${index}].href`)
        : internalPath(navigation.href, `navigation[${index}].href`),
      external,
    };
  });
}

export function parseWagonFamilies(
  value: unknown,
  inheritedSource?: SourceAttribution,
): readonly WagonFamily[] {
  if (!Array.isArray(value) || value.length === 0)
    fail("families", "must be a non-empty array");
  const families = value.map((item, index) => {
    const family = record(item, `families[${index}]`);
    return {
      id: slug(family.id, `families[${index}].id`),
      sourceId: requiredString(
        family.source_id,
        `families[${index}].source_id`,
      ),
      slug: slug(family.id, `families[${index}].id`),
      name: requiredString(family.name, `families[${index}].name`),
      tag: requiredString(family.tag, `families[${index}].tag`),
      description: requiredString(
        family.description,
        `families[${index}].description`,
      ),
      productIds: stringArray(family.products, `families[${index}].products`),
      source: sourceAttribution(
        family.source,
        `families[${index}].source`,
        inheritedSource,
      ),
    };
  });
  uniqueSlugs(families, "families");
  return families;
}

export function parseProduct(
  value: unknown,
  inheritedSource?: SourceAttribution,
): Product {
  const product = record(value, "product");
  const familySlug = slug(product.category, "product.category");
  const productSlug = slug(product.slug, "product.slug");
  const imagePath = requiredString(product.image, "product.image");
  if (
    !PRODUCT_IMAGE.test(imagePath) ||
    !imagePath.startsWith(`products/${familySlug}/${productSlug}/`)
  ) {
    fail(
      "product.image",
      "must be the product's safe logical wagon-render path",
    );
  }
  const loadLimits = loadLimitRows(product.loadlimit, "product.loadlimit");

  return {
    id: slug(product.id, "product.id"),
    sourceId: requiredString(product.source_id, "product.source_id"),
    slug: productSlug,
    familySlug,
    familyName: requiredString(product.category_name, "product.category_name"),
    code: requiredString(product.code, "product.code"),
    name: requiredString(product.name, "product.name"),
    eyebrow: requiredString(product.eyebrow, "product.eyebrow"),
    tagline: requiredString(product.tagline, "product.tagline"),
    intro: stringArray(product.intro, "product.intro"),
    commodities: stringArray(product.commodities, "product.commodities"),
    benefits: stringArray(product.benefits, "product.benefits"),
    specifications: engineeringRows(product.specs, "product.specs"),
    ...(product.technical_source === undefined
      ? {}
      : {
          technicalSource: sourceAttribution(
            product.technical_source,
            "product.technical_source",
          ),
        }),
    ...(loadLimits === undefined ? {} : { loadLimits }),
    specialFeatures: stringArray(product.special, "product.special"),
    imagePath,
    source: sourceAttribution(
      product.source,
      "product.source",
      inheritedSource,
    ),
  };
}

export function parseProducts(
  value: unknown,
  inheritedSource?: SourceAttribution,
): readonly Product[] {
  if (!Array.isArray(value) || value.length === 0)
    fail("products", "must be a non-empty array");
  const products = value.map((product) =>
    parseProduct(product, inheritedSource),
  );
  uniqueSlugs(products, "products");
  return products;
}

export function parseProjects(value: unknown): readonly Project[] {
  if (!Array.isArray(value)) fail("projects", "must be an array");
  const projects = value.map((item, index) => {
    const project = record(item, `projects[${index}]`);
    return {
      slug: slug(project.slug, `projects[${index}].slug`),
      title: requiredString(project.title, `projects[${index}].title`),
      summary: requiredString(project.summary, `projects[${index}].summary`),
      publicationStatus: publicationStatus(
        project.publicationStatus,
        `projects[${index}].publicationStatus`,
      ),
      source: sourceAttribution(project.source, `projects[${index}].source`),
    };
  });
  uniqueSlugs(projects, "projects");
  return projects;
}

export function parsePages(value: unknown): readonly PageContent[] {
  if (!Array.isArray(value)) fail("pages", "must be an array");
  const pages = value.map((item, index) => {
    const page = record(item, `pages[${index}]`);
    return {
      slug: slug(page.slug, `pages[${index}].slug`),
      title: requiredString(page.title, `pages[${index}].title`),
      description: requiredString(
        page.description,
        `pages[${index}].description`,
      ),
      publicationStatus: publicationStatus(
        page.publicationStatus,
        `pages[${index}].publicationStatus`,
      ),
      source: sourceAttribution(page.source, `pages[${index}].source`),
    };
  });
  uniqueSlugs(pages, "pages");
  return pages;
}

export function parseDownloads(value: unknown): readonly Download[] {
  if (!Array.isArray(value)) fail("downloads", "must be an array");
  return value.map((item, index) => {
    const download = record(item, `downloads[${index}]`);
    const hrefValue = requiredString(download.href, `downloads[${index}].href`);
    const href = hrefValue.startsWith("/")
      ? internalPath(hrefValue, `downloads[${index}].href`)
      : externalUrl(hrefValue, `downloads[${index}].href`);
    const fileSize = optionalString(
      download.fileSize,
      `downloads[${index}].fileSize`,
    );
    const revisionDate = optionalString(
      download.revisionDate,
      `downloads[${index}].revisionDate`,
    );
    return {
      title: requiredString(download.title, `downloads[${index}].title`),
      href,
      fileType: requiredString(
        download.fileType,
        `downloads[${index}].fileType`,
      ),
      ...(fileSize === undefined ? {} : { fileSize }),
      language: requiredString(
        download.language,
        `downloads[${index}].language`,
      ),
      ...(revisionDate === undefined ? {} : { revisionDate }),
      publicationStatus: publicationStatus(
        download.publicationStatus,
        `downloads[${index}].publicationStatus`,
      ),
      source: sourceAttribution(download.source, `downloads[${index}].source`),
    };
  });
}

export function parseEvidence(value: unknown): readonly Evidence[] {
  if (!Array.isArray(value)) fail("evidence", "must be an array");
  const evidenceItems = value.map((item, index) => {
    const evidence = record(item, `evidence[${index}]`);
    const level = evidence.level;
    if (
      typeof level !== "string" ||
      !EVIDENCE_LEVELS.includes(level as EvidenceLevel)
    ) {
      fail(
        `evidence[${index}].level`,
        "must be an evidence level from E1 through E4",
      );
    }
    return {
      id: slug(evidence.id, `evidence[${index}].id`),
      level: level as EvidenceLevel,
      title: requiredString(evidence.title, `evidence[${index}].title`),
      source: sourceAttribution(evidence.source, `evidence[${index}].source`),
    };
  });
  uniqueSlugs(
    evidenceItems.map((item) => ({ slug: item.id })),
    "evidence",
  );
  return evidenceItems;
}

export function parseClaims(value: unknown): readonly Claim[] {
  if (!Array.isArray(value)) fail("claims", "must be an array");
  const claims = value.map((item, index) => {
    const claim = record(item, `claims[${index}]`);
    return {
      id: slug(claim.id, `claims[${index}].id`),
      text: requiredString(claim.text, `claims[${index}].text`),
      publicationStatus: publicationStatus(
        claim.publicationStatus,
        `claims[${index}].publicationStatus`,
      ),
      evidenceId: slug(claim.evidenceId, `claims[${index}].evidenceId`),
      source: sourceAttribution(claim.source, `claims[${index}].source`),
    };
  });
  uniqueSlugs(
    claims.map((claim) => ({ slug: claim.id })),
    "claims",
  );
  return claims;
}

export function parseContentCorpus(value: unknown): ContentCorpus {
  const corpus = record(value, "content");
  const evidence = parseEvidence(corpus.evidence);
  const claims = parseClaims(corpus.claims);
  const evidenceIds = new Set(evidence.map((item) => item.id));
  claims.forEach((claim, index) => {
    if (!evidenceIds.has(claim.evidenceId)) {
      fail(
        `claims[${index}].evidenceId`,
        "must reference an existing evidence record",
      );
    }
  });
  return {
    site: parseSiteSettings(corpus.site),
    navigation: parseNavigation(corpus.navigation),
    families: parseWagonFamilies(corpus.families),
    products: parseProducts(corpus.products),
    projects: parseProjects(corpus.projects),
    pages: parsePages(corpus.pages),
    downloads: parseDownloads(corpus.downloads),
    evidence,
    claims,
  };
}
