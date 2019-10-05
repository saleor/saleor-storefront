import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Attribute, IconButton } from "@components/atoms";
import { TextField } from "../";
import { AccountTile } from "./AccountTile";
import { PasswordTile } from "./PasswordTile";

jest.mock("@sdk/react", () => ({
  useAccountUpdate: () => [jest.fn(), { data: null, error: null }],
  usePasswordChange: () => [jest.fn(), { data: null, error: null }],
  useUserDetails: () => ({ data: { firstName: "John", lastName: "Doe" } }),
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

describe("<AccountTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<AccountTile />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(<AccountTile />);

    expect(wrapper.find(Attribute)).toHaveLength(2);
  });

  it("should change view to password change view when clicked on edit icon", () => {
    const wrapper = mount(<AccountTile />);

    wrapper.find(IconButton).simulate("click");

    expect(wrapper.find(TextField)).toHaveLength(2);
  });
});
