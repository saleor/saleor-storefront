import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";

import { IconButton } from "@components/atoms";
import { defaultTheme } from "@styles";

import { CardHeader } from ".";
import * as S from "./styles";
import { IProps } from "./types";

const children = "Some Title";
const DEFAULT_PROPS = {
  children,
  divider: false,
};

describe("<CardHeader />", () => {
  const renderHeader = (props: IProps) =>
    shallow(<CardHeader {...props}>{children}</CardHeader>);
  it("exists", () => {
    const header = renderHeader(DEFAULT_PROPS);

    expect(header.exists()).toEqual(true);
  });

  it("should render children wrapped in <S.Title> by default", () => {
    const title = renderHeader(DEFAULT_PROPS).find(S.Title);

    expect(title.exists()).toEqual(true);
    expect(title.contains(children)).toBe(true);
  });

  it("should pass `titleSize` as `size` to  <S.Title>", () => {
    const title = mount(<CardHeader {...DEFAULT_PROPS} titleSize="lg" />).find(
      S.Title
    );

    expect(title).toHaveStyleRule(
      "font-size",
      defaultTheme.typography.h4FontSize
    );
  });

  it("should render children wrapped in <S.Paragraph> when `textStyle` is set to `paragraph`", () => {
    const paragraph = renderHeader({
      ...DEFAULT_PROPS,
      textStyle: "paragraph",
    }).find(S.Paragraph);

    expect(paragraph.exists()).toEqual(true);
    expect(paragraph.contains(children)).toBe(true);
  });

  it("should render close icon when `onHide` prop is defined and `closeIcon` is not defined", () => {
    const onHide = jest.fn();
    const closeIcon = renderHeader({
      ...DEFAULT_PROPS,
      onHide,
    }).find(IconButton);

    closeIcon.simulate("click");

    expect(closeIcon.exists()).toEqual(true);
    expect(closeIcon.prop("name")).toEqual("x");
    expect(onHide).toHaveBeenCalled();
  });

  it("should render custom close icon when `closeIcon` prop is defined", () => {
    const closeIcon = <IconButton testingContext="test" name="edit" />;
    const icon = renderHeader({ ...DEFAULT_PROPS, closeIcon }).find(IconButton);

    expect(icon.exists()).toEqual(true);
    expect(icon.prop("name")).toEqual("edit");
  });

  it("should render prefix as icon", () => {
    const prefix = <IconButton testingContext="test" name="arrow_back" />;
    const icon = renderHeader({ ...DEFAULT_PROPS, prefix }).find(IconButton);

    expect(icon.exists()).toEqual(true);
    expect(icon.prop("name")).toEqual("arrow_back");
  });

  it("should render border-bottom when `divider` prop is set to true", () => {
    const header = mount(<CardHeader {...DEFAULT_PROPS} divider />).find(
      S.Wrapper
    );

    expect(header).toHaveStyleRule(
      "border-bottom",
      `1px solid ${defaultTheme.colors.light}`
    );
  });
});
