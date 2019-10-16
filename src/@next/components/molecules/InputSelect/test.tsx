import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { components } from "react-select";

import { InputSelect } from ".";

const DEFAULT_PROPS = {
  label: "Country",
  name: "country",
  onChange: jest.fn(),
  optionLabelKey: "country",
  optionValueKey: "code",
  options: [
    { code: "PL", country: "Poland" },
    { code: "PT", country: "Portugal" },
    { code: "US", country: "United States of America" },
    { code: "DE", country: "Germany" },
    { code: "BE", country: "Belarus" },
    { code: "SE", country: "Sweden" },
    { code: "FR", country: "France" },
    { code: "CZ", country: "Czech Republic" },
    { code: "FI", country: "Finland" },
    { code: "GB", country: "Great Britain" },
  ],
  value: null,
};

describe("<InputSelect />", () => {
  it("exists", () => {
    const wrapper = shallow(<InputSelect {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain passed label", () => {
    const wrapper = mount(<InputSelect {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.label);
  });

  it("should show chosen option after click", () => {
    let value;
    const onChange = (val: any) => {
      value = val;
    };
    const wrapper = mount(
      <InputSelect {...DEFAULT_PROPS} value={value} onChange={onChange} />
    );

    wrapper.find("input").simulate("focus");
    wrapper
      .find(components.Option)
      .at(0)
      .simulate("click");

    expect(wrapper.text()).toContain(DEFAULT_PROPS.options[0].country);
  });
});
