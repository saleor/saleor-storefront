/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum AddressTypeEnum {
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * An enumeration.
 */
export enum OrderStatus {
  CANCELED = "CANCELED",
  DRAFT = "DRAFT",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  UNFULFILLED = "UNFULFILLED",
}

/**
 * An enumeration.
 */
export enum PaymentChargeStatusEnum {
  FULLY_CHARGED = "FULLY_CHARGED",
  FULLY_REFUNDED = "FULLY_REFUNDED",
  NOT_CHARGED = "NOT_CHARGED",
  PARTIALLY_CHARGED = "PARTIALLY_CHARGED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

export enum ProductOrderField {
  DATE = "DATE",
  MINIMAL_PRICE = "MINIMAL_PRICE",
  NAME = "NAME",
  PRICE = "PRICE",
  PUBLISHED = "PUBLISHED",
  TYPE = "TYPE",
}

export interface AccountInput {
  firstName?: string | null;
  lastName?: string | null;
  defaultBillingAddress?: AddressInput | null;
  defaultShippingAddress?: AddressInput | null;
}

export interface AddressInput {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  cityArea?: string | null;
  postalCode?: string | null;
  country?: string | null;
  countryArea?: string | null;
  phone?: string | null;
}

export interface CheckoutCreateInput {
  lines: (CheckoutLineInput | null)[];
  email?: string | null;
  shippingAddress?: AddressInput | null;
  billingAddress?: AddressInput | null;
}

export interface CheckoutLineInput {
  quantity: number;
  variantId: string;
}

export interface PaymentInput {
  gateway: string;
  token: string;
  amount?: any | null;
  billingAddress?: AddressInput | null;
}

export interface ProductOrder {
  field?: ProductOrderField | null;
  attributeId?: string | null;
  direction: OrderDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
