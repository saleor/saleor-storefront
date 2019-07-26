import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from ".";

storiesOf("@components/atoms/Icon", module).add("sample icon", () => (
  <Icon name="arrow_back" />
));
