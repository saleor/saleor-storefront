import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { NotificationTemplate } from ".";
import { Title } from "../Message/styles";

describe("<NotificationTemplate />", () => {
  it("renders passed title", () => {
    const title = "Test message";

    const wrapper = shallow(
      <NotificationTemplate
        close={jest.fn()}
        id="test"
        message={{ title }}
        options={{ type: "success" }}
        style={{ margin: 10 }}
      />
    );

    expect(wrapper.find(Title).text()).toEqual(title);
  });
});
