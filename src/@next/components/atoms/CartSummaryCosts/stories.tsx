import { storiesOf } from "@storybook/react";
import React from "react";

import { CartSummaryCosts } from ".";
import { BASIC_COSTS, ALL_POSSIBLE_COSTS } from "./fixtures";

storiesOf("@components/molecules/CartSummaryCosts", module)
  .addParameters({ component: CartSummaryCosts })
  .add("default", () => <CartSummaryCosts {...BASIC_COSTS} />)
  .add("full", () => <CartSummaryCosts {...ALL_POSSIBLE_COSTS} />);
