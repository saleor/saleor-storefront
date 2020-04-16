import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripeInputElement } from ".";

describe("<StripeInputElement />", () => {
  it("exists", () => {
    const wrapper = shallow(<StripeInputElement />);

    expect(wrapper.exists()).toEqual(true);
  });
});
