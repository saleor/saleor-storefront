import { storiesOf } from "@storybook/react";
import React from "react";

import { CartEmpty } from ".";

storiesOf("@components/templates/CartEmpty", module)
  .addParameters({ component: CartEmpty })
  .add("default", () => <CartEmpty />);
