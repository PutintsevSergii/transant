import { spawn } from "node:child_process";
import { gzipSync } from "node:zlib";
import { createServer } from "node:net";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultDistDirectory = join(websiteRoot, "dist");
const maxStaticFileBytes = 25 * 1024 * 1024;
const maxInitialJavaScriptGzipBytes = 150 * 1024;

export const representativeRoutes = [
  { path: "/", document: "index.html", label: "homepage" },
  { path: "/wagons/", document: "wagons/index.html", label: "catalogue" },
  {
    path: "/wagons/open-box/uno-multi-56ft-eanos/",
    document: "wagons/open-box/uno-multi-56ft-eanos/index.html",
    label: "widest-data-product",
  },
  { path: "/contact/", document: "contact/index.html", label: "contact" },
];

const lighthouseThresholds = {
  performance: 0.9,
  largestContentfulPaint: 2_500,
  cumulativeLayoutShift: 0.1,
  totalBlockingTime: 200,
};

function assertion(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function attributes(markup) {
  return Object.fromEntries(
    [
      ...markup.matchAll(/([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu),
    ].map(([, name, quotedDouble, quotedSingle, unquoted]) => [
      name.toLowerCase(),
      quotedDouble ?? quotedSingle ?? unquoted ?? "",
    ]),
  );
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);
      return entry.isDirectory() ? filesIn(entryPath) : [entryPath];
    }),
  );

  return children.flat();
}

function gzipBytes(value) {
  return gzipSync(value).byteLength;
}

function localOutputPath(distDirectory, url) {
  const pathname = url.split(/[?#]/u, 1)[0];
  return join(distDirectory, pathname.replace(/^\//u, ""));
}

async function localScriptBytes(distDirectory, source) {
  const scriptPath = localOutputPath(distDirectory, source);
  await access(scriptPath, constants.R_OK);
  return readFile(scriptPath);
}

export async function inspectStaticOutput(
  distDirectory = defaultDistDirectory,
) {
  const outputFiles = await filesIn(distDirectory);
  const oversizedFiles = [];

  for (const outputFile of outputFiles) {
    const fileStats = await stat(outputFile);
    if (fileStats.size > maxStaticFileBytes) {
      oversizedFiles.push(
        `${relative(distDirectory, outputFile)}=${fileStats.size}`,
      );
    }
  }

  assertion(
    oversizedFiles.length === 0,
    `Static output contains files above the 25 MiB hosting limit: ${oversizedFiles.join(", ")}`,
  );

  const documents = new Map(
    await Promise.all(
      representativeRoutes.map(async (route) => {
        const document = await readFile(
          join(distDirectory, route.document),
          "utf8",
        );
        return [route.label, document];
      }),
    ),
  );

  const routeMetrics = [];
  const stylesheetContents = [];

  for (const route of representativeRoutes) {
    const document = documents.get(route.label);
    assertion(document, `Missing representative document for ${route.path}.`);

    const scripts = [
      ...document.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/giu),
    ];
    const scriptBytes = await Promise.all(
      scripts.map(async ([, attributeMarkup = "", inlineCode = ""]) => {
        const scriptAttributes = attributes(attributeMarkup);
        const source = scriptAttributes.src;

        assertion(
          !source || source.startsWith("/"),
          `${route.path} contains a remote script source: ${source ?? ""}.`,
        );

        return source
          ? localScriptBytes(distDirectory, source)
          : Buffer.from(inlineCode);
      }),
    );
    const initialJavaScriptGzipBytes = gzipBytes(Buffer.concat(scriptBytes));
    assertion(
      initialJavaScriptGzipBytes <= maxInitialJavaScriptGzipBytes,
      `${route.path} exceeds the ${maxInitialJavaScriptGzipBytes}-byte gzip JavaScript budget: ${initialJavaScriptGzipBytes}.`,
    );

    const images = [...document.matchAll(/<img\b([^>]*)>/giu)];
    assertion(
      images.length > 0,
      `${route.path} has no image elements to verify.`,
    );
    for (const [, imageMarkup = ""] of images) {
      const imageAttributes = attributes(imageMarkup);
      assertion(
        Boolean(imageAttributes.width) && Boolean(imageAttributes.height),
        `${route.path} has an image without declared intrinsic dimensions.`,
      );
      assertion(
        imageAttributes.src?.startsWith("/") ?? false,
        `${route.path} has a non-local image source: ${imageAttributes.src ?? ""}.`,
      );
    }

    const responsiveSources = [...document.matchAll(/<source\b([^>]*)>/giu)]
      .map(([, sourceMarkup = ""]) => attributes(sourceMarkup))
      .filter((source) => source.srcset);
    const hasOptimizedRouteImage = images.some(([, imageMarkup = ""]) =>
      attributes(imageMarkup).src?.startsWith("/_astro/"),
    );
    assertion(
      !hasOptimizedRouteImage || responsiveSources.length > 0,
      `${route.path} has optimized route imagery without responsive sources.`,
    );
    for (const source of responsiveSources) {
      assertion(
        source.srcset.includes("320w") && source.sizes,
        `${route.path} has a responsive source without the compact derivative or sizes contract.`,
      );
    }

    const stylesheets = [...document.matchAll(/<link\b([^>]*)>/giu)]
      .map(([, linkMarkup = ""]) => attributes(linkMarkup))
      .filter(
        (link) => link.rel === "stylesheet" && link.href?.startsWith("/"),
      );
    stylesheetContents.push(
      ...(await Promise.all(
        stylesheets.map((stylesheet) =>
          readFile(localOutputPath(distDirectory, stylesheet.href), "utf8"),
        ),
      )),
    );

    assertion(
      !/<canvas\b/iu.test(document),
      `${route.path} ships a canvas element.`,
    );
    assertion(
      !/\b(?:webgl|three\.js|gsap)\b/iu.test(document),
      `${route.path} ships a prohibited motion runtime.`,
    );
    routeMetrics.push({ path: route.path, initialJavaScriptGzipBytes });
  }

  const styles = stylesheetContents.join("\n");
  assertion(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)/iu.test(styles),
    "Built CSS does not include a reduced-motion media query.",
  );

  return {
    files: outputFiles.length,
    routes: routeMetrics,
    maximumStaticFileBytes: Math.max(
      ...(await Promise.all(
        outputFiles.map(async (outputFile) => (await stat(outputFile)).size),
      )),
    ),
  };
}

function reservePort() {
  return new Promise((resolvePort, rejectPort) => {
    const server = createServer();
    server.once("error", rejectPort);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        rejectPort(new Error("Could not reserve a local TCP port."));
        return;
      }
      server.close((error) =>
        error ? rejectPort(error) : resolvePort(address.port),
      );
    });
  });
}

async function waitFor(url, label) {
  const deadline = Date.now() + 30_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(
    `${label} did not become ready: ${lastError instanceof Error ? lastError.message : "timeout"}`,
  );
}

function stop(process) {
  if (!process.killed) process.kill("SIGTERM");
}

async function runMobileLighthouse() {
  const [previewPort, chromePort] = await Promise.all([
    reservePort(),
    reservePort(),
  ]);
  const preview = spawn(
    "pnpm",
    [
      "exec",
      "astro",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(previewPort),
    ],
    {
      cwd: websiteRoot,
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
      stdio: "ignore",
    },
  );
  const chromeProfile = join(websiteRoot, "output", "lighthouse-profile");
  const chrome = spawn(
    chromium.executablePath(),
    [
      "--headless=new",
      `--remote-debugging-port=${chromePort}`,
      `--user-data-dir=${chromeProfile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
    ],
    { stdio: "ignore" },
  );

  try {
    await Promise.all([
      waitFor(`http://127.0.0.1:${previewPort}/`, "Astro preview"),
      waitFor(
        `http://127.0.0.1:${chromePort}/json/version`,
        "Lighthouse Chrome",
      ),
    ]);

    const results = [];
    for (const route of representativeRoutes) {
      const report = await lighthouse(
        `http://127.0.0.1:${previewPort}${route.path}`,
        {
          port: chromePort,
          onlyCategories: ["performance"],
          logLevel: "error",
        },
      );
      const lhr = report?.lhr;
      assertion(lhr, `Lighthouse did not return a report for ${route.path}.`);

      const metric = (audit) => lhr.audits[audit]?.numericValue;
      const result = {
        path: route.path,
        performance: lhr.categories.performance.score ?? 0,
        largestContentfulPaint: metric("largest-contentful-paint") ?? Infinity,
        cumulativeLayoutShift: metric("cumulative-layout-shift") ?? Infinity,
        totalBlockingTime: metric("total-blocking-time") ?? Infinity,
      };

      assertion(
        result.performance >= lighthouseThresholds.performance,
        `${route.path} Lighthouse performance score is ${result.performance}.`,
      );
      assertion(
        result.largestContentfulPaint <=
          lighthouseThresholds.largestContentfulPaint,
        `${route.path} Lighthouse LCP is ${result.largestContentfulPaint}ms.`,
      );
      assertion(
        result.cumulativeLayoutShift <=
          lighthouseThresholds.cumulativeLayoutShift,
        `${route.path} Lighthouse CLS is ${result.cumulativeLayoutShift}.`,
      );
      assertion(
        result.totalBlockingTime <= lighthouseThresholds.totalBlockingTime,
        `${route.path} Lighthouse TBT is ${result.totalBlockingTime}ms.`,
      );
      results.push(result);
    }
    return results;
  } finally {
    stop(chrome);
    stop(preview);
  }
}

async function main() {
  const staticOutput = await inspectStaticOutput();
  const lighthouse = await runMobileLighthouse();
  console.log(
    `performance-ok: files=${staticOutput.files} max-static=${staticOutput.maximumStaticFileBytes} ` +
      `routes=${staticOutput.routes.map((route) => `${route.path}:${route.initialJavaScriptGzipBytes}`).join(",")} ` +
      `lighthouse=${lighthouse.map((route) => `${route.path}:${route.performance.toFixed(2)}`).join(",")}`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(
      `performance-failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  });
}
