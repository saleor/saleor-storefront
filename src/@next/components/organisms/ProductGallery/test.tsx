import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductGallery } from ".";

describe("<ProductGallery />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductGallery />);

    expect(wrapper.exists()).toEqual(true);
  });
});
