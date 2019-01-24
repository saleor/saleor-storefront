import * as React from "react";
import { generatePath, Link } from "react-router-dom";

import { AddressSummary, ShippingOptionSummary } from ".";
import { CheckoutStep } from "../context";
import {
  billingUrl,
  paymentUrl,
  reviewUrl,
  shippingAddressUrl,
  shippingOptionsUrl
} from "../routes";
import { Checkout } from "../types/Checkout";

const getCurrentStep = (path: string, token: string): CheckoutStep => {
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
      return CheckoutStep.ShippingAddress;
  }
};

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

    case CheckoutStep.ShippingOption:
      summary = (
        <ShippingOptionSummary shippingMethod={checkout.shippingMethod} />
      );
  }

  return summary ? <div className="checkout__content">{summary}</div> : null;
};

const Steps: React.FC<{ path: string; token: string; checkout?: Checkout }> = ({
  checkout,
  path,
  token,
  children
}) => {
  const steps = [
    {
      header: "Shipping Address",
      link: shippingAddressUrl,
      step: CheckoutStep.ShippingAddress
    },
    {
      header: "Shipping Method",
      link: shippingOptionsUrl,
      step: CheckoutStep.ShippingOption
    },
    {
      header: "Billing Method",
      link: billingUrl,
      step: CheckoutStep.BillingAddress
    },
    { header: "Payment Method", step: CheckoutStep.Payment }
  ];
  const currentStep = getCurrentStep(path, token);
  const currentStepIndex = steps.findIndex(({ step }) => step === currentStep);

  return (
    <>
      {steps.map(({ header, step, link }, index) => (
        <React.Fragment key={step}>
          {currentStepIndex > index ? (
            <>
              <Link to={generatePath(link, { token })}>
                <div className="checkout__step checkout__step--inactive">
                  <span>{index + 1}</span>
                  <h4 className="checkout__header">{header}</h4>
                </div>
              </Link>
              {getSummary(step, checkout)}
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
