import React from "react";

import { Cart } from "@components/templates";
import { CartContext } from "@sdk/react/components/CartProvider/context";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { items, setItem, loading, error } = React.useContext(CartContext);

  return (
    <>
      <Cart items={items} setItem={setItem} loading={loading} error={error} />
    </>
  );
};
