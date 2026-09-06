import { describe, expect, it } from "vitest";

import {
  canonicalWidths,
  responsiveProjects,
} from "../support/responsive-viewports";

describe("responsive viewport contract", () => {
  it("defines every canonical evidence width exactly once", () => {
    const configuredWidths = responsiveProjects
      .filter(({ name }) => name !== "chromium-phone-landscape")
      .map(({ viewport }) => viewport.width);

    expect(configuredWidths).toEqual(canonicalWidths);
    expect(new Set(configuredWidths).size).toBe(canonicalWidths.length);
  });

  it("defines the required phone-landscape mode", () => {
    expect(responsiveProjects).toContainEqual({
      name: "chromium-phone-landscape",
      viewport: { width: 844, height: 390 },
      isMobile: true,
    });
  });
});
