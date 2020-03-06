export interface ICheckoutModel {
  email: string | undefined;
  shippingAddress: object | undefined;
  billingAddress: object | undefined;
  lines: [] | undefined;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel;
  setCheckout(checkout: ICheckoutModel): void;
}
