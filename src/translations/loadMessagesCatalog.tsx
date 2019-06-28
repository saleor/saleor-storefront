const fallbackLang = "en";

const getLangCode = (code: string) =>
  code.includes("-") ? code.split("-")[0] : code;
const lang = getLangCode(
  (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    fallbackLang
  ).toLowerCase()
);
export const loadCatalogs = async (language: string = lang) => ({
  [lang]: await import(`@lingui/loader!../locales/${language}/messages.po`),
});
