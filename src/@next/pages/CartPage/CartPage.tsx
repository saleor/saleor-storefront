import React from "react";

import { Cart } from "@components/templates";
import { useCheckout } from "@sdk/react";
// import { CheckoutContext } from "@sdk/react/components/CheckoutProvider/context";

// import { ICartItem } from "../../components/templates/Cart/types";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  // const {
  //   state: { checkout },
  //   stateHandlers: { setCartItems },
  //   loading,
  //   error,
  // } = React.useContext(CheckoutContext);

  const {
    checkout,
    loading,
    error,
    updateItemInCart,
    removeItemFromCart,
  } = useCheckout();

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
