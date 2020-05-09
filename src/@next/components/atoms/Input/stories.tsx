import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Input } from ".";

storiesOf("@components/atoms/Input", module)
  .addParameters({ component: Input })
  .add("default", () => <Input value="" label="Input Label" />)
  .add("with value", () => (
    <Input
      label="Input Label"
      value={text("value", "Example text")}
      contentRight={<div>Content right</div>}
    />
  ))
  .add("error", () => <Input value="Some text" label="Input Label" error />)
  .add("disabled", () => <Input value="" label="Input Label" disabled />);
