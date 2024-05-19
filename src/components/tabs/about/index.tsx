import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import EmojiScoreMap from "~/components/scores/scores";
import { TabPanel } from "@headlessui/react";
import browser from "webextension-polyfill";

export default function TabAbout() {
  const credits = [
    {
      name: "zxcvbn",
      url: "https://github.com/dropbox/zxcvbn",
    },
    {
      name: "generate-password-browser",
      url: "https://github.com/oliver-la/generate-password-browser",
    },
    {
      name: "Luxon 3.x",
      url: "https://moment.github.io/luxon/",
    },
    {
      name: "Twemoji",
      url: "https://github.com/twitter/twemoji",
    },
  ];
  return (
    <TabPanel class="h-[410px] overflow-x-auto rounded-xl bg-slate-400/5 shadow">
      <div class="p-4 sm:px-0">
        <h3 class="flex items-center truncate text-base font-semibold leading-7 text-slate-900 dark:text-slate-200">
          <EmojiScoreMap emoji="🔒" class="me-1 h-4 w-4 rtl:ms-1" />{" "}
          {browser.i18n.getMessage("extName")}
        </h3>
        <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {browser.i18n.getMessage("about_version_label")}: {__VERSION__}
          <br />
          {browser.i18n.getMessage("about_license_label")}: {__LICENSE__}
        </p>
      </div>
      <div class="mt-0 border-t border-gray-300 dark:border-gray-700">
        <dl class="divide-y divide-gray-300 dark:divide-gray-700">
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-slate-900 dark:text-slate-200">
              🪪 {browser.i18n.getMessage("about_author_label")}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:col-span-2 sm:mt-0">
              <a
                href={__AUTHOR__.url}
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-x-1"
              >
                {__AUTHOR__.name}{" "}
                <ArrowTopRightOnSquareIcon
                  aria-hidden="true"
                  class="h-3 w-3 stroke-1"
                />
              </a>
              Email: {__AUTHOR__.email}
              <br />
              <a
                href={__FUNDING__.url}
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-x-1"
              >
                ☕{" "}
                <span class="title-gradient font-base/6 font-semibold">
                  Buy Me A Coffee
                </span>{" "}
                <ArrowTopRightOnSquareIcon
                  aria-hidden="true"
                  class="h-3 w-3 stroke-1"
                />
              </a>
            </dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-slate-900 dark:text-slate-200">
              ©️ {browser.i18n.getMessage("about_credits_label")}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:col-span-2 sm:mt-0">
              {credits.map((item) => (
                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    class="flex items-center gap-x-1"
                  >
                    {item.name}{" "}
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      class="h-3 w-3 stroke-1"
                    />
                  </a>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </TabPanel>
  );
}
