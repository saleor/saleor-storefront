import { storiesOf } from "@storybook/react";
import React from "react";

import { Label } from ".";
storiesOf("@components/atoms/Label", module).add("default", () => (
  <Label>This is sample text inside label</Label>
));
