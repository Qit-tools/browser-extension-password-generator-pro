import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "../package.json";

export default defineManifest({
  name: "Password Generator PRO",
  short_name: "Password PRO",
  description:
    "Powerful and user-friendly extension/add-on with PRO features for randomly generating and checking passwords security.",
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
} as never);
