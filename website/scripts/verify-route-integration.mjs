import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const outputDirectory = path.resolve(process.argv[2] ?? "dist");
const siteOrigin = "https://static.transant.invalid";
const ignoredDocumentRoutes = new Set(["/404.html"]);

const isFile = async (filePath) => {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
};

const findHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findHtmlFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return files.flat();
};

const toRoutePath = (filePath) => {
  const relativePath = path
    .relative(outputDirectory, filePath)
    .split(path.sep)
    .join("/");

  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }

  return `/${relativePath}`;
};

const toOutputPath = (pathname) => {
  const decodedPathname = decodeURIComponent(pathname);
  if (decodedPathname === "/404/") {
    return path.join(outputDirectory, "404.html");
  }
  const cleanPathname = decodedPathname.replace(/^\/+/, "");

  if (!cleanPathname || decodedPathname.endsWith("/")) {
    return path.join(outputDirectory, cleanPathname, "index.html");
  }

  const extension = path.posix.extname(decodedPathname);
  return path.join(
    outputDirectory,
    cleanPathname,
    extension ? "" : "index.html",
  );
};

const extractAttributeValues = (html, attributeName) => {
  const attributePattern = new RegExp(
    `\\b${attributeName}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    "giu",
  );
  const values = [];

  for (const match of html.matchAll(attributePattern)) {
    values.push(match[1] ?? match[2] ?? "");
  }

  return values;
};

const readDocuments = async () => {
  const files = await findHtmlFiles(outputDirectory);
  const documents = await Promise.all(
    files.map(async (filePath) => {
      const html = await readFile(filePath, "utf8");
      const routePath = toRoutePath(filePath);
      return [
        routePath,
        { filePath, html, ids: new Set(extractAttributeValues(html, "id")) },
      ];
    }),
  );

  return new Map(documents);
};

const isInternalUrl = (url) => url.origin === siteOrigin;

const main = async () => {
  if (!(await isFile(path.join(outputDirectory, "index.html")))) {
    throw new Error(
      `Missing static output at ${outputDirectory}. Run pnpm build first.`,
    );
  }

  const documents = await readDocuments();
  const publicRoutes = [...documents.keys()].filter(
    (routePath) => !ignoredDocumentRoutes.has(routePath),
  );
  const publicRouteSet = new Set(publicRoutes);
  const pendingRoutes = ["/", ...ignoredDocumentRoutes];
  const visitedRoutes = new Set();
  const failures = [];
  let internalReferenceCount = 0;

  while (pendingRoutes.length > 0) {
    const currentRoute = pendingRoutes.shift();

    if (!currentRoute || visitedRoutes.has(currentRoute)) {
      continue;
    }

    const document = documents.get(currentRoute);
    if (!document) {
      failures.push(
        `Missing generated document for reachable route ${currentRoute}.`,
      );
      continue;
    }

    visitedRoutes.add(currentRoute);

    for (const rawHref of extractAttributeValues(document.html, "href")) {
      const href = rawHref.trim();

      if (!href) {
        failures.push(`${currentRoute} contains an empty href.`);
        continue;
      }

      if (/^javascript:/iu.test(href)) {
        failures.push(
          `${currentRoute} contains a javascript: href (${rawHref}).`,
        );
        continue;
      }

      const target = new URL(href, new URL(currentRoute, siteOrigin));
      if (!isInternalUrl(target)) {
        continue;
      }

      internalReferenceCount += 1;
      const targetPath = target.pathname;
      const targetOutput = toOutputPath(targetPath);
      const targetIsDocument = publicRouteSet.has(targetPath);

      if (!(await isFile(targetOutput))) {
        failures.push(
          `${currentRoute} links to missing internal target ${href}.`,
        );
        continue;
      }

      if (target.hash && targetIsDocument) {
        const targetDocument = documents.get(targetPath);
        const targetId = decodeURIComponent(target.hash.slice(1));

        if (!targetDocument?.ids.has(targetId)) {
          failures.push(`${currentRoute} links to missing fragment ${href}.`);
        }
      }

      if (targetIsDocument && !visitedRoutes.has(targetPath)) {
        pendingRoutes.push(targetPath);
      }
    }
  }

  const orphanedRoutes = publicRoutes.filter(
    (routePath) => !visitedRoutes.has(routePath),
  );
  if (orphanedRoutes.length > 0) {
    failures.push(`Orphaned generated routes: ${orphanedRoutes.join(", ")}.`);
  }

  const productRoutes = publicRoutes.filter((routePath) =>
    /^\/wagons\/[^/]+\/[^/]+\/$/u.test(routePath),
  );
  if (productRoutes.length !== 10) {
    failures.push(
      `Expected 10 generated product routes, found ${productRoutes.length}.`,
    );
  }

  if (failures.length > 0) {
    throw new Error(`Route integration failed:\n- ${failures.join("\n- ")}`);
  }

  process.stdout.write(
    `route-integration-ok: routes=${publicRoutes.length} products=${productRoutes.length} internal-references=${internalReferenceCount}\n`,
  );
};

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
});
