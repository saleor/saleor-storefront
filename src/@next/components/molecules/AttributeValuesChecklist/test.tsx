import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AttributeValuesChecklist } from ".";
import { GET_DEFAULT_PROPS } from "./fixtures";

const DEFAULT_PROPS = GET_DEFAULT_PROPS({ onValueClick: jest.fn() });

describe("<AttributeValuesChecklist />", () => {
  it("exists", () => {
    const wrapper = shallow(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain correct name of attribute section", () => {
    const wrapper = shallow(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.title);
  });

  it("should show 5 atttributes visible", () => {
    const wrapper = mount(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    expect(wrapper.find("label").length).toEqual(5);
  });

  it("should have one attribute checked set to true", () => {
    const wrapper = mount(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    expect(
      wrapper.find("input").filterWhere(item => {
        return item.prop("checked") === true;
      }).length
    ).toEqual(1);
  });
  it("should have attribute not checked set to false", () => {
    const wrapper = mount(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    expect(
      wrapper.find("input").filterWhere(item => {
        return item.prop("checked") === false;
      }).length
    ).toEqual(4);
  });

  it("should show 6 attributes visible after clicking on view all options button", () => {
    const wrapper = mount(<AttributeValuesChecklist {...DEFAULT_PROPS} />);

    wrapper.find("button").simulate("click");

    expect(wrapper.find("label").length).toEqual(6);
  });
});
