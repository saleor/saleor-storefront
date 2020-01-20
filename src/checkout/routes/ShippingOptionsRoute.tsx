import * as React from "react";

import { StepCheck } from "../components";
import { ShippingOptions } from "../views";

export const ShippingOptionsRoute = props => {
  return (
    <StepCheck>
      <ShippingOptions {...props} />
    </StepCheck>
  );
};
