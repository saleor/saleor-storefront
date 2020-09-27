import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartSummaryCosts } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartSummaryCosts />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartSummaryCosts {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
