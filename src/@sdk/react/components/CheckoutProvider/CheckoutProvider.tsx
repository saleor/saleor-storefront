import { GraphQLError } from "graphql";
import { isEqual, pullAllBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useLocalStorage } from "@hooks";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { useUpdateCheckoutLine } from "@sdk/react";

import { maybe } from "../../../../core/utils";
import { ApolloErrorWithUserInput } from "../../types";
import { CartItem, CartLine, CheckoutContext } from "./context";
import { IProps } from "./types";

enum LocalStorageKeys {
  Cart = "cart",
  CheckoutToken = "checkoutToken",
}

export function CheckoutProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const [
    setUpdateCheckoutLine,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateCheckoutLine();

  const { storedValue: token, setValue: storeToken } = useLocalStorage(
    LocalStorageKeys.CheckoutToken
  );
  const { storedValue: cart, setValue: storeCart } = useLocalStorage(
    LocalStorageKeys.Cart
  );
  const [checkoutData, setCheckoutData] = useState<Checkout | null>(null);
  const [shippingAsBilling, setShippingAsBilling] = useState(false);

  const update = (checkoutData: Checkout) => {
    setCheckoutData(checkoutData);
    storeToken(checkoutData.token);
    storeCart(checkoutData.lines);
  };

  useEffect(() => {
    const updatedCheckout = updateData?.checkout;

    if (updatedCheckout) {
      setCheckoutData(updatedCheckout);
    }
  }, [updateData]);

  // const setItem = (item: CartItem) => {
  //   const checkoutId = checkoutContext?.checkout?.id;

  //   if (checkoutId) {
  //     setUpdateCheckoutLine({
  //       checkoutId,
  //       lines: [item],
  //     });
  //   }
  // };

  const getContext = () => ({
    checkout: checkoutData,
    error: updateError,
    loading: updateLoading,
    shippingAsBilling,
    update,
  });

  return (
    <CheckoutContext.Provider value={getContext()}>
      {children}
    </CheckoutContext.Provider>
  );
}
