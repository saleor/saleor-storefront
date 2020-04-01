import React from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button, CartFooter, CartHeader } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartRow } from "@components/organisms";
import { Cart } from "@components/templates";
import { IItems, ISubtotalPrice, ITotalPrice } from "@sdk/api/Cart/types";
import { useCart } from "@sdk/react";

import { IProps } from "./types";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1>My Cart</h1>;

const button = <Button>PROCEED TO CHECKOUT</Button>;

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice: ITotalPrice,
  subtotalPrice: ISubtotalPrice
) => (
  <CartFooter
    subtotalPrice={<TaxedMoney taxedMoney={totalPrice || undefined} />}
    totalPrice={<TaxedMoney taxedMoney={subtotalPrice || undefined} />}
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  // const sum = items?.reduce((prevVal, currVal, currIdx, arr) => prevVal + currVal.totalPrice?.gross.amount, 0)
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
      attributes={variant.attributes?.map(attribute => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || "",
          },
          values: attribute.values.map(value => {
            return {
              id: value?.id,
              name: value?.name || "",
              value: value?.value,
            };
          }),
        };
      })}
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const {
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
  } = useCart();

  // React.useEffect(() => {
  // console.log("CartPage, useEffect checkout", checkout);
  // console.log("CartPage, useEffect items", items);
  // }, [checkout]);

  return (
    <Cart
      breadcrumbs={cartBreadcrumbs}
      title={title}
      button={button}
      cartHeader={cartHeader}
      cartFooter={prepareCartFooter(totalPrice, subtotalPrice)}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  );
};