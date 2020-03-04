import React, { useState } from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";

import { ApolloErrorWithUserInput } from "../../types";
import {
  CheckoutContext,
  ICheckoutContext,
  ICheckoutContextState,
  ICheckoutContextStateHandlers,
} from "./context";
import { useCheckoutContextStateHandlers } from "./contextHandlers";
import { IProps } from "./types";

export function CheckoutProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const [checkoutData, setCheckoutData] = useState<Checkout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApolloErrorWithUserInput | null>(null);
  const [shippingAsBilling, updateShippingAsBilling] = useState(false);

  const updateCheckout = (checkoutData: Checkout | null) => {
    setCheckoutData(checkoutData);
  };

  const state: ICheckoutContextState = {
    checkout: checkoutData,
    shippingAsBilling,
  };
  const stateHandlers: ICheckoutContextStateHandlers = useCheckoutContextStateHandlers(
    {
      checkout: checkoutData,
      updateCheckout,
      updateError: setError,
      updateLoading: setLoading,
      updateShippingAsBilling,
    }
  );
  const getContext: ICheckoutContext = {
    error,
    loading,
    state,
    stateHandlers,
  };

  return (
    <CheckoutContext.Provider value={getContext}>
      {children}
    </CheckoutContext.Provider>
  );
}
