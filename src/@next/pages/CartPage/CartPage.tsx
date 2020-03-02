import React from "react";

import { Cart } from "@components/templates";
import { CheckoutContext } from "@temp/@sdk/react/components/CheckoutProvider/context";

import { IProps } from "./types";

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { checkout, loading, error } = React.useContext(CheckoutContext);

  return (
    <>
      <Cart loading={loading} error={error} />
    </>
  );
};
