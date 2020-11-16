import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressTileOption } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/molecules/AddressTileOption", module)
  .addParameters({ component: AddressTileOption })
  .add("unchecked", () => (
    <AddressTileOption {...DEFAULT_PROPS} checked={false} />
  ))
  .add("checked", () => <AddressTileOption {...DEFAULT_PROPS} checked />);
