import { storiesOf } from "@storybook/react";
import React from "react";

import { CartHeader } from ".";

storiesOf("@components/atoms/CartHeader", module)
  .addParameters({ component: CartHeader })
  .add("default", () => <CartHeader />);
