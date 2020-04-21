import { History } from "history";
import React from "react";
import { useHistory } from "react-router-dom";

import Breadcrumbs from "../../../components/Breadcrumbs";

import { Button, CartFooter, CartHeader } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartRow } from "@components/organisms";
import { Cart } from "@components/templates";
import { IItems, ISubtotalPrice, ITotalPrice } from "@sdk/api/Cart/types";
import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { useCart, useUserDetails } from "@sdk/react";
import { checkoutLoginUrl, checkoutUrl } from "@temp/app/routes";

import { IProps } from "./types";

const cartBreadcrumbs = (
  <Breadcrumbs breadcrumbs={[{ value: "Cart", link: "/cart/" }]} />
);

const title = <h1 data-cy="cartPageTitle">My Cart</h1>;

const getButton = (history: History, user: UserDetails_me | null) => (
  <Button
    data-cy="cartPageBtnProceedToCheckout"
    onClick={() => history.push(user ? checkoutUrl : checkoutLoginUrl)}
  >
    PROCEED TO CHECKOUT
  </Button>
);

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice: ITotalPrice,
  subtotalPrice: ISubtotalPrice
) => (
  <CartFooter
    subtotalPrice={
      <TaxedMoney data-cy="cartPageSubtotalPrice" taxedMoney={subtotalPrice} />
    }
    totalPrice={
      <TaxedMoney data-cy="cartPageTotalPrice" taxedMoney={totalPrice} />
    }
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <CartRow
      key={id}
      index={index}
      name={variant?.product?.name || ""}
      maxQuantity={variant.stockQuantity || quantity}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={quantity => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={
        <TaxedMoney
          data-cy={`cartPageItem${index}TotalPrice`}
          taxedMoney={totalPrice}
        />
      }
      unitPrice={
        <TaxedMoney
          data-cy={`cartPageItem${index}UnitPrice`}
          taxedMoney={variant?.pricing?.price}
        />
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
  const history = useHistory();
  const { data: user } = useUserDetails();
  const {
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
  } = useCart();

  return (
    <Cart
      breadcrumbs={cartBreadcrumbs}
      title={title}
      button={getButton(history, user)}
      cartHeader={cartHeader}
      cartFooter={prepareCartFooter(totalPrice, subtotalPrice)}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  );
};
