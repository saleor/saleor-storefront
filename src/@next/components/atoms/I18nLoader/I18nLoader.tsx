import React from "react";
import { I18nContext } from ".";
import { IProps } from "./types";

const getLangCode = (code: string) =>
  code.includes("-") ? code.split("-")[0] : code;

const defaultLanguage = getLangCode(
  (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en"
  ).toLowerCase()
);

export const I18nLoader: React.FC<IProps> = ({ children }: IProps) => {
  const [ language, setLanguage ] = React.useState<string>(defaultLanguage);
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

  return (
    <I18nContext.Provider value={{ language, setLanguage, catalogs }}>
      {children}
    </I18nContext.Provider>
  )
};
