import { Plugin } from "vite";
import fs from "fs/promises";
import path from "path";
import pkg from "./package.json";

const generateReadme = (): Plugin => {
  return {
    name: "vite-plugin-generate-readme",
    async buildEnd() {
      try {
        const templatePath = path.resolve(__dirname, "README.template.md");
        const outputPath = path.resolve(__dirname, "README.md");

        const data = await fs.readFile(templatePath, "utf8");

        const result = data
          .replace(/__NAME__/g, String(pkg.name))
          .replace(/__DESCRIPTION__/g, String(pkg.description))
          .replace(/__VERSION__/g, String(pkg.version));

        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, result, "utf8");
        console.log("README.md has been generated");
      } catch (err) {
        console.error("Error generating README.md:", err);
      }
    },
  };
};

export default generateReadme;
