const fallbackLang = "en";

const getLangCode = (code: string) =>
  code.includes("-") ? code.split("-")[0] : code;

export const lang = getLangCode(
  (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    fallbackLang
  ).toLowerCase()
);

export const loadCatalogs = async (language: string = lang) => {
  const catalog = await import(
     /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
     `../locales/${language}/messages.js`)
  return {
    [language]: catalog
  }
}