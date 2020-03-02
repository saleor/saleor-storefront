import { storiesOf } from "@storybook/react";
import React from "react";

import { Title } from ".";

storiesOf("@components/atoms/Title", module)
  .addParameters({ component: Title })
  .add("default", () => <Title>This is title</Title>);
