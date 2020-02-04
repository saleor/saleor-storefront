import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductPage } from ".";

describe("<ProductPage />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductPage />);

    expect(wrapper.exists()).toEqual(true);
  });
});
