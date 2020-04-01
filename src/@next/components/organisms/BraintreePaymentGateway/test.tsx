import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { BraintreePaymentGateway } from ".";

describe("<BraintreePaymentGateway />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<BraintreePaymentGateway />);

    expect(wrapper.exists()).toEqual(true);
  });
});
