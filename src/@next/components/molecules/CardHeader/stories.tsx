import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "@components/atoms";

import { CardHeader } from ".";
import { IProps, TextStyle, TitleSize } from "./types";

const children = "Some Title";
const DEFAULT_PROPS = {
  children,
  closeIcon: false,
  divider: false,
};

const renderHeader = (props: IProps) => (
  <CardHeader {...props}>{children}</CardHeader>
);

storiesOf("@components/molecules/CardHeader", module)
  .add("default", () => <CardHeader {...DEFAULT_PROPS} />)
  .add("with divider", () => {
    const PROPS = { ...DEFAULT_PROPS, divider: true };
    return renderHeader(PROPS);
  })
  .add("with close icon", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      closeIcon: true,
      onHide: action("onHide"),
    };
    return renderHeader(PROPS);
  })
  .add("with custom icon", () => {
    const icon = <Icon name="edit" size={24} />;
    const PROPS = { ...DEFAULT_PROPS, customIcon: icon };
    return renderHeader(PROPS);
  })
  .add("with paragraph text style", () => {
    const textStyle: TextStyle = "paragraph";
    const PROPS = { ...DEFAULT_PROPS, textStyle };
    return renderHeader(PROPS);
  })
  .add("with big text size", () => {
    const customIcon = <Icon name="trash" size={30} />;
    const titleSize: TitleSize = "lg";
    const PROPS = { ...DEFAULT_PROPS, customIcon, divider: true, titleSize };
    return renderHeader(PROPS);
  });
