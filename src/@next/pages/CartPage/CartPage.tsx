import React from "react";

import { Cart } from "@components/templates";
import { CheckoutContext } from "@sdk/react/components/CheckoutProvider/context";

import { ICartItem } from "../../components/templates/Cart/types";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {
    state: { checkout },
    stateHandlers: { setCartItems },
    loading,
    error,
  } = React.useContext(CheckoutContext);

  const checkoutItems = checkout?.lines
    ? checkout?.lines?.map(item => ({
        quantity: item!.quantity,
        variantId: item!.id,
      }))
    : [];

  const handleUpdateItem = (cartItem: ICartItem) => {
    setCartItems([cartItem]);
  };

  return (
    <>
      <Cart
        items={checkoutItems}
        updateItem={handleUpdateItem}
        loading={loading}
        error={error}
      />
    </>
  );
};
