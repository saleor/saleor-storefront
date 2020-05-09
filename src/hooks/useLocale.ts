import { useContext } from "react";

import { LocaleContext } from "../components/Locale";

function useLocale() {
  const localeInfo = useContext(LocaleContext);
  return localeInfo;
}
export default useLocale;
