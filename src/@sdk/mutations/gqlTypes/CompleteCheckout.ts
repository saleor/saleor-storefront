/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode, PaymentChargeStatusEnum, OrderStatus } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CompleteCheckout
// ====================================================

export interface CompleteCheckout_checkoutComplete_errors {
  __typename: "CheckoutError";
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
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

export interface CompleteCheckout_checkoutComplete_order_shippingAddress_country {
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

export interface CompleteCheckout_checkoutComplete_order_shippingAddress {
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
  country: CompleteCheckout_checkoutComplete_order_shippingAddress_country;
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted_gross {
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted_net {
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted_net;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price_gross {
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price_net {
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price_net;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: CompleteCheckout_checkoutComplete_order_lines_variant_pricing_price | null;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CompleteCheckout_checkoutComplete_order_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CompleteCheckout_checkoutComplete_order_lines_variant_attributes_values | null)[];
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_product_thumbnail {
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

export interface CompleteCheckout_checkoutComplete_order_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CompleteCheckout_checkoutComplete_order_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CompleteCheckout_checkoutComplete_order_lines_variant_product_thumbnail2x | null;
  productType: CompleteCheckout_checkoutComplete_order_lines_variant_product_productType;
}

export interface CompleteCheckout_checkoutComplete_order_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CompleteCheckout_checkoutComplete_order_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CompleteCheckout_checkoutComplete_order_lines_variant_attributes[];
  product: CompleteCheckout_checkoutComplete_order_lines_variant_product;
}

export interface CompleteCheckout_checkoutComplete_order_lines_unitPrice_gross {
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

export interface CompleteCheckout_checkoutComplete_order_lines_unitPrice_net {
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

export interface CompleteCheckout_checkoutComplete_order_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_lines_unitPrice_net;
}

export interface CompleteCheckout_checkoutComplete_order_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: CompleteCheckout_checkoutComplete_order_lines_variant | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: CompleteCheckout_checkoutComplete_order_lines_unitPrice | null;
}

export interface CompleteCheckout_checkoutComplete_order_subtotal_gross {
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

export interface CompleteCheckout_checkoutComplete_order_subtotal_net {
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

export interface CompleteCheckout_checkoutComplete_order_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_subtotal_net;
}

export interface CompleteCheckout_checkoutComplete_order_total_gross {
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

export interface CompleteCheckout_checkoutComplete_order_total_net {
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

export interface CompleteCheckout_checkoutComplete_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_total_net;
}

export interface CompleteCheckout_checkoutComplete_order_shippingPrice_gross {
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

export interface CompleteCheckout_checkoutComplete_order_shippingPrice_net {
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

export interface CompleteCheckout_checkoutComplete_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CompleteCheckout_checkoutComplete_order_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CompleteCheckout_checkoutComplete_order_shippingPrice_net;
}

export interface CompleteCheckout_checkoutComplete_order {
  __typename: "Order";
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string | null;
  status: OrderStatus;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  shippingAddress: CompleteCheckout_checkoutComplete_order_shippingAddress | null;
  /**
   * List of order lines.
   */
  lines: (CompleteCheckout_checkoutComplete_order_lines | null)[];
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: CompleteCheckout_checkoutComplete_order_subtotal | null;
  /**
   * Total amount of the order.
   */
  total: CompleteCheckout_checkoutComplete_order_total | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: CompleteCheckout_checkoutComplete_order_shippingPrice | null;
}

export interface CompleteCheckout_checkoutComplete {
  __typename: "CheckoutComplete";
  errors: CompleteCheckout_checkoutComplete_errors[];
  /**
   * Placed order.
   */
  order: CompleteCheckout_checkoutComplete_order | null;
}

export interface CompleteCheckout {
  /**
   * Completes the checkout. As a result a new order is created and a payment
   * charge is made. This action requires a successful payment before it can be
   * performed. In case additional confirmation step as 3D secure is required
   * confirmationNeeded flag will be set to True and no order created until payment
   * is confirmed with second call of this mutation.
   */
  checkoutComplete: CompleteCheckout_checkoutComplete | null;
}

export interface CompleteCheckoutVariables {
  checkoutId: string;
}
