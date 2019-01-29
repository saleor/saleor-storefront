import * as React from "react";
import { Redirect } from "react-router";

import { CheckoutStep } from "../context";
import { baseUrl } from "../routes";
import { getCurrentStep } from "./Steps";

/**
 * Redirector to prevent user from entering invalid step by manually pasting the url.
 */
const StepCheck: React.FC<{
  step: CheckoutStep;
  path: string;
  token?: string;
}> = ({ step, path, token }) => {
  if (step !== getCurrentStep(path, token)) {
    return <Redirect to={baseUrl} />;
  }

  return null;
};

export default StepCheck;
