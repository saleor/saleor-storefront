import React from "react";

import { Cart } from "@components/templates";
import { CheckoutContext } from "@temp/@sdk/react/components/CheckoutProvider/context";

import { ICartItem } from "../../components/templates/Cart/types";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { checkout, update, loading, error } = React.useContext(
    CheckoutContext
  );

  const checkoutItems = checkout?.lines
    ? checkout?.lines?.map(item => ({
        productVariantId: item!.id,
        quantity: item!.quantity,
      }))
    : [];

  const handleUpdateItem = (cartItem: ICartItem) => {
    update(
      checkout
      // lines: ,
    );
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
