import { getMatchingLocale, Locale } from "./Locale";

describe("Matches locale to browser settings", () => {
  it("if first language is an exact match", () => {
    const locales = ["pl", "en"];

    expect(getMatchingLocale(locales)).toBe(Locale.PL);
  });

  it("if there is an exact match, but it's not first preference", () => {
    const locales = ["does-not-exist", "tr", "de", "fr"];

    expect(getMatchingLocale(locales)).toBe(Locale.EN);
  });

  it("or returns undefined if there is no match", () => {
    const locales = [
      "does-not-exist-1",
      "does-not-exist-2",
      "does-not-exist-3",
    ];

    expect(getMatchingLocale(locales)).toBe(undefined);
  });
});
