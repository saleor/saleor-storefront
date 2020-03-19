import React, { useEffect } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button } from "@components/atoms";
import { Cart } from "@components/templates";
import { useCheckout } from "@sdk/react";

import { IProps } from "./types";
import { TaxedMoney } from "../../components/containers";
import { CartRow } from "../../components/organisms/CartRow";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1>My Cart</h1>;

const button = <Button>PROCEED TO CHECKOUT</Button>;

const generateCart = (lines, removeItemFromCart) => {
  return lines.map(line => (
    <CartRow
      name={line.variant.product.name}
      quantity={line.quantity}
      onRemove={() => removeItemFromCart(line.id)}
      onQuantityChange={() =>
        console.log("Change quantity on product with id: ", line.id)
      }
      thumbnail={line.variant.product.thumbnail}
      totalPrice={<TaxedMoney taxedMoney={line.totalPrice} />}
      unitPrice={<TaxedMoney taxedMoney={line.variant.pricing.price} />}
      sku="-"
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {
    removeItemFromCart,
    addItemToCart,
    subtractItemFromCart,
    updateItemInCart,
    checkout,
  } = useCheckout();

  useEffect(() => {
    console.log("CartPage, useEffect", checkout);
  }, [checkout]);

  const productVariants = checkout?.lines;

  return (
    <Cart
      breadcrumbs={cartBreadcrumbs}
      title={title}
      button={button}
      cart={
        productVariants && generateCart(productVariants, removeItemFromCart)
      }
    />
  );
};
