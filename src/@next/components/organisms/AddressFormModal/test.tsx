import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressFormModal } from ".";

jest.mock("@saleor/sdk", () => ({
  useCreateUserAddress: () => [jest.fn(), { data: null, error: null }],
  useUpdateUserAddress: () => [jest.fn(), { data: null, error: null }],
}));

const DEFAULT_PROPS = {
  formId: "address-form",
  handleSubmit: jest.fn(),
  hideModal: jest.fn(),
  options: [
    {
      code: "PL",
      country: "Poland",
    },
    {
      code: "PL",
      country: "United States of America",
    },
  ],
  submitBtnText: "Submit button",
  title: "This is title",
};

describe("<AddressFormModal />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressFormModal {...DEFAULT_PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should have correct title and submit button text", () => {
    const wrapper = mount(<AddressFormModal {...DEFAULT_PROPS} />);

    expect(wrapper.props().submitBtnText).toEqual(DEFAULT_PROPS.submitBtnText);
    expect(wrapper.props().title).toEqual(DEFAULT_PROPS.title);
  });
});
