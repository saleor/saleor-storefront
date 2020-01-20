import * as React from "react";

import { StepCheck } from "../components";
import { Billing } from "../views";

export const BillingRoute = props => {
  return (
    <StepCheck>
      <Billing {...props} />
    </StepCheck>
  );
};
