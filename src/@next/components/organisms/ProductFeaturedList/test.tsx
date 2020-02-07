import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductFeaturedList } from ".";

describe("<ProductFeaturedList />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductFeaturedList />);

    expect(wrapper.exists()).toEqual(true);
  });
});
