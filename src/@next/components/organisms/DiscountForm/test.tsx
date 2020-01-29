import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DiscountForm } from ".";

describe("<DiscountForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<DiscountForm />);

    expect(wrapper.exists()).toEqual(true);
  });
});
