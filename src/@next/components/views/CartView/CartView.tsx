import React from "react";

import { Cart } from "@components/templates";

import { IProps } from "./types";

export const CartView: React.FC<IProps> = ({}: IProps) => {
  return (
    <>
      <Cart />
    </>
  );
};
