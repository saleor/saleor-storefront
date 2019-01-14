/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Checkout
// ====================================================

export interface Checkout_totalPrice_net {
  amount: number;
}

export interface Checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface Checkout_totalPrice {
  net: Checkout_totalPrice_net;
  gross: Checkout_totalPrice_gross;
  currency: string;
}

export interface Checkout_subtotalPrice_net {
  amount: number;
}

export interface Checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface Checkout_subtotalPrice {
  net: Checkout_subtotalPrice_net;
  gross: Checkout_subtotalPrice_gross;
  currency: string;
}

export interface Checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface Checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: Checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface Checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface Checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: Checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface Checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface Checkout_availableShippingMethods {
  id: string;
  name: string;
  price: Checkout_availableShippingMethods_price | null;
}

export interface Checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface Checkout_shippingMethod {
  id: string;
  name: string;
  price: Checkout_shippingMethod_price | null;
}

export interface Checkout_shippingPrice_net {
  amount: number;
}

export interface Checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface Checkout_shippingPrice {
  net: Checkout_shippingPrice_net;
  gross: Checkout_shippingPrice_gross;
  currency: string;
}

export interface Checkout_lines_totalPrice_net {
  amount: number;
}

export interface Checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface Checkout_lines_totalPrice {
  net: Checkout_lines_totalPrice_net;
  gross: Checkout_lines_totalPrice_gross;
  currency: string;
}

export interface Checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface Checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface Checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface Checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: Checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: Checkout_lines_variant_product_thumbnail2x | null;
}

export interface Checkout_lines_variant {
  id: string;
  name: string;
  price: Checkout_lines_variant_price | null;
  product: Checkout_lines_variant_product;
}

export interface Checkout_lines {
  id: string;
  quantity: number;
  totalPrice: Checkout_lines_totalPrice | null;
  variant: Checkout_lines_variant;
}

export interface Checkout {
  token: any;
  id: string;
  totalPrice: Checkout_totalPrice | null;
  subtotalPrice: Checkout_subtotalPrice | null;
  billingAddress: Checkout_billingAddress | null;
  shippingAddress: Checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (Checkout_availableShippingMethods | null)[] | null;
  shippingMethod: Checkout_shippingMethod | null;
  shippingPrice: Checkout_shippingPrice | null;
  lines: (Checkout_lines | null)[] | null;
}
