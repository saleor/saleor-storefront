/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCheckoutPromoCode
// ====================================================

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways_config[];
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price_net;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing_price | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product_thumbnail2x | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_pricing | null;
  product: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant_product;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_totalPrice | null;
  variant: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines_variant;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_discount {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout {
  __typename: "Checkout";
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availablePaymentGateways | null)[];
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_subtotalPrice | null;
  billingAddress: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_billingAddress | null;
  shippingAddress: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_availableShippingMethods | null)[];
  shippingMethod: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkoutErrors {
  __typename: "CheckoutError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: CheckoutErrorCode | null;
}

export interface RemoveCheckoutPromoCode_checkoutRemovePromoCode {
  __typename: "CheckoutRemovePromoCode";
  /**
   * The checkout with the removed gift card or voucher.
   */
  checkout: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkout | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RemoveCheckoutPromoCode_checkoutRemovePromoCode_errors[] | null;
  checkoutErrors: RemoveCheckoutPromoCode_checkoutRemovePromoCode_checkoutErrors[] | null;
}

export interface RemoveCheckoutPromoCode {
  /**
   * Remove a gift card or a voucher from a checkout.
   */
  checkoutRemovePromoCode: RemoveCheckoutPromoCode_checkoutRemovePromoCode | null;
}

export interface RemoveCheckoutPromoCodeVariables {
  checkoutId: string;
  promoCode: string;
}
