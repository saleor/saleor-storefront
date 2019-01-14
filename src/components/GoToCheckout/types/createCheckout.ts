/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutCreateInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: createCheckout
// ====================================================

export interface createCheckout_checkoutCreate_errors {
  field: string | null;
  message: string | null;
}

export interface createCheckout_checkoutCreate_checkout_totalPrice_net {
  amount: number;
}

export interface createCheckout_checkoutCreate_checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_totalPrice {
  net: createCheckout_checkoutCreate_checkout_totalPrice_net;
  gross: createCheckout_checkoutCreate_checkout_totalPrice_gross;
  currency: string;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice_net {
  amount: number;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_subtotalPrice {
  net: createCheckout_checkoutCreate_checkout_subtotalPrice_net;
  gross: createCheckout_checkoutCreate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface createCheckout_checkoutCreate_checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface createCheckout_checkoutCreate_checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: createCheckout_checkoutCreate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: createCheckout_checkoutCreate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface createCheckout_checkoutCreate_checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_availableShippingMethods {
  id: string;
  name: string;
  price: createCheckout_checkoutCreate_checkout_availableShippingMethods_price | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingMethod {
  id: string;
  name: string;
  price: createCheckout_checkoutCreate_checkout_shippingMethod_price | null;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice_net {
  amount: number;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_shippingPrice {
  net: createCheckout_checkoutCreate_checkout_shippingPrice_net;
  gross: createCheckout_checkoutCreate_checkout_shippingPrice_gross;
  currency: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice_net {
  amount: number;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_totalPrice {
  net: createCheckout_checkoutCreate_checkout_lines_totalPrice_net;
  gross: createCheckout_checkoutCreate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: createCheckout_checkoutCreate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface createCheckout_checkoutCreate_checkout_lines_variant {
  id: string;
  name: string;
  price: createCheckout_checkoutCreate_checkout_lines_variant_price | null;
  product: createCheckout_checkoutCreate_checkout_lines_variant_product;
}

export interface createCheckout_checkoutCreate_checkout_lines {
  id: string;
  quantity: number;
  totalPrice: createCheckout_checkoutCreate_checkout_lines_totalPrice | null;
  variant: createCheckout_checkoutCreate_checkout_lines_variant;
}

export interface createCheckout_checkoutCreate_checkout {
  token: any;
  id: string;
  totalPrice: createCheckout_checkoutCreate_checkout_totalPrice | null;
  subtotalPrice: createCheckout_checkoutCreate_checkout_subtotalPrice | null;
  billingAddress: createCheckout_checkoutCreate_checkout_billingAddress | null;
  shippingAddress: createCheckout_checkoutCreate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (createCheckout_checkoutCreate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: createCheckout_checkoutCreate_checkout_shippingMethod | null;
  shippingPrice: createCheckout_checkoutCreate_checkout_shippingPrice | null;
  lines: (createCheckout_checkoutCreate_checkout_lines | null)[] | null;
}

export interface createCheckout_checkoutCreate {
  errors: createCheckout_checkoutCreate_errors[] | null;
  checkout: createCheckout_checkoutCreate_checkout | null;
}

export interface createCheckout {
  checkoutCreate: createCheckout_checkoutCreate | null;
}

export interface createCheckoutVariables {
  checkoutInput: CheckoutCreateInput;
}
