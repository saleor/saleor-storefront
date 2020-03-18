import React from "react";

import { Checkout } from "@components/templates";
import { useCheckout } from "@sdk/react";

import { IProps } from "./types";

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  return <Checkout />;
};

export { CheckoutPage };
