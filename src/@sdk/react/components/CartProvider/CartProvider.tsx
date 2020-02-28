import { GraphQLError } from "graphql";
import { isEqual, pullAllBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useUpdateCheckoutLine } from "@sdk/react";

import { maybe } from "../../../../core/utils";
import { ApolloErrorWithUserInput } from "../../types";
import { CartContext, CartLine } from "./context";
import { IProps } from "./types";

// enum LocalStorageKeys {
//   Cart = "cart",
// }

export function CartProvider({
  children,
  initialLines,
}: IProps): React.ReactElement<IProps> {
  /**
   * THIS IS INSANE, syncUserCheckout, syncWithCart, syncCheckoutFromCart... what else
   */

  // const [lines, setLines] = useState<CartLine[]>(initialLines);

  // const [
  //   setUpdateCheckoutLine,
  //   { data: updateData, loading: updateLoading, error: updateError },
  // ] = useUpdateCheckoutLine();

  // useEffect(() => {
  //   setLines(initialLines);
  // }, [initialLines]);

  // useEffect(() => {
  //   const newLines = updateData?.checkout?.lines;
  //   const updatedLines = newLines?.filter((line) => !!line?.quantity);

  //   setLines(updateData?.checkout?.lines || []);
  // }, [updateData]);

  // const getLine = (variantId: string): CartLine | undefined =>
  //   lines.find((line: CartLine) => line.variantId === variantId);

  // const changeQuantity = async (lines: CartLine[]) => {
  //   const checkoutID = checkout?.checkout?.id;
  //   let apiErrors = null;

  //   if (checkoutID) {
  //     const result = await setUpdateCheckoutLine({
  //       checkoutId: checkoutID,
  //       lines,
  //     });
  //     const updatedCheckout = updateData?.checkout;
  //     apiErrors = updateError && updateError?.graphQLErrors;

  //     if (!apiErrors) {
  //       if (checkout && checkout.update && updatedCheckout) {
  //         checkout.update({
  //           checkout: {
  //             ...checkout.checkout,
  //             isShippingRequired: updatedCheckout.isShippingRequired,
  //             lines: updatedCheckout.lines,
  //             subtotalPrice: updatedCheckout.subtotalPrice,
  //             totalPrice: updatedCheckout.totalPrice,
  //           },
  //         });
  //       }
  //     }
  //   }

  //   if (!apiErrors) {
  //     setLines(prevLines => {
  //       const updatedLines = [
  //         ...pullAllBy(prevLines, lines, "variantId"),
  //         ...lines,
  //       ].filter(({ quantity }) => !!quantity);
  //       localStorage.setItem("cart", JSON.stringify(updatedLines));
  //       return updatedLines;
  //     });
  //   }
  // };

  // const add = (variantId: string, quantity = 1) => {
  //   const line = getLine(variantId);
  //   const newQuantity = line ? line.quantity + quantity : quantity;
  //   changeQuantity([{ variantId, quantity: newQuantity }]);
  // };

  // const subtract = (variantId: string, quantity = 1) => {
  //   const line = getLine(variantId);
  //   const newQuantity = line ? line.quantity - quantity : quantity;
  //   changeQuantity([{ variantId, quantity: newQuantity }]);
  // };

  // const clear = () => {
  //   const checkoutId = checkout?.checkout?.id;

  //   if (checkoutId) {
  //     setUpdateCheckoutLine({
  //       checkoutId,
  //       lines: [],
  //     });
  //   }

  //   localStorage.removeItem(LocalStorageKeys.Cart);
  // };

  // const getQuantity = () =>
  //   lines.reduce((sum: number, line: CartLine) => sum + line.quantity, 0);

  // const setLine = (variantId: string, quantity = 1) => {
  //   const checkoutId = checkout?.checkout?.id;

  //   if (checkoutId) {
  //     setUpdateCheckoutLine({
  //       checkoutId,
  //       lines,
  //     });
  //   }
  // };

  const getContext = () => ({
    // errors: updateError,
    // lines,
    // loading: updateLoading || checkout.loading,
    // setLine,
  });

  return (
    <CartContext.Provider value={getContext()}>{children}</CartContext.Provider>
  );
}
