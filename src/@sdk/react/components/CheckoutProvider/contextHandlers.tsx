import React, { useEffect } from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";

import { useUpdateCheckoutLine } from "../..";
import { ApolloErrorWithUserInput } from "../../types";
import { CheckoutContext, ICheckoutContext } from "./context";
import { ICartItem } from "./types";

interface IContextHandlersParams {
  checkout: Checkout | null;
  updateCheckout: (checkout: Checkout | null) => void;
  updateLoading: (loading: boolean) => void;
  updateError: (error: ApolloErrorWithUserInput | null) => void;
}

export const useCheckoutContextHandlers = ({
  checkout,
  updateCheckout,
  updateLoading,
  updateError,
}: IContextHandlersParams) => {
  const [
    setUpdateCheckoutLine,
    { data: updateData, loading: loadingData, error: errorData },
  ] = useUpdateCheckoutLine();

  useEffect(() => {
    const updatedCheckout = updateData?.checkout;

    if (updatedCheckout) {
      updateCheckout(updatedCheckout);
    }
  }, [updateData]);

  useEffect(() => {
    updateLoading(loadingData);
  }, [updateLoading]);

  useEffect(() => {
    updateError(errorData);
  }, [errorData]);

  const setCartItems = (cartItems: ICartItem[]) => {
    const checkoutId = checkout?.id;

    if (checkoutId) {
      setUpdateCheckoutLine({
        checkoutId,
        lines: cartItems,
      });
    }
  };

  return {
    setCartItems,
  };
};
