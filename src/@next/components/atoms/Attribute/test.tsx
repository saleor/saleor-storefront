import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Attribute } from ".";

const DEFAULT_PROPS = {
  attributeValue: "John",
  description: "First name",
  testingContext: "firstNameAttribute",
};

describe("<Attribute />", () => {
  it("exists", () => {
    const wrapper = shallow(<Attribute {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain description and value", () => {
    const wrapper = shallow(<Attribute {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain("First name");
    expect(wrapper.text()).toContain("John");
  });
});
