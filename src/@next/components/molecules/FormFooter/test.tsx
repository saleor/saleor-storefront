import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Button, ButtonLink } from "@components/atoms";
import { FormFooter } from ".";
import { IProps } from "./types";

describe("<FormFooter />", () => {
  const submitBtnText = "Save";
  const onSubmit = jest.fn();

  const DEFAULT_PROPS = {
    submitBtn: {
      action: onSubmit,
      text: submitBtnText,
    },
  };

  const renderFormFooter = (props: IProps) =>
    shallow(<FormFooter {...props} />);

  it("exists", () => {
    const formFooter = renderFormFooter(DEFAULT_PROPS);

    expect(formFooter.exists()).toEqual(true);
  });

  it("should render < Button />", () => {
    const button = renderFormFooter(DEFAULT_PROPS).find(Button);

    expect(button.exists()).toEqual(true);
    expect(button.prop("onClick")).toEqual(onSubmit);
  });

  it("should render <ButtonLink />", () => {
    const onCancel = jest.fn();
    const cancelBtnText = "Cancel";
    const button = renderFormFooter({
      ...DEFAULT_PROPS,
      cancelBtn: { action: onCancel, text: cancelBtnText },
    }).find(ButtonLink);

    expect(button.exists()).toEqual(true);
    expect(button.prop("onClick")).toEqual(onCancel);
  });
});
