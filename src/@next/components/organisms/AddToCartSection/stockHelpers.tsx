import * as React from "react";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_variants_pricing,
  ProductDetails_product_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { isEqual } from "lodash";
import { TaxedMoney } from "../../containers";

import * as S from "./styles";

/**
 * Renders formatted price for chosen variant or product.
 * Price ranges and discounts are additionally formatted available.
 */
export const getProductPrice = (
  productPricingRange: ProductDetails_product_pricing,
  variantPricing?: ProductDetails_product_variants_pricing | null
) => {
  if (variantPricing) {
    if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
      return <TaxedMoney taxedMoney={variantPricing.price} />;
    }
    return (
      <>
        <S.UndiscountedPrice>
          <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
        </S.UndiscountedPrice>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TaxedMoney taxedMoney={variantPricing.price} />
      </>
    );
  }

  if (!productPricingRange.priceRange) {
    return <></>;
  }

  const { start, stop } = productPricingRange.priceRange;
  if (isEqual(start, stop)) {
    return <TaxedMoney taxedMoney={start} />;
  }
  return (
    <>
      <TaxedMoney taxedMoney={start} /> - <TaxedMoney taxedMoney={stop} />
    </>
  );
};

export const canAddToCart = (
  items: ICheckoutModelLine[],
  isAvailableForPurchase: boolean,
  variantId: string,
  variantStock: number,
  quantity: number
): boolean => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const syncedQuantityWithCart = cartItem
    ? quantity + (cartItem?.quantity || 0)
    : quantity;
  return (
    isAvailableForPurchase &&
    quantity > 0 &&
    !!variantId &&
    variantStock >= syncedQuantityWithCart
  );
};

/**
 * Returns how many items you can add to the cart. Takes in account quantity already in cart.
 */
export const getAvailableQuantity = (
  items: ICheckoutModelLine[],
  variantId: string,
  variantStock: number
): number => {
  const cartItem = items?.find(item => item.variant.id === variantId);
  const quantityInCart = cartItem?.quantity || 0;
  return variantStock - quantityInCart;
};
