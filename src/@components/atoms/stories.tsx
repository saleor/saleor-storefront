import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from ".";

storiesOf("@components/atoms", module).add("Button", () => (
  <>
    <Button>Sample Button</Button>
    <Button secondary>Secondary Button</Button>
  </>
));
