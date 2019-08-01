import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

const DEFAULT_PROPS = {
  onClick: action("onClick"),
};

import { OverlayItem } from ".";
storiesOf("@components/molecules/OverlayItem", module)
  .add("default", () => <OverlayItem {...DEFAULT_PROPS}>Item</OverlayItem>)
  .add("selected", () => (
    <OverlayItem selected {...DEFAULT_PROPS}>
      Item
    </OverlayItem>
  ));
