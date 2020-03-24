import React, { useEffect } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button } from "@components/atoms";
import { Cart } from "@components/templates";
import { IItems } from "@sdk/api/Cart/types";
import { useCart, useCheckout } from "@sdk/react";

import { TaxedMoney } from "../../components/containers";
import { CartRow } from "../../components/organisms/CartRow";
import { IProps } from "./types";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1>My Cart</h1>;

const button = <Button>PROCEED TO CHECKOUT</Button>;

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }) => (
    <CartRow
      key={id}
      name={variant?.product?.name || ""}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={quantity => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={<TaxedMoney taxedMoney={totalPrice || undefined} />}
      unitPrice={
        <TaxedMoney taxedMoney={variant?.pricing?.price || undefined} />
      }
      sku={variant.sku}
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const { checkout } = useCheckout();
  const { removeItem, updateItem, items } = useCart();

  // useEffect(() => {
  // console.log("CartPage, useEffect checkout", checkout);
  // console.log("CartPage, useEffect items", items);
  // }, [checkout]);

  return (
    <Cart
      breadcrumbs={cartBreadcrumbs}
      title={title}
      button={button}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  );
};
