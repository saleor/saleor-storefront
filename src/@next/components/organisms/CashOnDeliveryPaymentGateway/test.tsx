import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CashOnDeliveryPaymentGateway } from ".";

const codStatuses = [
  { token: "not-charged", label: "Not charged" },
];

describe("<CashOnDeliveryPaymentGateway />", () => {
  it("renders with statuses", () => {
    const processPayment = jest.fn();
    const wrapper = mount(
      <CashOnDeliveryPaymentGateway processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text()).toContain(codStatuses[0].label);
    const getValue = (n: number) =>
      wrapper
        .find("input")
        .at(n)
        .prop("value");
    expect(getValue(0)).toEqual(codStatuses[0].token);
  });

  it("simulates select and submit events", done => {
    const formRef = React.createRef<HTMLFormElement>();

    const processPayment = jest.fn().mockResolvedValueOnce({});
    const wrapper = mount(
      <CashOnDeliveryPaymentGateway formRef={formRef} processPayment={processPayment} />
    );

    const input = wrapper.find("input").at(0);
    const form = wrapper.find("form");
    const token = codStatuses[0].token;

    input.simulate("change", {
      target: { value: token },
    });
    form.simulate("submit");

    // delay checking the assertion since Formik handler within component is evaluated asynchronously
    window.setTimeout(() => {
      expect(processPayment).toHaveBeenCalledWith(token);
      done();
    }, 0);
  });
});
