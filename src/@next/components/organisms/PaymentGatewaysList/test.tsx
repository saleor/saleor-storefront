import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PaymentGatewaysList } from ".";

describe("<PaymentGatewaysList />", () => {
  it("exists", () => {
    const wrapper = shallow(<PaymentGatewaysList />);

    expect(wrapper.exists()).toEqual(true);
  });
});
