import { useEffect, useState } from "preact/hooks";

import { Switch } from "@headlessui/react";
import browser from "webextension-polyfill"; // Импорт полифила

export const ThemeToggle = () => {
  // Determine if the user has a set theme preference
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // State to track the current theme, defaulting to user's preference
  const [theme, setTheme] = useState(prefersDarkMode ? "dark" : "light");

  // State to track the switch component
  const [enabled, setEnabled] = useState(theme === "dark");

  // Load theme from sync storage
  useEffect(() => {
    browser.storage.sync.get("theme").then((data) => {
      if (data.theme) {
        setTheme(data.theme);
        setEnabled(data.theme === "dark");
      }
    });
  }, []);

  // Effect to apply the class to the body and sync with sync storage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    browser.storage.sync.set({ theme });
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    setEnabled((prevEnabled) => !prevEnabled);
  };

  return (
    <label class="flex items-center pl-4 rtl:pl-0 rtl:pr-4" for="theme-toggle">
      <Switch
        id="theme-toggle"
        checked={enabled}
        onChange={toggleTheme}
        class="switch group"
      >
        <span
          aria-hidden="true"
          class="group-data-[checked]:translate-x-4 rtl:group-data-[checked]:-translate-x-4"
        />
      </Switch>
      <span>{browser.i18n.getMessage("switch_theme")}</span>
    </label>
  );
};

export default ThemeToggle;
