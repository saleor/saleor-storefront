import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutPayment } from ".";
import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

let portalRoot = document.getElementById("modal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(portalRoot);
}

const setBillingAddress = action("setBillingAddress has been called");
const setBillingAsShippingAddress = action(
  "setBillingAsShippingAddress has been called"
);
const addPromoCode = action("addPromoCode has been called");
const removeVoucherCode = action("removeVoucherCode has been called");
const submitUnchangedDiscount = action(
  "submitUnchangedDiscount has been called"
);
const selectPaymentGateway = action("selectPaymentGateway has been called");
const processPayment = action("processPayment has been called");
const onGatewayError = action("onGatewayError has been called");

storiesOf("@components/organisms/CheckoutPayment", module)
  .addParameters({ component: CheckoutPayment })
  .add("default", () => (
    <IntlProvider locale="en">
      <CheckoutPayment
        {...ANONYMOUS_USER_PROPS}
        setBillingAddress={setBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingAddress}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
        selectPaymentGateway={selectPaymentGateway}
        processPayment={processPayment}
        onGatewayError={onGatewayError}
      />
    </IntlProvider>
  ))
  .add("with addresses", () => (
    <IntlProvider locale="en">
      <CheckoutPayment
        {...LOGGED_IN_USER_PROPS}
        setBillingAddress={setBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingAddress}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
        selectPaymentGateway={selectPaymentGateway}
        processPayment={processPayment}
        onGatewayError={onGatewayError}
      />
    </IntlProvider>
  ));
