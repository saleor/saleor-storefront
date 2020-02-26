import { storiesOf } from "@storybook/react";
import React from "react";

import { IconButton } from ".";

storiesOf("@components/atoms/IconButton", module)
  .addParameters({ component: IconButton })
  .add("edit icon button", () => <IconButton name="edit" size={19} />)
  .add("trash icon button", () => <IconButton name="trash" size={22} />);
