import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { Attribute, IconButton } from "@components/atoms";
import { TextField } from "..";
import { AccountTile } from "./AccountTile";
import { PasswordTile } from "./PasswordTile";

jest.mock("@saleor/sdk", () => ({
  useAccountUpdate: () => [jest.fn(), { data: null, error: null }],
  useAuth: () => ({ user: { firstName: "John", lastName: "Doe" } }),
  usePasswordChange: () => [jest.fn(), { data: null, error: null }],
}));

describe("<PasswordTile />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <PasswordTile />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <PasswordTile />
      </IntlProvider>
    );

    expect(wrapper.find(Attribute)).toHaveLength(1);
  });

  it("should change view to password change view when clicked on edit icon", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <PasswordTile />
      </IntlProvider>
    );

    wrapper.find(IconButton).simulate("click");

    expect(wrapper.find(TextField)).toHaveLength(3);
  });
});

describe("<AccountTile />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountTile />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountTile />
      </IntlProvider>
    );

    expect(wrapper.find(Attribute)).toHaveLength(2);
  });

  it("should change view to password change view when clicked on edit icon", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountTile />
      </IntlProvider>
    );

    wrapper.find(IconButton).simulate("click");

    expect(wrapper.find(TextField)).toHaveLength(2);
  });
});
