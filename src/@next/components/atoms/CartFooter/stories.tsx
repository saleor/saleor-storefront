import { storiesOf } from "@storybook/react";
import React from "react";

import { CartFooter } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/atoms/CartFooter", module)
  .addParameters({ component: CartFooter })
  .add("default", () => <CartFooter {...DEFAULT_PROPS} />);
