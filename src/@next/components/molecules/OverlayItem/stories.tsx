import { storiesOf } from "@storybook/react";
import React from "react";

import { OverlayItem } from ".";

storiesOf("@components/molecules/OverlayItem", module)
  .add("default", () => <OverlayItem>Item</OverlayItem>)
  .add("selected", () => <OverlayItem selected>Item</OverlayItem>);
