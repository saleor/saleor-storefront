/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutBillingAddress
// ====================================================

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_errors {
  field: string | null;
  message: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_net {
  amount: number;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice {
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_net;
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_net {
  amount: number;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice {
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress_country {
  code: string;
  country: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods {
  id: string;
  name: string;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod {
  id: string;
  name: string;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_net {
  amount: number;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice {
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net {
  amount: number;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross {
  amount: number;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice {
  net: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net;
  gross: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x {
  url: string;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product {
  id: string;
  name: string;
  thumbnail: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant {
  id: string;
  name: string;
  price: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines {
  id: string;
  quantity: number;
  totalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines_variant;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout {
  token: any;
  id: string;
  totalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout_lines | null)[] | null;
}

export interface updateCheckoutBillingAddress_checkoutBillingAddressUpdate {
  errors: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_errors[] | null;
  checkout: updateCheckoutBillingAddress_checkoutBillingAddressUpdate_checkout | null;
}

export interface updateCheckoutBillingAddress {
  checkoutBillingAddressUpdate: updateCheckoutBillingAddress_checkoutBillingAddressUpdate | null;
}

export interface updateCheckoutBillingAddressVariables {
  checkoutId: string;
  billingAddress: AddressInput;
}
