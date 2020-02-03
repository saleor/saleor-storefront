import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductTile } from ".";
import { PRODUCT } from "./fixtures";

describe("<ProductTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductTile product={PRODUCT} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
