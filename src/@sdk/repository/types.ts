export enum LocalStorageItems {
  CHECKOUT = "checkout",
}

export interface ICheckoutModel {
  email: string | undefined;
  shippingAddress: object | undefined;
  billingAddress: object | undefined;
  lines: Array<{ variantId: string; quantity: number }> | undefined;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel;
  setCheckout(checkout: ICheckoutModel): void;
}
