import React, { useEffect } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button } from "@components/atoms";
import { Cart } from "@components/templates";
import { useCart, useCheckout } from "@sdk/react";

import { TaxedMoney } from "../../components/containers";
import { CartRow } from "../../components/organisms/CartRow";
import { IProps } from "./types";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1>My Cart</h1>;

const button = <Button>PROCEED TO CHECKOUT</Button>;

const generateCart = (lines, removeItemFromCart, updateItemInCart) => {
  return lines.map(line => (
    <CartRow
      name={line.variant.product.name}
      quantity={line.quantity}
      onRemove={() => removeItemFromCart(line.variant.id)}
      onQuantityChange={quantity => updateItemInCart(line.variant.id, quantity)}
      thumbnail={line.variant.product.thumbnail}
      totalPrice={<TaxedMoney taxedMoney={line.totalPrice} />}
      unitPrice={<TaxedMoney taxedMoney={line.variant.pricing.price} />}
      sku={line.variant.sku}
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { checkout } = useCheckout();
  const { removeItem, updateItem, items } = useCart();

  useEffect(() => {
    console.log("CartPage, useEffect checkout", checkout);
    console.log("CartPage, useEffect items", items);
  }, [checkout]);

  return (
    <Cart
      breadcrumbs={cartBreadcrumbs}
      title={title}
      button={button}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  );
};
