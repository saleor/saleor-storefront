import { ICheckoutModel } from "@temp/@sdk/repository";

export interface ICheckoutControllerResponse {
  data: ICheckoutModel | null;
  errors: any;
}

export interface ICheckoutController {
  getCheckout: (
    checkoutToken: string | null
  ) => Promise<ICheckoutControllerResponse>;
  createCheckout: (
    email: string,
    shippingAddress: object,
    billingAddress: object,
    lines: Array<{
      variantId: string;
      quantity: number;
    }>
  ) => Promise<ICheckoutControllerResponse>;
  setCartItem: (
    checkoutId: string,
    variantId: string,
    quantity: number
  ) => Promise<ICheckoutControllerResponse>;
  setBillingAddress: () => Promise<ICheckoutControllerResponse>;
  setShippingAddress: () => Promise<ICheckoutControllerResponse>;
  setShippingAsBillingAddress: () => Promise<ICheckoutControllerResponse>;
}
