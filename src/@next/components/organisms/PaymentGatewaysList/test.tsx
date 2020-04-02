import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PaymentGatewayList } from ".";

describe("<PaymentGatewayList />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<PaymentGatewayList />);

    expect(wrapper.exists()).toEqual(true);
  });
});
