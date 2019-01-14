/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCheckout
// ====================================================

export interface getCheckout_checkout_totalPrice_net {
  amount: number;
}

export interface getCheckout_checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_totalPrice {
  net: getCheckout_checkout_totalPrice_net;
  gross: getCheckout_checkout_totalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_subtotalPrice_net {
  amount: number;
}

export interface getCheckout_checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_subtotalPrice {
  net: getCheckout_checkout_subtotalPrice_net;
  gross: getCheckout_checkout_subtotalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface getCheckout_checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getCheckout_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getCheckout_checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface getCheckout_checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: getCheckout_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface getCheckout_checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_availableShippingMethods {
  id: string;
  name: string;
  price: getCheckout_checkout_availableShippingMethods_price | null;
}

export interface getCheckout_checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_shippingMethod {
  id: string;
  name: string;
  price: getCheckout_checkout_shippingMethod_price | null;
}

export interface getCheckout_checkout_shippingPrice_net {
  amount: number;
}

export interface getCheckout_checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_shippingPrice {
  net: getCheckout_checkout_shippingPrice_net;
  gross: getCheckout_checkout_shippingPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_lines_totalPrice_net {
  amount: number;
}

export interface getCheckout_checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_lines_totalPrice {
  net: getCheckout_checkout_lines_totalPrice_net;
  gross: getCheckout_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface getCheckout_checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: getCheckout_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: getCheckout_checkout_lines_variant_product_thumbnail2x | null;
}

export interface getCheckout_checkout_lines_variant {
  id: string;
  name: string;
  price: getCheckout_checkout_lines_variant_price | null;
  product: getCheckout_checkout_lines_variant_product;
}

export interface getCheckout_checkout_lines {
  id: string;
  quantity: number;
  totalPrice: getCheckout_checkout_lines_totalPrice | null;
  variant: getCheckout_checkout_lines_variant;
}

export interface getCheckout_checkout {
  token: any;
  id: string;
  totalPrice: getCheckout_checkout_totalPrice | null;
  subtotalPrice: getCheckout_checkout_subtotalPrice | null;
  billingAddress: getCheckout_checkout_billingAddress | null;
  shippingAddress: getCheckout_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (getCheckout_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: getCheckout_checkout_shippingMethod | null;
  shippingPrice: getCheckout_checkout_shippingPrice | null;
  lines: (getCheckout_checkout_lines | null)[] | null;
}

export interface getCheckout {
  checkout: getCheckout_checkout | null;
}

export interface getCheckoutVariables {
  token: any;
}
