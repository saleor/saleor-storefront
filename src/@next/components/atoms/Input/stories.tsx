import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Input } from ".";

storiesOf("@components/atoms/Input", module)
  .addParameters({ component: Input })
  .add("default", () => <Input dataCy="test" value="" label="Empty" />)
  .add("with value", () => (
    <Input
      dataCy="test"
      label="Text goes here"
      value={text("value", "Example text")}
      contentRight={<div>Content right</div>}
    />
  ))
  .add("error", () => <Input dataCy="test" value="Some text" label="Text goes here" error />)
  .add("disabled", () => <Input dataCy="test" value="" label="Text goes here" disabled />);
