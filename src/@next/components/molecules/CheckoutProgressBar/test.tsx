import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { CheckoutProgressBar } from ".";

const steps = [
  {
    link: "#",
    name: "Shipping",
  },
  {
    link: "#",
    name: "Billing",
  },
  {
    link: "#",
    name: "Payment",
  },
];

describe("<CheckoutProgressBar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <CheckoutProgressBar steps={steps} activeStep={0} />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("exists", () => {
    const wrapper = mount(
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStep={0} />
      </MemoryRouter>
    );

    expect(wrapper.find("a").length).toEqual(steps.length);
  });
});
