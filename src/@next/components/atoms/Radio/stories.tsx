import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Radio } from ".";

storiesOf("@components/atoms/Radio", module)
  .addParameters({ component: Radio })
  .add("default", () => (
    <Radio name="name" value="value" checked={boolean("Checked", false)}>
      Radio with label
    </Radio>
  ));
