import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";

import { CartSidebar } from ".";
import {
  ITEMS,
  PROMO_PRICE,
  SHIPPING_PRICE,
  SUBTOTAL_PRICE,
  TOTAL_PRICE,
} from "./fixtures";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/CartSidebar", module)
  .addParameters({ component: CartSidebar })
  .addDecorator(story => (
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
    </IntlProvider>
  ))
  .add("default", () => (
    <CartSidebar
      title="MY CART"
      items={ITEMS}
      removeItem={action("remove item")}
      updateItem={action("update item")}
      totalPrice={TOTAL_PRICE}
      subtotalPrice={SUBTOTAL_PRICE}
      shippingTaxedPrice={SHIPPING_PRICE}
      promoTaxedPrice={PROMO_PRICE}
      target={portalRoot}
      show
      hide={action("hide")}
    />
  ));
