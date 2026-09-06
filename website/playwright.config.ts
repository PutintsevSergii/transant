import { defineConfig } from "@playwright/test";

import { responsiveProjects } from "./tests/support/responsive-viewports";

const previewPort = process.env.PLAYWRIGHT_PORT ?? "4322";
const previewUrl = `http://127.0.0.1:${previewPort}`;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  reporter: process.env.CI
    ? [
        ["line"],
        ["html", { outputFolder: "output/playwright/report", open: "never" }],
      ]
    : "line",
  outputDir: "output/playwright/test-results",
  snapshotPathTemplate:
    "{testDir}/../visual/{testFilePath}/{arg}-{projectName}{ext}",
  use: {
    baseURL: previewUrl,
    colorScheme: "light",
    locale: "en-GB",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: responsiveProjects.map(({ name, viewport, isMobile = false }) => ({
    name,
    use: {
      browserName: "chromium",
      viewport,
      isMobile,
    },
  })),
  webServer: {
    command: `ASTRO_TELEMETRY_DISABLED=1 astro build --config astro.component-lab.config.mjs && ASTRO_TELEMETRY_DISABLED=1 ASTRO_PREVIEW_BACKGROUND=false astro preview --config astro.component-lab.config.mjs --host 127.0.0.1 --port ${previewPort}`,
    url: previewUrl,
    // A local worker may reuse an already-authorized component-lab listener.
    // Normal and CI runs always keep the isolated preview lifecycle.
    reuseExistingServer:
      process.env.PLAYWRIGHT_REUSE_EXISTING_SERVER === "true",
    timeout: 120_000,
  },
});
