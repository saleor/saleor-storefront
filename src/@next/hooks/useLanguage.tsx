import { I18nContext } from '@components/containers';
import React from "react";

export const useLanguage = () => {
  const { language, setLanguage } = React.useContext(I18nContext);
  return { language, setLanguage };
};
