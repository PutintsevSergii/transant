import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { legacyRedirectRoutes } from "./prepare-release-output.mjs";

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultDistDirectory = join(websiteRoot, "dist");
const catalogPath = join(websiteRoot, "src", "content", "catalog.json");
const logoPath = join(websiteRoot, "public", "brand", "transant-logo.png");
const approvedCatalogueSource = "Catalog for print.ai";

export const approvedLogoDigest =
  "fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985";

function assertion(condition, message) {
  if (!condition) throw new Error(message);
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function record(value, label) {
  assertion(
    value && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object.`,
  );
  return value;
}

/**
 * Returns the release-one product coverage set directly from the approved
 * catalogue source. Display strings stay raw: this audit must never parse or
 * normalize technical values merely to compare them.
 */
export function productAuditEntries(catalogValue) {
  const catalog = record(catalogValue, "catalog");
  assertion(nonEmptyString(catalog.source), "Catalog requires a source.");
  assertion(
    catalog.source === approvedCatalogueSource,
    `Catalog source must be ${approvedCatalogueSource}.`,
  );
  assertion(Array.isArray(catalog.categories), "Catalog requires categories.");
  assertion(
    catalog.products &&
      typeof catalog.products === "object" &&
      !Array.isArray(catalog.products),
    "Catalog requires products keyed by ID.",
  );
  assertion(catalog.categories.length === 5, "Expected five wagon families.");

  const categories = new Map(
    catalog.categories.map((categoryValue) => {
      const category = record(categoryValue, "Catalog category");
      assertion(nonEmptyString(category.id), "Catalog family requires an ID.");
      assertion(
        Array.isArray(category.products) && category.products.length > 0,
        `Catalog family ${category.id} requires product IDs.`,
      );
      return [category.id, category];
    }),
  );
  assertion(categories.size === 5, "Catalog family IDs must be unique.");

  const entries = Object.entries(catalog.products).map(([id, productValue]) => {
    const product = record(productValue, `Product ${id}`);
    for (const field of ["id", "slug", "category", "name", "code", "image"]) {
      assertion(
        nonEmptyString(product[field]),
        `Product ${id} requires a non-empty ${field}.`,
      );
    }
    assertion(product.id === id, `Product ${id} must retain its keyed ID.`);
    assertion(
      Array.isArray(product.specs) && product.specs.length > 0,
      `Product ${id} requires source specifications.`,
    );
    const technicalSource = record(
      product.technical_source,
      `Product ${id} technical source`,
    );
    assertion(
      nonEmptyString(technicalSource.reference) &&
        technicalSource.reference.startsWith(approvedCatalogueSource),
      `Product ${id} must cite ${approvedCatalogueSource}.`,
    );
    const category = categories.get(product.category);
    assertion(
      category?.products.includes(id),
      `Product ${id} must be listed by its source family.`,
    );
    for (const field of ["benefits", "special"]) {
      const values = product[field];
      assertion(
        Array.isArray(values) && values.every(nonEmptyString),
        `Product ${id} requires valid ${field} entries.`,
      );
      assertion(
        !values.some((value) => /dac[ -]?ready/iu.test(value)),
        `Product ${id} contains unconfirmed DAC readiness.`,
      );
    }

    const specificationValues = product.specs.flatMap((row) => {
      assertion(
        Array.isArray(row) && row.length === 2 && row.every(nonEmptyString),
        `Product ${id} contains an invalid source specification row.`,
      );
      return row;
    });

    return {
      id,
      category: product.category,
      slug: product.slug,
      name: product.name,
      code: product.code,
      image: product.image,
      specificationValues,
      route: `/wagons/${product.category}/${product.slug}/`,
    };
  });

  assertion(entries.length === 10, "Expected ten source product records.");
  const intermodal = entries.find(({ id }) => id === "sgns");
  assertion(
    intermodal?.specificationValues.includes("19.740") &&
      !intermodal.specificationValues.includes("19.830"),
    "Sgns(s) must use the client-confirmed 19.740 mm A-buffer length.",
  );
  return entries;
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

function documentPath(directory, route) {
  return join(directory, route.replace(/^\//u, ""), "index.html");
}

function hrefs(markup) {
  return [...markup.matchAll(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/giu)].map(
    ([, doubleQuoted, singleQuoted]) => doubleQuoted ?? singleQuoted ?? "",
  );
}

function count(markup, needle) {
  return markup.split(needle).length - 1;
}

export async function auditContentAndBrand({
  distDirectory = defaultDistDirectory,
  sourcePath = catalogPath,
  brandLogoPath = logoPath,
} = {}) {
  const catalog = JSON.parse(await readFile(sourcePath, "utf8"));
  const products = productAuditEntries(catalog);
  const [logo, outputFiles] = await Promise.all([
    readFile(brandLogoPath),
    htmlFiles(distDirectory),
  ]);
  const logoDigest = createHash("sha256").update(logo).digest("hex");
  assertion(
    logoDigest === approvedLogoDigest,
    `Approved logo digest changed: ${logoDigest}.`,
  );

  const legacyRedirectFiles = new Set(
    legacyRedirectRoutes.map((route) => documentPath(distDirectory, route)),
  );
  const documents = new Map(
    await Promise.all(
      outputFiles
        .filter((filePath) => !legacyRedirectFiles.has(filePath))
        .map(async (filePath) => [filePath, await readFile(filePath, "utf8")]),
    ),
  );
  assertion(documents.size >= 26, "Expected the completed release-one output.");

  for (const product of products) {
    await access(
      join(websiteRoot, "src", "assets", "images", product.image),
      constants.R_OK,
    );
    const productDocument = await readFile(
      documentPath(distDirectory, product.route),
      "utf8",
    );
    for (const value of [
      product.name,
      product.code,
      ...product.specificationValues,
    ]) {
      assertion(
        productDocument.includes(value),
        `${product.route} does not preserve source value: ${value}.`,
      );
    }
  }

  const allOutput = [...documents.values()].join("\n");
  const unsafeHrefs = hrefs(allOutput).filter((href) => {
    const destination = href.trim();
    return (
      destination === "#" || /^(?:about:blank|javascript:)/iu.test(destination)
    );
  });
  assertion(
    unsafeHrefs.length === 0,
    `Published output contains placeholder destinations: ${unsafeHrefs.join(", ")}.`,
  );
  assertion(
    !/\b(?:lorem ipsum|todo|tbd)\b/iu.test(allOutput),
    "Published output contains unfinished placeholder copy.",
  );
  assertion(
    !/(?:greentec|alform|high[ -]strength steel|\/sustainability\/)/iu.test(
      allOutput,
    ),
    "Published output contains retired steel or sustainability messaging.",
  );
  assertion(
    !/(?:lightweight intermodal|leichte intermodalwagen|полегшені інтермодальні вагони|lekkie wagony intermodalne|lehké intermodální vozy)/iu.test(
      allOutput,
    ),
    "Published output describes the intermodal family as lightweight.",
  );
  assertion(
    !hrefs(allOutput).some((href) =>
      /\/(?:[a-z]{2}\/)?technology\/?$/u.test(href),
    ),
    "Canonical output links to the retired Technology route.",
  );
  for (const route of [
    "/engineering-services/",
    "/de/engineering-services/",
    "/uk/engineering-services/",
    "/pl/engineering-services/",
    "/cs/engineering-services/",
  ]) {
    await access(documentPath(distDirectory, route), constants.R_OK);
  }
  assertion(
    !/dac[ -]?ready/iu.test(allOutput),
    "Published output contains unconfirmed DAC readiness.",
  );
  try {
    await access(
      join(distDirectory, "sustainability", "index.html"),
      constants.R_OK,
    );
    throw new Error("Sustainability must not be published as a route.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("must not"))
      throw error;
  }
  assertion(
    !/<(?:img|script)\b[^>]+\bsrc\s*=\s*["']https?:\/\//iu.test(allOutput),
    "Published output contains a remote image or script source.",
  );
  assertion(
    !/(?:^|[\s"'>(])[^\s"'<>]*(?:\.md|\.html)(?:$|[\s"'<>(])/imu.test(
      allOutput,
    ),
    "Published output contains an internal Markdown or HTML file reference.",
  );
  assertion(
    count(allOutput, "/brand/transant-logo.png") >= documents.size,
    "Every published document must retain the immutable local logo asset.",
  );

  const contact = await readFile(
    join(distDirectory, "contact", "index.html"),
    "utf8",
  );
  const privacy = await readFile(
    join(distDirectory, "privacy", "index.html"),
    "utf8",
  );
  assertion(
    /<form\b[^>]+\baction="mailto:office@transant\.com"/iu.test(contact) &&
      contact.includes("Continue in email") &&
      !contact.includes("/contact/submit"),
    "Contact must retain the explicit mail-client handoff without a delivery endpoint.",
  );
  assertion(
    privacy.includes("TransAnt GmbH, voestalpine-Straße 3") &&
      privacy.includes("does not use Google Analytics") &&
      privacy.includes("external hosting and technical service providers") &&
      privacy.includes("applicable data-protection law") &&
      !privacy.includes("Vercel"),
    "Privacy must retain the official controller, provider-neutral hosting boundary, applicable-law safeguards, and analytics-disabled scope.",
  );
  try {
    await access(
      join(distDirectory, "contact", "submit", "index.html"),
      constants.R_OK,
    );
    throw new Error(
      "The retired contact delivery endpoint must not be represented as a static route.",
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("must not"))
      throw error;
  }

  return {
    documents: documents.size,
    products: products.length,
    logoDigest,
    logoReferences: count(allOutput, "/brand/transant-logo.png"),
    contactDelivery: "mail-client-handoff-no-automatic-delivery",
  };
}

async function main() {
  const result = await auditContentAndBrand();
  console.log(
    `content-brand-audit-ok: documents=${result.documents} products=${result.products} ` +
      `logo=${result.logoDigest} logo-references=${result.logoReferences} ` +
      `contact-delivery=${result.contactDelivery}`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(
      `content-brand-audit-failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  });
}
