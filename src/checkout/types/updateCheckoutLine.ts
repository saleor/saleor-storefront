/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutLine
// ====================================================

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
  id: string;
  lines: (updateCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
  subtotalPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  checkout: updateCheckoutLine_checkoutLinesUpdate_checkout | null;
  errors: updateCheckoutLine_checkoutLinesUpdate_errors[] | null;
}

export interface updateCheckoutLine {
  checkoutLinesUpdate: updateCheckoutLine_checkoutLinesUpdate | null;
}

export interface updateCheckoutLineVariables {
  checkoutId: string;
  lines: (CheckoutLineInput | null)[];
}
