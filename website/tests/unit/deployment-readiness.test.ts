import { describe, expect, it } from "vitest";

import {
  approvedPublicSiteUrl,
  canonicalRoutes,
  productionRobots,
  releaseEnvironment,
  sitemapXml,
} from "../../scripts/prepare-release-output.mjs";

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
