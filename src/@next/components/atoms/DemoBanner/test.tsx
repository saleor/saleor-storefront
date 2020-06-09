import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DemoBanner } from ".";

describe("<DemoBanner />", () => {
  it("exists", () => {
    const wrapper = shallow(<DemoBanner />);

    expect(wrapper.exists()).toEqual(true);
  });
});
