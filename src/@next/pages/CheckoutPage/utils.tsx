import React from "react";
import { FormattedMessage } from "react-intl";
import { NextRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

import type { CartSummaryProps } from "@components/organisms";
import type { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { checkoutMessages } from "@temp/intl";
import {
  CheckoutStep,
  CheckoutStepDefinition,
  CHECKOUT_STEPS,
} from "@temp/core/config";
import { checkIfShippingRequiredForProducts } from "@utils/core";
import { paths } from "@paths";

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

export const getContinueButtonText = (
  step: CheckoutStep
): JSX.Element | undefined =>
  ({
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
  }[step]);

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
