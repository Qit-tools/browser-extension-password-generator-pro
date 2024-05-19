import { Field, Input, Label } from "@headlessui/react";
import { emojiScore, ringClassScore } from "~/libs/addons";
import { useContext, useEffect, useId, useState } from "preact/hooks";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import EmojiScoreMap from "~/components/scores/scores";
import { GenerateOptionsContext } from "~/context/generate-options";
import type { HistoryData } from "~/libs/types";
import browser from "webextension-polyfill"; // Импорт полифила
import clsx from "clsx";
import { useCopyToClipboard } from "usehooks-ts";

interface Props {
  score: number;
  label: string;
  value: string;
  onChange?: (event: Event) => void;
}

export default function InputPassword(props: Props) {
  const { label, score, ...restProps } = props;
  const generateOptionsContext = useContext(GenerateOptionsContext);
  if (!generateOptionsContext) {
    throw new Error(
      "YourComponent must be used within a GenerateOptionsProvider",
    );
  }
  const { generateOptions, setGenerateOptions } = generateOptionsContext;

  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const [saveHistory, setSaveHistory] = useState<boolean>(true);
  const inputId = useId();

  const handleClick = () => {
    if (isCopied) return;

    setIsCopied(true);
    copy(props.value);

    const newItem = {
      password: props.value,
      ISODate: new Date().toISOString(),
      score: props.score,
    };
    if (saveHistory) {
      browser.storage.sync.get(["historyData"]).then((result) => {
        const historyData: HistoryData = result.historyData || {
          historyList: [],
        };

        const existingItem = historyData.historyList.find(
          (item) => item.password === props.value,
        );
        if (existingItem) {
          console.log("Value already exists in historyList");
          return;
        }

        let updatedHistoryList = [newItem, ...historyData.historyList];

        if (updatedHistoryList.length > 25) {
          updatedHistoryList = [newItem, ...updatedHistoryList.slice(1, 25)];
        }

        const newData = { historyList: updatedHistoryList };
        browser.storage.sync.set({ historyData: newData }).then(() => {
          console.log("New item added to historyList");
        });

        console.log("Updated historyList: ", updatedHistoryList);
      });
    }
  };

  useEffect(() => {
    browser.storage.sync.get(["saveHistory"]).then((result) => {
      if (result.saveHistory !== undefined) {
        setSaveHistory(result.saveHistory);
        console.log("saveHistory: ", result.saveHistory);
      }
    });
  }, []);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [isCopied]);

  return (
    <Field>
      <Label for={inputId} class="sr-only">
        {label}
      </Label>
      <div class="relative mt-2 flex items-center">
        <div class="absolute inset-y-0 left-0 flex items-center py-1.5 pl-1.5 text-base rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-1.5">
          <EmojiScoreMap emoji={emojiScore[score]} {...{ class: "h-4 w-4" }} />
        </div>
        <Input
          id={inputId}
          class={clsx(
            "block w-full rounded-md border-0 py-1.5 pl-7 pr-14 text-slate-900 shadow-sm ring-1 dark:text-slate-200 rtl:pl-14 rtl:pr-7",
            "ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset dark:bg-slate-950",
            "sm:text-base sm:leading-6",
            ringClassScore[score],
          )}
          {...restProps}
        />
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-0.5 rtl:left-0 rtl:right-auto rtl:pl-0.5 rtl:pr-0">
          <button
            class="inline-flex items-center px-1 font-sans text-xs text-slate-400"
            onClick={() => {
              const _keep = generateOptions;
              setGenerateOptions({});
              const id = setTimeout(() => {
                setGenerateOptions(_keep);
              }, 0);
              return () => clearTimeout(id);
            }}
          >
            <ArrowPathIcon
              class="h-5 w-5 text-slate-700 dark:text-slate-300"
              aria-hidden="true"
            />
          </button>
          <button
            class="inline-flex items-center px-1 font-sans text-xs text-slate-400"
            onClick={handleClick}
          >
            {isCopied ? (
              <CheckIcon
                class={clsx(
                  "h-5 w-5 stroke-2",
                  isCopied && "text-green-600 dark:text-green-400",
                )}
                aria-hidden="true"
              />
            ) : (
              <ClipboardIcon
                class="h-5 w-5 text-slate-700 dark:text-slate-300"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </Field>
  );
}
