import { useRouter } from "next/router";
import { useEffect } from "react";

import { useCart, useCheckout } from "@saleor/sdk";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { checkIfShippingRequiredForProducts } from "@utils/core";
import { useCheckoutStepState } from "./useCheckoutStepState";

export const useRedirectToCorrectCheckoutStep = (cartLoaded: boolean) => {
  const { pathname, replace } = useRouter();
  const { totalPrice, items } = useCart();
  const { checkout, payment } = useCheckout();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );
  const stepFromPath = CHECKOUT_STEPS.find(({ link }) => link === pathname)
    ?.step;
  const isShippingRequired = checkIfShippingRequiredForProducts(items);

  const isIncorrectStep =
    (pathname !== CHECKOUT_STEPS[4].link &&
      (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))) ||
    (pathname === CHECKOUT_STEPS[1].link && !isShippingRequired);

  const getStepLink = () =>
    CHECKOUT_STEPS.find(stepObj => stepObj.step === recommendedStep)?.link ||
    CHECKOUT_STEPS[0].link;

  useEffect(() => {
    if (cartLoaded && isIncorrectStep) {
      replace(getStepLink());
    }
  }, [pathname, cartLoaded]);
};
