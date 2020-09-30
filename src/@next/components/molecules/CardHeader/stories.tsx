import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { IconButton } from "@components/atoms";

import { CardHeader } from ".";
import { IProps, TextStyle, TitleSize } from "./types";

const children = "Some Title";
const DEFAULT_PROPS = {
  children,
  divider: false,
};

const renderHeader = (props: IProps) => (
  <CardHeader {...props}>{children}</CardHeader>
);

storiesOf("@components/molecules/CardHeader", module)
  .addParameters({ component: CardHeader })
  .add("default", () => <CardHeader {...DEFAULT_PROPS} />)
  .add("with divider", () => {
    const PROPS = { ...DEFAULT_PROPS, divider: true };
    return renderHeader(PROPS);
  })
  .add("with close icon", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      onHide: action("onHide"),
    };
    return renderHeader(PROPS);
  })
  .add("with custom close icon", () => {
    const icon = (
      <IconButton
        testingContext="test"
        name="edit"
        size={24}
        onClick={action("edit")}
      />
    );
    const PROPS = { ...DEFAULT_PROPS, closeIcon: icon };
    return renderHeader(PROPS);
  })
  .add("with prefix", () => {
    const icon = (
      <IconButton
        testingContext="test"
        name="arrow_back"
        size={24}
        onClick={action("onArrowBack")}
      />
    );
    const PROPS = { ...DEFAULT_PROPS, prfix: icon };
    return renderHeader(PROPS);
  })
  .add("with paragraph text style", () => {
    const textStyle: TextStyle = "paragraph";
    const PROPS = { ...DEFAULT_PROPS, textStyle };
    return renderHeader(PROPS);
  })
  .add("with big text size", () => {
    const closeIcon = (
      <IconButton
        testingContext="test"
        name="trash"
        size={30}
        onClick={action("trash")}
      />
    );
    const titleSize: TitleSize = "lg";
    const PROPS = { ...DEFAULT_PROPS, closeIcon, divider: true, titleSize };
    return renderHeader(PROPS);
  });
