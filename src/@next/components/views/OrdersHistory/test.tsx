import { shallow } from "enzyme";
import React from "react";

import { OrdersHistory } from ".";

describe("<OrdersHistory />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<OrdersHistory />);

    expect(wrapper.exists()).toEqual(true);
  });
});
