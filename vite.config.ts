import deadFile from "vite-plugin-deadfile";
import { defineConfig } from "vite";
import generateReadme from "./vite-plugin-readme";
import pkg from "./package.json";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: string) {
      return html.replace(`crossorigin `, "");
    },
  };
};

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/chunk-[hash].js",
      },
    },
  },
  plugins: [
    noAttr(),
    preact(),
    generateReadme(),
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
