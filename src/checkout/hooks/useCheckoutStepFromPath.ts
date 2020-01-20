import { useEffect, useState } from "react";

import { CheckoutStep } from "../context";
import {
  baseUrl,
  billingBaseUrl,
  paymentBaseUrl,
  reviewBaseUrl,
  shippingAddressBaseUrl,
  shippingOptionsBaseUrl,
} from "../routes";

/**
 * Gets checkout step based on the provided path.
 */
export const useCheckoutStepFromPath = (
  path: string,
  token?: string
): CheckoutStep => {
  const getStep = () => {
    const pathList = [
      {
        basePath: `${baseUrl}${shippingAddressBaseUrl}`,
        step: CheckoutStep.ShippingAddress,
      },
      {
        basePath: `${baseUrl}${shippingOptionsBaseUrl}`,
        step: CheckoutStep.ShippingOption,
      },
      {
        basePath: `${baseUrl}${billingBaseUrl}`,
        step: CheckoutStep.BillingAddress,
      },
      { basePath: `${baseUrl}${paymentBaseUrl}`, step: CheckoutStep.Payment },
      { basePath: `${baseUrl}${reviewBaseUrl}`, step: CheckoutStep.Review },
    ];

    const pathItem = pathList.find(({ basePath }) =>
      path.replace(/\//g, "").includes(basePath.replace(/\//g, ""))
    );

    return pathItem ? pathItem.step : null;
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
