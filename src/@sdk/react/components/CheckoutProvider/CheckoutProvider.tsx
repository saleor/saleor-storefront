import { GraphQLError } from "graphql";
import { isEqual, pullAllBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useLocalStorage } from "@hooks";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { useUpdateCheckoutLine } from "@sdk/react";

import { maybe } from "../../../../core/utils";
import { ApolloErrorWithUserInput } from "../../types";
import { CheckoutContext, CartLine, CartItem } from "./context";
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

  const { storedValue: token, setValue: setCheckoutToken } = useLocalStorage(
    LocalStorageKeys.CheckoutToken
  );
  const { storedValue: cart, setValue: setCart } = useLocalStorage(
    LocalStorageKeys.Cart
  );
  const [checkoutData, setCheckoutData] = useState<Checkout | null>(null);
  const [shippingAsBilling, setShippingAsBilling] = useState(false);

  const update = (checkoutData: Checkout) => {
    setCheckoutData(checkoutData);
    setCheckoutToken(checkoutData.token);
  };

  useEffect(() => {
    const updatedCheckout = updateData?.checkout;

    if (updatedCheckout) {
      setCheckoutData((checkoutData: Checkout) => ({
        ...checkoutData,
        ...updatedCheckout,
      }));
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
  });

  return (
    <CheckoutContext.Provider value={getContext()}>
      {children}
    </CheckoutContext.Provider>
  );
}
