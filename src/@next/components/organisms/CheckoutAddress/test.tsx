import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input, Select } from "@components/atoms";

import { CheckoutAddress } from ".";
import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

describe("<CheckoutAddress />", () => {
  it("renders user addresses", () => {
    const setShippingAddress = jest.fn();
    const wrapper = mount(
      <CheckoutAddress
        {...LOGGED_IN_USER_PROPS}
        setShippingAddress={setShippingAddress}
      />
    );

    const address = LOGGED_IN_USER_PROPS.userAddresses[0].address;
    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(address.firstName);
    expect(wrapperText).toContain(address.lastName);
    expect(wrapperText).toContain(address.streetAddress1);
    expect(wrapperText).toContain(address.streetAddress2);
  });

  it("renders address form", () => {
    const setShippingAddress = jest.fn();
    const wrapper = mount(
      <CheckoutAddress
        {...ANONYMOUS_USER_PROPS}
        setShippingAddress={setShippingAddress}
      />
    );

    const address = ANONYMOUS_USER_PROPS.checkoutAddress;
    const getValue = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");
    expect(getValue(0)).toEqual(address.firstName);
    expect(getValue(1)).toEqual(address.lastName);
    expect(getValue(2)).toEqual(address.companyName);
    expect(getValue(3)).toEqual(address.phone);
    expect(getValue(4)).toEqual(address.streetAddress1);
    expect(getValue(5)).toEqual(address.streetAddress2);
    expect(getValue(6)).toEqual(address.city);
    expect(getValue(7)).toEqual(address.postalCode);
    expect(
      wrapper
        .find(Select)
        .at(0)
        .prop("value")
    ).toEqual(address.country);
    expect(getValue(8)).toEqual(address.countryArea);
  });
});
