export enum LocalStorageItems {
  CHECKOUT = "checkout",
  CHECKOUT_TOKEN = "checkoutToken",
}

export interface ICheckoutModel {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: object | null | undefined;
  billingAddress: object | null | undefined;
  lines:
    | Array<{
        variantId: string;
        quantity: number;
      }>
    | null
    | undefined;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getCheckoutToken(): string | null;
  setCheckoutToken(token: string): void;
}
