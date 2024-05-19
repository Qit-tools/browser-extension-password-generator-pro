import { crx } from "@crxjs/vite-plugin";
import deadFile from "vite-plugin-deadfile";
import { defineConfig } from "vite";
import manifest from "./src/manifest";
import pkg from "./package.json";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "build",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/chunk-[hash].js",
      },
    },
  },
  plugins: [
    crx({ manifest }),
    preact(),
    tsconfigPaths(),
    deadFile({
      root: "src",
    }),
  ],
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __NAME__: JSON.stringify(pkg.name),
    __DESCRIPTION__: JSON.stringify(pkg.description),
    __AUTHOR__: JSON.stringify(pkg.author),
    __FUNDING__: JSON.stringify(pkg.funding),
    __HOMEPAGE__: JSON.stringify(pkg.homepage),
    __LICENSE__: JSON.stringify(pkg.license),
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
