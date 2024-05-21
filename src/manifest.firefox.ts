import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  name: "Password Generator PRO",
  short_name: "Password PRO",
  description: pkg.description,
  version: pkg.version,
  manifest_version: 3,
  icons: {
    128: "icons/logo.png",
  },
  default_locale: "en",
  action: {
    default_popup: "popup.html",
    default_icon: "icons/logo.png",
  },
  optional_permissions: ["clipboardWrite"],
  permissions: ["storage"],
  browser_specific_settings: {
    gecko: {
      id: "gecko-browser-extension-password-generator-pro@qit.tools",
      strict_min_version: "109.0",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
