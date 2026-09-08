import { readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultDistDirectory = join(websiteRoot, "dist");

export const legacyRedirectRoutes = [
  "/engineering-services/",
  "/de/engineering-services/",
  "/uk/engineering-services/",
  "/pl/engineering-services/",
  "/cs/engineering-services/",
  "/technology/",
  "/de/technology/",
  "/uk/technology/",
  "/pl/technology/",
  "/cs/technology/",
];

function assertion(condition, message) {
  if (!condition) throw new Error(message);
}

export function approvedPublicSiteUrl(value) {
  assertion(
    typeof value === "string" && value.trim().length > 0,
    "PUBLIC_SITE_URL must be a non-empty HTTPS origin.",
  );

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("PUBLIC_SITE_URL must be a valid HTTPS origin.");
  }

  assertion(url.protocol === "https:", "PUBLIC_SITE_URL must use HTTPS.");
  assertion(Boolean(url.hostname), "PUBLIC_SITE_URL requires a hostname.");
  assertion(
    !url.username && !url.password,
    "PUBLIC_SITE_URL must not include credentials.",
  );
  assertion(
    url.pathname === "/" && !url.search && !url.hash,
    "PUBLIC_SITE_URL must be an origin without a path, query, or fragment.",
  );

  return url.origin;
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

export function canonicalRoutes(distDirectory, files) {
  const routes = files.flatMap((filePath) => {
    const outputPath = relative(distDirectory, filePath).replaceAll("\\", "/");
    if (outputPath === "404.html") return [];
    if (outputPath === "index.html") return ["/"];
    if (!outputPath.endsWith("/index.html")) return [];
    const route = `/${outputPath.slice(0, -"index.html".length)}`;
    return legacyRedirectRoutes.includes(route) ? [] : [route];
  });

  const uniqueRoutes = [...new Set(routes)].sort((first, second) =>
    first.localeCompare(second),
  );
  assertion(
    uniqueRoutes.includes("/"),
    "Release output requires the homepage.",
  );
  return uniqueRoutes;
}

export function sitemapXml(siteUrl, routes) {
  const entries = routes
    .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function productionRobots(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

export function releaseEnvironment({
  publicSiteUrl,
  vercelEnvironment,
  vercelProductionHost,
} = {}) {
  if (typeof publicSiteUrl === "string" && publicSiteUrl.trim().length > 0) {
    return {
      kind: "production",
      siteUrl: approvedPublicSiteUrl(publicSiteUrl),
    };
  }

  if (vercelEnvironment === "preview" || vercelEnvironment === "development") {
    return { kind: "preview", siteUrl: undefined };
  }

  if (vercelEnvironment === "production") {
    assertion(
      typeof vercelProductionHost === "string" &&
        vercelProductionHost.trim().length > 0,
      "Vercel production builds require VERCEL_PROJECT_PRODUCTION_URL.",
    );
    return {
      kind: "production",
      siteUrl: approvedPublicSiteUrl(`https://${vercelProductionHost}`),
    };
  }

  throw new Error(
    "Provide PUBLIC_SITE_URL locally or run inside a Vercel preview/production environment.",
  );
}

export async function prepareReleaseOutput({
  distDirectory = defaultDistDirectory,
  publicSiteUrl = process.env.PUBLIC_SITE_URL,
  vercelEnvironment = process.env.VERCEL_ENV,
  vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL,
} = {}) {
  const environment = releaseEnvironment({
    publicSiteUrl,
    vercelEnvironment,
    vercelProductionHost,
  });
  const routes = canonicalRoutes(distDirectory, await htmlFiles(distDirectory));
  assertion(routes.length >= 25, "Release output requires all public routes.");

  if (environment.kind === "preview") {
    return {
      environment: "preview",
      siteUrl: undefined,
      routes: routes.length,
    };
  }

  await Promise.all([
    writeFile(
      join(distDirectory, "sitemap.xml"),
      sitemapXml(environment.siteUrl, routes),
    ),
    writeFile(
      join(distDirectory, "robots.txt"),
      productionRobots(environment.siteUrl),
    ),
  ]);

  return {
    environment: "production",
    siteUrl: environment.siteUrl,
    routes: routes.length,
  };
}

async function main() {
  const result = await prepareReleaseOutput();
  if (result.environment === "preview") {
    console.log(
      `release-output-preview: routes=${result.routes} robots=disallow-all sitemap=omitted`,
    );
    return;
  }
  console.log(
    `release-output-ready: origin=${result.siteUrl} routes=${result.routes} sitemap=sitemap.xml redirects=permanent-legacy-and-trailing-slash`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(
      `release-output-failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  });
}
