import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductDescription } from ".";

const DEFAULT_PROPS = {
  addToCart: () => null,
  children: null,
  name: "",
  productVariants: [],
  selectedAttributes: [],
};

describe("<ProductDescription />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductDescription {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
