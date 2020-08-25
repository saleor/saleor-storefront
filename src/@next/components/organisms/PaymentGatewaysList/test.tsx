import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways } from "./fixtures";

describe("<PaymentGatewaysList />", () => {
  it("renders payment gateways", () => {
    const processPayment = jest.fn();
    const submitPayment = jest.fn();
    const submitPaymentSuccess = jest.fn();
    const selectPaymentGateway = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <PaymentGatewaysList
        paymentGateways={paymentGateways}
        processPayment={processPayment}
        submitPayment={submitPayment}
        submitPaymentSuccess={submitPaymentSuccess}
        selectPaymentGateway={selectPaymentGateway}
        onError={onError}
      />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(paymentGateways[0].name);
    expect(wrapperText).toContain(paymentGateways[1].name);
  });

  it("simulates select payment gateway", () => {
    const processPayment = jest.fn();
    const submitPayment = jest.fn();
    const submitPaymentSuccess = jest.fn();
    const selectPaymentGateway = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <PaymentGatewaysList
        paymentGateways={paymentGateways}
        processPayment={processPayment}
        submitPayment={submitPayment}
        submitPaymentSuccess={submitPaymentSuccess}
        selectPaymentGateway={selectPaymentGateway}
        onError={onError}
      />
    );

    const input1 = wrapper.find("input").at(0);
    input1.simulate("change", {
      target: { value: paymentGateways[0].name },
    });

    expect(selectPaymentGateway).toHaveBeenCalledWith(paymentGateways[0].id);

    const input2 = wrapper.find("input").at(1);
    input2.simulate("change", {
      target: { value: paymentGateways[1].name },
    });

    expect(selectPaymentGateway).toHaveBeenCalledWith(paymentGateways[1].id);
  });
});
