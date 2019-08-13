import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Select } from "..";

const DEFAULT_PROPS = {
  value: {
    code: "PL",
    country: "Poland",
  },
  name: "name",
  label: "label",
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
  defaultValue: { code: "PL", country: "Poland" },
  onChange: (arg0 = "", arg1 = "") => {
    return [arg0, arg1];
  },
};

describe("<Select />", () => {
  // Example test
  it("exists", () => {
    const wrapper = mount(<Select {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
