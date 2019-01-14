/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutLine
// ====================================================

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods {
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod {
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net {
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice {
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines {
  id: string;
  quantity: number;
  totalPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout {
  token: any;
  id: string;
  totalPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_errors {
  field: string | null;
  message: string | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate {
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
