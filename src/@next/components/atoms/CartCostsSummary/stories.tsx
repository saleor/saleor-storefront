import { storiesOf } from "@storybook/react";
import React from "react";

import { CartCostsSummary } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

storiesOf("@components/molecules/CartCostsSummary", module)
  .addParameters({ component: CartCostsSummary })
  .add("default", () => <CartCostsSummary {...BASIC_COSTS} />)
  .add("full", () => <CartCostsSummary {...ALL_POSSIBLE_COSTS} />);
