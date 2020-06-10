import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DummyPaymentGateway } from ".";

const statuses = [
  { token: "charged", label: "Charged" },
  { token: "fully-refunded", label: "Fully refunded" },
  { token: "not-charged", label: "Not charged" },
];

describe("<DummyPaymentGateway />", () => {
  it("renders with statuses", () => {
    const processPayment = jest.fn();
    const wrapper = mount(
      <DummyPaymentGateway processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text()).toContain(statuses[0].label);
    expect(wrapper.text()).toContain(statuses[1].label);
    expect(wrapper.text()).toContain(statuses[2].label);
    const getValue = (n: number) => wrapper.find("input").at(n).prop("value");
    expect(getValue(0)).toEqual(statuses[0].token);
    expect(getValue(1)).toEqual(statuses[1].token);
    expect(getValue(2)).toEqual(statuses[2].token);
  });

  it("simulates select and submit events", done => {
    const formRef = React.createRef<HTMLFormElement>();

    const processPayment = jest.fn().mockResolvedValueOnce({});
    const wrapper = mount(
      <DummyPaymentGateway formRef={formRef} processPayment={processPayment} />
    );

    const input = wrapper.find("input").at(0);
    const form = wrapper.find("form");
    const { token } = statuses[0];

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
