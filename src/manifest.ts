import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  name: "__MSG_extName__",
  short_name: "__MSG_extShortName__",
  description: "__MSG_extDescription__",
  version: pkg.version,
  manifest_version: 3,
  icons: {
    128: "icons/logo.png",
  },
  default_locale: "en",
  minimum_chrome_version: "88",
  action: {
    default_popup: "popup.html",
    default_icon: "icons/logo.png",
  },
  permissions: ["storage"],
  browser_specific_settings: {
    gecko: {
      id: "browser-extension-password-generator-pro@qit.tools",
      strict_min_version: "109.0",
      android: {
        id: "browser-extension-password-generator-pro-android@qit.tools",
        strict_min_version: "109.0",
      },
    },
  },
} as never);
