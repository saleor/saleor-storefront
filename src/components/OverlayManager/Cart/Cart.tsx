import * as React from "react";
import { useRouter } from "next/router";

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
  const { push } = useRouter();
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
        push(baseUrl);
        overlay.hide();
      }}
      goToCart={() => {
        push(cartUrl);
        overlay.hide();
      }}
      proceedToCheckout={() => {
        push(user ? checkoutUrl : checkoutLoginUrl);
        overlay.hide();
      }}
    />
  );
};

export default Cart;
