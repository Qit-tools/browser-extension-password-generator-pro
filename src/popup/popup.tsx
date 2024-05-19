import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "preact/hooks";

import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import TabAbout from "~/components/tabs/about";
import TabHistory from "~/components/tabs/history";
import TabMain from "~/components/tabs/main";
import ThemeToggle from "~/components/theme-toggle/theme-toggle";
import browser from "webextension-polyfill"; // Импорт полифила
import clsx from "clsx";
import { formatNumber } from "~/libs/addons";

export const Popup = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [historyLength, setHistoryLength] = useState<string | undefined>();

  const updateHistoryLength = async () => {
    const result = await browser.storage.sync.get("historyData");
    if (result.historyData) {
      setHistoryLength(formatNumber(result.historyData.historyList.length));
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const sessionData = await browser.storage.session.get("tabIndex");
      if (sessionData.tabIndex !== undefined) {
        setTabIndex(sessionData.tabIndex);
      }
      await updateHistoryLength();

      // Listener for changes in storage
      const handleStorageChange = (
        changes: {
          [key: string]: browser.Storage.StorageChange;
        },
        areaName: string,
      ) => {
        if (areaName === "sync" && changes.historyData) {
          updateHistoryLength();
        }
      };

      browser.storage.onChanged.addListener(handleStorageChange);

      // Cleanup listener on component unmount
      return () => {
        browser.storage.onChanged.removeListener(handleStorageChange);
      };
    };

    initialize();
  }, []);

  useEffect(() => {
    browser.storage.session.set({ tabIndex });
    updateHistoryLength();
  }, [tabIndex]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const tabs = [
    { name: browser.i18n.getMessage("tab_main"), id: "main" },
    { name: browser.i18n.getMessage("tab_history"), id: "history" },
    { name: browser.i18n.getMessage("tab_about"), id: "about" },
  ];

  return (
    <main class="h-screen w-96">
      <section class="flex h-full flex-col justify-between" id="main">
        <Header />
        <div id="body" class="relative px-4 py-4">
          <div class="flex justify-center">
            <div class="w-full max-w-md">
              <TabGroup selectedIndex={tabIndex} onChange={handleTabChange}>
                <div class="flex items-center justify-between divide-x divide-slate-300 dark:divide-slate-700 rtl:divide-x-reverse">
                  <TabList class="flex items-center gap-4 pr-2 rtl:pl-2 rtl:pr-0">
                    {tabs.map((item) => (
                      <Tab
                        class={clsx([
                          "relative",
                          "rounded-full",
                          "px-2.5",
                          "py-1",
                          "font-semibold",
                          "focus:outline-none",
                          "data-[focus]:outline-1",
                          "text-slate-700",
                          "data-[hover]:bg-indigo-300/75",
                          "data-[selected]:bg-indigo-300/75",
                          "data-[selected]:data-[hover]:bg-indigo-300/75",
                          "data-[focus]:outline-indigo-300",
                          "data-[selected]:data-[hover]:text-slate-900",
                          "data-[hover]:text-slate-900",
                          "data-[selected]:text-slate-950",
                          "dark:text-slate-300",
                          "dark:data-[selected]:data-[hover]:text-slate-950",
                          "dark:data-[hover]:text-slate-950",
                          "dark:data-[selected]:text-slate-950",
                        ])}
                      >
                        {item.name}
                        {item.id === "history" && historyLength && (
                          <span class="absolute -right-2 -top-2 rounded-full bg-slate-500 px-2 py-0.5 text-xs font-bold text-gray-100">
                            {historyLength}
                          </span>
                        )}
                      </Tab>
                    ))}
                  </TabList>
                  <ThemeToggle />
                </div>
                <TabPanels class="mt-2">
                  <TabMain />
                  <TabHistory />
                  <TabAbout />
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
};

export default Popup;
