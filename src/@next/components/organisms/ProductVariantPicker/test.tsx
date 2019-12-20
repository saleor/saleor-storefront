import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductVariantPicker } from ".";

describe("<ProductVariantPicker />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductVariantPicker />);

    expect(wrapper.exists()).toEqual(true);
  });
});
