import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressTileOption } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/molecules/AddressTileOption", module)
  .addParameters({ component: AddressTileOption })
  .add("default", () => (
    <AddressTileOption {...DEFAULT_PROPS} checked={boolean("Checked", false)} />
  ));
