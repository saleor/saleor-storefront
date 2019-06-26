import { storiesOf } from "@storybook/react";
import React from "react";

import { IconButton } from ".";
import { createStory } from "../baseStory";

storiesOf("@components/atoms/IconButton", module)
  .add("edit icon button", () => <IconButton name="edit" size={19} />)
  .add("trash icon button", () => <IconButton name="trash" size={22} />);
