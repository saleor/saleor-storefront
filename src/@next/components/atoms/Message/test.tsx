import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Message } from ".";

describe("<Message />", () => {
  it("renders passed title", () => {
    const text = "test";
    const wrapper = shallow(<Message title={text} onClose={jest.fn()} />);

    expect(wrapper.text()).toEqual(text);
  });

  it("renders children when passed in", () => {
    const wrapper = shallow(
      <Message title="" onClose={jest.fn()}>
        <div className="unique" />
      </Message>
    );

    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
  });

  it("displays correct border color based on status prop", () => {
    const neutral = mount(<Message title="" onClose={jest.fn()} />);
    const success = mount(
      <Message title="" onClose={jest.fn()} status="success" />
    );
    const error = mount(
      <Message title="" onClose={jest.fn()} status="error" />
    );

    expect(neutral).toHaveStyleRule(
      "border-color",
      defaultTheme.message.neutralColor
    );
    expect(success).toHaveStyleRule(
      "border-color",
      defaultTheme.message.successColor
    );
    expect(error).toHaveStyleRule(
      "border-color",
      defaultTheme.message.errorColor
    );
  });
});
