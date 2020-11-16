import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from ".";

storiesOf("@components/atoms/Button", module)
  .addParameters({ component: Button })
  .add("Primary", () => (
    <Button fullWidth={false} testingContext="testButton">
      Primary Button
    </Button>
  ))
  .add("Secondary", () => (
    <Button color="secondary" fullWidth={false} testingContext="testButton">
      Secondary Button
    </Button>
  ))
  .add("Size sm", () => (
    <Button size="sm" fullWidth={false} testingContext="testButton">
      Small Button
    </Button>
  ));
