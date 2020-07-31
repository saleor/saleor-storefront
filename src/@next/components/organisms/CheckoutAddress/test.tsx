import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { Input, Select } from "@components/atoms";

import { CheckoutAddress } from ".";
import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

describe("<CheckoutAddress />", () => {
  it("renders user addresses", () => {
    const setShippingAddress = jest.fn();
    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CheckoutAddress
          {...LOGGED_IN_USER_PROPS}
          shippingAddressRequired
          setShippingAddress={setShippingAddress}
          setBillingAddress={setBillingAddress}
          setBillingAsShippingAddress={setBillingAsShippingAddress}
        />
      </IntlProvider>
    );

    const { address } = LOGGED_IN_USER_PROPS.userAddresses[0];
    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(address.firstName);
    expect(wrapperText).toContain(address.lastName);
    expect(wrapperText).toContain(address.streetAddress1);
    expect(wrapperText).toContain(address.streetAddress2);
  });

  it("renders address form", () => {
    const setShippingAddress = jest.fn();
    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CheckoutAddress
          {...ANONYMOUS_USER_PROPS}
          shippingAddressRequired
          setShippingAddress={setShippingAddress}
          setBillingAddress={setBillingAddress}
          setBillingAsShippingAddress={setBillingAsShippingAddress}
        />
      </IntlProvider>
    );

    const address = ANONYMOUS_USER_PROPS.checkoutShippingAddress;
    const getValue = (n: number) => wrapper.find(Input).at(n).prop("value");
    expect(getValue(0)).toEqual(address.firstName);
    expect(getValue(1)).toEqual(address.lastName);
    expect(getValue(2)).toEqual(address.companyName);
    expect(getValue(3)).toEqual(address.phone);
    expect(getValue(4)).toEqual(address.streetAddress1);
    expect(getValue(5)).toEqual(address.streetAddress2);
    expect(getValue(6)).toEqual(address.city);
    expect(getValue(7)).toEqual(address.postalCode);
    expect(wrapper.find(Select).at(0).prop("value").code).toEqual(
      address.country?.code
    );
    expect(getValue(8)).toEqual(address.countryArea);
  });
});
