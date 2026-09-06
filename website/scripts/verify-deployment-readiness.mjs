import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalRoutes } from "./prepare-release-output.mjs";

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultDistDirectory = join(websiteRoot, "dist");
const publicDirectory = join(websiteRoot, "public");
const vercelConfigPath = join(websiteRoot, "vercel.json");

function assertion(condition, message) {
  if (!condition) throw new Error(message);
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

function requiredVercelConfiguration(config) {
  assertion(
    config.framework === "astro",
    "Vercel must detect Astro explicitly.",
  );
  assertion(config.outputDirectory === "dist", "Vercel must publish dist.");
  assertion(
    config.trailingSlash === true,
    "Vercel must canonicalize trailing slashes.",
  );
  assertion(
    config.buildCommand === "pnpm build && pnpm prepare:release-output",
    "Vercel must run the safe preview/production release finalizer.",
  );
  const serializedHeaders = JSON.stringify(config.headers);
  for (const directive of [
    "Cross-Origin-Opener-Policy",
    "same-origin",
    "Permissions-Policy",
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
    "X-Content-Type-Options",
    "nosniff",
    "X-Frame-Options",
    "DENY",
    "public, max-age=31536000, immutable",
  ]) {
    assertion(
      serializedHeaders.includes(directive),
      `Missing Vercel header configuration: ${directive}.`,
    );
  }
}

export async function verifyDeploymentReadiness({
  distDirectory = defaultDistDirectory,
  sourcePublicDirectory = publicDirectory,
  sourceVercelConfigPath = vercelConfigPath,
} = {}) {
  const [vercelConfigSource, robots, documents] = await Promise.all([
    readFile(sourceVercelConfigPath, "utf8"),
    readFile(join(sourcePublicDirectory, "robots.txt"), "utf8"),
    htmlFiles(distDirectory),
  ]);
  requiredVercelConfiguration(JSON.parse(vercelConfigSource));
  assertion(
    /User-agent:\s*\*/u.test(robots) && /Disallow:\s*\//u.test(robots),
    "Preview robots policy must prevent indexing before an approved site origin exists.",
  );

  await access(join(distDirectory, "robots.txt"));
  const routes = canonicalRoutes(distDirectory, documents);
  assertion(routes.length >= 25, "Release output requires all public routes.");
  const output = await Promise.all(
    documents.map((filePath) => readFile(filePath, "utf8")),
  );
  const markup = output.join("\n");
  assertion(
    markup.includes('http-equiv="content-security-policy"') &&
      markup.includes("default-src 'self'") &&
      markup.includes("form-action 'self'") &&
      !markup.includes("unsafe-inline"),
    "Astro must emit a hash-based self-only CSP without unsafe-inline.",
  );
  assertion(
    !/<(?:script|img)\b[^>]+\bsrc\s*=\s*["']https?:\/\//iu.test(markup) &&
      !/<link\b(?=[^>]*\brel\s*=\s*["'][^"']*stylesheet)(?=[^>]*\bhref\s*=\s*["']https?:\/\/)[^>]*>/iu.test(
        markup,
      ),
    "Release output must not require remote script, image, or stylesheet sources.",
  );
  assertion(
    /<form\b[^>]+\baction="\/contact\/submit"/iu.test(markup),
    "Release output must retain the explicit same-site contact delivery boundary.",
  );
  assertion(
    !markup.includes("google-analytics.com") &&
      !markup.includes("googletagmanager.com"),
    "Analytics must remain disabled until privacy and consent arrangements are approved.",
  );

  return {
    documents: documents.length,
    routes: routes.length,
    host: "vercel-static-config-ready",
    headers: "vercel-headers-and-astro-csp-ready",
    robots: "preview-noindex-until-public-site-url",
    releaseOutput: "preview-safe-production-url-from-vercel",
    formDelivery: "blocked-until-provider-configuration",
    analytics: "disabled",
  };
}

async function main() {
  const result = await verifyDeploymentReadiness();
  console.log(
    `deployment-readiness-ok: documents=${result.documents} routes=${result.routes} host=${result.host} headers=${result.headers} robots=${result.robots} release-output=${result.releaseOutput} form-delivery=${result.formDelivery} analytics=${result.analytics}`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(
      `deployment-readiness-failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  });
}
