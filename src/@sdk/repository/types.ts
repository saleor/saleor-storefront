export enum LocalStorageItems {
  JOB_QUEUE_CHECKOUT = "job_queueCheckout",
  CHECKOUT = "data_checkout",
  CHECKOUT_TOKEN = "data_checkoutToken",
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

export interface IJobsModel {
  checkout: {
    setCartItem: boolean;
  };
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getCheckoutToken(): string | null;
  setCheckoutToken(token: string): void;
}
