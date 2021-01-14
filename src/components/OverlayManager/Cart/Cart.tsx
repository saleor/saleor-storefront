import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import * as React from "react";

import { CartSidebar } from "@components/organisms";
import { paths } from "@paths";

import { OverlayContextInterface } from "../..";

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
        push(paths.home);
        overlay.hide();
      }}
      goToCart={() => {
        push(paths.cart);
        overlay.hide();
      }}
      proceedToCheckout={() => {
        push(user ? paths.checkout : paths.login);
        overlay.hide();
      }}
    />
  );
};

export default Cart;
