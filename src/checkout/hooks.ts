import { useEffect, useState } from "react";

export enum CheckoutStep {
  ShippingAddress = 1,
  ShippingOption,
  BillingAddress,
  Payment,
  Review,
}

export const useCheckoutStepState = (
  checkout,
  variantsProducts,
  cardData,
  dummyStatus
) => {
  const [step, setStep] = useState(CheckoutStep.ShippingAddress);

  useEffect(() => {
    if (!checkout && variantsProducts) {
      setStep(CheckoutStep.BillingAddress);
    }
    if (!checkout) {
      setStep(CheckoutStep.ShippingAddress);
    }

    const isShippingOptionStep =
      checkout.availableShippingMethods.length && !!checkout.shippingAddress;
    const isBillingStep =
      (isShippingOptionStep && !!checkout.shippingMethod) ||
      !checkout.isShippingRequired;
    const isPaymentStep = isBillingStep && !!checkout.billingAddress;
    const isReviewStep = isPaymentStep && !!(cardData || dummyStatus);

    if (isReviewStep) {
      setStep(CheckoutStep.Review);
    } else if (isPaymentStep) {
      setStep(CheckoutStep.Payment);
    } else if (isBillingStep) {
      setStep(CheckoutStep.BillingAddress);
    } else if (isShippingOptionStep) {
      setStep(CheckoutStep.ShippingOption);
    }
    setStep(CheckoutStep.ShippingAddress);
  }, [checkout, variantsProducts, cardData, dummyStatus]);

  return step;
};
