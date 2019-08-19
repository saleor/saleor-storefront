import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input, Select } from "..";
import { SelectOptionsList } from "./SelectOptionsList";
import * as S from "./styles";

// declare window to make TS compiler happy
declare var window: {
  HTMLElement: { prototype: { scrollIntoView: () => void } };
};
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const DEFAULT_PROPS = {
  options: [
    "Poland",
    "Germany",
    "England",
    "Italy",
    "RPA",
    "Lithuania",
    "Russia",
    "China",
    "Croatia",
    "Spain",
    "Canada",
  ],
};

describe("<Select />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Select {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should not show menu if not clicked", () => {
    const wrapper = shallow(<Select {...DEFAULT_PROPS} />);

    expect(wrapper.find(SelectOptionsList).length).toEqual(0);
  });

  it("should open dropdown menu on click", () => {
    const wrapper = shallow(<Select {...DEFAULT_PROPS} />);

    wrapper.simulate("click");

    expect(wrapper.find(SelectOptionsList).length).toEqual(1);
  });

  it("should close dropdown on second click", () => {
    const wrapper = shallow(<Select {...DEFAULT_PROPS} />);

    wrapper.simulate("click");
    wrapper.simulate("click");

    expect(wrapper.find(SelectOptionsList).length).toEqual(0);
  });

  it("should set value on Input after clicking on option", () => {
    const wrapper = mount(<Select {...DEFAULT_PROPS} />);

    wrapper.simulate("click");
    wrapper
      .find(S.FocusedOption)
      .first()
      .simulate("click");

    expect(wrapper.find(Input).prop("value")).toEqual(DEFAULT_PROPS.options[0]);
  });

  it("should have default value if one was provided", () => {
    const wrapper = mount(
      <Select {...DEFAULT_PROPS} defaultValue={DEFAULT_PROPS.options[0]} />
    );

    expect(wrapper.find(Input).prop("value")).toEqual(DEFAULT_PROPS.options[0]);
  });

  it("should scroll to default value if one was provided", () => {
    const wrapper = mount(
      <Select {...DEFAULT_PROPS} defaultValue={DEFAULT_PROPS.options[10]} />
    );
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    wrapper.simulate("click");

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it("should change value if different value was clicked", () => {
    const wrapper = mount(
      <Select {...DEFAULT_PROPS} defaultValue={DEFAULT_PROPS.options[0]} />
    );

    wrapper.simulate("click");
    wrapper
      .find(S.FocusedOption)
      .at(1)
      .simulate("click");

    expect(wrapper.find(Input).prop("value")).toEqual(DEFAULT_PROPS.options[1]);
  });

  it("should filter values based on input", () => {
    const wrapper = mount(<Select {...DEFAULT_PROPS} />);

    wrapper.find("input").simulate("change", { target: { value: "and" } });

    // 'and' input filters Poland and England from option list
    expect(wrapper.find(S.FocusedOption).length).toEqual(2);
  });

  it("should revert to original value if list was filtered but no value has been picked and select was closed", () => {
    const wrapper = mount(
      <Select {...DEFAULT_PROPS} defaultValue={DEFAULT_PROPS.options[0]} />
    );

    wrapper
      .find("input")
      .simulate("change", { target: { value: "random text" } });
    wrapper.simulate("click");

    expect(wrapper.find("input").prop("value")).toEqual(
      DEFAULT_PROPS.options[0]
    );
  });
});
