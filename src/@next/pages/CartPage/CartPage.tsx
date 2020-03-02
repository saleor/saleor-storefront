import React, { useEffect } from "react";

import { Cart } from "@components/templates";
import { useUpdateCheckoutLine } from "@sdk/react";
import { CheckoutContext } from "@sdk/react/components/CheckoutProvider/context";

import { ICartItem } from "../../components/templates/Cart/types";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { checkout, update, loading, error } = React.useContext(
    CheckoutContext
  );

  const [
    setUpdateCheckoutLine,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateCheckoutLine();

  useEffect(() => {
    const updatedCheckout = updateData?.checkout;

    if (updatedCheckout) {
      update(updatedCheckout);
    }
  }, [updateData]);

  const checkoutItems = checkout?.lines
    ? checkout?.lines?.map(item => ({
        quantity: item!.quantity,
        variantId: item!.id,
      }))
    : [];

  const handleUpdateItem = (cartItem: ICartItem) => {
    const checkoutId = checkout?.id;

    if (checkoutId) {
      setUpdateCheckoutLine({
        checkoutId,
        lines: [cartItem],
      });
    }
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
