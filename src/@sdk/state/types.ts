import { ICheckoutModel } from "../repository";

export enum StateItems {
  CHECKOUT,
  PROMO_CODE,
  SHIPPING_AS_BILLING,
}

export interface ISaleorState {
  checkout: ICheckoutModel | null;
  promoCode: string | null;
  shippingAsBilling: boolean;
}
