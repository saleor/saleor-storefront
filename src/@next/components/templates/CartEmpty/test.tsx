import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartEmpty } from ".";

describe("<CartEmpty />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartEmpty />);

    expect(wrapper.exists()).toEqual(true);
  });
});
