import * as React from "react";
import { generatePath, Link } from "react-router-dom";

import { useVariantsProducts } from "@sdk/react";

import { ShippingOptionSummary } from ".";
import { AddressSummary } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutStep } from "../context";
import { billingUrl, shippingAddressUrl, shippingOptionsUrl } from "../routes";
import { Checkout } from "../types/Checkout";

const getSummary = (
  step: CheckoutStep,
  checkout: Checkout
): React.ReactNode => {
  let summary;

  switch (step) {
    case CheckoutStep.ShippingAddress:
      summary = (
        <AddressSummary
          email={checkout.email}
          address={checkout.shippingAddress}
        />
      );
      break;

    case CheckoutStep.BillingAddress:
      summary = (
        <AddressSummary
          email={checkout.email}
          address={checkout.billingAddress}
        />
      );
      break;

    case CheckoutStep.ShippingOption:
      summary = checkout.shippingMethod && (
        <ShippingOptionSummary shippingMethod={checkout.shippingMethod} />
      );
  }

  return summary ? <div className="checkout__content">{summary}</div> : null;
};

const Steps: React.FC<{
  step: CheckoutStep;
  token?: string;
  checkout?: Checkout;
}> = ({ checkout, step: currentStep, token, children }) => {
  const { lines: cardLines } = React.useContext(CartContext);
  const { data: variantsProducts } = useVariantsProducts({
    ids: cardLines ? cardLines.map(line => line.variantId) : [],
  });

  const steps = [
    {
      header: "Shipping Address",
      path: shippingAddressUrl,
      shippingContent: true,
      step: CheckoutStep.ShippingAddress,
    },
    {
      header: "Shipping Method",
      path: shippingOptionsUrl,
      shippingContent: true,
      step: CheckoutStep.ShippingOption,
    },
    {
      header: "Billing Address",
      path: billingUrl,
      step: CheckoutStep.BillingAddress,
    },
    {
      header: "Payment Method",
      step: CheckoutStep.Payment,
    },
  ];

  const getAvailableSteps = () => {
    if (checkout && checkout.isShippingRequired) {
      return steps;
    } else if (checkout) {
      return steps.filter(({ shippingContent }) => !shippingContent);
    } else if (variantsProducts) {
      const isShippingRequired =
        variantsProducts.edges &&
        variantsProducts.edges.some(
          ({ node }) => node.product.productType.isShippingRequired
        );
      if (isShippingRequired) {
        return steps;
      }
      return steps.filter(({ shippingContent }) => !shippingContent);
    }
    return steps;
  };

  const availableSteps = getAvailableSteps();

  const currentStepIndex = availableSteps.findIndex(
    ({ step }) => step === currentStep
  );

  return (
    <>
      {availableSteps.map(({ header, step, path }, index) => (
        <React.Fragment key={step}>
          {currentStepIndex > index ? (
            <>
              <Link
                to={generatePath(path, {
                  token,
                })}
              >
                <div className="checkout__step checkout__step--inactive">
                  <span>{index + 1}</span>
                  <h4 className="checkout__header">{header}</h4>
                </div>
              </Link>
              {checkout && getSummary(step, checkout)}
            </>
          ) : (
            <div className="checkout__step">
              <span>{index + 1}</span>
              <h4 className="checkout__header">{header}</h4>
            </div>
          )}
          {currentStep === step && (
            <div className="checkout__content">{children}</div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Steps;
