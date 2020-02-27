import { storiesOf } from "@storybook/react";
import React from "react";

import { CartView } from ".";

storiesOf("@components/views/CardView", module)
  .addParameters({ component: CartView })
  .add("default", () => <CartView />);
