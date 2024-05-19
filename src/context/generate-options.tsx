import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import { FunctionalComponent, createContext } from "preact";

import { GenerateOptions } from "generate-password-browser";
import browser from "webextension-polyfill";
import { happyPreset } from "~/libs/addons";

// Create the context
const GenerateOptionsContext = createContext<
  | {
      generateOptions: GenerateOptions;
      setGenerateOptions: Dispatch<StateUpdater<GenerateOptions>>;
    }
  | undefined
>(undefined);

// Function to load options from sync storage (supports both Chrome and Firefox)
const loadGenerateOptions = async (): Promise<GenerateOptions> => {
  try {
    const items = await browser.storage.sync.get("generateOptions");
    if (items.generateOptions) {
      return items.generateOptions;
    } else {
      return happyPreset; // Use the happyPreset as a default
    }
  } catch (error) {
    console.error("Error loading generate options:", error);
    return happyPreset; // Use the happyPreset as a default on error
  }
};

// Function to save options to sync storage (supports both Chrome and Firefox)
const saveGenerateOptions = async (options: GenerateOptions) => {
  try {
    await browser.storage.sync.set({ generateOptions: options });
  } catch (error) {
    console.error("Error saving generate options:", error);
  }
};

// Provider component
const GenerateOptionsProvider: FunctionalComponent = ({ children }) => {
  const [generateOptions, setGenerateOptions] =
    useState<GenerateOptions>(happyPreset);

  useEffect(() => {
    // Load options from storage when the component mounts
    loadGenerateOptions().then((options) => {
      setGenerateOptions(options);
    });
  }, []);

  useEffect(() => {
    // Save options to storage whenever they change
    saveGenerateOptions(generateOptions);
  }, [generateOptions]);

  return (
    <GenerateOptionsContext.Provider
      value={{ generateOptions, setGenerateOptions }}
    >
      {children}
    </GenerateOptionsContext.Provider>
  );
};

export { GenerateOptionsContext, GenerateOptionsProvider };
