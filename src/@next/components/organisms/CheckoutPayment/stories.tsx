import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutPayment } from ".";
import { PROPS } from "./fixtures";

let portalRoot = document.getElementById("modal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(portalRoot);
}

const addPromoCode = action("addPromoCode has been called");
const removeVoucherCode = action("removeVoucherCode has been called");
const submitUnchangedDiscount = action(
  "submitUnchangedDiscount has been called"
);

storiesOf("@components/organisms/CheckoutPayment", module)
  .addParameters({ component: CheckoutPayment })
  .add("default", () => (
    <IntlProvider locale="en">
      <CheckoutPayment
        {...PROPS}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
      />
    </IntlProvider>
  ));
