import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AccountMenu } from ".";

const links = [
  "/personal-information/",
  "/address-book/",
  "/order-history/",
  "/payment-options/",
];
const active = "/address-book/";

const DEFAULT_PROPS = { ...{ links, active } };

describe("<AccountMenu />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={["/"]}>
          <AccountMenu {...DEFAULT_PROPS} />
        </MemoryRouter>
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain proper link names converted from urls", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={["/"]}>
          <AccountMenu {...DEFAULT_PROPS} />
        </MemoryRouter>
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("Personal Information");
    expect(wrapper.text()).toContain("Address book");
    expect(wrapper.text()).toContain("Order history");
    expect(wrapper.text()).toContain("Payment Options");
  });
});
