import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { paths } from "@paths";

import { AccountMenu } from ".";

const links = [
  paths.account,
  paths.accountOrderHistory,
  paths.accountAddressBook,
];
const active = paths.accountAddressBook;

const DEFAULT_PROPS = { ...{ links, active } };

describe("<AccountMenu />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountMenu {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain proper link names converted from urls", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountMenu {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("Account");
    expect(wrapper.text()).toContain("Address book");
    expect(wrapper.text()).toContain("Order history");
  });
});
