/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Checkout
// ====================================================

export interface Checkout_user {
  __typename: "User";
  email: string;
}

export interface Checkout_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface Checkout_totalPrice {
  __typename: "TaxedMoney";
  gross: Checkout_totalPrice_gross;
  currency: string;
}

export interface Checkout_subtotalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface Checkout_subtotalPrice {
  __typename: "TaxedMoney";
  gross: Checkout_subtotalPrice_gross;
  currency: string;
}

export interface Checkout_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface Checkout_billingAddress {
  __typename: "Address";
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
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface Checkout_shippingAddress {
  __typename: "Address";
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
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface Checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: Checkout_availableShippingMethods_price | null;
}

export interface Checkout_shippingMethod_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface Checkout_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: Checkout_shippingMethod_price | null;
}

export interface Checkout_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface Checkout_shippingPrice {
  __typename: "TaxedMoney";
  gross: Checkout_shippingPrice_gross;
  currency: string;
}

export interface Checkout_lines_totalPrice_gross {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface Checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  gross: Checkout_lines_totalPrice_gross;
  currency: string;
}

export interface Checkout_lines_variant_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface Checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface Checkout_lines_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: Checkout_lines_variant_product_thumbnail | null;
  thumbnail2x: Checkout_lines_variant_product_thumbnail2x | null;
}

export interface Checkout_lines_variant {
  __typename: "ProductVariant";
  id: string;
  name: string;
  price: Checkout_lines_variant_price | null;
  product: Checkout_lines_variant_product;
}

export interface Checkout_lines {
  __typename: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice: Checkout_lines_totalPrice | null;
  variant: Checkout_lines_variant;
}

export interface Checkout {
  __typename: "Checkout";
  token: any;
  id: string;
  user: Checkout_user | null;
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
