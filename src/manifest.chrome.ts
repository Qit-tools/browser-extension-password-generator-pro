import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  name: "Password Generator PRO",
  short_name: "Password PRO",
  description: pkg.description,
  version: pkg.version,
  minimum_chrome_version: "88",
  offline_enabled: true,
  manifest_version: 3,
  icons: {
    128: "icons/logo.png",
  },
  optional_permissions: ["clipboardWrite"],
  default_locale: "en",
  action: {
    default_popup: "popup.html",
    default_icon: "icons/logo.png",
  },
  permissions: ["storage"],
});
