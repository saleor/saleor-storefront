/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCheckoutShippingOptions
// ====================================================

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice_net;
  gross: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice_net;
  gross: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_billingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_availableShippingMethods_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_availableShippingMethods_price | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingMethod_price | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice_net;
  gross: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  amount: number;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  net: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice_net;
  gross: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product_thumbnail2x | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  price: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_price | null;
  product: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant_product;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_totalPrice | null;
  variant: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines_variant;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout {
  __typename: "Checkout";
  token: any;
  id: string;
  totalPrice: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_totalPrice | null;
  subtotalPrice: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_subtotalPrice | null;
  billingAddress: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_billingAddress | null;
  shippingAddress: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingAddress | null;
  email: string;
  availableShippingMethods: (updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingMethod | null;
  shippingPrice: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_shippingPrice | null;
  lines: (updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout_lines | null)[] | null;
}

export interface updateCheckoutShippingOptions_checkoutShippingMethodUpdate {
  __typename: "CheckoutShippingMethodUpdate";
  errors: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_errors[] | null;
  checkout: updateCheckoutShippingOptions_checkoutShippingMethodUpdate_checkout | null;
}

export interface updateCheckoutShippingOptions {
  checkoutShippingMethodUpdate: updateCheckoutShippingOptions_checkoutShippingMethodUpdate | null;
}

export interface updateCheckoutShippingOptionsVariables {
  checkoutId: string;
  shippingMethodId: string;
}
