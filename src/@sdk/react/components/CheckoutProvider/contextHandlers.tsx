import { useEffect } from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";

import { useUpdateCheckoutLine } from "../..";
import { ApolloErrorWithUserInput } from "../../types";
import { ICheckoutContextStateHandlers } from "./context";
import { ICartItem } from "./types";

interface IContextStateHandlersParams {
  checkout: Checkout | null;
  updateCheckout: (checkout: Checkout | null) => void;
  updateLoading: (loading: boolean) => void;
  updateError: (error: ApolloErrorWithUserInput | null) => void;
  updateShippingAsBilling: (shippingAsBilling: boolean) => void;
}

export const useCheckoutContextStateHandlers = ({
  checkout,
  updateCheckout,
  updateLoading,
  updateError,
  updateShippingAsBilling,
}: IContextStateHandlersParams): ICheckoutContextStateHandlers => {
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

  const setShippingAsBilling = (shippingAsBilling: boolean) => {
    updateShippingAsBilling(shippingAsBilling);
  };

  return {
    setCartItems,
    setShippingAsBilling,
  };
};
