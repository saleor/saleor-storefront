import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutAddress } from ".";

describe("<CheckoutAddress />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CheckoutAddress />);

    expect(wrapper.exists()).toEqual(true);
  });
});
