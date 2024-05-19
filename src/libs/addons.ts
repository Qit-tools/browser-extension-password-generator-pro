export const emojiScore = ["🚫", "😔", "😬", "👌", "🔒"];

export const ringClassScore = [
  "ring-red-600 dark:ring-red-400 focus:ring-red-600 dark:focus:ring-red-400",
  "ring-orange-600 dark:ring-orange-400 focus:ring-orange-600 dark:focus:ring-orange-400",
  "ring-yellow-600 dark:ring-yellow-400 focus:ring-yellow-600 dark:focus:ring-yellow-400",
  "ring-lime-600 dark:ring-lime-400 focus:ring-lime-600 dark:focus:ring-lime-400",
  "ring-green-600 dark:ring-green-400 focus:ring-green-600 dark:focus:ring-green-400",
];

export const happyPreset = {
  length: 13,
  numbers: true,
  symbols: "_-",
  lowercase: true,
  uppercase: true,
  excludeSimilarCharacters: true,
  strict: true,
  exclude: "",
};

export function formatNumber(num: number): string | undefined {
  if (num > 9) {
    return "9+";
  } else if (num >= 1 && num <= 9) {
    return num.toString();
  }
}

export function getBrowserExtUrl(): string {
  const userAgent = navigator.userAgent;
  let browserName: string = "Unknown";

  if (userAgent.includes("Firefox")) {
    browserName =
      "https://addons.mozilla.org/en-US/firefox/addon/password-generator-pro/";
  } else if (userAgent.includes("Edg")) {
    browserName = "https://qit.tools/";
  } else if (userAgent.includes("Chrome")) {
    if (userAgent.includes("Brave")) {
      browserName = "https://qit.tools/";
    } else if (userAgent.includes("OPR")) {
      browserName = "https://qit.tools/";
    } else {
      browserName =
        "https://chromewebstore.google.com/detail/fjikmpjpehingmmhoaomifbfpjchmmad";
    }
  } else if (userAgent.includes("Safari")) {
    browserName = "https://qit.tools/";
  }

  return browserName;
}

export const checkboxes = [
  {
    label: chrome.i18n.getMessage("checkbox_uppercase_label"),
    name: "uppercase",
  },
  {
    label: chrome.i18n.getMessage("checkbox_lowercase_label"),
    name: "lowercase",
  },
  {
    label: chrome.i18n.getMessage("checkbox_numbers_label"),
    name: "numbers",
  },
  {
    label: chrome.i18n.getMessage("checkbox_strict_label"),
    name: "strict",
    description: chrome.i18n.getMessage("checkbox_strict_description"),
  },
  {
    label: chrome.i18n.getMessage("checkbox_excludeSimilarCharacters_label"),
    name: "excludeSimilarCharacters",
    description: chrome.i18n.getMessage(
      "checkbox_excludeSimilarCharacters_description",
    ),
  },
  {
    label: chrome.i18n.getMessage("checkbox_symbols_label"),
    name: "symbols",
    description: "",
  },
];

export const radios = [
  {
    label: chrome.i18n.getMessage("radio_easy_to_say_label"),
    preset: {
      length: 10,
      numbers: false,
      symbols: false,
      lowercase: true,
      uppercase: true,
      excludeSimilarCharacters: false,
      strict: false,
      exclude: "",
    },
  },
  {
    label: chrome.i18n.getMessage("radio_easy_to_read_label"),
    preset: {
      length: 12,
      numbers: true,
      symbols: false,
      lowercase: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: false,
      exclude: "",
    },
  },
  {
    label: chrome.i18n.getMessage("radio_happy_label"),
    preset: happyPreset,
  },
  {
    label: chrome.i18n.getMessage("radio_strong_label"),
    preset: {
      length: 13,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      excludeSimilarCharacters: false,
      strict: true,
      exclude: "",
    },
  },
  {
    label: chrome.i18n.getMessage("radio_paranoid_label"),
    preset: {
      length: 16,
      numbers: true,
      symbols: true,
      lowercase: false,
      uppercase: true,
      excludeSimilarCharacters: false,
      strict: true,
      exclude: "",
    },
  },
];
