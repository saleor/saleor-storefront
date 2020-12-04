import { storiesOf } from "@storybook/react";
import React from "react";

import { QuantityInput } from ".";
import { IQuantityInput } from "./QuantityInput";

const DEFAULT_PROPS: IQuantityInput = {
  quantity: 1,
  maxQuantity: 10,
  disabled: false,
  onQuantityChange: (value: number) => undefined,
  hideErrors: false,
  testingContext: "QuantityInput",
};

storiesOf("@components/molecules/QuantityInput", module)
  .addParameters({ component: QuantityInput })
  .add("default", () => <QuantityInput {...DEFAULT_PROPS} />)
  .add("disabled", () => <QuantityInput {...DEFAULT_PROPS} disabled />);
