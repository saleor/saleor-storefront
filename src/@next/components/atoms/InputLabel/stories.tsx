import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { InputLabel } from ".";
storiesOf("@components/atoms/InputLabel", module)
  .addParameters({ component: InputLabel })
  .add("active false", () => (
    <InputLabel labelBackground={"#FFF"} active={boolean("Active", false)}>
      This is input - check knobs
    </InputLabel>
  ))
  .add("active true", () => (
    <InputLabel labelBackground={"#FFF"} active={boolean("Active", true)}>
      This is input - check knobs
    </InputLabel>
  ));
