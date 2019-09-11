import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PasswordTile } from ".";

describe("<PasswordTile />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<PasswordTile />);

    expect(wrapper.exists()).toEqual(true);
  });
});
