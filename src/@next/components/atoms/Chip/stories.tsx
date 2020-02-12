import { storiesOf } from "@storybook/react";
import React from "react";

import { Chip } from ".";
storiesOf("@components/atoms/Chip", module).add("default", () => (
  <Chip>Some thing</Chip>
));
