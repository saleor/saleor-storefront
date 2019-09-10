import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router";

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
    const wrapper = shallow(<AccountMenuMobile {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show only active tab if menu has not been clicked", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenuMobile {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.text()).not.toContain("Personal Information");
    expect(wrapper.text()).toContain("Address Book");
    expect(wrapper.text()).not.toContain("Order History");
    expect(wrapper.text()).not.toContain("Payment Options");
  });

  it("should expand on click - all tabs name should be visible", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenuMobile {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    wrapper.find(AccountMenuMobile).simulate("click");

    expect(wrapper.text()).toContain("Personal Information");
    expect(wrapper.text()).toContain("Address Book");
    expect(wrapper.text()).toContain("Order History");
    expect(wrapper.text()).toContain("Payment Options");
  });
});
