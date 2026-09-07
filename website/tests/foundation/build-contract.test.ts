import { access, readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const productionOutput = join(projectRoot, "dist");
const labOutput = join(projectRoot, "dist-component-lab");

async function readTextBuildFiles(
  root: string,
): Promise<Array<{ path: string; contents: string }>> {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  const textExtensions = new Set([".css", ".html", ".js", ".mjs"]);
  const files: Array<{ path: string; contents: string }> = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const absolutePath = join(entry.parentPath, entry.name);
    const extension = entry.name.slice(entry.name.lastIndexOf("."));
    if (!textExtensions.has(extension)) continue;
    files.push({
      path: relative(root, absolutePath),
      contents: await readFile(absolutePath, "utf8"),
    });
  }

  return files;
}

describe("isolated Astro build contract", () => {
  it("keeps component-lab routes and markers out of production", async () => {
    await access(join(productionOutput, "index.html"));
    await expect(
      access(join(productionOutput, "fixtures", "smoke", "index.html")),
    ).rejects.toThrow();

    const productionFiles = await readTextBuildFiles(productionOutput);
    expect(
      productionFiles.some(({ contents }) =>
        contents.includes("data-component-lab"),
      ),
    ).toBe(false);
    expect(
      productionFiles.some(({ path }) => path.includes("fixtures/smoke")),
    ).toBe(false);
  });

  it("builds the component-lab index and smoke fixture", async () => {
    const index = await readFile(join(labOutput, "index.html"), "utf8");
    const smoke = await readFile(
      join(labOutput, "fixtures", "smoke", "index.html"),
      "utf8",
    );

    expect(index).toContain("data-component-lab");
    expect(index).toContain("/fixtures/smoke/");
    expect(smoke).toContain('data-fixture="foundation-smoke"');
  });

  it("builds canonical Engineering & Services pages and static legacy redirects", async () => {
    for (const localePrefix of ["", "de", "uk", "pl", "cs"]) {
      const routeParts = localePrefix ? [localePrefix] : [];
      const canonical = await readFile(
        join(
          productionOutput,
          ...routeParts,
          "engineering-services",
          "index.html",
        ),
        "utf8",
      );
      const redirect = await readFile(
        join(productionOutput, ...routeParts, "technology", "index.html"),
        "utf8",
      );
      const destination = `${localePrefix ? `/${localePrefix}` : ""}/engineering-services`;

      expect(canonical).toContain(`${destination}/`);
      expect(redirect).toContain(destination);
      expect(redirect).toContain('http-equiv="refresh"');
    }
  });

  it("does not emit Google-hosted images or fonts", async () => {
    const files = [
      ...(await readTextBuildFiles(productionOutput)),
      ...(await readTextBuildFiles(labOutput)),
    ];
    const googleRuntimeHost =
      /(?:fonts\.googleapis\.com|fonts\.gstatic\.com|googleusercontent\.com|ggpht\.com)/i;
    const offenders = files
      .filter(({ contents }) => googleRuntimeHost.test(contents))
      .map(({ path }) => path);

    expect(offenders).toEqual([]);
  });
});
