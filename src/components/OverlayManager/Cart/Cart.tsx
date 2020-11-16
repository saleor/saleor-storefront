import * as React from "react";
import { generatePath, useHistory } from "react-router-dom";

import { CartSidebar } from "@components/organisms";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";

import { OverlayContextInterface } from "../..";
import {
  baseUrl,
  cartUrl,
  checkoutLoginUrl,
  checkoutUrl,
} from "../../../app/routes";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const history = useHistory();

  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    items,
    updateItem,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  return (
    <CartSidebar
      show
      updateItem={updateItem}
      removeItem={removeItem}
      hide={overlay.hide}
      items={items}
      subtotalPrice={subtotalPrice}
      shippingTaxedPrice={shippingTaxedPrice}
      promoTaxedPrice={promoTaxedPrice}
      totalPrice={totalPrice}
      continueShopping={() => {
        history.push(baseUrl);
        overlay.hide();
      }}
      goToCart={() => {
        history.push(
          generatePath(cartUrl, {
            token: null,
          })
        );
        overlay.hide();
      }}
      proceedToCheckout={() => {
        history.push(user ? checkoutUrl : checkoutLoginUrl);
        overlay.hide();
      }}
    />
  );
};

export default Cart;
