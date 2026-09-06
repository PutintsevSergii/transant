import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
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
        "form-action 'self'",
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
