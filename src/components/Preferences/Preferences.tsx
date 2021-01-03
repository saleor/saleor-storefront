import React from "react";
import { useLocalStorage } from "@hooks";
import { IPreferences, Locale } from "@types";
import detectBrowserLanguage from "detect-browser-language";

const browserLang: IPreferences =
  detectBrowserLanguage() === "it" ||
  detectBrowserLanguage() === "it-it" ||
  detectBrowserLanguage() === "it-IT"
    ? { locale: Locale.IT }
    : { locale: Locale.EN };

const browserSetLang: IPreferences =
  window.localStorage.preferences === "it"
    ? { locale: Locale.IT }
    : { locale: Locale.EN };

export const defaultPreferences: IPreferences = browserSetLang || browserLang;

export interface PreferencesContextType {
  preferences: IPreferences;
  setPreferences: (preferences: IPreferences) => void;
}

export const PreferencesContext = React.createContext<PreferencesContextType>({
  preferences: defaultPreferences,
  setPreferences: () => window.location.reload(false),
});

const {
  Consumer: PreferencesConsumer,
  Provider: RawPreferencesProvider,
} = PreferencesContext;

const PreferencesProvider: React.FC<{ defaultLocale?: string }> = ({
  defaultLocale,
  children,
}) => {
  if (defaultLocale) {
    defaultPreferences.locale = defaultLocale as Locale;
  }
  const [preferences, setPreferences] = useLocalStorage(
    "preferences",
    defaultPreferences
  );

  return (
    <RawPreferencesProvider
      value={{
        preferences,
        setPreferences,
      }}
    >
      {children}
    </RawPreferencesProvider>
  );
};

export { PreferencesProvider, PreferencesConsumer, RawPreferencesProvider };
