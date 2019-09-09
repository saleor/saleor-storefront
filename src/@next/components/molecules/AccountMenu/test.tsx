import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

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
    const wrapper = shallow(<AccountMenu {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain proper link names converted from urls", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenu {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.text()).toContain("Personal Information");
    expect(wrapper.text()).toContain("Address Book");
    expect(wrapper.text()).toContain("Order History");
    expect(wrapper.text()).toContain("Payment Options");
  });
});
