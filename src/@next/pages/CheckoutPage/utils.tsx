import type { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { NextRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import React from "react";
import { FormattedMessage } from "react-intl";

import type { CartSummaryProps } from "@components/organisms/CartSummary";
import { paths } from "@paths";
import { checkoutMessages } from "@temp/intl";

export const checkIfShippingRequiredForProducts = (items?: IItems) =>
  items?.some(({ variant }) => variant.product?.productType.isShippingRequired);

export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
  PaymentConfirm,
}

export interface CheckoutStepDefinition {
  index: number;
  link: string;
  name: string;
  step: CheckoutStep;
  nextActionName?: string;
  onlyIfShippingRequired?: boolean;
  withoutOwnView?: boolean;
}

export const CHECKOUT_STEPS: CheckoutStepDefinition[] = [
  {
    index: 0,
    link: paths.checkoutAddress,
    name: "Address",
    nextActionName: "Continue to Shipping",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: paths.checkoutShipping,
    name: "Shipping",
    nextActionName: "Continue to Payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: paths.checkoutPayment,
    name: "Payment",
    nextActionName: "Continue to Review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: paths.checkoutReview,
    name: "Review",
    nextActionName: "Place order",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
  {
    index: 4,
    link: paths.checkoutPaymentConfirm,
    name: "Payment confirm",
    onlyIfShippingRequired: false,
    step: CheckoutStep.PaymentConfirm,
    withoutOwnView: true,
  },
];

export type SubpageCompleteHandler = () => void | Promise<void>;

export interface SubpageBaseProps {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: (pageStep: CheckoutStep, data?: object) => void;
}

export const prepareCartSummaryProducts = (
  items?: IItems
): CartSummaryProps["products"] | undefined =>
  items?.map(({ id, variant, totalPrice, quantity }) => ({
    id: id || "",
    name: variant.product?.name || "",
    price: {
      gross: {
        amount: totalPrice?.gross.amount || 0,
        currency: totalPrice?.gross.currency || "",
      },
      net: {
        amount: totalPrice?.net.amount || 0,
        currency: totalPrice?.net.currency || "",
      },
    },
    quantity,
    sku: variant.sku || "",
    thumbnail: {
      alt: variant.product?.thumbnail?.alt || undefined,
      url: variant.product?.thumbnail?.url,
      url2x: variant.product?.thumbnail2x?.url,
    },
  }));

const continueButtonTextMap: Partial<Record<CheckoutStep, JSX.Element>> = {
  [CheckoutStep.Address]: (
    <FormattedMessage {...checkoutMessages.addressNextActionName} />
  ),
  [CheckoutStep.Shipping]: (
    <FormattedMessage {...checkoutMessages.shippingNextActionName} />
  ),
  [CheckoutStep.Payment]: (
    <FormattedMessage {...checkoutMessages.paymentNextActionName} />
  ),
  [CheckoutStep.Review]: (
    <FormattedMessage {...checkoutMessages.reviewNextActionName} />
  ),
};
export const getContinueButtonText = (step: CheckoutStep) =>
  continueButtonTextMap[step];

export const getAvailableSteps = (items: IItems | undefined) => {
  const isShippingRequired = checkIfShippingRequiredForProducts(items);
  const stepsWithViews = CHECKOUT_STEPS.filter(
    ({ withoutOwnView }) => !withoutOwnView
  );
  return isShippingRequired
    ? stepsWithViews
    : stepsWithViews.filter(
        ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
      );
};

export const getCurrentStep = (
  pathname: string,
  steps: CheckoutStepDefinition[]
) => {
  const activeStepIndex = (() => {
    const matchingStepIndex = steps.findIndex(({ link }) => link === pathname);
    return matchingStepIndex !== -1 ? matchingStepIndex : steps.length - 1;
  })();
  const activeStep = steps[activeStepIndex];

  return { activeStepIndex, activeStep };
};

export const stepSubmitSuccessHandler = (
  push: NextRouter["push"],
  steps: CheckoutStepDefinition[],
  activeStepIndex: number
) => (currentStep: CheckoutStep, data?: object) => {
  if (currentStep === CheckoutStep.Review) {
    push(
      {
        pathname: paths.orderFinalized,
        query: data as ParsedUrlQueryInput,
      },
      /**
       * Passing orderFinalized path as an `as` param makes query data hidden and
       * behaves simillar to history push state.
       */
      paths.orderFinalized
    );
  } else {
    push(steps[activeStepIndex + 1].link);
  }
};
