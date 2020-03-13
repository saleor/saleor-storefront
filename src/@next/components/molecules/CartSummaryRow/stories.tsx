import { storiesOf } from "@storybook/react";
import React from "react";

import { CartSummaryRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/molecules/CartSummaryRow", module)
  .addParameters({ component: CartSummaryRow })
  .add("default", () => <CartSummaryRow {...DEFAULT_PROPS} />);
