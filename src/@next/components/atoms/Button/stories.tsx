import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from ".";

storiesOf("@components/atoms/Button", module)
  .add("Primary", () => <Button>Primary Button</Button>)
  .add("Secondary", () => <Button color="secondary">Secondary Button</Button>)
  .add("Size sm", () => <Button size="sm">Small Button</Button>);
