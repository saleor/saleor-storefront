/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutLine
// ====================================================

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing | null;
  product: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  /**
   * An updated checkout.
   */
  checkout: UpdateCheckoutLine_checkoutLinesUpdate_checkout | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: UpdateCheckoutLine_checkoutLinesUpdate_errors[] | null;
}

export interface UpdateCheckoutLine {
  /**
   * Updates checkout line in the existing checkout.
   */
  checkoutLinesUpdate: UpdateCheckoutLine_checkoutLinesUpdate | null;
}

export interface UpdateCheckoutLineVariables {
  checkoutId: string;
  lines: (CheckoutLineInput | null)[];
}
