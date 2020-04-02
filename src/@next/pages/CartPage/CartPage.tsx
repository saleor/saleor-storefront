import { History } from "history";
import React from "react";
import { useHistory } from "react-router-dom";

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

const title = <h1 data-cy="cartPageTitle">My Cart</h1>;

const getButton = (history: History) => (
  <Button
    data-cy="cartPageBtnProceedToCheckout"
    onClick={() => history.push("/new-checkout/address")}
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
      <TaxedMoney
        data-cy="cartPageSubtotalPrice"
        taxedMoney={totalPrice || undefined}
      />
    }
    totalPrice={
      <TaxedMoney
        data-cy="cartPageTotalPrice"
        taxedMoney={subtotalPrice || undefined}
      />
    }
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }) => (
    <CartRow
      key={id}
      id={id}
      name={variant?.product?.name || ""}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={quantity => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={
        <TaxedMoney
          data-cy={`cartPageItem${id}TotalPrice`}
          taxedMoney={totalPrice || undefined}
        />
      }
      unitPrice={
        <TaxedMoney
          data-cy={`cartPageItem${id}UnitPrice`}
          taxedMoney={variant?.pricing?.price || undefined}
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
      button={getButton(history)}
      cartHeader={cartHeader}
      cartFooter={prepareCartFooter(totalPrice, subtotalPrice)}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  );
};
