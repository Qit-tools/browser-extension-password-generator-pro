import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  name: "__MSG_extName__",
  short_name: "__MSG_extShortName__",
  description: "__MSG_extDescription__",
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
    default_title: "__MSG_extName__",
    default_popup: "popup.html",
    default_icon: "icons/logo.png",
  },
  permissions: ["storage"],
});
