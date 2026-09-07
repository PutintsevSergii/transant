import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  redirects: {
    "/technology": "/engineering-services",
    "/de/technology": "/de/engineering-services",
    "/uk/technology": "/uk/engineering-services",
    "/pl/technology": "/pl/engineering-services",
    "/cs/technology": "/cs/engineering-services",
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
