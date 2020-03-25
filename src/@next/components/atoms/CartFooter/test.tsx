import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartFooter } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartFooter />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartFooter {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
