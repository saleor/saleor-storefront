import { I18nProvider } from "@lingui/react";
import React from "react";

import { I18nContext } from ".";
import { IProps } from "./types";

const fallbackLanguage = "en";

const getLangCode = (code: string) =>
  code.includes("-") ? code.split("-")[0] : code;

const defaultLanguage = getLangCode(
  (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    fallbackLanguage
  ).toLowerCase()
);

export const I18nLoader: React.FC<IProps> = ({ children, languages }: IProps) => {
  const [ language, setLanguage ] = React.useState<string>(() => {
    return languages.hasOwnProperty(defaultLanguage) ? defaultLanguage : fallbackLanguage;
  });
  const [ catalogs, setCatalogs ] = React.useState<any>({});

  React.useEffect(() => {
    const loadCatalog = async (language:string) => {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `../../../../locales/${language}/messages.js`
      );
      setCatalogs({
        ...catalogs,
        [language]: catalog,
      });
    }
    if (!catalogs[language]) {
      loadCatalog(language);
    }
  }, [language]);

  if (!catalogs[language]) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ language, languages, setLanguage }}>
      <I18nProvider language={language} catalogs={catalogs}>
        {children}
      </I18nProvider>
    </I18nContext.Provider>
  );
};
