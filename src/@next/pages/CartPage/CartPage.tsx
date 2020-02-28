import React from "react";

import { Cart } from "@components/templates";
import { CartContext } from "@sdk/react/components/CartProvider/context";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {} = React.useContext(CartContext);

  return (
    <>
      <Cart />
    </>
  );
};
