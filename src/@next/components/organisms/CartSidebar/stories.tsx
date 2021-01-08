import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartSidebar } from "./CartSidebar";
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

const removeItem = action("remove item");
const updateItem = action("update item");
const hide = action("hide");
const continueShopping = action("continue shopping");
const goToCart = action("go to cart");
const proceedToCheckout = action("proceed to checkout");

storiesOf("@components/organisms/CartSidebar", module)
  .addParameters({ component: CartSidebar })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <CartSidebar
      items={ITEMS}
      removeItem={removeItem}
      updateItem={updateItem}
      totalPrice={TOTAL_PRICE}
      subtotalPrice={SUBTOTAL_PRICE}
      shippingTaxedPrice={SHIPPING_PRICE}
      promoTaxedPrice={PROMO_PRICE}
      target={portalRoot}
      show
      hide={hide}
      continueShopping={continueShopping}
      goToCart={goToCart}
      proceedToCheckout={proceedToCheckout}
    />
  ))
  .add("empty", () => (
    <CartSidebar
      items={[]}
      removeItem={removeItem}
      updateItem={updateItem}
      totalPrice={TOTAL_PRICE}
      subtotalPrice={SUBTOTAL_PRICE}
      shippingTaxedPrice={SHIPPING_PRICE}
      promoTaxedPrice={PROMO_PRICE}
      target={portalRoot}
      show
      hide={hide}
      continueShopping={continueShopping}
      goToCart={goToCart}
      proceedToCheckout={proceedToCheckout}
    />
  ));
