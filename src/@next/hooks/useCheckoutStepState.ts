import { useEffect, useState } from "react";

import { IItems } from "@sdk/api/Cart/types";
import { ICheckout, IPayment } from "@sdk/api/Checkout/types";
import { CheckoutStep } from "@temp/core/config";

export const useCheckoutStepState = (
  items?: IItems,
  checkout?: ICheckout,
  payment?: IPayment
): CheckoutStep => {
  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  const getStep = () => {
    if (!checkout?.id && items && isShippingRequiredForProducts) {
      return CheckoutStep.Address;
    } else if (!checkout?.id && items) {
      return CheckoutStep.Payment;
    }

    const isShippingStep =
      !!checkout?.shippingAddress || !isShippingRequiredForProducts;
    const isPaymentStep =
      (isShippingStep && !!checkout?.shippingMethod) ||
      !isShippingRequiredForProducts;
    const isReviewStep =
      isPaymentStep && !!checkout?.billingAddress && !!payment?.id;

    if (isReviewStep) {
      return CheckoutStep.Review;
    } else if (isPaymentStep) {
      return CheckoutStep.Payment;
    } else if (isShippingStep) {
      return CheckoutStep.Shipping;
    } else {
      return CheckoutStep.Address;
    }
  };

  const [step, setStep] = useState(getStep());

  useEffect(() => {
    const newStep = getStep();
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [checkout, items, payment]);

  return step;
};
