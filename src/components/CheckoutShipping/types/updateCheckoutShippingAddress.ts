/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutShippingAddress
// ====================================================

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors {
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddress_checkoutShippingAddressUpdate {
  errors: updateCheckoutShippingAddress_checkoutShippingAddressUpdate_errors[] | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_errors {
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net {
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice {
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_net;
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net {
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice {
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods {
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod {
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net {
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice {
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net {
  amount: number;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice {
  net: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_net;
  gross: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant {
  id: string;
  name: string;
  price: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines {
  id: string;
  quantity: number;
  totalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines_variant;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate_checkout {
  token: any;
  id: string;
  totalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutShippingAddress_checkoutEmailUpdate_checkout_lines | null)[] | null;
}

export interface updateCheckoutShippingAddress_checkoutEmailUpdate {
  errors: updateCheckoutShippingAddress_checkoutEmailUpdate_errors[] | null;
  checkout: updateCheckoutShippingAddress_checkoutEmailUpdate_checkout | null;
}

export interface updateCheckoutShippingAddress {
  checkoutShippingAddressUpdate: updateCheckoutShippingAddress_checkoutShippingAddressUpdate | null;
  checkoutEmailUpdate: updateCheckoutShippingAddress_checkoutEmailUpdate | null;
}

export interface updateCheckoutShippingAddressVariables {
  checkoutId: string;
  shippingAddress: AddressInput;
  email: string;
}
