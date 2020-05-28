import { storiesOf } from "@storybook/react";
import React from "react";

import { OverlayItem } from ".";

storiesOf("@components/molecules/OverlayItem", module)
  .addParameters({ component: OverlayItem })
  .add("default", () => <OverlayItem dataCy="test">Item</OverlayItem>)
  .add("selected", () => <OverlayItem  dataCy="test" selected>Item</OverlayItem>);
