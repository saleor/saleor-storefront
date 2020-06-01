import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Button, ButtonLink } from "@components/atoms";
import { FormFooter } from ".";
import * as S from "./styles";
import { IProps } from "./types";

describe("<FormFooter />", () => {
  const submitBtnText = "Save";
  const onSubmit = jest.fn();

  const DEFAULT_PROPS = {
    submitBtn: {
      action: onSubmit,
      dataCy: "footerTestButton",
      text: submitBtnText,
    },
  };

  const renderFormFooter = (props: IProps) =>
    shallow(<FormFooter {...props} />);

  it("exists", () => {
    const formFooter = renderFormFooter(DEFAULT_PROPS);

    expect(formFooter.exists()).toEqual(true);
  });

  it("should render <Button />", () => {
    const button = renderFormFooter(DEFAULT_PROPS).find(Button);

    expect(button.exists()).toEqual(true);
    expect(button.prop("onClick")).toEqual(onSubmit);
    expect(button.prop("type")).toEqual("button");
    expect(button.children().text()).toEqual(submitBtnText);
  });

  it("should render <Button /> with form attribute", () => {
    const FORM_ID = "form-id";
    const PROPS = {
      formId: FORM_ID,
      submitBtn: {
        dataCy: "footerTestButton",
        text: "Submit",
      },
    };
    const button = renderFormFooter(PROPS).find(Button);

    expect(button.exists()).toEqual(true);
    expect(button.children().text()).toEqual("Submit");
    expect(button.prop("form")).toEqual(FORM_ID);
    expect(button.prop("type")).toEqual("submit");
    expect(button.prop("disabled")).toEqual(false);
  });

  it("should render <Button /> with <LoadingText /> component if `disabled` prop is set to true", () => {
    const button = renderFormFooter({ ...DEFAULT_PROPS, disabled: true }).find(
      Button
    );
    expect(button.exists()).toEqual(true);
    expect(button.find("LoadingText").exists()).toBe(true);
    expect(button.prop("disabled")).toEqual(true);
  });

  it("should render <ButtonLink />", () => {
    const onCancel = jest.fn();
    const cancelBtnText = "Cancel";
    const button = renderFormFooter({
      ...DEFAULT_PROPS,
      cancelBtn: { 
        action: onCancel,     
        dataCy: "footerTestButton",
        text: cancelBtnText,
      },
    }).find(ButtonLink);

    expect(button.exists()).toEqual(true);
    expect(button.prop("onClick")).toEqual(onCancel);
    expect(button.prop("type")).toEqual("button");
    expect(button.children().text()).toEqual(cancelBtnText);
  });

  it("should render border-top if `divider` prop is set to true", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      divider: true,
    };
    const formFooter = mount(<FormFooter {...PROPS} />).find(S.Footer);

    expect(formFooter).toHaveStyleRule(
      "border-top",
      `1px solid ${defaultTheme.colors.light}`
    );
  });
});
