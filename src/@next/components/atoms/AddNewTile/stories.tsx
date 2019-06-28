import { storiesOf } from "@storybook/react";
import React from "react";

import { AddNewTile } from ".";

storiesOf("@components/atoms/AddNewTile", module).add("default", () => (
  <AddNewTile type="card" />
));
