export enum LocalStorageItems {
  CHECKOUT = "checkout",
  CHECKOUT_TOKEN = "checkoutToken",
}

export interface ICheckoutModel {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: object | undefined;
  billingAddress: object | undefined;
  lines: Array<{ variantId: string; quantity: number }> | null;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel;
  setCheckout(checkout: ICheckoutModel): void;
  getCheckoutToken(): string | null;
  setCheckoutToken(token: string): void;
}
