/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutShippingAddresss
// ====================================================

export interface updateCheckoutShippingAddresss_checkoutShippingAddressUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddresss_checkoutShippingAddressUpdate {
  __typename: "CheckoutShippingAddressUpdate";
  errors: updateCheckoutShippingAddresss_checkoutShippingAddressUpdate_errors[] | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice_net;
  gross: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_billingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice_net;
  gross: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  price: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines_variant;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout {
  __typename: "Checkout";
  token: any;
  id: string;
  totalPrice: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout_lines | null)[] | null;
}

export interface updateCheckoutShippingAddresss_checkoutEmailUpdate {
  __typename: "CheckoutEmailUpdate";
  errors: updateCheckoutShippingAddresss_checkoutEmailUpdate_errors[] | null;
  checkout: updateCheckoutShippingAddresss_checkoutEmailUpdate_checkout | null;
}

export interface updateCheckoutShippingAddresss {
  checkoutShippingAddressUpdate: updateCheckoutShippingAddresss_checkoutShippingAddressUpdate | null;
  checkoutEmailUpdate: updateCheckoutShippingAddresss_checkoutEmailUpdate | null;
}

export interface updateCheckoutShippingAddresssVariables {
  checkoutId: string;
  shippingAddress: AddressInput;
  email: string;
}
