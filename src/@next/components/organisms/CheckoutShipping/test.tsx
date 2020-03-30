import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutShipping } from ".";

describe("<CheckoutShipping />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CheckoutShipping />);

    expect(wrapper.exists()).toEqual(true);
  });
});
