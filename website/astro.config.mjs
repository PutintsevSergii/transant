import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  redirects: {
    "/engineering-services": "/pro-platform-projects",
    "/de/engineering-services": "/de/pro-platform-projects",
    "/uk/engineering-services": "/uk/pro-platform-projects",
    "/pl/engineering-services": "/pl/pro-platform-projects",
    "/cs/engineering-services": "/cs/pro-platform-projects",
    "/technology": "/pro-platform-projects",
    "/de/technology": "/de/pro-platform-projects",
    "/uk/technology": "/uk/pro-platform-projects",
    "/pl/technology": "/pl/pro-platform-projects",
    "/cs/technology": "/cs/pro-platform-projects",
  },
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self' mailto:",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
      ],
    },
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
