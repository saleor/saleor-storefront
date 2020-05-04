import { storiesOf } from "@storybook/react";
import React from "react";

import { Cart } from ".";

storiesOf("@components/templates/Cart", module)
  .addParameters({ component: Cart })
  .add("default", () => <Cart />);
