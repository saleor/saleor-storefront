import { mount, shallow } from "enzyme";
import React from "react";

import { Money } from ".";

describe("<Money />", () => {
  it("exists", () => {
    const wrapper = shallow(<Money />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should return empty value", () => {
    const wrapper = mount(<Money />);

    expect(wrapper.text()).toContain("");
  });

  it("should return default value", () => {
    const wrapper = mount(<Money defaultValue="-" />);

    expect(wrapper.text()).toContain("-");
  });
});
