import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";
import { Select } from "@components/atoms";
import { IPreferences, Locale } from "@types";
import { PreferencesForm } from ".";
import { preferencesEN, preferencesPL, localesOptions } from "./fixtures";

const PROPS = {
  localesOptions,
  formId: "preferences-form",
  handleSubmit: jest.fn(),
};

describe("<PreferencesForm />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <PreferencesForm preferences={preferencesEN} {...PROPS} />
      </IntlProvider>
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain proper initial data", () => {
    const checkInitialValue = (
      preferences: IPreferences,
      localeOption: {
        localeCode: Locale;
        localeName: string;
      }
    ) => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <PreferencesForm preferences={preferences} {...PROPS} />
        </IntlProvider>
      );
      expect(wrapper.find(Select).at(0).exists()).toEqual(true);
      expect(wrapper.find(Select).at(0).prop("value")).toEqual(localeOption);
    };
    checkInitialValue(preferencesEN, localesOptions[0]);
    checkInitialValue(preferencesPL, localesOptions[1]);
  });
});
