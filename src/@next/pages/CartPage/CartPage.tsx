import React, { useEffect } from "react";

import { Cart } from "@components/templates";
import { useCheckout } from "@sdk/react";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {
    checkout,
    load,
    loading,
    error,
    updateItemInCart,
    removeItemFromCart,
  } = useCheckout();

  // TEST
  // console.log("CartPage", checkout);

  useEffect(() => {
    if (!checkout) {
      load();
    }
  }, []);

  const checkoutItems = checkout?.lines
    ? checkout?.lines?.map(item => ({
        quantity: item!.quantity,
        variantId: item!.id,
      }))
    : [];

  return (
    <>
      <Cart
        items={checkoutItems}
        updateItem={updateItemInCart}
        removeItem={removeItemFromCart}
        loading={loading}
        error={error}
      />
    </>
  );
};
