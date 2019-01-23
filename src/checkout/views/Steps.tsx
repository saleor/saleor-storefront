import * as React from "react";
import { Link } from "react-router-dom";

import { CheckoutStep } from "../context";
import { billingUrl, shippingAddressUrl, shippingOptionsUrl } from "../routes";

const Steps: React.FC<{ currentStep: CheckoutStep }> = ({
  currentStep,
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
  const currentStepIndex = steps.findIndex(({ step }) => step === currentStep);
  return (
    <>
      {steps.map(({ header, step, link }, index) => (
        <React.Fragment key={step}>
          {currentStepIndex > index ? (
            <Link to={link}>
              <div className="checkout__step checkout__step--inactive">
                <span>{index + 1}</span>
                <h4 className="checkout__header">{header}</h4>
              </div>
            </Link>
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
