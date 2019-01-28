/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCheckoutLine
// ====================================================

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress {
  __typename: "Address";
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
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress {
  __typename: "Address";
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
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
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

export interface updateCheckoutLine_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
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
