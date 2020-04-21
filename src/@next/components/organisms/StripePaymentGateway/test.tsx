import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripePaymentGateway } from ".";

describe("<StripePaymentGateway />", () => {
  it("exists", () => {
    const wrapper = shallow(<StripePaymentGateway />);

    expect(wrapper.exists()).toEqual(true);
  });
});
