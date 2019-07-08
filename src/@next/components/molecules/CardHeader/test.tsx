import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CardHeader } from ".";

const DEFAULT_PROPS = {
  closeIcon: false,
  divider: false,
  text: "Some Title",
};

describe("<CardHeader />", () => {
  it("exists", () => {
    const header = shallow(<CardHeader {...DEFAULT_PROPS} />);

    expect(header.exists()).toEqual(true);
  });
});
