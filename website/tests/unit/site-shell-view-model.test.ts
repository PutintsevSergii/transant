import { describe, expect, it } from "vitest";

import { translateLocalizedContent } from "../../src/adapters/content/localized-view-model";
import {
  createLocaleOptions,
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
    expect(createLocaleOptions("/uk/technology/", "uk")[4]).toEqual({
      label: "CZ",
      name: "Čeština",
      href: "/cs/technology/",
      current: false,
    });
  });

  it("uses authored freight-wagon terminology and preserves technical values", () => {
    expect(translateLocalizedContent("Freight wagon technology", "uk")).toBe(
      "Технології вантажних вагонів",
    );
    expect(translateLocalizedContent("Engineering & approval", "pl")).toBe(
      "Projektowanie i dopuszczenie",
    );
    expect(translateLocalizedContent("High-strength steel", "cs")).toBe(
      "Vysokopevnostní ocel",
    );
    expect(translateLocalizedContent("EN 15085-2:2020+A1:2023", "cs")).toBe(
      "EN 15085-2:2020+A1:2023",
    );
  });
});
