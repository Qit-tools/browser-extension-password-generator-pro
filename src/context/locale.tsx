import { FunctionComponent, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

import type { ComponentChildren } from "preact";

// Define the shape of the context
interface LocaleContextType {
  locale: string;
}

// Create the context with a default value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Create a provider component
interface LocaleProviderProps {
  children: ComponentChildren;
}

export const LocaleProvider: FunctionComponent<LocaleProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>(chrome.i18n.getUILanguage());

  useEffect(() => {
    const currentLocale = chrome.i18n.getUILanguage();
    setLocale(currentLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Create a custom hook to use the locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
