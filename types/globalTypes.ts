/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum GatewaysEnum {
  BRAINTREE = "BRAINTREE",
  DUMMY = "DUMMY",
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
  CHARGED = "CHARGED",
  FULLY_REFUNDED = "FULLY_REFUNDED",
  NOT_CHARGED = "NOT_CHARGED",
}

export enum ProductOrderField {
  DATE = "DATE",
  NAME = "NAME",
  PRICE = "PRICE",
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
  country: string;
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
  gateway: GatewaysEnum;
  token: string;
  amount: any;
  billingAddress: AddressInput;
}

export interface ProductOrder {
  field: ProductOrderField;
  direction: OrderDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
