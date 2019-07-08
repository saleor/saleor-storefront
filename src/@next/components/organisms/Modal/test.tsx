import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Modal } from ".";

const Children = () => <div>Content</div>;
const PROPS = {
  cancelBtnText: "Cancel",
  children: Children,
  formId: "form-id",
  hide: jest.fn(),
  loading: false,
  show: true,
  submitBtnText: "Save",
  title: "Modal title",
};

describe("<Modal />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <Modal {...PROPS}>
        <Children />
      </Modal>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
