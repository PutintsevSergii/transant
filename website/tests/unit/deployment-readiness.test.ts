import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  approvedPublicSiteUrl,
  canonicalRoutes,
  productionRobots,
  releaseEnvironment,
  sitemapXml,
} from "../../scripts/prepare-release-output.mjs";
import { requiredVercelConfiguration } from "../../scripts/verify-deployment-readiness.mjs";

describe("I-006 deployment readiness contract", () => {
  it("accepts only an origin-safe HTTPS public site URL", () => {
    expect(approvedPublicSiteUrl("https://www.example.test/")).toBe(
      "https://www.example.test",
    );
    expect(() => approvedPublicSiteUrl("http://www.example.test")).toThrow(
      "must use HTTPS",
    );
    expect(() =>
      approvedPublicSiteUrl("https://www.example.test/preview"),
    ).toThrow("must be an origin");
  });

  it("derives only canonical public routes from static directory output", () => {
    const routes = canonicalRoutes("/release", [
      "/release/index.html",
      "/release/contact/index.html",
      "/release/wagons/index.html",
      "/release/404.html",
    ]);

    expect(routes).toEqual(["/", "/contact/", "/wagons/"]);
  });

  it("excludes legacy PRO route redirects from canonical routes and the sitemap", () => {
    const routes = canonicalRoutes("/release", [
      "/release/index.html",
      "/release/pro-platform-projects/index.html",
      "/release/engineering-services/index.html",
      "/release/technology/index.html",
      "/release/de/pro-platform-projects/index.html",
      "/release/de/engineering-services/index.html",
      "/release/de/technology/index.html",
    ]);

    expect(routes).toEqual([
      "/",
      "/de/pro-platform-projects/",
      "/pro-platform-projects/",
    ]);
  });

  it("configures permanent hosting redirects for every legacy localized route", async () => {
    const config = JSON.parse(
      await readFile(join(process.cwd(), "vercel.json"), "utf8"),
    ) as Record<string, unknown>;

    expect(() => requiredVercelConfiguration(config)).not.toThrow();
  });

  it("makes sitemap and crawler policy agree for production", () => {
    const routes = ["/", "/contact/", "/wagons/"];
    const origin = "https://www.example.test";

    expect(sitemapXml(origin, routes)).toContain(
      "https://www.example.test/contact/",
    );
    expect(productionRobots(origin)).toContain(
      "Sitemap: https://www.example.test/sitemap.xml",
    );
  });

  it("keeps previews no-index and derives the Vercel production origin", () => {
    expect(releaseEnvironment({ vercelEnvironment: "preview" })).toEqual({
      kind: "preview",
      siteUrl: undefined,
    });
    expect(
      releaseEnvironment({
        vercelEnvironment: "production",
        vercelProductionHost: "transant.vercel.app",
      }),
    ).toEqual({
      kind: "production",
      siteUrl: "https://transant.vercel.app",
    });
    expect(() => releaseEnvironment()).toThrow("Provide PUBLIC_SITE_URL");
  });
});
