import * as React from "react";

import { StepCheck } from "../components";
import { Review } from "../views";

export const ReviewRoute = props => {
  return (
    <StepCheck>
      <Review {...props} />
    </StepCheck>
  );
};
