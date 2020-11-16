import { storiesOf } from "@storybook/react";
import React from "react";

import { CartFooter } from ".";
import { BASIC_COSTS, ALL_POSSIBLE_COSTS } from "./fixtures";

storiesOf("@components/atoms/CartFooter", module)
  .addParameters({ component: CartFooter })
  .add("default", () => <CartFooter {...BASIC_COSTS} />)
  .add("full", () => <CartFooter {...ALL_POSSIBLE_COSTS} />);
