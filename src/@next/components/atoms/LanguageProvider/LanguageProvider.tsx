import { I18nProvider } from "@lingui/react";
import React from "react";
import { I18nContext } from "../I18nLoader";
import { IProps } from "./types";

export const LanguageProvider: React.FC<IProps> = ({ children }: IProps) => {
  const { language, catalogs } = React.useContext(I18nContext);
  if (!catalogs[language]) return null;
  return (
    <I18nProvider language={language} catalogs={catalogs}>
      {children}
    </I18nProvider>
  )
};
