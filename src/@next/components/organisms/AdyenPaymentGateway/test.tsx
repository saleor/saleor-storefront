import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AdyenPaymentGateway } from ".";

describe("<AdyenPaymentGateway />", () => {
  it("exists", () => {
    const wrapper = shallow(<AdyenPaymentGateway />);

    expect(wrapper.exists()).toEqual(true);
  });
});
