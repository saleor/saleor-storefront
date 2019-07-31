import { storiesOf } from "@storybook/react";
import React from "react";

import { OverlayItem } from ".";
storiesOf("@components/atoms/OverlayItem", module)
  .add("default", () => <OverlayItem label="M" />)
  .add("selected", () => <OverlayItem selected label="M" />);
