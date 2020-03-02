import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Title } from ".";

describe("<Title />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Title />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should render passed children", () => {
    const children = "some random passed text";
    const wrapper = shallow(<Title>{children}</Title>);

    expect(wrapper.text()).toContain(children);
  });
});
