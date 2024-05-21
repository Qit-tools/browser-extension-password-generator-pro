import { Button, Switch, TabPanel } from "@headlessui/react";
import { useEffect, useState } from "preact/hooks";

import { DateTime } from "luxon";
import EmojiScoreMap from "~/components/scores/scores";
import { HistoryData } from "~/libs/types";
import Skeleton from "~/components/skeleton/skeleton";
import browser from "webextension-polyfill";
import clsx from "clsx";
import { emojiScore } from "~/libs/addons";
import { useCopyToClipboard } from "usehooks-ts";

export default function TabHistory() {
  const [, copy] = useCopyToClipboard();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<HistoryData>({ historyList: [] });
  const [saveHistory, setSaveHistory] = useState<boolean>(true);

  useEffect(() => {
    const updateData = async () => {
      const result = await browser.storage.sync.get([
        "historyData",
        "saveHistory",
      ]);
      if (result.historyData) {
        setData(result.historyData);
      }
      if (result.saveHistory !== undefined) {
        setSaveHistory(result.saveHistory);
      }
    };

    updateData();

    const handleStorageChange = (
      changes: { [key: string]: browser.Storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName === "sync") {
        if (changes.historyData) {
          setData(changes.historyData.newValue);
        }
        if (changes.saveHistory) {
          setSaveHistory(changes.saveHistory.newValue);
        }
      }
    };

    browser.storage.onChanged.addListener(handleStorageChange);

    setIsLoading(false);

    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const clearHistory = async () => {
    await browser.storage.sync.set({ historyData: { historyList: [] } });
    setData({ historyList: [] });
  };

  const handleSaveHistoryToggle = async () => {
    const newSaveHistory = !saveHistory;
    setSaveHistory(newSaveHistory);
    await browser.storage.sync.set({ saveHistory: newSaveHistory });
  };

  return (
    <TabPanel class="flex h-[410px] flex-col justify-between overflow-x-auto rounded-xl bg-slate-400/5 shadow">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div class="relative">
            <ul class="h-[340px] overflow-auto whitespace-nowrap p-4 text-left text-base leading-7">
              {data.historyList.map((item, index) => (
                <li key={`password-${index}`} class="flex items-center gap-1">
                  <EmojiScoreMap
                    emoji={emojiScore[item.score]}
                    {...{ class: "h-4 w-4" }}
                  />
                  <button
                    class="truncate"
                    onClick={(event: Event) => {
                      const target = event.target as HTMLButtonElement;
                      target.classList.add("animate-fade-out-up");
                      target.classList.add("text-green-600");
                      const id = setTimeout(() => {
                        target.classList.remove("animate-fade-out-up");
                        target.classList.remove("text-green-600");
                      }, 500);
                      copy(item.password);

                      return () => clearTimeout(id);
                    }}
                  >
                    {item.password}
                  </button>
                  •
                  <div class={clsx("text-xs", "text-slate-500")}>
                    {DateTime.fromISO(item.ISODate).toRelative()}
                  </div>
                </li>
              ))}
            </ul>
            <div class="pointer-events-none absolute bottom-0 left-0 h-16 w-full border-b-2 border-slate-300 bg-gradient-to-t from-slate-200 from-10% to-transparent dark:border-slate-700 dark:from-slate-900"></div>
          </div>
          <div class="flex items-end justify-between p-4">
            <Button
              class="btn btn-light min-w-16 max-w-24"
              onClick={clearHistory}
            >
              {browser.i18n.getMessage("button_clear")}
            </Button>
            <label
              class="flex cursor-pointer items-center pl-4 rtl:pl-0 rtl:pr-4"
              for="save-history"
            >
              <Switch
                id="save-history"
                checked={saveHistory}
                onChange={handleSaveHistoryToggle}
                class="switch group"
              >
                <span
                  aria-hidden="true"
                  class="group-data-[checked]:translate-x-4 rtl:group-data-[checked]:-translate-x-4"
                />
              </Switch>
              <span>
                {browser.i18n.getMessage("switch_save_history_label")}
              </span>
            </label>
          </div>
        </>
      )}
    </TabPanel>
  );
}
