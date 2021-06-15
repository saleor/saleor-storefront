import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { UserDetails_me } from "@saleor/sdk/lib/queries/gqlTypes/UserDetails";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, CartFooter, CartHeader, Loader } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartRow } from "@components/organisms";
import { Cart, CartEmpty } from "@components/templates";
import { paths } from "@paths";
import { checkoutMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";

const title = (
  <h1 data-test="cartPageTitle">
    <FormattedMessage defaultMessage="My Cart" />
  </h1>
);

const getShoppingButton = () => (
  <Link href={paths.home}>
    <Button testingContext="cartPageContinueShoppingButton">
      <FormattedMessage {...checkoutMessages.continueShopping} />
    </Button>
  </Link>
);

const getCheckoutButton = (user?: UserDetails_me | null) => (
  <Link href={user ? paths.checkout : paths.login}>
    <Button testingContext="proceedToCheckoutButton">
      <FormattedMessage defaultMessage="PROCEED TO CHECKOUT" />
    </Button>
  </Link>
);

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null
) => (
  <CartFooter
    subtotalPrice={subtotalPrice}
    totalPrice={totalPrice}
    shippingPrice={shippingTaxedPrice}
    discountPrice={promoTaxedPrice}
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <CartRow
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      id={variant?.product?.id || ""}
      slug={variant.product?.slug || ""}
      name={variant?.product?.name || ""}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={quantity => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
      unitPrice={<TaxedMoney taxedMoney={variant?.pricing?.price} />}
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

export const CartPage: React.FC<NextPage> = () => {
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  return loaded ? (
    items?.length ? (
      <Cart
        title={title}
        button={getCheckoutButton(user)}
        cartHeader={cartHeader}
        cartFooter={prepareCartFooter(
          totalPrice,
          shippingTaxedPrice,
          promoTaxedPrice,
          subtotalPrice
        )}
        cart={items && generateCart(items, removeItem, updateItem)}
      />
    ) : (
      <CartEmpty button={getShoppingButton()} />
    )
  ) : (
    <Loader />
  );
};
