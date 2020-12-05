import React from "react";
import { useLocalStorage } from "@hooks";
import { IPreferences, Locale } from "@types";

const defaultPreferences: IPreferences = { locale: Locale.EN };

export interface PreferencesContextType {
  preferences: IPreferences;
  setPreferences: (preferences: IPreferences) => void;
}

export const PreferencesContext = React.createContext<PreferencesContextType>({
  preferences: defaultPreferences,
  setPreferences: () => undefined,
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
