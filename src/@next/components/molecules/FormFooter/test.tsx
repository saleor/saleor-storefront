import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { FormFooter } from ".";

describe("<FormFooter />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<FormFooter />);

    expect(wrapper.exists()).toEqual(true);
  });
});
