import { GraphQLError } from "graphql";
import { isEqual, pullAllBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useUpdateCheckoutLine } from "@sdk/react";

import { maybe } from "../../../../core/utils";
import { ApolloErrorWithUserInput } from "../../types";
import { CartContext, CartLine, CartItem } from "./context";
import { IProps } from "./types";

// enum LocalStorageKeys {
//   Cart = "cart",
// }

export function CartProvider({
  children,
  checkoutContext,
}: IProps): React.ReactElement<IProps> {
  const [
    setUpdateCheckoutLine,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateCheckoutLine();

  useEffect(() => {
    const updatedCheckout = updateData?.checkout;

    if (
      checkoutContext &&
      checkoutContext.update &&
      checkoutContext.checkout &&
      updatedCheckout
    ) {
      checkoutContext.update({
        checkout: {
          ...checkoutContext.checkout,
          isShippingRequired: updatedCheckout.isShippingRequired,
          lines: updatedCheckout.lines,
          subtotalPrice: updatedCheckout.subtotalPrice,
          totalPrice: updatedCheckout.totalPrice,
        },
      });
    }
  }, [updateData]);

  const setItem = (item: CartItem) => {
    const checkoutId = checkoutContext?.checkout?.id;

    if (checkoutId) {
      setUpdateCheckoutLine({
        checkoutId,
        lines: [item],
      });
    }
  };

  const getContext = () => ({
    error: updateError,
    items: checkoutContext.checkout?.lines || [],
    loading: updateLoading || checkoutContext.loading,
    setItem,
  });

  return (
    <CartContext.Provider value={getContext()}>{children}</CartContext.Provider>
  );
}
