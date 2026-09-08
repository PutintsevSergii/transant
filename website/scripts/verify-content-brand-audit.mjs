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
    !/(?:greentec|\/sustainability\/)/iu.test(allOutput),
    "Published output contains retired greentec or sustainability messaging.",
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
  for (const homepage of [
    {
      route: "/",
      company:
        "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020.",
      process:
        "Work on a wagon starts not with choosing a standard model, but with understanding the real transport task.",
      allWagons: "View all wagons",
      proAction: "Enquire about PRO 60 ft",
    },
    {
      route: "/de/",
      company:
        "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group und wurde 2020 in Linz gegründet.",
      process:
        "Die Arbeit an einem Wagen beginnt nicht mit der Wahl eines Standardmodells, sondern mit dem Verständnis der tatsächlichen Transportaufgabe.",
      allWagons: "Alle Wagen ansehen",
      proAction: "Anfrage zu PRO 60 ft senden",
    },
    {
      route: "/uk/",
      company:
        "TransAnt GmbH — австрійська компанія у складі TAS Group, заснована в Лінці у 2020 році.",
      process:
        "Робота над вагоном починається не з вибору стандартної моделі, а з розуміння реального транспортного завдання.",
      allWagons: "Переглянути всі вагони",
      proAction: "Надіслати запит щодо PRO 60 ft",
    },
    {
      route: "/pl/",
      company:
        "TransAnt GmbH to austriacka spółka należąca do TAS Group, założona w Linzu w 2020 roku.",
      process:
        "Prace nad wagonem nie zaczynają się od wyboru standardowego modelu, lecz od zrozumienia rzeczywistego zadania transportowego.",
      allWagons: "Zobacz wszystkie wagony",
      proAction: "Wyślij zapytanie o PRO 60 ft",
    },
    {
      route: "/cs/",
      company:
        "TransAnt GmbH je rakouská společnost skupiny TAS Group, založená v Linci v roce 2020.",
      process:
        "Práce na voze nezačíná výběrem standardního modelu, ale pochopením skutečného přepravního úkolu.",
      allWagons: "Zobrazit všechny vozy",
      proAction: "Odeslat poptávku na PRO 60 ft",
    },
  ]) {
    const markup = await readFile(
      documentPath(distDirectory, homepage.route),
      "utf8",
    );
    const localePrefix = homepage.route;
    assertion(
      markup.includes(homepage.company) && markup.includes(homepage.process),
      `${homepage.route} must retain the approved company introduction and project process.`,
    );
    assertion(
      markup.includes(`href="${localePrefix}company/"`) &&
        markup.includes("transant-wagon-logo-red"),
      `${homepage.route} must retain its localized Company action and approved local hero media.`,
    );
    assertion(
      markup.includes(`href="${localePrefix}wagons/"`) &&
        markup.includes(homepage.allWagons),
      `${homepage.route} must retain its localized all-wagons action.`,
    );
    assertion(
      markup.includes(`href="${localePrefix}engineering-services/"`) &&
        markup.includes(homepage.proAction),
      `${homepage.route} must retain its localized PRO-platform-projects action.`,
    );
  }
  for (const company of [
    {
      route: "/company/",
      title: "Engineering solutions for European rail freight",
      role: "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020.",
      pro: "TransAnt’s experience includes implemented lightweight 60-foot platform-wagon projects in the PRO family, using special structural solutions and high-strength steel.",
      uno: "The UNO range covers intermodal transport, metal, timber, bulk cargo, and liquids.",
    },
    {
      route: "/de/company/",
      title: "Ingenieurlösungen für den europäischen Schienengüterverkehr",
      role: "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group, das 2020 in Linz gegründet wurde.",
      pro: "Die Erfahrung von TransAnt umfasst realisierte Leichtbauprojekte für 60-Fuß-Plattformwagen der PRO-Familie mit besonderen Konstruktionslösungen und hochfestem Stahl.",
      uno: "Das UNO-Programm umfasst intermodale Transporte, Metall, Holz, Schüttgüter und Flüssigkeiten.",
    },
    {
      route: "/uk/company/",
      title: "Інженерні рішення для європейських вантажних перевезень",
      role: "TransAnt GmbH — австрійська компанія TAS Group, заснована в Лінці у 2020 році.",
      pro: "Досвід TransAnt включає реалізовані легкі проєкти 60-футових платформних вагонів сімейства PRO зі спеціальними конструкційними рішеннями та високоміцною сталлю.",
      uno: "Лінійка UNO охоплює інтермодальні перевезення, метал, деревину, сипкі вантажі та рідини.",
    },
    {
      route: "/pl/company/",
      title:
        "Rozwiązania inżynieryjne dla europejskiego kolejowego transportu towarowego",
      role: "TransAnt GmbH jest austriacką spółką TAS Group założoną w Linzu w 2020 roku.",
      pro: "Doświadczenie TransAnt obejmuje zrealizowane lekkie projekty 60-stopowych wagonów platformowych rodziny PRO ze specjalnymi rozwiązaniami konstrukcyjnymi i stalą o wysokiej wytrzymałości.",
      uno: "Gama UNO obejmuje transport intermodalny, metal, drewno, ładunki masowe i ciecze.",
    },
    {
      route: "/cs/company/",
      title: "Inženýrská řešení pro evropskou železniční nákladní dopravu",
      role: "TransAnt GmbH je rakouská společnost skupiny TAS Group založená v Linci v roce 2020.",
      pro: "Zkušenosti TransAnt zahrnují realizované lehké projekty 60stopých plošinových vozů rodiny PRO se zvláštními konstrukčními řešeními a vysokopevnostní ocelí.",
      uno: "Řada UNO zahrnuje intermodální přepravu, kov, dřevo, sypké náklady a kapaliny.",
    },
  ]) {
    const markup = await readFile(
      documentPath(distDirectory, company.route),
      "utf8",
    );
    assertion(
      markup.includes(company.title) &&
        markup.includes(company.role) &&
        markup.includes(company.pro) &&
        markup.includes(company.uno),
      `${company.route} must retain its authored Company narrative.`,
    );
    for (const asset of [
      "company-wagon-logo",
      "company-wagon-coupling",
      "company-engineering-team",
      "company-pro-platform",
      "company-uno-intermodal",
    ]) {
      assertion(
        markup.includes(asset),
        `${company.route} must retain the supplied local ${asset} media.`,
      );
    }
  }
  for (const proPage of [
    {
      route: "/engineering-services/",
      title: "Lightweight platform for heavy transport tasks",
      proof:
        "High-strength alform® steel and a topologically optimised structure reduce the base platform’s tare to approximately 16 tonnes.",
    },
    {
      route: "/de/engineering-services/",
      title: "Leichte Plattform für schwere Transportaufgaben",
      proof:
        "Hochfester alform®-Stahl und eine topologisch optimierte Konstruktion reduzieren das Eigengewicht der Basisplattform auf etwa 16 Tonnen.",
    },
    {
      route: "/uk/engineering-services/",
      title: "Полегшена платформа для важких транспортних завдань",
      proof:
        "Високоміцна сталь alform® і топологічно оптимізована конструкція зменшують власну масу базової платформи приблизно до 16 тонн.",
    },
    {
      route: "/pl/engineering-services/",
      title: "Lekka platforma do ciężkich zadań transportowych",
      proof:
        "Stal alform® o wysokiej wytrzymałości i topologicznie zoptymalizowana konstrukcja zmniejszają masę własną platformy bazowej do około 16 ton.",
    },
    {
      route: "/cs/engineering-services/",
      title: "Lehká plošina pro těžké přepravní úkoly",
      proof:
        "Vysokopevnostní ocel alform® a topologicky optimalizovaná konstrukce snižují vlastní hmotnost základní plošiny přibližně na 16 tun.",
    },
  ]) {
    const markup = await readFile(
      documentPath(distDirectory, proPage.route),
      "utf8",
    );
    assertion(
      markup.includes(proPage.title) &&
        markup.includes(proPage.proof) &&
        markup.includes("company-pro-platform"),
      `${proPage.route} must retain its localized PRO platform narrative and supplied image.`,
    );
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
