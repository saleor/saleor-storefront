import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutPayment } from ".";

describe("<CheckoutPayment />", () => {
  it("exists", () => {
    const wrapper = shallow(<CheckoutPayment />);

    expect(wrapper.exists()).toEqual(true);
  });
});
