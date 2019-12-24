import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductVariantPicker } from ".";
import { productVariants } from "./fixtures";

const PROPS = { onChange: jest.fn(), productVariants };

describe("<ProductVariantPicker />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductVariantPicker {...PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
