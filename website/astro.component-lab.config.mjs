import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  srcDir: "./component-lab",
  publicDir: "./public",
  outDir: "./dist-component-lab",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
  server: {
    host: "127.0.0.1",
    port: 4322,
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
