import { GraphQLError } from "graphql";
import { isEqual, pullAllBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useLocalStorage } from "@hooks";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { useUpdateCheckoutLine } from "@sdk/react";

import { maybe } from "../../../../core/utils";
import { ApolloErrorWithUserInput } from "../../types";
import { CheckoutContext } from "./context";
import { useCheckoutContextHandlers } from "./contextHandlers";
import { ICartItem, IProps } from "./types";

enum LocalStorageKeys {
  Cart = "cart",
  CheckoutToken = "checkoutToken",
}

export function CheckoutProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const { storedValue: token, setValue: storeToken } = useLocalStorage(
    LocalStorageKeys.CheckoutToken
  );
  const { storedValue: cart, setValue: storeCart } = useLocalStorage(
    LocalStorageKeys.Cart
  );
  const [checkoutData, setCheckoutData] = useState<Checkout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApolloErrorWithUserInput | null>(null);
  const [shippingAsBilling, setShippingAsBilling] = useState(false);

  useEffect(() => {
    if (checkoutData && cart) {
      setCheckoutData({
        ...checkoutData,
        lines: cart,
      });
    }
  }, [checkoutData]);

  const updateCheckout = (checkoutData: Checkout | null) => {
    setCheckoutData(checkoutData);
    storeToken(checkoutData?.token);
    storeCart(checkoutData?.lines);
  };

  const contextHandlers = useCheckoutContextHandlers({
    checkout: checkoutData,
    updateCheckout,
    updateError: setError,
    updateLoading: setLoading,
  });

  const getContext = () => ({
    checkout: checkoutData,
    contextHandlers,
    error: null,
    loading: false,
    shippingAsBilling,
  });

  return (
    <CheckoutContext.Provider value={getContext()}>
      {children}
    </CheckoutContext.Provider>
  );
}
