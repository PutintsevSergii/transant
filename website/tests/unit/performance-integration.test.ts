import { describe, expect, it } from "vitest";

import { representativeRoutes } from "../../scripts/verify-performance-integration.mjs";

describe("I-004 performance integration contract", () => {
  it("keeps the required mobile performance evidence set explicit", () => {
    expect(representativeRoutes).toEqual([
      expect.objectContaining({ path: "/", label: "homepage" }),
      expect.objectContaining({ path: "/wagons/", label: "catalogue" }),
      expect.objectContaining({
        path: "/wagons/open-box/uno-multi-56ft-eanos/",
        label: "widest-data-product",
      }),
      expect.objectContaining({ path: "/contact/", label: "contact" }),
    ]);
  });
});
