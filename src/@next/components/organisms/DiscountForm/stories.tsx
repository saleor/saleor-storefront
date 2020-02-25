import { storiesOf } from "@storybook/react";
import React from "react";

import { DiscountForm } from ".";
storiesOf("@components/organisms/DiscountForm", module)
  .addParameters({ component: DiscountForm })
  .add("default", () => <DiscountForm />);
