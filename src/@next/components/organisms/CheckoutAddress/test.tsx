import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutAddress } from ".";
import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

describe("<CheckoutAddress />", () => {
  it("renders user addresses", () => {
    const setShippingAddress = jest.fn();
    const wrapper = shallow(
      <CheckoutAddress
        {...LOGGED_IN_USER_PROPS}
        setShippingAddress={setShippingAddress}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders address form", () => {
    const setShippingAddress = jest.fn();
    const wrapper = shallow(
      <CheckoutAddress
        {...ANONYMOUS_USER_PROPS}
        setShippingAddress={setShippingAddress}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
