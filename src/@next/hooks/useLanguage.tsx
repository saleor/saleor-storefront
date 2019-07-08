import { I18nContext } from '@components/containers';
import React from "react";

export const useLanguage = () => {
  const { language, languages, setLanguage } = React.useContext(I18nContext);

  const handleSetLanguage = (language:string) => {
    if (!languages.hasOwnProperty(language)) {
      throw new Error(`Language "${language}" is not supported`);
    }
    setLanguage(language);
  }

  return { language, setLanguage: handleSetLanguage };
};
