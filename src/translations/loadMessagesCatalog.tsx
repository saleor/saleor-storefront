const fallbackLang = "en";
const lang = (
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  fallbackLang
).toLowerCase();

export const loadCatalogs = (language: string = lang) =>
  import(`@lingui/loader!../locales/${language}/messages.po`);
