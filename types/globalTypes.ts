/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum GatewaysEnum {
  BRAINTREE = "BRAINTREE",
  DUMMY = "DUMMY",
  RAZORPAY = "RAZORPAY",
  STRIPE = "STRIPE",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
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
  lines?: (CheckoutLineInput | null)[] | null;
  email?: string | null;
  shippingAddress?: AddressInput | null;
  billingAddress?: AddressInput | null;
}

export interface CheckoutLineInput {
  quantity: number;
  variantId: string;
}

export interface PaymentInput {
  gateway?: GatewaysEnum | null;
  checkoutId?: string | null;
  token: string;
  amount: any;
  billingAddress?: AddressInput | null;
}

export interface ProductOrder {
  field: ProductOrderField;
  direction: OrderDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
