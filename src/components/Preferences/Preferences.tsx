import React from "react";
import { useLocalStorage } from "@hooks";
import { IPreferences, Locale } from "@types";

const defaultLocale = Locale.EN;
const defaultPreferences: IPreferences = { locale: defaultLocale };

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

const PreferencesProvider: React.FC = ({ children }) => {
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
