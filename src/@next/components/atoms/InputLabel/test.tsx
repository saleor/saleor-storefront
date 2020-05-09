import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { InputLabel } from ".";

describe("<InputLabel />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <InputLabel labelBackground={"#FFF"} active={false}>
        This is input - check knobs
      </InputLabel>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("contains text", () => {
    const message = "This is message";
    const wrapper = shallow(
      <InputLabel labelBackground={"#FFF"} active={false}>
        {message}
      </InputLabel>
    );

    expect(wrapper.text()).toContain(message);
  });
});
