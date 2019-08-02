import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { OverlayItem } from ".";

storiesOf("@components/molecules/OverlayItem", module)
  .add("default", () => (
    <OverlayItem
      {...(boolean("Clickable", false) && { onClick: action("onClick") })}
    >
      Item
    </OverlayItem>
  ))
  .add("selected", () => (
    <OverlayItem
      selected
      {...(boolean("Clickable", false) && { onClick: action("onClick") })}
    >
      Item
    </OverlayItem>
  ));
