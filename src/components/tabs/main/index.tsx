import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

import { ZxcvbnResult, zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { checkboxes, radios } from "~/libs/addons";
import generator, { GenerateOptions } from "generate-password-browser";
import { useContext, useEffect, useState } from "preact/hooks";

import { GenerateOptionsContext } from "~/context/generate-options";
import InputPassword from "~/components/inputs/password/password";
import InputRange from "~/components/inputs/range/range";
import NativeInputCheckbox from "~/components/inputs/checkbox";
import NativeInputRadio from "~/components/inputs/radio/radio";
import Skeleton from "~/components/skeleton/skeleton";
import { TabPanel } from "@headlessui/react";
import isEqual from "lodash/isEqual";
import { secondsToHumanReadable } from "~/libs/time-duration";
import { useLocale } from "~/context/locale";

zxcvbnOptions.setOptions({
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
});

export default function TabMain() {
  const generateOptionsContext = useContext(GenerateOptionsContext);

  const _symbolsText = '[!@#$%^&*()+_-=}{[]|:;"/?.><,`~]';

  if (!generateOptionsContext) {
    throw new Error(
      "YourComponent must be used within a GenerateOptionsProvider",
    );
  }

  const { generateOptions, setGenerateOptions } = generateOptionsContext;

  const { locale } = useLocale();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [zxcvbnData, setZxcvbnData] = useState<ZxcvbnResult>();

  useEffect(() => {
    const generatedPassword = generator.generate(generateOptions);
    setPassword(generatedPassword);
    setZxcvbnData(zxcvbn(generatedPassword));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setPassword(generator.generate(generateOptions));
  }, [generateOptions]);

  useEffect(() => {
    setZxcvbnData(() => zxcvbn(password));
  }, [password]);

  useEffect(() => {
    setScore(() => zxcvbnData?.score || 0);
  }, [zxcvbnData]);

  const estimatedTimeToCrackTemplate = chrome.i18n.getMessage(
    "estimated_time_to_crack",
  );

  // Calculate the human-readable time
  const humanReadableTime = secondsToHumanReadable(
    zxcvbnData?.crackTimesSeconds.offlineSlowHashing1e4PerSecond || 0,
    locale,
    { first: true },
  );
  const estimatedTimeToCrack = estimatedTimeToCrackTemplate.replace(
    "{{time}}",
    humanReadableTime,
  );

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setGenerateOptions((prevOptions: GenerateOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  return (
    <TabPanel class="h-[410px] overflow-x-auto rounded-xl bg-slate-400/5 p-4 shadow">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div class="grid grid-cols-12 gap-x-2 gap-y-4">
          <div class="col-span-12">
            {" "}
            <InputPassword
              label="Password"
              value={password}
              score={score}
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                const value = target.value.replace(/\s+/g, "").trim();
                setPassword(value);
              }}
            />
          </div>
          <div class="col-span-12">{estimatedTimeToCrack}</div>
          <div class="col-span-12">
            <InputRange
              label={chrome.i18n.getMessage("input_range_length_label")}
              max={32}
              min={4}
              step={1}
              value={generateOptions.length as number}
              onChange={(event: Event) => {
                const target = event.target as HTMLInputElement;
                const value = Number(target.value);
                setGenerateOptions((prevOptions) => ({
                  ...prevOptions,
                  length: value,
                }));
              }}
            />
          </div>
          <fieldset class="col-span-5 flex flex-col justify-between text-nowrap">
            <legend class="sr-only">
              {chrome.i18n.getMessage("legend_preset")}
            </legend>
            <div class="space-y-1">
              {radios.map((radio, index) => (
                <NativeInputRadio
                  key={`radio-${index}`}
                  label={radio.label}
                  checked={isEqual(generateOptions, radio.preset)}
                  onChange={() => {
                    setGenerateOptions(radio.preset);
                    console.log(
                      JSON.stringify(generateOptions),
                      JSON.stringify(radio.preset),
                    );
                  }}
                />
              ))}
            </div>
          </fieldset>
          <fieldset class="col-span-7">
            <legend class="sr-only">
              {chrome.i18n.getMessage("legend_options")}
            </legend>
            <div class="space-y-1">
              {checkboxes.map((checkbox, index) => (
                <NativeInputCheckbox
                  key={`radio-${index}`}
                  label={checkbox.label}
                  description={`${checkbox.description ? checkbox.description : ""}${checkbox.name === "symbols" ? (typeof generateOptions[checkbox.name as keyof GenerateOptions] !== "boolean" ? generateOptions[checkbox.name as keyof GenerateOptions] : _symbolsText) : ""}`}
                  checked={
                    (generateOptions[checkbox.name as keyof GenerateOptions] ||
                      false) as boolean
                  }
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement;
                    handleCheckboxChange(checkbox.name, target.checked);
                  }}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </TabPanel>
  );
}
