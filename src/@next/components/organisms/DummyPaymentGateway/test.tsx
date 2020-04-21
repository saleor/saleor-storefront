import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DummyPaymentGateway } from ".";

describe("<DummyPaymentGateway />", () => {
  it("exists", () => {
    const wrapper = shallow(<DummyPaymentGateway />);

    expect(wrapper.exists()).toEqual(true);
  });
});
