import { storiesOf } from "@storybook/react";
import React from "react";

import { CartCostsSummary } from ".";
import { BASIC_COSTS, ALL_POSSIBLE_COSTS } from "./fixtures";

storiesOf("@components/molecules/CartCostsSummary", module)
  .addParameters({ component: CartCostsSummary })
  .add("default", () => <CartCostsSummary {...BASIC_COSTS} />)
  .add("full", () => <CartCostsSummary {...ALL_POSSIBLE_COSTS} />);
