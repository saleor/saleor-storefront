import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Label } from ".";

describe("<Label />", () => {
  it("exists", () => {
    const wrapper = shallow(<Label>test</Label>);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain children", () => {
    const message = "This is test message";
    const wrapper = shallow(
      <Label>
        <p>{message}</p>
      </Label>
    );

    expect(wrapper.find("p").length).toEqual(1);
    expect(wrapper.text()).toContain(message);
  });
});
