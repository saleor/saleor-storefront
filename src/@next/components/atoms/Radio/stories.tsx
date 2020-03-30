import { storiesOf } from "@storybook/react";
import React from "react";

import { Radio } from ".";

storiesOf("@components/atoms/Radio", module)
  .addParameters({ component: Radio })
  .add("default", () => (
    <Radio name="name" value="value" checked={false} onChange={() => null}>
      Radio with label
    </Radio>
  ));
