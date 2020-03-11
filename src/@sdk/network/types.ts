export enum PendingSaveItems {
  UPDATE_CART = "updateCart",
  BILLING_ADDRESS = "billingAddress",
  SHIPPING_ADDRESS = "shippingAddress",
  SHIPPING_AS_BILLING_ADDRESS = "shippingAsBillingAddress",
}

export interface INetworkManagerResponse<T> {
  data: T | null;
  errors: any;
}
