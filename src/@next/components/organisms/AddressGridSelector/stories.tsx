import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressGridSelector } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/organisms/AddressGridSelector", module)
  .addParameters({ component: AddressGridSelector })
  .add("default", () => (
    <AddressGridSelector {...DEFAULT_PROPS} onSelect={() => null} />
  ));
