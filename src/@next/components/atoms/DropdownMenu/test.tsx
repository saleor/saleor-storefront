import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DropdownMenu } from ".";

const items = [
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
  header,
  items,
};

describe("<DropdownMenu /> hoverable", () => {
  it("exists", () => {
    const wrapper = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("should not contain any list items if not hovered over", () => {
    const wrapper = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );

    expect(wrapper.find("li").length).toEqual(0);
  });

  it("should open dropdown when hovered on header element", () => {
    const wrapper = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("mouseenter");

    expect(wrapper.find("li").length).toEqual(3);
  });

  it("should close dropdown if hovered out from header element", () => {
    const wrapper = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("mouseenter");
    wrapper.simulate("mouseleave");

    expect(wrapper.find("li").length).toEqual(0);
  });

  it("should close dropdown if clicked on dropdown element", () => {
    const wrapper = shallow(
      <DropdownMenu type="hoverable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("mouseenter");
    wrapper.find("li").first().simulate("click");

    expect(wrapper.find("li").length).toEqual(0);
  });
});

describe("<DropdownMenu /> clickable", () => {
  it("exists", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("should not contain any list items if not clicked", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    expect(wrapper.find("li").length).toEqual(0);
  });

  it("should open dropdown when clicked on header element", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("click");

    expect(wrapper.find("li").length).toEqual(3);
  });

  it("should close dropdown if clicked on/hovered out from header element", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("click");
    wrapper.simulate("click");

    expect(wrapper.find("li").length).toEqual(0);
  });

  it("should close dropdown if clicked on dropdown element", () => {
    const wrapper = shallow(
      <DropdownMenu type="clickable" {...DEFAULT_PROPS} />
    );

    wrapper.simulate("click");
    wrapper.find("li").first().simulate("click");

    expect(wrapper.find("li").length).toEqual(0);
  });
});
