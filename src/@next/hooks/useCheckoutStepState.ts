import { useEffect, useState } from "react";

import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { ICheckout, IPayment } from "@saleor/sdk/lib/api/Checkout/types";
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
    if (!checkout?.id && items) {
      // we are creating checkout during address set up
      return CheckoutStep.Address;
    }

    const isShippingAddressSet =
      !isShippingRequiredForProducts || !!checkout?.shippingAddress;
    const isBillingAddressSet = !!checkout?.billingAddress;
    const isShippingMethodSet =
      !isShippingRequiredForProducts || !!checkout?.shippingMethod;
    const isPaymentMethodSet = !!payment?.id;

    if (!isShippingAddressSet || !isBillingAddressSet) {
      return CheckoutStep.Address;
    }
    if (!isShippingMethodSet) {
      return CheckoutStep.Shipping;
    }
    if (!isPaymentMethodSet) {
      return CheckoutStep.Payment;
    }
    return CheckoutStep.Review;
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
