import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import ReactSVG from "react-svg";

import { ImageButton } from ".";

describe("<ImageButton />", () => {
  it("contains ReactSVG", () => {
    const wrapper = shallow(<ImageButton type="edit" />);
    expect(wrapper.exists(ReactSVG)).toBe(true);
  });
});
