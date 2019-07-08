import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "@components/atoms";
import { CardHeader } from ".";
import { TextStyle, TitleSize } from "./types";

const DEFAULT_PROPS = {
  closeIcon: false,
  divider: false,
  text: "Some Title",
};
storiesOf("@components/molecules/CardHeader", module)
  .add("default", () => <CardHeader {...DEFAULT_PROPS} />)
  .add("with divider", () => {
    const PROPS = { ...DEFAULT_PROPS, divider: true };
    return <CardHeader {...PROPS} />;
  })
  .add("with close icon", () => {
    const PROPS = { ...DEFAULT_PROPS, closeIcon: true };
    return <CardHeader {...PROPS} />;
  })
  .add("with custom icon", () => {
    const icon = <Icon name="edit" size={24} />;
    const PROPS = { ...DEFAULT_PROPS, customIcon: icon };
    return <CardHeader {...PROPS} />;
  })
  .add("with paragraph text style", () => {
    const textStyle: TextStyle = "paragraph";
    const PROPS = { ...DEFAULT_PROPS, textStyle };
    return <CardHeader {...PROPS} />;
  })
  .add("with big text size", () => {
    const customIcon = <Icon name="trash" size={30} />;
    const titleSize: TitleSize = "lg";
    const PROPS = { ...DEFAULT_PROPS, customIcon, divider: true, titleSize };
    return <CardHeader {...PROPS} />;
  });
