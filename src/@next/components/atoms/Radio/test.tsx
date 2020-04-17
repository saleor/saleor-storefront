import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Radio } from ".";

describe("<Radio />", () => {
  it("renders children", () => {
    const text = "test";
    const wrapper = shallow(<Radio>{text}</Radio>);

    expect(wrapper.text().includes(text)).toBe(true);
  });

  it("simulates change events", () => {
    const onRadioChange = jest.fn();
    const value = "test";
    const wrapper = shallow(<Radio value={value} onChange={onRadioChange} />);

    const input = wrapper.find("input").at(0);

    input.simulate("change", {
      target: { value },
    });
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
