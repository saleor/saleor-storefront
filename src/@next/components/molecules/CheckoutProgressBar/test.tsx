import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutProgressBar } from ".";

describe("<CheckoutProgressBar />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CheckoutProgressBar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
