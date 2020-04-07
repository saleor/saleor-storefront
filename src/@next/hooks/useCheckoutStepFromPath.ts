import { useEffect, useState } from "react";

import { CHECKOUT_STEPS, CheckoutStep } from "@temp/core/config";

/**
 * Gets checkout step based on the provided path.
 */
export const useCheckoutStepFromPath = (path: string): CheckoutStep | null => {
  const getStep = () => {
    const pathItem = CHECKOUT_STEPS.find(({ link }) =>
      path.replace(/\//g, "").includes(link.replace(/\//g, ""))
    );

    return pathItem ? pathItem.step : null;
  };

  const [step, setStep] = useState(getStep());

  useEffect(() => {
    const newStep = getStep();
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [path]);

  return step;
};
