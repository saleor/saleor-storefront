import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Attribute, IconButton } from "@components/atoms";
import { PasswordTile } from ".";
import { TextField } from "../";

jest.mock("@sdk/react", () => ({
  usePasswordChange: () => [jest.fn(), { data: null, error: null }],
}));

describe("<PasswordTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<PasswordTile />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(<PasswordTile />);

    expect(wrapper.find(Attribute)).toHaveLength(1);
  });

  it("should change view to password change view when clicked on edit icon", () => {
    const wrapper = mount(<PasswordTile />);

    wrapper.find(IconButton).simulate("click");

    expect(wrapper.find(TextField)).toHaveLength(3);
  });
});
