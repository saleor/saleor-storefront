import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { TextField } from "@components/molecules";

import { AddressForm } from ".";
import { ErrorMessage } from "../../atoms";
import { AddressErrors } from "./types";

const PROPS = {
  handleSubmit: jest.fn(),
};

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain error provided as prop", () => {
    const errorMessage = "This is an error";
    const errors: AddressErrors = {
      firstName: {
        field: "firstName",
        message: errorMessage,
      },
    };
    const wrapper = mount(<AddressForm {...PROPS} errors={errors} />);

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("should contain error for required field after focus and blur", () => {
    const wrapper = mount(<AddressForm {...PROPS} />);

    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find("input")
      .at(0)
      .simulate("blur");

    expect(
      wrapper
        .find(ErrorMessage)
        .at(0)
        .props().errors
    ).toEqual([{ field: "firstName", message: "Required field!" }]);
  });
});
