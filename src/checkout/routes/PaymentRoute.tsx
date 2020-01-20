import * as React from "react";

import { StepCheck } from "../components";
import { Payment } from "../views";

export const PaymentRoute = props => {
  return (
    <StepCheck>
      <Payment {...props} />
    </StepCheck>
  );
};
