import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import manifest from "./src/manifest.firefox";
import merge from "lodash/merge";
import viteConfig from "./vite.config";

export default defineConfig(
  merge(viteConfig, {
    build: {
      outDir: "build/firefox",
    },
    plugins: [
      ...(viteConfig.plugins ? viteConfig.plugins : []),
      crx({ manifest }),
    ],
  }),
);
