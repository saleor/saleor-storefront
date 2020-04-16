import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Radio } from ".";

describe("<Radio />", () => {
  it("renders children", () => {
    const text = "test";
    const wrapper = shallow(<Radio>{text}</Radio>);

    expect(wrapper.text()).toEqual(text);
  });

  it("simulates change events", () => {
    const onRadioChange = jest.fn();
    const wrapper = shallow(<Radio onChange={onRadioChange} />);

    wrapper.simulate("click");
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
