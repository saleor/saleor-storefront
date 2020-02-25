import { storiesOf } from "@storybook/react";
import React from "react";

import { Chip } from ".";
storiesOf("@components/atoms/Chip", module)
  .addParameters({ component: Chip })
  .add("default", () => <Chip>Some thing</Chip>);
