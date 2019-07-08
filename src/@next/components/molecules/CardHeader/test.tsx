import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Icon } from "@components/atoms";
import { CardHeader } from ".";
import * as S from "./styles";
import { IProps } from "./types";

const DEFAULT_PROPS = {
  closeIcon: false,
  divider: false,
  text: "Some Title",
};

describe("<CardHeader />", () => {
  const renderHeader = (props: IProps) => shallow(<CardHeader {...props} />);
  it("exists", () => {
    const header = renderHeader(DEFAULT_PROPS);

    expect(header.exists()).toEqual(true);
  });

  it("should render text wrapped in <S.Title> by default", () => {
    const title = renderHeader(DEFAULT_PROPS).find(S.Title);

    expect(title.exists()).toEqual(true);
    expect(title.text()).toEqual(DEFAULT_PROPS.text);
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

  it("should render text wrapped in <S.Paragraph> when `textStyle` is set to `paragraph`", () => {
    const paragraph = renderHeader({
      ...DEFAULT_PROPS,
      textStyle: "paragraph",
    }).find(S.Paragraph);

    expect(paragraph.exists()).toEqual(true);
    expect(paragraph.text()).toEqual(DEFAULT_PROPS.text);
  });

  it("should render close icon when `closeIcon` prop is set to true", () => {
    const onHide = jest.fn();
    const closeIcon = renderHeader({
      ...DEFAULT_PROPS,
      closeIcon: true,
      onHide,
    }).find(S.CloseBtn);

    closeIcon.simulate("click");

    expect(closeIcon.exists()).toEqual(true);
    expect(closeIcon.find(Icon).prop("name")).toEqual("x");
    expect(onHide).toHaveBeenCalled();
  });

  it("should render custom icon when `customIcon` prop is defined", () => {
    const customIcon = <Icon name="edit" />;
    const icon = renderHeader({ ...DEFAULT_PROPS, customIcon }).find(Icon);

    expect(icon.exists()).toEqual(true);
    expect(icon.prop("name")).toEqual("edit");
  });

  it("should render border-bottom when `divider` prop is set to true", () => {
    const header = mount(<CardHeader {...DEFAULT_PROPS} divider={true} />).find(
      S.Header
    );

    expect(header).toHaveStyleRule(
      "border-bottom",
      `1px solid ${defaultTheme.colors.light}`
    );
  });
});
