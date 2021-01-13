import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { Checkbox } from ".";

describe("<Checkbox />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <Checkbox name="default-checkbox">Checkbox with label</Checkbox>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
