/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCheckout
// ====================================================

export interface getCheckout_checkout_user {
  __typename: "User";
  email: string;
}

export interface getCheckout_checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_totalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_subtotalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getCheckout_checkout_billingAddress {
  __typename: "Address";
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
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getCheckout_checkout_shippingAddress {
  __typename: "Address";
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
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getCheckout_checkout_availableShippingMethods_price | null;
}

export interface getCheckout_checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: getCheckout_checkout_shippingMethod_price | null;
}

export interface getCheckout_checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_shippingPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface getCheckout_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: getCheckout_checkout_lines_totalPrice_gross;
  currency: string;
}

export interface getCheckout_checkout_lines_variant_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface getCheckout_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface getCheckout_checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: getCheckout_checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: getCheckout_checkout_lines_variant_product_thumbnail2x | null;
}

export interface getCheckout_checkout_lines_variant {
  __typename: "ProductVariant";
  stockQuantity: number;
  id: string;
  name: string;
  price: getCheckout_checkout_lines_variant_price | null;
  product: getCheckout_checkout_lines_variant_product;
}

export interface getCheckout_checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: getCheckout_checkout_lines_totalPrice | null;
  variant: getCheckout_checkout_lines_variant;
}

export interface getCheckout_checkout {
  __typename: "Checkout";
  token: any;
  id: string;
  user: getCheckout_checkout_user | null;
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
