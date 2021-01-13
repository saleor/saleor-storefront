import { storiesOf } from "@storybook/react";
import React from "react";

import { CartFooter } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

storiesOf("@components/atoms/CartFooter", module)
  .addParameters({ component: CartFooter })
  .add("default", () => <CartFooter {...BASIC_COSTS} />)
  .add("full", () => <CartFooter {...ALL_POSSIBLE_COSTS} />);
