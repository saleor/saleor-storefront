const LOCALE_CACHE: { [key in Locale]?: LocaleMessages } = {};

interface StructuredMessage {
  context?: string;
  string: string;
}

export type LocaleMessages = Record<string, StructuredMessage>;

export enum Locale {
  EN = "en",
  PL = "pl",
  AR = "ar",
  AZ = "az",
  BG = "bg",
  BN = "bn",
  CA = "ca",
  CS = "cs",
  DA = "da",
  DE = "de",
  EL = "el",
  ES = "es",
  ES_CO = "es_CO",
  ET = "et",
  FA = "fa",
  FI = "fi",
  FR = "fr",
  HI = "hi",
  HU = "hu",
  HY = "hy",
  ID = "id",
  IS = "is",
  IT = "it",
  JA = "ja",
  KO = "ko",
  LT = "lt",
  MN = "mn",
  NB = "nb",
  NL = "nl",
  PT = "pt",
  PT_BR = "pt_BR",
  RO = "ro",
  RU = "ru",
  SK = "sk",
  SL = "sl",
  SQ = "sq",
  SR = "sr",
  SV = "sv",
  TH = "th",
  TR = "tr",
  UK = "uk",
  VI = "vi",
  ZH_HANS = "zh-Hans",
  ZH_HANT = "zh-Hant",
}

const localeData: Record<Locale, string | undefined> = {
  // Default language
  [Locale.EN]: undefined,
  [Locale.PL]: "pl",
  [Locale.AR]: "ar",
  [Locale.AZ]: "az",
  [Locale.BG]: "bg",
  [Locale.BN]: "bn",
  [Locale.CA]: "ca",
  [Locale.CS]: "cs",
  [Locale.DA]: "da",
  [Locale.DE]: "de",
  [Locale.EL]: "el",
  [Locale.ES]: "es",
  [Locale.ES_CO]: "es_CO",
  [Locale.ET]: "et",
  [Locale.FA]: "fa",
  [Locale.FI]: "fi",
  [Locale.FR]: "fr",
  [Locale.HI]: "hi",
  [Locale.HU]: "hu",
  [Locale.HY]: "hy",
  [Locale.ID]: "id",
  [Locale.IS]: "is",
  [Locale.IT]: "it",
  [Locale.JA]: "ja",
  [Locale.KO]: "ko",
  [Locale.LT]: "lt",
  [Locale.MN]: "mn",
  [Locale.NB]: "nb",
  [Locale.NL]: "nl",
  [Locale.PT]: "pt",
  [Locale.PT_BR]: "pt_BR",
  [Locale.RO]: "ro",
  [Locale.RU]: "ru",
  [Locale.SK]: "sk",
  [Locale.SL]: "sl",
  [Locale.SQ]: "sq",
  [Locale.SR]: "sr",
  [Locale.SV]: "sv",
  [Locale.TH]: "th",
  [Locale.TR]: "tr",
  [Locale.UK]: "uk",
  [Locale.VI]: "vi",
  [Locale.ZH_HANS]: "zh-Hans",
  [Locale.ZH_HANT]: "zh-Hant",
};

export const loadMessagesJson = async (
  locale: Locale | undefined = Locale.EN
) => {
  const filename = localeData[locale];
  let localeJson = LOCALE_CACHE[locale];

  if (!localeJson && filename !== undefined) {
    localeJson = await import(`../../../locale/${filename}.json`);
    LOCALE_CACHE[locale] = localeJson;
  }

  return localeJson;
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

export function getKeyValueJson(
  messages: LocaleMessages | undefined
): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}
