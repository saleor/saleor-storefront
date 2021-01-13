import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutProgressBar } from ".";

const steps = [
  {
    index: 0,
    link: "#",
    name: "Shipping",
  },
  {
    index: 1,
    link: "#",
    name: "Billing",
  },
  {
    index: 2,
    link: "#",
    name: "Payment",
  },
];

describe("<CheckoutProgressBar />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CheckoutProgressBar steps={steps} activeStep={0} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CheckoutProgressBar steps={steps} activeStep={0} />
      </IntlProvider>
    );

    expect(wrapper.find("a").length).toEqual(steps.length);
  });
});
