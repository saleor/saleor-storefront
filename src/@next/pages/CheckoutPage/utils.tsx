import { Button } from "@components/atoms";
import React from "react";
import { checkoutMessages } from "@temp/intl";
import { IntlShape } from "react-intl";
import { ICheckoutStep, ITaxedMoney } from "@types";
import { CheckoutProgressBar } from "@components/molecules";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { CartSummary } from "@components/organisms";
import { CHECKOUT_STEPS, CheckoutStep } from "@temp/core/config";

export const getStepButton = (
  { formatMessage }: IntlShape,
  nextActionName?: string,
  onClick?: () => void
) => {
  const text = {
    "Continue to Shipping": formatMessage(
      checkoutMessages.addressNextActionName
    ),
    "Continue to Payment": formatMessage(
      checkoutMessages.shippingNextActionName
    ),
    "Continue to Review": formatMessage(checkoutMessages.paymentNextActionName),
    "Place order": formatMessage(checkoutMessages.reviewNextActionName),
  }[nextActionName];

  if (text) {
    return (
      <Button
        testingContext="checkoutPageNextStepButton"
        onClick={onClick}
        type="submit"
      >
        {text.toUpperCase()}
      </Button>
    );
  }
  return null;
};

export const getCheckoutProgress = (
  loaded: boolean,
  activeStepIndex: number,
  steps: ICheckoutStep[]
) =>
  loaded ? (
    <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
  ) : null;

export const prepareCartSummary = (
  totalPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  items?: IItems
) => {
  const products = items?.map(({ id, variant, totalPrice, quantity }) => ({
    id: id || "",
    name: variant.name || "",
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

  return (
    <CartSummary
      shipping={shippingTaxedPrice}
      subtotal={subtotalPrice}
      promoCode={promoTaxedPrice}
      total={totalPrice}
      products={products}
    />
  );
};

export const getStepLink = (recommendedStep?: CheckoutStep) =>
  CHECKOUT_STEPS.find(stepObj => stepObj.step === recommendedStep)?.link ||
  CHECKOUT_STEPS[0].link;

export const isStepCorrect = (
  pathname: string,
  stepFromPath: CheckoutStep | null,
  maxPossibleStep: CheckoutStep,
  isShippingRequiredForProducts: boolean | undefined
) =>
  (pathname !== CHECKOUT_STEPS[4].link &&
    (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))) ||
  (pathname === CHECKOUT_STEPS[1].link && !isShippingRequiredForProducts);
