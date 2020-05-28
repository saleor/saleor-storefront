import { storiesOf } from "@storybook/react";
import React from "react";

import { action } from "@storybook/addon-actions";
import { TextField } from ".";

const DEFAULT_PROPS = {
  dataCy: "testField",
  errors: [],
  label: "Label",
  onChange: action("onChange"),
  value: "Value",
};

const ContentLeft = () => <span>Content Left</span>;
const ContentRight = () => <span>Content Right</span>;

storiesOf("@components/molecules/TextField", module)
  .addParameters({ component: TextField })
  .add("default", () => <TextField {...DEFAULT_PROPS} />)
  .add("with errors", () => (
    <TextField
      {...DEFAULT_PROPS}
      errors={[{ field: "field", message: "Some error" }]}
    />
  ))
  .add("with content left", () => (
    <TextField {...DEFAULT_PROPS} contentLeft={<ContentLeft />} />
  ))
  .add("with content right", () => (
    <TextField {...DEFAULT_PROPS} contentRight={<ContentRight />} />
  ));
