import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input, Select } from "@components/atoms";

import { CheckoutPayment } from ".";
import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

describe("<CheckoutPayment />", () => {
  it("renders user addresses", () => {
    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const addPromoCode = jest.fn();
    const removeVoucherCode = jest.fn();
    const submitUnchangedDiscount = jest.fn();
    const selectPaymentGateway = jest.fn();
    const processPayment = jest.fn();
    const onGatewayError = jest.fn();
    const wrapper = mount(
      <CheckoutPayment
        {...LOGGED_IN_USER_PROPS}
        setBillingAddress={setBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingAddress}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
        selectPaymentGateway={selectPaymentGateway}
        processPayment={processPayment}
        onGatewayError={onGatewayError}
      />
    );

    const address = LOGGED_IN_USER_PROPS.userAddresses[0];
    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(LOGGED_IN_USER_PROPS.paymentGateways[0].name);
    expect(wrapperText).toContain(LOGGED_IN_USER_PROPS.paymentGateways[1].name);
    expect(wrapperText).toContain(address.firstName);
    expect(wrapperText).toContain(address.lastName);
    expect(wrapperText).toContain(address.streetAddress1);
    expect(wrapperText).toContain(address.streetAddress2);
  });

  it("renders address form", () => {
    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const addPromoCode = jest.fn();
    const removeVoucherCode = jest.fn();
    const submitUnchangedDiscount = jest.fn();
    const processPayment = jest.fn();
    const selectPaymentGateway = jest.fn();
    const onGatewayError = jest.fn();
    const wrapper = mount(
      <CheckoutPayment
        {...ANONYMOUS_USER_PROPS}
        setBillingAddress={setBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingAddress}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
        selectPaymentGateway={selectPaymentGateway}
        processPayment={processPayment}
        onGatewayError={onGatewayError}
      />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(ANONYMOUS_USER_PROPS.paymentGateways[0].name);
    expect(wrapperText).toContain(ANONYMOUS_USER_PROPS.paymentGateways[1].name);

    const address = ANONYMOUS_USER_PROPS.checkoutBillingAddress;
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
