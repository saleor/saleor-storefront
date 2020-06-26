import React from "react";
import { IntlProvider } from "react-intl";

import locale_PL from "@locale/pl.json";

export enum Locale {
  EN = "en",
  PL = "pl",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;
const localeData: Record<Locale, LocaleMessages> = {
  // Default language
  [Locale.EN]: undefined,
  [Locale.PL]: locale_PL,
};

export const localeNames: Record<Locale, string> = {
  [Locale.EN]: "English",
  [Locale.PL]: "Polski",
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

function getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

const defaultLocale = Locale.EN;

const LocaleProvider: React.FC = ({ children }) => {
  // For now locale can be set here
  const locale = Locale.EN;

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={getKeyValueJson(localeData[locale])}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
};

export { LocaleProvider };
