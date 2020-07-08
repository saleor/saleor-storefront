import React from "react";
import { IntlProvider } from "react-intl";

import locale_PL from "@locale/pl.json";
import { LanguageCodeEnum } from "gqlTypes/globalTypes";

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

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = LanguageCodeEnum.EN;

interface LocaleContextType {
  locale: LanguageCodeEnum;
  setLocale: (locale: Locale) => void;
}
const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

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

export { LocaleConsumer, RawLocaleProvider, LocaleProvider, LocaleContext };
