import { storiesOf } from "@storybook/react";
import React from "react";

import { AddNewTile } from ".";

storiesOf("@components/atoms/AddNewTile", module)
  .addParameters({ component: AddNewTile })
  .add("default", () => <AddNewTile type="card" />);
