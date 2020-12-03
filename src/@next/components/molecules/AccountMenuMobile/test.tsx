import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { AccountMenuMobile } from ".";

const links = [
  "/personal-information/",
  "/address-book/",
  "/order-history/",
  "/payment-options/",
];
const active = "/address-book/";

const DEFAULT_PROPS = { ...{ links, active } };

describe("<AccountMenuMobile />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountMenuMobile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show only active tab if menu has not been clicked", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountMenuMobile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).not.toContain("Personal Information");
    expect(wrapper.text()).toContain("Address book");
    expect(wrapper.text()).not.toContain("Order history");
    expect(wrapper.text()).not.toContain("Payment Options");
  });

  it("should expand on click - all tabs name should be visible", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AccountMenuMobile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    wrapper.find(AccountMenuMobile).simulate("click");

    expect(wrapper.text()).toContain("Personal Information");
    expect(wrapper.text()).toContain("Address book");
    expect(wrapper.text()).toContain("Order history");
    expect(wrapper.text()).toContain("Payment Options");
  });
});
