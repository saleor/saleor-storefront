import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutPayment } from ".";
import { PROPS } from "./fixtures";

describe("<CheckoutPayment />", () => {
  it("renders payment forms", () => {
    const addPromoCode = jest.fn();
    const removeVoucherCode = jest.fn();
    const submitUnchangedDiscount = jest.fn();
    const selectPaymentGateway = jest.fn();
    const processPayment = jest.fn();
    const onGatewayError = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CheckoutPayment
          {...PROPS}
          addPromoCode={addPromoCode}
          removeVoucherCode={removeVoucherCode}
          submitUnchangedDiscount={submitUnchangedDiscount}
          selectPaymentGateway={selectPaymentGateway}
          processPayment={processPayment}
          onGatewayError={onGatewayError}
        />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
