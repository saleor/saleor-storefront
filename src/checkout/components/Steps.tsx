import * as React from "react";
import { styled } from '@styles';

import { useVariantsProducts } from "@sdk/react";

import { VariantsProducts_productVariants } from "@sdk/queries/types/VariantsProducts";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutStep } from "../context";
import { billingUrl, shippingAddressUrl, shippingOptionsUrl, contactUrl } from "../routes";
import { Checkout } from "../types/Checkout";

const steps = [
  {
    header: "Contact Details",
    path: contactUrl,
    step: CheckoutStep.Contact,
    type: 'contact',
  },
  {
    header: "Shipping Address",
    path: shippingAddressUrl,
    step: CheckoutStep.ShippingAddress,
    type: "shipping",
  },
  {
    header: "Shipping Method",
    path: shippingOptionsUrl,
    step: CheckoutStep.ShippingOption,
    type: "shipping",
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

const getAvailableSteps = (
  checkout: Checkout,
  variantsProducts: VariantsProducts_productVariants
) => {
  if (checkout && checkout.isShippingRequired) {
    return steps;
  } else if (checkout) {
    return steps.filter(({ type }) => type !== "shipping");
  } else if (variantsProducts) {
    const isShippingRequired =
      variantsProducts.edges &&
      variantsProducts.edges.some(
        ({ node }) => node.product.productType.isShippingRequired
      );
    if (isShippingRequired) {
      return steps;
    }
    return steps.filter(({ type }) => type !== "shipping");
  }
  return steps;
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

  const availableSteps = getAvailableSteps(checkout, variantsProducts);

  return (
    <>
      {availableSteps.map(({ header, step, path }, index) => (
        <React.Fragment key={step}>
          {currentStep === step && (
            <>
              <div className="checkout__step">
                <H4>{header}</H4>
              </div>
              <div className="checkout__content">{children}</div>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const H4 = styled.h4`
  color: #af9a50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export default Steps;
