import React from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button } from "@components/atoms";
import { Cart } from "@components/templates";
import { useCheckout } from "@sdk/react";

import { IProps } from "./types";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1>My Cart</h1>;

const button = <Button>PROCEED TO CHECKOUT</Button>;

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {
    removeItemFromCart,
    addItemToCart,
    subtractItemFromCart,
    updateItemInCart,
    checkout,
  } = useCheckout();

  const productVariants = checkout?.lines;

  return <Cart breadcrumbs={cartBreadcrumbs} title={title} button={button} />;
};
