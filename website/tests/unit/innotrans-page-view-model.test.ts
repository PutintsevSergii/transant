import { describe, expect, it } from "vitest";

import { innoTransPageViewModel } from "../../src/adapters/content/innotrans-page-view-model";
import { siteLocales } from "../../src/adapters/content/site-shell-view-model";

describe("innoTransPageViewModel", () => {
  it("keeps exactly the four confirmed official position links and two approved partners", () => {
    const page = innoTransPageViewModel();

    expect(page.visit.positions.map(({ code }) => code)).toEqual([
      "O5/55",
      "T5/50",
      "T5/55",
      "T5/60",
    ]);
    expect(page.visit.positions.map(({ action }) => action.href)).toEqual([
      "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__O5_55",
      "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_50",
      "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_55",
      "https://plus.innotrans.de/hallplan/FGSUED--FGSUED__T5_60",
    ]);
    expect(page.partners.items.map(({ name }) => name)).toEqual([
      "TAS Group",
      "TAS Dniprovagonmash",
    ]);
  });

  it("provides the same canonical event route in every supported locale", () => {
    for (const { code } of siteLocales) {
      const page = innoTransPageViewModel(code);
      const prefix = code === "en" ? "" : `/${code}`;

      expect(page.layout.canonicalUrl).toBe(
        `https://www.transant.com${prefix}/innotrans-2026/`,
      );
      expect(page.layout.header.currentPath).toBe(`${prefix}/innotrans-2026/`);
      expect(page.layout.header.navigation).toContainEqual({
        label: "InnoTrans 2026",
        href: `${prefix}/innotrans-2026/`,
      });
      expect(page.contactCta.action.href).toBe(`${prefix}/contact/`);
    }
  });

  it("uses local partner media and leaves the unconfirmed exhibit list out of the model", () => {
    const page = innoTransPageViewModel();
    const serialized = JSON.stringify(page);

    expect(
      page.partners.items.every(({ logo }) =>
        typeof logo === "string"
          ? !logo.startsWith("http")
          : !logo.src.startsWith("http"),
      ),
    ).toBe(true);
    expect(serialized).not.toMatch(/final exhibit|exhibit list/iu);
  });
});
