import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DropdownMenu } from ".";

describe("<DropdownMenu />", () => {
  // Example test
  const content = [
    {
      content: <span>This is test</span>,
      onClick: jest.fn(),
    },
    {
      content: <span>This is test 2</span>,
      onClick: jest.fn(),
    },
    {
      content: <span>This is test 3</span>,
      onClick: jest.fn(),
    },
  ];
  const header = <p>press me</p>;

  const DEFAULT_PROPS = {
    content,
    header,
  };
  it("exists", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("should not contain any list items if not clicked/hovered", () => {
    const wrapperClickable = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );
    expect(wrapperClickable.find("li").length).toEqual(0);

    const wrapperHoverable = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );
    expect(wrapperHoverable.find("li").length).toEqual(0);
  });

  it("should open dropdown when clicked/hovered on header element", () => {
    const wrapperClickable = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );
    wrapperClickable.simulate("click");
    expect(wrapperClickable.find("li").length).toEqual(3);

    const wrapperHoverable = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );
    wrapperHoverable.simulate("mouseenter");
    expect(wrapperHoverable.find("li").length).toEqual(3);
  });

  it("should close dropdown if clicked on/hovered out from header element", () => {
    const wrapperClickable = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );
    expect(wrapperClickable.find("li").length).toEqual(0);
    wrapperClickable.simulate("click");
    expect(wrapperClickable.find("li").length).toEqual(3);
    wrapperClickable.simulate("click");
    expect(wrapperClickable.find("li").length).toEqual(0);

    const wrapperHoverable = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );
    expect(wrapperHoverable.find("li").length).toEqual(0);
    wrapperHoverable.simulate("mouseenter");
    expect(wrapperHoverable.find("li").length).toEqual(3);
    wrapperHoverable.simulate("mouseleave");
    expect(wrapperHoverable.find("li").length).toEqual(0);
  });

  it("should close dropdown if clicked on dropdown element", () => {
    const wrapperClickable = mount(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );
    expect(wrapperClickable.find("li").length).toEqual(0);
    wrapperClickable.simulate("click");
    expect(wrapperClickable.find("li").length).toEqual(3);
    wrapperClickable
      .find("li")
      .first()
      .simulate("click");
    expect(wrapperClickable.find("li").length).toEqual(0);

    const wrapperHoverable = mount(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );
    expect(wrapperHoverable.find("li").length).toEqual(0);
    wrapperHoverable.simulate("mouseenter");
    expect(wrapperHoverable.find("li").length).toEqual(3);
    wrapperHoverable
      .find("li")
      .first()
      .simulate("click");
    expect(wrapperHoverable.find("li").length).toEqual(0);
  });
});
