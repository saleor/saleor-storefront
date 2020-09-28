import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Input } from ".";

storiesOf("@components/atoms/Input", module)
  .addParameters({ component: Input })
  .add("default", () => <Input value="" label="Empty" />)
  .add("with value", () => (
    <Input
      label="Text goes here"
      value={text("value", "Example text")}
      contentRight={<div>Content right</div>}
    />
  ))
  .add("error", () => <Input value="Some text" label="Text goes here" error />)
  .add("disabled", () => <Input value="" label="Text goes here" disabled />);
