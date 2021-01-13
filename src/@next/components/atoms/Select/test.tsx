import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { Select } from "..";

const DEFAULT_PROPS = {
  defaultValue: { code: "PL", country: "Poland" },
  label: "label",
  name: "name",
  onChange: (arg0 = "", arg1 = "") => {
    return [arg0, arg1];
  },
  options: [
    {
      code: "PL",
      counry: "Poland",
    },
    {
      code: "US",
      country: "United States of America",
    },
  ],
  value: {
    code: "PL",
    country: "Poland",
  },
};

describe("<Select />", () => {
  it("exists", () => {
    const wrapper = shallow(<Select {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
