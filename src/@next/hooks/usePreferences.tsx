import { useContext } from "react";
import { PreferencesContext } from "@temp/components/Preferences";

export const usePreferences = () => {
  return useContext(PreferencesContext);
};
