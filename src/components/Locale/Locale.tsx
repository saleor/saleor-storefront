import React from "react";
import { IntlProvider } from "react-intl";

import { getKeyValueJson, Locale, LocaleMessages } from "./utils";

const DEFAULT_LOCALE = Locale.EN;

interface LocaleProviderProps {
  messages: LocaleMessages;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  messages,
}) => {
  // For now locale can be set here
  const locale = Locale.EN;

  return (
    <IntlProvider
      defaultLocale={DEFAULT_LOCALE}
      locale={locale}
      messages={getKeyValueJson(messages)}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
};

export { LocaleProvider };
