import { useEffect, useState } from "react";
import { generatePath } from "react-router";

import { CheckoutStep } from "../context";
import {
  billingUrl,
  paymentUrl,
  reviewUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from "../routes";

/**
 * Gets checkout step based on the provided path.
 */
export const useCheckoutStepFromPath = (
  path: string,
  token?: string
): CheckoutStep => {
  const getStep = () => {
    const generatedPath = path => generatePath(path, { token });

    switch (generatedPath(path)) {
      case generatedPath(shippingAddressUrl):
        return CheckoutStep.ShippingAddress;

      case generatedPath(shippingOptionsUrl):
        return CheckoutStep.ShippingOption;

      case generatedPath(billingUrl):
        return CheckoutStep.BillingAddress;

      case generatedPath(paymentUrl):
        return CheckoutStep.Payment;

      case generatedPath(reviewUrl):
        return CheckoutStep.Review;

      default:
        return null;
    }
  };

  const [step, setStep] = useState(getStep());

  useEffect(() => {
    const newStep = getStep();
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [path, token]);

  return step;
};
