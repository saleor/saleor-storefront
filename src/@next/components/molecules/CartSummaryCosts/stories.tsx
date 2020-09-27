import { storiesOf } from "@storybook/react";
import React from "react";

import { CartSummaryCosts } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/molecules/CartSummaryCosts", module)
  .addParameters({ component: CartSummaryCosts })
  .add("default", () => <CartSummaryCosts {...DEFAULT_PROPS} />);
