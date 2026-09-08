import { describe, expect, it } from "vitest";

import { translateLocalizedContent } from "../../src/adapters/content/localized-view-model";
import {
  createSiteLayout,
  createLocaleOptions,
  createPrimaryNavigation,
  siteLocales,
} from "../../src/adapters/content/site-shell-view-model";

describe("createLocaleOptions", () => {
  it("keeps the current English route and maps the homepage to the local German route", () => {
    expect(createLocaleOptions("/")).toEqual([
      { label: "EN", name: "English", href: "/", current: true },
      { label: "DE", name: "Deutsch", href: "/de/", current: false },
      { label: "UA", name: "Українська", href: "/uk/", current: false },
      { label: "PL", name: "Polski", href: "/pl/", current: false },
      { label: "CZ", name: "Čeština", href: "/cs/", current: false },
    ]);
  });

  it("preserves the route beneath the local German prefix", () => {
    expect(createLocaleOptions("/contact/")[1]).toEqual({
      label: "DE",
      name: "Deutsch",
      href: "/de/contact/",
      current: false,
    });
  });

  it("marks the German option current when rendering a German route", () => {
    expect(
      createLocaleOptions("/wagons/open-box/uno-multi-40ft-eanos/", "de")[1],
    ).toEqual({
      label: "DE",
      name: "Deutsch",
      href: "/de/wagons/open-box/uno-multi-40ft-eanos/",
      current: true,
    });
  });

  it("applies a locale prefix only once when given a localized path", () => {
    expect(createLocaleOptions("/de/contact/", "de")).toEqual([
      { label: "EN", name: "English", href: "/contact/", current: false },
      {
        label: "DE",
        name: "Deutsch",
        href: "/de/contact/",
        current: true,
      },
      {
        label: "UA",
        name: "Українська",
        href: "/uk/contact/",
        current: false,
      },
      {
        label: "PL",
        name: "Polski",
        href: "/pl/contact/",
        current: false,
      },
      {
        label: "CZ",
        name: "Čeština",
        href: "/cs/contact/",
        current: false,
      },
    ]);
  });

  it("publishes the requested labels with standards-compliant language codes and same-route links", () => {
    expect(siteLocales.map(({ code, label }) => ({ code, label }))).toEqual([
      { code: "en", label: "EN" },
      { code: "de", label: "DE" },
      { code: "uk", label: "UA" },
      { code: "pl", label: "PL" },
      { code: "cs", label: "CZ" },
    ]);
    expect(createLocaleOptions("/uk/pro-platform-projects/", "uk")[4]).toEqual({
      label: "CZ",
      name: "Čeština",
      href: "/cs/pro-platform-projects/",
      current: false,
    });
  });

  it("omits Home on the homepage and exposes the full wagon group without JavaScript-only data", () => {
    const navigation = createPrimaryNavigation("/");

    expect(navigation.map(({ label }) => label)).toEqual([
      "Wagons",
      "PRO platform projects",
      "Company",
    ]);
    expect(navigation[0]).toMatchObject({
      href: "/wagons/",
      overviewLabel: "All wagons",
    });
    expect(navigation[0]?.children).toHaveLength(5);
    expect(navigation[0]?.children?.map(({ href }) => href)).toEqual([
      "/wagons/intermodal/",
      "/wagons/flat/",
      "/wagons/timber/",
      "/wagons/open-box/",
      "/wagons/tank/",
    ]);
  });

  it("shows localized Home away from the homepage and uses the new canonical service route", () => {
    const navigation = createPrimaryNavigation("/de/company/", "de");

    expect(navigation[0]).toEqual({ label: "Startseite", href: "/de/" });
    expect(navigation[1]).toMatchObject({
      label: "Wagen",
      href: "/de/wagons/",
      overviewLabel: "Alle Wagen",
    });
    expect(navigation[2]).toEqual({
      label: "PRO-Plattformprojekte",
      href: "/de/pro-platform-projects/",
    });
  });

  it("uses authored freight-wagon terminology and preserves technical values", () => {
    expect(
      translateLocalizedContent("Freight wagon technical data", "uk"),
    ).toBe("Технічні дані вантажних вагонів");
    expect(translateLocalizedContent("Technical data", "pl")).toBe(
      "Dane techniczne",
    );
    expect(translateLocalizedContent("Loading configuration", "cs")).toBe(
      "Konfigurace nakládky",
    );
    expect(translateLocalizedContent("EN 15085-2:2020+A1:2023", "cs")).toBe(
      "EN 15085-2:2020+A1:2023",
    );
  });

  it("omits the retired Sustainability route from every localized shell", () => {
    for (const locale of siteLocales.map(({ code }) => code)) {
      const layout = createSiteLayout(
        "Title",
        "Description",
        "/company/",
        locale,
      );
      expect(layout.header.navigation).not.toContainEqual(
        expect.objectContaining({
          href: expect.stringContaining("sustainability"),
        }),
      );
      expect(
        layout.footer.groups.flatMap(({ links }) => links),
      ).not.toContainEqual(
        expect.objectContaining({
          href: expect.stringContaining("sustainability"),
        }),
      );
    }
  });

  it("supplies the approved text-only TAS Group relationship to every localized shell", () => {
    for (const locale of siteLocales.map(({ code }) => code)) {
      const layout = createSiteLayout(
        "Title",
        "Description",
        "/company/",
        locale,
      );
      expect(layout.header.affiliation).toEqual({
        companyLabel: "TAS GROUP COMPANY",
      });
      expect(layout.footer.affiliation).toBe("Part of TAS Group");
    }
  });
});
